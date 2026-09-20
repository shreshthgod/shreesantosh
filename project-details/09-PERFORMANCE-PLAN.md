# 09 — Performance Plan

## Baseline (inspected, not guessed)

- 8 `.webp` images in `public/images/` (hero, 4 grades, sacks, + 2 About photographs). Check sizes with `ls -la public/images` and convert/quality-tune anything >300 KB.
- The two About photographs are the only real photography on the site (everything else is a CGI render). Both were cropped and converted from source JPEGs: `poppy-seeds-bowl.webp` 800×1100 / 86 KB, `poppy-field-cultivation.webp` 399×399 / 28 KB. The field source is only 399 px wide — do not render it above ~200 CSS px or it will soften on retina.
- Runtime deps: 5 (`cva`, `clsx`, `lucide-react`, `next`, `react(-dom)`) — lean. No chart/carousel/animation libs.
- Fonts via `next/font` (self-hosted, subset latin) — no render-blocking Google CSS.
- Animations transform/opacity-only; no scroll listeners.

## What Was Kept / Improved

1. Hero LCP image: `loading="eager"` + `fetchPriority="high"` + constrained `sizes` — kept.
2. All below-fold imagery lazy (Next default) — kept; grades stack renders 4 images but only active is visible — acceptable, pre-cached for instant tab switches.
3. New FAQ/404/error add ~zero JS weight (FAQ is one small client component; JSON-LD is static).
4. No new dependencies installed in this programme.

## Budgets & Checks

- JS: no new client libs. If a lib is ever proposed, justify against the budgets: <200 KB first-load JS, LCP <2.5s on Moto G4/4G, CLS <0.1.
- Images: prefer `.webp`; cap display size via `sizes`; decorative SVG inline.
- Fonts: keep 2 families max; latin subset.
- Verify: `npm run build` route sizes; Lighthouse (Performance ≥90 mobile); `next/image` warnings = 0.

## Future (only if measured slow)

- `loading="lazy"` + blur placeholder for grade stack; AVIF variants; route-level code-splitting is already per-component via App Router.
