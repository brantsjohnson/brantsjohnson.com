// ============================================
// WHAT THIS FILE DOES (plain English):
// This is a plain text link with a subtle underline. External links get
// a small arrow and open in a new tab. Use it inside sentences and for
// quiet "go somewhere" actions that are not full buttons.
// ============================================

import type { AnchorHTMLAttributes, ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils/cn";

type TextLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  children?: ReactNode;
  tone?: "text" | "accent";
  external?: boolean;
  // trackId follows the taxonomy in docs/09
  trackId?: string;
};

// THIS SECTION DOES: render a styled link, adding an arrow and new-tab behavior when external
export function TextLink({
  tone = "text",
  external = false,
  className = "",
  children,
  trackId,
  ...rest
}: TextLinkProps) {
  const toneClasses =
    tone === "accent"
      ? "text-brand decoration-brand/30 hover:decoration-brand"
      : "text-ink decoration-black/20 hover:decoration-black/60";

  return (
    <a
      data-track={trackId}
      className={cn(
        "focus-ring inline-flex items-center gap-1 rounded-sm underline underline-offset-4 transition-colors duration-150",
        toneClasses,
        className
      )}
      // THIS SECTION DOES: only open a new tab for external links, and add the safety rel attributes
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer noopener" : undefined}
      {...rest}
    >
      {children}
      {external && <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />}
    </a>
  );
}
