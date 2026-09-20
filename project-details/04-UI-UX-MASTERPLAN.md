# 04 — UI/UX Masterplan

Target feeling: premium, calm, confident, trustworthy. Restraint rules: no glassmorphism, no gradient noise, no shadow stacking, no animation for its own sake.

## Header

- Fixed, transparent over hero (`text-cream`) → solid cream + blur after 6rem sentinel (`IntersectionObserver`, no scroll listener). Keeps hero cinematic, content readable.
- Wordmark: serif "Shree Santosh" + tracked "Traders" subline. No logo image to preserve/replace.
- Desktop nav: 7→8 items max (FAQ added); uppercase micro labels with animated underline; `aria-current` on active section via `useActiveSection`.
- CTA: gold "Enquire" over hero → forest solid after scroll. Mobile: Menu/Close toggle, numbered serif links, full-width CTA; Escape + outside-tap close, focus returned to trigger.
- Unchanged by this programme except FAQ nav entry.

## Hero

- Message: "Selected with care. Supplied with consistency." — outcome-first, two-line staggered mask reveal.
- Support: one lead sentence with grade count + pack range (data-driven, never hard-coded).
- CTAs: primary gold "Explore grades" (discovery), secondary outline "Send enquiry" (conversion). Hierarchy preserved.
- Visual: arch image (poppy pod) + inset grade close-up + floating "Quality grade / Bulk supply" badges over radial forest gradient with grain. Arch motif repeats in About — intentional brand rhyme.
- Motion: rise/line-up/settle/fade orchestra, all transform/opacity, delays ≤1s. Scroll cue with animated line (hidden on mobile to save space).

## Sections

| Section | Purpose | Layout | Interaction | CTA |
|---|---|---|---|---|
| Grades | Compare + select | Tabs left, image + spec right | Swipe, prev/next, animated crossfade, counter | Enquire about {grade} (preselects) |
| About | Credibility story | Statement + arch collage; 4 numbered benefits | Scroll reveal; link to process | See how every batch is processed |
| Packaging | Set pack expectations | Dark card; Bulk/Retail segmented control | Tab crossfade; pouch scale metaphor | Ask about packaging |
| Process | Signature trust story | Pinned stage readout + horizontal timeline (desktop); vertical rail (mobile) | Scroll-driven stage tinting | (flows into Uses) |
| Uses | Culinary relevance | 4 asymmetric tiles with custom SVG dish art | Hover/focus/tap expand disclosure | Implicit → Grades |
| FAQ `[new]` | Resolve doubts, capture SEO | Accordion list, single-open, hash-addressable | Chevron rotate, grid-rows animation | Per-answer link to enquiry |
| Enquiry | Convert | Info column + cream form card on forest | Inline validation, live status regions | Send enquiry → WhatsApp |
| Footer | Wayfinding + brand | Oversized serif wordmark, explore nav, contact | Back-to-top with lift micro-interaction | Send us an enquiry (fallback state) |

## Product Presentation

- One grade at a time (focus), tabs for comparison, persistent spec strip (standard packs / retail on-demand), feature chips with per-grade accent dot. Per-grade tints stay inside brand palette (ochre/sage/terracotta families).

## About / Trust

- Story-driven headline ("buyers who value consistency"), description from config, 6-stage count badge as proof point. No invented stats, awards, or client logos — gaps tracked in `17-WHAT-ELSE-CAN-WE-DO.md`.

## Contact

- Two-column: reassurance + live contact list (only configured channels) + grade/pack reference; form card with grouped fields, required markers, helper text, error summary with focus jump, three terminal states (WhatsApp-ready / copy-ready / error). "Not sure" options on grade + quantity so unsure buyers never stall.

## Footer

- Useful, not decorative: giant wordmark (brand memory), full anchor nav (recovery wayfinding), real contact or enquiry fallback, copyright + back-to-top. Botanical scatter kept at 10% opacity.
