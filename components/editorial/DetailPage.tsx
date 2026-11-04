// ============================================
// WHAT THIS FILE DOES (plain English):
// The page for one work story, event or community story. A small
// breadcrumb, the big title, a short lead, an "at a glance" row, the
// story sections with their photos, an optional photo gallery, and
// links onward. Every detail page shares this layout.
// ============================================

import Link from "next/link";
import { Gallery } from "@/components/editorial/Gallery";
import { PageHeader } from "@/components/editorial/PageHeader";
import { Prose } from "@/components/editorial/Prose";
import { StoryRow } from "@/components/editorial/StoryRow";
import { OnwardLinks } from "@/components/editorial/OnwardLinks";
import { sectionName } from "@/components/editorial/section-name";
import type { Detail } from "@/content/detail";
import { articleDate, type Article } from "@/content/writing/articles";

export function DetailPage({ detail, articles = [] }: { detail: Detail; articles?: Article[] }) {
  const [first, ...rest] = detail.lead;
  const lead = typeof first === "string" ? first : undefined;

  return (
    <>
      <div className="shell pt-10">
        <nav aria-label="Breadcrumb" className="label flex flex-wrap items-center gap-x-3 gap-y-1 text-[0.66rem] text-text-secondary">
          {detail.crumbs.map((crumb, index) => (
            <span key={crumb.label} className="inline-flex items-center gap-3">
              {crumb.href ? (
                <Link href={crumb.href} className="text-ink transition-colors hover:text-accent-deep">
                  {sectionName(crumb.label)}
                </Link>
              ) : (
                <span aria-current="page">{sectionName(crumb.label)}</span>
              )}
              {index < detail.crumbs.length - 1 ? <span aria-hidden="true">/</span> : null}
            </span>
          ))}
        </nav>
      </div>

      <PageHeader id={detail.slug} label={detail.label} title={detail.title} lead={lead} />

      {rest.length > 0 || (!lead && first) ? (
        <div className="shell -mt-4 pb-10">
          <Prose body={lead ? rest : detail.lead} />
        </div>
      ) : null}

      {detail.glance?.length ? (
        <div className="shell">
          <dl className="grid gap-6 border-y border-border-subtle py-6 sm:grid-cols-2 lg:grid-cols-3">
            {detail.glance.map((item) => (
              <div key={item.label}>
                <dt className="label text-[0.66rem] text-text-secondary">{item.label}</dt>
                <dd className="m-0 mt-1 font-serif text-[1.3rem] text-ink">{item.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      ) : null}

      <div className="mt-8">
        {detail.sections.map((section, index) => (
          <StoryRow key={section.id} story={section} flip={index % 2 === 1} />
        ))}
      </div>

      {articles.length > 0 ? (
        <section aria-label="Read more" className="border-t border-border-subtle py-14">
          <div className="shell">
            <h2 className="font-serif text-h2 text-ink">Read more</h2>
            <ul className="mt-6">
              {articles.map((article) => (
                <li key={article.id} className="grid gap-1 border-t border-border-subtle py-5 first:border-t-0 sm:grid-cols-[9rem_1fr] sm:gap-6">
                  <p className="label pt-2 text-[0.68rem] text-text-secondary">{articleDate(article.date)}</p>
                  <div>
                    <a
                      href={article.url}
                      data-track={`link:article:${detail.slug}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-serif text-[1.5rem] leading-tight text-ink underline decoration-accent decoration-2 underline-offset-4 hover:text-accent-deep"
                    >
                      {article.title}
                    </a>
                    {article.summary ? <p className="mt-1 text-caption text-text-secondary">{article.summary}</p> : null}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      {detail.gallery ? <Gallery title={detail.gallery.title} intro={detail.gallery.intro} photos={detail.gallery.photos} /> : null}

      <div className="shell border-t border-border-subtle py-12">
        {detail.links?.length ? <OnwardLinks links={detail.links} className="mb-8" /> : null}
        <Link href={detail.back.href} className="label inline-flex min-h-[44px] items-center gap-3 text-ink transition-colors hover:text-accent-deep">
          <span aria-hidden="true">←</span> {detail.back.label}
        </Link>
      </div>
    </>
  );
}
