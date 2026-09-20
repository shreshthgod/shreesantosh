# 12 — Responsive Design Plan

Mobile is designed intentionally — not shrunk desktop.

## Breakpoint Strategy (Tailwind defaults)

- Base (≤640px): single column, stacked CTAs (full-width where primary), horizontal snap tab scrollers, vertical process rail, 1.25rem gutters.
- `sm` (640+): 2-col packaging/benefits, larger insets.
- `md` (768+): scroll cue appears, footer 12-col begins.
- `lg` (1024+): full multi-column (hero 7/5, grades 7/5, about 7/5), desktop nav replaces burger, pinned process timeline.
- `xl/2xl`: max-width container holds line-length; oversized footer wordmark scales with `clamp`.

## Per-Surface Notes

| Surface | Mobile | Tablet | Desktop |
|---|---|---|---|
| Header | Burger + numbered serif menu, full-width CTA | same | Inline nav + compact CTA |
| Hero | Copy first, arch visual below; badges overlap tuned (`max-w-[32rem]`) | 4/5 visual ratio | 7/5 grid, min-height `min(100svh,62rem)` |
| Grades | Snap-scroll tabs, swipe image, prev/next, counter | same | 4-up grid tabs, 7/5 explorer |
| Packaging | Segmented control full-width; retail 2-col | 3-col retail | 5/7 split, 3-col retail |
| Process | Vertical rail timeline, all stages expanded | same | Pinned readout + 6-col timeline |
| Uses | 1-col tiles, tap-to-expand | 2-col | Asymmetric 7/5 + 5/7 bento |
| FAQ `[new]` | Full-width accordion, 44px+ rows | same | 2-col: heading sticky + list |
| Enquiry | Stacked form, full-width submit | 2-col fields | 5/7 info/form split |
| Footer | Stacked, giant wordmark wraps | 12-col begins | 5/4/3 columns |

## Overflow & Touch Rules

- `overflow-hidden` on decorative sections; absolute flourishes hidden below their breakpoint (`hidden md:block`).
- No fixed-width elements > viewport; `min-w-[10.5rem]` tab chips live inside a scroller.
- Pointer handlers use `touch-pan-y` so vertical scroll never fights horizontal swipe.
- Verify at 360×640, 768×1024, 1440×900, 1920+ per QA checklist; check `scroll-padding-top` keeps anchors clear of the fixed header.
