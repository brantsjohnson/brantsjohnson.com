// ============================================
// WHAT THIS FILE DOES (plain English):
// This is the Next.js settings file for the public site.
// It also holds the "forwarding address" list: when someone visits
// an old Wix web address, we send them to the matching new page here
// so old links and Google search results still work after we move.
// BrantChat stays a separate folder for now and is kept out of
// this build until we wire it in.
// ============================================

// --- THIS SECTION DOES: list every old Wix address and the new page it should go to ---
// Left side = the old Wix path. Right side = the new page on this site.
// We only list the exact pages below. We do NOT send unknown/old pages
// to the home page, so nothing gets swept up by accident.
// Note: "/" (home) already maps to "/", so we skip it (it would do nothing).
const wixToNextRedirects = [
  { old: "/blank-2", next: "/experience" }, // old Wix "blank-2" is now the Experience page
  { old: "/blank-1", next: "/service" }, // old Wix "blank-1" is now the Service page
  { old: "/blank-3", next: "/leadership" }, // old Wix "blank-3" is now the Leadership page
  { old: "/blank-4", next: "/skills" }, // old Wix "blank-4" is now the Skills page
  { old: "/about-1", next: "/about" }, // old Wix "about-1" is now the About page
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // THIS SECTION DOES: turn the list above into real 301 (permanent) redirects.
  // A 301 tells browsers and Google "this page moved for good", which keeps
  // the old page's search ranking and passes it to the new page.
  //
  // Why "statusCode: 301" and not "permanent: true"?
  // In Next.js, "permanent: true" actually sends a 308 code (a newer kind of
  // permanent redirect). The migration plan asks specifically for a classic
  // 301, so we set the code directly. Both are permanent and both keep SEO
  // value; we just use the exact 301 that was requested.
  //
  // Trailing slashes (the "/" at the end of an address) are handled for us:
  // Next.js is set to no-trailing-slash by default, so a visit to "/about-1/"
  // is first cleaned up to "/about-1", which then hits the 301 below. That is
  // why we only list the clean paths here and do not repeat a "/"-ended copy.
  async redirects() {
    return wixToNextRedirects.map(({ old, next }) => ({
      source: old, // the old Wix path, e.g. /about-1
      destination: next, // the new page, e.g. /about
      statusCode: 301, // classic "moved permanently" (kept for SEO)
    }));
  },

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
