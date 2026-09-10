# 14. UI/UX Research-Backed Best Practices

**Plain English purpose:** This is your own research-backed standards document, prepared as a behavior and implementation guide (not a visual theme) for a responsive personal site combining articles, photography, video, projects, software, a resume, links, and an AI/chat agent. It's reproduced here in full, unedited for content, so nothing is lost. Treat it as sitting one level more detailed than `02-BRAND-DESIGN-SYSTEM.md`: doc 02 sets the site's visual identity and mood (glass, motion, the Apple feel, the specific tokens for this site), this document sets the underlying, research-grounded behavior rules (exact breakpoints, type scale ranges, timing numbers, accessibility minimums, interaction logic) that any implementation of that identity should satisfy. Where the two overlap, `02` decides the mood, this document decides the mechanics. Cursor should treat both as required reading before building any UI, alongside `09-NAMING-TRACKING-TAXONOMY.md` for how those UI elements get identified once built.

---

**RESEARCH-BACKED DESIGN SYSTEM GUIDE**

UI/UX Best Practices for  
Responsive Personal Websites

A practical standards document for websites that combine articles,
photography, video, projects, software, resumes, links, products, and an
AI/chat agent — across phones, foldables, laptops, desktops, and large
displays.

| **What this document is** A behavior and implementation guide, not a visual theme. It specifies sizing, spacing, hierarchy, navigation, media, motion, accessibility, responsive behavior, interaction logic, and consistency rules you can hand to a designer or engineer. |
|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|

Research basis: W3C/WCAG, Apple Human Interface Guidelines, Google
web.dev and Chrome guidance, Android adaptive-layout guidance, Nielsen
Norman Group usability research, Baymard Institute readability research,
and Material motion guidance. Recommendations distinguish normative
accessibility requirements from researched heuristics and practical
defaults.

Prepared: September 10, 2026

# 1. The 20 rules to standardize first

| **Rule**                                                       | **Default**                                                                                                                                                                                                                                        |
|----------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Design for the available window, not a device name.            | Responsive logic should react to container/window width, height, posture, and input capability. Foldables, split-screen, browser resizing, and desktop windows invalidate phone/tablet/desktop-only assumptions. \[12\]\[13\]                      |
| Keep long-form text narrow.                                    | Use roughly 50–75 characters per line for body copy. On a wide desktop, add whitespace or complementary media rather than stretching text edge to edge. \[5\]                                                                                      |
| Start body text at a real reading size.                        | Use 16–18 CSS px as the normal range for general body copy; 18–20 px is often appropriate for reading-heavy article templates. Use rem and allow zoom/text resizing.                                                                               |
| Use fluid type within limits.                                  | Scale with clamp() or container-aware rules so typography grows gradually, but set minimum and maximum sizes. Never scale headings indefinitely with viewport width. \[11\]                                                                        |
| Use a spacing system, not one-off padding.                     | Adopt a 4 px base with an 8 px primary rhythm. Most gaps should come from a small token set, such as 4/8/12/16/24/32/48/64/96.                                                                                                                     |
| Keep controls comfortably tappable.                            | Treat 44×44 CSS px as a preferred touch target. WCAG 2.2 AA permits 24×24 CSS px minimum in many cases, but larger controls reduce error and work across touch and mouse. \[1\]\[3\]\[9\]                                                          |
| Make primary navigation visible when space allows.             | Desktop navigation should normally be visible. Hidden navigation adds interaction cost and reduces discoverability; on mobile, use a hamburger only when necessary and label it when ambiguity is plausible. \[20\]\[21\]                          |
| Use one obvious escape route per layer.                        | A modal needs one primary dismiss control (normally an X) plus Escape. A hierarchical page needs Back. Do not show an X and a Back arrow that perform the same action.                                                                             |
| Default links to the same tab.                                 | Let the browser and user control tab behavior. Open a new tab only when preserving the current workflow or comparing/reference material clearly benefits the task; warn users when you do. \[6\]\[7\]                                              |
| Reserve space for all media before it loads.                   | Set image/video dimensions or aspect-ratio so content does not jump. Target CLS ≤0.1. \[24\]\[27\]                                                                                                                                                 |
| Make interaction feedback feel immediate.                      | Target INP ≤200 ms at the 75th percentile. Visual press/selection feedback should appear as close to immediately as possible. \[14\]\[27\]                                                                                                         |
| Keep most animations under 400 ms.                             | Use ~100 ms for direct feedback, ~150–200 ms for many desktop transitions, ~200–300 ms for larger UI changes, and only approach 400 ms for large spatial moves. \[8\]\[10\]                                                                        |
| Animate to explain, not to decorate every object.              | Motion should confirm input, maintain spatial continuity, direct attention, or add occasional delight. Repeated scroll-triggered movement quickly becomes noise.                                                                                   |
| Respect reduced-motion preferences.                            | When prefers-reduced-motion: reduce is active, remove nonessential movement, parallax, zooming, and autoplay motion; preserve necessary state feedback. \[23\]                                                                                     |
| Front-load meaning.                                            | People scan. Put the information-bearing words at the beginning of headings, sentences, labels, and links. Important content should not depend on a reader reaching the end of a long paragraph. \[4\]\[18\]                                       |
| Break long content into visible landmarks.                     | Use descriptive headings, short paragraphs, media, lists, pull quotes, summaries, and in-page navigation where useful. Scannable and concise web writing substantially outperformed dense promotional writing in classic usability studies. \[18\] |
| Use icons for recognition, labels for meaning.                 | Search, close, home, and a few other icons are broadly understood; most icons are context-dependent. Label navigation and unfamiliar actions rather than relying on hover tooltips. \[22\]                                                         |
| Do not auto-rotate important content.                          | Carousels and hero messages should advance only on user request. Auto-forwarding causes missed content, reading-time conflicts, motion issues, and banner blindness. \[19\]                                                                        |
| Make media accessible by default.                              | Meaningful images need appropriate alt text; prerecorded video with meaningful audio needs captions; transcripts are strongly recommended and useful beyond accessibility. \[15\]\[16\]\[17\]                                                      |
| Consistency means consistent behavior, not identical geometry. | The same semantic element should use the same component, states, labels, and interaction model everywhere; its layout may adapt when the available space changes.                                                                                  |

