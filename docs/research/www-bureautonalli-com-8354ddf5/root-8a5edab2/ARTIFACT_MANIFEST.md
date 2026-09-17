# Artifact Manifest — bureautonalli.com `/` → Shrisantosh Traders `/`

## Source assets discovered (not downloaded)
| Asset | Count | Decision |
|---|---|---|
| CGI project films (`<video>`, framerusercontent posters) | 9 | **Not reused.** These are third-party client works (YSL Beauty, Miu Miu, Ralph Lauren, Louis Vuitton, Azzaro, Balenciaga, L'Oréal) and brand marks. They were replaced by original real-time three.js models. |
| Cross icon SVG (`8ffkKdHpwMQoCDsTGmPfmYUicac.svg`, 10×10) | 8 uses | Redrawn as a generic plus mark: `CrossIcon` in `src/components/tonalli-icons.tsx` |
| "BUREAU TONALLI" wordmark / "BT" monogram | 1 | **Not reused** (brand identity). Replaced by a "SHRISANTOSH" / "ST" wordmark set in Jost 300. |
| Helvetica Neue (Framer-hosted, licensed) | 4 weights | **Not self-hosted.** The stack prefers a locally installed Helvetica Neue, then Inter via `next/font`. |
| Copy (studio blurb, expertise list, project names) | — | **Not reused.** All copy comes from the Shrisantosh Traders content in `src/data/*` (sourced from `/home/makan/shree/shri-traders`). |

## Techniques reproduced (behavior, not assets)
- Lenis smooth scroll
- `mix-blend-mode: difference` on the fixed header and bottom nav
- Per-letter rolling text: `text-shadow` duplicate plus a staggered `translateY(-100%)`
- Arrow slide-in hover (+17px, opacity 0 → 1)
- CTA square shift (-40px) on hover
- Sticky labels centered in the viewport over full-bleed media, masked per panel with `clip-path: inset(0)` and a ±100vh sticky track
- Full-screen white mobile menu with masked, staggered line reveals
- Live local-time clock (IST instead of Paris)

## Generated / original media
| Scene | File | Notes |
|---|---|---|
| Poppy pod | `src/components/three/poppy-pod-scene.tsx` | Procedural lathe with ribs and a crown; clay-like physical material |
| Seed close-up × 3, seed pile × 1 | `src/components/three/seed-field-scene.tsx` | Instanced kidney-shaped seeds in cream tones |
| Bulk sacks | `src/components/three/sack-stack-scene.tsx` | Rounded-box sacks with a procedural jute bump texture and original "SHRISANTOSH" stencil labels |
| Seed stream | `src/components/three/seed-stream-scene.tsx` | Particle stream falling onto a mound |

- No Atlas Cloud generation was used, and no network HDRIs: lighting is procedural (drei `Lightformer`).
- Seed colour is an assumption: cream/tan, typical of Indian khus khus. Confirm against the business's actual grades.

## QA captures
- `docs/design-references/www-bureautonalli-com-8354ddf5/root-8a5edab2/qa/`: desktop 1440, mobile 390, hover, form, and menu states
