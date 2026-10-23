# Design references

Notes from live sites and Awwwards write-ups, read before the multi-page rebuild. Each line is a pattern this site actually uses. The paper, ink, and gold stay. The new layer is color, depth, and a short first screen.

## What Brant asked for

The first view should feel like a person, not a document. One screen (two at most) introduces him. Five colored doors open the real pages. Those pages stay compact. Motion has to respect reduced motion, contrast, and the keyboard.

## Sites

1. **Obys** — https://obys.agency  
   The homepage is a numbered list of projects (01, 02, 03) and almost nothing else. A row is the button.  
   **Borrowed:** the five areas are numbered, full-color rows. The number, the name, and an arrow are the whole control.

2. **Rauno Freiberg** — https://rauno.me  
   The first screen is a name, one line of work, and a few ways in (Craft, Projects, Field Notes). It does not tell the whole career on the doorstep.  
   **Borrowed:** the homepage is a poster. Story, beliefs, and contact stay one click away, off the main stage.

3. **Cyd Stumpel** — https://cydstumpel.nl and the 2025 portfolio write-up at https://www.awwwards.com/sites/cyd-stumpel-portfolio-2025  
   Live site: project cards you can turn, built by someone who teaches accessible creative front-end. Awwwards notes a view transition from the home card into the work page, on periwinkle `#8082F8` and paper `#FFF5EE`.  
   **Borrowed:** leaving the homepage fades and rises into the section. Motion is a CSS entrance on each navigation, and `prefers-reduced-motion` already cuts animation to nothing. Next 14 does not share elements across routes the way her view transitions do, so the fade stands in for that morph.

4. **Lusion** — https://lusion.co (Awwwards site of the day, blue `#1a2ffb` on `#f0f1fa`)  
   One thesis, then featured work as separate worlds. The 3D is theirs.  
   **Borrowed:** the headline stays one sentence. Each world has its own page and its own pigment. No WebGL.

5. **Félix Péault** — https://flayks.com and https://www.awwwards.com/sites/felix-peault-portfolio  
   Each case (Irys, Hyperbolic, Houses Of) is its own short story, not a chapter in one scroll. Awwwards calls out a grid of links with perspective.  
   **Borrowed:** cards tilt a few degrees toward the pointer on a mouse, and only when motion is allowed. Touch scrolling is left alone.

6. **Dennis Snellenberg** — https://dennissnellenberg.com  
   The live first screen is one sentence ("Helping brands to stand out in the digital era") and a way to reach him. The work is not piled under the headline.  
   **Borrowed:** identity line under the headline, then the doors. Résumé and the story are buttons, not more paragraphs.

7. **Olha Lazarieva** — https://www.olhalazarieva.com (Awwwards: https://www.awwwards.com/sites/olha-lazarieva)  
   A personal site split into an about view and a gallery, described there as an elegant system for making ideas visual.  
   **Borrowed:** poetry is an index, then one poem per page with previous and next. Crew branding is a gallery with tabs (wordmark, motion, announcements) so the GIFs do not become a second essay.

8. **Instrument** — https://www.instrument.com  
   A short studio overview, then "View All Work". The case studies are elsewhere.  
   **Borrowed:** the information architecture. Product, Creator, Performer, Entrepreneur, and Activist are routes. Creator has poetry, blog, and Crew underneath it. Theater stays on Performer.

9. **Bruno Simon** — https://bruno-simon.com  
   The first screen invites you into a world ("drive around to learn more about me") instead of handing you a CV.  
   **Borrowed:** the invitation only. The five doors are the rooms. There is no game, no canvas, and no driving.

10. **Active Theory** — https://activetheory.net  
   The studio presents itself as a set of digital experiences. A project is a stage you enter.  
   **Borrowed:** once you are inside a section, that pigment owns the masthead, the selected tab, and the links onward. Product is navy, Creator is persimmon, Performer is plum, Entrepreneur is pine, Activist is teal. White type on those grounds clears WCAG AA.

## What this site does with them

- Homepage: poster plus five pigment doors. Header and footer sit in the same first screen on a desktop window.
- Inner pages: a layered color masthead (a plate offset behind the card), then tabs or a short card grid. Inline links still jump between sections.
- Depth: offset plate, shadow, and a small pointer tilt on the doors.
- Motion: a fade and rise when a page mounts. Reduced motion keeps every state in place.
- Not borrowed: 3D scenes, custom cursors, infinite project scrolls, or a single long story column.
