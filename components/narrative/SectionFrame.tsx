// ============================================
// WHAT THIS FILE DOES (plain English):
// This is the top of the quieter pages (poetry and the like): the
// same colored title card as the other pages, then the content below
// it on the paper.
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
