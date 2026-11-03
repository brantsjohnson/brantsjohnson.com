// ============================================
// WHAT THIS FILE DOES (plain English):
// The archway and the scholarship each get their own page with photos and, for the archway, the build video.
// ============================================

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DetailPage } from "@/components/editorial/DetailPage";
import { articlesAbout } from "@/content/writing/articles";
import { detailCover, findDetail } from "@/content/detail";
import { communityDetails } from "@/content/community";
import { pageMetadata } from "@/lib/site/page-metadata";

type PageProps = { params: { slug: string } };

export function generateStaticParams() {
  return communityDetails.map((item) => ({ slug: item.slug }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const detail = findDetail(communityDetails, params.slug);
  if (!detail) return {};
  return pageMetadata({
    title: detail.metaTitle,
    description: detail.description,
    path: detail.path,
    image: { photo: detailCover(detail), kicker: "Community" },
  });
}

export default function CommunityPage({ params }: PageProps) {
  const detail = findDetail(communityDetails, params.slug);
  if (!detail) notFound();
  return <DetailPage detail={detail} articles={articlesAbout(`community/${detail.slug}`)} />;
}
