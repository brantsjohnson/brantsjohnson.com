"use client";

// ============================================
// WHAT THIS FILE DOES (plain English):
// This wrapper reveals a set of items one shortly after another instead
// of all at once, which is what makes a grid of cards feel alive. Put it
// around a list of cards and pass each card as a child. It does not
// decide layout; use a normal grid or flex around it for that.
// ============================================

import { motion, useReducedMotion } from "framer-motion";
import { Children, type ReactNode } from "react";

// THIS SECTION DOES: list the options a caller can pass in
type StaggerChildrenProps = {
  children: ReactNode;
  stagger?: number; // seconds between each child appearing
  className?: string;
};

// THIS SECTION DOES: reveal each child in a slight sequence, respecting reduced-motion
export function StaggerChildren({
  children,
  stagger = 0.08, // a gentle gap so the sequence reads without feeling slow
  className = "",
}: StaggerChildrenProps) {
  // --- ACCESSIBILITY: if the visitor prefers less motion, show everything at once with no movement ---
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-10% 0px" }}
      variants={{ hidden: {}, visible: { transition: { staggerChildren: stagger } } }}
    >
      {Children.map(children, (child, index) => (
        <motion.div
          key={index}
          variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        >
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
}
