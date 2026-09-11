// ============================================
// WHAT THIS FILE DOES (plain English):
// This is the Photography gallery page. Real photo collections and
// tags come later. For now it shows the page intro and a short,
// honest empty state.
// ============================================

import type { Metadata } from "next";
import { PageIntro } from "@/components/sections/PageIntro";
import { FadeInOnScroll } from "@/components/motion/FadeInOnScroll";

// THIS SECTION DOES: set this page's browser tab title
export const metadata: Metadata = { title: "Photography" };

// THIS SECTION DOES: draw the intro and a short empty state until collections land
export default function PhotographyPage() {
  return (
    <>
      <PageIntro eyebrow="Photography" title="Photos I have taken" deck="A real gallery, presented with context, coming soon." />
      <FadeInOnScroll className="shell max-w-reading pb-16">
        <p className="text-body text-text-secondary">The gallery is being put together.</p>
      </FadeInOnScroll>
    </>
  );
}
