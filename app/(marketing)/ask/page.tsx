// ============================================
// WHAT THIS FILE DOES (plain English):
// This is the Ask page, the one place a visitor talks with the
// public notes. It is a full page, not a bubble on top of the site.
// ============================================

import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { AskConversation } from "@/components/ask/AskConversation";
import { pageMetadata } from "@/lib/site/page-metadata";

export const metadata: Metadata = pageMetadata({
  title: "Ask about me",
  description: "Short answers about Brant S. Johnson from the public notes on this site.",
  path: "/ask",
});

export default function AskPage() {
  return (
    <>
      <PageHero
        eyebrow="Ask"
        title="Ask about me."
        deck="Short answers from the public notes. If a fact is not in those notes, it will say so."
      />
      <AskConversation />
    </>
  );
}
