/**
 * PostCSS configuration.
 *
 * Purpose: runs Tailwind CSS and Autoprefixer during the build so the utility
 * classes used across the site are compiled into real CSS with vendor prefixes.
 */
const config = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};

export default config;
