// ============================================
// WHAT THIS FILE DOES (plain English):
// This is a shared wrapper for all public pages (home, about, projects,
// and the rest). It holds the main content area and mounts the floating
// chat button (ChatLauncher) so visitors can ask about Brant from any page.
// Admin pages and API routes do not use this wrapper.
// ============================================

import { ChatLauncher } from "@/components/chatbot/ChatLauncher";

// THIS SECTION DOES: wrap public page content and add the floating chat button
export default function MarketingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <main>{children}</main>
      {/* THIS SECTION DOES: show the in-site chat bubble on every public page */}
      <ChatLauncher />
    </>
  );
}
