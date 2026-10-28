// ============================================
// WHAT THIS FILE DOES (plain English):
// One piece of work (Intro, Bridger, Crew, BackLocal, the chatbot) as a short story. The Crew brand has its own page.
// ============================================

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DetailPage } from "@/components/editorial/DetailPage";
import { findDetail } from "@/content/detail";
import { workDetails } from "@/content/work";
import { pageMetadata } from "@/lib/site/page-metadata";

type PageProps = { params: { slug: string } };

export function generateStaticParams() {
  return workDetails.map((item) => ({ slug: item.slug }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const detail = findDetail(workDetails, params.slug);
  if (!detail) return {};
  return pageMetadata({ title: detail.metaTitle, description: detail.description, path: detail.path });
}

export default function WorkPage({ params }: PageProps) {
  const detail = findDetail(workDetails, params.slug);
  if (!detail) notFound();
  return <DetailPage detail={detail} />;
}
