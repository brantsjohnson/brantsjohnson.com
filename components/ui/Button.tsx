// ============================================
// WHAT THIS FILE DOES (plain English):
// This is the standard button. It can look like the main action
// (filled with the brand color), a quieter secondary action (outlined
// glass), or a plain ghost action. Because it can also render as a link
// (an <a>), the same look works for both "do something" and "go
// somewhere" actions. It carries a tracking id for analytics.
// ============================================

import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils/cn";

// THIS SECTION DOES: define the look and size options
type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "sm" | "md";

// THIS SECTION DOES: the shared props both the button and link forms accept
type CommonProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  leadingIcon?: ReactNode;
  trailingIcon?: ReactNode;
  children: ReactNode;
  className?: string;
  // trackId follows the taxonomy in docs/09: "{element_type}:{element_name}:{context}"
  trackId?: string;
};

type ButtonAsButton = CommonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof CommonProps> & {
    href?: undefined;
  };

type ButtonAsLink = CommonProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof CommonProps> & {
    href: string;
  };

type ButtonProps = ButtonAsButton | ButtonAsLink;

// THIS SECTION DOES: map each look to its Tailwind classes (all colors come from tokens)
const variantMap: Record<ButtonVariant, string> = {
  primary: "bg-brand text-on-accent border border-transparent hover:bg-brand-soft",
  secondary: "glass text-ink border border-line hover:border-line-strong hover:bg-surface",
  ghost: "bg-transparent text-ink border border-transparent hover:bg-black/[0.04]",
};

// THIS SECTION DOES: map each size to its height and text size
const sizeMap: Record<ButtonSize, string> = {
  sm: "h-9 px-3.5 text-[13px] gap-1.5",
  md: "h-11 px-5 text-sm gap-2",
};

// THIS SECTION DOES: render either a styled button or a styled link with the same look
export function Button(props: ButtonProps) {
  const {
    variant = "primary",
    size = "md",
    leadingIcon,
    trailingIcon,
    children,
    className = "",
    trackId,
    ...rest
  } = props;

  const classes = cn(
    "focus-ring inline-flex items-center justify-center rounded-control font-medium transition-colors duration-150 disabled:opacity-40 disabled:pointer-events-none",
    variantMap[variant],
    sizeMap[size],
    className
  );

  const inner = (
    <>
      {leadingIcon}
      {children}
      {trailingIcon}
    </>
  );

  // THIS SECTION DOES: use a Next.js link for internal pages, a normal link for email/external, or a real button
  if (props.href !== undefined) {
    const href = props.href;
    const { href: _ignoredHref, ...anchorRest } = rest as AnchorHTMLAttributes<HTMLAnchorElement>;
    const isInternal = href.startsWith("/") && !href.startsWith("//");

    if (isInternal) {
      return (
        <Link href={href} data-track={trackId} className={classes} {...anchorRest}>
          {inner}
        </Link>
      );
    }

    return (
      <a href={href} data-track={trackId} className={classes} {...anchorRest}>
        {inner}
      </a>
    );
  }

  return (
    <button data-track={trackId} className={classes} {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {inner}
    </button>
  );
}
