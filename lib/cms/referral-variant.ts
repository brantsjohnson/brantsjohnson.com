// ============================================
// WHAT THIS FILE DOES (plain English):
// This file decides which "flavor" of the home page a visitor sees
// based on how they arrived (a ?src= link, utm_source, or /from/ig
// style path). It maps those signals to one of three variants:
// default (people-first founder PM), social (no AI jargon), or
// linkedin_x (AI and agentic craft for professional networks).
//
// The same Next.js app serves every variant. Only the hero copy and
// focus lines change. ChatGPT and Claude traffic always uses default.
// ============================================

import { referralVariantContent, type ReferralVariantId } from "@/content/referral-variants";

// THIS SECTION DOES: name the cookie that remembers the variant for this browser session
export const REFERRAL_VARIANT_COOKIE = "bj_referral_variant";
export const REFERRAL_SOURCE_COOKIE = "bj_referral_source";

// THIS SECTION DOES: how long we remember a referral variant (30 days, renewed on each qualifying visit)
export const REFERRAL_COOKIE_MAX_AGE_SECONDS = 60 * 60 * 24 * 30;

// Social platforms: copy must not use AI, agentic, or LLM language (enforced in content file).
const SOCIAL_SOURCES = new Set(["ig", "instagram", "threads", "tiktok", "substack"]);

// LinkedIn and X: show the professional AI-forward variant.
const LINKEDIN_X_SOURCES = new Set(["linkedin", "x", "twitter"]);

// AI assistants in links: treat like organic/default positioning.
const DEFAULT_ONLY_SOURCES = new Set([
  "chatgpt",
  "claude",
  "openai",
  "anthropic",
  "perplexity",
  "gemini",
]);

// THIS SECTION DOES: normalize messy source strings from query params or paths
export function normalizeReferralSource(raw: string | null | undefined): string | null {
  if (!raw) return null;
  let value = raw.trim().toLowerCase();
  if (!value) return null;

  // Drop URL noise like "linkedin.com" or "www.instagram.com"
  value = value.replace(/^www\./, "");
  const hostPart = value.split("/")[0];
  value = hostPart.split(".")[0];

  if (value.startsWith("@")) {
    value = value.slice(1);
  }

  const aliases: Record<string, string> = {
    instagram: "ig",
    twitter: "x",
  };

  return aliases[value] ?? value;
}

// THIS SECTION DOES: pick the variant id from a normalized source slug
export function resolveReferralVariantFromSource(source: string | null): ReferralVariantId {
  if (!source) return "default";
  if (DEFAULT_ONLY_SOURCES.has(source)) return "default";
  if (SOCIAL_SOURCES.has(source)) return "social";
  if (LINKEDIN_X_SOURCES.has(source)) return "linkedin_x";
  return "default";
}

// THIS SECTION DOES: read src or utm_source from a URL search string
export function referralSourceFromSearchParams(
  searchParams: URLSearchParams | Readonly<Record<string, string | string[] | undefined>>
): string | null {
  if (searchParams instanceof URLSearchParams) {
    const raw = searchParams.get("src") ?? searchParams.get("utm_source");
    return normalizeReferralSource(raw);
  }

  const pick = (key: string): string | null => {
    const value = searchParams[key];
    if (typeof value === "string") return value;
    if (Array.isArray(value) && value[0]) return value[0];
    return null;
  };

  const raw = pick("src") ?? pick("utm_source");
  return normalizeReferralSource(raw);
}

// THIS SECTION DOES: parse /from/threads into "threads"
export function referralSourceFromPathname(pathname: string): string | null {
  const match = pathname.match(/^\/from\/([^/]+)\/?$/);
  if (!match) return null;
  return normalizeReferralSource(match[1]);
}

// THIS SECTION DOES: turn a cookie value into a safe variant id
export function parseReferralVariantCookie(value: string | undefined): ReferralVariantId {
  if (value === "social" || value === "linkedin_x" || value === "default") {
    return value;
  }
  return "default";
}

// THIS SECTION DOES: bundle hero copy for a variant id
export function getReferralVariantContent(variantId: ReferralVariantId) {
  return referralVariantContent[variantId];
}
