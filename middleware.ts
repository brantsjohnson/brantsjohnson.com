// ============================================
// WHAT THIS FILE DOES (plain English):
// Edge middleware runs before pages load. It handles referral links:
// /from/ig sends people to home and remembers the social variant.
// ?src= or ?utm_source= on any marketing URL also sets that memory.
// Admin routes are unchanged for now (auth checks come later).
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

// THIS SECTION DOES: write variant cookies on the response
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

// THIS SECTION DOES: route requests and set referral state when needed
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // --- REFERRAL: /from/threads style paths land on home with the right variant ---
  const pathSource = referralSourceFromPathname(pathname);
  if (pathSource) {
    const url = request.nextUrl.clone();
    url.pathname = "/";
    url.search = "";
    const response = NextResponse.redirect(url);
    applyReferralCookies(response, pathSource);
    return response;
  }

  const querySource = referralSourceFromSearchParams(request.nextUrl.searchParams);
  if (querySource) {
    const response = NextResponse.next();
    applyReferralCookies(response, querySource);
    return response;
  }

  // --- SECURITY: admin auth checks will live here later ---
  return NextResponse.next();
}

// THIS SECTION DOES: run on marketing and admin paths, skip static assets
export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)",
  ],
};
