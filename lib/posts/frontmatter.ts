// ============================================
// WHAT THIS FILE DOES (plain English):
// Reads the small settings block at the top of a post file (between
// two lines of three dashes) and the text under it. It understands the
// simple forms posts use: a word, a "quoted line", yes or no, and a
// list written [like, this]. It is deliberately tiny and strict so a
// typo is reported instead of guessed at.
// ============================================

export type FrontmatterValue = string | boolean | string[];

export type ParsedFile = {
  data: Record<string, FrontmatterValue>;
  body: string;
  errors: string[];
};

function unquote(raw: string): string {
  const value = raw.trim();
  if ((value.startsWith('"') && value.endsWith('"') && value.length >= 2) || (value.startsWith("'") && value.endsWith("'") && value.length >= 2)) {
    return value.slice(1, -1).replace(/\\"/g, '"').replace(/\\'/g, "'");
  }
  return value;
}

function parseValue(raw: string): FrontmatterValue {
  const value = raw.trim();
  if (value === "true") return true;
  if (value === "false") return false;
  if (value.startsWith("[") && value.endsWith("]")) {
    const inner = value.slice(1, -1).trim();
    if (!inner) return [];
    return inner.split(",").map((item) => unquote(item)).filter(Boolean);
  }
  return unquote(value);
}

// THIS SECTION DOES: split a file into its settings and its body
export function parseFrontmatter(source: string): ParsedFile {
  const errors: string[] = [];
  const text = source.replace(/^﻿/, "").replace(/\r\n/g, "\n");
  if (!text.startsWith("---\n")) {
    return { data: {}, body: text.trim(), errors: ["The file must start with a --- line, then the settings, then another --- line."] };
  }
  const end = text.indexOf("\n---", 4);
  if (end === -1) {
    return { data: {}, body: "", errors: ["The settings block is not closed with a --- line."] };
  }
  const head = text.slice(4, end);
  const body = text.slice(end + 4).replace(/^\n/, "").trim();
  const data: Record<string, FrontmatterValue> = {};
  head.split("\n").forEach((line, index) => {
    if (!line.trim() || line.trim().startsWith("#")) return;
    const colon = line.indexOf(":");
    if (colon <= 0) {
      errors.push(`Settings line ${index + 1} is not "name: value": ${line}`);
      return;
    }
    const key = line.slice(0, colon).trim();
    if (!/^[A-Za-z][A-Za-z0-9]*$/.test(key)) {
      errors.push(`Settings line ${index + 1} has a name that is not a plain word: ${key}`);
      return;
    }
    data[key] = parseValue(line.slice(colon + 1));
  });
  return { data, body, errors };
}
