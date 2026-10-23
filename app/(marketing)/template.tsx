// ============================================
// WHAT THIS FILE DOES (plain English):
// Next remounts this wrapper every time the visitor opens a page.
// The rise animation is in the stylesheet. When the device asks for
// less motion, that animation is cut short with the rest of the site.
// ============================================

export default function MarketingTemplate({ children }: { children: React.ReactNode }) {
  return <div className="page-enter">{children}</div>;
}
