// ============================================
// WHAT THIS FILE DOES (plain English):
// A thin gold line under the header that fills as the visitor
// scrolls down a page. With reduced motion on, it is left out.
// ============================================

"use client";

import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";

export function ScrollProgress() {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 28, mass: 0.2 });
  if (reduce) return null;
  return (
    <motion.div
      aria-hidden="true"
      className="absolute inset-x-0 bottom-[-1px] h-[2px] origin-left bg-gradient-to-r from-accent-deep via-accent-bright to-accent"
      style={{ scaleX }}
    />
  );
}
