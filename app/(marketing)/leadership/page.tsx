// ============================================
// WHAT THIS FILE DOES (plain English):
// This is the Leadership page. It lists the teams, volunteers, and
// programs Brant has directed, as a timeline. The words come from
// content/site-content.ts so copy lives in one place.
// ============================================

import type { Metadata } from "next";
import { PageIntro } from "@/components/sections/PageIntro";
import { Timeline } from "@/components/sections/Timeline";
import { leadership } from "@/content/site-content";

// THIS SECTION DOES: set this page's browser tab title
export const metadata: Metadata = { title: "Leadership" };

// THIS SECTION DOES: draw the intro and the leadership timeline
export default function LeadershipPage() {
  return (
    <>
      <PageIntro
        eyebrow="Leadership"
        title="Teams and programs I have led"
        deck="Roles where I directed people, ran campaigns, and set the pace."
      />
      <Timeline entries={leadership} />
    </>
  );
}
