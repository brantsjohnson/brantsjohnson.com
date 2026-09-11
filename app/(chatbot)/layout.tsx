// ============================================
// WHAT THIS FILE DOES (plain English):
// This is the wrapper for the chat pages (like /chat). It gives them a
// full-height, glass-tinted background so the chat fills the screen, and
// keeps them separate from the marketing pages' header and footer.
// The server endpoint the chat talks to lives at app/api/chatbot.
// ============================================

// THIS SECTION DOES: put chat pages on a full-screen, softly tinted canvas
export default function ChatbotGroupLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-[100dvh] flex-col bg-gradient-to-b from-bg to-surface">
      {children}
    </div>
  );
}
