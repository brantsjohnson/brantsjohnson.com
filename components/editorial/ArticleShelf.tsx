// ============================================
// WHAT THIS FILE DOES (plain English):
// The Articles list. The newest piece is the large story
// across the top. The older pieces sit in one full-width
// list under it: picture, title, one sentence, and a mark
// that opens the article. See more articles reveals the
// rest. Subscribing happens on the article itself.
// ============================================

"use client";

import { useState, type ReactNode } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export type ArticleCard = {
  id: string;
  title: string;
  url: string;
  dateLabel: string;
  summary?: string;
  image?: string;
  internal?: boolean;
};

// How many older articles show before the reader asks for the rest.
const PREVIEW_COUNT = 4;

// THIS SECTION DOES: open an on-site article here, and a Substack article in a new tab
function ArticleLink({
  item,
  className,
  children,
  track,
}: {
  item: ArticleCard;
  className: string;
  children: ReactNode;
  track: string;
}) {
  if (item.internal) {
    return (
      <Link href={item.url} data-track={track} className={className}>
        {children}
      </Link>
    );
  }
  return (
    <a href={item.url} data-track={track} target="_blank" rel="noopener noreferrer" className={className}>
      {children}
    </a>
  );
}

// THIS SECTION DOES: the small mark at the end of a row that means the row opens
function OpenMark() {
  return (
    <svg
      viewBox="0 0 20 20"
      aria-hidden="true"
      className="h-5 w-5 shrink-0 text-ink transition-transform duration-300 ease-brand group-hover:translate-x-1"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M7 4l6 6-6 6" />
    </svg>
  );
}

// THIS SECTION DOES: show the newest article large, then the rest as rows
export function ArticleShelf({ items }: { items: ArticleCard[] }) {
  const [featured, ...rest] = items;
  const [showAll, setShowAll] = useState(false);
  if (!featured) return null;

  const visible = showAll ? rest : rest.slice(0, PREVIEW_COUNT);
  const more = rest.length > PREVIEW_COUNT && !showAll;

  return (
    <section id="articles" aria-label="Articles" className="scroll-mt-24 border-t border-border-subtle">
      <div className="shell py-12 md:py-16">
        <ArticleLink
          item={featured}
          track="link:featured_article:articles"
          className="group grid items-center gap-8 lg:grid-cols-2 lg:gap-12"
        >
          {featured.image ? (
            <div className="relative aspect-[16/10] overflow-hidden bg-surface-2">
              <img src={featured.image} alt="" className="h-full w-full object-cover" />
            </div>
          ) : null}
          <div>
            <p className="label text-[0.68rem] text-text-secondary">{featured.dateLabel}</p>
            <h2 className="mt-3 font-serif text-h2 leading-tight text-ink underline decoration-transparent decoration-2 underline-offset-4 transition-colors group-hover:decoration-accent">
              {featured.title}
            </h2>
            {featured.summary ? <p className="mt-4 max-w-reading text-body text-text-secondary">{featured.summary}</p> : null}
          </div>
        </ArticleLink>

        {visible.length > 0 ? (
          <ul className="mt-12 border-t border-border-subtle">
            {visible.map((item) => (
              <li key={item.id} className="border-b border-border-subtle">
                <ArticleLink
                  item={item}
                  track="link:open_article:articles"
                  className="group flex items-center gap-4 py-6 sm:gap-6"
                >
                  {item.image ? (
                    <div className="relative h-[88px] w-[132px] shrink-0 overflow-hidden bg-surface-2 sm:h-[104px] sm:w-[156px]">
                      <img src={item.image} alt="" className="h-full w-full object-cover" />
                    </div>
                  ) : null}
                  <div className="min-w-0 flex-1">
                    <p className="label text-[0.68rem] text-text-secondary">{item.dateLabel}</p>
                    <h3 className="mt-1 font-serif text-[1.45rem] leading-tight text-ink underline decoration-transparent decoration-2 underline-offset-4 transition-colors group-hover:decoration-accent sm:text-[1.7rem]">
                      {item.title}
                    </h3>
                    {item.summary ? <p className="mt-2 text-caption text-text-secondary">{item.summary}</p> : null}
                  </div>
                  <OpenMark />
                </ArticleLink>
              </li>
            ))}
          </ul>
        ) : null}

        {more ? (
          <div className="mt-8">
            <Button onClick={() => setShowAll(true)} track="button:see_more_articles:articles">
              See more articles
            </Button>
          </div>
        ) : null}
      </div>
    </section>
  );
}
