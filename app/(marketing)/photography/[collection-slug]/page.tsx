// ============================================
// WHAT THIS FILE DOES (plain English):
// This is one photo collection page. The name in the URL
// (collection-slug) will later match a grouped set of photos. Unknown
// names show not found.
// ============================================

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { collections } from "@/content/photography";
import { Container } from "@/components/ui/Container";
import { EmptyState } from "@/components/ui/EmptyState";

type PhotographyCollectionPageProps = {
  params: { "collection-slug": string };
};

function getCollection(slug: string) {
  return collections.find((collection) => collection.slug === slug);
}

export function generateStaticParams() {
  return collections.map((collection) => ({ "collection-slug": collection.slug }));
}

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
        <h1 className="font-heading text-h1 font-semibold tracking-tight text-ink">{collection.title}</h1>
        <p className="mt-3 max-w-xl text-[15px] text-ink-soft">{collection.description}</p>
        <div className="mt-10">
          <EmptyState title="No photos yet" description="Photos for this collection have not been added." />
        </div>
      </Container>
    </section>
  );
}
