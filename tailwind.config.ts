import type { Config } from "tailwindcss";

/**
 * Tailwind CSS configuration.
 *
 * Purpose: defines where Tailwind should look for class names and sets up the
 * site's small design system (fonts, a warm neutral palette, and an accent
 * color). Keeping the palette here means a global look-and-feel change is a
 * one-file edit rather than a hunt through every component.
 */
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx,mdx}",
    "./components/**/*.{ts,tsx,mdx}",
    "./content/**/*.{ts,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // Wired to the CSS variables set by next/font in app/layout.tsx.
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        serif: ["var(--font-serif)", "Georgia", "serif"],
      },
      colors: {
        // Warm off-white/ink neutrals for a human, editorial feel.
        paper: "#faf9f6",
        ink: {
          DEFAULT: "#1a1a1a",
          soft: "#3d3d3d",
          muted: "#6b6b6b",
        },
        // Single accent used sparingly for links and highlights.
        accent: {
          DEFAULT: "#1d5c5c",
          soft: "#2a7a7a",
        },
      },
      maxWidth: {
        content: "68rem",
      },
    },
  },
  plugins: [],
};

export default config;
