# Hero Specification

## Overview
- **Target file:** `src/components/sections/hero.tsx`
- **Screenshots:** `desktop-viewport-0.png`, `mobile-viewport-0.png`, `hover-expertise-before.png`, `hover-expertise-after.png`
- **Interaction model:** static layout + hover (expertise links); media is time-driven (looping)

## DOM Structure
`section#home[h 100vh, relative, bg #000] > media layer (absolute inset 0) + text layer (absolute, bottom-left)`

## Computed Styles
### Container
- height: 100vh (900 at 1440×900); overflow hidden; background #000; color #fff

### Text block
- Top edge at y 526 of a 900px viewport, so bottom offset is 374px. Adaptation: `bottom: calc(41.5vh)` on desktop.
- Two columns: x 30 and x 378. Each column is 348px wide, with gap 0.

### Column heading ("WHO WE ARE" / "OUR EXPERTISE")
- Helvetica Neue Medium; fontSize 14px; lineHeight 14px; fontWeight 500; uppercase; color #fff

### Paragraph
- Starts 29px below the heading top (margin-top 15px after the 14px line)
- Helvetica Neue Regular 12px / 16.8px; max-width 235px; color #fff

### Expertise list
- 4 anchors, each 17px tall, stacked with no gap; Regular 12px / 16.8px
- Arrow icon: 13 × 13, absolutely positioned 17px left of the text start

## States & Behaviors
### Expertise link hover
- **Trigger:** hover on the anchor
- **State A:** arrow opacity 0; wrapper translateX(-17px), so the text sits at the column start
- **State B:** arrow opacity 1; wrapper translateX(0), so the text sits 17px to the right
- **Transition:** transform + opacity, 0.4s cubic-bezier(0.22,1,0.36,1)

### Media
- Source: looping muted cover video. **Adaptation:** full-bleed R3F `PoppyPodScene`
  - Monochrome studio lighting on a black background
  - The pod rotates slowly on the y axis (0.15 rad/s)
  - Pointer parallax: ±0.15 rad

## Text Content (adapted)
- WHO WE ARE → "Independent poppy seed supplier. Quality selected, carefully processed and reliably supplied — for distributors, food manufacturers and export buyers…"
- OUR GRADES → King / Shubh Laxmi / Shri / White Tinopal (anchors → `#grade-<id>`)

## Responsive Behavior
- **Desktop:** two columns at 30 / 378
- **Mobile (390):** one column with 20px gutters. "WHO WE ARE" sits about 433px from the top; the second group follows 42px below.
