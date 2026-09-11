// ============================================
// WHAT THIS FILE DOES (plain English):
// This is the shared wrapper for all public pages (home, about,
// experience, and the rest). It puts the sticky header on top, the
// page content in the middle, the footer at the bottom, and the
// BrantChat bubble floating in the corner of every page. Admin pages
// and API routes do not use this wrapper.
// ============================================

import { SiteHeader } from "@/components/sections/SiteHeader";
import { SiteFooter } from "@/components/sections/SiteFooter";
import { ChatWidget } from "@/components/chatbot/ChatWidget";

// THIS SECTION DOES: place the header, page content, footer, and chat bubble around every public page
export default function MarketingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <SiteHeader />
      <main>{children}</main>
      <SiteFooter />
      {/* The chat bubble lives here so it is available on every public page (docs/14 §13) */}
      <ChatWidget />
    </>
  );
}
