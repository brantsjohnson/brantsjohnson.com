// ============================================
// WHAT THIS FILE DOES (plain English):
// This is an empty wrapper for chatbot-related app routes.
// The chat bubble will mount from the public layout later.
// The server endpoint lives at app/api/chatbot, not here.
// ============================================

// THIS SECTION DOES: pass children through unchanged until a chatbot shell is needed
export default function ChatbotGroupLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
