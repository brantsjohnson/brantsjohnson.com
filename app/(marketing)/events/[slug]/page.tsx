// ============================================
// WHAT THIS FILE DOES (plain English):
// One event, as a short story with its photos. Every event in content/events.ts gets a page here.
// ============================================

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DetailPage } from "@/components/editorial/DetailPage";
import { findDetail } from "@/content/detail";
import { eventDetails } from "@/content/events";
import { pageMetadata } from "@/lib/site/page-metadata";

type PageProps = { params: { slug: string } };

export function generateStaticParams() {
  return eventDetails.map((item) => ({ slug: item.slug }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const detail = findDetail(eventDetails, params.slug);
  if (!detail) return {};
  return pageMetadata({ title: detail.metaTitle, description: detail.description, path: detail.path });
}

export default function EventPage({ params }: PageProps) {
  const detail = findDetail(eventDetails, params.slug);
  if (!detail) notFound();
  return <DetailPage detail={detail} />;
}
