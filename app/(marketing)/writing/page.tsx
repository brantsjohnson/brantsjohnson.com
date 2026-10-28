// ============================================
// WHAT THIS FILE DOES (plain English):
// The Writing page: two simple dated lists. Articles link out to
// Substack. Poetry links to each poem. No introduction and no cards.
// ============================================

import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/editorial/PageHeader";
import { Button } from "@/components/ui/Button";
import { publishedWriting } from "@/content/narrative";
import { poems } from "@/content/poems";
import { pageMetadata } from "@/lib/site/page-metadata";
import { substackSubscribeUrl } from "@/lib/site/public-env";

export const metadata: Metadata = pageMetadata({
  title: "Writing",
  description: "Articles and poetry collected on Brant Johnson's website.",
  path: "/writing",
});

const byYear = [...poems].sort((a, b) => Number(b.year) - Number(a.year));

export default function WritingPage() {
  const subscribe = substackSubscribeUrl();
  return (
    <>
      <PageHeader id="writing" label="Writing" title="Writing">
        <nav aria-label="On this page" className="mt-10 flex gap-8">
          <a href="#articles" className="label inline-flex min-h-[44px] items-center text-ink hover:text-accent-deep">
            Articles
          </a>
          <a href="#poetry" className="label inline-flex min-h-[44px] items-center text-ink hover:text-accent-deep">
            Poetry
          </a>
        </nav>
      </PageHeader>

      <section id="articles" aria-labelledby="articles-title" className="scroll-mt-24 border-t border-border-subtle py-14 md:py-20">
        <div className="shell grid gap-10 lg:grid-cols-12">
          <h2 id="articles-title" className="font-serif text-h2 text-ink lg:col-span-4">
            Articles
          </h2>
          <div className="lg:col-span-8">
            <ul>
              {publishedWriting.map((piece) => (
                <li key={piece.href} className="grid gap-1 border-t border-border-subtle py-6 first:border-t-0 first:pt-0 sm:grid-cols-[9rem_1fr] sm:gap-6">
                  <p className="label pt-2 text-[0.68rem] text-text-secondary">{piece.date}</p>
                  <a
                    href={piece.href}
                    data-track="link:open_writing:substack"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-serif text-[1.7rem] leading-tight text-ink underline decoration-transparent decoration-2 underline-offset-4 transition-colors hover:decoration-accent"
                  >
                    {piece.title}
                  </a>
                </li>
              ))}
            </ul>
            {subscribe ? (
              <div className="mt-8">
                <Button href={subscribe} track="button:subscribe_substack:writing">
                  Subscribe on Substack
                </Button>
              </div>
            ) : null}
          </div>
        </div>
      </section>

      <section id="poetry" aria-labelledby="poetry-title" className="scroll-mt-24 border-t border-border-subtle py-14 md:py-20">
        <div className="shell grid gap-10 lg:grid-cols-12">
          <h2 id="poetry-title" className="font-serif text-h2 text-ink lg:col-span-4">
            Poetry
          </h2>
          <ul className="lg:col-span-8">
            {byYear.map((poem) => (
              <li key={poem.slug} className="grid gap-1 border-t border-border-subtle py-6 first:border-t-0 first:pt-0 sm:grid-cols-[9rem_1fr] sm:gap-6">
                <p className="label pt-2 text-[0.68rem] text-text-secondary">{poem.year}</p>
                <div>
                  <Link
                    href={`/writing/poetry/${poem.slug}`}
                    data-track={`link:poem_${poem.slug}:writing`}
                    className="font-serif text-[1.7rem] leading-tight text-ink underline decoration-transparent decoration-2 underline-offset-4 transition-colors hover:decoration-accent"
                  >
                    {poem.title}
                  </Link>
                  {poem.credit ? <p className="mt-1 text-caption italic text-text-secondary">{poem.credit}</p> : null}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
