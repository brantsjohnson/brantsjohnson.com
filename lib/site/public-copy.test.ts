// ============================================
// WHAT THIS FILE DOES (plain English):
// This checks the words a visitor can read. The public site has to
// stay free of withheld topics, dollar figures, and a few voice slips.
// ============================================

import assert from "node:assert/strict";
import { test } from "node:test";
import {
  activist,
  beliefs,
  contactBlock,
  creator,
  entrepreneur,
  hero,
  performer,
  product,
  publishedWriting,
  story,
  storyNav,
} from "../../content/narrative";
import {
  about,
  booking,
  building,
  contactIntro,
  experience,
  experienceIntro,
  footerNav,
  hiPage,
  homeRecord,
  inquiries,
  nowPage,
  projects,
  publicCv,
  publicResume,
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
  activist,
  beliefs,
  booking,
  building,
  contactBlock,
  contactIntro,
  creator,
  entrepreneur,
  experience,
  experienceIntro,
  footerNav,
  hero,
  hiPage,
  homeRecord,
  inquiries,
  nowPage,
  performer,
  product,
  projects,
  publicCv,
  publicResume,
  publishedWriting,
  serviceStories,
  story,
  storyNav,
  referralVariantContent,
  defaultAndLinkedInSecurityLines,
  socialSecurityLines,
});

test("public copy stays inside the voice rules", () => {
  const banned = [/\$/, /—/, /–/, /\bactually\b/i, /\bIsrael\b/, /\bTrump\b/, /1,778/, /25 people/, /2\.5/, /Brant Studio/i, /Independent creative practice/i];
  for (const line of publicCopy) {
    for (const pattern of banned) {
      assert.doesNotMatch(line, pattern, line);
    }
  }
});

test("public copy names the story and Bridger, and does not link a missing résumé", () => {
  const joined = publicCopy.join("\n");
  assert.equal(hero.headline, "Good ideas deserve to happen.");
  assert.match(hero.identity, /a creator, performer and entrepreneur/);
  assert.deepEqual(
    storyNav.slice(0, 5).map((item) => item.label),
    ["Senior Product Manager", "Creator", "Performer", "Entrepreneur", "Activist"]
  );
  assert.deepEqual(
    storyNav.slice(0, 5).map((item) => item.href),
    ["/product", "/creator", "/performer", "/entrepreneur", "/activist"]
  );
  assert.match(joined, /https:\/\/bridger\.social/);
  assert.match(joined, /TestFlight/);
  assert.doesNotMatch(joined, /25 people/);
  assert.match(joined, /BYU Young Ambassadors/);
  assert.match(joined, /interned in the Governor's Office and worked with the Governor's Office of Economic Development/);
  assert.match(joined, /https:\/\/calendar\.app\.google\/qj9tb56BYCdppJPk9/);
  assert.match(joined, /\/cv\.pdf/);
  assert.equal(publicResume.href, null);
  assert.doesNotMatch(joined, /resume\.pdf/);
  assert.equal(
    footerNav.some((item) => item.href === "/resume.pdf" || item.label === "See résumé"),
    false
  );
  assert.match(joined, /brantshanonjohnson@gmail.com/);
  assert.match(joined, /constituent inquiries/);
  assert.match(joined, /Crew wordmark Brant designed in 2024/);
  assert.doesNotMatch(joined, /I did not own a roadmap/);
  assert.doesNotMatch(joined, /That role ended in September 2021/);
});
