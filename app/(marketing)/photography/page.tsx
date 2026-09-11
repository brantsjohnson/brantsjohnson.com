// ============================================
// WHAT THIS FILE DOES (plain English):
// This is the Photography gallery page. There are no collections
// loaded yet, so it shows an honest empty state instead of a blank
// grid. Add collections in content/photography.ts when photos are ready.
// ============================================

import type { Metadata } from "next";
import { Camera } from "lucide-react";
import Link from "next/link";
import { collections, photography } from "@/content/photography";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/sections/PageHeader";
import { EmptyState } from "@/components/ui/EmptyState";
import { FadeInOnScroll } from "@/components/motion/FadeInOnScroll";

export const metadata: Metadata = {
  title: "Photography",
  description: photography.intro,
};

// THIS SECTION DOES: show collections when they exist, otherwise the empty state
export default function PhotographyPage() {
  return (
    <section className="pb-24 pt-14 md:pb-32 md:pt-20">
      <Container>
        {/* THIS SECTION DOES: render the page heading from the content module */}
        <FadeInOnScroll>
          <PageHeader
            eyebrow={photography.eyebrow}
            title={photography.heading}
            description={photography.intro}
          />
        </FadeInOnScroll>

        {/* THIS SECTION DOES: show either loaded collections or the honest empty state */}
        <div className="mt-10">
          {collections.length === 0 ? (
            <FadeInOnScroll delay={0.06}>
              <EmptyState
                title={photography.emptyTitle}
                description={photography.emptyDescription}
                icon={<Camera className="h-5 w-5" aria-hidden="true" />}
              />
            </FadeInOnScroll>
          ) : (
            <FadeInOnScroll delay={0.06}>
              <ul className="grid gap-6 sm:grid-cols-2">
                {collections.map((collection) => (
                  <li key={collection.slug}>
                    <Link
                      href={`/photography/${collection.slug}`}
                      data-track={`card:open_collection:photography-${collection.slug}`}
                      className="focus-ring block rounded-panel border border-line bg-glass p-6"
                    >
                      <h2 className="font-heading text-h3 font-medium text-ink">{collection.title}</h2>
                      <p className="mt-2 text-sm text-ink-soft">{collection.description}</p>
                    </Link>
                  </li>
                ))}
              </ul>
            </FadeInOnScroll>
          )}
        </div>
      </Container>
    </section>
  );
}
