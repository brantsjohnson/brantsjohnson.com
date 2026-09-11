// ============================================
// WHAT THIS FILE DOES (plain English):
// This is the shared wrapper for all public pages (home, about,
// experience, and the rest). It puts the sticky header on top, the
// page content in the middle, the footer at the bottom, and the
// BrantChat launcher floating in the corner. Admin pages and API
// routes do not use this wrapper.
// ============================================

import { ChatLauncher } from "@/components/chatbot/ChatLauncher";
import { SiteFooter } from "@/components/sections/SiteFooter";
import { SiteHeader } from "@/components/sections/SiteHeader";

// THIS SECTION DOES: place the header, page content, footer, and chat launcher around every public page
export default function MarketingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const chatConfigured = Boolean(process.env.OPENAI_API_KEY);

  return (
    <>
      <SiteHeader />
      <main>{children}</main>
      <SiteFooter />
      <ChatLauncher configured={chatConfigured} />
    </>
  );
}
