// ============================================
// WHAT THIS FILE DOES (plain English):
// This is the no-model door for Ask about me. A question comes in
// with the thread so far. We find the closest part of the notes
// and send those sentences back. A follow-up can go deeper because
// the thread still has the question and the answer before it.
// ============================================

import { answerFromPublicNotes } from "@/lib/ai/local-answers";
import type { ChatTurn } from "@/lib/ai/closest-notes";
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

  let body: { question?: string; earlier?: unknown; thread?: unknown };
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
    ? body.earlier.filter((item): item is string => typeof item === "string").slice(-8)
    : [];

  // The thread is the whole conversation, including answers, so a follow-up knows what was just said.
  const thread = Array.isArray(body.thread)
    ? body.thread
        .filter((item): item is ChatTurn => {
          if (!item || typeof item !== "object") return false;
          const turn = item as ChatTurn;
          return (
            (turn.role === "user" || turn.role === "assistant") &&
            typeof turn.text === "string" &&
            turn.text.length > 0 &&
            turn.text.length <= 2000
          );
        })
        .slice(-16)
    : [];

  return Response.json({ answer: answerFromPublicNotes(question, earlier, thread) });
}
