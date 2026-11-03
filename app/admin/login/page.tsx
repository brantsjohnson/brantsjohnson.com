// ============================================
// WHAT THIS FILE DOES (plain English):
// The sign-in page for the admin area.
// ============================================

import { redirect } from "next/navigation";
import { isAdmin } from "@/lib/admin/auth";
import { adminConfigured } from "@/lib/admin/session";
import { LoginForm } from "./LoginForm";

export const dynamic = "force-dynamic";

export default function AdminLoginPage() {
  if (isAdmin()) redirect("/admin/analytics");
  return (
    <main className="shell py-24">
      <p className="label text-accent-deep">Admin</p>
      <h1 className="mt-4 font-serif text-h1 text-ink">Sign in</h1>
      <div className="mt-10">
        {adminConfigured() ? (
          <LoginForm />
        ) : (
          <p className="max-w-reading text-body text-text-secondary">
            Admin sign-in is not set up yet. Add a setting named ADMIN_PASSWORD in Vercel (your password) and redeploy. The steps are in docs/PUBLISHING.md,
            under Analytics.
          </p>
        )}
      </div>
    </main>
  );
}
