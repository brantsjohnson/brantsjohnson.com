// ============================================
// WHAT THIS FILE DOES (plain English):
// This is the shared form for Contact, the /hi follow-up, and the
// newsletter signup. It checks the fields in the browser, posts them
// to /api/contact, and then either confirms a saved note or opens
// the visitor's email app with the note filled in. A hidden field
// catches simple spam bots.
// ============================================

"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";

type NoteKind = "contact" | "hi" | "newsletter";

type NoteFormProps = {
  kind: NoteKind;
  metAt?: string; // prefilled on /hi from the event link
  submitLabel: string;
  track: string;
};

type Status =
  | { state: "idle" }
  | { state: "sending" }
  | { state: "webhook" }
  | { state: "mailto" }
  | { state: "error"; message: string };

export function NoteForm({ kind, metAt = "", submitLabel, track }: NoteFormProps) {
  const [status, setStatus] = useState<Status>({ state: "idle" });

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    setStatus({ state: "sending" });

    const payload = {
      kind,
      name: String(data.get("name") ?? ""),
      email: String(data.get("email") ?? ""),
      phone: String(data.get("phone") ?? ""),
      message: String(data.get("message") ?? ""),
      metAt: String(data.get("metAt") ?? ""),
      website: String(data.get("website") ?? ""),
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const body = (await response.json()) as {
        ok?: boolean;
        error?: string;
        delivery?: string;
        href?: string;
      };
      if (!response.ok || !body.ok) {
        setStatus({ state: "error", message: body.error ?? "That note did not send. Try again." });
        return;
      }
      if (body.delivery === "mailto" && body.href) {
        window.location.href = body.href;
        setStatus({ state: "mailto" });
        return;
      }
      form.reset();
      setStatus({ state: "webhook" });
    } catch {
      setStatus({ state: "error", message: "That note did not send. Try again." });
    }
  }

  const showPhone = kind === "hi";
  const showMessage = kind !== "newsletter";
  const messageLabel = kind === "hi" ? "What you're working on (optional)" : "Message";

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-5" noValidate>
      <Field label="Name" name="name" autoComplete="name" track={`form_field:name:${kind}`} />
      <Field
        label="Email"
        name="email"
        type="email"
        autoComplete="email"
        required={kind !== "hi"}
        track={`form_field:email:${kind}`}
      />
      {showPhone && (
        <Field label="Phone (optional)" name="phone" type="tel" autoComplete="tel" track="form_field:phone:hi" />
      )}
      {kind === "hi" && (
        <Field
          label="Where we met (optional)"
          name="metAt"
          defaultValue={metAt}
          track="form_field:met_at:hi"
        />
      )}
      {showMessage && (
        <label className="flex flex-col gap-2 text-caption text-text-secondary">
          {messageLabel}
          <textarea
            name="message"
            required={kind !== "hi"}
            rows={kind === "hi" ? 3 : 5}
            data-track={`form_field:message:${kind}`}
            className="rounded-panel border border-border-subtle bg-surface px-4 py-3 text-body text-ink"
          />
        </label>
      )}
      {/* Honeypot. Hidden from people, tempting for bots. */}
      <div className="absolute left-[-9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
        <label>
          Website
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <div>
        <Button type="submit" track={track} ariaLabel={submitLabel}>
          {status.state === "sending" ? "Sending" : submitLabel}
        </Button>
      </div>
      {status.state === "error" && (
        <p role="alert" className="text-body text-ink">
          {status.message}
        </p>
      )}
      {status.state === "webhook" && (
        <p role="status" className="text-body text-ink">
          Sent. Brant will see it.
        </p>
      )}
      {status.state === "mailto" && (
        <p role="status" className="text-body text-ink">
          Your email app is opening with this note.
        </p>
      )}
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  autoComplete,
  required,
  defaultValue,
  track,
}: {
  label: string;
  name: string;
  type?: string;
  autoComplete?: string;
  required?: boolean;
  defaultValue?: string;
  track: string;
}) {
  return (
    <label className="flex flex-col gap-2 text-caption text-text-secondary">
      {label}
      <input
        name={name}
        type={type}
        required={required}
        autoComplete={autoComplete}
        defaultValue={defaultValue}
        data-track={track}
        className="min-h-[44px] rounded-panel border border-border-subtle bg-surface px-4 text-body text-ink"
      />
    </label>
  );
}
