// ============================================
// WHAT THIS FILE DOES (plain English):
// This is the Civic Engagement page. It is a stub: a systems-and-process
// framing sentence, an honest empty state, and a pointer to Filibusters.
// It is about how democracy and government systems work as an interest,
// not a party platform. Service work lives on About.
// ============================================

import type { Metadata } from "next";
import { ArrowUpRight, Landmark } from "lucide-react";
import { civic } from "@/content/civic";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/sections/PageHeader";
import { EmptyState } from "@/components/ui/EmptyState";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { Button } from "@/components/ui/Button";
import { FadeInOnScroll } from "@/components/motion/FadeInOnScroll";

export const metadata: Metadata = {
  title: "Civic Engagement",
  description: civic.intro,
};

// THIS SECTION DOES: render the framing, the empty state, and the Filibusters pointer
export default function CivicEngagementPage() {
  return (
    <section className="pb-24 pt-14 md:pb-32 md:pt-20">
      <Container>
        {/* THIS SECTION DOES: show the systems-and-process framing at the top */}
        <FadeInOnScroll>
          <PageHeader eyebrow={civic.eyebrow} title={civic.heading} description={civic.intro} />
        </FadeInOnScroll>

        {/* THIS SECTION DOES: keep the page honest while long-form civic writing is still in progress */}
        <FadeInOnScroll delay={0.06} className="mt-10">
          <EmptyState
            title={civic.emptyTitle}
            description={civic.emptyDescription}
            icon={<Landmark className="h-5 w-5" aria-hidden="true" />}
          />
        </FadeInOnScroll>

        {/* THIS SECTION DOES: point people to Filibusters as related work, not as a replacement for this page */}
        <FadeInOnScroll delay={0.1} className="mt-10">
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
