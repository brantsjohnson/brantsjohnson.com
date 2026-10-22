// ============================================
// WHAT THIS FILE DOES (plain English):
// This is the Ask about me conversation that does not need an AI key.
// It sends the question to /api/ask and shows the sentences that came
// back from the checked public notes. It is a real conversation, not
// a "not set up" dead end.
// ============================================

"use client";

import { useState } from "react";

const SUGGESTIONS = [
  "What is Brant building now?",
  "Where did Brant go to school?",
  "What did Brant do at Crew?",
  "How do I reach Brant?",
];

type Turn = { role: "user" | "assistant"; text: string };

export function LocalAsk() {
  const [turns, setTurns] = useState<Turn[]>([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function ask(question: string) {
    const trimmed = question.trim();
    if (!trimmed || busy) return;
    const earlier = turns.filter((turn) => turn.role === "user").map((turn) => turn.text);
    setBusy(true);
    setError("");
    setInput("");
    setTurns((current) => [...current, { role: "user", text: trimmed }]);
    try {
      const response = await fetch("/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: trimmed, earlier }),
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
    <div className="mx-auto flex h-full w-full max-w-3xl flex-col">
      <div className="flex-1 space-y-4 overflow-y-auto px-4 py-6">
        {turns.length === 0 && (
          <div className="mx-auto max-w-xl pt-6 text-center">
            <h2 className="font-serif text-h2 text-ink">Ask about me</h2>
            <p className="mt-3 text-body text-text-secondary">
              Answers come from the public notes on this site. If a fact is not there, it will say so.
            </p>
            <div className="mt-6 flex flex-col gap-2">
              {SUGGESTIONS.map((suggestion) => (
                <button
                  key={suggestion}
                  type="button"
                  onClick={() => ask(suggestion)}
                  data-track="button:ask_suggestion:chat"
                  className="rounded-panel border border-border-subtle px-4 py-3 text-left text-body text-ink hover:border-ink"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        )}
        {turns.map((turn, index) => (
          <div key={`${turn.role}-${index}`} className={turn.role === "user" ? "flex justify-end" : "flex justify-start"}>
            <p
              className={
                turn.role === "user"
                  ? "max-w-[85%] rounded-panel bg-accent px-4 py-3 text-body text-ink"
                  : "max-w-[85%] whitespace-pre-wrap rounded-panel border border-border-subtle bg-surface px-4 py-3 text-body text-ink"
              }
            >
              {turn.text}
            </p>
          </div>
        ))}
        {busy && <p className="text-caption text-text-secondary">Looking through the notes.</p>}
        {error && (
          <p role="alert" className="text-body text-ink">
            {error}
          </p>
        )}
      </div>
      <form
        className="flex gap-2 border-t border-border-subtle p-3"
        onSubmit={(event) => {
          event.preventDefault();
          void ask(input);
        }}
      >
        <label className="sr-only" htmlFor="ask-input">
          Your question
        </label>
        <input
          id="ask-input"
          value={input}
          onChange={(event) => setInput(event.target.value)}
          data-track="form_field:question:chat"
          className="min-h-[44px] flex-1 rounded-control border border-border-subtle px-4 text-body text-ink"
        />
        <button
          type="submit"
          data-track="button:send_question:chat"
          className="min-h-[44px] rounded-control bg-accent px-4 font-semibold text-ink"
        >
          Send
        </button>
      </form>
    </div>
  );
}
