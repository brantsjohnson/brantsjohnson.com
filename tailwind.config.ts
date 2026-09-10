// ============================================
// WHAT THIS FILE DOES (plain English):
// This maps design token names into Tailwind class names.
// Real brand colors get filled in later. Components should use
// these names instead of hardcoding hex values.
// ============================================

import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // THIS SECTION DOES: connect color class names to CSS variables in styles/tokens.css
      colors: {
        bg: "var(--color-bg)",
        surface: "var(--color-surface)",
        glass: "var(--color-glass)",
        "border-subtle": "var(--color-border-subtle)",
        "text-primary": "var(--color-text-primary)",
        "text-secondary": "var(--color-text-secondary)",
        accent: "var(--color-accent)",
        "accent-muted": "var(--color-accent-muted)",
      },
      // THIS SECTION DOES: name the type sizes used across the site
      fontSize: {
        display: ["clamp(2.5rem, 5vw, 4.5rem)", { lineHeight: "1.1" }],
        h1: ["2.5rem", { lineHeight: "1.15" }],
        h2: ["1.875rem", { lineHeight: "1.2" }],
        h3: ["1.375rem", { lineHeight: "1.3" }],
        body: ["1.125rem", { lineHeight: "1.5" }],
        caption: ["0.875rem", { lineHeight: "1.4" }],
      },
      transitionTimingFunction: {
        brand: "cubic-bezier(0.22, 1, 0.36, 1)", // soft Apple-like easing from the brand rules
      },
    },
  },
  plugins: [],
};

export default config;
