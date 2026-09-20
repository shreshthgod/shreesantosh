# 13 — Component Architecture

## Current Map

```
src/app/
  layout.tsx        metadata + fonts + skip link + JsonLd
  page.tsx          EnquiryProvider > Header + main(7 sections) + Footer
  robots.ts [new]   sitemap.ts [new]   not-found.tsx [new]   error.tsx [new]
src/components/
  ui/button.tsx     Button + ButtonLink (cva variants)
  section-heading.tsx  Eyebrow + SectionHeading
  form-field.tsx    FormField + controlClass
  enquiry-context.tsx  grade preselection context
  reveal.tsx + hooks/use-reveal.ts   one-shot scroll reveal
  hooks/use-active-section.ts · use-tabs.ts
  icons.tsx / decor.tsx / illustrations.tsx   icon + brand art systems
  json-ld.tsx [new]  typed JSON-LD script
  sections/ hero · grades · about · packaging · process · uses · faq [new] · enquiry · site-header · site-footer
src/data/  site-config · products · packaging · process · features · uses · faq [new]
src/lib/   utils(cn) · contact · whatsapp
src/types/ business.ts (+ Faq in faq.ts / business.ts)
```

## Principles

1. Sections own layout; `data/*` owns copy; `types` owns contracts. Copy edits never require UI edits.
2. Small client islands (`"use client"` only where state/observers needed: header, grades, packaging, process, uses, faq, enquiry). Everything else is a Server Component.
3. Shared primitives over duplication: `Button(Link)`, `Eyebrow/SectionHeading`, `FormField`, `Reveal`, `useTabs`.
4. No giant components: largest (enquiry ~300 lines, process ~220) are cohesive single-responsibility flows; further splits would add indirection without benefit.

## Changes in This Programme

- `data/faq.ts` + `sections/faq.tsx`: accordion + FAQPage schema source; nav entry in `site-config.ts`.
- `components/json-ld.tsx`: dedupe-safe `<script type="application/ld+json">` helper.
- `app/(robots|sitemap|not-found|error)`: platform-native SEO/error surfaces.
- `enquiry.tsx`: quantity "Not sure" option (symmetry with grade).

## Do-Not Rules

- No new state libs, no CSS-in-JS, no icon families beyond Lucide + brand SVG.
- No prop-drilling grade state — context stays. No fetching layer until a backend exists.
