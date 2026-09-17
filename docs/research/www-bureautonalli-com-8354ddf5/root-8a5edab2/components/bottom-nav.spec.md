# BottomNav + RollingText + Clock Specification

## Overview
- **Target files:** `src/components/sections/bottom-nav.tsx`, `src/components/rolling-text.tsx`, `src/components/live-clock.tsx`
- **Screenshots:** `hover-nav-before.png`, `hover-nav-mid.png`, `hover-nav-after.png`, `scroll-1350.png`
- **Interaction model:** fixed overlay; hover (rolling letters); time-driven clock (1-minute tick)

## DOM Structure
`nav[fixed bottom, blend difference] > (a > RollingText) × 3 + div.clock > (span "INDIA") + (span HH:MM)`

## Computed Styles
### Container
- position: fixed; left 0; right 0; bottom 0; z-index 10 (→ 40); mix-blend-mode: difference; pointer-events: none (children: auto)
- The text row's top edge sits at y 863 of 900, so the text baseline is about 23px above the viewport bottom. Adaptation: padding 0 30px 23px.

### Links
- Left edges at x 30, 208, 378 (columns 178px / 170px wide)
- Helvetica Neue Medium 14px, uppercase, white

### RollingText (verbatim technique from source CSS)
```
.inner { display:flex; overflow:hidden; width:max-content; text-transform:uppercase;
         --lh: 16.8px; text-shadow: 0 var(--lh) 0 currentColor; }
.inner span { display:block; white-space:pre; line-height:1.2em; backface-visibility:hidden; }
```
- **Hover:** each span gets transform translateY(-100%); transition transform 0.45s cubic-bezier(0.22,1,0.36,1); transition-delay i × 20ms
- **Leave:** back to translateY(0) with the same stagger

### Clock
- Right-aligned, ending at x 1410. "PARIS" + gap 10px + "HH:MM"; Medium 14px, line-height 1, white
- **Adaptation:** "INDIA" + 24-hour IST time (`Asia/Kolkata`), updated every 15s

## Text Content
- GRADES → `#grades`, PROCESS → `#process`, CONTACT → `#contact` (source: PROJECTS / INSIGHTS / STUDIO)

## Responsive Behavior
- Hidden below 1024px (the source hides it on mobile)
