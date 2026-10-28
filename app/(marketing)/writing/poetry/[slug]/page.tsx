// ============================================
// WHAT THIS FILE DOES (plain English):
// One poem fills this page. Previous and next step through the
// list. The lines are the document text, stanza by stanza, with the
// original line breaks kept exactly.
// ============================================

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/editorial/PageHeader";
import { poems } from "@/content/poems";
import { pageMetadata } from "@/lib/site/page-metadata";

type PoemPageProps = { params: { slug: string } };

const ordered = [...poems].sort((a, b) => Number(a.year) - Number(b.year));

export function generateStaticParams() {
  return poems.map((poem) => ({ slug: poem.slug }));
}

export function generateMetadata({ params }: PoemPageProps): Metadata {
  const poem = poems.find((item) => item.slug === params.slug);
  if (!poem) return {};
  return pageMetadata({
    title: `${poem.title} | Poetry`,
    description: poem.description,
    path: `/writing/poetry/${poem.slug}`,
  });
}

export default function PoemPage({ params }: PoemPageProps) {
  const index = ordered.findIndex((item) => item.slug === params.slug);
  const poem = ordered[index];
  if (!poem) notFound();
  const next = ordered[(index + 1) % ordered.length];
  const other = next.slug === poem.slug ? undefined : next;

  return (
    <>
      <div className="shell pt-10">
        <nav aria-label="Breadcrumb" className="label flex flex-wrap items-center gap-3 text-[0.66rem] text-text-secondary">
          <Link href="/writing" className="text-ink transition-colors hover:text-accent-deep">
            Writing
          </Link>
          <span aria-hidden="true">/</span>
          <Link href="/writing/poetry" className="text-ink transition-colors hover:text-accent-deep">
            Poetry
          </Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">{poem.title}</span>
        </nav>
      </div>
      <PageHeader id={poem.slug} label="Poetry" title={poem.title} />
      <div className="shell pb-24">
        <p className="text-caption italic text-text-secondary">{poem.byline}</p>
        <div className="mt-10 max-w-reading font-serif text-[1.5rem] leading-snug text-ink">
          {poem.stanzas.map((stanza, stanzaIndex) => (
            <p key={stanzaIndex} className="mb-8">
              {stanza.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </p>
          ))}
        </div>
        <nav aria-label="Other poems" className="mt-4 flex flex-col gap-3 border-t border-border-subtle pt-6 sm:flex-row sm:justify-between">
          <Link href="/writing/poetry" className="label inline-flex min-h-[44px] items-center gap-3 text-ink hover:text-accent-deep">
            <span aria-hidden="true">←</span> All poetry
          </Link>
          {other ? (
            <Link
              href={`/writing/poetry/${other.slug}`}
              className="label inline-flex min-h-[44px] items-center gap-3 text-ink hover:text-accent-deep"
            >
              {index === ordered.length - 1 ? "First poem" : "Next poem"}: {other.title} <span aria-hidden="true">→</span>
            </Link>
          ) : null}
        </nav>
      </div>
    </>
  );
}
