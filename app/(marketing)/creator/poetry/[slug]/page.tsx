// ============================================
// WHAT THIS FILE DOES (plain English):
// One poem fills this page. Previous and next step through the
// list. The lines are the document text, stanza by stanza.
// ============================================

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SectionFrame } from "@/components/narrative/SectionFrame";
import { areas } from "@/content/narrative";
import { poems } from "@/content/poems";
import { pageMetadata } from "@/lib/site/page-metadata";

const area = areas[1];

type PoemPageProps = { params: { slug: string } };

export function generateStaticParams() {
  return poems.map((poem) => ({ slug: poem.slug }));
}

export function generateMetadata({ params }: PoemPageProps): Metadata {
  const poem = poems.find((item) => item.slug === params.slug);
  if (!poem) return {};
  return pageMetadata({
    title: poem.title,
    description: `${poem.title}, ${poem.year}.`,
    path: `/creator/poetry/${poem.slug}`,
  });
}

export default function PoemPage({ params }: PoemPageProps) {
  const index = poems.findIndex((item) => item.slug === params.slug);
  const poem = poems[index];
  if (!poem) notFound();
  const previous = poems[index - 1];
  const next = poems[index + 1];

  return (
    <SectionFrame id={poem.slug} kicker={`Poetry · ${poem.year}`} title={poem.title} pigment={area.pigment} plate={area.plate}>
      {poem.credit ? <p className="text-caption text-text-secondary">{poem.credit}</p> : null}
      <div className="mt-8 max-w-reading font-serif text-h3 text-ink">
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
        {previous ? (
          <Link
            href={`/creator/poetry/${previous.slug}`}
            className="inline-flex min-h-[44px] items-center text-ink underline decoration-accent decoration-2 underline-offset-4"
          >
            Previous poem: {previous.title}
          </Link>
        ) : (
          <span className="inline-flex min-h-[44px] items-center text-caption text-text-secondary">First poem</span>
        )}
        {next ? (
          <Link
            href={`/creator/poetry/${next.slug}`}
            className="inline-flex min-h-[44px] items-center text-ink underline decoration-accent decoration-2 underline-offset-4"
          >
            Next poem: {next.title}
          </Link>
        ) : (
          <span className="inline-flex min-h-[44px] items-center text-caption text-text-secondary">Last poem</span>
        )}
      </nav>
    </SectionFrame>
  );
}
