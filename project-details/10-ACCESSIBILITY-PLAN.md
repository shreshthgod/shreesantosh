# 10 — Accessibility Plan

Target: strong practical baseline (WCAG 2.2 AA-oriented), verified by keyboard + reader pass, not a certificate claim.

## Shipped Baseline (kept)

- Skip-to-content link, single H1, labelled sections (`aria-labelledby`), landmark header/main/footer.
- Visible `:focus-visible` (gold-deep; gold-bright on dark).
- Form: real `<label>`, `aria-invalid`, `aria-describedby` → error/helper, error summary `role="alert"` + focus to first invalid field.
- Tabs use proper `tablist/tab/tabpanel` wiring (`use-tabs`); mobile menu: `aria-expanded/controls`, Escape close, focus return, outside-tap close.
- Touch targets ≥44px (h-11+ controls); contrast pairs documented in `globals.css` (body text ≥4.5:1).
- Reduced-motion kill-switch + no-JS content visibility.

## Fixed in This Programme

1. Empty `alt=""` on content images (hero inset, about inset) → descriptive alts.
2. FAQ accordion: native `<button>` + `aria-expanded/controls`, region roles, single-open, hash-addressable without breaking focus.
3. 404/error pages keep skip link + landmarks + recovery CTAs (no dead-ends for SR users).

## Manual QA Script (see also `16-QA-TESTING-CHECKLIST.md`)

1. Keyboard-only: Tab through header → hero → grades tabs/arrows → packaging tabs → process buttons → uses disclosures → FAQ → form → footer. Every control reachable, focus always visible, Esc closes menu.
2. Screen reader (NVDA/VoiceOver): headings outline sane; tabs announce selected; form errors announced via alert; status regions (`role="status"`) announce WhatsApp/copy outcomes.
3. 200% zoom + 360px width: no clipped text, no horizontal scroll.
4. `prefers-reduced-motion`: full journey completable, content visible, no essential info conveyed by motion alone.
5. Contrast spot-check new FAQ/404 surfaces against `05-DESIGN-SYSTEM.md` pairs.
