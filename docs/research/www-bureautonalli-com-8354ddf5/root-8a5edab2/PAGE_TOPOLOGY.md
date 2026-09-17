# Page Topology — bureautonalli.com `/` → Shrisantosh Traders `/`

## Output plan
| Item | Value |
|---|---|
| Source URL | `https://www.bureautonalli.com/?ref=minimal.gallery`. `ref` is a tracking param, not stateful, so the source is `/` |
| App root | `.` (single app) |
| site-key | `www-bureautonalli-com-8354ddf5` |
| page-key | `root-8a5edab2` |
| Route | `/` → `src/app/page.tsx`. It updates the Shrisantosh build from earlier in this session, at the user's request ("apply effect and animations and models") |
| Components | `src/components/sections/*` (existing business namespace, kept) + `src/components/three/*` |
| Screenshots | `docs/design-references/www-bureautonalli-com-8354ddf5/root-8a5edab2/` |

## Source order (top → bottom)
1. **Header** — fixed overlay, difference blend, z 10
2. **Hero** — 100vh, video bg, two-column text block bottom-left
3. **Bottom nav + clock** — fixed overlay, difference blend, z 10 (desktop only)
4. **Project blocks × 8** — media plus a sticky centered info label (scroll-driven)
5. Repeated header wordmark at page end (footer-like)
6. **Mobile menu** — full-screen white overlay (click-driven)

## Adapted order (same mechanics, original content and models)
1. **Header**: "SHRISANTOSH" wordmark (contract/expand on hover); "■ ENQUIRE" CTA with square shift and rolling label → `#contact`
2. **Hero**: full-bleed 3D poppy-pod model. "WHO WE ARE" + blurb; "OUR GRADES" list with arrow-slide hover → grade panels
3. **Bottom nav** (fixed, difference): GRADES / PROCESS / CONTACT with rolling text, and "INDIA" + live IST clock
4. **Showcase panels × 6** (sticky centered label over scrolling 3D media). Each maps to a Tonalli project block:
   - King: dark slate seed macro
   - Shubh Laxmi: warm-lit seed macro
   - Shri: neutral seed pile
   - White Tinopal: pale seeds on white
   - Bulk packaging: sack stack
   - Farm to export: falling seed stream

   Label: name (Bold) / descriptor (Regular) / pack sizes (Regular) · right "ENQUIRE +"
5. **Info sections** on white, in Tonalli's type system (Medium 14 uppercase headings, Regular 12–14 body, 30px gutters): Packaging, Process, Uses
6. **Enquiry**: form restyled to the black/white system; WhatsApp logic unchanged
7. **Footer**: giant wordmark row + small uppercase columns
8. **Floating actions**: kept, restyled square/black

## Layers
- z 50: mobile menu overlay
- z 40: header, bottom nav (both `mix-blend-difference`, `pointer-events` only on children)
- z 30: floating actions
- z 2: sticky labels inside panels
- z 0: 3D canvases (mounted only while near the viewport, so at most about 2 WebGL contexts are live)
