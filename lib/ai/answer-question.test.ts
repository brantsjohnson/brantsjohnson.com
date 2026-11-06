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

function notesBank(): string {
  return `${readFileSync("content/about-brant.md", "utf8")}\n${readFileSync("content/about-me.md", "utf8")}`;
}

function sentences(answer: string): string[] {
  return answer.split(/[.!?]+/).map((part) => part.trim()).filter(Boolean);
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
