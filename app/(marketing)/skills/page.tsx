// ============================================
// WHAT THIS FILE DOES (plain English):
// This is the Skills page. It shows Brant's skills grouped into
// cards, then a short list of notable certifications. The words come
// from content/site-content.ts so copy lives in one place.
// ============================================

import type { Metadata } from "next";
import { PageIntro } from "@/components/sections/PageIntro";
import { SkillsGrid } from "@/components/sections/SkillsGrid";
import { FadeInOnScroll } from "@/components/motion/FadeInOnScroll";
import { GlassPanel } from "@/components/motion/GlassPanel";
import { skills, certifications } from "@/content/site-content";

// THIS SECTION DOES: set this page's browser tab title
export const metadata: Metadata = { title: "Skills" };

// THIS SECTION DOES: draw the intro, the grouped skills, and the certifications list
export default function SkillsPage() {
  return (
    <>
      <PageIntro
        eyebrow="Skills"
        title="What I work with"
        deck="Grouped so it scans quickly, from product and AI to design and leadership."
      />
      <SkillsGrid groups={skills} />

      {/* THIS SECTION DOES: show a short list of notable certifications under the skills */}
      <FadeInOnScroll className="shell pb-16">
        <GlassPanel className="p-6 md:p-8">
          <h2 className="text-h3">Certifications</h2>
          <ul className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
            {certifications.map((c) => (
              <li key={c} className="text-body text-text-secondary">
                {c}
              </li>
            ))}
          </ul>
        </GlassPanel>
      </FadeInOnScroll>
    </>
  );
}
