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
import { StoryLink } from "@/components/narrative/StoryLink";
import type { Detail } from "@/content/detail";

export function DetailPage({ detail }: { detail: Detail }) {
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
                  {crumb.label}
                </Link>
              ) : (
                <span aria-current="page">{crumb.label}</span>
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

      {detail.gallery ? <Gallery title={detail.gallery.title} intro={detail.gallery.intro} photos={detail.gallery.photos} /> : null}

      <div className="shell border-t border-border-subtle py-12">
        {detail.links?.length ? (
          <ul className="mb-8 flex flex-wrap gap-x-10 gap-y-3">
            {detail.links.map((item) => (
              <li key={item.href}>
                <StoryLink href={item.href} track={item.track}>
                  {item.text}
                </StoryLink>
              </li>
            ))}
          </ul>
        ) : null}
        <Link href={detail.back.href} className="label inline-flex min-h-[44px] items-center gap-3 text-ink transition-colors hover:text-accent-deep">
          <span aria-hidden="true">←</span> {detail.back.label}
        </Link>
      </div>
    </>
  );
}
