// ============================================
// WHAT THIS FILE DOES (plain English):
// This runs before pages load (edge middleware). Its one job right now is
// the BrantChat subdomain alias: if someone lands on the historical host
// brantchat.brantsjohnson.com, we quietly show them the /chat page instead
// of the marketing home. This does NOT change DNS and does nothing until
// that subdomain is pointed at this site (handled separately by CoS).
// Requests to the normal site are passed through unchanged.
// ============================================

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// THIS SECTION DOES: send the brantchat subdomain's home to the chat page.
// We only touch the root path ("/"); everything else (including /chat itself,
// the API, and assets) passes through so the site keeps working normally.
export function middleware(request: NextRequest) {
  const host = request.headers.get("host") ?? "";
  const isBrantChatHost = host.startsWith("brantchat.");

  if (isBrantChatHost && request.nextUrl.pathname === "/") {
    const url = request.nextUrl.clone();
    url.pathname = "/chat";
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}

// THIS SECTION DOES: run this middleware on normal pages, but skip Next's
// internal files, the API, and static assets so nothing slows down or breaks
export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\..*|api).*)"],
};
