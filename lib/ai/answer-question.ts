// ============================================
// WHAT THIS FILE DOES (plain English):
// This answers one question about Brant from the checked public notes.
// The first reply stays on that question. A follow-up such as
// "tell me more" can add the next fact about the same topic.
// It does not recite the rest of his life.
// Wording here has to stay inside content/about-brant.md and content/about-me.md.
// ============================================

// THIS SECTION DOES: the starter questions shown on the Ask page and locked by tests
export const PRESET_QUESTIONS = [
  "What is Brant building now?",
  "What did Brant work on at Crew?",
  "How did the archway get built?",
  "How do I contact Brant?",
] as const;

type Topic = {
  id: string;
  score: (question: string) => number;
  short: string;
  more: string;
};

function hits(question: string, patterns: RegExp[]): number {
  return patterns.reduce((sum, pattern) => sum + (pattern.test(question) ? 1 : 0), 0);
}

// THIS SECTION DOES: map a question onto one topic and the two depths of answer
const TOPICS: Topic[] = [
  {
    id: "contact",
    score: (question) => hits(question, [/\b(reach|email|contact|write him|get in touch)\b/i]),
    short: "Email me@brantsjohnson.com.",
    more: "The Contact page takes a note. If you met him in person, the short follow-up page is brantsjohnson.com/hi. To book time, use https://calendar.app.google/ENDtr2C17GdEqLSYA.",
  },
  {
    id: "school",
    score: (question) =>
      hits(question, [/\b(school|college|university|degree|uvu|woodbury|major|studied|study)\b/i]) -
      hits(question, [/\b(high school|student body|counselors?)\b/i]),
    short:
      "He earned a BS in Business and Analysis at Utah Valley University, Woodbury School of Business, in 2025.",
    more: "It is a bachelor's degree only.",
  },
  {
    id: "certificates",
    score: (question) => hits(question, [/\b(certificate|certificates|pendo|agile|sql|python|figma)\b/i]),
    short:
      "Pendo Essentials for Web, from October 2022, is a verified certificate. Agile Foundations is a course certificate, not a professional certification.",
    more: "SQL, Python, and Figma are working skills.",
  },
  {
    id: "bridger",
    score: (question) => hits(question, [/\bbridger\b/i]) * 3,
    short:
      "Bridger helps people become friends around what they love. He is Founder, from April 2025, and it is in a TestFlight beta at bridger.social.",
    more: "The public notes do not give a user count.",
  },
  {
    id: "building",
    score: (question) => hits(question, [/\b(building|intro)\b/i]),
    short:
      "He is building Intro and Bridger. Intro is AI agent software for live events. Bridger helps people become friends around what they love.",
    more: "Intro is live at intro.events. Bridger is live at bridger.social. He is Founder and Product Lead of Intro, from November 2025, and Founder of Bridger, from April 2025.",
  },
  {
    id: "crew",
    score: (question) => hits(question, [/\b(crew|visa|mastercard|kyc)\b/i]),
    short:
      "At Crew Finance he was the first employee and the only product manager, from December 2022 to April 2024. He owned the Mastercard card program and cut onboarding time in half.",
    more: "He coordinated a debit-card program from the ground up, including KYC, processing, card lifecycle, and physical card and packaging manufacturing. He drew the 2024 wordmark Crew still uses, and built the financial models for a raise.",
  },
  {
    id: "utah",
    score: (question) => hits(question, [/\b(utah business|deseret|account executive)\b/i]),
    short:
      "He was an account executive at Utah Business in Salt Lake City from October 2024 to November 2025. He covered 63 clients and 52 annual events.",
    more: "He sold print, digital, and event campaigns, ran weekly AI training, and used Monday.com and Magazine Manager. He no longer works there.",
  },
  {
    id: "location",
    // The About page says "I live in American Fork, Utah, and I am open to relocating."
    // Ask uses the same facts in the third person.
    score: (question) =>
      hits(question, [
        /\b(live|lives|living|located|hometown|reside|resides)\b/i,
        /\bwhere (does|is|do) (he|brant)\b/i,
        /\bopen to relocating\b/i,
      ]),
    short: "He lives in American Fork, Utah, and he is open to relocating.",
    more: "He is a senior product manager, a creator, performer and entrepreneur, and an activist for the places that raised him.",
  },
  {
    id: "romney",
    score: (question) => hits(question, [/\b(romney|senator|congressional)\b/i]),
    short:
      "He was a congressional intern for Senator Mitt Romney in Washington, D.C., from September 6 to December 8, 2022. He handled constituent inquiries and wrote a brief on nuclear licensing policy for budget appropriations.",
    more: "The brief supported budget appropriations. The internship ran from September 6 to December 8, 2022.",
  },
  {
    id: "divvy",
    score: (question) => hits(question, [/\b(divvy)\b/i]),
    short:
      "He interned at Divvy (BILL) in Draper from June to September 2022, as the analytics partner to 8 product managers.",
    more: "His main project was fixing Pendo so teams could trust what the product analytics told them.",
  },
  {
    id: "backlocal",
    score: (question) => hits(question, [/\b(backlocal|sandbox)\b/i]),
    short:
      "He was head of product at BackLocal, in the Sandbox program, from September 2021 to September 2022. He ran more than 370 user interviews, and the product had revenue at launch.",
    more: "He also led a 7-day design sprint.",
  },
  {
    id: "birmingham",
    score: (question) => hits(question, [/\b(birmingham|england)\b/i]),
    short:
      "From October 2017 to September 2019 he was a pro bono product manager for a volunteer organization in Birmingham, England. He trained and led 400 volunteers.",
    more: "He built 3 reporting tools. Reporting dropped from about 2 days to about 3 hours, and the organization added a second engineer.",
  },
  {
    id: "archway",
    score: (question) => hits(question, [/\b(archway)\b/i]),
    short:
      "He designed, raised support for, and managed the Uintah Resilience Archway in Vernal. The build ran from 2017 to 2023.",
    more: "Uintah had an archway for more than 60 years, and he decided to reconstruct a new one.",
  },
  {
    id: "scholarship",
    score: (question) => hits(question, [/\b(scholarship)\b/i]),
    short: "He founded the Resilience Scholarship in 2020 so more graduating seniors could be seen.",
    more: "He also started a weekly meeting with the school counselors.",
  },
  {
    id: "hilo",
    score: (question) => hits(question, [/\b(hilo|habitat|hawaii)\b/i]),
    short: "In 2021 he led 22 youth to Hilo, Hawaii, with Habitat for Humanity, over a series of 10 days, to build a home.",
    more: "He planned daily service, cultural, and personal growth activities, and got the group through COVID protocol.",
  },
  {
    id: "tedx",
    score: (question) => hits(question, [/\btedx\b/i]),
    short: "He was an organization assistant at TEDxSaltLakeCity from January to September 2021.",
    more: "He directed monthly meetings, set agendas and minutes, and designed brand creative.",
  },
  {
    id: "student",
    score: (question) => hits(question, [/\b(student body|student government)\b/i]),
    short: "He was student body president in elementary, middle, and high school in Vernal, Utah.",
    more: "That is the public note on student government.",
  },
  {
    id: "performer",
    score: (question) =>
      hits(question, [/\b(theater|theatre|performer|performing|ambassadors|hale|mermaid)\b/i]),
    short:
      "He loves theater. In high school he was recognized among the top high-school actors in Utah twice. He made BYU Young Ambassadors as a non-major and was cast at Hale Centre Theatre in Elf the Musical.",
    more: "Singing in public is one of his biggest fears. Theater taught him how a product team works: different crafts, one experience.",
  },
  {
    id: "governor",
    score: (question) => hits(question, [/\b(governor|economic development)\b/i]),
    short:
      "During COVID he interned in the Governor's Office and worked with the Governor's Office of Economic Development.",
    more: "At sixteen he called his city manager and asked to be the city's first intern. The city manager said yes.",
  },
  {
    id: "who",
    score: (question) => hits(question, [/\bwho\b/i, /\babout him\b/i]),
    short:
      "Brant S. Johnson is a senior product manager, creator, performer and entrepreneur in American Fork, Utah. He builds technology as a bridge to real human connection.",
    more: "He has about six years of product experience, and he is open to relocating.",
  },
];

