// ============================================
// WHAT THIS FILE DOES (plain English):
// The top of every inner page: a small label, one very large title
// (the page's only h1), and a short lead line, with plenty of white
// space around them. A short gold rule opens the page.
// ============================================

import type { ReactNode } from "react";

type PageHeaderProps = {
  id: string;
  label: string;
  title: string;
  lead?: string;
  children?: ReactNode;
};

export function PageHeader({ id, label, title, lead, children }: PageHeaderProps) {
  return (
    <header className="shell pb-10 pt-16 md:pb-16 md:pt-24">
      <div className="gold-rule" aria-hidden="true" />
      <p className="label mt-6 text-accent-deep">{label}</p>
      <h1 id={id} tabIndex={-1} className="mt-4 scroll-mt-24 font-serif text-h1 text-ink outline-none">
        {title}
      </h1>
      {lead ? <p className="mt-8 max-w-[40ch] font-serif text-[clamp(1.5rem,2.6vw,2.2rem)] leading-[1.2] text-ink">{lead}</p> : null}
      {children}
    </header>
  );
}