# 2. Responsive layout: design by available space

The core rule is to design for the viewport or component container
actually available to the site. Android’s current adaptive guidance
explicitly warns against using physical device categories as layout
logic because split-screen, resizable windows, fold/unfold states, and
orientation can change available space while the app is running. Web
foldable APIs likewise model the viewport as logical segments rather
than as a “foldable phone” flag. \[12\]\[13\]

| **Do not build “mobile / tablet / desktop” as three frozen canvases.** Build fluid components that operate across ranges, then introduce a breakpoint only where content becomes cramped, excessively sparse, or requires a different information architecture. |
|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|

## 2.1 Recommended test widths

| **Viewport / state**             | **What to validate**                                                                                            |
|----------------------------------|-----------------------------------------------------------------------------------------------------------------|
| 320 px                           | WCAG reflow baseline; no two-dimensional scrolling for normal content; controls and text remain usable. \[2\]   |
| 360–390 px                       | Common narrow-phone behavior; one-column content, tight navigation, images, forms, chat launcher.               |
| 430–480 px                       | Large phones; ensure the layout does not become an awkward “stretched phone.”                                   |
| 600 px                           | Transition range where some components can gain columns or larger gutters; do not assume tablet.                |
| 768–840 px                       | Small tablets, portrait foldables, narrow laptop windows; evaluate sidebars and two-pane candidates.            |
| 1024 px                          | Tablet landscape / small computer window; global nav usually visible; optional two-column content.              |
| 1280–1440 px                     | Main desktop composition; use max-width containers so content does not expand indefinitely.                     |
| 1600–1920+ px                    | Large displays; increase outer margins and selective media scale, not line length.                              |
| Folded / unfolded / book posture | Verify no text, CTA, image focal point, menu, or modal control is obscured by a fold/hinge. \[13\]\[30\]        |
| Short landscape window           | Verify sticky headers, cookie bars, chat launchers, and bottom controls do not consume too much vertical space. |

## 2.2 Layout containers

| **Container**          | **Recommended default**                                                            | **Reason**                                                                                                              |
|------------------------|------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------|
| Global shell           | max-width 1200–1440 px; centered                                                   | Prevents a 1920+ px screen from turning into a visually empty or over-stretched page.                                   |
| Article reading column | ~640–760 px, tuned by actual font                                                  | Keeps body text near 50–75 characters per line. \[5\]                                                                   |
| Article + aside        | Reading column + 240–320 px aside + 32–64 px gap                                   | Useful for TOC, related work, metadata, or contextual visuals without widening the prose.                               |
| Grid/catalog           | Use auto-fit/minmax or container queries; usually 1 col narrow, 2 medium, 3–4 wide | Allows cards to preserve a useful minimum width rather than tying count to a device category.                           |
| Full-bleed media       | Viewport-wide or shell-wide only when visual impact is intentional                 | Full bleed is effective for photography/video, but body copy should return to the reading column immediately afterward. |

## 2.3 Gutters and page padding

| **Available width** | **Horizontal page gutter**           | **Typical section vertical padding** |
|---------------------|--------------------------------------|--------------------------------------|
| 320–479 px          | 16 px                                | 40–64 px                             |
| 480–767 px          | 20–24 px                             | 48–72 px                             |
| 768–1023 px         | 24–32 px                             | 64–88 px                             |
| 1024–1439 px        | 32–48 px                             | 72–104 px                            |
| 1440+ px            | 48–80 px or centered max-width shell | 80–128 px                            |

These are system defaults, not accessibility requirements. The key is
consistency: components should consume spacing tokens rather than
inventing independent padding values. Use CSS logical properties
(padding-inline, margin-block) so the system is robust to localization
and writing direction.

# 3. Typography: readable before expressive

Typography should create hierarchy without requiring users to decode a
decorative system. Apple’s current guidance emphasizes legible sizes,
avoiding very light weights, minimizing the number of typefaces,
preserving hierarchy at larger text settings, and preventing important
content from truncating as text scales. \[9\]

## 3.1 Practical responsive type scale

| **Role**                      | **Phone / narrow** | **Desktop / wide** | **Line-height / notes**                                              |
|-------------------------------|--------------------|--------------------|----------------------------------------------------------------------|
| Body / article                | 16–18 px           | 17–20 px           | 1.5–1.7; long-form reading should favor the upper end.               |
| UI body / controls            | 15–16 px           | 14–16 px           | ~1.3–1.5; never shrink merely to fit a control.                      |
| Small metadata                | 13–14 px           | 13–14 px           | Reserve 12 px for truly secondary/legal microcopy, not core actions. |
| H3                            | 20–24 px           | 22–28 px           | 1.2–1.35                                                             |
| H2                            | 26–32 px           | 32–44 px           | 1.15–1.25                                                            |
| H1                            | 34–44 px           | 48–72 px           | 1.05–1.15; clamp maximum size.                                       |
| Display / decorative headline | 40–56 px           | 64–96 px           | Use selectively; never make the only meaningful heading an image.    |

| **Recommended implementation** Use rem for text and a bounded fluid function such as clamp(). Example concept: body remains 1rem–1.125rem while H1 might grow from ~2.25rem to ~4rem. Test browser zoom, text zoom, and user font settings rather than treating the exact CSS value as the objective. \[11\] |
|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|

## 3.2 Line length, paragraphs, and scanning

Baymard’s testing and typographic research syntheses recommend
approximately 50–75 characters per line for body text; longer lines
become intimidating and make line tracking harder, while very short
lines interrupt reading rhythm. \[5\]

| **Element**      | **Recommended practice**                                                                                                                                        |
|------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Paragraph length | Default to roughly 2–5 sentences in general web content. Let an idea determine the break; avoid walls of text longer than ~6–8 visible lines on a phone.        |
| Headings         | Use descriptive, information-bearing headings. On long pages, a new meaningful landmark every few paragraphs is usually more useful than decorative separators. |
| Opening sentence | State the point early. Users often scan the beginning of lines and paragraphs, especially when content is dense. \[4\]                                          |
| Lists            | Use lists for parallel or comparable items; do not convert every paragraph into bullets. Keep each bullet grammatically parallel.                               |
| Bold             | Use for scan anchors and key concepts, not entire sentences repeatedly.                                                                                         |
| ALL CAPS         | Restrict to short labels or tiny accents. Long all-caps text is slower to parse and visually loud.                                                              |
| Center alignment | Good for short hero copy or a short quote; poor for multi-line reading because every line starts at a new horizontal position.                                  |
| Decorative type  | Use as an accent layer, never as the only representation of essential content.                                                                                  |

