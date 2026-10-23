// ai-settings: one settings shape for every AI call in Brant's apps.
// Each call declares provider, model or tier, temperature, effort, deep thinking and a max cost.
// Default is cheap-first; escalation rules decide what to try next when a result fails its check.
// No dependencies. Node 18+ (global fetch). Prices and model ids live in models.json.
import { readFileSync } from "node:fs";

export const EFFORTS = ["none", "minimal", "low", "medium", "high", "xhigh"];
export const TIERS = ["cheap", "workhorse", "frontier"];
const PUBLIC_EFFORTS = ["low", "medium", "high", "xhigh"];

export function loadRegistry(path = new URL("./models.json", import.meta.url)) {
  return JSON.parse(readFileSync(path, "utf8"));
}

export class SettingsError extends Error {}
export class BudgetError extends Error {}

/** Fill defaults and reject bad settings before any money is spent. */
export function normalize(spec, registry) {
  const errors = [];
  const s = {
    purpose: spec.purpose,
    provider: spec.provider,
    model: spec.model ?? null,
    tier: spec.tier ?? "cheap",
    temperature: spec.temperature ?? null,
    effort: spec.effort ?? "low",
    deepThinking: spec.deepThinking ?? false,
    maxCostUsd: spec.maxCostUsd,
    maxOutputTokens: spec.maxOutputTokens ?? 1024,
    allowFrontier: spec.allowFrontier ?? false,
    escalation: {
      steps: spec.escalation?.steps ?? ["thinking", "effort", "tier"],
      fallbackProviders: spec.escalation?.fallbackProviders ?? [],
      maxAttempts: spec.escalation?.maxAttempts ?? 3,
    },
  };
  if (!s.purpose) errors.push("purpose is required (one line: what this call is for)");
  const p = registry.providers[s.provider];
  if (!p) errors.push(`unknown provider: ${s.provider}`);
  else if (p.router_only) errors.push(`${s.provider} is a router (typed choices), not a text model; use jevChoose`);
  if (!(typeof s.maxCostUsd === "number" && s.maxCostUsd > 0)) errors.push("maxCostUsd is required and must be > 0");
  if (!PUBLIC_EFFORTS.includes(s.effort)) errors.push(`effort must be one of ${PUBLIC_EFFORTS.join(", ")}`);
  if (!TIERS.includes(s.tier)) errors.push(`tier must be one of ${TIERS.join(", ")}`);
  if (s.tier === "frontier" && !s.allowFrontier) errors.push("frontier tier needs allowFrontier: true");
  if (s.temperature !== null && !(s.temperature >= 0 && s.temperature <= 2)) errors.push("temperature must be 0 to 2");
  if (p && s.model && !p.models.some((m) => m.id === s.model)) errors.push(`model ${s.model} is not in models.json for ${s.provider}`);
  for (const fp of s.escalation.fallbackProviders) if (!registry.providers[fp] || registry.providers[fp].router_only) errors.push(`bad fallback provider: ${fp}`);
  for (const st of s.escalation.steps) if (!["thinking", "effort", "tier", "provider"].includes(st)) errors.push(`bad escalation step: ${st}`);
  if (errors.length) throw new SettingsError(errors.join("; "));
  return s;
}

export function clampEffort(requested, supported) {
  if (!supported.length) return null;
  if (supported.includes(requested)) return requested;
  const want = EFFORTS.indexOf(requested);
  const below = supported.filter((e) => EFFORTS.indexOf(e) <= want);
  return below.length ? below[below.length - 1] : supported[0];
}

function modelFor(registry, provider, s) {
  const models = registry.providers[provider].models;
  if (s.model && provider === s.provider) return models.find((m) => m.id === s.model);
  return models.find((m) => m.tier === s.tier) ?? models[0];
}

/** Turn settings into one concrete attempt: provider, model and the effective knobs. */
export function resolve(s, registry, provider = s.provider) {
  const m = modelFor(registry, provider, s);
  const lowest = m.efforts.includes("none") ? "none" : m.efforts.includes("minimal") ? "minimal" : m.efforts[0] ?? null;
  const effort = s.deepThinking ? clampEffort(s.effort, m.efforts) : lowest;
  const reasoningOn = effort !== null && effort !== "none" && effort !== "minimal";
  let temperature = s.temperature;
  if (m.temperature === false || (m.temperature === "only_without_reasoning" && reasoningOn)) temperature = null;
  return { provider, model: m.id, tier: m.tier, effort, deepThinking: s.deepThinking, temperature, maxOutputTokens: s.maxOutputTokens, price: { in: m.in, out: m.out } };
}

/** Worst-case cost: estimated input (4 chars a token, plus 30% tokenizer margin) and the full output cap. */
export function estimateCost(attempt, messages) {
  const chars = messages.reduce((n, msg) => n + String(msg.content).length, 0);
  const inTok = Math.ceil((chars / 4) * 1.3);
  return (inTok * attempt.price.in + attempt.maxOutputTokens * attempt.price.out) / 1e6;
}

