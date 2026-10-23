// ============================================
// WHAT THIS FILE DOES (plain English):
// This is the top of the quieter pages (Beliefs, Poetry, Blog and
// the like). A deep color card with a soft glow holds the gold
// title. The title is the page's one h1. The rest of the page sits
// on the dark stage below it.
// ============================================

import type { ReactNode } from "react";

type SectionFrameProps = {
  id: string;
  kicker: string;
  title: string;
  pigment: string;
  plate: string;
  children: ReactNode;
};

export function SectionFrame({ id, kicker, title, pigment, plate, children }: SectionFrameProps) {
  return (
    <div className="shell py-8 md:py-12">
      <header
        className="relative isolate overflow-hidden rounded-panel border border-border-subtle px-6 py-10 shadow-glass md:px-12 md:py-14"
        style={{ background: `linear-gradient(135deg, ${pigment} 0%, ${plate} 70%, var(--color-bg-deep) 100%)` }}
      >
        <div
          aria-hidden="true"
          className="absolute -right-24 -top-24 -z-10 h-80 w-80 rounded-full opacity-40 blur-3xl"
          style={{ background: "radial-gradient(closest-side, rgba(233,191,133,0.7), transparent)" }}
        />
        <p className="label flex items-center gap-3 text-accent">
          <span aria-hidden="true" className="inline-block h-px w-10 bg-accent" />
          {kicker}
        </p>
        <h1 id={id} tabIndex={-1} className="gold-text mt-4 scroll-mt-24 font-serif text-h1 outline-none">
          {title}
        </h1>
      </header>
      <div className="mt-10">{children}</div>
    </div>
  );
}
