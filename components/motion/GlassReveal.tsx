"use client";

// ============================================
// WHAT THIS FILE DOES (plain English):
// This wrapper reveals a large glass panel with a soft focus-in: it
// starts slightly small and blurred, then settles into place. It is
// meant for a hero panel or a big feature card, used sparingly so it
// stays special. It adds no layout or content of its own.
// ============================================

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

// THIS SECTION DOES: list the options a caller can pass in
type GlassRevealProps = {
  children: ReactNode;
  delay?: number; // seconds to wait before starting
  className?: string;
};

// THIS SECTION DOES: settle the panel into view with a gentle scale and unblur, respecting reduced-motion
export function GlassReveal({ children, delay = 0, className = "" }: GlassRevealProps) {
  // --- ACCESSIBILITY: if the visitor prefers less motion, show the panel with no movement ---
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 1, scale: 0.98 }}
      whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-8% 0px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
