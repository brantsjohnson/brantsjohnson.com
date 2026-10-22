// ============================================
// WHAT THIS FILE DOES (plain English):
// This checks the words a visitor can read. The public site has to
// stay free of withheld topics, dollar figures, and a few voice slips.
// ============================================

import assert from "node:assert/strict";
import { test } from "node:test";
import {
  about,
  booking,
  building,
  contactIntro,
  experience,
  experienceIntro,
  hero,
  hiPage,
  homeRecord,
  nowPage,
  projects,
  serviceStories,
} from "../../content/site-content";
import { referralVariantContent } from "../../content/referral-variants";
import { defaultAndLinkedInSecurityLines, socialSecurityLines } from "../../content/security-site-lines";

function strings(value: unknown, found: string[] = []): string[] {
  if (typeof value === "string") found.push(value);
  else if (Array.isArray(value)) value.forEach((item) => strings(item, found));
  else if (value && typeof value === "object") {
    Object.values(value as Record<string, unknown>).forEach((item) => strings(item, found));
  }
  return found;
}

const publicCopy = strings({
  about,
  booking,
  building,
  contactIntro,
  experience,
  experienceIntro,
  hero,
  hiPage,
  homeRecord,
  nowPage,
  projects,
  serviceStories,
  referralVariantContent,
  defaultAndLinkedInSecurityLines,
  socialSecurityLines,
});

test("public copy stays inside the voice rules", () => {
  const banned = [/\$/, /—/, /–/, /\bactually\b/i, /\bIsrael\b/, /\bTrump\b/, /1,778/, /TestFlight/i, /2\.5/];
  for (const line of publicCopy) {
    for (const pattern of banned) {
      assert.doesNotMatch(line, pattern, line);
    }
  }
});

test("public copy names Bridger and the booking link", () => {
  const joined = publicCopy.join("\n");
  assert.match(joined, /https:\/\/bridger\.social/);
  assert.match(joined, /beta of about 25 people/);
  assert.match(joined, /https:\/\/calendar\.app\.google\/qj9tb56BYCdppJPk9/);
});
