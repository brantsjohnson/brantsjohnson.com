// ============================================
// WHAT THIS FILE DOES (plain English):
// This checks the words a visitor can read. The public site has to
// stay free of withheld topics, dollar figures, and a few voice slips.
// ============================================

import assert from "node:assert/strict";
import { test } from "node:test";
import { aboutDetails, aboutGallery, aboutIntro, aboutStories } from "../../content/about";
import { communityDetails, communityIntro, communityLeads, publicService, serviceGallery, studentGovernment } from "../../content/community";
import { eventDetails, eventGroups, eventsIntro } from "../../content/events";
import { contactBlock, hero, publishedWriting, storyNav } from "../../content/narrative";
import { poems } from "../../content/poems";
import { crewBrandMedia, crewBrandPage, workDetails, workGroups, workIntro } from "../../content/work";
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
  aboutDetails,
  aboutGallery,
  aboutIntro,
  aboutStories,
  communityDetails,
  communityIntro,
  communityLeads,
  publicService,
  serviceGallery,
  studentGovernment,
  eventDetails,
  eventGroups,
  eventsIntro,
  crewBrandMedia,
  crewBrandPage,
  workDetails,
  workGroups,
  workIntro,
  poems,
  about,
  booking,
  building,
  contactBlock,
  contactIntro,
  experience,
  experienceIntro,
  footerNav,
  hero,
  hiPage,
  homeRecord,
  inquiries,
  nowPage,
  projects,
  publicCv,
  publicResume,
  publishedWriting,
  serviceStories,
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

test("public copy names the headline and Bridger, and does not link a missing résumé", () => {
  const joined = publicCopy.join("\n");
  assert.equal(hero.headline, "Good ideas deserve to happen.");
  assert.match(hero.description, /get their ideas built/);
  assert.deepEqual(
    storyNav.map((item) => item.label),
    ["About", "Work", "Events", "Community", "Writing", "Contact"]
  );
  assert.deepEqual(
    storyNav.map((item) => item.href),
    ["/about", "/work", "/events", "/community", "/writing", "/contact"]
  );
  assert.match(joined, /https:\/\/bridger\.social/);
  assert.match(joined, /TestFlight/);
  assert.doesNotMatch(joined, /25 people/);
  assert.match(joined, /BYU Young Ambassadors/);
  assert.match(joined, /Utah Governor's Office and the state's economic development office/);
  assert.match(joined, /https:\/\/calendar\.app\.google\/qj9tb56BYCdppJPk9/);
  assert.match(joined, /\/cv\.pdf/);
  assert.equal(publicResume.href, null);
  assert.doesNotMatch(joined, /resume\.pdf/);
  assert.equal(
    footerNav.some((item) => item.href === "/resume.pdf" || item.label === "See résumé"),
    false
  );
  assert.match(joined, /brantshanonjohnson@gmail.com/);
  assert.match(joined, /constituents/);
  assert.match(joined, /Crew wordmark Brant designed in 2024/);
  assert.doesNotMatch(joined, /I did not own a roadmap/);
  assert.doesNotMatch(joined, /That role ended in September 2021/);
});
