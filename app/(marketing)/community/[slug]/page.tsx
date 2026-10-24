// ============================================
// WHAT THIS FILE DOES (plain English):
// The archway and the scholarship each get their own page with
// photos and, for the archway, the build video.
// ============================================

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CaseStudy } from "@/components/editorial/CaseStudy";
import { communityCases, getCommunityCase } from "@/content/community";
import { pageMetadata } from "@/lib/site/page-metadata";

type CommunityPageProps = { params: { slug: string } };

export function generateStaticParams() {
  return communityCases.map((item) => ({ slug: item.slug }));
}

export function generateMetadata({ params }: CommunityPageProps): Metadata {
  const item = getCommunityCase(params.slug);
  if (!item) return {};
  return pageMetadata({ title: item.title, description: item.blurb, path: item.href });
}

export default function CommunityCasePage({ params }: CommunityPageProps) {
  const item = getCommunityCase(params.slug);
  if (!item) notFound();

  return (
    <CaseStudy
      id={item.slug}
      label={`Community · ${item.kind}`}
      title={item.title}
      lead={item.lead}
      meta={item.meta}
      stories={item.stories}
      gallery={item.gallery}
      back={{ href: "/community", label: "All community work" }}
    />
  );
}
