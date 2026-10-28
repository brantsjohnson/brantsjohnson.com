// ============================================
// WHAT THIS FILE DOES (plain English):
// The poetry list on its own page. Each title opens one poem. The
// poem not written by Brant names its author.
// ============================================

import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/editorial/PageHeader";
import { poems } from "@/content/poems";
import { pageMetadata } from "@/lib/site/page-metadata";

export const metadata: Metadata = pageMetadata({
  title: "Poetry",
  description: "Poetry collected on Brant Johnson's website.",
  path: "/writing/poetry",
});

const byYear = [...poems].sort((a, b) => Number(b.year) - Number(a.year));

export default function PoetryIndexPage() {
  return (
    <>
      <div className="shell pt-10">
        <nav aria-label="Breadcrumb" className="label flex items-center gap-3 text-[0.66rem] text-text-secondary">
          <Link href="/writing" className="text-ink transition-colors hover:text-accent-deep">
            Writing
          </Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">Poetry</span>
        </nav>
      </div>
      <PageHeader id="poetry" label="Writing" title="Poetry" />
      <div className="shell pb-24">
        <ul className="border-t border-border-subtle">
          {byYear.map((poem) => (
            <li key={poem.slug} className="border-b border-border-subtle">
              <Link
                href={`/writing/poetry/${poem.slug}`}
                data-track={`link:poem_${poem.slug}:poetry`}
                className="group flex min-h-[44px] items-baseline justify-between gap-4 py-6"
              >
                <span>
                  <span className="block font-serif text-h2 text-ink transition-transform duration-500 ease-brand group-hover:translate-x-2">
                    {poem.title}
                  </span>
                  {poem.credit ? <span className="mt-1 block text-caption italic text-text-secondary">{poem.credit}</span> : null}
                </span>
                <span className="label text-text-secondary">{poem.year}</span>
              </Link>
            </li>
          ))}
        </ul>
        <p className="mt-10">
          <Link href="/writing" className="label inline-flex min-h-[44px] items-center gap-3 text-ink hover:text-accent-deep">
            <span aria-hidden="true">←</span> Back to Writing
          </Link>
        </p>
      </div>
    </>
  );
}
