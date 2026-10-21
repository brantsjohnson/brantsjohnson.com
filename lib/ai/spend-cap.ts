// ============================================
// WHAT THIS FILE DOES (plain English):
// This keeps the public AI chat under a monthly dollar cap. Each
// answer reserves a small estimated cost before the model is called.
// The count lives in this server process, so it resets on restart and
// is not shared across separate serverless copies. It is a real brake,
// not a global ledger. The default cap is 5 dollars.
// ============================================

// THIS SECTION DOES: remember spend for the current calendar month in this process
let monthKey = "";
let spentUsd = 0;

// A conservative reserve per answer so a busy day cannot run past the cap unnoticed.
const RESERVE_USD = 0.02;

function currentMonth(): string {
  return new Date().toISOString().slice(0, 7); // YYYY-MM
}

function capUsd(): number {
  const raw = Number(process.env.CHAT_MONTHLY_USD ?? "5");
  return Number.isFinite(raw) && raw > 0 ? raw : 5;
}

// THIS SECTION DOES: allow the next answer only if the reserve still fits under the cap
export function reserveChatSpend(): { ok: true } | { ok: false; error: string } {
  const month = currentMonth();
  if (month !== monthKey) {
    monthKey = month;
    spentUsd = 0;
  }
  if (spentUsd + RESERVE_USD > capUsd()) {
    return {
      ok: false,
      error: "The monthly chat budget is used up. Reach Brant from the Contact page.",
    };
  }
  spentUsd += RESERVE_USD;
  return { ok: true };
}
