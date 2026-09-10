// ============================================
// WHAT THIS FILE DOES (plain English):
// This centers page content and caps how wide it can grow, so text and
// cards never stretch awkwardly on very large screens. Almost every
// section wraps its content in this. It only controls width and side
// padding, nothing else.
// ============================================

import type { ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

// THIS SECTION DOES: list the options a caller can pass in
type ContainerProps = {
  children: ReactNode;
  className?: string;
  as?: "div" | "section" | "main" | "header" | "footer" | "nav";
};

// THIS SECTION DOES: render a centered, max-width wrapper with responsive side padding
export function Container({ children, className = "", as: Tag = "div" }: ContainerProps) {
  return (
    <Tag
      className={cn(
        "mx-auto w-full max-w-[1180px] px-6 sm:px-8", // capped width keeps line length comfortable
        className
      )}
    >
      {children}
    </Tag>
  );
}
