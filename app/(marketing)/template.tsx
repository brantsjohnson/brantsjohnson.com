// ============================================
// WHAT THIS FILE DOES (plain English):
// Next remounts this wrapper every time the visitor opens a page.
// A gold curtain closes over the page and parts, then the page
// rises into view. Both effects are in the stylesheet. When the
// device asks for less motion, they are cut to nothing.
// ============================================

export default function MarketingTemplate({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="curtain" aria-hidden="true">
        <span />
        <span />
      </div>
      <div className="page-enter">{children}</div>
    </>
  );
}
