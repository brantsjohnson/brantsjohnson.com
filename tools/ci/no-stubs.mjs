// ============================================
// WHAT THIS FILE DOES (plain English):
// This checks the public site source for stub language and for the
// claims the copy map said to remove. It fails the build if those
// words show up in pages, components, or public content.
// The separate BrantChat app and the old private notes file are
// outside this check.
// ============================================

import { readdirSync, readFileSync, statSync } from "fs";
import { join } from "path";

const roots = ["app/(marketing)", "app/api/ask", "app/api/contact", "components", "content"];
const banned = [
  /coming soon/i,
  /\blorem\b/i,
  /\bTODO\b/,
  /AWS Certified/i,
  /Business Strategy/i,
  /Marriott School/i,
  /emphasis in Product Management/i,
];

function filesIn(dir, found = []) {
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    const stat = statSync(path);
    if (stat.isDirectory()) filesIn(path, found);
    else if (/\.(tsx|ts|md|css)$/.test(name)) found.push(path);
  }
  return found;
}

const hits = [];
for (const root of roots) {
  for (const file of filesIn(root)) {
    const text = readFileSync(file, "utf8");
    for (const pattern of banned) {
      if (pattern.test(text)) hits.push(`${file} matches ${pattern}`);
    }
  }
}

if (hits.length) {
  console.error(hits.join("\n"));
  process.exit(1);
}

console.log("no-stubs: public copy is clean");
