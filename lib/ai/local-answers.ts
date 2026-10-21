// ============================================
// WHAT THIS FILE DOES (plain English):
// This is the public Ask answer when no model is required. It keeps
// the reply on the question that was asked. Follow-up questions can
// go one step further on the same topic.
// ============================================

import "server-only";
import { answerFromNotes } from "@/lib/ai/answer-question";

// THIS SECTION DOES: answer from the checked facts, using earlier questions only as follow-up context
export function answerFromPublicNotes(question: string, earlierQuestions: string[] = []): string {
  return answerFromNotes(question, earlierQuestions);
}
