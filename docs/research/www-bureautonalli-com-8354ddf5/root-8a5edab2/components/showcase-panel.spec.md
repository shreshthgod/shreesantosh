# ShowcasePanel Specification

## Overview
- **Target file:** `src/components/sections/showcase.tsx`
- **Screenshots:** `scroll-900.png`, `scroll-1350.png`, `scroll-1850.png`, `desktop-full.png`
- **Interaction model:** **scroll-driven via CSS `position: sticky` only**. No JS, no click tabs.

## DOM Structure
```
section#grades
  article.panel × N   (relative, height ≈106vh)
    div.media          (absolute inset 0; R3F scene, mounted when near viewport)
    div.label-track    (absolute inset 0, z 2, mix-blend-difference, pointer-events none)
      div.sticky       (sticky top 0, h 100vh, flex items-center, px 30)
        div.info (left)   Name / Descriptor / Packs
        a.view   (right)  "ENQUIRE" + cross icon
```

## Computed Styles
### Panel
- Height: the source block is ~954px at a 900px viewport and its media is ~963px, so height ≈ 106vh
- Background: #000 (under media); width 100vw; no gap between panels

### Sticky label layer
- position: sticky; top: 0; height: 100vh; z-index: 2; mix-blend-mode: difference; color #fff
- Info bar: vertically centered (y 426–473 of 900), with padding 0 30px

### Info (left)
- Line 1 (client → grade name): Helvetica Neue Bold 12px / 14.4px, 700, uppercase
- Line 2 (project → descriptor): Regular 12px / 14.4px, uppercase, 3px top gap (y 443)
- Line 3 (year → packs): Regular 12px / 14.4px, 2px top gap (y 459)

### View (right)
- Hit area: 70 × 50, right edge at x 1420
- Label: "VIEW" → "ENQUIRE", Medium 12px/14.4px, uppercase
- Cross icon: 10 × 10 (1px strokes), 10px after the label, centered in a 30px icon box

## States & Behaviors
- **Scroll:** the label stays at viewport center for the whole time its panel's media is on screen, then scrolls away with the panel's bottom edge as the next label arrives. This is pure CSS sticky inside an absolutely positioned full-height track.
- **Hover (view):** cross rotates 0 → 90deg over 0.45s cubic-bezier(0.22,1,0.36,1); label uses RollingText
- **Click (view):** sets the enquiry grade/packing selection and scrolls to `#contact`

## Per-Panel Content (adapted; replaces source client work)
| # | Name (bold) | Descriptor | Packs line | Scene |
|---|---|---|---|---|
| 1 | KING | Super fine — premium selected grade | 25 KG · 50 KG | SeedMacro, slate |
| 2 | SHUBH LAXMI | Super fine — commercial grade | 25 KG · 50 KG | SeedMacro, warm |
| 3 | SHRI | Super fine — standard grade | 25 KG · 50 KG | SeedPile, neutral |
| 4 | WHITE TINOPAL | Super fine — specialty white variety | 25 KG · 50 KG | SeedMacro, white |
| 5 | BULK PACKAGING | 25 KG and 50 KG sacks — retail packs on demand | 50 GM – 2 KG | SackStack |
| 6 | FARM TO EXPORT | Sourced, cleaned, sorted, graded | 6 controlled stages | SeedStream |

## Responsive Behavior
- **Mobile:** same mechanics. Gutter 20px; the info bar stays centered; the view hit area shrinks to its label.
