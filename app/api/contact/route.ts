// ============================================
// WHAT THIS FILE DOES (plain English):
// This is the server door for every public form: contact, the /hi
// follow-up, and the newsletter signup. It checks the fields, ignores
// hidden spam traps, slows repeat sends, and then delivers the note.
// ============================================

import { NextResponse } from "next/server";
import { z } from "zod";
import { deliverNote } from "@/lib/forms/deliver-note";
import { getClientIp, rateLimit } from "@/lib/utils/rate-limit";

export const runtime = "nodejs";

// THIS SECTION DOES: describe the three forms. Empty strings are allowed
// on optional fields so a blank box does not fail the whole note.
const noteSchema = z
  .object({
    kind: z.enum(["contact", "hi", "newsletter"]),
    name: z.string().trim().min(1, "Add your name.").max(120),
    email: z.string().trim().max(200).optional().or(z.literal("")),
    phone: z.string().trim().max(40).optional().or(z.literal("")),
    message: z.string().trim().max(2000).optional().or(z.literal("")),
    metAt: z.string().trim().max(120).optional().or(z.literal("")),
    website: z.string().optional(), // honeypot. People never see this field.
  })
  .superRefine((value, ctx) => {
    const email = value.email?.trim() ?? "";
    const phone = value.phone?.trim() ?? "";
    const message = value.message?.trim() ?? "";
    if (email && !z.string().email().safeParse(email).success) {
      ctx.addIssue({ code: "custom", path: ["email"], message: "That email looks off." });
    }
    if (value.kind === "contact") {
      if (!email) ctx.addIssue({ code: "custom", path: ["email"], message: "Add your email." });
      if (message.length < 2) {
        ctx.addIssue({ code: "custom", path: ["message"], message: "Add a short note." });
      }
    }
    if (value.kind === "newsletter" && !email) {
      ctx.addIssue({ code: "custom", path: ["email"], message: "Add your email." });
    }
    if (value.kind === "hi" && !email && !phone) {
      ctx.addIssue({
        code: "custom",
        path: ["email"],
        message: "Add an email or a phone number.",
      });
    }
    if (value.kind === "hi" && message.length < 2) {
      ctx.addIssue({
        code: "custom",
        path: ["message"],
        message: "Add a line about what you are working on.",
      });
    }
  });

export async function POST(request: Request) {
  const ip = getClientIp(request);
  const limit = rateLimit(`note:${ip}`, 5, 10 * 60_000);
  if (!limit.allowed) {
    return NextResponse.json(
      { ok: false, error: "Too many notes. Wait a few minutes and try again." },
      { status: 429 }
    );
  }

  let json: unknown;
  try {
    json = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "That note could not be read." }, { status: 400 });
  }

  const parsed = noteSchema.safeParse(json);
  if (!parsed.success) {
    const message = parsed.error.issues[0]?.message ?? "Check the form and try again.";
    return NextResponse.json({ ok: false, error: message }, { status: 400 });
  }

  // --- SECURITY: a filled honeypot is a bot. Pretend it worked and drop the note. ---
  if (parsed.data.website && parsed.data.website.trim().length > 0) {
    return NextResponse.json({ ok: true, delivery: "dropped" });
  }

  const data = parsed.data;
  const message =
    data.kind === "newsletter"
      ? data.message?.trim() || "Please send the newsletter."
      : (data.message ?? "").trim();

  const delivery = await deliverNote({
    kind: data.kind,
    name: data.name.trim(),
    email: data.email?.trim() || undefined,
    phone: data.phone?.trim() || undefined,
    message,
    metAt: data.metAt?.trim() || undefined,
  });

  if (!delivery.ok) {
    return NextResponse.json({ ok: false, error: delivery.error }, { status: 502 });
  }

  return NextResponse.json(delivery);
}
