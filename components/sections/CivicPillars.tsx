// ============================================
// WHAT THIS FILE DOES (plain English):
// This is the Civic Engagement intro: a framing sentence plus three
// lenses (systems, process, local participation). It is about how
// public decisions get made, not a party platform.
// ============================================

import { civic } from "@/content/civic";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { StaggerChildren } from "@/components/motion/StaggerChildren";

// THIS SECTION DOES: render the three civic pillars as a row of small glass cards
export function CivicPillars() {
  return (
    <StaggerChildren className="mt-8 grid gap-5 md:grid-cols-3">
      {civic.pillars.map((pillar) => (
        <GlassPanel key={pillar.title} padding="md">
          <h2 className="text-[15px] font-medium tracking-tight text-ink">{pillar.title}</h2>
          <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">{pillar.body}</p>
        </GlassPanel>
      ))}
    </StaggerChildren>
  );
}
