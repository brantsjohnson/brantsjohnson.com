// ============================================
// WHAT THIS FILE DOES (plain English):
// This answers "Ask about me" from the checked public notes when
// there is no AI key, and it is also the safety net that never
// invents a fact. It picks the note sections that share words with
// the question and returns those sentences. It does not call a model.
// ============================================

import "server-only";
import { readFileSync } from "fs";
import { join } from "path";

// THIS SECTION DOES: ignore tiny words that would match every section
const STOP = new Set([
  "what",
  "whats",
  "who",
  "whom",
  "when",
  "where",
  "which",
  "why",
  "how",
  "does",
  "did",
  "have",
  "has",
  "with",
  "from",
  "that",
  "this",
  "about",
  "brant",
  "johnson",
  "tell",
  "please",
  "your",
  "you",
]);

type Section = { heading: string; body: string };

// THIS SECTION DOES: split the notes file into headed sections
function loadSections(): Section[] {
  const raw = readFileSync(join(process.cwd(), "content", "about-brant.md"), "utf8");
  const chunks = raw.split(/\n## /).slice(1);
  return chunks.map((chunk) => {
    const [heading, ...rest] = chunk.split("\n");
    return { heading: heading.trim(), body: rest.join("\n").trim() };
  });
}

// THIS SECTION DOES: turn a question into meaningful words
function words(question: string): string[] {
  return question
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter((word) => word.length > 2 && !STOP.has(word));
}

// THIS SECTION DOES: answer from the notes, or say the notes do not cover it
export function answerFromPublicNotes(question: string): string {
  const sections = loadSections();
  const who = sections.find((section) => /who i am/i.test(section.heading)) ?? sections[0];
  const asked = question.trim();

  if (!who) {
    return "The public notes are not available right now. Use the Contact page to reach Brant.";
  }

  // A greeting or a broad "who is he" question gets the introduction.
  if (asked.length < 3 || /^(hi|hello|hey)\b/i.test(asked) || /\bwho\b/i.test(asked)) {
    return who.body;
  }

  const tokens = words(asked);
  const ranked = sections
    .map((section) => {
      const hay = `${section.heading} ${section.body}`.toLowerCase();
      const score = tokens.reduce((sum, token) => sum + (hay.includes(token) ? 1 : 0), 0);
      return { section, score };
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 2);

  if (ranked.length === 0) {
    return "The public notes do not cover that. You can reach Brant from the Contact page.";
  }

  return ranked.map((item) => item.section.body).join("\n\n");
}
