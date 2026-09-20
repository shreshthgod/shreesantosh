# 16 — QA & Testing Checklist

## Functional

- [ ] All nav anchors scroll to correct sections with header offset (`scroll-padding-top`).
- [ ] Active-section highlight follows scroll; mobile menu opens/closes (tap, Escape, outside-tap, resize ≥lg).
- [ ] Grades: tabs, prev/next, swipe (<−50px/>+50px), counter, "Enquire about X" preselects grade in form.
- [ ] Packaging: Bulk/Retail tabs swap panels; `inert` hides inactive panel from AT.
- [ ] Process: desktop stages advance on scroll; timeline buttons jump; mobile rail highlights on scroll.
- [ ] Uses tiles: click/Enter/Space toggles; `aria-expanded` syncs; only hover-relevant content on desktop.
- [ ] FAQ: single-open; hash link (`#faq-id`) opens item; keyboard fully operable.
- [ ] Enquiry: empty submit → error summary + focus to first invalid; invalid phone/email messages; valid submit → WhatsApp tab (configured) or copy panel (unconfigured); copy button writes clipboard; error state on exception.
- [ ] Placeholders: with `ADD_*` config, no tel:/mailto:/wa.me links render.
- [ ] 404 route + simulated error render brand pages with working CTAs.

## Visual

- [ ] No horizontal overflow at 360px; arch/badges don't collide; footer wordmark wraps.
- [ ] Type scale + spacing consistent; one shadow per composition; gold `<em>` once per headline.
- [ ] Images: no broken assets; hero eager, rest lazy; OG image resolves.

## Responsive / Browser

- [ ] 360×640, 768×1024, 1440×900, 1920+: nav, hero, grids, forms, FAQ all intact.
- [ ] Chrome, Edge, Firefox, Safari (or Safari-consideration notes): no console errors.

## Accessibility

- [ ] Full keyboard run (see `10-ACCESSIBILITY-PLAN.md` script); focus always visible.
- [ ] NVDA/VoiceOver: landmarks, tabs, errors, status regions announced.
- [ ] Contrast: new surfaces spot-checked; 200% zoom clean.
- [ ] `prefers-reduced-motion`: journey completable, reveals visible.

## Performance / SEO

- [ ] `npm run build`: 0 errors, route sizes sane; `npm run lint` + `typecheck` green.
- [ ] `/robots.txt`, `/sitemap.xml`, `/site.webmanifest` return 200.
- [ ] Rich Results Test: Organization + FAQPage valid; link-preview cards render.
- [ ] Lighthouse mobile: Perf ≥90, A11y ≥95, BP ≥95, SEO 100 (target).
