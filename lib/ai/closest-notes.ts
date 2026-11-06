// ============================================
// WHAT THIS FILE DOES (plain English):
// This is how Ask about me answers when it is reading the notes
// directly. A question comes in. The notes are split into sections.
// The section whose words are closest to the question is the one
// we answer from. A follow-up such as "go deeper" stays on that
// same section and reads the next sentences, using the thread
// that was already said so it does not start over.
// ============================================

import { MISSING_NOTES_REPLY } from "@/lib/ai/answer-question";

export type ChatTurn = { role: "user" | "assistant"; text: string };

type Section = { title: string; sentences: string[] };

const STOP = new Set([
  "the", "and", "for", "you", "your", "can", "could", "would", "please", "something", "anything",
  "tell", "about", "brant", "what", "did", "does", "how", "his", "him", "her", "she", "they",
  "them", "that", "this", "have", "has", "was", "were", "with", "from", "into", "onto", "just",
  "like", "want", "need", "give", "get", "got", "ask", "asked", "there", "here", "when", "where",
  "who", "why", "which", "than", "then", "also", "more", "else", "deeper", "not", "but", "its",
  "it's", "are", "been", "being", "will", "would", "should", "could", "our", "out", "one", "two",
  "another", "other", "people", "work", "time", "year", "years", "thing", "things", "make", "made",
  "first", "only", "even", "still", "back", "over", "much", "many", "some", "very", "really",
  "because", "while", "after", "before", "through", "around", "same", "new", "old", "part", "way",
]);

// THIS SECTION DOES: true when the person is asking to continue, not to change the subject
export function isContinuation(question: string): boolean {
  const asked = question.trim();
  if (/^(more|else|deeper|and|continue|go on|why|and then)\??$/i.test(asked)) return true;
  if (/\b(go deeper|dig deeper)\b/i.test(asked) && !/\b(crew|archway|bridger|intro|divvy|sales)\b/i.test(asked)) return true;
  return /\b(tell me more|what else|say more|keep going|expand on that|expand on this|more about that|more on that|from that|about that)\b/i.test(asked);
}

function tokens(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter((word) => word.length > 2 && !STOP.has(word));
}

// THIS SECTION DOES: treat "build", "built", and "building" as the same word so a title can match the story
function stem(word: string): string {
  if (word.startsWith("build")) return "build";
  if (word.length > 5 && word.endsWith("ing")) return word.slice(0, -3);
  if (word.length > 4 && word.endsWith("ed")) return word.slice(0, -2);
  if (word.length > 4 && word.endsWith("es")) return word.slice(0, -2);
  if (word.length > 3 && word.endsWith("s") && !word.endsWith("ss")) return word.slice(0, -1);
  return word;
}

// THIS SECTION DOES: add words that point at a story when the question itself is broad
function expand(question: string, own: string[]): { strong: string[]; soft: string[] } {
  // "story" and "fun" say what kind of answer to give. They should not match the word "story" on a page map.
  const strong = own.filter((word) => !["story", "stories", "fun", "funny"].includes(word));
  const soft: string[] = [];
  if (/\b(fun|funny|story|stories|hobby|hobbies|childhood|kid)\b/i.test(question)) {
    soft.push("bees", "sweater", "costume", "science", "petition", "janitors", "sequins", "halloween");
  }
  if (/\b(leader|leadership|team|teams|manage|disagreement)\b/i.test(question)) {
    soft.push("founder", "theater", "archway", "sandbox");
  }
  if (/\b(ai|model|cursor|lovable|chatbot)\b/i.test(question)) {
    soft.push("intro", "gemini", "openai", "chatbot");
  }
  // School and degree questions should land on Education, not a high-school theater paragraph.
  if (
    /\b(degree|college|university|uvu|woodbury|bachelor|graduat|major|studied|study)\b/i.test(question) ||
    /\b(go to school|went to school|did .* school)\b/i.test(question)
  ) {
    strong.push("education", "uvu", "woodbury", "bachelor", "university", "valley", "degree");
  }
  return { strong, soft };
}

