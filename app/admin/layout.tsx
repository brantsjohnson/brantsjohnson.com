// ============================================
// WHAT THIS FILE DOES (plain English):
// This wraps all admin (behind-the-scenes) pages. Search engines
// should never list these pages. Real sign-in checks come later.
// ============================================

// --- SECURITY: tell search engines not to index the admin area ---
export const metadata = {
  robots: { index: false, follow: false },
};

// THIS SECTION DOES: wrap admin pages in a marked container so we can style and protect them later
export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div data-area="admin">{children}</div>;
}
