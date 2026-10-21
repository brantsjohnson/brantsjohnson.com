// ============================================
// WHAT THIS FILE DOES (plain English):
// This records the homepage headline test with Vercel Analytics.
// One event is a click on "See the work".
// The other is a scroll that reaches the work section.
// Nothing here is a paid ad product.
// ============================================

"use client";

import { useEffect, useRef } from "react";
import { track } from "@vercel/analytics";
import { Button } from "@/components/ui/Button";

function send(name: "hero_see_work" | "hero_scroll_work", variant: string) {
  track(name, { variant });
}

export function SeeTheWorkButton({
  href,
  label,
  variant,
}: {
  href: string;
  label: string;
  variant: string;
}) {
  return (
    <Button href={href} track="button:see_work:home" onClick={() => send("hero_see_work", variant)}>
      {label}
    </Button>
  );
}

export function WorkSectionView({ variant }: { variant: string }) {
  const sent = useRef(false);

  useEffect(() => {
    const section = document.getElementById("work");
    if (!section) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting) || sent.current) return;
        sent.current = true;
        send("hero_scroll_work", variant);
        observer.disconnect();
      },
      { threshold: 0.25 }
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, [variant]);

  return null;
}
