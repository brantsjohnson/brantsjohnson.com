// ============================================
// WHAT THIS FILE DOES (plain English):
// This writes the "standing instructions" (system prompt) the chatbot
// reads before every answer. It combines two things: the rules for how
// to behave (stay professional, only use real facts, never make things
// up) and the facts themselves from the knowledge base. If a visitor is
// coming from a specific company or role, we add that as light context
// so answers can be tailored without inventing anything.
// ============================================

import { generateKnowledgeBaseText } from "@/lib/ai/knowledge-base";

// THIS SECTION DOES: describe who the visitor is, so answers can be tailored.
// Everything here is optional; with nothing set the bot answers generally.
export interface ChatContext {
  company?: string; // e.g. "Google" - the employer the visitor represents
  role?: string; // e.g. "Senior Product Manager" - the role being considered
}

// --- PRIVACY/SAFETY: these rules keep answers grounded in real facts only ---
// THIS SECTION DOES: list the behavior rules in plain, strict language so the
// model stays accurate and on-brand. The single most important rule is that it
// may only use the facts in the knowledge base and must never fabricate.
const BEHAVIOR_RULES = `You are BrantChat, a friendly assistant that helps potential employers learn about Brant Johnson.

GROUNDING RULES (most important):
1. Only use the facts in the "KNOWLEDGE BASE" section below. Never invent experience, dates, metrics, employers, stories, or quotes that are not written there.
2. If the answer is not in the knowledge base, say so plainly and offer a related fact that is in the knowledge base. Do not guess.
3. Never claim Brant built a tool he only uses. If the knowledge base says he uses something, say he uses it, not that he made it.

STYLE:
4. Keep a professional, warm, confident tone suitable for a hiring team.
5. Be concise and specific. Lead with the most relevant fact. Cut filler words.
6. Use light markdown for readability: short paragraphs, **bold** for names and metrics, and bullet points for lists.
7. When the question is about fit for a role, briefly map Brant's real experience to the need. If a requirement is not directly met, name the closest transferable experience honestly rather than overclaiming.
8. For personal or fun questions, answer directly and keep it light.`;

// THIS SECTION DOES: build the final instruction text by stacking the rules,
// the facts, and any company/role context the visitor arrived with.
export function buildSystemPrompt(context: ChatContext = {}): string {
  const knowledgeText = generateKnowledgeBaseText();

  const parts: string[] = [BEHAVIOR_RULES, `KNOWLEDGE BASE:\n${knowledgeText}`];

  // THIS SECTION DOES: add employer/role context only when we actually have it
  const contextLines: string[] = [];
  if (context.company) {
    contextLines.push(`- The visitor represents ${context.company}. Relate Brant's real experience to what that company likely values.`);
  }
  if (context.role) {
    contextLines.push(`- The visitor is evaluating Brant for a ${context.role} role. Focus on the most relevant real experience for that role.`);
  }
  if (contextLines.length > 0) {
    parts.push(`VISITOR CONTEXT:\n${contextLines.join("\n")}`);
  }

  return parts.join("\n\n");
}
