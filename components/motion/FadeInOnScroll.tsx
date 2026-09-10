"use client";

// ============================================
// WHAT THIS FILE DOES (plain English):
// This wrapper makes whatever you put inside it gently fade and rise
// into view the first time it scrolls onto the screen. It is the
// default entrance for most sections, so reveals feel the same
// everywhere. It does not add any layout or content of its own.
// ============================================

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

// THIS SECTION DOES: list the options a caller can pass in
type FadeInOnScrollProps = {
  children: ReactNode;
  delay?: number; // seconds to wait before starting, for staggering by hand
  y?: number; // how far up it travels while fading in, in pixels
  className?: string;
  as?: "div" | "section" | "li" | "article" | "header"; // which HTML tag to render
};

// THIS SECTION DOES: fade and lift the children into view once, respecting reduced-motion
export function FadeInOnScroll({
  children,
  delay = 0,
  y = 18, // a small upward travel, per the brand motion rules
  className = "",
  as = "div",
}: FadeInOnScrollProps) {
  // --- ACCESSIBILITY: if the visitor prefers less motion, show the content with no movement ---
  const reduceMotion = useReducedMotion();
  const MotionTag = motion[as];

  if (reduceMotion) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 1, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }} // reveal a little before fully on screen, only once
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }} // soft Apple-like easing, under 500ms
    >
      {children}
    </MotionTag>
  );
}
