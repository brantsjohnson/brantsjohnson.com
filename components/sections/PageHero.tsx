// ============================================
// WHAT THIS FILE DOES (plain English):
// This is the black band at the top of every public page. It holds
// a gold serif title, one line of explanation, and optional actions.
// Home uses the tall version. Inner pages use the shorter one.
// The bridge mark appears only where a page asks for it.
// ============================================

import type { ReactNode } from "react";
import { FadeInOnScroll } from "@/components/motion/FadeInOnScroll";
import { BridgeMark } from "@/components/sections/BridgeMark";

type PageHeroProps = {
  eyebrow: string;
  title: string;
  deck?: string;
  actions?: ReactNode;
  tall?: boolean;
  mark?: boolean;
};

export function PageHero({ eyebrow, title, deck, actions, tall = false, mark = false }: PageHeroProps) {
  return (
    <section className={tall ? "bg-ink text-on-hero" : "bg-ink text-on-hero"}>
      <FadeInOnScroll
        className={`shell relative flex flex-col justify-end ${tall ? "min-h-[78vh] pb-16 pt-28" : "min-h-[46vh] pb-12 pt-24"}`}
      >
        {mark && (
          <BridgeMark className="mb-8 h-16 w-40 text-accent md:absolute md:right-8 md:top-28 md:mb-0 md:h-20 md:w-48" />
        )}
        <p className="text-caption uppercase tracking-[0.22em] text-accent">{eyebrow}</p>
        <h1 className="mt-4 max-w-[16ch] font-serif text-display font-medium tracking-tight text-accent">
          {title}
        </h1>
        <div className="mt-6 h-px w-24 bg-accent" />
        {deck && <p className="mt-6 max-w-reading text-body text-on-hero">{deck}</p>}
        {actions && <div className="mt-8 flex flex-wrap gap-3">{actions}</div>}
      </FadeInOnScroll>
    </section>
  );
}