export function actualCost(attempt, usage) {
  return (usage.inputTokens * attempt.price.in + usage.outputTokens * attempt.price.out) / 1e6;
}

/** Next attempt after a failed check, or null when the ladder is used up. */
export function escalate(s, registry, attempt) {
  const m = registry.providers[attempt.provider].models.find((x) => x.id === attempt.model);
  for (const step of s.escalation.steps) {
    if (step === "thinking" && !attempt.deepThinking && m.efforts.length) {
      return resolve({ ...s, deepThinking: true, effort: "medium", model: attempt.model, provider: attempt.provider }, registry, attempt.provider);
    }
    if (step === "effort" && attempt.deepThinking && attempt.effort) {
      const next = m.efforts.filter((e) => EFFORTS.indexOf(e) > EFFORTS.indexOf(attempt.effort) && PUBLIC_EFFORTS.includes(e))[0];
      if (next) return { ...attempt, effort: next };
    }
    if (step === "tier") {
      const i = TIERS.indexOf(attempt.tier);
      const nextTier = TIERS[i + 1];
      if (nextTier && (nextTier !== "frontier" || s.allowFrontier)) {
        const has = registry.providers[attempt.provider].models.some((x) => x.tier === nextTier);
        if (has) return resolve({ ...s, model: null, tier: nextTier, deepThinking: attempt.deepThinking, effort: attempt.deepThinking ? "medium" : s.effort }, registry, attempt.provider);   // a stronger model restarts at medium, not at the top effort
      }
    }
    if (step === "provider") {
      const order = [s.provider, ...s.escalation.fallbackProviders];
      const nextP = order[order.indexOf(attempt.provider) + 1];
      if (nextP) return resolve({ ...s, model: null, tier: attempt.tier === "frontier" && !s.allowFrontier ? "workhorse" : attempt.tier, deepThinking: attempt.deepThinking }, registry, nextP);
    }
  }
  return null;
}

/** Provider-specific HTTP request. The key is read from env at call time and never stored. */
export function buildRequest(attempt, messages, registry, env = process.env) {
  const key = env[registry.providers[attempt.provider].key_env];
  if (!key) throw new SettingsError(`missing ${registry.providers[attempt.provider].key_env}`);
  const system = messages.filter((m) => m.role === "system").map((m) => m.content).join("\n\n");
  const turns = messages.filter((m) => m.role !== "system");
  const a = attempt;
  switch (a.provider) {
    case "xai": {
      const body = { model: a.model, messages, max_tokens: a.maxOutputTokens };
      if (a.effort) body.reasoning_effort = a.effort;
      if (a.temperature !== null) body.temperature = a.temperature;
      return { url: "https://api.x.ai/v1/chat/completions", headers: { authorization: `Bearer ${key}`, "content-type": "application/json" }, body };
    }
    case "openai": {
      const body = { model: a.model, input: messages, max_output_tokens: a.maxOutputTokens };
      if (a.effort) body.reasoning = { effort: a.effort };
      if (a.temperature !== null) body.temperature = a.temperature;
      return { url: "https://api.openai.com/v1/responses", headers: { authorization: `Bearer ${key}`, "content-type": "application/json" }, body };
    }
    case "anthropic": {
      const body = { model: a.model, max_tokens: a.maxOutputTokens, messages: turns, thinking: { type: a.deepThinking ? "adaptive" : "disabled" } };
      if (system) body.system = system;
      if (a.deepThinking && a.effort) body.output_config = { effort: a.effort };
      if (a.temperature !== null) body.temperature = a.temperature;
      return { url: "https://api.anthropic.com/v1/messages", headers: { "x-api-key": key, "anthropic-version": "2023-06-01", "content-type": "application/json" }, body };
    }
    case "gemini": {
      const generationConfig = { maxOutputTokens: a.maxOutputTokens };
      if (a.effort) generationConfig.thinkingConfig = { thinkingLevel: a.effort };
      if (a.temperature !== null) generationConfig.temperature = a.temperature;
      const body = { contents: turns.map((m) => ({ role: m.role === "assistant" ? "model" : "user", parts: [{ text: m.content }] })), generationConfig };
      if (system) body.systemInstruction = { parts: [{ text: system }] };
      return { url: `https://generativelanguage.googleapis.com/v1beta/models/${a.model}:generateContent`, headers: { "x-goog-api-key": key, "content-type": "application/json" }, body };
    }
    default:
      throw new SettingsError(`no request builder for ${a.provider}`);
  }
}

