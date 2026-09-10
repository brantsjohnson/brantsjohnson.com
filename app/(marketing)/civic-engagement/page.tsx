// ============================================
// WHAT THIS FILE DOES (plain English):
// This is the Civic Engagement page. It is about how democracy and
// government systems work as an interest, not a party platform.
// Service work (the Archway and the scholarship) lives on About. This
// page is the systems-and-process framing, plus a pointer to Filibusters.
// ============================================

import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { civic } from "@/content/civic";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/sections/PageHeader";
import { CivicPillars } from "@/components/sections/CivicPillars";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { Button } from "@/components/ui/Button";
import { FadeInOnScroll } from "@/components/motion/FadeInOnScroll";

export const metadata: Metadata = {
  title: "Civic Engagement",
  description: civic.intro,
};

// THIS SECTION DOES: render the framing, the three pillars, and the Filibusters resource
export default function CivicEngagementPage() {
  return (
    <section className="pb-24 pt-14 md:pb-32 md:pt-20">
      <Container>
        <PageHeader eyebrow={civic.eyebrow} title={civic.heading} description={civic.intro} />
        <CivicPillars />

        <FadeInOnScroll className="mt-10">
          <GlassPanel padding="lg">
            <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink-soft">
              {civic.resource.title}
            </p>
            <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-ink-soft">{civic.resource.body}</p>
            <div className="mt-6">
              <Button
                href={civic.resource.href}
                variant="secondary"
                trackId="link:view_filibusters:civic"
                trailingIcon={<ArrowUpRight className="h-4 w-4" aria-hidden="true" />}
              >
                {civic.resource.linkLabel}
              </Button>
            </div>
          </GlassPanel>
        </FadeInOnScroll>
      </Container>
    </section>
  );
}