function bestTopic(question: string): Topic | undefined {
  let winner: Topic | undefined;
  let best = 0;
  for (const topic of TOPICS) {
    const score = topic.score(question);
    if (score > best) {
      best = score;
      winner = topic;
    }
  }
  return winner;
}

function isVagueFollowUp(question: string): boolean {
  return (
    /^(more|else|and)\??$/i.test(question.trim()) ||
    /\b(tell me more|what else|go on|say more|expand on that|more about that)\b/i.test(question)
  );
}

export const MISSING_NOTES_REPLY = "I don't have that in the public notes. You can reach Brant from the Contact page.";

// A fun-story question does not name a job or a project, so the topic list misses it.
// These two replies are stories already written in content/about-me.md.
const FUN_STORY =
  "In third grade he started a petition to put bees on the endangered species list. He collected two pages of signatures to send to the President. The petition never left the house.";
const FUN_STORY_MORE =
  "He makes his own Christmas sweater every year and, as of 2024, had not lost any of seventeen contests. At nine he coded a video game about space bees with his dad.";

// THIS SECTION DOES: true when the person wants a story or a fun fact, not a job history
function asksForAStory(question: string): boolean {
  return /\b(fun|funny|hobby|hobbies|weird|random|childhood)\b/i.test(question) || /\bstor(y|ies)\b/i.test(question);
}

// THIS SECTION DOES: the reply for a question that names a known topic, such as Crew or the archway.
// Returns null when the question is not one of those topics, so the notes search can take it.
export function replyForKnownTopic(question: string, earlierQuestions: string[] = []): string | null {
  const asked = question.trim();
  if (!asked) return "Ask about his work, his schooling, or how to reach him.";

  if (/\baws\b/i.test(asked)) return "The public notes do not list an AWS certificate.";
  if (/\b(byu|brigham young|mpa)\b/i.test(asked)) {
    return "He earned a BS in Business and Analysis at Utah Valley University in 2025. The public notes do not list a BYU degree or an MPA.";
  }

  if (!isVagueFollowUp(asked)) return bestTopic(asked)?.short ?? null;

  for (const earlier of [...earlierQuestions].reverse()) {
    const topic = bestTopic(earlier);
    if (topic) return topic.more;
  }
  return null;
}

// THIS SECTION DOES: answer the latest question, using earlier questions only when this one asks to continue
export function answerFromNotes(question: string, earlierQuestions: string[] = []): string {
  const known = replyForKnownTopic(question, earlierQuestions);
  if (known) return known;

  const asked = question.trim();
  if (asksForAStory(asked)) return FUN_STORY;
  if (isVagueFollowUp(asked) && earlierQuestions.some(asksForAStory)) return FUN_STORY_MORE;
  if (isVagueFollowUp(asked)) return "Tell me which part you want more on: the work, the schooling, or how to reach him.";
  return MISSING_NOTES_REPLY;
}
