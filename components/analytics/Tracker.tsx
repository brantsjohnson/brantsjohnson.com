// ============================================
// WHAT THIS FILE DOES (plain English):
// This is the small script that records, anonymously, how people use
// the site: which page they open, which tracked link or button they
// click (every link already carries a name in its data-track
// attribute), which tracked links were on the page but never clicked,
// and how far they scroll. It sets no cookies. It does nothing when
// the visitor's browser says Do Not Track, on the admin pages, or on
// a device where Brant has signed in to the admin page (so his own
// visits are not counted). The events go to /api/t.
// ============================================

"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

function skip(): boolean {
  try {
    if (navigator.doNotTrack === "1" || (window as unknown as { doNotTrack?: string }).doNotTrack === "1") return true;
    if (window.localStorage.getItem("bj_owner") === "1") return true;
  } catch {
    /* storage can be blocked; keep going */
  }
  return false;
}

function send(payload: Record<string, unknown>) {
  const body = JSON.stringify(payload);
  try {
    if (navigator.sendBeacon && navigator.sendBeacon("/api/t", new Blob([body], { type: "application/json" }))) return;
  } catch {
    /* fall through */
  }
  void fetch("/api/t", { method: "POST", body, keepalive: true, headers: { "Content-Type": "application/json" } }).catch(() => undefined);
}

function device(): "mobile" | "tablet" | "desktop" {
  const width = window.innerWidth;
  return width < 768 ? "mobile" : width < 1100 ? "tablet" : "desktop";
}

function referrerHost(): string {
  try {
    const host = new URL(document.referrer).hostname.replace(/^www\./, "");
    return host && host !== window.location.hostname.replace(/^www\./, "") ? host : "";
  } catch {
    return "";
  }
}

export function Tracker() {
  const pathname = usePathname();
  const deepest = useRef(0);
  const reported = useRef(0);
  const current = useRef(pathname);
  const first = useRef(true);

  // One page view each time the page changes, with the names of the tracked links on it.
  useEffect(() => {
    if (skip() || pathname.startsWith("/admin")) return;
    current.current = pathname;
    deepest.current = 0;
    reported.current = 0;
    const timer = window.setTimeout(() => {
      const seen = Array.from(new Set(Array.from(document.querySelectorAll("[data-track]")).map((el) => el.getAttribute("data-track") ?? ""))).filter(Boolean).slice(0, 80);
      const params = new URLSearchParams(window.location.search);
      send({
        t: "view",
        p: pathname,
        r: first.current ? referrerHost() : "",
        s: seen,
        v: device(),
        u: first.current ? params.get("utm_source") || params.get("ref") || undefined : undefined,
      });
      first.current = false;
    }, 600);
    return () => window.clearTimeout(timer);
  }, [pathname]);

  // Clicks on tracked links and buttons, and on links that leave the site.
  useEffect(() => {
    if (skip()) return;
    const onClick = (event: MouseEvent) => {
      const target = event.target as Element | null;
      if (!target || !target.closest) return;
      const tracked = target.closest("[data-track]");
      const anchor = target.closest("a[href]") as HTMLAnchorElement | null;
      let name = tracked?.getAttribute("data-track") ?? "";
      if (!name && anchor && anchor.hostname && anchor.hostname !== window.location.hostname) {
        name = `outbound:${anchor.hostname.replace(/^www\./, "")}`;
      }
      if (name) send({ t: "click", p: current.current, n: name });
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  // How far down the page they got, reported when they leave.
  useEffect(() => {
    if (skip()) return;
    const onScroll = () => {
      const doc = document.documentElement;
      const total = doc.scrollHeight - window.innerHeight;
      if (total <= 0) {
        deepest.current = 100;
        return;
      }
      deepest.current = Math.max(deepest.current, Math.min(100, Math.round(((window.scrollY + window.innerHeight * 0.5) / (total + window.innerHeight * 0.5)) * 100)));
    };
    const report = () => {
      const step = [100, 75, 50, 25].find((s) => deepest.current >= s - 5) ?? 0;
      if (step > reported.current && !current.current.startsWith("/admin")) {
        reported.current = step;
        send({ t: "scroll", p: current.current, d: step });
      }
    };
    const onHide = () => {
      if (document.visibilityState === "hidden") report();
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("visibilitychange", onHide);
    window.addEventListener("pagehide", report);
    return () => {
      report();
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("visibilitychange", onHide);
      window.removeEventListener("pagehide", report);
    };
  }, [pathname]);

  return null;
}