/** Pull text and token usage out of each provider's response. */
export function parseResponse(provider, data) {
  switch (provider) {
    case "xai":
      return { text: data.choices?.[0]?.message?.content ?? "", usage: { inputTokens: data.usage?.prompt_tokens ?? 0, outputTokens: data.usage?.completion_tokens ?? 0 } };
    case "openai": {
      const text = data.output_text ?? (data.output ?? []).flatMap((o) => o.content ?? []).filter((c) => c.type === "output_text").map((c) => c.text).join("");
      return { text, usage: { inputTokens: data.usage?.input_tokens ?? 0, outputTokens: data.usage?.output_tokens ?? 0 } };
    }
    case "anthropic":
      return { text: (data.content ?? []).filter((c) => c.type === "text").map((c) => c.text).join(""), usage: { inputTokens: data.usage?.input_tokens ?? 0, outputTokens: data.usage?.output_tokens ?? 0 } };
    case "gemini": {
      const parts = data.candidates?.[0]?.content?.parts ?? [];
      const u = data.usageMetadata ?? {};
      return { text: parts.filter((p) => !p.thought).map((p) => p.text ?? "").join(""), usage: { inputTokens: u.promptTokenCount ?? 0, outputTokens: (u.candidatesTokenCount ?? 0) + (u.thoughtsTokenCount ?? 0) } };
    }
    default:
      throw new SettingsError(`no parser for ${provider}`);
  }
}

/**
 * Run one call with cheap-first escalation.
 * check(text) decides pass or fail (default: non-empty). Attempts that would push spend past maxCostUsd are skipped.
 * Returns { ok, text, attempt, spentUsd, log }.
 */
export async function run(spec, messages, opts = {}) {
  const registry = opts.registry ?? loadRegistry();
  const fetchFn = opts.fetch ?? globalThis.fetch;
  const env = opts.env ?? process.env;
  const check = opts.check ?? ((t) => t.trim().length > 0);
  const s = normalize(spec, registry);
  let attempt = resolve(s, registry);
  let spent = 0;
  const log = [];
  for (let n = 0; attempt && n < s.escalation.maxAttempts; ) {
    const est = estimateCost(attempt, messages);
    if (spent + est > s.maxCostUsd) {
      log.push({ model: attempt.model, effort: attempt.effort, skipped: `estimate $${est.toFixed(4)} over budget` });
      attempt = escalate(s, registry, attempt);
      continue;
    }
    n += 1;
    const req = buildRequest(attempt, messages, registry, env);
    const res = await fetchFn(req.url, { method: "POST", headers: req.headers, body: JSON.stringify(req.body) });
    const data = await res.json();
    if (!res.ok) {
      log.push({ model: attempt.model, effort: attempt.effort, error: res.status });
      attempt = escalate(s, registry, attempt);
      continue;
    }
    const { text, usage } = parseResponse(attempt.provider, data);
    const cost = actualCost(attempt, usage);
    spent += cost;
    const passed = await check(text);
    log.push({ model: attempt.model, effort: attempt.effort, deepThinking: attempt.deepThinking, costUsd: cost, passed });
    if (passed) return { ok: true, text, attempt, spentUsd: spent, log };
    attempt = escalate(s, registry, attempt);
  }
  return { ok: false, text: null, attempt: null, spentUsd: spent, log };
}

/** Ask Jev one typed choice. Returns { choice, confidence, probabilities }. */
export async function jevChoose(state, name, instructions, criteria, opts = {}) {
  const env = opts.env ?? process.env;
  const key = env.TYPESAFE_API_KEY;
  if (!key) throw new SettingsError("missing TYPESAFE_API_KEY");
  const fetchFn = opts.fetch ?? globalThis.fetch;
  const body = { state, model: opts.model ?? "jev-latest", questions: { [name]: { type: "choice", instructions, criteria } } };
  const res = await fetchFn("https://api.typesafe.ai/v1/systemone", { method: "POST", headers: { authorization: `Bearer ${key}`, "content-type": "application/json" }, body: JSON.stringify(body) });
  if (!res.ok) throw new Error(`jev ${res.status}`);
  const a = (await res.json()).answers[name];
  return { choice: a.choice, confidence: a.confidence, probabilities: a.probabilities };
}

const HARD = /\b(architecture|migration|security|legal|contract|prove|debug|refactor|design the|multi-step|plan)\b/i;

/**
 * "Auto mode": pick tier and deep thinking for a task. Plain rules first; if a Jev key is set and
 * opts.useJev is true, Jev's choice wins when its confidence is at least 0.7.
 */
export async function autoRoute(task, opts = {}) {
  const long = task.length > 6000;
  let tier = HARD.test(task) ? "workhorse" : "cheap";
  let source = "rules";
  if (opts.useJev && (opts.env ?? process.env).TYPESAFE_API_KEY) {
    const j = await jevChoose(task.slice(0, 20000), "tier", "How capable a model does this task need?", {
      cheap: "Formatting, short summaries, classification, simple replies",
      workhorse: "Drafting, normal coding, multi-step but routine reasoning",
      frontier: "Hard design, deep debugging, high-stakes final review",
    }, opts);
    if (j.confidence >= 0.7) { tier = j.choice; source = "jev"; }
  }
  if (tier === "frontier" && !opts.allowFrontier) tier = "workhorse";
  return { tier, deepThinking: tier !== "cheap" || long, effort: tier === "cheap" ? "low" : "medium", source };
}
