// ============================================
// WHAT THIS FILE DOES (plain English):
// In-page links already jump. This also moves the keyboard focus
// onto the heading that was jumped to, so the next Tab starts there.
// The page CSS decides whether that jump is smooth or instant.
// ============================================

"use client";

export function focusHash(href: string) {
  const id = href.startsWith("#") ? href.slice(1) : "";
  if (!id || typeof window === "undefined") return;
  window.requestAnimationFrame(() => {
    const node = document.getElementById(id);
    if (!(node instanceof HTMLElement)) return;
    if (!node.hasAttribute("tabindex")) node.tabIndex = -1;
    node.focus({ preventScroll: true });
  });
}
