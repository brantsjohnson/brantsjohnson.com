// ============================================
// WHAT THIS FILE DOES (plain English):
// This is the Next.js settings file for the public site.
// It holds Wix-to-Next 301 redirects and ignores the separate BrantChat/
// folder during local file watching. In-site chat lives at /chat and uses
// lib/ai; the BrantChat/ app can stay deployed on brantchat.brantsjohnson.com.
// ============================================

const wixToNextRedirects = [
  { old: "/blank-2", next: "/experience" },
  { old: "/blank-1", next: "/service" },
  { old: "/blank-3", next: "/leadership" },
  { old: "/blank-4", next: "/skills" },
  { old: "/about-1", next: "/about" },
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  async redirects() {
    return wixToNextRedirects.map(({ old, next }) => ({
      source: old,
      destination: next,
      statusCode: 301,
    }));
  },

  webpack: (config) => {
    config.watchOptions = {
      ...config.watchOptions,
      ignored: ["**/BrantChat/**", "**/node_modules/**"],
    };
    return config;
  },
};

export default nextConfig;
