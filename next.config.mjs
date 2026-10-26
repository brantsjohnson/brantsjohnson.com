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
  { old: "/projects", next: "/events" },
  { old: "/projects/crew", next: "/work/crew-brand" },
  { old: "/projects/backlocal", next: "/work/backlocal" },
  { old: "/projects/intro", next: "/work/intro" },
  { old: "/projects/bridger", next: "/work/bridger" },
  { old: "/projects/theater", next: "/events/theater" },
  { old: "/projects/handmade", next: "/about/handmade" },
  { old: "/projects/chatbot", next: "/work/ai-chatbot" },
  { old: "/projects/poetry", next: "/writing/poetry" },
  { old: "/projects/poetry/:slug", next: "/writing/poetry/:slug" },
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
  { old: "/poetry", next: "/writing/poetry" },
  { old: "/poetry/:slug", next: "/writing/poetry/:slug" },
  { old: "/photography", next: "/about" },
  { old: "/photography/:slug", next: "/about" },
  // The earlier five-room layout and the interim Events pages moved into the six-place menu.
  { old: "/product", next: "/work" },
  { old: "/creator", next: "/work" },
  { old: "/creator/crew", next: "/work/crew-brand" },
  { old: "/creator/poetry", next: "/writing/poetry" },
  { old: "/creator/poetry/:slug", next: "/writing/poetry/:slug" },
  { old: "/creator/blog", next: "/writing" },
  { old: "/performer", next: "/events/theater" },
  { old: "/entrepreneur", next: "/work" },
  { old: "/activist", next: "/community" },
  { old: "/story", next: "/about/pre-college" },
  { old: "/beliefs", next: "/about" },
  { old: "/events/crew", next: "/work/crew-brand" },
  { old: "/events/backlocal", next: "/work/backlocal" },
  { old: "/events/intro", next: "/work/intro" },
  { old: "/events/bridger", next: "/work/bridger" },
  { old: "/events/handmade", next: "/about/handmade" },
  { old: "/events/chatbot", next: "/work/ai-chatbot" },
  { old: "/events/poetry", next: "/writing/poetry" },
  { old: "/events/poetry/:slug", next: "/writing/poetry/:slug" },
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
