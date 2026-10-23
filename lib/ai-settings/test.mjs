import test from "node:test";
import assert from "node:assert/strict";
import { loadRegistry, normalize, resolve, escalate, buildRequest, parseResponse, run, autoRoute, clampEffort, SettingsError } from "./index.mjs";

const R = loadRegistry();
const env = { XAI_API_KEY: "k", OPENAI_API_KEY: "k", ANTHROPIC_API_KEY: "k", GEMINI_API_KEY: "k", TYPESAFE_API_KEY: "k" };
const base = { purpose: "test", provider: "xai", maxCostUsd: 0.05 };

test("rejects missing purpose, cost, and unasked frontier", () => {
  assert.throws(() => normalize({ provider: "xai" }, R), SettingsError);
  assert.throws(() => normalize({ ...base, tier: "frontier", provider: "anthropic" }, R), /allowFrontier/);
  assert.throws(() => normalize({ ...base, provider: "jev" }, R), /router/);
});

test("cheap-first default picks the cheap tier", () => {
  const a = resolve(normalize(base, R), R);
  assert.equal(a.tier, "cheap");
  assert.equal(a.model, "grok-4.20-0309-non-reasoning");
});

test("deep thinking off uses the lowest effort and drops temperature where reasoning forbids it", () => {
  const a = resolve(normalize({ ...base, provider: "openai", temperature: 0.3 }, R), R);
  assert.equal(a.effort, "none");
  assert.equal(a.temperature, 0.3);
  const b = resolve(normalize({ ...base, provider: "openai", temperature: 0.3, deepThinking: true, effort: "high" }, R), R);
  assert.equal(b.effort, "high");
  assert.equal(b.temperature, null);
});

test("clampEffort maps xhigh to the highest supported", () => {
  assert.equal(clampEffort("xhigh", ["low", "medium", "high"]), "high");
});

test("escalation ladder: thinking, effort, tier, never frontier unless allowed", () => {
  const s = normalize({ ...base, provider: "anthropic", escalation: { steps: ["thinking", "effort", "tier"], maxAttempts: 9 } }, R);
  let a = resolve(s, R);
  const seen = [];
  while (a) { seen.push(`${a.model}:${a.deepThinking ? a.effort : "off"}`); a = escalate(s, R, a); }
  assert.deepEqual(seen, ["claude-haiku-5-5:off", "claude-haiku-5-5:medium", "claude-haiku-5-5:high", "claude-sonnet-5-5:medium", "claude-sonnet-5-5:high", "claude-sonnet-5-5:xhigh"]);
});

test("provider fallback", () => {
  const s = normalize({ ...base, escalation: { steps: ["provider"], fallbackProviders: ["gemini"] } }, R);
  const a = escalate(s, R, resolve(s, R));
  assert.equal(a.provider, "gemini");
  assert.equal(a.model, "gemini-3.5-flash-lite");
});

test("request shapes per provider", () => {
  const msgs = [{ role: "system", content: "be brief" }, { role: "user", content: "hi" }];
  const mk = (p, extra = {}) => buildRequest(resolve(normalize({ ...base, provider: p, ...extra }, R), R), msgs, R, env);
  const an = mk("anthropic", { deepThinking: true, effort: "medium" });
  assert.equal(an.body.system, "be brief");
  assert.deepEqual(an.body.thinking, { type: "adaptive" });
  assert.deepEqual(an.body.output_config, { effort: "medium" });
  const g = mk("gemini", { deepThinking: true, effort: "xhigh" });
  assert.equal(g.body.generationConfig.thinkingConfig.thinkingLevel, "high");
  assert.match(g.url, /gemini-3.5-flash-lite:generateContent$/);
  assert.equal(mk("openai").body.reasoning.effort, "none");
  assert.equal(mk("xai").body.reasoning_effort, undefined);
  assert.throws(() => buildRequest(resolve(normalize(base, R), R), msgs, R, {}), /XAI_API_KEY/);
});

test("parses each provider", () => {
  assert.equal(parseResponse("gemini", { candidates: [{ content: { parts: [{ text: "x", thought: true }, { text: "ok" }] } }], usageMetadata: { promptTokenCount: 1, candidatesTokenCount: 2, thoughtsTokenCount: 3 } }).usage.outputTokens, 5);
  assert.equal(parseResponse("anthropic", { content: [{ type: "thinking" }, { type: "text", text: "ok" }], usage: { input_tokens: 1, output_tokens: 1 } }).text, "ok");
});

function fakeFetch(replies) {
  const calls = [];
  const f = async (url, init) => { calls.push({ url, body: JSON.parse(init.body) }); const r = replies.shift(); return { ok: true, status: 200, json: async () => r }; };
  f.calls = calls; return f;
}
const xaiReply = (t) => ({ choices: [{ message: { content: t } }], usage: { prompt_tokens: 100, completion_tokens: 50 } });

test("run escalates on a failed check and tracks spend", async () => {
  const f = fakeFetch([xaiReply("bad"), xaiReply("GOOD")]);
  const r = await run(base, [{ role: "user", content: "say GOOD" }], { registry: R, env, fetch: f, check: (t) => t === "GOOD" });
  assert.equal(r.ok, true);
  assert.deepEqual(f.calls.map((c) => c.body.model), ["grok-4.20-0309-non-reasoning", "grok-4.7"]);
  assert.ok(r.spentUsd > 0 && r.spentUsd < 0.001);
});

test("run refuses attempts over the cost cap", async () => {
  const f = fakeFetch([]);
  const r = await run({ ...base, maxCostUsd: 0.000001 }, [{ role: "user", content: "x" }], { registry: R, env, fetch: f });
  assert.equal(r.ok, false);
  assert.equal(f.calls.length, 0);
  assert.match(r.log[0].skipped, /over budget/);
});

test("autoRoute: rules, then Jev when confident", async () => {
  assert.equal((await autoRoute("fix the typo", { env: {} })).tier, "cheap");
  assert.equal((await autoRoute("debug the auth migration", { env: {} })).tier, "workhorse");
  const f = async () => ({ ok: true, json: async () => ({ answers: { tier: { choice: "frontier", confidence: 0.9, probabilities: {} } } }) });
  const r = await autoRoute("anything", { env, fetch: f, useJev: true });
  assert.equal(r.tier, "workhorse");
  assert.equal(r.source, "jev");
});
