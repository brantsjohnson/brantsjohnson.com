// ============================================
// WHAT THIS FILE DOES (plain English):
// This is the /chat page: the main place a visitor can ask about Brant.
// It shows the chat screen. If the web address includes a company or role
// (for example /chat?company=Google&role=Product%20Manager), it passes that
// along so answers can be tailored. It does not require any access code.
// ============================================

import type { Metadata } from "next";
import { ChatWidget } from "@/components/chatbot/ChatWidget";

// THIS SECTION DOES: set the browser tab title for the chat page
export const metadata: Metadata = {
  title: "Chat about Brant",
  description: "Ask an AI assistant about Brant Johnson's experience, skills, and interests.",
};

// THIS SECTION DOES: read optional company/role from the web address and show
// the chat screen with that light context
export default function ChatPage({
  searchParams,
}: {
  searchParams: { company?: string; role?: string };
}) {
  return <ChatWidget company={searchParams.company} role={searchParams.role} />;
}
