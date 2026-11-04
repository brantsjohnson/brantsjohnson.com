// ============================================
// WHAT THIS FILE DOES (plain English):
// The top of every inner page. It matches the main site's page
// titles: a colored card with a darker plate shifted behind it, a
// small label, and one large title (the page's only h1). A short
// lead and any extra links sit on the paper under the card.
// Each section keeps the color it had on the main site.
// ============================================

import type { ReactNode } from "react";

type PageHeaderProps = {
  id: string;
  label: string;
  title: string;
  lead?: string;
  children?: ReactNode;
};

type Tone = { pigment: string; plate: string };

// These are the room colors from the main site. The plate is the
// darker shape that peeks out behind the title card.
const tones: Record<string, Tone> = {
  about: { pigment: "#122e48", plate: "#0c1f30" },
  work: { pigment: "#122e48", plate: "#0c1f30" },
  events: { pigment: "#582046", plate: "#3c1630" },
  community: { pigment: "#104860", plate: "#0a3040" },
  writing: { pigment: "#a83a1c", plate: "#7c2a14" },
  contact: { pigment: "#0e543c", plate: "#093828" },
  ask: { pigment: "#122e48", plate: "#0c1f30" },
  now: { pigment: "#0e543c", plate: "#093828" },
  hi: { pigment: "#122e48", plate: "#0c1f30" },
};

export function toneFor(label: string): Tone {
  const key = label.toLowerCase().split("·")[0].trim();
  if (key.startsWith("about") || key.startsWith("story")) return tones.about;
  if (key.startsWith("work") || key.startsWith("experience")) return tones.work;
  if (key.startsWith("event") || key.startsWith("perform")) return tones.events;
  if (key.startsWith("community") || key.startsWith("service") || key.startsWith("activist")) return tones.community;
  if (key.startsWith("writing") || key.startsWith("poetry") || key.startsWith("creator")) return tones.writing;
  if (key.startsWith("contact")) return tones.contact;
  if (key.startsWith("ask")) return tones.ask;
  if (key.startsWith("now")) return tones.now;
  if (key.startsWith("hi")) return tones.hi;
  return tones.about;
}

export function PageHeader({ id, label, title, lead, children }: PageHeaderProps) {
  const tone = toneFor(label);

  return (
    <header className="shell py-8 md:py-10">
      <div className="page-masthead relative">
        <div aria-hidden="true" className="absolute inset-0 translate-x-2 translate-y-2 rounded-[18px]" style={{ background: tone.plate }} />
        <div className="relative rounded-[18px] px-6 py-8 shadow-glass md:px-10 md:py-10" style={{ background: tone.pigment }}>
          <p className="label">{label}</p>
          <h1 id={id} tabIndex={-1} className="mt-3 scroll-mt-24 font-serif outline-none">
            {title}
          </h1>
        </div>
      </div>
      {lead || children ? (
        <div className="mt-8">
          {lead ? (
            <p className="max-w-[42ch] font-serif text-[clamp(1.35rem,2.2vw,1.85rem)] leading-snug text-ink">{lead}</p>
          ) : null}
          {children}
        </div>
      ) : null}
    </header>
  );
}
