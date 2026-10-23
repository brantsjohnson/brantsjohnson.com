// ============================================
// WHAT THIS FILE DOES (plain English):
// This shows one panel at a time so a section stays on one screen.
// Arrow keys move between the tabs. The selected tab uses the
// section color. Hidden panels are not in the tab order.
// ============================================

"use client";

import { useId, useState } from "react";
import type { ReactNode } from "react";

export type PanelTab = {
  id: string;
  label: string;
  content: ReactNode;
};

type PanelTabsProps = {
  label: string;
  pigment: string;
  tabs: PanelTab[];
};

export function PanelTabs({ label, pigment, tabs }: PanelTabsProps) {
  const [current, setCurrent] = useState(tabs[0]?.id ?? "");
  const base = useId();
  const selected = tabs.find((tab) => tab.id === current) ?? tabs[0];

  const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const names = ["ArrowRight", "ArrowLeft", "Home", "End"];
    if (!names.includes(event.key)) return;
    event.preventDefault();
    const index = tabs.findIndex((tab) => tab.id === current);
    let next = index;
    if (event.key === "ArrowRight") next = (index + 1) % tabs.length;
    if (event.key === "ArrowLeft") next = (index - 1 + tabs.length) % tabs.length;
    if (event.key === "Home") next = 0;
    if (event.key === "End") next = tabs.length - 1;
    const tab = tabs[next];
    setCurrent(tab.id);
    document.getElementById(`${base}-${tab.id}`)?.focus();
  };

  if (!selected) return null;

  return (
    <div>
      <div role="tablist" aria-label={label} className="flex flex-wrap gap-2" onKeyDown={onKeyDown}>
        {tabs.map((tab) => {
          const active = tab.id === selected.id;
          return (
            <button
              key={tab.id}
              id={`${base}-${tab.id}`}
              type="button"
              role="tab"
              aria-selected={active}
              aria-controls={`${base}-panel-${tab.id}`}
              tabIndex={active ? 0 : -1}
              onClick={() => setCurrent(tab.id)}
              className="label inline-flex min-h-[44px] items-center rounded-control px-4"
              style={
                active
                  ? { background: "var(--color-accent)", color: "var(--color-on-gold)", border: "1px solid var(--color-accent)" }
                  : { background: "transparent", color: "var(--color-ink)", border: "1px solid var(--color-border-subtle)" }
              }
            >
              {tab.label}
            </button>
          );
        })}
      </div>
      <div
        role="tabpanel"
        id={`${base}-panel-${selected.id}`}
        aria-labelledby={`${base}-${selected.id}`}
        tabIndex={0}
        className="mt-6 rounded-panel border border-border-subtle p-6 shadow-glass outline-none md:p-8"
        style={{ background: `linear-gradient(160deg, ${pigment}66, var(--color-surface) 60%)` }}
      >
        {selected.content}
      </div>
    </div>
  );
}
