# components/motion

Reusable animation wrappers. Every scroll reveal and transition should come from here so motion stays consistent. This folder does not own content or layout, only motion behavior. Every wrapper has a no-motion fallback for `prefers-reduced-motion`.

Current wrappers:

- `FadeInOnScroll.tsx` fades and lifts a piece of the page into view once, the first time it scrolls on screen.
- `StaggerChildren.tsx` reveals a group's items one shortly after another (use `StaggerItem` for each child).
- `GlassPanel.tsx` the shared glass surface (see-through, soft blur, hairline border, soft shadow) used by cards, the nav, and the chat panel. It handles look only, not motion.
