// ============================================
// WHAT THIS FILE DOES (plain English):
// Edge middleware runs before pages load. It handles referral links
// (/from/ig and query params), remembers the homepage headline test
// in a first-party cookie, and sends the BrantChat subdomain to Ask.
// ============================================

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  REFERRAL_COOKIE_MAX_AGE_SECONDS,
  REFERRAL_SOURCE_COOKIE,
  REFERRAL_VARIANT_COOKIE,
  referralSourceFromPathname,
  referralSourceFromSearchParams,
  resolveReferralVariantFromSource,
} from "@/lib/cms/referral-variant";
import {
  HERO_EXPERIMENT_COOKIE,
  HERO_EXPERIMENT_HEADER,
  assignHeroExperimentId,
  parseHeroExperimentId,
  type HeroExperimentId,
} from "@/lib/hero-experiment";

const HERO_COOKIE_MAX_AGE_SECONDS = 60 * 60 * 24 * 180;

function heroVariantFor(request: NextRequest): { id: HeroExperimentId; remember: boolean } {
  const preview = parseHeroExperimentId(request.nextUrl.searchParams.get("hero"));
  if (preview) return { id: preview, remember: false };
  const existing = parseHeroExperimentId(request.cookies.get(HERO_EXPERIMENT_COOKIE)?.value);
  if (existing) return { id: existing, remember: false };
  return { id: assignHeroExperimentId(), remember: true };
}

function rememberHero(response: NextResponse, request: NextRequest, id: HeroExperimentId, remember: boolean) {
  if (!remember) return;
  response.cookies.set(HERO_EXPERIMENT_COOKIE, id, {
    path: "/",
    maxAge: HERO_COOKIE_MAX_AGE_SECONDS,
    sameSite: "lax",
    secure: request.nextUrl.protocol === "https:",
  });
}

function nextWithHero(request: NextRequest) {
  const hero = heroVariantFor(request);
  const headers = new Headers(request.headers);
  headers.set(HERO_EXPERIMENT_HEADER, hero.id);
  const response = NextResponse.next({ request: { headers } });
  rememberHero(response, request, hero.id, hero.remember);
  return response;
}

function applyReferralCookies(response: NextResponse, source: string) {
  const variant = resolveReferralVariantFromSource(source);
  response.cookies.set(REFERRAL_VARIANT_COOKIE, variant, {
    path: "/",
    maxAge: REFERRAL_COOKIE_MAX_AGE_SECONDS,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });
  response.cookies.set(REFERRAL_SOURCE_COOKIE, source, {
    path: "/",
    maxAge: REFERRAL_COOKIE_MAX_AGE_SECONDS,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });
}

export function middleware(request: NextRequest) {
  const host = request.headers.get("host") ?? "";
  const isBrantChatHost = host.startsWith("brantchat.");

  // The old chat subdomain now opens Ask about me on the public site.
  if (isBrantChatHost && request.nextUrl.pathname === "/") {
    const canonical = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.brantsjohnson.com";
    const response = NextResponse.redirect(`${canonical}/ask`, 301);
    const hero = heroVariantFor(request);
    rememberHero(response, request, hero.id, hero.remember);
    return response;
  }

  const { pathname } = request.nextUrl;

  const pathSource = referralSourceFromPathname(pathname);
  if (pathSource) {
    const url = request.nextUrl.clone();
    url.pathname = "/";
    url.search = "";
    const response = NextResponse.redirect(url);
    applyReferralCookies(response, pathSource);
    const hero = heroVariantFor(request);
    rememberHero(response, request, hero.id, hero.remember);
    return response;
  }

  const querySource = referralSourceFromSearchParams(request.nextUrl.searchParams);
  if (querySource) {
    const response = nextWithHero(request);
    applyReferralCookies(response, querySource);
    return response;
  }

  return nextWithHero(request);
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)",
  ],
};
