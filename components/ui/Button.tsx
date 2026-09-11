// ============================================
// WHAT THIS FILE DOES (plain English):
// This is the one button used across the site. Give it a link
// (href) and it becomes a link; give it an onClick and it becomes a
// real button. It has two looks: "primary" is the single accent
// action on a screen, and "ghost" is a quieter secondary action.
// Keeping one button here means every button matches everywhere.
// ============================================

import type { ButtonHTMLAttributes, ReactNode } from "react";
import Link from "next/link";
import { clsx } from "clsx";

// THIS SECTION DOES: describe the options this button accepts
type ButtonProps = {
  children: ReactNode;
  variant?: "primary" | "ghost"; // primary is the one accent action; ghost is quieter
  href?: string; // when set, the button renders as a link instead
  onClick?: () => void;
  className?: string;
  // Standard button attributes (type, aria-label, and so on) when used as a real button.
  type?: ButtonHTMLAttributes<HTMLButtonElement>["type"];
  ariaLabel?: string;
};

// THIS SECTION DOES: pick the shared look, then the look for the chosen variant
const baseClasses =
  "inline-flex items-center justify-center gap-2 rounded-control px-6 py-3 text-body font-medium min-h-[44px] transition-all duration-[120ms] ease-brand hover:scale-[1.02] focus-visible:outline-none";

const variantClasses: Record<"primary" | "ghost", string> = {
  // The primary action uses the single accent color so it is the clear next step on the screen.
  primary: "bg-accent text-white hover:bg-accent-muted shadow-glass",
  // The quieter action is a hairline glass outline, no fill.
  ghost: "bg-glass border border-border-subtle text-text-primary hover:border-accent",
};

// THIS SECTION DOES: render either a link or a real button using the same look
export function Button({
  children,
  variant = "primary",
  href,
  onClick,
  className,
  type = "button",
  ariaLabel,
}: ButtonProps) {
  const classes = clsx(baseClasses, variantClasses[variant], className);

  // A button with a link goes to a page. Internal links stay in the same tab (docs/14 §6.2).
  if (href) {
    return (
      <Link href={href} className={classes} aria-label={ariaLabel}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={classes} aria-label={ariaLabel}>
      {children}
    </button>
  );
}
