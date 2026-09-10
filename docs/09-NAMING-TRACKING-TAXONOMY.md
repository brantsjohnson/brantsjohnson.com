# 09. Element Naming & Tracking Taxonomy

**Plain English purpose:** This doc exists so that when you look at analytics, you can immediately tell what was clicked, on what page, and whether that same element appears elsewhere. Without a system like this, every developer (or agent) names buttons slightly differently and your data becomes unreadable within a month. This doc is that system.

---

## 1. The core idea

Every interactive element gets **two identifiers**, not one:

1. **A component identity**: what kind of element is this, structurally? (e.g. `cta_button`, `nav_link`, `social_icon`, `project_card`)
2. **A location/context identity**: where does it live, and what's it attached to? (e.g. `hero`, `project:ai-dashboard`, `nav:primary`)

Combined, every tracked event reads as `component_identity @ location_identity`, so "the same button design used on three pages" is instantly distinguishable in your data, and so is "three different buttons that happen to say the same word."

---

## 2. The naming pattern

`data-track="{element_type}:{element_name}:{context}"`

- **`element_type`**: one of a fixed, small vocabulary: `button`, `link`, `card`, `nav_item`, `form_field`, `tab`, `icon`. Never invent a new one without adding it to the vocabulary list in this doc first.
- **`element_name`**: what the element does, in plain words, verb-first where relevant: `view_project`, `submit_contact`, `open_resume`, `filter_by_tag`. This must be identical every time the same action appears, even on different pages.
- **`context`**: where it lives: the page slug, or `global` if it's in the nav/footer that appears everywhere, or `project:{slug}` / `blog:{slug}` when it's tied to a specific content item.

**Examples:**
- The "View project" button on the AI Dashboard project card: `button:view_project:project-ai-dashboard`
- The same button style used on the Photography page to open a collection: `button:view_project:photography-street-2024` — note it reuses `view_project` only if it's functionally the same action; if it's functionally different (opening a photo collection vs. a project), it should be a different `element_name`, e.g. `button:open_collection:photography-street-2024`, even though visually it might look similar. **The name should track behavior, not visual style.**
- The LinkedIn icon in the footer: `link:social_linkedin:global`
- A tag filter chip on the Projects page: `button:filter_by_tag:projects`

---

## 3. Implementation rule

- Every interactive component in `components/ui/` and `components/sections/` accepts a `trackId` prop (or derives one automatically from its props, e.g. a `ProjectCard` auto-builds `button:view_project:project-{slug}` from its own slug prop) so this isn't something a developer has to remember to type correctly by hand every time, it's structural.
- `lib/integrations/analytics.ts` (see `06-ANALYTICS-INTEGRATIONS.md`) reads this `trackId` and fires the event under that name automatically on click, no per-instance wiring required.
- New `element_type` values must be added to the fixed vocabulary list here before use, so the taxonomy doesn't sprawl.

---

## 4. Fixed vocabulary (extend deliberately, not casually)

| element_type | Meaning |
|---|---|
| `button` | Triggers an action (submit, navigate via a styled button, open something) |
| `link` | A plain text or icon link, typically leaving the current view or going external |
| `card` | A clickable content preview (project, blog post, photo collection) |
| `nav_item` | Primary or footer navigation |
| `form_field` | Any input inside a form (tracked as focused/completed, not raw keystrokes) |
| `tab` | A view-switcher within a page (e.g. Blog vs Poetry toggle if combined) |
| `icon` | A standalone icon button not covered by the above |

---

## 5. What this gets you

In your analytics dashboard, you'll be able to answer, precisely: "Is the 'View project' action getting used more on the homepage or the Projects page?" and "Is this exact button (not just ones that look like it) performing differently across pages?" without guessing from ambiguous labels.
