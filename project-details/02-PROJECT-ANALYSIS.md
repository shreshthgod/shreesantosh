# 02 — Project Analysis (evidence-based)

Source of truth: actual files in `src/`, `public/`, `package.json`, `next.config.ts`, `src/app/layout.tsx`. Nothing below is assumed.

## Working Well

1. **Modern, minimal stack** — Next.js 16 + React 19 + Tailwind v4, only 5 runtime deps (`package.json`). No bloat.
2. **Real design system** — `globals.css` `@theme` tokens (forest/botanical/cream/gold…), documented WCAG contrast notes, spacing/radius/shadow/type scales, `container-page` + `section-space` utilities.
3. **Strong motion discipline** — transform/opacity-only keyframes, `prefers-reduced-motion` kill-switch, reveal gated on `scripting: enabled` so no-JS still shows content.
4. **Accessibility baseline** — skip link, focus-visible styles, labelled form fields with error association, tab semantics (`use-tabs`), Escape/outside-click mobile menu, 44px targets.
5. **Data-driven content** — grades/packaging/process/uses/site-config isolated in `src/data/*` with TypeScript contracts. Easy to edit without touching UI.
6. **Thoughtful enquiry flow** — grade preselection via context, inline validation with error summary + focus jump, WhatsApp deep-link with copy fallback. Placeholders (`ADD_*`) correctly suppressed by `isConfigured`.
7. **Responsive patterns** — mobile tab scroller, swipe on grade imagery, desktop pinned process vs mobile vertical timeline.

## Problems

| # | Problem | Where | Why it matters | Priority | Complexity |
|---|---|---|---|---|---|
| P0-1 | Contact details are placeholders (`ADD_PHONE_NUMBER` etc.) — footer/contact render fallback links only | `src/data/site-config.ts`, `src/lib/contact.ts` | Site cannot convert until real contact is configured; currently "Call us" hidden | P0 | Trivial (config) |
| P0-2 | No `robots.txt` / sitemap | `src/app/` (absent) | Crawlers get no guidance; new pages undiscoverable | P0 | Low |
| P0-3 | No structured data (Organization, FAQ) | `layout.tsx` (absent) | Lost rich-result eligibility | P0 | Low |
| P1-1 | Metadata gaps: no Twitter card, no `metadataBase`-independent OG fallback, no canonical when URL unset | `src/app/layout.tsx` | Weak link previews; duplicate-URL risk | P1 | Low |
| P1-2 | No FAQ section | IA (absent) | Repeat buyer questions answered nowhere; SEO/ Featured-snippet opportunity lost | P1 | Medium |
| P1-3 | No `not-found.tsx` / `error.tsx` | `src/app/` (absent) | Dead-ends render default Next chrome, off-brand | P1 | Low |
| P1-4 | Quantity select lacks "Not sure" while grade has it | `src/components/sections/enquiry.tsx` | Asymmetric UX; unsure buyers forced into false precision | P1 | Trivial |
| P2-1 | Decorative-but-meaningful images use `alt=""` (hero seed inset, about inset) | `hero.tsx`, `about.tsx` | Screen-reader users lose context | P2 | Trivial |
| P2-2 | No `manifest`/theme + favicon beyond `icon.svg` | `src/app/`, `public/seo/` (only `.gitkeep`) | Installability/PWA polish missing | P2 | Low |
| P2-3 | Process `goToStep` scroll math + `trackRef` unused var; `inert` boolean prop needs React 19 check | `process.tsx`, `packaging.tsx` | Minor correctness/cleanliness | P2 | Low |
| P2-4 | No analytics event hooks (CTA clicks, grade views, form outcomes) | site-wide | Cannot measure conversion funnel | P2 | Medium |
| P3-1 | Uses tiles truncate to first sentence on expand | `uses.tsx` | Slight content loss on desktop hover | P3 | Low |
| P3-2 | No sticky mobile enquiry CTA | IA | Mobile conversion could be one tap closer | P3 | Low — deferred (risk of clutter; FAQ + form fixes rank higher) |

## Improvement Opportunities (condensed)

1. Real contact config + `NEXT_PUBLIC_SITE_URL` → unlocks canonical/OG/sitemap (P0).
2. SEO foundation: `robots.ts`, `sitemap.ts`, JSON-LD, Twitter metadata (P0/P1) — implemented in this programme.
3. FAQ section + FAQPage schema (P1) — implemented.
4. Form symmetry fix (P1) — implemented.
5. Alt-text + 404/error + manifest (P1/P2) — implemented.
6. Analytics + sticky CTA + testimonial pipeline — proposed, not implemented (need owner input/credentials); see `07-AUTOMATION-MASTERPLAN.md` and `17-WHAT-ELSE-CAN-WE-DO.md`.
