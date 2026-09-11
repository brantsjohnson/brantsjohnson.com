// ============================================
// WHAT THIS FILE DOES (plain English):
// This handles friendly per-company chat links like /chat/google. Whatever
// word is in the address becomes the visitor's company, so the chat can
// tailor answers to that employer. It is a light touch: the company name is
// only used as context, there is no access code and no separate database.
// ============================================

import type { Metadata } from "next";
import { ChatWidget } from "@/components/chatbot/ChatWidget";

// THIS SECTION DOES: turn a url word like "schoolai" into a display name
// like "Schoolai". Simple and safe; Brant can refine names later if needed.
function prettifyCompany(slug: string): string {
  const cleaned = decodeURIComponent(slug).replace(/[-_]+/g, " ").trim();
  return cleaned.replace(/\b\w/g, (char) => char.toUpperCase());
}

// THIS SECTION DOES: give each company link its own tab title
export function generateMetadata({ params }: { params: { company: string } }): Metadata {
  const company = prettifyCompany(params.company);
  return {
    title: `Chat about Brant for ${company}`,
    description: `Ask about Brant Johnson's fit for ${company}.`,
  };
}

// THIS SECTION DOES: show the chat screen seeded with the company from the url,
// plus an optional role from the web address (for example ?role=PM)
export default function CompanyChatPage({
  params,
  searchParams,
}: {
  params: { company: string };
  searchParams: { role?: string };
}) {
  return (
    <ChatWidget
      company={prettifyCompany(params.company)}
      role={searchParams.role}
      configured={Boolean(process.env.OPENAI_API_KEY)}
    />
  );
}
