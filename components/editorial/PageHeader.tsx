// ============================================
// WHAT THIS FILE DOES (plain English):
// The top of every inner page, on the same warm paper as the home
// page. A short gold rule, then one large title. If the small label
// would repeat that title, it is left off. The lead sits under the
// title in the reading column, not inside a colored box.
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
    <header className="shell pb-8 pt-14 md:pb-12 md:pt-20">
      <div className="gold-rule" aria-hidden="true" />
      {showLabel ? <p className="label mt-6 text-accent-deep">{shownLabel}</p> : null}
      <h1
        id={id}
        tabIndex={-1}
        className={`scroll-mt-24 font-serif text-h1 text-ink outline-none ${showLabel ? "mt-4" : "mt-6"}`}
      >
        {shownTitle}
      </h1>
      {lead ? <p className="mt-6 max-w-reading text-body leading-relaxed text-text-secondary">{lead}</p> : null}
      {children}
    </header>
  );
}
