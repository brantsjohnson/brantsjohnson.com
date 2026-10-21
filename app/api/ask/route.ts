// ============================================
// WHAT THIS FILE DOES (plain English):
// This is the no-model door for Ask about me. A question comes in,
// we answer from the checked public notes, and we send the sentences
// back. It works when there is no AI key, and it never invents a fact.
// ============================================

import { answerFromPublicNotes } from "@/lib/ai/local-answers";
import { getClientIp, rateLimit } from "@/lib/utils/rate-limit";

export const runtime = "nodejs";

export async function POST(request: Request) {
  // --- COST/SAFETY: slow down anyone firing questions too fast ---
  const ip = getClientIp(request);
  const limit = rateLimit(`ask:${ip}`, 30, 60_000);
  if (!limit.allowed) {
    return Response.json(
      { error: "Too many questions. Please wait a moment and try again." },
      { status: 429 }
    );
  }

  let body: { question?: string; earlier?: unknown };
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "That note could not be read. Try again." }, { status: 400 });
  }

  const question = (body.question ?? "").trim();
  if (!question) {
    return Response.json({ error: "Type a question first." }, { status: 400 });
  }
  if (question.length > 500) {
    return Response.json({ error: "That question is too long." }, { status: 413 });
  }

  const earlier = Array.isArray(body.earlier)
    ? body.earlier.filter((item): item is string => typeof item === "string").slice(-6)
    : [];

  return Response.json({ answer: answerFromPublicNotes(question, earlier) });
}
