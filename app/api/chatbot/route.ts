// ============================================
// WHAT THIS FILE DOES (plain English):
// This is the server door for the website chatbot.
// A visitor's question comes here. Later this file will look up
// helpful notes and ask the AI model. Private notes never leave
// the server; only the answer goes back to the browser.
// ============================================

import { NextResponse } from "next/server";

// --- PRIVACY: this route will keep private knowledge on the server only ---
// THIS SECTION DOES: reply with a friendly, honest message until retrieval and the model are wired up
// The answer is written in Brant's voice and follows the no-dashes copy rule in docs/03.
export async function POST() {
  return NextResponse.json(
    {
      ok: false,
      answer:
        "BrantChat is almost ready. The answers are not switched on yet. In the meantime, take a look at Experience, Service, Leadership, and Skills.",
    },
    { status: 200 }
  );
}
