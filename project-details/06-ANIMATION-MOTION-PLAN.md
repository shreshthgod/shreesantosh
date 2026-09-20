# 06 — Animation & Motion Plan

Principle: motion explains hierarchy and cause→effect. Everything is transform/opacity; nothing layout-thrashing; nothing continuous except the hero scroll cue.

## Inventory

| Surface | Animation | Spec |
|---|---|---|
| Hero entrance | rise / line-up (masked) / settle / fade | 900ms premium ease `cubic-bezier(.16,1,.3,1)`, staggered 80→1000ms |
| Scroll reveal | `.reveal` hidden→visible | 700ms, once (observer disconnects), `translateY(20px)` + fade |
| Grade change | image crossfade + scale, panel slide-in | 500ms; outgoing scales 1.04→0, incoming settles |
| Packaging tabs | layered grid crossfade | 500ms, `translateY(12px)` + fade |
| Process | stage tint crossfade, progress scaleX, number pop | 500ms color transitions; progress bar `scaleX` |
| Uses tiles | zoom art, lift title, grid-rows expand | 350–500ms premium ease |
| Buttons/links | lift + arrow nudge + underline grow | 350ms normal |
| Mobile menu / form status | panel-in | 450ms |
| Success check | pop + stroke draw | 500ms + 180ms delay |
| Scroll cue | scaleY loop | 2.4s, hero only |

## Performance Rules

1. Animate `transform`/`opacity` (and `color`/`background-color` for tints) only.
2. One-shot reveals disconnect observers; no scroll listeners (header uses `IntersectionObserver`).
3. Images: crossfading stack pre-renders all 4 grade images — acceptable (4 optimized `.webp`); do not add more layers.
4. No parallax, no blur animation, no scroll-jacking.

## Reduced Motion

- Global kill-switch in `globals.css` (`prefers-reduced-motion: reduce`): all animations collapse to ~1ms; `.reveal[hidden]` forced visible.
- `process.tsx` `goToStep` switches to `behavior: auto` under reduced motion.
- Smooth scrolling only under `no-preference`.
- Outcome: full content + full function with zero motion. Verified in QA checklist.
