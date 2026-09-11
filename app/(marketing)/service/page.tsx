// ============================================
// WHAT THIS FILE DOES (plain English):
// This is the Service page. It lists Brant's humanitarian and
// community work as a timeline. The words come from
// content/site-content.ts so copy lives in one place.
// ============================================

import type { Metadata } from "next";
import { PageIntro } from "@/components/sections/PageIntro";
import { Timeline } from "@/components/sections/Timeline";
import { service } from "@/content/site-content";

// THIS SECTION DOES: set this page's browser tab title
export const metadata: Metadata = { title: "Service" };

// THIS SECTION DOES: draw the intro and the service timeline
export default function ServicePage() {
  return (
    <>
      <PageIntro
        eyebrow="Service"
        title="Work I have done for others"
        deck="Humanitarian and community work, at home and abroad."
      />
      <Timeline entries={service} />
    </>
  );
}
