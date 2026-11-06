// ============================================
// WHAT THIS FILE DOES (plain English):
// This checks the Ask answers for the starter questions. Each answer
// has to stay short and stay on the question. The school answer, for
// example, is the school, not the rest of the biography.
// ============================================

import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";
import { composeAnswer } from "./closest-notes";
import { PRESET_QUESTIONS, answerFromNotes } from "./answer-question";
import { answerFromNotesAndSearch } from "./public-ask";

function notesBank(): string {
  return `${readFileSync("content/about-brant.md", "utf8")}\n${readFileSync("content/about-me.md", "utf8")}`;
}

function sentences(answer: string): string[] {
  // Keep "D.C." as one unit so a Washington answer is not counted as extra sentences.
  return answer
    .replace(/\b([A-Z])\./g, "$1\u0000")
    .split(/[.!?]+/)
    .map((part) => part.replace(/\u0000/g, ".").trim())
    .filter(Boolean);
}

test("preset answers stay short and on topic", () => {
  const expected = [
    { question: PRESET_QUESTIONS[0], include: /Intro/i, also: /Bridger/i, exclude: /Romney|Archway|TEDx|Utah Valley|\$|TestFlight|1,778/i },
    { question: PRESET_QUESTIONS[1], include: /Crew/i, also: /Mastercard/i, exclude: /Utah Valley|Bridger|Archway|TEDx|Visa|\$/i },
    { question: PRESET_QUESTIONS[2], include: /Archway/i, exclude: /Utah Valley|Bridger|Crew|TEDx|\$/i },
    { question: PRESET_QUESTIONS[3], include: /me@brantsjohnson.com/i, exclude: /Archway|TEDx|Crew|Utah Valley/i },
  ];

  for (const item of expected) {
    const answer = answerFromNotes(item.question);
    assert.match(answer, item.include, item.question);
    if ("also" in item && item.also) assert.match(answer, item.also, item.question);
    assert.doesNotMatch(answer, item.exclude, `${item.question} -> ${answer}`);
    assert.ok(sentences(answer).length <= 3, `${item.question} has too many sentences: ${answer}`);
    assert.ok(answer.length <= 360, `${item.question} is too long: ${answer}`);
  }
});

test("a follow-up adds the next fact and still stays on topic", () => {
  const school = "Where did Brant go to school?";
  const more = answerFromNotes("Tell me more", [school]);
  assert.match(more, /bachelor/i);
  assert.doesNotMatch(more, /Archway|TEDx|Pendo|Habitat|student body/i);

  const certificates = answerFromNotes("What certificates does he have?", [school]);
  assert.match(certificates, /Pendo/i);
  assert.doesNotMatch(certificates, /Archway|TEDx|Habitat|student body/i);
});

test("where he lives matches the About page", () => {
  const about = "I live in American Fork, Utah, and I am open to relocating.";
  const answer = answerFromNotes("Where does Brant live?");
  assert.equal(answer, "He lives in American Fork, Utah, and he is open to relocating.");
  assert.match(about, /American Fork, Utah/);
  assert.match(about, /open to relocating/);
  assert.match(answer, /American Fork, Utah/);
  assert.match(answer, /open to relocating/);
});

test("the Romney answer says the work in the public notes", () => {
  const answer = answerFromNotes("What did Brant do for Senator Romney?");
  assert.match(answer, /constituent inquiries/);
  assert.match(answer, /nuclear licensing policy/);
  assert.doesNotMatch(answer, /50 to 200|500 pages/);
});

