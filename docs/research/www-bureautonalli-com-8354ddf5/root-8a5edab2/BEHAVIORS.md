# Behaviors — bureautonalli.com `/`

Extracted 2026-09-17 with headless Chrome (Playwright, `/usr/bin/google-chrome`) because the Chrome MCP extension was not connected. Raw data: `docs/design-references/www-bureautonalli-com-8354ddf5/root-8a5edab2/{desktop-recon,mobile-recon,probe}.json`.

## Global
- **Builder:** Framer. No `<canvas>` / WebGL anywhere. All "3D" is pre-rendered CGI video (9 `<video>`, `loop muted`, `object-fit: cover`, posters from framerusercontent).
- **Smooth scroll:** Lenis (`<html class="lenis">`). Native scroll position, so `position: sticky` keeps working.
- **Palette:** pure `#000` and `#fff` only. Body bg `rgb(255,255,255)`. The black comes from the media.
- **Type:** Helvetica Neue (Framer-hosted, licensed).
  - Medium 14px / 14–16.8px, uppercase: headings, nav, CTA.
  - Regular 12px / 14.4–16.8px: body.
  - Bold 12px / 14.4px, uppercase: client name.
  - No letter-spacing anywhere.
- **Gutters:** 30px left/right on desktop, 20px on mobile.
- **Transitions:** Framer applies `transition: all` with JS-driven springs; there are no CSS keyframe animations.

## Header (fixed, z 10)
- `position: fixed; top: 0; height: 80px; mix-blend-mode: difference`. Content is white, so it inverts over light media (for example, it shows cyan over red raspberries).
- The logo sits at x 30, y 30, and is 211 × 21. It has `Logo_Contraction` and `Logo_Expantion` variants: on hover the wordmark letters contract/expand.
- CTA "LET'S TALK" (`mailto:`):
  - An 11 × 11 white square sits 6px left of the label. Label: Medium 14px, uppercase.
  - **Hover:** the square slides left (about 40px), widening the gap. The label rolls up one line (see rolling text below).

## Hero (100vh)
- A full-bleed looping video sits behind the text.
- Text block starts at y 526 (at 900 viewport height, that is 374px from the bottom). It has two columns at x 30 and x 378, each 348px wide:
  - "WHO WE ARE": Medium 14px/14px. The paragraph below it is 29px down, Regular 12px/16.8px, max-width about 235px, and is a link to `/studio`.
  - "OUR EXPERTISE": 4 links, Regular 12px/16.8px, one per line.
    - **Hover:** the `Arrow` (13 × 13) fades opacity 0 → 1 and the wrapper translates +17px on x, pushing the text right. Springy, about 0.3s.

## Fixed bottom navigation (z 10, `mix-blend-mode: difference`)
- Bottom row sits at y 863. Items: "PROJECTS" at x 30, "INSIGHTS" at x 208, "STUDIO" at x 378, all Medium 14px uppercase white.
- **Rolling text hover:**
  - Each letter is its own `<span>` in an `overflow: hidden` flex row.
  - `text-shadow: 0 16.8px 0 <color>` draws a copy of each letter one line below.
  - On hover each span translates `-100%` on y with a per-letter stagger (about 20ms), so a duplicate rolls into place. On leave it rolls back.
- Right side: "PARIS" plus a live `HH:MM` clock, Medium 14px, right-aligned at x 1410.

## Project list (8 blocks, scroll-driven)
- Each block is about 954px tall and holds a full-bleed media layer (100vw × about 963px, `object-fit: cover`).
- Each block has an absolutely positioned **"Info Sticky"** layer: `position: sticky; top: 0; height: 100vh; z-index: 2`. The info bar sits vertically centered (y 426–473 of 900).
  - Left column, three stacked lines:
    - Client: Bold 12px/14.4px, uppercase
    - Project name: Regular 12px/14.4px, uppercase
    - Year: Regular 12px/14.4px
  - Right side: "VIEW" (Medium 12px, uppercase) plus a 10 × 10 cross icon at x 1400. The pair is a 70 × 50 hit area.
  - The info text is white with difference blending, so it reads black over white parts of the media.
- **Interaction model:** scroll-driven, using only CSS sticky. The label stays pinned at viewport center while its own media scrolls underneath, then hands off to the next project's label. No click tabs.
- Hovering a block produced no measurable style change on the info bar. The whole block is a link.

## Mobile (390px)
- The header shows the logo (full wordmark, 20px gutter) and "MENU" (Medium 14px) on the right.
- Hero text stacks into one column: "WHO WE ARE" at y about 433, then "OUR EXPERTISE" below. The fixed bottom nav is hidden.
- **Menu open:**
  - A full-screen white overlay appears. The logo collapses to the monogram "BT", and "MENU" becomes "CLOSE".
  - Links appear as huge uppercase (about 44px Medium, line-height about 1): PROJECTS / INSIGHTS / STUDIO / CONTACT.
  - Each link is revealed by a clip mask sliding up with a stagger. It was captured mid-reveal: letters cut off by the mask.
  - An "E-MAIL" label follows below.

## Adaptation notes (Shrisantosh Traders)
- Bureau Tonalli's CGI videos and client names (YSL, Miu Miu, LV, etc.) are third-party copyrighted client work and brand marks. **They are not downloaded or reused.** The media layer is replaced with original real-time three.js models (poppy pod, seed macro field, bulk sacks, seed stream).
- Helvetica Neue is licensed and served only from Framer's CDN. The stack prefers a locally installed `Helvetica Neue`, then falls back to Inter.
