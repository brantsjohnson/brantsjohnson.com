// ============================================
// WHAT THIS FILE DOES (plain English):
// This is a labeled block that wraps a heading, a short intro, and
// whatever content you pass in (a timeline, a list of service items).
// About uses it so Experience, Leadership, Service, and Now all share
// the same spacing and title style.
// ============================================

import type { ReactNode } from "react";
import { Container } from "@/components/ui/Container";
import { FadeInOnScroll } from "@/components/motion/FadeInOnScroll";

type SectionBlockProps = {
  id: string;
  heading: string;
  intro?: string;
  children: ReactNode;
};

// THIS SECTION DOES: wrap a page section in the shared container and heading
export function SectionBlock({ id, heading, intro, children }: SectionBlockProps) {
  return (
    <section id={id} aria-labelledby={`${id}-heading`} className="pb-20 md:pb-28">
      <Container>
        <FadeInOnScroll>
          <h2 id={`${id}-heading`} className="font-heading text-h2 font-semibold tracking-tight text-ink">
            {heading}
          </h2>
          {intro && <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-ink-soft">{intro}</p>}
        </FadeInOnScroll>
        <div className="mt-8">{children}</div>
      </Container>
    </section>
  );
}
