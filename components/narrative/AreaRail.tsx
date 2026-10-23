// ============================================
// WHAT THIS FILE DOES (plain English):
// Under a section, these chips open the other rooms.
// The current room is left out so the row is a way onward.
// ============================================

import Link from "next/link";
import { areas } from "@/content/narrative";

export function AreaRail({ current }: { current: string }) {
  const rest = areas.filter((area) => area.href !== current);
  return (
    <nav aria-label="Other parts of the story" className="mt-10 flex flex-wrap gap-2">
      {rest.map((area) => (
        <Link
          key={area.href}
          href={area.href}
          data-track={`link:rail_${area.id}:${current.replace("/", "") || "home"}`}
          className="label inline-flex min-h-[44px] items-center rounded-control px-4 text-on-hero"
          style={{ background: area.pigment }}
        >
          {area.short}
        </Link>
      ))}
    </nav>
  );
}
