# 18 — Final Project Handoff

## Overview

Shree Santosh Traders — B2B poppy-seed supplier site. Next.js 16 App Router, React 19, TS strict, Tailwind v4, 5 runtime deps. Single-page anchor site + new FAQ; WhatsApp-first enquiry; SEO foundations; branded error surfaces.

## Setup

```bash
npm install
npm run dev     # localhost:3000
npm run check   # lint + typecheck + build
```

Requires Node ≥24 (see `package.json` engines, `.nvmrc`).

## Environment

| Var | Required | Purpose |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Yes (prod) | canonical + OG absolute URLs + sitemap host, e.g. `https://www.example.com` |
| Contact fields in `src/data/site-config.ts` | Yes (launch) | `phone`, `whatsapp` (digits, e.g. `919876543210`), `email`, `address` — replace `ADD_*` placeholders |

## Important Files

- Copy/IA: `src/data/site-config.ts`, `src/data/{products,packaging,process,features,uses,faq}.ts`
- UI: `src/components/sections/*`, `src/components/{ui/button,section-heading,form-field,json-ld}.tsx`
- SEO: `src/app/{layout,robots,sitemap}.ts`, `public/site.webmanifest`
- Docs: `project-details/01–18`, `docs/research/`

## Integrations

- None server-side. Outbound only: `wa.me` deep-link (拥), `tel:`/`mailto:` when configured. No Supabase/Maps/auth present.

## Features / QA Status

- Shipped this programme: FAQ + schema, robots/sitemap/manifest/Twitter/JSON-LD, quantity symmetry, alt fixes, 404/error.
- QA: `npm run check` must be green; manual checklist in `16-QA-TESTING-CHECKLIST.md` (keyboard, SR, responsive, reduced-motion, Rich Results).
- Known limitations: leads are not stored server-side (WhatsApp handoff only); analytics not yet instrumented; contact still placeholder until owner provides.

## Deployment

Vercel recommended (`output: standalone` also Docker-ready). Set env, deploy, smoke-test: home 200 · anchors · form states · `/sitemap.xml` · `/robots.txt` · link preview. Rollback = promote previous deployment.

## Future Improvements

Prioritised backlog in `17-WHAT-ELSE-CAN-WE-DO.md`; automation specs (triggers/payloads/failure modes) in `07-AUTOMATION-MASTERPLAN.md`.
