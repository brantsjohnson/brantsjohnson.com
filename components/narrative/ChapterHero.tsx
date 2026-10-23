// ============================================
// WHAT THIS FILE DOES (plain English):
// This is the top of every section page: a huge gold title, the
// section number, one short intro, and a glow in that section's own
// color. The title is the page's one h1. The words rise in one after
// another when the page opens.
// ============================================

import type { ReactNode } from "react";
import { CopyText } from "@/components/narrative/CopyText";
import type { CopyPart } from "@/content/narrative";

type ChapterHeroProps = {
  id: string;
  number?: string;
  kicker: string;
  title: string;
  intro?: CopyPart[];
  tint: string;
  children?: ReactNode;
};

export function ChapterHero({ id, number, kicker, title, intro, tint, children }: ChapterHeroProps) {
  return (
    <header className="relative isolate overflow-x-clip">
      <div
        aria-hidden="true"
        className="absolute -right-40 -top-40 -z-10 h-[34rem] w-[34rem] rounded-full opacity-50 blur-3xl"
        style={{ background: `radial-gradient(closest-side, ${tint}66, transparent)` }}
      />
      {number ? (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute right-[var(--page-gutter)] top-2 -z-10 select-none font-serif text-[clamp(8rem,22vw,20rem)] leading-none text-transparent"
          style={{ WebkitTextStroke: `1px ${tint}55` }}
        >
          {number}
        </span>
      ) : null}
      <div className="shell pb-6 pt-10 md:pt-16">
        <p className="label flex items-center gap-3 text-accent">
          <span aria-hidden="true" className="inline-block h-px w-10 bg-accent" />
          {number ? `${number} · ` : ""}
          {kicker}
        </p>
        <h1 id={id} tabIndex={-1} className="gold-text mt-4 max-w-[14ch] scroll-mt-24 font-serif text-h1 outline-none">
          {title}
        </h1>
        {intro ? (
          <CopyText parts={intro} className="mt-6 max-w-[46ch] text-[1.2rem] leading-relaxed text-text-secondary" />
        ) : null}
        {children}
      </div>
    </header>
  );
}