// THIS SECTION DOES: drop instructions that were written for the assistant, not for a visitor
function speakable(sentence: string): boolean {
  const text = sentence.trim();
  if (text.length < 20) return false;
  if (/\$|£/.test(text)) return false;
  if (
    /\bdo not\b|\bdon't\b|\bchecked public record\b|\bif someone asks\b|\bignore older\b|^use\b|\bpublic assistant\b|\bthe only facts\b|\bnot covered here\b|\bnot in these notes\b|\buse that record\b|\buse these corrections\b|\bvisitors never\b|\bnot a claim\b|\bleave out\b|\bchecked career\b/i.test(
      text
    )
  ) {
    return false;
  }
  return true;
}

// THIS SECTION DOES: give a heading extra weight when the question is clearly about that heading
function headingAliasScore(title: string, question: string): number {
  let extra = 0;
  if (/education/i.test(title) && /\b(degree|college|university|school|bachelor|uvu|woodbury|major|studied|study)\b/i.test(question)) {
    extra += 14;
  }
  if (/what he is building/i.test(title) && /\b(bridger|intro)\b/i.test(question)) {
    extra += 14;
  }
  if (
    /what he is building/i.test(title) &&
    /\bbuilding\b/i.test(question) &&
    !/\b(archway|arch)\b/i.test(question)
  ) {
    extra += 14;
  }
  if (/how to reach/i.test(title) && /\b(contact|email|reach)\b/i.test(question)) {
    extra += 14;
  }
  if (/\bcrew\b/i.test(title) && /\bcrew\b/i.test(question)) {
    extra += 14;
  }
  // A degree question should not win on a theater or high-school heading just because "school" appears there.
  if (/\b(performing|theater)\b/i.test(title) && /\b(degree|college|university|uvu|bachelor)\b/i.test(question)) {
    extra -= 10;
  }
  return extra;
}

