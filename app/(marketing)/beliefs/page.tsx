// ============================================
// WHAT THIS FILE DOES (plain English):
// The short list of beliefs, as cards instead of one long column.
// ============================================

import type { Metadata } from "next";
import { SectionFrame } from "@/components/narrative/SectionFrame";
import { beliefs } from "@/content/narrative";
import { pageMetadata } from "@/lib/site/page-metadata";

export const metadata: Metadata = pageMetadata({
  title: "Beliefs",
  description: beliefs.items[0],
  path: "/beliefs",
});

export default function BeliefsPage() {
  return (
    <SectionFrame id="beliefs" kicker="Beliefs" title={beliefs.title} pigment="#582046" plate="#3c1630">
      <ul className="grid gap-4 md:grid-cols-2">
        {beliefs.items.map((item) => (
          <li key={item} className="rounded-panel border border-border-subtle bg-surface p-5 text-body text-ink shadow-glass">
            {item}
          </li>
        ))}
      </ul>
    </SectionFrame>
  );
}
