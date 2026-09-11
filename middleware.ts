// ============================================
// WHAT THIS FILE DOES (plain English):
// Edge middleware runs before pages load. It handles referral links
// (/from/ig and query params), and rewrites the BrantChat subdomain
// root to the in-site /chat page when that host points here.
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

  if (isBrantChatHost && request.nextUrl.pathname === "/") {
    const url = request.nextUrl.clone();
    url.pathname = "/chat";
    return NextResponse.rewrite(url);
  }

  const { pathname } = request.nextUrl;

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

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)",
  ],
};