## 3.3 Information hierarchy order

A reliable content order for a personal site or article is:
identity/context → primary promise or page title → supporting sentence →
primary action or metadata → core content. Eye-tracking research does
not mean every page literally needs an F-shaped composition; NN/g
explicitly warns that the F-pattern is a symptom of scanning poorly
structured text, not a target layout. Better hierarchy can prevent it.
\[4\]

# 4. A uniform content system for blogs, photos, video, projects, and resume content

Uniformity comes from a shared page anatomy and component vocabulary. Do
not make every page visually identical; make equivalent things behave
and align equivalently.

## 4.1 Shared page anatomy

| **Region**      | **Standard**                                                                                                                                                         |
|-----------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Site header     | One global navigation model, consistent logo/home behavior, search placement if present, and a single responsive navigation transformation.                          |
| Page intro      | Eyebrow/category (optional) → H1 → deck/summary (optional) → metadata/actions. Keep this order stable across articles, projects, and product pages.                  |
| Content body    | Use a reading column or structured grid. Text, images, quotes, embeds, and callouts snap to a predictable set of widths.                                             |
| Related content | A consistent end-of-page module; do not interrupt every section with unrelated recommendations.                                                                      |
| Footer          | Stable global destinations, contact/social links, legal links, and optional small CTA. Footer is secondary navigation, not a duplicate of every control on the page. |

## 4.2 Image rules

| **Image type**          | **Placement / size**                                                                            | **Behavior**                                                                                                             |
|-------------------------|-------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------|
| Hero/header image       | Full shell width or 60–100% of shell; commonly 16:9, 3:2, or editorial crop                     | Reserve aspect ratio; choose responsive crops; never hide the H1 behind low-contrast text unless contrast is guaranteed. |
| Inline editorial image  | Article width or intentionally wider “breakout” width                                           | Use caption when context/source matters; preserve dimensions to prevent layout shift. \[24\]                             |
| Decorative image        | Outside or between information blocks                                                           | Set empty alt when truly decorative; do not let decoration become a focusable/clickable false affordance.                |
| Gallery                 | Grid with predictable aspect ratios or masonry only when crop variability is important          | Open to a lightbox only if detail benefits from enlargement; include keyboard controls and a clear close action.         |
| Portrait / resume image | Keep relatively compact; do not let it displace credentials or contact action on narrow screens | Crop around face consistently and use object-position/focal-point metadata when responsive crops change.                 |

Always provide intrinsic width/height attributes or reserve space with
aspect-ratio. web.dev identifies unsized images and video as a common
cause of cumulative layout shift. \[24\]

## 4.3 Quotes and decorative text

| **Pattern**       | **Use**                                                                                     | **Avoid**                                                                                  |
|-------------------|---------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------|
| Pull quote        | After the reader has encountered the idea; 1–3 lines; visibly tied to the section           | A giant quote before users know who said it or why it matters.                             |
| Block quote       | For an actual quotation; visually distinct with source/attribution                          | Using quotation styling as generic emphasis.                                               |
| Stat callout      | One number + one sentence of context + source link                                          | A large unexplained number that requires users to hunt for what it measures.               |
| Decorative phrase | Short and optional; can overlap whitespace or imagery if readability survives at all widths | Important navigation, instructions, or factual content as rotated/curved/image-based text. |

## 4.4 Video and audio

- Do not autoplay audible media. User-initiated playback should be the
  default.

- Provide captions for prerecorded video with meaningful audio; W3C
  requires captions at WCAG Level A for prerecorded synchronized media.
  \[15\]

- Provide a transcript, preferably on the same page or immediately
  linked below the media. W3C notes transcripts support additional
  accessibility needs and many non-disabled use cases. \[16\]

- Use a 16:9 responsive player by default unless the source is vertical.
  For vertical video, constrain width on desktop so it does not become
  comically large.

- Place title/context above the player and transcript/chapters below.
  Avoid duplicating the same title inside a decorative card and
  immediately above the player.

# 5. Attention, scanning, and content psychology

The central psychological reality of web reading is selective attention.
Users usually arrive with a task, question, or curiosity and allocate
attention based on information scent. The interface should make the next
useful target easy to identify without demanding full reading.

## 5.1 What people tend to notice first

| **Pattern**                              | **Design implication**                                                                                                                                                                        |
|------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Top and beginning of content             | Put identity, page purpose, and core value high on the page. Do not spend the entire first viewport on an atmospheric image with no information.                                              |
| Left/start edge in left-to-right reading | Front-load headings, labels, and links with meaningful words. The updated NN/g review confirms F-like scanning still occurs, including on mobile, but is not the only scanning pattern. \[4\] |
| Large/high-contrast elements             | Use visual dominance for the page’s real priority, not merely decoration. If everything is big, nothing has hierarchy.                                                                        |
| Faces and salient imagery                | Useful for storytelling, but a face should not visually compete with the CTA or heading unless that is intentional.                                                                           |
| Controls that look interactive           | Buttons and links need signifiers and states. Extremely flat or icon-only controls can reduce discoverability. \[21\]\[22\]                                                                   |

## 5.2 What people skip

- Dense, unstructured paragraphs when users are trying to find a
  specific answer.

- Promotional or vague language that delays concrete meaning. Classic
  NN/g experiments found concise, scannable, objective writing
  materially improved measured usability. \[18\]

- Elements that resemble banner advertisements, especially rotating or
  overly promotional blocks. Auto-forwarding carousels also reduce the
  chance that a desired item is visible at the right moment. \[19\]

- Hidden navigation items simply because they are not visible.
  Quantitative research found lower discovery and worse task metrics for
  hidden navigation, especially on desktop. \[20\]

