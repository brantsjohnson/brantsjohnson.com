// ============================================
// WHAT THIS FILE DOES (plain English):
// This is the row of proof "chips" on the home page. Each chip shows
// one real number or fact about Brant's work (the first is the Crew
// Finance chip). Together they show the volume of what he has done at
// a glance, so home is not a sparse text hero.
// ============================================

import { StaggerChildren, StaggerItem } from "@/components/motion/StaggerChildren";
import { Chip } from "@/components/ui/Chip";
import { proofChips } from "@/content/site-content";

// THIS SECTION DOES: draw the proof chips in a responsive grid that reveals in sequence
export function ProofChips() {
  return (
    <section aria-label="Proof of work" className="shell pb-16">
      <StaggerChildren className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
        {proofChips.map((chip) => (
          <StaggerItem key={chip.label}>
            <Chip value={chip.value} label={chip.label} />
          </StaggerItem>
        ))}
      </StaggerChildren>
    </section>
  );
}
