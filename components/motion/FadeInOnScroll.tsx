// ============================================
// WHAT THIS FILE DOES (plain English):
// This wraps any piece of the page so it gently fades and rises
// into view the first time it scrolls onto the screen, instead of
// just popping in. Every section on the site uses this so the whole
// page feels like one calm, consistent reveal (the Apple feel).
// If the visitor asked their device for less motion, it simply shows
// the content with no movement.
// ============================================

"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

// THIS SECTION DOES: describe the options this wrapper accepts
type FadeInOnScrollProps = {
  children: ReactNode;
  delay?: number; // small head start in seconds, used to stagger neighbors
  className?: string;
};

// THIS SECTION DOES: reveal the children once, when they enter the viewport
export function FadeInOnScroll({ children, delay = 0, className }: FadeInOnScrollProps) {
  // --- ACCESSIBILITY: honor the visitor's reduced-motion setting ---
  const reduceMotion = useReducedMotion();

  // When motion is reduced, show the content in place with no animation.
  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 20 }} // start slightly lower and see-through
      whileInView={{ opacity: 1, y: 0 }} // settle into place when scrolled into view
      viewport={{ once: true, margin: "-80px" }} // run once, a little before fully on screen
      transition={{
        duration: 0.48, // matches --motion-duration in the tokens
        ease: [0.22, 1, 0.36, 1], // the soft brand easing
        delay,
      }}
    >
      {children}
    </motion.div>
  );
}
