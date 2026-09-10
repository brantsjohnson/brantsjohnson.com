// ============================================
// WHAT THIS FILE DOES (plain English):
// This is a helper server door for CRM (customer / lead) tools.
// Later it can retry sending a lead if the first try failed.
// The real connectors live under lib/integrations.
// ============================================

import { NextResponse } from "next/server";

// THIS SECTION DOES: reply that CRM connectors are not wired up yet (HTTP 501)
export async function POST() {
  return NextResponse.json(
    {
      ok: false,
      message: "CRM route scaffolded. Connectors not wired yet.",
    },
    { status: 501 }
  );
}
