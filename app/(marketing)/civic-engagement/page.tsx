// ============================================
// WHAT THIS FILE DOES (plain English):
// This is the Civic Engagement page. It is about how democracy and
// government systems work as an interest, not a party platform
// (docs/08 §2). The full write-up comes in a later pass, so for now
// it shows the page intro and a short, honest empty state.
// ============================================

import type { Metadata } from "next";
import { PageIntro } from "@/components/sections/PageIntro";
import { FadeInOnScroll } from "@/components/motion/FadeInOnScroll";

// THIS SECTION DOES: set this page's browser tab title
export const metadata: Metadata = { title: "Civic Engagement" };

// THIS SECTION DOES: draw the intro and a short empty state until the full write-up lands
export default function CivicEngagementPage() {
  return (
    <>
      <PageIntro
        eyebrow="Civic Engagement"
        title="How systems of government actually work"
        deck="An interest in civic participation and how democratic systems function, framed around process and systems thinking."
      />
      <FadeInOnScroll className="shell max-w-reading pb-16">
        <p className="text-body text-text-secondary">The full write-up is on the way.</p>
      </FadeInOnScroll>
    </>
  );
}
