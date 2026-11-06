// ============================================
// WHAT THIS FILE DOES (plain English):
// This is the public Ask answer when no model is required.
// It reads the notes, finds the section closest to the question,
// and uses the thread so "go deeper" continues that section.
// ============================================

import "server-only";
import { existsSync, readFileSync } from "fs";
import { join } from "path";
import { composeAnswer, type ChatTurn } from "@/lib/ai/closest-notes";

// THIS SECTION DOES: read one notes file and drop the editor comments visitors never hear
function readNotes(fileName: string): string {
  const notesPath = join(process.cwd(), "content", fileName);
  if (!existsSync(notesPath)) return "";
  return readFileSync(notesPath, "utf8").replace(/<!--[\s\S]*?-->/g, "").trim();
}

// THIS SECTION DOES: answer from the notes. earlierQuestions is the older shape.
// thread is the full conversation, questions and answers, which a follow-up needs.
export function answerFromPublicNotes(
  question: string,
  earlierQuestions: string[] = [],
  thread: ChatTurn[] = []
): string {
  const history: ChatTurn[] = thread.length
    ? thread
    : earlierQuestions.map((text) => ({ role: "user" as const, text }));
  const notes = [readNotes("about-brant.md"), readNotes("about-me.md")].filter(Boolean).join("\n\n");
  return composeAnswer(notes, question, history);
}
