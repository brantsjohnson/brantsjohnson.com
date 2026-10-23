// ============================================
// WHAT THIS FILE DOES (plain English):
// This is the top of a section page. A darker plate sits behind a
// colored card so the header has a little depth. The title is the
// page's one h1. The rest of the page stays on the paper.
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
    <div className="shell py-8 md:py-10">
      <div className="relative">
        <div
          aria-hidden="true"
          className="absolute inset-0 translate-x-2 translate-y-2 rounded-panel"
          style={{ background: plate }}
        />
        <header
          className="relative rounded-panel px-6 py-8 shadow-glass md:px-10 md:py-10"
          style={{ background: pigment }}
        >
          <p className="label text-on-hero/80">{kicker}</p>
          <h1 id={id} tabIndex={-1} className="mt-3 scroll-mt-24 font-serif text-h1 text-on-hero outline-none">
            {title}
          </h1>
        </header>
      </div>
      <div className="mt-8">{children}</div>
    </div>
  );
}
