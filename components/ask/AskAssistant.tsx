// ============================================
// WHAT THIS FILE DOES (plain English):
// This is the Ask about me chat when the AI model is switched on.
// A visitor can ask anything about Brant. The question goes to the
// server at /api/chatbot, which answers only from the public notes,
// and the answer streams in word by word. If the model cannot answer
// (no budget left, a network problem, a model error), the same
// question is answered from the public notes with no model, so the
// visitor always gets a reply. Nothing private is loaded in the browser.
// ============================================

"use client";

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { useEffect, useRef, useState } from "react";
import { AskSuggestions } from "@/components/ask/AskSuggestions";
import { MessageContent } from "@/components/chatbot/MessageContent";
import { Button } from "@/components/ui/Button";
import { PRESET_QUESTIONS } from "@/lib/ai/answer-question";

function textOf(parts: { type: string; text?: string }[]): string {
  return parts
    .filter((part) => part.type === "text" && typeof part.text === "string")
    .map((part) => part.text as string)
    .join("");
}

export function AskAssistant() {
  const { messages, sendMessage, status, error } = useChat({
    transport: new DefaultChatTransport({ api: "/api/chatbot" }),
  });
  const [input, setInput] = useState("");
  const [fallbacks, setFallbacks] = useState<Record<string, string>>({});
  const endRef = useRef<HTMLLIElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const busy = status === "submitted" || status === "streaming";

  // When the model cannot answer, answer the last question from the public notes instead.
  useEffect(() => {
    if (!error) return;
    const users = messages.filter((message) => message.role === "user");
    const last = users[users.length - 1];
    if (!last || fallbacks[last.id] !== undefined) return;
    const question = textOf(last.parts);
    const earlier = users.slice(0, -1).map((message) => textOf(message.parts));
    setFallbacks((current) => ({ ...current, [last.id]: "" }));
    fetch("/api/ask", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question, earlier }),
    })
      .then((response) => response.json() as Promise<{ answer?: string; error?: string }>)
      .then((body) =>
        setFallbacks((current) => ({
          ...current,
          [last.id]: body.answer ?? body.error ?? "That question did not go through. Try again.",
        }))
      )
      .catch(() =>
        setFallbacks((current) => ({ ...current, [last.id]: "That question did not go through. Try again." }))
      );
  }, [error, messages, fallbacks]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ block: "nearest" });
  }, [messages, fallbacks, busy]);

  const ask = (question: string) => {
    const trimmed = question.trim();
    if (!trimmed || busy) return;
    sendMessage({ text: trimmed });
    setInput("");
  };

  // A suggestion only fills the box. The visitor presses Send.
  const pick = (question: string) => {
    setInput(question);
    inputRef.current?.focus();
  };

  return (
    <div className="shell pb-24">
      <div className="flex flex-col gap-8 rounded-[18px] border border-border-subtle bg-surface px-5 py-6 shadow-glass md:px-8 md:py-8">
      <ol className="flex min-h-[8rem] flex-col gap-5" aria-live="polite">
        {messages.length === 0 && (
          <li className="max-w-[40rem] text-body text-text-secondary">
            Ask a question. Answers come from my public notes. If a fact is not there, it should say so.
          </li>
        )}
        {messages.map((message, index) => {
          const isUser = message.role === "user";
          const text = textOf(message.parts);
          const next = messages[index + 1];
          const needsFallback = isUser && fallbacks[message.id] !== undefined && next?.role !== "assistant";
          return (
            <li key={message.id} className="flex flex-col gap-5">
              <div
                aria-label={isUser ? "You" : "Answer"}
                className={isUser ? "flex justify-end" : "flex justify-start"}
              >
                {isUser ? (
                  <p className="max-w-[36rem] rounded-[18px] bg-ink px-4 py-3 text-body text-on-hero">{text}</p>
                ) : text ? (
                  <div className="max-w-[40rem] text-body text-text-secondary">
                    <MessageContent text={text} />
                  </div>
                ) : null}
              </div>
              {needsFallback && fallbacks[message.id] ? (
                <p aria-label="Answer" className="max-w-[40rem] text-body text-text-secondary">
                  {fallbacks[message.id]}
                </p>
              ) : null}
            </li>
          );
        })}
        {status === "submitted" && (
          <li className="text-text-secondary" aria-label="Thinking">
            <span className="inline-flex gap-1">
              <span className="h-2 w-2 animate-bounce rounded-full bg-text-secondary" />
              <span className="h-2 w-2 animate-bounce rounded-full bg-text-secondary [animation-delay:0.15s]" />
              <span className="h-2 w-2 animate-bounce rounded-full bg-text-secondary [animation-delay:0.3s]" />
            </span>
          </li>
        )}
        <li ref={endRef} aria-hidden="true" />
      </ol>

      <AskSuggestions questions={PRESET_QUESTIONS} disabled={busy} onPick={pick} />

      <form
        onSubmit={(event) => {
          event.preventDefault();
          ask(input);
        }}
        className="flex flex-col gap-3 sm:flex-row sm:items-center"
      >
        <label className="sr-only" htmlFor="ask-question">
          Your question
        </label>
        <input
          id="ask-question"
          ref={inputRef}
          value={input}
          onChange={(event) => setInput(event.target.value)}
          className="min-h-[52px] flex-1 rounded-[18px] border border-border-subtle bg-bg px-4 text-body text-ink outline-none"
        />
        <Button type="submit" track="button:send_question:ask" ariaLabel="Send question" className="min-h-[52px] px-8">
          {busy ? "Sending" : "Send"}
        </Button>
      </form>
      </div>
    </div>
  );
}
