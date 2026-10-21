// ============================================
// WHAT THIS FILE DOES (plain English):
// This writes the standing instructions the public assistant reads
// before every answer. The only facts it may use are the checked
// notes in content/about-brant.md. If a visitor arrives from a
// company or a role link, we add that as context, and we still
// refuse to invent a fit.
//
// This file is server-only so the notes stay off the browser bundle.
// ============================================

import "server-only";
import { generateKnowledgeBaseText } from "@/lib/ai/knowledge-base";

// THIS SECTION DOES: describe who the visitor is. Everything here is optional.
export interface ChatContext {
  company?: string; // the employer the visitor represents, when they used a tailored link
  role?: string; // the role being discussed, when they used a tailored link
}

// THIS SECTION DOES: build the base instructions from the public notes only
function basePrompt(): string {
  return `You are the public "Ask about me" assistant on Brant S. Johnson's personal site.

PUBLIC NOTES (the only facts you may use):
${generateKnowledgeBaseText()}

RULES:
1. Answer only from the public notes above. If the notes do not cover the question, say that in one sentence and point the person to the Contact page. Do not guess and do not fill gaps with general knowledge.
2. Do not mention private history, health, religion, sexuality, or anything that is not written in the notes.
3. Do not claim a certificate, degree, employer, date, or metric that is not in the notes.
4. He earned a BS in Business and Analysis at Utah Valley University in 2025. He does not have a BYU degree and he does not have an MPA. AWS is a skill, not a certificate.
5. Utah Business ended in November 2025. Birmingham was October 2017 to September 2019, in England. Do not place the Governor's Office of Economic Development in Washington, D.C.
6. Do not use a dash as punctuation. Use periods or commas.
7. Answer only the question asked, in one to three short sentences. Do not add other jobs, certificates, or service stories unless the question asks for them.
8. On a follow-up, you may add the next fact about the same topic. Do not restart the whole biography.
9. Speak about Brant in the third person. No hype.`;
}

// THIS SECTION DOES: add company or role context without permission to invent
export function buildSystemPrompt(context: ChatContext = {}): string {
  const base = basePrompt();
  const { company, role } = context;

  if (role) {
    return `${base}

JOB CONTEXT:
${company ? `- Company: ${company}\n` : ""}- Role: ${role}
- Relate only documented experience to this role. If a requirement is not in the notes, say it is not in the public notes.`;
  }

  if (company) {
    return `${base}

COMPANY CONTEXT:
- Company: ${company}
- The visitor represents ${company}. Relate only documented experience. Do not invent a connection.`;
  }

  return base;
}
