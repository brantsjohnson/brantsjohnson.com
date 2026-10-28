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
  description: "Ask a chatbot about Brant Johnson's work, projects, and background using public notes.",
  path: "/ask",
});

export default function AskPage() {
  return (
    <>
      <PageHero
        eyebrow="Ask"
        title="Ask about me."
        deck="I've worked on a lot of different things. If you'd rather ask a question than scroll through the site, there's a chatbot trained on my public notes about them. It answers from those public notes. If the answer isn't there, it should say so."
      />
      <AskConversation />
    </>
  );
}
