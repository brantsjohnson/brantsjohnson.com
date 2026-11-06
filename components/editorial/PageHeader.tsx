// ============================================
// WHAT THIS FILE DOES (plain English):
// The top of every inner page, on the same warm paper as the home
// page. The section name sits close above one large title. If they
// would repeat, only the title shows. There is no short rule above
// the title. The lead sits under it in the reading column.
// ============================================

import type { ReactNode } from "react";
import { sectionName } from "@/components/editorial/section-name";

type PageHeaderProps = {
  id: string;
  label: string;
  title: string;
  lead?: string;
  children?: ReactNode;
};

export function PageHeader({ id, label, title, lead, children }: PageHeaderProps) {
  const shownLabel = sectionName(label);
  const shownTitle = sectionName(title);
  const showLabel = shownLabel.toLowerCase() !== shownTitle.toLowerCase();

  return (
    <header className="shell pb-4 pt-8 md:pb-6 md:pt-12">
      {showLabel ? <p className="label text-accent-deep">{shownLabel}</p> : null}
      <h1
        id={id}
        tabIndex={-1}
        className={`scroll-mt-24 font-serif text-h1 text-ink outline-none ${showLabel ? "mt-5" : ""}`}
      >
        {shownTitle}
      </h1>
      {lead ? <p className="mt-6 max-w-reading text-body leading-relaxed text-text-secondary">{lead}</p> : null}
      {children}
    </header>
  );
}
