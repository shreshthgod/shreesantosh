# SiteHeader Specification

## Overview
- **Target file:** `src/components/sections/site-header.tsx`
- **Screenshots:** `desktop-viewport-0.png`, `hover-mailto-before.png`, `hover-mailto-after.png`, `mobile-menu-open.png`
- **Interaction model:** static overlay + hover (logo, CTA) + click (mobile menu)

## DOM Structure
`header[fixed, blend difference] > div.row > (a.logo > Wordmark) + (a.cta > span.square + RollingText) + button.menu(mobile)`

## Computed Styles
### Container
- position: fixed; top: 0; left: 0; width: 100%; height: 80px; z-index: 10 (→ 40)
- mix-blend-mode: difference; background: transparent; color: #fff
- inner padding: 30px left/right, content box starts at y 30 (desktop); 20px gutters on mobile

### Logo
- Box: 211 × 21 at (30, 30). Wordmark: light geometric sans, uppercase, white.
- **Adaptation:** "SHRISANTOSH" in Jost 300, 26px, line-height 21px, letter-spacing 0.

### CTA
- Wrapper 130 × 18, right edge at x 1410.
- Square: 11 × 11, white, placed 6px left of the label.
- Label: Helvetica Neue Medium 14px, line-height 16.8px, uppercase.

## States & Behaviors
### Logo hover
- Wordmark contracts: letter-spacing 0 → -0.06em, transition 0.5s cubic-bezier(0.22,1,0.36,1)

### CTA hover
- Square translateX(0) → translateX(-40px), transition 0.45s cubic-bezier(0.22,1,0.36,1)
- Label: RollingText hover (per-letter translateY(-100%), 20ms stagger, 0.45s)

### Mobile menu (click)
- **Trigger:** "MENU" button (Medium 14px). Label toggles "MENU" ↔ "CLOSE".
- **Open state:**
  - Full-screen `#fff` overlay (z 50) with no blend mode; header text is black while the overlay is open.
  - Logo collapses to a monogram ("ST").
  - Links are Medium ~44px/1, uppercase, black. Each sits inside an `overflow: hidden` line.
  - Each link animates translateY(100%) → 0 over 0.7s cubic-bezier(0.22,1,0.36,1), with a 60ms stagger.
- Escape closes the menu; body scroll is locked while open.

## Text Content
- CTA: "ENQUIRE" (source: "LET'S TALK")
- Menu links: GRADES / PACKAGING / PROCESS / USES / CONTACT; secondary label "E-MAIL" + email placeholder

## Responsive Behavior
- ≥1024px: logo + CTA
- <1024px: logo + MENU button; CTA hidden
