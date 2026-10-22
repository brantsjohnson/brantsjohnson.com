// ============================================
// WHAT THIS FILE DOES (plain English):
// This is the Next.js settings file for the public site.
// It holds Wix-to-Next 301 redirects and ignores the separate BrantChat/
// folder during local file watching. In-site chat lives at /chat and uses
// lib/ai; the BrantChat/ app can stay deployed on brantchat.brantsjohnson.com.
// ============================================

const wixToNextRedirects = [
  { old: "/blank-2", next: "/work" },
  { old: "/experience", next: "/work" },
  { old: "/projects", next: "/work" },
  { old: "/projects/intro", next: "/work#intro" },
  { old: "/projects/bridger", next: "/work#bridger" },
  { old: "/projects/ask", next: "/ask" },
  { old: "/projects/:slug", next: "/work" },
  { old: "/blank-1", next: "/about#service" },
  { old: "/blank-3", next: "/about#service" },
  { old: "/service", next: "/about#service" },
  { old: "/leadership", next: "/about#service" },
  { old: "/civic-engagement", next: "/about#service" },
  { old: "/blank-4", next: "/about#skills" },
  { old: "/about-1", next: "/about" },
  { old: "/skills", next: "/about#skills" },
  { old: "/blog", next: "/writing" },
  { old: "/blog/:slug", next: "/writing/:slug" },
  { old: "/poetry", next: "/writing" },
  { old: "/poetry/:slug", next: "/writing" },
  { old: "/photography", next: "/about" },
  { old: "/photography/:slug", next: "/about" },
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
