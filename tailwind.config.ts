// ============================================
// WHAT THIS FILE DOES (plain English):
// This maps our design token names (from styles/tokens.css) into short
// Tailwind class names so components can write classes like `bg-canvas`,
// `text-ink`, `rounded-panel`, or `shadow-lift`. Every value here points
// back to a CSS variable, so tokens.css stays the single source of truth
// and nothing hardcodes a raw hex value.
// ============================================

import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./content/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // THIS SECTION DOES: connect color class names to the CSS variables in styles/tokens.css.
      // Both the original scaffold names and shorter design-friendly aliases point to the same
      // variables, so old and new code keep working from one source of truth.
      colors: {
        // Original scaffold names
        bg: "var(--color-bg)",
        surface: "var(--color-surface)",
        glass: "var(--color-glass)",
        "border-subtle": "var(--color-border-subtle)",
        "text-primary": "var(--color-text-primary)",
        "text-secondary": "var(--color-text-secondary)",
        accent: "var(--color-accent)",
        "accent-muted": "var(--color-accent-muted)",
        // Shorter aliases used across the UI (match the Magic Patterns spec)
        canvas: "var(--color-bg)", // page background
        ink: "var(--color-text-primary)", // main text
        "ink-soft": "var(--color-text-secondary)", // supporting text
        brand: "var(--color-accent)", // accent
        "brand-soft": "var(--color-accent-muted)", // accent on hover
        "on-accent": "var(--color-on-accent)", // text on accent buttons
        line: "var(--color-border-subtle)", // hairline border
        "line-strong": "var(--color-border-strong)", // border on hover
      },
      // THIS SECTION DOES: name the type sizes used across the site
      fontSize: {
        display: ["clamp(2.75rem, 5vw, 4.25rem)", { lineHeight: "1.05" }],
        h1: ["clamp(2rem, 4vw, 2.75rem)", { lineHeight: "1.1" }],
        h2: ["clamp(1.5rem, 3vw, 2rem)", { lineHeight: "1.2" }],
        h3: ["1.375rem", { lineHeight: "1.3" }],
        body: ["1.0625rem", { lineHeight: "1.6" }],
        caption: ["0.8125rem", { lineHeight: "1.4" }],
      },
      // THIS SECTION DOES: connect the two typefaces to the font tokens
      fontFamily: {
        heading: ["var(--font-heading)"],
        mono: ["var(--font-mono)"],
      },
      // THIS SECTION DOES: expose the two corner-rounding tokens
      borderRadius: {
        panel: "var(--radius-panel)",
        control: "var(--radius-control)",
      },
      // THIS SECTION DOES: expose the two soft shadow tokens
      boxShadow: {
        glass: "var(--shadow-glass)",
        lift: "var(--shadow-lift)",
      },
      // THIS SECTION DOES: expose the glass blur strength
      backdropBlur: {
        glass: "var(--glass-blur)",
      },
      transitionTimingFunction: {
        brand: "cubic-bezier(0.22, 1, 0.36, 1)", // soft Apple-like easing from the brand rules
      },
    },
  },
  plugins: [],
};

export default config;
