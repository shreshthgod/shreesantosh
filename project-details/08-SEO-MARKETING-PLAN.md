# 08 — SEO & Marketing Plan

## Status Before → After (this programme)

| Item | Before | After |
|---|---|---|
| Title/description | ✅ present | kept |
| Canonical | only when `NEXT_PUBLIC_SITE_URL` set | kept + documented; sitemap uses same base with safe fallback |
| Open Graph | basic | ✅ + `images` alt, `siteName`, locale |
| Twitter cards | ❌ | ✅ `summary_large_image` `[new]` |
| robots | ❌ | ✅ `src/app/robots.ts` (allow all, sitemap ref) |
| Sitemap | ❌ | ✅ `src/app/sitemap.ts` (anchors as fragment URLs) |
| Structured data | ❌ | ✅ Organization + WebSite + FAQPage JSON-LD |
| Manifest/theme | ❌ | ✅ `site.webmanifest` + theme-color |
| Semantic HTML | ✅ single H1, section-labelled | ✅ + FAQ heading hierarchy |
| Image alts | 2 empty content alts | ✅ fixed |

## Keyword Map (use real vocabulary only)

- Primary: "poppy seeds supplier", "bulk poppy seeds", grade names (King, Shubh Laxmi, Shri, White Tinopal).
- Secondary: "poppy seeds 25kg 50kg", "export poppy seeds", "posto wholesale", "white poppy seeds".
- Never claim: "best/leading/#1", certifications, origins — none verified.

## Structured Data

- `Organization` (name, description, url when configured) + `WebSite` in `layout.tsx` via `JsonLd` component.
- `FAQPage` emitted by the FAQ section from the same `faqs` data source (single source of truth — no drift).
- Future: `Product`/`Offer` per grade only when pricing/availability policy is published.

## Local SEO (when owner provides address)

Add `PostalAddress` + `openingHours` + geo to Organization JSON-LD; create Google Business Profile; keep NAP identical everywhere. Do not invent an address.

## Content/Marketing Next Steps

1. FAQ answers target long-tail queries ("What pack sizes…?", "Do you export…?").
2. Add a "Buyer's guide" note per grade (application-fit) — owner-reviewed.
3. Collect 3–5 verifiable buyer quotes → `Review` schema (only with written permission).
4. Set `NEXT_PUBLIC_SITE_URL` in production — unlocks canonical + OG absolute URLs + sitemap host.
