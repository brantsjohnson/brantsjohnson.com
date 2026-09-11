// ============================================
// WHAT THIS FILE DOES (plain English):
// This is the Experience page. It lists Brant's paid product and
// sales roles as a timeline, newest first. The words and dates come
// from content/site-content.ts so copy lives in one place.
// ============================================

import type { Metadata } from "next";
import { PageIntro } from "@/components/sections/PageIntro";
import { Timeline } from "@/components/sections/Timeline";
import { experience } from "@/content/site-content";

// THIS SECTION DOES: set this page's browser tab title
export const metadata: Metadata = { title: "Experience" };

// THIS SECTION DOES: draw the intro and the experience timeline
export default function ExperiencePage() {
  return (
    <>
      <PageIntro
        eyebrow="Experience"
        title="Where I have built and sold"
        deck="Product and sales roles, newest first. I have owned the whole loop, from strategy and onboarding to selling on the front lines."
      />
      <Timeline entries={experience} />
    </>
  );
}
