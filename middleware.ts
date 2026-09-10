// ============================================
// WHAT THIS FILE DOES (plain English):
// This runs before certain pages load (edge middleware).
// Later it will check admin sign-in and help redirect old Wix
// URLs. Right now it does nothing on purpose.
// ============================================

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// --- SECURITY: admin auth checks will live here later ---
// THIS SECTION DOES: let the request continue unchanged for now
export function middleware(_request: NextRequest) {
  return NextResponse.next();
}

// THIS SECTION DOES: only run this file on admin URLs for now
export const config = {
  matcher: ["/admin/:path*"],
};
