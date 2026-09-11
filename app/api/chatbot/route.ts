// ============================================
// WHAT THIS FILE DOES (plain English):
// This is the server door for the website chatbot. A visitor's question
// comes here, we attach Brant's real facts (the knowledge base) as
// instructions, ask the AI model, and stream the answer back word by word.
// Private facts stay on the server. There are cost and safety guards:
// a per-visitor rate limit, a cap on how much text we accept, and a cap on
// how long each answer can be. The model only answers using the knowledge
// base, so it stays grounded in real information about Brant.
// ============================================

import { openai } from "@ai-sdk/openai";
import { streamText, convertToModelMessages, type UIMessage } from "ai";
import { buildSystemPrompt } from "@/lib/ai/prompt";
import { getClientIp, rateLimit } from "@/lib/utils/rate-limit";

// THIS SECTION DOES: run this on the Node.js runtime and allow up to 30
// seconds, matching the old BrantChat function limit for long answers.
export const runtime = "nodejs";
export const maxDuration = 30;

// --- COST/SAFETY: these numbers keep usage and spend under control ---
const RATE_LIMIT_MAX = 20; // most messages one visitor can send...
const RATE_LIMIT_WINDOW_MS = 60_000; // ...in this many milliseconds (1 minute)
const MAX_MESSAGES = 20; // ignore anything older than the last 20 turns
const MAX_MESSAGE_CHARS = 4000; // reject a single question longer than this
const MAX_OUTPUT_TOKENS = 800; // cap the length of each AI answer

// THIS SECTION DOES: pick which AI model to use. It defaults to Brant's
// fine-tuned model, but can be overridden with the AI_MODEL environment
// variable (for example to fall back to a base model like gpt-4o-mini).
const MODEL_ID =
  process.env.AI_MODEL ?? "ft:gpt-4o-mini-2024-07-18:personal:brantchat-trained:CdRL5IwO";

// THIS SECTION DOES: pull the newest visitor question text out of a message
// so we can measure its length for the safety cap
function latestUserText(messages: UIMessage[]): string {
  const lastUser = [...messages].reverse().find((m) => m.role === "user");
  if (!lastUser) return "";
  return lastUser.parts
    .filter((part): part is { type: "text"; text: string } => part.type === "text")
    .map((part) => part.text)
    .join(" ");
}

export async function POST(request: Request) {
  // --- SECURITY: refuse early if the AI key is not configured, instead of
  // leaking a confusing model error to the visitor ---
  if (!process.env.OPENAI_API_KEY) {
    return Response.json(
      { error: "Chat is not configured yet. Set the OPENAI_API_KEY environment variable." },
      { status: 503 }
    );
  }

  // --- COST/SAFETY: slow down anyone sending too many messages too fast ---
  const ip = getClientIp(request);
  const limit = rateLimit(`chatbot:${ip}`, RATE_LIMIT_MAX, RATE_LIMIT_WINDOW_MS);
  if (!limit.allowed) {
    return Response.json(
      { error: "Too many messages. Please wait a moment and try again." },
      { status: 429, headers: { "Retry-After": String(limit.retryAfterSeconds) } }
    );
  }

  // THIS SECTION DOES: read the conversation and optional company/role context
  let body: { messages?: UIMessage[]; company?: string; role?: string };
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }

  const messages = body.messages;
  if (!Array.isArray(messages) || messages.length === 0) {
    return Response.json({ error: "No messages provided." }, { status: 400 });
  }

  // --- COST/SAFETY: reject an over-long single question ---
  if (latestUserText(messages).length > MAX_MESSAGE_CHARS) {
    return Response.json({ error: "Message is too long." }, { status: 413 });
  }

  // THIS SECTION DOES: keep only the most recent turns so old history cannot
  // grow the prompt (and the cost) without bound
  const trimmedMessages = messages.slice(-MAX_MESSAGES);

  // THIS SECTION DOES: build the grounded instructions, then stream the answer.
  // convertToModelMessages turns the browser message shape into what the model
  // expects. The system prompt carries all of Brant's facts.
  const system = buildSystemPrompt({ company: body.company, role: body.role });

  const result = streamText({
    model: openai(MODEL_ID),
    system,
    messages: await convertToModelMessages(trimmedMessages),
    maxOutputTokens: MAX_OUTPUT_TOKENS,
    temperature: 0.7,
  });

  return result.toUIMessageStreamResponse();
}