- Repeated UI that looks like a duplicate of something already
  understood; duplication increases scanning cost and uncertainty over
  whether controls differ.

## 5.3 Long-form content pattern

For substantial blog posts, case studies, or essays, use progressive
structure rather than shortening everything to superficial snippets: a
concise intro, descriptive H2/H3 landmarks, visual relief where it adds
meaning, short summaries or key points for very long sections, and an
optional sticky/in-page table of contents on wide layouts. Readers who
want depth can continue; scanners can still orient themselves.

# 6. Navigation, Back, Close, links, and interaction logic

## 6.1 Back versus Close versus Home

| **Control**  | **Meaning**                                                                          | **Placement**                                              | **Do not**                                                                                     |
|--------------|--------------------------------------------------------------------------------------|------------------------------------------------------------|------------------------------------------------------------------------------------------------|
| Back arrow   | Return to the prior level/location in a hierarchy or history                         | Usually upper-left/start edge inside app-like mobile views | Show it alongside an X when both dismiss the same layer.                                       |
| X / Close    | Dismiss a temporary overlay, dialog, lightbox, chat panel, or non-hierarchical layer | Usually upper-right/end edge of the temporary surface      | Use it as global site navigation or make it unexpectedly navigate to a different page.         |
| Logo / Home  | Return to site home                                                                  | Global header, generally start/left                        | Use a separate redundant Home button beside a clearly clickable logo unless the IA needs it.   |
| Browser Back | Return through browser history                                                       | Browser-owned                                              | Break it by forcing routine navigation into new tabs or by manipulating history unpredictably. |

| **One escape route principle** Inside any single visual layer, one visible primary dismiss/navigation control should match the user’s mental model. Redundant visible X + Back controls are justified only if they truly mean different things and that distinction is obvious. |
|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|

## 6.2 Links and tabs

Default to same-tab navigation. NN/g documents that forced new tabs
create clutter, disorientation, and remove the expected Back-button
path, especially on mobile. W3C similarly recommends opening new
windows/tabs only when necessary and warning users when it happens.
\[6\]\[7\]

| **Link situation**                          | **Default behavior**                                                                                                                       |
|---------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------|
| Internal navigation                         | Same tab.                                                                                                                                  |
| External article/source                     | Same tab unless preserving the current task is materially useful.                                                                          |
| PDF/document                                | Usually same tab; if your product context requires a new tab, indicate it.                                                                 |
| Reference needed while completing form/task | New tab can be justified; label/announce that behavior. \[6\]\[7\]                                                                         |
| Portfolio/project external demo             | Same tab by default; users who want a new tab can choose it. Consider new tab only if returning to a launchpad is a core browsing pattern. |
| Download                                    | Download action, clearly labeled with file type/size when useful; do not disguise it as normal navigation.                                 |

## 6.3 Modal and overlay behavior

- Move keyboard focus into the modal when it opens; keep focus inside
  while modal; return focus to the triggering control when it closes.

- Support Escape to close unless closing would destroy an irreversible
  operation; in that case confirm.

- Use one visible close control. Clicking the backdrop may close
  lightweight overlays, but never make backdrop click the only exit.

- On mobile, prefer full-screen sheets/pages when a modal would become
  cramped or require nested scrolling.

- Do not stack modals. Transition the existing surface or navigate to a
  dedicated page.

# 7. Icons and controls

Icons save space and aid recognition only when their meaning is learned
or obvious. NN/g notes that universally understood icons are rare and
recommends visible text labels for navigation and ambiguous actions.
\[22\]

| **Icon / action**       | **Generally safe alone?**   | **Guidance**                                                                                                          |
|-------------------------|-----------------------------|-----------------------------------------------------------------------------------------------------------------------|
| X / close               | Often                       | Only on a clearly temporary surface; accessible name must be “Close …”, not “X”.                                      |
| Search magnifier        | Often                       | On desktop, a visible search field can be more discoverable than an icon-only search if search is important. \[21\]   |
| Menu / hamburger        | Sometimes                   | Use standard three-line icon; on mobile consider “Menu” label; avoid on desktop when nav can be visible. \[20\]\[21\] |
| Home                    | Sometimes                   | Logo often already serves this function.                                                                              |
| Share                   | Context-dependent           | Label in unfamiliar contexts or overflow menus.                                                                       |
| Download                | Context-dependent           | Label when file type or result is not obvious.                                                                        |
| Edit / pencil           | Context-dependent           | Usually understandable in forms/profile contexts; label for consequential actions.                                    |
| Save / bookmark / heart | No single universal meaning | Label or establish meaning repeatedly and consistently.                                                               |
| AI / sparkle            | No                          | Sparkles can mean AI, magic, enhancement, or new. Label the agent or action.                                          |
| Kebab / ellipsis        | Usually                     | Use for secondary/overflow actions, never hide the primary action inside it.                                          |

Every icon button needs an accessible name. W3C guidance emphasizes
naming controls by their purpose (for example, “Search,” not “magnifying
glass”). \[17\]

# 8. Motion and animation: fun without friction

Motion is most useful when it explains causality and spatial
relationships: what changed, where something came from, what your action
affected, and what state the interface is now in. Purely decorative
motion should be comparatively rare so meaningful motion retains
attention value.

## 8.1 Timing system

| **Motion class**           | **Recommended duration**  | **Examples**                                                                                                                    |
|----------------------------|---------------------------|---------------------------------------------------------------------------------------------------------------------------------|
| Immediate feedback         | 80–120 ms                 | Pressed state, checkbox/toggle feedback, tiny color/opacity response.                                                           |
| Small desktop transition   | 150–200 ms                | Tooltip, menu, hover affordance, small panel transition. Material guidance places desktop transitions around 150–200 ms. \[10\] |
| Standard UI transition     | 180–260 ms                | Accordion, tab indicator, card expansion, compact sheet.                                                                        |
| Large/mobile surface enter | 225–320 ms                | Dialog/sheet/page-layer entrance; NN/g suggests 200–300 ms for substantial changes. \[8\]\[10\]                                 |
| Exit                       | ~15–25% faster than enter | Disappearing objects need less inspection; Material cites ~195 ms exit vs ~225 ms enter in common mobile motion. \[10\]         |
| Large spatial transition   | 300–400 ms                | Major layout morph or long-distance movement.                                                                                   |
| Avoid                      | \>500 ms for routine UI   | At this point motion commonly feels like waiting rather than feedback. \[8\]                                                    |

