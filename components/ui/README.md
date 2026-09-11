# components/ui

Small, reusable UI primitives. These pieces stay dumb: they take props and render, with no page-specific layout or CMS fetching. Do not put section layouts or chatbot logic here.

Current primitives:

- `Button.tsx` the one button used across the site. Give it an `href` and it becomes a link; give it `onClick` and it becomes a button. Two looks: `primary` (the single accent action) and `ghost` (quieter).
- `Chip.tsx` a small proof chip: a big number or word over a short line of context. Used in the home proof row.
