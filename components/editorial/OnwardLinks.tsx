// ============================================
// WHAT THIS FILE DOES (plain English):
// This draws the links that move you to the next page (things like
// "Parties and gatherings" and "Things I've made"). They are buttons,
// not underlined text. The first one is the gold button. The rest are
// outline buttons. Each one keeps its tracking name.
// ============================================

import { Button } from "@/components/ui/Button";

type OnwardLink = { text: string; href: string; track: string };

export function OnwardLinks({ links, className = "" }: { links: OnwardLink[]; className?: string }) {
  if (links.length === 0) return null;

  return (
    <ul className={`flex flex-wrap gap-3 ${className}`}>
      {links.map((item, index) => (
        <li key={`${item.href}-${item.track}`}>
          <Button href={item.href} variant={index === 0 ? "primary" : "ghost"} track={item.track}>
            {item.text}
          </Button>
        </li>
      ))}
    </ul>
  );
}