## 8.2 Easing and choreography

- Do not use linear easing for most physical movement. Use
  ease-out/deceleration for entering elements, ease-in/acceleration for
  permanent exits, and ease-in-out/standard curves for movement between
  on-screen positions. \[10\]

- For a group of elements, animate the container or use a restrained
  30–60 ms stagger. Avoid long “domino” sequences that force the user to
  wait for the last item.

- Keep transform/opacity animations preferred for performance; avoid
  animating layout-heavy properties when possible.

- A hover animation should never be required to discover information;
  touch devices have no reliable hover state.

## 8.3 Scroll animation

| **Good use**                                                              | **Bad use**                                                                           |
|---------------------------------------------------------------------------|---------------------------------------------------------------------------------------|
| One-time reveal of a major chapter/visual with 8–24 px movement + opacity | Every paragraph sliding in from alternating directions.                               |
| Sticky progress or section indicator for a long story                     | Scroll hijacking that changes normal scroll speed/direction.                          |
| Subtle parallax on nonessential background layers                         | Large foreground parallax, zooming, or rotation that can cause vestibular discomfort. |
| Data/diagram animation tied to entering the viewport                      | Making users wait for text to animate before it becomes readable.                     |
| Optional playful easter eggs on low-frequency interactions                | Autoplaying looping motion next to core reading content.                              |

Honor prefers-reduced-motion and remove nonessential motion in the
reduced variant. web.dev specifically calls out parallax, zoom effects,
autoplay video, and decorative animation as potential overload or
motion-sickness triggers. \[23\]

# 9. Performance is part of UX

A visually polished site that feels delayed or jumps during loading is
not polished. Google’s Core Web Vitals currently classify “good”
experiences at LCP ≤2.5 s, INP ≤200 ms, and CLS ≤0.1 at the 75th
percentile. \[27\]

| **Metric** | **Target** | **Design implications**                                                                                                                      |
|------------|------------|----------------------------------------------------------------------------------------------------------------------------------------------|
| LCP        | ≤ 2.5 s    | Optimize hero image/video, fonts, initial CSS, and above-the-fold assets. Do not make a decorative 8 MB hero the loading bottleneck.         |
| INP        | ≤ 200 ms   | Keep click/tap handlers light; give immediate state feedback; defer heavy work; avoid animation that starts only after expensive JavaScript. |
| CLS        | ≤ 0.1      | Reserve media/ad/embed space, avoid late-inserted banners above content, and handle web-font loading deliberately.                           |

- Responsive images: use srcset/sizes or framework equivalents so phones
  do not download desktop-sized imagery unnecessarily.

- Lazy-load below-the-fold images and embeds, but do not lazy-load the
  likely LCP hero image.

- For chat/agent code, load the launcher shell early but defer the heavy
  conversation client/model integration until intent is shown, where
  feasible.

- Skeletons are useful only when the final geometry is reasonably known;
  otherwise they create false expectations and can amplify visual
  movement.

# 10. Accessibility and inclusive interaction defaults

Treat WCAG 2.2 AA as a baseline for a modern public website. It is a
quality floor, not a ceiling.

| **Area**         | **Baseline rule**                                                                                                                                                               |
|------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Reflow           | Normal content must reflow without two-dimensional scrolling at 320 CSS px equivalent width. \[1\]\[2\]                                                                         |
| Touch targets    | WCAG 2.2 AA: 24×24 CSS px minimum with exceptions/spacing rules; prefer ~44×44 for touch comfort. \[1\]\[3\]\[9\]                                                               |
| Text resizing    | Layout must survive browser zoom and larger text. Avoid clipping, fixed-height text containers, and critical truncation. \[9\]                                                  |
| Keyboard         | Every interactive element reachable, operable, and visibly focused; logical focus order follows visual/task order.                                                              |
| Focus appearance | Do not remove focus outlines without a clearly visible replacement.                                                                                                             |
| Color            | Do not communicate state using color alone; maintain WCAG contrast requirements.                                                                                                |
| Images           | Meaningful images: concise alt text based on purpose. Decorative images: empty alt.                                                                                             |
| Video            | Captions for meaningful prerecorded audio; provide transcript; audio description/descriptive transcript when visual information is required to understand content. \[15\]\[16\] |
| Motion           | Honor reduced motion and avoid flashing/strobing patterns. \[23\]                                                                                                               |
| Links            | Descriptive link text; avoid “click here.” Apple and W3C both emphasize clear/action-oriented labels. \[25\]                                                                    |

# 11. Foldables and unusual screen configurations

Foldables should be an enhancement layer on top of sound responsive
design. Chrome’s Viewport Segments API (available in Chrome 138+)
exposes logical viewport regions separated by folds/hinges, and current
Android guidance recommends adapting around fold posture and using the
hinge as a natural separator where appropriate. \[13\]\[30\]

## 11.1 Foldable rules

- Never center a primary CTA, face, headline, or navigation control
  directly across a hinge/fold when two segments are present.

- In book posture, treat the fold as a natural column divider: article
  on one side and media/TOC/related context on the other can work well.

- In tabletop posture, the upper segment can hold video/content and the
  lower segment controls or supporting information. Android explicitly
  recommends this media/control split as a useful posture pattern.
  \[31\]

- When folded back to phone width, collapse to the same robust
  single-column layout used by other narrow viewports.

- Respond dynamically to resizing/folding. Do not require refresh after
  posture changes.

- Use safe-area insets and viewport segment environment values where
  supported, with fallbacks for ordinary browsers.

# 12. Recommended patterns by page/content type

