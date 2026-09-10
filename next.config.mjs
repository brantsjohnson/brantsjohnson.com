// ============================================
// WHAT THIS FILE DOES (plain English):
// This is the Next.js settings file for the public site.
// BrantChat stays a separate folder for now and is kept out of
// this build until we wire it in.
// ============================================

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // THIS SECTION DOES: ignore the old BrantChat folder while this app watches for file changes
  webpack: (config) => {
    config.watchOptions = {
      ...config.watchOptions,
      ignored: ["**/BrantChat/**", "**/node_modules/**"],
    };
    return config;
  },
};

export default nextConfig;
