// ============================================
// WHAT THIS FILE DOES (plain English):
// The admin password box. On a correct password it also marks this
// browser as Brant's own, so his visits to the site are not counted
// in the analytics.
// ============================================

"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/Button";

export function LoginForm() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    setBusy(true);
    setError("");
    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const body = (await response.json()) as { error?: string };
      if (!response.ok) {
        setError(body.error ?? "That did not work.");
        return;
      }
      try {
        window.localStorage.setItem("bj_owner", "1");
      } catch {
        /* storage blocked; visits from this browser will be counted */
      }
      router.push("/admin/analytics");
      router.refresh();
    } catch {
      setError("That did not work. Try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <form onSubmit={submit} className="flex max-w-sm flex-col gap-5">
      <label className="flex flex-col gap-2 text-caption text-text-secondary">
        Password
        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          autoComplete="current-password"
          required
          className="min-h-[44px] border-b border-ink bg-transparent text-body text-ink outline-none"
        />
      </label>
      <Button type="submit">{busy ? "Checking" : "Sign in"}</Button>
      {error ? (
        <p role="alert" className="text-body text-ink">
          {error}
        </p>
      ) : null}
    </form>
  );
}
