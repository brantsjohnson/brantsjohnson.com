// ============================================
// WHAT THIS FILE DOES (plain English):
// This is the top of the quieter pages (poetry and the like): a
// small label, one very large title (the page's only h1) and the
// content below it, all on the white page with generous space.
// ============================================

import type { ReactNode } from "react";
import { PageHeader } from "@/components/editorial/PageHeader";

type SectionFrameProps = {
  id: string;
  kicker: string;
  title: string;
  children: ReactNode;
};

export function SectionFrame({ id, kicker, title, children }: SectionFrameProps) {
  return (
    <>
      <PageHeader id={id} label={kicker} title={title} />
      <div className="shell pb-24">{children}</div>
    </>
  );
}
