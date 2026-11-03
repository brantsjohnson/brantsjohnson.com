// ============================================
// WHAT THIS FILE DOES (plain English):
// The Writing page: two simple dated lists. Articles link out to
// Substack. Poetry links to each poem. No introduction and no cards.
// ============================================

import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/editorial/PageHeader";
import { Button } from "@/components/ui/Button";
import { sectionCovers } from "@/content/covers";
import { poems } from "@/content/poems";
import { getWritingGroups } from "@/lib/writing/feeds";
import { pageMetadata } from "@/lib/site/page-metadata";

export const metadata: Metadata = pageMetadata({
  title: "Writing",
  description: "Articles and poetry collected on Brant Johnson's website.",
  path: "/writing",
  image: { photo: sectionCovers.writing },
});

// Rebuilt about once an hour, or at once when /api/revalidate is called, so a new post shows up on its own.
export const revalidate = 3600;

const byYear = [...poems].sort((a, b) => Number(b.year) - Number(a.year));

export default async function WritingPage() {
  const groups = await getWritingGroups();
  return (
    <>
      <PageHeader id="writing" label="Writing" title="Writing">
        <nav aria-label="On this page" className="mt-10 flex flex-wrap gap-x-8">
          {groups.map((group) => (
            <a key={group.source.id} href={`#${group.source.id}`} className="label inline-flex min-h-[44px] items-center text-ink hover:text-accent-deep">
              {group.source.label}
            </a>
          ))}
          <a href="#poetry" className="label inline-flex min-h-[44px] items-center text-ink hover:text-accent-deep">
            Poetry
          </a>
        </nav>
      </PageHeader>

      {groups.map((group) => (
        <section key={group.source.id} id={group.source.id} aria-labelledby={`${group.source.id}-title`} className="scroll-mt-24 border-t border-border-subtle py-14 md:py-20">
          <div className="shell grid gap-10 lg:grid-cols-12">
            <h2 id={`${group.source.id}-title`} className="font-serif text-h2 text-ink lg:col-span-4">
              {group.source.label}
            </h2>
            <div className="lg:col-span-8">
              <ul>
                {group.items.map((item) => (
                  <li key={item.id} className="grid gap-1 border-t border-border-subtle py-6 first:border-t-0 first:pt-0 sm:grid-cols-[9rem_1fr] sm:gap-6">
                    <p className="label pt-2 text-[0.68rem] text-text-secondary">{item.dateLabel}</p>
                    <div>
                      {item.internal ? (
                        <Link
                          href={item.url}
                          data-track={`link:open_writing:${item.source}`}
                          className="font-serif text-[1.7rem] leading-tight text-ink underline decoration-transparent decoration-2 underline-offset-4 transition-colors hover:decoration-accent"
                        >
                          {item.title}
                        </Link>
                      ) : (
                        <a
                          href={item.url}
                          data-track={`link:open_writing:${item.source}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-serif text-[1.7rem] leading-tight text-ink underline decoration-transparent decoration-2 underline-offset-4 transition-colors hover:decoration-accent"
                        >
                          {item.title}
                        </a>
                      )}
                      {item.summary ? <p className="mt-2 max-w-reading text-caption text-text-secondary">{item.summary}</p> : null}
                    </div>
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <Button href={group.source.subscribeUrl} track={`button:subscribe:${group.source.id}`}>
                  Subscribe on Substack
                </Button>
              </div>
            </div>
          </div>
        </section>
      ))}

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
