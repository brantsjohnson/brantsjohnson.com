// ============================================
// WHAT THIS FILE DOES (plain English):
// This lists the poems. Each title opens one poem on its own page.
// ============================================

import type { Metadata } from "next";
import Link from "next/link";
import { SectionFrame } from "@/components/narrative/SectionFrame";
import { areas, creator } from "@/content/narrative";
import { poems } from "@/content/poems";
import { pageMetadata } from "@/lib/site/page-metadata";

const area = areas[1];

export const metadata: Metadata = pageMetadata({
  title: "Poetry",
  description: creator.poetry.intro,
  path: "/creator/poetry",
});

export default function PoetryIndexPage() {
  return (
    <SectionFrame id="poetry" kicker="Creator · Poetry" title={creator.poetry.title} pigment={area.pigment} plate={area.plate}>
      <p className="max-w-reading text-body text-text-secondary">{creator.poetry.intro}</p>
      <ul className="mt-8 grid gap-4">
        {poems.map((poem) => (
          <li key={poem.slug}>
            <Link
              href={`/creator/poetry/${poem.slug}`}
              data-track={`link:poem_${poem.slug}:poetry`}
              className="door-card flex min-h-[44px] items-baseline justify-between gap-4 rounded-panel border border-border-subtle bg-surface px-6 py-5 shadow-glass"
            >
              <span className="font-serif text-h2 text-ink">{poem.title}</span>
              <span className="text-caption text-text-secondary">{poem.year}</span>
            </Link>
          </li>
        ))}
      </ul>
      <p className="mt-8">
        <Link href="/creator" className="text-ink underline decoration-accent decoration-2 underline-offset-4">
          Back to Creator
        </Link>
      </p>
    </SectionFrame>
  );
}