function sentencesOf(text: string): string[] {
  const prose: string[] = [];
  const bullets: string[] = [];
  for (const raw of text.split("\n")) {
    const line = raw.trim();
    if (!line || line.startsWith("#")) continue;
    if (line.startsWith("- ") || line.startsWith("* ")) {
      bullets.push(line.replace(/^[-*]\s+/, ""));
      continue;
    }
    prose.push(line);
  }
  // Keep "Brant S. Johnson" as one sentence. A single initial is not the end of a sentence.
  const fromProse = prose
    .join(" ")
    .replace(/\b([A-Z])\./g, "$1\u0000")
    .split(/(?<=[.!?])\s+(?=[A-Z"'])/)
    .map((sentence) => sentence.replace(/\u0000/g, ".").trim());
  const fromBullets = bullets.map((bullet) => (/[.!?]$/.test(bullet) ? bullet : `${bullet}.`));
  return [...fromProse, ...fromBullets].filter(speakable);
}

// THIS SECTION DOES: break the notes into headed sections a question can match
function parseSections(notes: string): Section[] {
  const sections: Section[] = [];
  let title = "";
  let body: string[] = [];
  const flush = () => {
    const sentences = sentencesOf(body.join("\n"));
    if (title && sentences.length) sections.push({ title, sentences });
    body = [];
  };
  for (const line of notes.split("\n")) {
    const heading = /^#{2,3}\s+(.+)$/.exec(line.trim());
    if (heading) {
      flush();
      title = heading[1].trim();
      continue;
    }
    if (title) body.push(line);
  }
  flush();
  return sections;
}

function countStem(words: string[], stemWord: string): number {
  return words.filter((word) => stem(word) === stemWord).length;
}

function scoreSection(section: Section, strong: string[], soft: string[], question: string): number {
  const titleWords = tokens(section.title);
  const bodyWords = tokens(section.sentences.join(" "));
  const strongStems = strong.map(stem);
  let score = headingAliasScore(section.title, question);
  let matched = 0;
  for (const word of strongStems) {
    const inTitle = titleWords.some((titleWord) => stem(titleWord) === word);
    const found = countStem(bodyWords, word);
    if (inTitle || found) matched += 1;
    if (inTitle) {
      // A heading that is about this word beats a later section that only repeats a vaguer word.
      score += 12 + Math.round(16 / Math.max(titleWords.length, 1));
    }
    score += Math.min(found, 3);
  }
  score += matched * 6;
  for (const word of soft.map(stem)) {
    if (strongStems.includes(word)) continue;
    score += Math.min(countStem(bodyWords, word), 2);
  }
  return score;
}

function bestSection(
  sections: Section[],
  strong: string[],
  soft: string[],
  question: string,
  skip?: Section
): Section | undefined {
  let winner: Section | undefined;
  let best = 0;
  for (const section of sections) {
    if (section === skip) continue;
    const score = scoreSection(section, strong, soft, question);
    if (score > best) {
      best = score;
      winner = section;
    }
  }
  return best >= 3 ? winner : undefined;
}

function sharedRatio(sentence: string, earlier: string): number {
  const words = tokens(sentence);
  if (!words.length) return 0;
  const prior = new Set(tokens(earlier));
  return words.filter((word) => prior.has(word)).length / words.length;
}

function alreadySaid(sentence: string, history: ChatTurn[]): boolean {
  const said = history.filter((turn) => turn.role === "assistant").map((turn) => turn.text).join(" ");
  if (!said) return false;
  return sharedRatio(sentence, said) >= 0.55;
}

// A first reply stays short. A follow-up can add a few more sentences from the same section.
const FIRST_SENTENCES = 3;
const FIRST_CHARS = 480;
const FOLLOW_SENTENCES = 6;
const FOLLOW_CHARS = 900;

function pack(sentences: string[], history: ChatTurn[], start: number): string | null {
  const first = !history.some((turn) => turn.role === "assistant");
  const limit = first ? FIRST_SENTENCES : FOLLOW_SENTENCES;
  const maxChars = first ? FIRST_CHARS : FOLLOW_CHARS;
  const next: string[] = [];
  let chars = 0;
  for (const sentence of sentences.slice(start)) {
    if (alreadySaid(sentence, history)) continue;
    if (next.length >= limit) break;
    if (next.length > 0 && chars + sentence.length > maxChars) break;
    next.push(sentence);
    chars += sentence.length + 1;
  }
  return next.length ? next.join(" ") : null;
}

// THIS SECTION DOES: find the section the last answer came from, then read the next sentences
function nextFromThread(sections: Section[], history: ChatTurn[]): string | null {
  const lastAnswer = [...history].reverse().find((turn) => turn.role === "assistant")?.text ?? "";
  const lastQuestion = [...history].reverse().find((turn) => turn.role === "user" && !isContinuation(turn.text))?.text ?? "";
  if (!lastAnswer && !lastQuestion) return null;

  // Use the section that shares the most words with the last answer, so a weak earlier match cannot steal the thread.
  let section: Section | undefined;
  let bestOverlap = 0;
  for (const item of sections) {
    const overlap = item.sentences.reduce((best, sentence) => Math.max(best, sharedRatio(sentence, lastAnswer)), 0);
    if (overlap > bestOverlap) {
      bestOverlap = overlap;
      section = item;
    }
  }
  if (bestOverlap < 0.45) section = undefined;
  if (!section && lastQuestion) {
    const query = expand(lastQuestion, tokens(lastQuestion));
    section = bestSection(sections, query.strong, query.soft, lastQuestion);
  }
  if (!section) return null;

  const lastIndex = section.sentences.reduce((found, sentence, index) => {
    return sharedRatio(sentence, lastAnswer) >= 0.7 ? index : found;
  }, -1);
  const next = pack(section.sentences, history, lastIndex + 1);
  if (next) return next;

  const again = expand(lastQuestion, tokens(lastQuestion));
  const elsewhere = bestSection(sections, again.strong, again.soft, lastQuestion, section);
  return elsewhere ? pack(elsewhere.sentences, history, 0) : null;
}

// THIS SECTION DOES: a broad "tell me about Brant" question has no topic word left after the small words are removed
function isOverview(question: string): boolean {
  const words = tokens(question);
  if (words.length === 0) return true;
  const generic = new Set(["story", "stories", "life", "background", "himself", "yourself", "overview", "introduction", "bio", "biography"]);
  if (words.every((word) => generic.has(word))) return true;
  return /\b(who is he|who are you|about yourself|introduce yourself)\b/i.test(question) && words.length <= 3;
}

// THIS SECTION DOES: the opening of the notes, told in order, for "tell me about Brant"
function overview(sections: Section[]): string | null {
  const order = [/who i am/i, /throughline/i, /what he is building/i];
  const picked: string[] = [];
  let chars = 0;
  for (const pattern of order) {
    const section = sections.find((item) => pattern.test(item.title));
    if (!section) continue;
    for (const sentence of section.sentences) {
      if (picked.length >= 10 || chars > 1400) break;
      picked.push(sentence);
      chars += sentence.length + 1;
    }
  }
  return picked.length ? picked.join(" ") : null;
}

// THIS SECTION DOES: pick the closest section, then enough sentences to tell that part of the story
function closestSentences(sections: Section[], question: string): string | null {
  const query = expand(question, tokens(question));
  const words = [...query.strong, ...query.soft];
  const section = bestSection(sections, query.strong, query.soft, question);
  if (!section) return null;
  // A rare word in the section matters more than a word that is in the heading and repeated throughout.
  const sectionText = section.sentences.join(" ");
  let bestAt = 0;
  let best = -1;
  section.sentences.forEach((sentence, index) => {
    const hay = sentence.toLowerCase();
    let score = 0;
    for (const word of Array.from(new Set(words))) {
      if (!new RegExp(`\\b${word}\\b`).test(hay)) continue;
      const count = sectionText.toLowerCase().match(new RegExp(`\\b${word}\\b`, "g"))?.length ?? 1;
      score += 1 + 3 / count;
    }
    if (score > best) {
      best = score;
      bestAt = index;
    }
  });
  // Start on the sentence that names the thing asked, so "What is Bridger?" does not open on Intro.
  const start = best > 0 ? bestAt : 0;
  return pack(section.sentences, [], start);
}

// THIS SECTION DOES: answer one question from the notes, with the thread so a follow-up can go deeper
export function composeAnswer(notes: string, question: string, history: ChatTurn[] = []): string {
  const cleanNotes = notes.replace(/<!--[\s\S]*?-->/g, " ");
  const asked = question.trim();
  if (!asked) return "Ask about his work, his schooling, or how to reach him.";

  const sections = parseSections(cleanNotes);

  // A degree or a certificate claim has to stay exact. Everything else is told from the notes.
  if (/\baws\b/i.test(asked)) return "The public notes do not list an AWS certificate.";
  if (/\b(degree|graduat|major|mpa)\b/i.test(asked) && /\b(byu|brigham|mpa)\b/i.test(asked)) {
    return "He earned a BS in Business and Analysis at Utah Valley University in 2025. The public notes do not list a BYU degree or an MPA.";
  }

  if (isContinuation(asked)) {
    if (!history.length) return "Tell me which part you want more on, and I can keep going.";
    const next = nextFromThread(sections, history);
    if (next) return next;
  }

  if (isOverview(asked)) return overview(sections) ?? MISSING_NOTES_REPLY;

  return closestSentences(sections, asked) ?? MISSING_NOTES_REPLY;
}
