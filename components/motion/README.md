# components/motion

Reusable animation wrappers (FadeInOnScroll, StaggerChildren, GlassReveal). Every scroll reveal and transition should come from here so motion stays consistent.

This folder does not own content or layout, only motion behavior. Each wrapper respects `prefers-reduced-motion` and still shows the content when motion is off.
