// ============================================
// WHAT THIS FILE DOES (plain English):
// The Sign out button on the analytics page.
// ============================================

"use client";

import { useRouter } from "next/navigation";

export function SignOut() {
  const router = useRouter();
  return (
    <button
      type="button"
      onClick={async () => {
        await fetch("/api/admin/logout", { method: "POST" });
        router.push("/admin/login");
        router.refresh();
      }}
      className="label inline-flex min-h-[44px] items-center text-ink underline decoration-accent decoration-2 underline-offset-4 hover:text-accent-deep"
    >
      Sign out
    </button>
  );
}
