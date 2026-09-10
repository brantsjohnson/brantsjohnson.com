// ============================================
// WHAT THIS FILE DOES (plain English):
// This is the Home "proof" spotlight for Crew Finance. It is a
// scannable glass panel with three real numbers from the CV: the
// funded startup, the design cost kept in house, and the hours saved
// by teaching myself illustration. It is not a project card.
// ============================================

import { crewSpotlight } from "@/content/home";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { FadeInOnScroll } from "@/components/motion/FadeInOnScroll";

// THIS SECTION DOES: render the proof panel with a short story and three stats
export function CrewSpotlight() {
  return (
    <section aria-labelledby="proof-heading" className="pb-16 md:pb-24">
      <Container>
        <FadeInOnScroll>
          <GlassPanel padding="lg" className="md:p-12">
            <div className="flex flex-wrap items-center gap-2">
              <Badge tone="accent" dot>
                {crewSpotlight.eyebrow}
              </Badge>
              <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink-soft">
                {crewSpotlight.org} · {crewSpotlight.period}
              </p>
            </div>

            <h2
              id="proof-heading"
              className="mt-4 max-w-2xl font-heading text-h2 font-semibold tracking-tight text-ink"
            >
              {crewSpotlight.title}
            </h2>
            <p className="mt-2 text-[13px] text-ink-soft">{crewSpotlight.role}</p>
            <p className="mt-4 max-w-2xl text-body text-ink-soft">{crewSpotlight.description}</p>

            <dl className="mt-8 grid gap-6 sm:grid-cols-3">
              {crewSpotlight.stats.map((stat) => (
                <div key={stat.label}>
                  <dt className="sr-only">{stat.label}</dt>
                  <dd className="font-heading text-h2 font-semibold tracking-tight text-ink">{stat.value}</dd>
                  <p className="mt-1 text-[13px] text-ink-soft">{stat.label}</p>
                </div>
              ))}
            </dl>
          </GlassPanel>
        </FadeInOnScroll>
      </Container>
    </section>
  );
}
