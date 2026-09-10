# 02. Brand & Design System

**Plain English purpose:** This doc is the visual law of the site. Before styling anything, check here. The goal in one sentence: it should feel calm, minimal, expensive, and alive when you scroll, the way an Apple product page feels. Never templated, never default-Bootstrap, never cluttered.

**Companion doc:** `14-UIUX-RESEARCH-BEST-PRACTICES.md` covers the research-backed mechanics behind this identity (exact breakpoints, type scale ranges, spacing tokens, motion timing, accessibility minimums). This doc sets the mood; `14` sets the numbers. Read both before building UI.

---

## 1. Core visual principles (apply to every screen, always)

1. **Whitespace is a feature, not empty space.** When in doubt, remove an element rather than shrink it to fit.
2. **Glass, not flat.** Panels, cards, and the chatbot widget use translucency, soft blur, and subtle depth (a faint border + soft shadow), not solid opaque boxes.
3. **Motion is default-on.** Content should not simply appear. It should be revealed. Every section defined in `components/motion` handles this consistently, see §4.
4. **One accent color, used sparingly.** Everything else is neutral. The accent marks the one thing you want someone to do on a given screen (a button, a link, a highlight).
5. **Hierarchy through size and weight, not boxes and borders.** Avoid boxing every element in a card just because it's a "section."

---

## 2. Color system

Define these as CSS variables / Tailwind tokens in `styles/tokens.css`, never hardcode hex values in components.

| Token | Role |
|---|---|
| `--color-bg` | Base background (near-white in light mode, near-black in dark mode) |
| `--color-surface` | Card/panel background before glass effect is applied |
| `--color-glass` | Semi-transparent overlay used for glass panels (e.g. `rgba(255,255,255,0.08)`) |
| `--color-border-subtle` | Hairline borders on glass panels |
| `--color-text-primary` | Main body/heading text |
| `--color-text-secondary` | Supporting text, captions, metadata |
| `--color-accent` | The single brand accent color, used for primary CTAs, active states, links |
| `--color-accent-muted` | A quieter version of the accent for hover/subtle emphasis |

**Rule:** pick the actual hex values once, put them in `styles/tokens.css`, and reference the token everywhere. If you want to change the whole site's mood later, you change five values in one file, not hundreds of components.

*(Exact hex values are yours to choose based on your personal brand. Once decided, record them here so this doc stays the source of truth.)*

---

## 3. Typography

- **Two typefaces maximum.** One for headings (can have personality), one for body/UI (must be highly legible, neutral, works at small sizes).
- **Type scale** (use a consistent ratio, e.g. 1.25):

| Token | Use | Approx size (desktop) |
|---|---|---|
| `text-display` | Hero headline only | 56 to 72px |
| `text-h1` | Page titles | 40px |
| `text-h2` | Section titles | 28 to 32px |
| `text-h3` | Sub-section / card titles | 20 to 22px |
| `text-body` | Paragraph text | 16 to 18px |
| `text-caption` | Metadata, timestamps, labels | 13 to 14px |

- **Line height:** generous. 1.5 for body text, 1.1 to 1.2 for large display headings.
- **Weight:** use weight, not size, to create emphasis within a single sentence.

---

## 4. Motion rules

All motion goes through `components/motion` wrappers, defined once, reused everywhere.

- **`FadeInOnScroll`**: default entrance for any section as it enters the viewport. Fade + slight upward translate (around 16 to 24px), never a bounce, never anything longer than ~500ms.
- **`StaggerChildren`**: for grids (projects, media), children reveal in a slight sequence, not all at once.
- **Hover states**: subtle scale (1.00 to 1.02) or a soft glow, never a jarring color flip.
- **Page transitions**: crossfade between routes, no hard cuts.
- **Reduced motion:** respect `prefers-reduced-motion`; every wrapper must have a no-motion fallback that still shows the content.
- **Timing standard:** ease curves should feel like iOS/macOS easing (`cubic-bezier(0.22, 1, 0.36, 1)` is a good default), not linear or default browser easing.

**Rule for Cursor:** never write a one-off `framer-motion` animation directly inside a section component. Always compose from `components/motion`. If a new motion pattern is genuinely needed, add it to `components/motion` first, with its own purpose comment, then use it.

---

## 5. The "glass" treatment, concretely

A glass panel (used for cards, the nav bar, the chat widget, modals):

- Background: `--color-glass` (semi-transparent).
- `backdrop-filter: blur(16px)` (adjust per context, chat widget can be a touch stronger).
- Border: 1px, `--color-border-subtle`.
- Shadow: soft, large, low-opacity (e.g. `0 20px 60px rgba(0,0,0,0.15)`), never a hard drop shadow.
- Corner radius: consistent across the whole site. Pick one value (e.g. 20px for large panels, 12px for buttons/inputs) and never deviate per-component.

---

## 6. Spacing

Use an 8px base grid for all spacing and sizing. Every margin, padding, and gap should be a multiple of 8 (or 4 for fine adjustments). This alone is most of what makes a site feel "designed" instead of "assembled."

---

## 7. Consistency checklist (Cursor should check this before shipping any UI)

- [ ] Uses design tokens, no hardcoded colors, sizes, or fonts.
- [ ] Uses an existing `components/motion` wrapper, not custom animation.
- [ ] Matches the established corner radius and shadow values.
- [ ] Spacing is on the 8px grid.
- [ ] Only one accent-colored element is the clear primary action on the screen.
- [ ] Works with `prefers-reduced-motion`.
- [ ] Copy on this screen was checked against `03-CONTENT-VOICE-GUIDELINES.md`.
