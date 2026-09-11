// ============================================
// WHAT THIS FILE DOES (plain English):
// This is the About page. It is the longer, first person version of
// the home page: who Brant is, what he likes about product work, and
// where he studied. The words come from content/site-content.ts so
// copy lives in one place.
// ============================================

import type { Metadata } from "next";
import { PageIntro } from "@/components/sections/PageIntro";
import { FadeInOnScroll } from "@/components/motion/FadeInOnScroll";
import { about } from "@/content/site-content";

// THIS SECTION DOES: set this page's browser tab title
export const metadata: Metadata = { title: "About" };

// THIS SECTION DOES: draw the intro and the about paragraphs in a narrow reading column
export default function AboutPage() {
  return (
    <>
      <PageIntro eyebrow="About" title={about.headline} />
      <FadeInOnScroll className="shell max-w-reading pb-16">
        <div className="flex flex-col gap-6">
          {about.paragraphs.map((paragraph, i) => (
            <p key={i} className="text-body text-text-secondary">
              {paragraph}
            </p>
          ))}
        </div>
      </FadeInOnScroll>
    </>
  );
}