| **Page**                    | **Structure**                                                                                                                                                                                                |
|-----------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Home / personal landing     | Clear identity + one-sentence positioning → 1–2 primary actions → selected work/content → current/high-value items → brief bio → contact. Avoid turning the hero into a navigation menu with ten equal CTAs. |
| Blog index                  | Page title + optional topic filters/search → cards/list. Use consistent metadata order (date, category, read time if useful). Do not hide every article behind horizontally scrolling carousels.             |
| Blog article                | Breadcrumb/back-to-index (optional) → H1/deck/meta → hero media → article column → optional sticky TOC on wide screens → related content. Keep share actions secondary.                                      |
| Video page                  | Title/summary → player → chapters/transcript → related resources. Captions on player; transcript immediately discoverable.                                                                                   |
| Resume/CV                   | Name/contact/value summary → experience → impact bullets → education/skills → downloadable resume. Make web content readable without requiring PDF download.                                                 |
| Project/software case study | Outcome/problem → your role → demo/visual → process → evidence/results → links. Put “Visit / Try / View code” actions near the top and repeat only at meaningful decision points.                            |
| Product page                | Value proposition → demonstration → proof → capabilities → objections/FAQ → primary CTA. If a purchase exists, price and terms should not require hunting.                                                   |
| Photo/story gallery         | Context/title first → gallery with stable sizing → captions where needed → related story/project. Lightbox supports keyboard, swipe, close, and next/previous.                                               |
| Chat agent                  | Launcher stays out of primary nav and content; opening creates one conversation surface with clear close/minimize; persistent state when navigating when technically appropriate.                            |

# 13. Chat/AI agent placement and behavior

An agent is a utility layer, not a decorative widget. It should be
findable without covering reading content or competing with every page
CTA.

| **Decision**           | **Recommended default**                                                                                                                                                                                  |
|------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Launcher               | Bottom-right on desktop in LTR layouts, inset from viewport and safe areas; 48–56 px visible target with ≥44 px interactive area. On mobile, ensure it clears browser/system bars and bottom navigation. |
| First-time label       | A short text label or welcome chip can establish what the icon means; do not permanently consume space once learned.                                                                                     |
| Open state desktop     | Docked panel ~360–440 px wide or centered modal for focused tasks. Avoid making article content shrink below a readable width.                                                                           |
| Open state mobile      | Full-height or near-full-height sheet/page; keyboard should not hide composer or close control.                                                                                                          |
| Dismiss                | One X/Close, same location consistently; optional minimize if maintaining the session matters. If both exist, X = close panel and minus = minimize, with clear tooltips/accessible names.                |
| Navigation persistence | Preserve the conversation when the user follows internal links if technically feasible; do not restart on every page.                                                                                    |
| Proactive prompts      | Rare and contextual. Never repeatedly pop open the panel automatically.                                                                                                                                  |
| Agent links/actions    | Preview consequences for destructive/external actions. Links follow normal tab rules unless context requires reference side-by-side.                                                                     |

# 14. Consistency system: prevent UI duplication and drift

Create a component contract for every reusable element. A “button” is
not merely a rounded rectangle; it includes semantic role, label
grammar, sizing, padding, icon placement,
hover/focus/pressed/disabled/loading states, motion, and responsive
behavior.

## 14.1 One-function / one-control rule

| **Problem**                                            | **Rule**                                                                                                                           |
|--------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------|
| Two X buttons visible                                  | Only one close affordance per surface. Nested closable surfaces should avoid opening simultaneously.                               |
| X + Back do the same thing                             | Choose the control matching the mental model: X for dismissing a temporary layer, Back for hierarchy/history.                      |
| Logo + Home icon + Home text adjacent                  | Pick one primary home affordance. Redundant global navigation should earn its space.                                               |
| Two “Contact” CTAs in the same viewport                | Keep one primary. Secondary contact options can live in context or footer.                                                         |
| Repeated Share controls top and sticky side and bottom | One persistent location plus a bottom repeat can be justified for very long articles; three simultaneous copies are usually noise. |
| Different icons for same action                        | Same function = same icon and same label across the site.                                                                          |
| Same icon for different actions                        | Avoid. Users learn by repetition; semantic collisions destroy that learning.                                                       |

## 14.2 Design tokens to define

| **Token family** | **Minimum set**                                                                            |
|------------------|--------------------------------------------------------------------------------------------|
| Space            | 4, 8, 12, 16, 24, 32, 48, 64, 80/96, 128                                                   |
| Type             | body, small, label, H3, H2, H1, display + line heights/weights                             |
| Width            | reading column, narrow form, shell, wide media                                             |
| Radius           | 2–4 semantic levels maximum                                                                |
| Borders          | default, strong, focus, error                                                              |
| Elevation        | Use sparingly; define 2–4 levels rather than arbitrary shadows                             |
| Motion           | fast feedback, standard, surface enter, surface exit, large                                |
| Z-index          | base, sticky, dropdown, overlay, modal, toast — predefined, not random integers            |
| Breakpoints      | Content-driven named ranges; maintain a documented test matrix                             |
| States           | default, hover, focus-visible, active/pressed, selected, disabled, loading, error, success |

# 15. Interaction details that make a site feel finished

- Hover is enhancement only. Every action must remain understandable on
  touch and keyboard.

- Cursor: use pointer only for actual click/tap targets; do not make
  static cards look interactive.

- Buttons trigger actions; links navigate. Do not style navigational
  links as buttons everywhere or action buttons as underlined links
  unless the context supports it.

- Loading buttons keep their width stable to avoid layout shift. Replace
  or accompany label with progress without moving nearby controls.

- Toast messages should not contain essential information that
  disappears before a user can act; errors belong near the affected
  field and in a summary where needed.

- Sticky headers should shrink or remain compact on small-height
  windows; do not occupy 20–30% of the viewport while a user reads.

- Anchor links should account for sticky headers with scroll-margin-top
  so headings are not hidden after navigation.

- Forms should preserve user input through validation errors and explain
  what to fix in plain language.

- Do not disable the browser’s pinch zoom or text zoom.

- When a click causes work longer than perceptual immediacy, show
  immediate acknowledgement and then progress/skeleton/state change; do
  not leave users wondering whether the input registered.

# 16. Suggested implementation defaults (CSS/system level)

These values are deliberately theme-neutral. They can be encoded as
design tokens and adjusted after testing while preserving the
relationships.