test("a fun story comes from the notes instead of the missing-notes line", () => {
  const answer = answerFromNotes("Tell me a fun story about brant");
  assert.match(answer, /bees/i);
  assert.match(answer, /petition/i);
  assert.doesNotMatch(answer, /don't have that|\$|—/);
  assert.ok(sentences(answer).length <= 3, answer);

  const more = answerFromNotes("Tell me more", ["Tell me a fun story about brant"]);
  assert.match(more, /sweater/i);
  assert.doesNotMatch(more, /petition/i);

  const archway = answerFromNotes("Tell me a fun story about the archway");
  assert.match(archway, /Archway/i);
  assert.doesNotMatch(archway, /bees/i);
});

test("tell me about brant is a story, not the missing-notes line", () => {
  const notes = notesBank();
  const about = composeAnswer(notes, "tell me about brant");
  assert.match(about, /Brant S\. Johnson is a senior product manager/);
  assert.match(about, /Good things deserve to happen/);
  assert.ok(about.length > 400, about);
  assert.doesNotMatch(about, /don't have that|\$/);

  const archway = composeAnswer(notes, "what was it like building the archway");
  assert.match(archway, /arch/i);
  assert.doesNotMatch(archway, /Gemini|OpenAI/);

  const building = composeAnswer(notes, "what is he building now");
  assert.match(building, /Intro|Bridger/);
  assert.doesNotMatch(building, /Gemini|OpenAI/);
});

test("any question uses the closest notes, and go deeper stays on that subject", () => {
  const notes = notesBank();
  const first = composeAnswer(notes, "Tell me a fun story about brant");
  assert.match(first, /bees|sweater|petition|costume|science fair|sequins/i);
  assert.doesNotMatch(first, /don't have that|\$/);

  const deeper = composeAnswer(notes, "go deeper", [
    { role: "user", text: "Tell me a fun story about brant" },
    { role: "assistant", text: first },
  ]);
  assert.notEqual(deeper, first);
  assert.doesNotMatch(deeper, /don't have that|\$/);

  const teams = composeAnswer(notes, "How does he think about product teams?");
  assert.match(teams, /product/i);
  assert.doesNotMatch(teams, /don't have that|\$/);

  const theater = composeAnswer(notes, "How is a product team like theater?");
  assert.match(theater, /team|theater|theatre|product/i);
  assert.doesNotMatch(theater, /don't have that|\$/);

  const missing = composeAnswer(notes, "What is his favorite planet in another galaxy?");
  assert.match(missing, /don't have that/);
});

test("public answers skip withheld topics and dollar figures", () => {
  const crewMore = answerFromNotes("Tell me more", ["What did Brant do at Crew?"]);
  assert.match(crewMore, /KYC/i);
  assert.doesNotMatch(crewMore, /\$|million|2\.5/);

  const bridger = answerFromNotes("What is Bridger?");
  assert.match(bridger, /friends/i);
  assert.match(bridger, /bridger\.social/);
  assert.match(bridger, /TestFlight/);
  assert.doesNotMatch(bridger, /25 people|1,778|\$|million/);

  const reach = answerFromNotes("Tell me more", ["How do I reach Brant?"]);
  assert.match(reach, /calendar\.app\.google\/ENDtr2C17GdEqLSYA/);
});

// Assistant-only lines that must never be spoken to a visitor.
const instructionLeak =
  /(?:^|\.\s)Do not |These are the only facts|If a question is not covered|public assistant|Use that record|Ignore older|Use these corrections|visitors never|checked career record|not a claim/i;

test("POST /api/ask answers ten public questions from the right section without leaking instructions", () => {
  const notes = notesBank();
  const cases: { question: string; include: RegExp; also?: RegExp; exclude: RegExp }[] = [
    {
      question: "What degree does Brant have?",
      include: /Utah Valley University/i,
      also: /Business and Analysis/i,
      exclude: /Contact email|Little Mermaid|Young Ambassadors|Hale/i,
    },
    {
      question: "What is Bridger?",
      include: /Bridger/i,
      also: /friends|TestFlight|bridger\.social/i,
      exclude: /AI software for event organizers|intro\.events/i,
    },
    {
      question: "Where did Brant go to school?",
      include: /Utah Valley University/i,
      exclude: /Little Mermaid|Young Ambassadors|Hale|Elf the Musical/i,
    },
    {
      question: "How do I contact Brant?",
      include: /me@brantsjohnson.com/i,
      exclude: /Archway|Utah Valley|Bridger|Crew Finance/i,
    },
    {
      question: "What did Brant work on at Crew?",
      include: /Crew/i,
      also: /Mastercard/i,
      exclude: /Utah Valley|Bridger|Visa|\$/i,
    },
    {
      question: "What is Brant building now?",
      include: /Intro/i,
      also: /Bridger/i,
      exclude: /Romney|Archway|TEDx|Utah Valley/i,
    },
    {
      question: "How did the archway get built?",
      include: /Archway/i,
      exclude: /Utah Valley|Bridger|Crew Finance|TEDx/i,
    },
    {
      question: "Where does Brant live?",
      include: /American Fork, Utah/i,
      exclude: /Contact email|Utah Valley|Crew Finance/i,
    },
    {
      question: "What did Brant do for Senator Romney?",
      include: /constituent inquiries/i,
      exclude: /50 to 200|500 pages|Utah Valley|Bridger/i,
    },
    {
      question: "What certificates does he have?",
      include: /Pendo/i,
      exclude: /Archway|Habitat|student body|Utah Valley University/i,
    },
  ];

  assert.equal(cases.length, 10);
  for (const item of cases) {
    const answer = answerFromNotesAndSearch(notes, item.question);
    assert.match(answer, item.include, `${item.question} -> ${answer}`);
    if (item.also) assert.match(answer, item.also, `${item.question} -> ${answer}`);
    assert.doesNotMatch(answer, item.exclude, `${item.question} -> ${answer}`);
    assert.doesNotMatch(answer, instructionLeak, `${item.question} leaked instructions: ${answer}`);
    assert.doesNotMatch(answer, /\$|—/, `${item.question} -> ${answer}`);
    assert.ok(sentences(answer).length <= 3, `${item.question} has too many sentences: ${answer}`);
    assert.ok(answer.length <= 360, `${item.question} is too long: ${answer}`);
  }
});
