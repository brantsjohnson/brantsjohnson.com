// ============================================
// WHAT THIS FILE DOES (plain English):
// This runs Tailwind and Autoprefixer on the CSS.
// It is plumbing so design tokens and utility classes work.
// ============================================

/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};

export default config;