| **Token**         | **Default**                                                                                  |
|-------------------|----------------------------------------------------------------------------------------------|
| --space-\*        | 4, 8, 12, 16, 24, 32, 48, 64, 96, 128px                                                      |
| --page-gutter     | clamp(16px, 3vw, 64px)                                                                       |
| --shell-max       | 1280–1440px                                                                                  |
| --reading-max     | 65ch–72ch                                                                                    |
| --body-size       | clamp(1rem, 0.96rem + 0.20vw, 1.125rem)                                                      |
| --body-leading    | 1.55–1.7                                                                                     |
| --h1              | clamp(2.125rem, 1.4rem + 3vw, 4.5rem)                                                        |
| --target-min      | 44px preferred; maintain WCAG 24px minimum rules where smaller inline controls are necessary |
| --motion-fast     | 100ms                                                                                        |
| --motion-standard | 180–240ms                                                                                    |
| --motion-surface  | 240–320ms                                                                                    |
| --motion-large    | 320–400ms                                                                                    |

| **Important** Do not use breakpoints merely because they are round numbers. Start with these ranges for testing, then place a breakpoint where the component fails: text becomes too long/short, navigation wraps, media loses meaning, columns become too narrow, or excess whitespace stops contributing to hierarchy. |
|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|

# 17. Pre-launch QA matrix

| **Test**                    | **Pass condition**                                                                                           |
|-----------------------------|--------------------------------------------------------------------------------------------------------------|
| 320 px reflow               | No horizontal scroll for normal content, no clipped text/control, logical order preserved.                   |
| 360 / 390 / 430 px phones   | Primary tasks possible one-handed; chat, sticky elements, nav, and safe areas do not overlap.                |
| 600 / 768 / 840 px          | No awkward stretched-mobile state; cards, media, and sidebars transition naturally.                          |
| 1024 / 1280 / 1440 px       | Desktop navigation visible where appropriate; reading line length controlled; white space feels intentional. |
| 1920+ px                    | Content remains centered/structured; text does not become full-width; hero images do not pixelate.           |
| Foldable book posture       | No important content across hinge; two-pane enhancement works or safely falls back.                          |
| Foldable tabletop           | Controls/content remain reachable and meaningful; fold does not bisect controls.                             |
| Keyboard only               | All interactive items reachable, focus visible, modal focus contained and restored.                          |
| 200–400% zoom / larger text | No content loss, overlap, or unusable truncation; hierarchy survives.                                        |
| Reduced motion              | Nonessential scroll/parallax/zoom animations removed or substantially reduced.                               |
| Slow connection             | Reserved media space prevents jumps; useful text appears before nonessential heavy assets.                   |
| Screen reader smoke test    | Headings logical, landmarks meaningful, controls named by purpose, images have correct alt behavior.         |
| Touch targets               | No dense cluster of tiny controls; preferred interactive area ~44px, WCAG minimum/spacing respected.         |
| History navigation          | Browser Back returns users where expected; no routine forced new-tab dead ends.                              |
| Duplicates                  | No two controls visible with the same apparent function unless the repetition is intentionally justified.    |
| Performance                 | Field data target: LCP ≤2.5s, INP ≤200ms, CLS ≤0.1 at p75. \[27\]                                            |

# 18. Decision rules for ambiguous design choices

| **Question**                      | **Decision rule**                                                                                                                                                   |
|-----------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Should this be bigger?            | Increase size only if it reflects higher information priority, improves legibility, or improves target acquisition. Do not use size to compensate for unclear copy. |
| Should this be a card?            | Use a card when the content is a discrete object with its own actions/metadata. If everything is a card, remove containers and use spacing/dividers.                |
| Should this animate?              | Animate if motion explains cause, continuity, state, or provides occasional delight without delaying the task. Otherwise prefer static.                             |
| Should this be sticky?            | Sticky only if the control/context remains useful through most of the scroll. Avoid stacking multiple sticky bars.                                                  |
| Should this open a modal?         | Modal for focused, interruptive, short tasks. Dedicated page for deep content, long forms, complex navigation, or something users may want to link/bookmark.        |
| Should a link open a new tab?     | No, unless the user needs to preserve/compare the current task. If yes, indicate it. \[6\]\[7\]                                                                     |
| Should this be icon-only?         | Only if the symbol is highly familiar in context and the accessible name is present. Otherwise pair with text. \[22\]                                               |
| Should we add another breakpoint? | Only when a component’s usability or information architecture actually changes, not to chase a specific device.                                                     |
| Should an image be full bleed?    | Only when its visual impact is part of the content. Return text to the reading column afterward.                                                                    |
| Should we shorten the content?    | First improve hierarchy and scannability. Long content is acceptable when users want depth; walls of undifferentiated text are the problem.                         |

# 19. Research notes and references

Numbers below correspond to citations in the guide. Platform guidance
changes over time; URLs were checked September 2026.

