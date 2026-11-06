// ============================================
// WHAT THIS FILE DOES (plain English):
// The Articles page. The newest piece is the large story
// at the top. Older pieces are a full-width list under it.
// Podcasts and poetry stay further down, each under its own
// heading. Subscribe lives on the article the reader opens.
// ============================================

import type { Metadata } from "next";
import Link from "next/link";
import { ArticleShelf } from "@/components/editorial/ArticleShelf";
import { PageHeader } from "@/components/editorial/PageHeader";
import { sectionCovers } from "@/content/covers";
import { poems } from "@/content/poems";
import { podcasts } from "@/content/podcasts";
import { articleDate } from "@/content/writing/articles";
import { getWritingGroups } from "@/lib/writing/feeds";
import { pageMetadata } from "@/lib/site/page-metadata";

export const metadata: Metadata = pageMetadata({
  title: "Articles",
  description: "Articles, a podcast conversation, and poetry collected on Brant Johnson's website.",
  path: "/articles",
  image: { photo: sectionCovers.writing },
});

// Rebuilt about once an hour, or at once when /api/revalidate is called, so a new post shows up on its own.
export const revalidate = 3600;

const byYear = [...poems].sort((a, b) => Number(b.year) - Number(a.year));

export default async function ArticlesPage() {
  const groups = await getWritingGroups();
  const articles = groups.find((group) => group.source.id === "articles");

  return (
    <>
      <PageHeader id="articles-page" label="Articles" title="Articles">
        <nav aria-label="On this page" className="mt-10 flex flex-wrap gap-x-8">
          <a href="#articles" className="label inline-flex min-h-[44px] items-center text-ink hover:text-accent-deep">
            Articles
          </a>
          <a href="#podcasts" className="label inline-flex min-h-[44px] items-center text-ink hover:text-accent-deep">
            Podcasts
          </a>
          <a href="#poetry" className="label inline-flex min-h-[44px] items-center text-ink hover:text-accent-deep">
            Poetry
          </a>
        </nav>
      </PageHeader>

      <ArticleShelf
        items={(articles?.items ?? []).map((item) => ({
          id: item.id,
          title: item.title,
          url: item.url,
          dateLabel: item.dateLabel,
          summary: item.summary,
          image: item.image,
          internal: item.internal,
        }))}
      />

      <section id="podcasts" aria-labelledby="podcasts-title" className="scroll-mt-24 border-t border-border-subtle py-14 md:py-20">
        <div className="shell">
          <h2 id="podcasts-title" className="font-serif text-h2 text-ink">
            Podcasts
          </h2>
          <ul className="mt-8">
            {podcasts.map((episode) => (
              <li key={episode.id} className="border-t border-border-subtle py-6 first:border-t-0 first:pt-0">
                <a
                  href={episode.url}
                  data-track={`link:${episode.id.replace(/-/g, "_")}:articles`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-serif text-[1.7rem] leading-tight text-ink underline decoration-transparent decoration-2 underline-offset-4 transition-colors hover:decoration-accent"
                >
                  {episode.title}
                </a>
                <p className="mt-1 text-caption text-text-secondary">{episode.show}</p>
                <p className="label mt-2 text-[0.68rem] text-text-secondary">{articleDate(episode.date)}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="poetry" aria-labelledby="poetry-title" className="scroll-mt-24 border-t border-border-subtle py-14 md:py-20">
        <div className="shell">
          <h2 id="poetry-title" className="font-serif text-h2 text-ink">
            Poetry
          </h2>
          <ul className="mt-8">
            {byYear.map((poem) => (
              <li key={poem.slug} className="border-t border-border-subtle py-6 first:border-t-0 first:pt-0">
                <Link
                  href={`/writing/poetry/${poem.slug}`}
                  data-track={`link:poem_${poem.slug}:articles`}
                  className="font-serif text-[1.7rem] leading-tight text-ink underline decoration-transparent decoration-2 underline-offset-4 transition-colors hover:decoration-accent"
                >
                  {poem.title}
                </Link>
                {poem.credit ? <p className="mt-1 text-caption italic text-text-secondary">{poem.credit}</p> : null}
                <p className="label mt-2 text-[0.68rem] text-text-secondary">{poem.year}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
