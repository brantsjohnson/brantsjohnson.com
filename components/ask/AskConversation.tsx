// ============================================
// WHAT THIS FILE DOES (plain English):
// This is the Ask conversation. Messages stay on the page as a thread.
// Four suggested questions sit under the thread as chips.
// A follow-up is sent with the earlier questions, so the answer
// can add the next fact without starting over.
// ============================================

"use client";

import { useRef, useState } from "react";
import { AskSuggestions } from "@/components/ask/AskSuggestions";
import { PRESET_QUESTIONS } from "@/lib/ai/answer-question";
import { Button } from "@/components/ui/Button";

type Turn = { role: "user" | "assistant"; text: string };

export function AskConversation() {
  const [turns, setTurns] = useState<Turn[]>([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

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

  // A suggestion only fills the box. The visitor presses Send.
  function pick(question: string) {
    setInput(question);
    inputRef.current?.focus();
  }

  return (
    <div className="shell pb-20">
      <div className="flex flex-col gap-8 rounded-[18px] border border-border-subtle bg-surface px-5 py-6 shadow-glass md:px-8 md:py-8">
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
                  ? "max-w-[36rem] rounded-[18px] bg-ink px-4 py-3 text-body text-on-hero"
                  : "max-w-[40rem] text-body text-text-secondary"
              }
            >
              {turn.text}
            </p>
          </li>
        ))}
      </ol>

      <AskSuggestions questions={PRESET_QUESTIONS} disabled={busy} onPick={pick} />

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
          ref={inputRef}
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
