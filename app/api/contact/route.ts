// ============================================
// WHAT THIS FILE DOES (plain English):
// This is the server door for the contact form.
// Later it will check the message, save it, and optionally tell
// your CRM. Right now it only exists as a placeholder.
// ============================================

import { NextResponse } from "next/server";

// THIS SECTION DOES: reply that contact saving is not wired up yet (HTTP 501)
export async function POST() {
  return NextResponse.json(
    {
      ok: false,
      message: "Contact route scaffolded. Persistence and CRM not wired yet.",
    },
    { status: 501 }
  );
}
