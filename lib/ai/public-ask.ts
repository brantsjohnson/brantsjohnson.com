// ============================================
// WHAT THIS FILE DOES (plain English):
// This is the same answering path POST /api/ask uses. A known question
// (school, Bridger, Crew, and the rest of the topic list) gets the short
// reply for that topic. Anything else is answered from the closest notes
// section. Known topics go first so a word like "school" or "degree"
// cannot pull a theater or contact paragraph.
// ============================================

import { replyForKnownTopic } from "@/lib/ai/answer-question";
import { composeAnswer, type ChatTurn } from "@/lib/ai/closest-notes";

function historyFrom(
  earlierQuestions: string[],
  thread: ChatTurn[]
): ChatTurn[] {
  if (thread.length) return thread;
  return earlierQuestions.map((text) => ({ role: "user" as const, text }));
}

// THIS SECTION DOES: answer one Ask question the way the live route does
export function answerFromNotesAndSearch(
  notes: string,
  question: string,
  earlierQuestions: string[] = [],
  thread: ChatTurn[] = []
): string {
  const history = historyFrom(earlierQuestions, thread);
  const earlier = history.filter((turn) => turn.role === "user").map((turn) => turn.text);
  const known = replyForKnownTopic(question, earlier);
  if (known) return known;
  return composeAnswer(notes, question, history);
}
