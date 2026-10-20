// ============================================
// WHAT THIS FILE DOES (plain English):
// This delivers a note from the contact form, the /hi follow-up form,
// or the newsletter signup. If a CRM webhook is configured, it posts
// the note there. If not, it builds a mailto link so the visitor's
// own email app sends the note to Brant. Either way the form finishes
// with a real delivery path. It does not pretend a CRM row was created
// when no webhook is set.
// ============================================

import "server-only";

// THIS SECTION DOES: describe a note after it has already been checked
export type Note = {
  kind: "contact" | "hi" | "newsletter";
  name: string;
  email?: string;
  phone?: string;
  message: string;
  metAt?: string;
};

export type Delivery =
  | { ok: true; delivery: "webhook" }
  | { ok: true; delivery: "mailto"; href: string }
  | { ok: false; error: string };

// THIS SECTION DOES: pick the webhook if Brant has set one. Intro's capture
// URL wins when present. CRM_WEBHOOK_URL is the older name from .env.example.
function webhookUrl(): string | undefined {
  const intro = process.env.INTRO_CRM_CAPTURE_URL?.trim();
  const crm = process.env.CRM_WEBHOOK_URL?.trim();
  return intro || crm || undefined;
}

// THIS SECTION DOES: build a mailto link that carries the note in the body
function mailtoHref(note: Note): string {
  const subject =
    note.kind === "hi"
      ? "Follow up from brantsjohnson.com/hi"
      : note.kind === "newsletter"
        ? "Newsletter signup from brantsjohnson.com"
        : "Note from brantsjohnson.com";
  const lines = [
    `Name: ${note.name}`,
    note.email ? `Email: ${note.email}` : "",
    note.phone ? `Phone: ${note.phone}` : "",
    note.metAt ? `Where we met: ${note.metAt}` : "",
    "",
    note.message,
  ].filter((line) => line !== "");
  const params = new URLSearchParams({
    subject,
    body: lines.join("\n"),
  });
  return `mailto:me@brantsjohnson.com?${params.toString()}`;
}

// THIS SECTION DOES: send the note, preferring the webhook when it is configured
export async function deliverNote(note: Note): Promise<Delivery> {
  const url = webhookUrl();
  if (!url) {
    return { ok: true, delivery: "mailto", href: mailtoHref(note) };
  }

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: note.name,
        email: note.email ?? "",
        phone: note.phone ?? "",
        message: note.message,
        met_at: note.metAt ?? "",
        source_tool: note.kind === "hi" ? "landing" : note.kind,
        topic: note.kind,
      }),
    });
    if (!response.ok) {
      return { ok: true, delivery: "mailto", href: mailtoHref(note) };
    }
    return { ok: true, delivery: "webhook" };
  } catch {
    return { ok: true, delivery: "mailto", href: mailtoHref(note) };
  }
}
