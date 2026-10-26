// ============================================
// WHAT THIS FILE DOES (plain English):
// The pre-college years and the Handmade page, deeper stories that sit under About.
// ============================================

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DetailPage } from "@/components/editorial/DetailPage";
import { findDetail } from "@/content/detail";
import { aboutDetails } from "@/content/about";
import { pageMetadata } from "@/lib/site/page-metadata";

type PageProps = { params: { slug: string } };

export function generateStaticParams() {
  return aboutDetails.map((item) => ({ slug: item.slug }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const detail = findDetail(aboutDetails, params.slug);
  if (!detail) return {};
  return pageMetadata({ title: detail.metaTitle, description: detail.description, path: detail.path });
}

export default function AboutPage({ params }: PageProps) {
  const detail = findDetail(aboutDetails, params.slug);
  if (!detail) notFound();
  return <DetailPage detail={detail} />;
}
