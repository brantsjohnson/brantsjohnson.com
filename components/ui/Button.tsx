// ============================================
// WHAT THIS FILE DOES (plain English):
// This is the one button used across the site. Give it a link and it
// becomes a link. Give it an onClick and it becomes a real button.
// "primary" is the gold action. "ghost" is the quiet action on paper.
// "line" is the quiet action on a black band. External links open in
// a new tab. Every button can carry a tracking name.
// ============================================

import type { ButtonHTMLAttributes, ReactNode } from "react";
import Link from "next/link";
import { clsx } from "clsx";

type ButtonProps = {
  children: ReactNode;
  variant?: "primary" | "ghost" | "line";
  href?: string;
  onClick?: () => void;
  className?: string;
  type?: ButtonHTMLAttributes<HTMLButtonElement>["type"];
  ariaLabel?: string;
  track?: string; // data-track name from the naming taxonomy
};

const baseClasses =
  "inline-flex items-center justify-center gap-2 rounded-control px-6 py-3 text-body font-semibold min-h-[44px] transition-colors duration-[120ms] ease-brand focus-visible:outline-none";

const variantClasses: Record<"primary" | "ghost" | "line", string> = {
  // Gold with black text. White on this gold would fail contrast.
  primary: "bg-accent text-ink hover:bg-accent-muted",
  ghost: "border border-border-subtle text-ink hover:border-ink",
  line: "border border-accent text-on-hero hover:bg-accent hover:text-ink",
};

export function Button({
  children,
  variant = "primary",
  href,
  onClick,
  className,
  type = "button",
  ariaLabel,
  track,
}: ButtonProps) {
  const classes = clsx(baseClasses, variantClasses[variant], className);

  if (href) {
    const external = href.startsWith("http");
    if (external) {
      return (
        <a
          href={href}
          className={classes}
          aria-label={ariaLabel}
          data-track={track}
          onClick={onClick}
          target="_blank"
          rel="noopener noreferrer"
        >
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={classes} aria-label={ariaLabel} data-track={track} onClick={onClick}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      className={classes}
      aria-label={ariaLabel}
      data-track={track}
    >
      {children}
    </button>
  );
}
