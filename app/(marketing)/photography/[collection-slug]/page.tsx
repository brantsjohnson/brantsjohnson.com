// ============================================
// WHAT THIS FILE DOES (plain English):
// This is one photo collection page. The name in the URL
// (collection-slug) will later match a grouped set of photos. Unknown
// names show not found.
// ============================================

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { collections, photography } from "@/content/photography";
import { Container } from "@/components/ui/Container";
import { EmptyState } from "@/components/ui/EmptyState";
import { PageHeader } from "@/components/sections/PageHeader";
import { FadeInOnScroll } from "@/components/motion/FadeInOnScroll";

type PhotographyCollectionPageProps = {
  params: { "collection-slug": string };
};

// THIS SECTION DOES: find one collection by its URL slug
function getCollection(slug: string) {
  return collections.find((collection) => collection.slug === slug);
}

// THIS SECTION DOES: tell Next which collection URLs to pre-render
export function generateStaticParams() {
  return collections.map((collection) => ({ "collection-slug": collection.slug }));
}

// THIS SECTION DOES: set the browser tab title for one collection page
export function generateMetadata({ params }: PhotographyCollectionPageProps): Metadata {
  const collection = getCollection(params["collection-slug"]);
  if (!collection) return { title: "Photo collection" };
  return { title: collection.title, description: collection.description };
}

// THIS SECTION DOES: render one collection when it exists, otherwise not found
export default function PhotographyCollectionPage({ params }: PhotographyCollectionPageProps) {
  const collection = getCollection(params["collection-slug"]);
  if (!collection) notFound();

  return (
    <section className="pb-24 pt-14 md:pb-32 md:pt-20">
      <Container>
        <FadeInOnScroll>
          <PageHeader
            eyebrow={photography.eyebrow}
            title={collection.title}
            description={collection.description}
          />
        </FadeInOnScroll>
        <FadeInOnScroll delay={0.06} className="mt-10">
          <EmptyState
            title={photography.collectionEmptyTitle}
            description={photography.collectionEmptyDescription}
          />
        </FadeInOnScroll>
      </Container>
    </section>
  );
}
