// ============================================
// WHAT THIS FILE DOES (plain English):
// This wraps a group (like a grid of chips or cards) so its items
// reveal one shortly after another as the group scrolls into view,
// instead of all at once. It keeps grids feeling lively but calm.
// If the visitor asked for less motion, everything just shows at once
// with no movement.
// ============================================

"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

// THIS SECTION DOES: describe the options this wrapper accepts
type StaggerChildrenProps = {
  children: ReactNode;
  className?: string;
};

// THIS SECTION DOES: set how the group and each child animate
const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.06 }, // a short 60ms gap between items, never a long domino
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.42, ease: [0.22, 1, 0.36, 1] },
  },
};

// THIS SECTION DOES: reveal the group's direct children in a gentle sequence
export function StaggerChildren({ children, className }: StaggerChildrenProps) {
  // --- ACCESSIBILITY: honor the visitor's reduced-motion setting ---
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
    >
      {children}
    </motion.div>
  );
}

// THIS SECTION DOES: mark one item inside a StaggerChildren group so it takes part in the sequence
export function StaggerItem({ children, className }: StaggerChildrenProps) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div className={className} variants={itemVariants}>
      {children}
    </motion.div>
  );
}
