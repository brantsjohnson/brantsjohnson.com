// ============================================
// WHAT THIS FILE DOES (plain English):
// This loads the facts about Brant (the "knowledge base") from the
// data file and turns them into plain text the AI can read.
// The chatbot is only allowed to answer using this text, so keeping
// it here in one place means updating Brant's info is just editing
// data/brant-knowledge.json. No AI model is called from this file.
// ============================================

import brantKnowledge from "@/data/brant-knowledge.json";

// THIS SECTION DOES: give the rest of the code a simple type for the raw facts.
// The data file has many optional sections, so we treat it as a flexible
// record. The serializer below walks whatever keys exist, so adding new
// sections to the JSON automatically shows up in the chatbot's answers.
export type BrantKnowledge = Record<string, unknown>;

// THIS SECTION DOES: hand back the raw facts object loaded from the data file
export function getBrantKnowledge(): BrantKnowledge {
  return brantKnowledge as BrantKnowledge;
}

// THIS SECTION DOES: turn a camelCase key like "careerStories" into a
// readable heading like "Career Stories" so the AI text reads cleanly
function humanizeKey(key: string): string {
  const withSpaces = key
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/[_-]+/g, " ")
    .trim();
  return withSpaces.replace(/\b\w/g, (char) => char.toUpperCase());
}

// THIS SECTION DOES: turn any value (text, list, or nested object) into
// indented, readable lines. It calls itself for nested pieces so we never
// have to hardcode the exact shape of the knowledge file.
function formatValue(value: unknown, indent: string): string[] {
  if (value === null || value === undefined) return [];

  if (typeof value === "string") {
    if (value.trim() === "") return [];
    return [`${indent}${value}`];
  }

  if (typeof value === "number" || typeof value === "boolean") {
    return [`${indent}${String(value)}`];
  }

  if (Array.isArray(value)) {
    const lines: string[] = [];
    for (const item of value) {
      if (item === null || item === undefined) continue;
      if (typeof item === "object") {
        // A list of objects: render each object as its own small block
        const inner = formatValue(item, `${indent}  `);
        if (inner.length > 0) {
          lines.push(`${indent}-`);
          lines.push(...inner);
        }
      } else {
        lines.push(`${indent}- ${String(item)}`);
      }
    }
    return lines;
  }

  if (typeof value === "object") {
    const lines: string[] = [];
    for (const [childKey, childValue] of Object.entries(value as Record<string, unknown>)) {
      const label = humanizeKey(childKey);
      if (
        childValue === null ||
        childValue === undefined ||
        (typeof childValue === "string" && childValue.trim() === "")
      ) {
        continue;
      }
      if (typeof childValue === "object") {
        const inner = formatValue(childValue, `${indent}  `);
        if (inner.length > 0) {
          lines.push(`${indent}${label}:`);
          lines.push(...inner);
        }
      } else {
        lines.push(`${indent}${label}: ${String(childValue)}`);
      }
    }
    return lines;
  }

  return [];
}

// THIS SECTION DOES: build the full plain-text version of everything we know
// about Brant. Each top-level section of the JSON becomes an ALL-CAPS heading
// so the AI can scan it easily. This is the only source the chatbot may use.
export function generateKnowledgeBaseText(): string {
  const knowledge = getBrantKnowledge();
  const sections: string[] = [];

  for (const [key, value] of Object.entries(knowledge)) {
    if (key === "lastUpdated") continue; // internal bookkeeping, not useful to the AI
    const heading = humanizeKey(key).toUpperCase();
    const body = formatValue(value, "");
    if (body.length === 0) continue;
    sections.push(`${heading}:\n${body.join("\n")}`);
  }

  return sections.join("\n\n");
}
