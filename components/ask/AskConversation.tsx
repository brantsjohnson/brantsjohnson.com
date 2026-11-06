// ============================================
// WHAT THIS FILE DOES (plain English):
// This is the Ask conversation. The thread stays on the page, and a
// copy is kept in this browser so a refresh does not wipe it.
// Each question is sent with that whole thread. The server uses it
// to find the closest notes, and to go deeper on the last answer.
// ============================================

"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";

type Turn = { role: "user" | "assistant"; text: string };

// The thread lives in this browser only. It is the conversation, not a login.
const THREAD_KEY = "bj-ask-thread";

function savedThread(): Turn[] {
  try {
    const raw = window.localStorage.getItem(THREAD_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed
      .filter((item): item is Turn => {
        if (!item || typeof item !== "object") return false;
        const turn = item as Turn;
        return (turn.role === "user" || turn.role === "assistant") && typeof turn.text === "string";
      })
      .slice(-20);
  } catch {
    return [];
  }
}

export function AskConversation() {
  const [turns, setTurns] = useState<Turn[]>([]);
  const [ready, setReady] = useState(false);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  // Read the saved thread once, after the page is in the browser.
  useEffect(() => {
    setTurns(savedThread());
    setReady(true);
  }, []);

  // Write the thread back so the next visit still knows what was asked.
  useEffect(() => {
    if (!ready) return;
    window.localStorage.setItem(THREAD_KEY, JSON.stringify(turns.slice(-20)));
  }, [turns, ready]);

  async function ask(question: string) {
    const trimmed = question.trim();
    if (!trimmed || busy) return;
    const thread = turns.slice(-16);
    setBusy(true);
    setError("");
    setInput("");
    setTurns((current) => [...current, { role: "user", text: trimmed }]);
    try {
      const response = await fetch("/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: trimmed, thread }),
      });
      const body = (await response.json()) as { answer?: string; error?: string };
      if (!response.ok || !body.answer) {
        setError(body.error ?? "That question did not go through. Try again.");
        return;
      }
      setTurns((current) => [...current, { role: "assistant", text: body.answer as string }]);
    } catch {
      setError("That question did not go through. Try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="shell pb-20">
      <div className="flex flex-col gap-8 rounded-[18px] border border-border-subtle bg-surface px-5 py-6 shadow-glass md:px-8 md:py-8">
      <ol className="flex min-h-[8rem] flex-col gap-4" aria-live="polite">
        {turns.length === 0 && (
          <li className="max-w-[40rem] text-body text-text-secondary">
            Ask any question about Brant.
          </li>
        )}
        {turns.map((turn, index) => (
          <li
            key={`${turn.role}-${index}`}
            aria-label={turn.role === "user" ? "You" : "Answer"}
            className={turn.role === "user" ? "flex justify-end" : "flex justify-start"}
          >
            <p
              className={
                turn.role === "user"
                  ? "max-w-[36rem] rounded-[18px] bg-ink px-4 py-3 text-body text-on-hero"
                  : "max-w-[40rem] text-body text-text-secondary"
              }
            >
              {turn.text}
            </p>
          </li>
        ))}
      </ol>

      {turns.length > 0 && (
        <button
          type="button"
          onClick={() => setTurns([])}
          data-track="button:clear_chat:ask"
          className="self-start text-caption text-text-secondary underline-offset-4 hover:underline"
        >
          Clear this chat
        </button>
      )}

      <form
        onSubmit={(event) => {
          event.preventDefault();
          void ask(input);
        }}
        className="flex flex-col gap-3 sm:flex-row sm:items-center"
      >
        <label className="sr-only" htmlFor="ask-notes-question">
          Your question
        </label>
        <input
          id="ask-notes-question"
          value={input}
          onChange={(event) => setInput(event.target.value)}
          className="min-h-[52px] flex-1 rounded-[18px] border border-border-subtle bg-bg px-4 text-body text-ink outline-none"
        />
        <Button type="submit" track="button:send_question:ask" ariaLabel="Send question" className="min-h-[52px] px-8">
          {busy ? "Sending" : "Send"}
        </Button>
      </form>
      {error && (
        <p role="alert" className="text-body text-ink">
          {error}
        </p>
      )}
      </div>
    </div>
  );
}
