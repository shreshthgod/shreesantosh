# 03 — Feature Bible

Every feature has a real buyer purpose. No gimmicks. Status tags: `[shipped]` exists · `[new]` added in this programme · `[proposed]` owner decision needed.

## Core Features

| Feature | Purpose / buyer benefit | Business benefit | Location | How it works | Tech | Priority |
|---|---|---|---|---|---|---|
| Grade explorer (tabs + swipe + prev/next) `[shipped]` | Compare 4 grades side by side | Qualified enquiries | `#grades` | `use-tabs` + swipe pointer handlers + animated image crossfade | client component, existing | P0 |
| Enquire-about-this-grade preselection `[shipped]` | One tap carries grade into form | Higher completion | Grades → `#contact` | `EnquiryContext` | React context | P0 |
| Structured enquiry form + WhatsApp handoff `[shipped]` | Capture grade/qty/packing up front | Sales-ready leads | `#contact` | validate → `wa.me` deep link; copy fallback | `lib/whatsapp.ts` | P0 |
| FAQ accordion `[new]` | Answer repeat questions inline | Fewer drop-offs, SEO | `#faq` | single-open accordion, hash links | `data/faq.ts`, `sections/faq.tsx` | P1 |
| Packaging explorer `[shipped]` | Bulk vs retail clarity | Correct expectations | `#packaging` | tabbed panel, distinct visuals | `use-tabs` | P0 |

## Premium Features

| Feature | Notes | Status |
|---|---|---|
| Scroll-driven process story (pinned desktop, vertical mobile) | Signature moment of the page | `[shipped]` |
| Branded 404 + error boundary with recovery CTA | Off-brand dead-ends removed | `[new]` |
| SEO foundation (robots, sitemap, JSON-LD, Twitter cards, manifest) | Discoverability + rich previews | `[new]` |
| Grain texture + botanical line-art system | Tactile premium feel without image weight | `[shipped]` |

## UX Features

- Skip link, error summary with focus jump, helper text preserved alongside errors, `aria-invalid` wiring `[shipped]`.
- "Not sure" quantity option symmetrical with grade `[new]`.
- Meaningful alt text on all content images `[new]`.
- Single-open FAQ with `aria-expanded`/`aria-controls`, buttons ≥44px `[new]`.

## Conversion Features

- Contextual CTA in every section (Explore grades / Ask about packaging / Enquire about X) `[shipped]`.
- FAQ → enquiry cross-links per answer `[new]`.
- Contact fallback states never show placeholders `[shipped]`.
- Proposed: sticky mobile "Enquire" bar after hero (deferred — needs design sign-off to avoid clutter).

## Trust Features

- 6-stage process with per-stage details `[shipped]`.
- Precise pack/grade specifications, no superlatives `[shipped]`.
- FAQ states MOQ/pack realities honestly ("standard supply is 25/50 kg") `[new]`.
- Proposed: certifications, lab reports, testimonial pipeline — only with verified owner assets (never fabricate).

## Engagement Features

- Uses explorer (culinary tiles) `[shipped]`; scroll reveals `[shipped]`; FAQ deep-linkable items `[new]`.

## Automation Features

See `07-AUTOMATION-MASTERPLAN.md`. Shipped now: none requiring credentials. Proposed: lead logging, email/WhatsApp notifications, uptime + broken-link checks, analytics events (documented with triggers/payloads, awaiting owner keys).

## Future Features

1. Server-side enquiry API + email + CRM logging (replaces pure WhatsApp handoff).
2. Multi-language (Hindi/Bengali for posto belt) — content-gated.
3. Price/MOQ configurator — only if owner publishes pricing policy.
4. Testimonials + lab-report library — only with verified assets.
