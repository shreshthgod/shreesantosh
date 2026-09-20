# 07 — Automation Masterplan

No external automation is implemented without credentials. Everything below that needs a key is `[proposed]` with trigger/action/data/failure handling specified so the owner can approve.

## Lead Automation

| # | Trigger | Action | Data | Tool | Failure handling |
|---|---|---|---|---|---|
| A1 `[proposed]` | Enquiry form valid submit | POST to `/api/enquiry`: validate → store → notify | name, phone, email?, grade, qty, packing, message, UA, timestamp | Next Route Handler + Resend/SMTP + DB (Supabase/Neon) | on failure: keep WhatsApp handoff + copy fallback (current behaviour); never lose the lead client-side |
| A2 `[shipped]` | WhatsApp unavailable | Show copy-details panel | formatted enquiry text | Clipboard API | try/catch → error state message |
| A3 `[proposed]` | A1 stored | Owner notification (email + WhatsApp template) | lead summary + link | Resend + WhatsApp Cloud API | queue + retry with backoff; log failures |

Security: honeypot + rate limit (e.g. 5/min/IP) + zod validation server-side; never log full phone to console in prod; PII retention policy documented before enabling.

## Communication

- Auto-acknowledgement message template (EN + optional HI/BN) `[proposed]` — sends only after A1 success; includes reference ID and response-time expectation. No invented phone/SLA in copy until owner confirms.

## Content

- Data-driven sections already act as a flat CMS: edit `src/data/*.ts` → whole site updates `[shipped]`. Proposed: MDX/ headless CMS only when non-dev editors are required — not before.

## Analytics `[proposed]`

Instrument (privacy-friendly, e.g. Vercel Analytics/Plausible) with events:

```
cta_click { location, label } · grade_view { grade } · grade_enquire { grade }
pack_tab { mode } · process_stage { stage } · faq_open { id }
form_start · form_submit { outcome: whatsapp|copy|error } · form_field_error { field }
```

- Respects Do-Not-Track; no PII in payloads; phone/email never in analytics.

## Maintenance

| Check | How | Cadence |
|---|---|---|
| `npm run check` (lint + typecheck + build) | CI on PR | every PR `[proposed: add workflow]` |
| Broken-link scan (internal anchors + images) | `scripts/check-links.mjs` `[proposed]` | weekly |
| Dependency audit (`npm audit`, Next/RTA updates) | Dependabot `[proposed]` | weekly |
| OG/sitemap self-test (fetch + validate) | checklist item | per release |

## Deployment

- `output: "standalone"` already set (Docker-ready). Proposed: Vercel project with `NEXT_PUBLIC_SITE_URL` env, preview-per-PR, post-deploy smoke test (home 200, anchors present, form renders, sitemap/robots 200). Rollback = previous deployment promote.
