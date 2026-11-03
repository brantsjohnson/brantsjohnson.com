// ============================================
// WHAT THIS FILE DOES (plain English):
// The frame for the private admin pages. They are kept out of search
// engines and out of the public site's menu and footer.
// ============================================

import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: ReactNode }) {
  return <div className="min-h-dvh bg-bg">{children}</div>;
}
