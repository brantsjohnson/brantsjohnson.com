// ============================================
// WHAT THIS FILE DOES (plain English):
// This is the Writings hub. It groups the blog and poetry in one
// place so the top nav stays to a single "Writings" tab. Poetry is a
// subsection with its own quieter empty state, not a top-level item.
// ============================================

import type { Metadata } from "next";
import { PenLine } from "lucide-react";
import { blogPosts, poems, writings } from "@/content/writings";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/sections/PageHeader";
import { WritingCard } from "@/components/sections/WritingCard";
import { EmptyState } from "@/components/ui/EmptyState";
import { FadeInOnScroll } from "@/components/motion/FadeInOnScroll";

export const metadata: Metadata = {
  title: "Writings",
  description: writings.intro,
};

// THIS SECTION DOES: show the blog list, then the poetry subsection
export default function WritingsPage() {
  return (
    <section className="pb-24 pt-14 md:pb-32 md:pt-20">
      <Container>
        <PageHeader eyebrow={writings.eyebrow} title={writings.heading} description={writings.intro} />

        <FadeInOnScroll className="mt-12">
          <h2 id="blog" className="font-heading text-h2 font-semibold tracking-tight text-ink">
            {writings.blog.heading}
          </h2>
          <div className="mt-6">
            {blogPosts.length === 0 ? (
              <EmptyState title={writings.blog.emptyTitle} description={writings.blog.emptyDescription} />
            ) : (
              <ul className="divide-y border-y border-line">
                {blogPosts.map((writing) => (
                  <li key={writing.slug}>
                    <WritingCard writing={writing} />
                  </li>
                ))}
              </ul>
            )}
          </div>
        </FadeInOnScroll>

        <FadeInOnScroll delay={0.08} className="mt-16">
          <h2 id="poetry" className="font-heading text-h2 font-semibold tracking-tight text-ink">
            {writings.poetry.heading}
          </h2>
          <p className="mt-2 max-w-xl text-[15px] leading-relaxed text-ink-soft">
            Poetry is kept apart from the blog so it can be read at a slower pace.
          </p>
          <div className="mt-6">
            {poems.length === 0 ? (
              <EmptyState
                title={writings.poetry.emptyTitle}
                description={writings.poetry.emptyDescription}
                icon={<PenLine className="h-5 w-5" aria-hidden="true" />}
              />
            ) : (
              <ul className="divide-y border-y border-line">
                {poems.map((writing) => (
                  <li key={writing.slug}>
                    <WritingCard writing={writing} />
                  </li>
                ))}
              </ul>
            )}
          </div>
        </FadeInOnScroll>
      </Container>
    </section>
  );
}
