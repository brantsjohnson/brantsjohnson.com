// ============================================
// WHAT THIS FILE DOES (plain English):
// This is the Writing list page (route /blog). Essays and articles
// will show up here later. For now it shows the page intro and a
// short, honest empty state.
// ============================================

import type { Metadata } from "next";
import { PageIntro } from "@/components/sections/PageIntro";
import { FadeInOnScroll } from "@/components/motion/FadeInOnScroll";

// THIS SECTION DOES: set this page's browser tab title
export const metadata: Metadata = { title: "Writing" };

// THIS SECTION DOES: draw the intro and a short empty state until posts land
export default function BlogPage() {
  return (
    <>
      <PageIntro eyebrow="Writing" title="Essays and articles" deck="Longer form thinking, published here over time." />
      <FadeInOnScroll className="shell max-w-reading pb-16">
        <p className="text-body text-text-secondary">Nothing published yet. Check back soon.</p>
      </FadeInOnScroll>
    </>
  );
}
