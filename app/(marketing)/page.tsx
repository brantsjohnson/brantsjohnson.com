// ============================================
// WHAT THIS FILE DOES (plain English):
// This is the home page. Every visitor sees one headline.
// The card follows the studio mockup: a quiet mark, the practice
// line, the headline, and three ways in. Intro and Bridger sit
// together under that, as the selected projects.
// ============================================

import type { Metadata } from "next";
import Link from "next/link";
import { ProductPair } from "@/components/sections/ProductPair";
import { TextLink } from "@/components/ui/TextLink";
import { booking, hero, homeRecord, inquiries } from "@/content/site-content";
import { pageMetadata } from "@/lib/site/page-metadata";

export const metadata: Metadata = {
  ...pageMetadata({
    title: "Brant S. Johnson. Good ideas deserve to happen.",
    description: hero.studio,
    path: "/",
  }),
  title: { absolute: "Brant S. Johnson. Good ideas deserve to happen." },
};

export default function HomePage() {
  return (
    <>
      <section className="shell pb-4 pt-10 md:pb-6 md:pt-16">
        <div className="rounded-panel border border-border-subtle bg-surface px-5 py-8 sm:px-10 sm:py-12 md:px-14 md:py-14">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3 sm:gap-4">
              <span
                aria-hidden="true"
                className="grid h-11 w-11 shrink-0 place-items-center rounded-[10px] border border-border-subtle font-serif text-[1.65rem] leading-none text-ink"
              >
                *
              </span>
              <p className="label tracking-[0.12em] text-ink">
                Brant
                <br />
                Studio
              </p>
            </div>
            <p className="label tracking-[0.12em] text-right text-text-secondary">
              <span className="block whitespace-nowrap">Independent</span>
              <span className="block whitespace-nowrap">creative</span>
              <span className="block whitespace-nowrap">practice</span>
            </p>
          </div>

          <div className="mt-7 border-t border-border-subtle sm:mt-8" />

          <h1 className="mt-8 font-serif text-display text-ink sm:mt-10 sm:max-w-[9.4em]">{hero.headline}</h1>
          <p className="mt-6 max-w-[38rem] text-body text-text-secondary">{hero.subline}</p>
          <p className="mt-3 max-w-[38rem] text-body text-ink">{hero.studio}</p>

          <div className="mt-8 flex items-start justify-between gap-3 border-t border-border-subtle pt-4 md:mt-12 md:items-center">
            <p className="flex min-w-0 flex-1 flex-col text-body md:flex-row md:flex-wrap md:items-center md:gap-x-3">
              <Link href="/work#projects" className="inline-flex min-h-[44px] items-center" data-track="link:projects:home">
                Selected projects
              </Link>
              <span aria-hidden="true" className="hidden text-text-secondary md:inline">
                ·
              </span>
              <Link
                href="/about#collaborations"
                className="inline-flex min-h-[44px] items-center"
                data-track="link:collaborations:home"
              >
                Collaborations
              </Link>
              <span aria-hidden="true" className="hidden text-text-secondary md:inline">
                ·
              </span>
              <a
                href={inquiries.href}
                className="inline-flex min-h-[44px] items-center"
                data-track="link:inquiries:home"
              >
                {inquiries.label}
              </a>
            </p>
            <Link
              href="/work#projects"
              aria-label="Selected projects"
              className="mt-1 hidden h-11 w-11 shrink-0 items-center justify-center text-body text-ink md:mt-0 md:inline-flex"
              data-track="link:projects_arrow:home"
            >
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
        <p className="mt-5 text-caption text-text-secondary">{hero.name}</p>
      </section>

      <section id="projects" className="shell scroll-mt-24 py-16 md:py-24">
        <h2 className="font-serif text-h2 text-ink">Selected projects.</h2>
        <div className="mt-8 md:mt-10">
          <ProductPair page="home" />
        </div>
      </section>

      <section className="shell border-t border-border-subtle py-16 md:py-24" aria-label="Selected record">
        <h2 className="font-serif text-h2 text-ink">The short version.</h2>
        <ol className="mt-8">
          {homeRecord.map((item, index) => (
            <li
              key={item.kicker}
              className="grid gap-3 border-t border-border-subtle py-8 md:grid-cols-[4.5rem_14rem_1fr] md:items-baseline md:gap-8"
            >
              <p className="font-serif text-h2 text-ink">0{index + 1}</p>
              <p className="label text-text-secondary">{item.kicker}</p>
              <p className="max-w-reading text-body text-ink">{item.line}</p>
            </li>
          ))}
        </ol>
        <div className="border-t border-border-subtle pt-8">
          <TextLink href="/work" track="link:work:home">
            Read the full record
          </TextLink>
        </div>
      </section>

      <section className="shell border-t border-border-subtle py-16 md:py-24">
        <h2 className="font-serif text-h2 text-ink">Inquiries.</h2>
        <p className="mt-4 max-w-reading text-body text-text-secondary">
          For a project, a partnership, or an event, write me. I read them.
        </p>
        <div className="mt-6 flex flex-col gap-1 sm:flex-row sm:gap-8">
          <TextLink href={inquiries.href} track="link:inquiries_email:home">
            {inquiries.email}
          </TextLink>
          <TextLink href="/contact" track="link:contact:home">
            Go to contact
          </TextLink>
          <TextLink href={booking.href} track="link:book_time:home">
            {booking.label}
          </TextLink>
        </div>
      </section>
    </>
  );
}
