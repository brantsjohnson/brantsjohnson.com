// ============================================
// WHAT THIS FILE DOES (plain English):
// This is the optional "Now" snapshot on About: a quiet pair of
// placeholders for current reading and watching. It is static on
// purpose. It does not log anyone in or talk to Bridger.
// ============================================

import { now } from "@/content/now";
import { GlassPanel } from "@/components/ui/GlassPanel";

// THIS SECTION DOES: render the two Now fields as labeled glass cards
export function NowBlock() {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <GlassPanel padding="md">
        <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink-soft">Reading</p>
        <p className="mt-2 text-[15px] leading-relaxed text-ink">{now.reading}</p>
      </GlassPanel>
      <GlassPanel padding="md">
        <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink-soft">Watching</p>
        <p className="mt-2 text-[15px] leading-relaxed text-ink">{now.watching}</p>
      </GlassPanel>
    </div>
  );
}
