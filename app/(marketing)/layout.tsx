// ============================================
// WHAT THIS FILE DOES (plain English):
// This is a shared wrapper for all public pages (home, about, projects,
// and the rest). Later it will hold the nav, footer, and chat bubble.
// Admin pages and API routes do not use this wrapper.
// ============================================

// THIS SECTION DOES: wrap public page content in a main area so we can add shared chrome later
export default function MarketingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <main>{children}</main>;
}
