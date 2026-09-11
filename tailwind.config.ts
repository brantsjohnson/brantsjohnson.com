// ============================================
// WHAT THIS FILE DOES (plain English):
// This maps design token names into Tailwind class names so
// components can write things like `bg-surface`, `text-h2`,
// `rounded-panel`, or `font-serif` instead of raw values.
// The real values live in styles/tokens.css; this file only
// connects the names.
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
      // THIS SECTION DOES: connect the two typefaces to font-serif and font-sans
      fontFamily: {
        serif: "var(--font-serif)",
        sans: "var(--font-sans)",
      },
      // THIS SECTION DOES: name the type sizes used across the site
      fontSize: {
        display: ["clamp(2.75rem, 1.4rem + 5vw, 5rem)", { lineHeight: "1.05" }],
        h1: ["clamp(2.125rem, 1.4rem + 3vw, 3.25rem)", { lineHeight: "1.1" }],
        h2: ["clamp(1.625rem, 1.2rem + 1.6vw, 2.25rem)", { lineHeight: "1.2" }],
        h3: ["1.375rem", { lineHeight: "1.3" }],
        body: ["clamp(1rem, 0.96rem + 0.2vw, 1.125rem)", { lineHeight: "1.6" }],
        caption: ["0.875rem", { lineHeight: "1.4" }],
      },
      // THIS SECTION DOES: expose the shared spacing steps as padding/margin/gap classes
      spacing: {
        1: "var(--space-1)",
        2: "var(--space-2)",
        3: "var(--space-3)",
        4: "var(--space-4)",
        6: "var(--space-6)",
        8: "var(--space-8)",
        12: "var(--space-12)",
        16: "var(--space-16)",
        24: "var(--space-24)",
        32: "var(--space-32)",
      },
      // THIS SECTION DOES: expose the shell and reading widths
      maxWidth: {
        shell: "var(--shell-max)",
        reading: "var(--reading-max)",
      },
      // THIS SECTION DOES: expose the two corner-roundness levels
      borderRadius: {
        panel: "var(--radius-panel)",
        control: "var(--radius-control)",
      },
      // THIS SECTION DOES: expose the soft glass shadow
      boxShadow: {
        glass: "var(--shadow-glass)",
      },
      // THIS SECTION DOES: expose the blur strength for glass panels
      backdropBlur: {
        glass: "var(--glass-blur)",
      },
      // THIS SECTION DOES: expose the stacking order tokens
      zIndex: {
        sticky: "100",
        overlay: "200",
        modal: "300",
      },
      transitionTimingFunction: {
        brand: "cubic-bezier(0.22, 1, 0.36, 1)", // soft Apple-like easing from the brand rules
      },
    },
  },
  plugins: [],
};

export default config;
