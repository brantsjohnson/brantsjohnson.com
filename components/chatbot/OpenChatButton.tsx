// ============================================
// WHAT THIS FILE DOES (plain English):
// This is a button that opens the BrantChat panel when clicked. It
// is used anywhere on the site that wants to invite someone to ask
// a question (the home hero, project cards, and so on). It reuses
// the shared Button look, so it matches every other button.
// ============================================

"use client";

import type { ReactNode } from "react";
import { Button } from "@/components/ui/Button";
import { openBrantChat } from "@/components/chatbot/chat-events";

type OpenChatButtonProps = {
  children: ReactNode;
  variant?: "primary" | "ghost" | "line";
  className?: string;
  track?: string;
};

export function OpenChatButton({
  children,
  variant = "primary",
  className,
  track = "button:open_chat:page",
}: OpenChatButtonProps) {
  return (
    <Button
      variant={variant}
      onClick={openBrantChat}
      className={className}
      ariaLabel="Ask about me"
      track={track}
    >
      {children}
    </Button>
  );
}