**\[1\] W3C, Web Content Accessibility Guidelines (WCAG) 2.2.**
[<u>Source</u>](https://www.w3.org/TR/WCAG22/)

**\[2\] W3C, Understanding Success Criterion 1.4.10: Reflow.**
[<u>Source</u>](https://www.w3.org/WAI/WCAG22/Understanding/reflow)

**\[3\] W3C, Understanding Success Criterion 2.5.8: Target Size
(Minimum).**
[<u>Source</u>](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum)

**\[4\] Nielsen Norman Group, F-Shaped Pattern of Reading:
Misunderstood, But Still Relevant (reviewed Aug. 2026).**
[<u>Source</u>](https://www.nngroup.com/articles/f-shaped-pattern-reading-web-content/)

**\[5\] Baymard Institute, Readability: The Optimal Line Length.**
[<u>Source</u>](https://baymard.com/blog/line-length-readability)

**\[6\] Nielsen Norman Group, Opening Links in New Browser Windows and
Tabs.**
[<u>Source</u>](https://www.nngroup.com/articles/new-browser-windows-and-tabs/)

**\[7\] W3C, G200/G201: Opening new windows and tabs only when necessary
/ warning users.**
[<u>Source</u>](https://www.w3.org/WAI/WCAG22/Techniques/general/G200.html)

**\[8\] Nielsen Norman Group, Executing UX Animations: Duration and
Motion Characteristics.**
[<u>Source</u>](https://www.nngroup.com/articles/animation-duration/)

**\[9\] Apple Human Interface Guidelines, Typography and
Accessibility.**
[<u>Source</u>](https://developer.apple.com/design/human-interface-guidelines/typography)

**\[10\] Material Design, Motion: Duration & easing.**
[<u>Source</u>](https://m1.material.io/motion/duration-easing.html)

**\[11\] web.dev, Responsive and fluid typography with Baseline CSS
features.**
[<u>Source</u>](https://web.dev/articles/baseline-in-action-fluid-type)

**\[12\] Android Developers, Use window size classes.**
[<u>Source</u>](https://developer.android.com/develop/adaptive-apps/guides/use-window-size-classes)

**\[13\] Chrome for Developers, Support foldable devices with the
Viewport Segments API.**
[<u>Source</u>](https://developer.chrome.com/blog/viewport-segments-api-shipped)

**\[14\] web.dev, Optimize Interaction to Next Paint.**
[<u>Source</u>](https://web.dev/articles/optimize-inp)

**\[15\] W3C WAI, Captions/Subtitles.**
[<u>Source</u>](https://www.w3.org/WAI/media/av/captions/)

**\[16\] W3C WAI, Transcripts.**
[<u>Source</u>](https://www.w3.org/WAI/media/av/transcripts/)

**\[17\] W3C WAI, Accessibility Principles / accessible names for
non-text content.**
[<u>Source</u>](https://www.w3.org/WAI/fundamentals/accessibility-principles/)

**\[18\] Nielsen Norman Group, Concise, Scannable, and Objective: How to
Write for the Web.**
[<u>Source</u>](https://www.nngroup.com/articles/concise-scannable-and-objective-how-to-write-for-the-web/)

**\[19\] Nielsen Norman Group, Auto-Forwarding Carousels and Accordions
Annoy Users & Reduce Visibility.**
[<u>Source</u>](https://www.nngroup.com/articles/auto-forwarding/)

**\[20\] Nielsen Norman Group, Hamburger Menus and Hidden Navigation
Hurt UX Metrics.**
[<u>Source</u>](https://www.nngroup.com/articles/hamburger-menus/)

**\[21\] Nielsen Norman Group, The Hamburger-Menu Icon Today: Is it
Recognizable? (2025).**
[<u>Source</u>](https://www.nngroup.com/articles/hamburger-menu-icon-recognizability/)

**\[22\] Nielsen Norman Group, Icon Usability.**
[<u>Source</u>](https://www.nngroup.com/articles/icon-usability/)

**\[23\] web.dev, prefers-reduced-motion: Sometimes less movement is
more.** [<u>Source</u>](https://web.dev/articles/prefers-reduced-motion)

**\[24\] web.dev, Optimize Cumulative Layout Shift.**
[<u>Source</u>](https://web.dev/articles/optimize-cls)

**\[25\] Apple Human Interface Guidelines, Writing.**
[<u>Source</u>](https://developer.apple.com/design/human-interface-guidelines/writing)

**\[26\] Apple Human Interface Guidelines, Design principles.**
[<u>Source</u>](https://developer.apple.com/design/human-interface-guidelines/design-principles)

**\[27\] web.dev, How the Core Web Vitals metrics thresholds were
defined.**
[<u>Source</u>](https://web.dev/articles/defining-core-web-vitals-thresholds)

**\[28\] MDN, horizontal-viewport-segments.**
[<u>Source</u>](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@media/horizontal-viewport-segments)

**\[29\] web.dev, Screen configurations.**
[<u>Source</u>](https://web.dev/learn/design/screen-configurations)

**\[30\] Android Developers, Make your app fold aware.**
[<u>Source</u>](https://developer.android.com/develop/adaptive-apps/guides/foldables/make-your-app-fold-aware)

**\[31\] Android Developers, Tabletop posture layout with Grid and
mediaQuery.**
[<u>Source</u>](https://developer.android.com/develop/adaptive-apps/cookbook/tabletop-posture-media-query-grid)

# 20. One-page handoff: the defaults

| **Category**  | **Default**                                                                                                             |
|---------------|-------------------------------------------------------------------------------------------------------------------------|
| Body text     | 16–18 px general; 18–20 px reading-heavy desktop; 1.5–1.7 line-height; ~50–75 chars/line.                               |
| H1            | ~34–44 px narrow → 48–72 px wide, fluid/clamped.                                                                        |
| Page gutters  | 16 px narrow → 24/32 px medium → 48–80 px wide.                                                                         |
| Reading width | ~640–760 px / 65–72ch.                                                                                                  |
| Global shell  | ~1200–1440 px max, centered.                                                                                            |
| Spacing       | 4 px base, 8 px primary rhythm; 4/8/12/16/24/32/48/64/96/128 tokens.                                                    |
| Touch targets | 44×44 preferred; WCAG 2.2 AA minimum 24×24 with exceptions/spacing.                                                     |
| Motion        | 100 ms feedback; 150–200 ms desktop small; 200–300 ms surface changes; ≤400 ms routine max; reduced-motion alternative. |
| Links         | Same tab by default; new tab only for preserving/comparing task, with warning.                                          |
| Navigation    | Visible desktop nav when possible; hamburger on constrained layouts only when needed.                                   |
| Back / Close  | Back = hierarchy/history; X = dismiss temporary surface; do not duplicate same function.                                |
| Images        | Reserve dimensions/aspect ratio; responsive sources; lazy-load below fold; meaningful alt / decorative empty alt.       |
| Video         | User-initiated sound; captions; transcript; responsive player.                                                          |
| Performance   | LCP ≤2.5s; INP ≤200ms; CLS ≤0.1 at p75.                                                                                 |
| Foldables     | Adapt by window/posture; do not place important content across hinge; exploit panes only as enhancement.                |
| Content       | Front-load meaning; short paragraphs; descriptive headings; long content is fine when structured.                       |
| Icons         | Text labels for ambiguous/navigation actions; accessible names always.                                                  |
| Carousels     | No auto-forwarding important content.                                                                                   |
| Chat agent    | Bottom utility launcher; one panel; clear close/minimize semantics; do not cover navigation/content.                    |
| Consistency   | Same function = same component/label/icon/states. Avoid simultaneous duplicate controls.                                |
