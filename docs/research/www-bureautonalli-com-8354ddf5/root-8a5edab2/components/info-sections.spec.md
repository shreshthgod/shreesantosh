# Info Sections Specification (Packaging, Process, Uses, Enquiry, Footer)

## Overview
- **Target files:** `src/components/sections/{packaging,process,uses,enquiry,site-footer,floating-actions}.tsx`
- **Interaction model:** static + hover; the packaging chips and form are click-driven (existing logic kept)
- **Reason:** the source homepage has no equivalent sections; its studio/project pages use the same type system. These sections carry the buyer-critical business content, restyled to the source's system.

## Type & color system (from source computed styles)
- Background #fff, text #000, dividers `rgba(0,0,0,0.12)` 1px
- Section heading: Helvetica Neue Medium 14px, line-height 14px, uppercase
- Display statement (adaptation for hierarchy): Medium, clamp(28px, 3.4vw, 48px), line-height 1.05, uppercase, letter-spacing -0.01em, max 20ch
- Body: Regular 12px / 16.8px (small) and 14px / 19.6px (lead)
- Labels: Bold 12px / 14.4px, uppercase
- Gutters: 30px desktop / 20px mobile; section padding 120px top/bottom
- Grid: 4 columns at 1440; label column x 30, content from x 378 (mirrors the hero's 30 / 378 columns)
- Radius 0 everywhere; no shadows

## Hover states
- Links: RollingText
- Chips/buttons: bg transparent → #000, color #000 → #fff, transition 0.3s cubic-bezier(0.22,1,0.36,1)
- Rows (process/uses): the arrow slides in the same way as the hero expertise links (opacity 0→1, +17px)

## Reveal
- Headings and rows: translateY(24px) + opacity 0 → 0, 1 when intersecting (threshold 0.2), 0.7s cubic-bezier(0.16,1,0.3,1), 60ms stagger. Disabled with reduced motion.

## Footer
- Black (#000) band. Wordmark "SHRISANTOSH" at full width (Jost 300, ~16vw, line-height 0.8, letter-spacing -0.04em) that contracts on hover
- 4 small columns above it (Medium 12px uppercase labels, Regular 12px items)
- Mirrors the source, which repeats the wordmark header at the page end

## Responsive Behavior
- Below 1024px, the 30 / 378 split becomes a single column with a 20px gutter; the form stays two columns at ≥640px.
