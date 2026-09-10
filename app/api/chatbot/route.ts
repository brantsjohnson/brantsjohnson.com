// ============================================
// WHAT THIS FILE DOES (plain English):
// This is the server door for the website chatbot.
// A visitor's question comes here. Later this file will look up
// helpful notes and ask the AI model. Private notes never leave
// the server; only the answer goes back to the browser.
// ============================================

import { NextResponse } from "next/server";

// --- PRIVACY: this route will keep private knowledge on the server only ---
// THIS SECTION DOES: reply that the chatbot is not wired up yet (HTTP 501)
export async function POST() {
  return NextResponse.json(
    {
      ok: false,
      message: "Chatbot route scaffolded. Retrieval and model calls not wired yet.",
    },
    { status: 501 }
  );
}
