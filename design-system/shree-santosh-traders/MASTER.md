# Design System — Shree Santosh Traders

The authoritative record of this site's design decisions. `src/app/globals.css` (`@theme`) is the
implementation; this file explains it. Working rules for agents are in `AGENTS.md`.

**Category:** B2B ingredient supplier · **Dials:** Variance 3/10 (centred, editorial) ·
Motion 6/10 · Density 3/10 (spacious)

---

## Implemented system

The owner rejected the plain minimal version. The site is now a **premium, colourful, editorial Indian agricultural ingredient brand**.
It uses deep forest green, cream and grain gold, with saffron, terracotta, sage and peach as intentional section and product accents.
The source of truth is `src/app/globals.css` (`@theme` tokens, `container-page`, `section-space`, `grain` and `micro-label` utilities).
The generated "Liquid Glass" style was rejected, because the owner excluded glassmorphism.
An auto-generated second palette (red CTA, Inter-only, "Exaggerated Minimalism") was removed on
2026-09-20 — it contradicted every decision above.

| Area | Decision |
|---|---|
| Colour | forest #12372A, botanical #0B2419, cream #F6F0E4, warm-white #FCFAF5, gold #C49A45, saffron #D98B3A, terracotta #B85C3D, leaf #6D8B68, sage #C9D8C4, peach #E8B99C, charcoal #172019. Gold, terracotta and leaf are decorative on light surfaces; `gold-deep` #8A6420, `terracotta-deep` #9A4A2F, `leaf-deep` #4E6B4A and `ink-muted` #4A554C carry text (≥4.5:1). |
| Rhythm | Hero forest → Grades cream → About warm-white → Packaging cream→sage gradient with a forest panel → Process shifting tints (sage, olive, green, gold, peach, forest) → Uses cream with saffron/sage/peach/forest tiles → Enquiry forest with cream form → Footer botanical. |
| Grade identity | King gold, Shubh Laxmi sage/olive, Shri terracotta, White Tinopal cream/soft gold. Used only on backdrop, number, tab line and bullets. |
| Type | Cormorant Garamond (display, italic emphasis) + Inter (UI/body). `text-hero` clamp 40→84px, `text-display` 38→64px, `text-statement` 40→80px, `text-title` 28→38px, `text-lead` 18px, `micro-label` 12px uppercase tracked. Custom sizes are registered with tailwind-merge in `src/lib/utils.ts`. Tailwind classes must be literal strings, never assembled at runtime. |
| Composition | 12-column editorial grids (7/5 splits). Arch and circle image crops, overlapping images, floating labels, oversized numbers, thin gold rules. Decor (`decor.tsx`): seed scatter, botanical stem, pod line art, growth curve, rings, all low opacity. |
| Interactions | Grades: WAI-ARIA tabs with arrow/Home/End keys, swipe, prev/next buttons and an image crossfade (1.04 out, 0.96 in). Packaging: Bulk/Retail tabs stacked in one grid cell, so the layout never jumps. Process: IntersectionObserver sentinels over the pinned range, a sticky horizontal timeline on desktop and a vertical one on mobile. Uses: tiles reveal on hover, focus or tap (`aria-expanded`). |
| Motion | Tokens: 180 / 350 / 500 / 700ms, `ease-premium` cubic-bezier(0.16,1,0.3,1). Hero load is staggered in CSS (≤1.3s total). Reveal is 700ms and applies only while scripting is enabled. Reduced motion collapses all animation and turns off smooth scroll. |
| Honesty | Success animation only when WhatsApp actually opens; otherwise an informational "ready to share" state with copy. `ADD_*` contact placeholders are hidden by `src/lib/contact.ts`. Uses illustrations are original SVGs. Product images are illustrative renders, not photographs. |

Verified 2026-09-17 on the production build: axe-core 4.13 (WCAG 2.2 AA plus best-practice) reports 0 violations at 375px and 1440px. At all 12 widths from 320px to 1920px there is no horizontal overflow, no broken images or anchors, no visible placeholders and no console errors. Weight: about 245KB JS, 75KB fonts, 71KB CSS, 78–152KB images.

---

## Motion system (added for the scroll-animation work)

One scroll system: **GSAP + ScrollTrigger + SplitText**, with **Lenis** for smooth scrolling driven
by GSAP's ticker. `motion` (`motion/react`) is permitted only for the nav pill and the tab
indicators. No second scroll library, no three.js.

### Duration and easing tokens (`:root` in `globals.css`)

| Token | Value | Used for |
|---|---|---|
| `--dur-fast` | 180ms | hovers, colour changes |
| `--dur-normal` | 350ms | tabs, nav pill |
| `--dur-premium` | 500ms | panels, image crossfades |
| `--dur-reveal` | 700ms | play-once reveals |
| `--dur-hero` | 1200ms | page-load sequence total budget |
| `--ease-premium` | `cubic-bezier(0.16, 1, 0.3, 1)` | main ease (GSAP `expo.out`) |
| `--ease-inout` | `cubic-bezier(0.65, 0, 0.35, 1)` | scrubbed moves (GSAP `power2.inOut`) |

Every **scrubbed** tween uses `ease: "none"`.

### Radius

Buttons 8px (`rounded-md`) · cards 18–24px · the one stacked panel animates its top corners
32px → 0 while scrolling.

### Rules

Big moments are scrubbed and reversible; small moments play once. Animate `transform` and
`opacity` only. Pins are desktop-only (`min-width: 1024px` **and** `min-height: 700px`).
`prefers-reduced-motion: reduce` disables Lenis, the preloader, every pin and every scrub, and
leaves the final state. Content is readable with JavaScript off.

The full rule set is in `AGENTS.md` → *Motion rules*.
