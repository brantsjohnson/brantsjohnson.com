// ============================================
// WHAT THIS FILE DOES (plain English):
// This is a shared wrapper for all public pages (home, about, projects,
// and the rest). It holds the glass nav, the footer, and the chat
// bubble. Admin pages and API routes do not use this wrapper.
// ============================================

import type { ReactNode } from "react";
import { SiteNav } from "@/components/sections/SiteNav";
import { SiteFooter } from "@/components/sections/SiteFooter";
import { ChatWidget } from "@/components/chatbot/ChatWidget";

// THIS SECTION DOES: wrap public page content in the shared chrome
export default function MarketingLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <div className="relative min-h-screen bg-canvas text-ink antialiased">
      {/* THIS SECTION DOES: a soft wash of light behind the hero so the glass nav has something to sit on */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[520px] bg-surface/60"
        aria-hidden="true"
      />
      <div className="relative">
        <SiteNav />
        <main>{children}</main>
        <SiteFooter />
      </div>
      <ChatWidget />
    </div>
  );
}
