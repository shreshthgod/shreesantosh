# 05 — Design System

Implemented in `src/app/globals.css` (`@theme`) + `src/components/ui/button.tsx` + `src/components/section-heading.tsx` + `src/components/form-field.tsx`. This file documents the contract; do not invent new colors.

## Colors

| Token | Hex | Role | Contrast |
|---|---|---|---|
| forest | `#12372a` | Primary surface / text on light | cream on forest 11.5:1 |
| botanical | `#0b2419` | Deep footer / dark card base | — |
| cream | `#f6f0e4` | Page background | charcoal on cream 15:1 |
| warm-white | `#fcfaf5` | Cards on cream | — |
| gold | `#c49a45` | Accent (dark bg), hairlines | gold on forest 5.0:1 |
| gold-bright | `#d4ae5e` | Hover on gold | — |
| gold-deep | `#8a6420` | Accent text on light (≥4.5:1) | — |
| saffron | `#d98b3a` | Retail/culinary accent | decorative only |
| terracotta / deep | `#b85c3d` / `#9a4a2f` | Errors, warm grade tint | deep carries text |
| leaf / leaf-deep | `#6d8b68` / `#4e6b4a` | Success-adjacent, form borders | deep carries text |
| olive-deep | `#5b6630` | Secondary grade tint text | — |
| sage | `#c9d8c4` | Soft tint blocks | — |
| peach | `#e8b99c` | Culinary tile | — |
| charcoal | `#172019` | Body text | — |
| ink-muted | `#4a554c` | Secondary text (6.8:1 on cream) | — |
| cream-muted | `#cfc8b6` | Secondary text on dark (7.9:1) | — |

Rule: bright accents are decorative; `-deep` variants carry text. Full notes in the `globals.css` header comment.

## Typography

- Display/serif: Cormorant Garamond 500/600 (+italic) via `next/font` (`--font-cormorant`). Body/UI: Inter (`--font-inter`).
- Scale: `hero` clamp(2.5→5.25rem, lh .98) · `statement` clamp(2.5→5rem) · `display` clamp(2.375→4rem) · `title` clamp(1.75→2.375rem) · `lead` 1.125rem/1.65 · `micro` .75rem/uppercase/.16em tracking.
- Serif italic `<em>` in gold/forest is the signature emphasis — use once per headline max.

## Spacing / Radius / Shadow

- Container: `container-page` (max 82.5rem; 1.25/2/3rem gutters). Section rhythm: `section-space` (4.5/6/7.5rem).
- Radius: sm 8 · md 12 · lg 18 · xl 24. Buttons md, cards lg/xl, arch imagery full-top.
- Shadows: `soft` (hero/arch), `lift` (badges/overlaps), `card` (tabs). One shadow per composition; never stacked.

## Buttons

Variants: `gold` (primary on dark) · `forest` (primary on light) · `outlineCream` · `outlineForest`. Sizes md (h-12) / lg (h-14). Uppercase .8125rem/.12em, arrow translates on hover, `-translate-y-0.5` lift + shadow; disabled 60% opacity; `motion-reduce` disables lift.

## Cards / Forms / Icons

- Cards: warm-white on cream with hairline border; dark cards botanical/forest with cream/15 borders. Spec chips: hairline + accent dot.
- Forms: h-12 controls, leaf/70 border → forest focus + gold halo (`rgb(196 154 69/.28)`); error: terracotta-deep border + tinted halo; labels semibold forest with `(optional)` muted suffix; errors with icon + `id-error` association.
- Icons: Lucide only (`icons.tsx` maps domain → icon). Custom SVG limited to brand decor (`decor.tsx`) and dish illustrations (`illustrations.tsx`). Never mix icon families.
