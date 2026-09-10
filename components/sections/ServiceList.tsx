// ============================================
// WHAT THIS FILE DOES (plain English):
// This shows the two community service items (the Archway and the
// Resilient Scholarship) as glass cards. Facts come from
// content/service.ts.
// ============================================

import type { ServiceItem } from "@/content/service";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { StaggerChildren } from "@/components/motion/StaggerChildren";

type ServiceListProps = {
  items: ServiceItem[];
};

// THIS SECTION DOES: render each service item as a glass card
export function ServiceList({ items }: ServiceListProps) {
  return (
    <StaggerChildren className="grid gap-6 md:grid-cols-2">
      {items.map((item) => (
        <GlassPanel key={item.title} as="article" padding="lg">
          <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink-soft">{item.period}</p>
          <h3 className="mt-3 font-heading text-h3 font-medium tracking-tight text-ink">{item.title}</h3>
          <p className="mt-1 text-[13px] text-ink-soft">{item.role}</p>
          <p className="mt-4 text-[15px] leading-relaxed text-ink-soft">{item.summary}</p>
          {item.note && <p className="mt-4 text-[14px] text-ink">{item.note}</p>}
        </GlassPanel>
      ))}
    </StaggerChildren>
  );
}
