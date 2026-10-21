// ============================================
// WHAT THIS FILE DOES (plain English):
// This is the full-page Ask conversation. A person asks one thing,
// gets a short answer, and can follow up. Suggested questions are
// the same ones the tests lock.
// ============================================

"use client";

import { useState } from "react";
import { PRESET_QUESTIONS } from "@/lib/ai/answer-question";
import { Button } from "@/components/ui/Button";

type Turn = { role: "user" | "assistant"; text: string };

export function AskConversation() {
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
    <div className="shell flex max-w-reading flex-col gap-8 py-10 pb-20">
      {turns.length === 0 && (
        <ul className="flex flex-col">
          {PRESET_QUESTIONS.map((question) => (
            <li key={question} className="border-t border-border-subtle">
              <button
                type="button"
                onClick={() => void ask(question)}
                className="inline-flex min-h-[44px] w-full items-center justify-between py-3 text-left text-body text-ink"
                data-track="button:preset_question:ask"
              >
                {question}
                <span aria-hidden="true" className="text-accent">
                  →
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}

      <ol className="flex flex-col gap-6">
        {turns.map((turn, index) => (
          <li key={`${turn.role}-${index}`} className={turn.role === "user" ? "text-ink" : "text-text-secondary"}>
            <p className="label text-text-secondary">{turn.role === "user" ? "You" : "Answer"}</p>
            <p className="mt-2 text-body">{turn.text}</p>
          </li>
        ))}
      </ol>

      <form
        onSubmit={(event) => {
          event.preventDefault();
          void ask(input);
        }}
        className="flex flex-col gap-4 sm:flex-row sm:items-end"
      >
        <label className="flex flex-1 flex-col gap-2">
          <span className="label text-text-secondary">Question</span>
          <input
            value={input}
            onChange={(event) => setInput(event.target.value)}
            aria-label="Ask a question about Brant"
            className="min-h-[44px] border-b border-ink bg-transparent text-body text-ink outline-none"
          />
        </label>
        <Button type="submit" track="button:send_question:ask" ariaLabel="Send question">
          {busy ? "Sending" : "Send"}
        </Button>
      </form>
      {error && (
        <p role="alert" className="text-body text-ink">
          {error}
        </p>
      )}
    </div>
  );
}
