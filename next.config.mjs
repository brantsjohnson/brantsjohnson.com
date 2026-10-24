// ============================================
// WHAT THIS FILE DOES (plain English):
// This is the Next.js settings file for the public site.
// It holds the old-address 301 redirects (the old Wix pages and the earlier five-room layout) and ignores the separate BrantChat/
// folder during local file watching. In-site chat lives at /chat and uses
// lib/ai; the BrantChat/ app can stay deployed on brantchat.brantsjohnson.com.
// ============================================

const wixToNextRedirects = [
  { old: "/blank-2", next: "/work" },
  { old: "/experience", next: "/work" },
  { old: "/projects/ask", next: "/ask" },
  { old: "/blank-1", next: "/community" },
  { old: "/blank-3", next: "/community" },
  { old: "/service", next: "/community" },
  { old: "/leadership", next: "/community" },
  { old: "/civic-engagement", next: "/community" },
  { old: "/blank-4", next: "/about" },
  { old: "/about-1", next: "/about" },
  { old: "/skills", next: "/about" },
  { old: "/blog", next: "/writing" },
  { old: "/blog/:slug", next: "/writing/:slug" },
  { old: "/poetry", next: "/projects/poetry" },
  { old: "/poetry/:slug", next: "/projects/poetry/:slug" },
  { old: "/photography", next: "/about" },
  { old: "/photography/:slug", next: "/about" },
  // The earlier five-room layout moved into the six-place menu.
  { old: "/product", next: "/work" },
  { old: "/creator", next: "/projects" },
  { old: "/creator/crew", next: "/projects/crew" },
  { old: "/creator/poetry", next: "/projects/poetry" },
  { old: "/creator/poetry/:slug", next: "/projects/poetry/:slug" },
  { old: "/creator/blog", next: "/writing" },
  { old: "/performer", next: "/projects/theater" },
  { old: "/entrepreneur", next: "/work#building" },
  { old: "/activist", next: "/community" },
  { old: "/story", next: "/about" },
  { old: "/beliefs", next: "/about#beliefs" },
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
