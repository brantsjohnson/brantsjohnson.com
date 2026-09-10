// ============================================
// WHAT THIS FILE DOES (plain English):
// This is a round-cornered button that only shows an icon, used for
// things like closing the chat. It always has a text label for screen
// readers even though the label is not drawn on screen.
// ============================================

import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

type IconButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  label: string; // spoken name of the action
  icon: ReactNode;
  variant?: "glass" | "ghost";
  size?: "sm" | "md";
};

const variantMap = {
  glass: "glass border border-line text-ink hover:bg-surface shadow-glass",
  ghost: "bg-transparent border border-transparent text-ink-soft hover:bg-black/[0.04] hover:text-ink",
};

const sizeMap = {
  sm: "h-9 w-9",
  md: "h-11 w-11",
};

// THIS SECTION DOES: render a labeled icon-only control
export function IconButton({
  label,
  icon,
  variant = "glass",
  size = "md",
  className = "",
  ...rest
}: IconButtonProps) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      className={cn(
        "focus-ring inline-flex items-center justify-center rounded-control transition-colors duration-150 disabled:pointer-events-none disabled:opacity-40",
        variantMap[variant],
        sizeMap[size],
        className
      )}
      {...rest}
    >
      {icon}
    </button>
  );
}
