// ============================================
// WHAT THIS FILE DOES (plain English):
// This lists the poems. Each title opens one poem on its own page.
// ============================================

import type { Metadata } from "next";
import Link from "next/link";
import { SectionFrame } from "@/components/narrative/SectionFrame";
import { poetry } from "@/content/narrative";
import { poems } from "@/content/poems";
import { pageMetadata } from "@/lib/site/page-metadata";

export const metadata: Metadata = pageMetadata({
  title: "Poetry",
  description: poetry.intro,
  path: "/projects/poetry",
});

export default function PoetryIndexPage() {
  return (
    <SectionFrame id="poetry" kicker="Projects · Poetry" title={poetry.title}>
      <p className="max-w-reading text-body text-text-secondary">{poetry.intro}</p>
      <ul className="mt-10 border-t border-border-subtle">
        {poems.map((poem) => (
          <li key={poem.slug}>
            <Link
              href={`/projects/poetry/${poem.slug}`}
              data-track={`link:poem_${poem.slug}:poetry`}
              className="group flex min-h-[44px] items-baseline justify-between gap-4 border-b border-border-subtle py-6 transition-colors hover:border-accent"
            >
              <span className="font-serif text-h2 text-ink">{poem.title}</span>
              <span className="text-caption text-text-secondary">{poem.year}</span>
            </Link>
          </li>
        ))}
      </ul>
      <p className="mt-8">
        <Link href="/projects" className="text-ink underline decoration-accent decoration-2 underline-offset-4">
          Back to Projects
        </Link>
      </p>
    </SectionFrame>
  );
}
