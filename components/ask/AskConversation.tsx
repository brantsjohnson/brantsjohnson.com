// ============================================
// WHAT THIS FILE DOES (plain English):
// This is the Ask conversation. Messages stay on the page as a thread.
// Four suggested questions sit under the thread as chips.
// A follow-up is sent with the earlier questions, so the answer
// can add the next fact without starting over.
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
    <div className="shell flex flex-col gap-8 py-8 pb-20">
      <ol className="flex min-h-[8rem] flex-col gap-4" aria-live="polite">
        {turns.length === 0 && (
          <li className="max-w-[40rem] text-body text-text-secondary">
            Ask a question. Answers come from the public notes, and a follow-up can add the next fact.
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
                  ? "max-w-[36rem] rounded-panel bg-ink px-4 py-3 text-body text-on-hero"
                  : "max-w-[40rem] text-body text-text-secondary"
              }
            >
              {turn.text}
            </p>
          </li>
        ))}
      </ol>

      <div className="flex flex-wrap gap-2" aria-label="Suggested questions">
        {PRESET_QUESTIONS.map((question) => (
          <button
            key={question}
            type="button"
            disabled={busy}
            onClick={() => void ask(question)}
            className="inline-flex min-h-[44px] items-center rounded-full border border-border-subtle px-4 text-left text-body text-ink disabled:opacity-50"
            data-track="button:preset_question:ask"
          >
            {question}
          </button>
        ))}
      </div>

      <form
        onSubmit={(event) => {
          event.preventDefault();
          void ask(input);
        }}
        className="flex items-center gap-3"
      >
        <input
          value={input}
          onChange={(event) => setInput(event.target.value)}
          aria-label="Ask a question about Brant"
          className="min-h-[44px] flex-1 border-b border-ink bg-transparent text-body text-ink outline-none"
        />
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
