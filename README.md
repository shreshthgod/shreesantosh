# Shree Santosh Traders

Marketing and enquiry website for **Shree Santosh Traders**, a supplier of quality-graded poppy seeds
(King · Shubh Laxmi · Shri · White Tinopal) in bulk and retail packs.

Single-page anchor site with a WhatsApp-first enquiry flow and an email fallback, so no lead is lost.

## Stack

| Area | Choice |
|---|---|
| Framework | Next.js 16 (App Router, Turbopack), React 19, TypeScript strict |
| Styling | Tailwind CSS v4 — brand tokens in `src/app/globals.css` (`@theme`) |
| Type | Cormorant Garamond (display) + Inter (UI/body) via `next/font/google` |
| Icons | lucide-react, plus original SVGs in `src/components/decor.tsx` and `illustrations.tsx` |
| Hosting | Vercel, Node 24 |

## Commands

```bash
npm install
npm run dev        # dev server
npm run build      # production build
npm run lint       # ESLint
npm run typecheck  # tsc --noEmit
npm run check      # lint + typecheck + build (run before every commit)
```

## Environment

Copy `.env.example` to `.env.local` and fill it in. Set the same variables in Vercel →
Settings → Environment Variables.

| Variable | Required | Purpose |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | yes | Canonical URL, Open Graph image URLs, sitemap host |
| `RESEND_API_KEY` | yes | Sends enquiry emails from the `sendEnquiry` Server Action |
| `ENQUIRY_TO_EMAIL` | yes | Inbox that receives enquiries |
| `ENQUIRY_FROM_EMAIL` | no | Verified Resend sender; defaults to `onboarding@resend.dev` |

Without `RESEND_API_KEY` the site still works: the enquiry form falls back to the WhatsApp
hand-off and a copy-details panel.

## Layout

```
src/
  app/          routes, metadata, robots/sitemap/manifest, Server Actions
  components/
    sections/   one file per page section, in scroll order
    ui/         shared primitives
  data/         all copy and business facts (site-config, products, packaging, process, uses, faq)
  hooks/        use-active-section, use-tabs, use-reveal
  lib/          cn(), contact gating, WhatsApp message + validation
  types/        shared interfaces
public/images/  product and site imagery (WebP)
design-system/  authoritative design decisions
project-details/ planning and handoff documents
```

## Ground rules

Brand text, contact details and navigation come from `src/data/site-config.ts` — never hard-code
them in a component. Colours, type sizes and motion durations come from the `@theme` tokens in
`src/app/globals.css`. See `AGENTS.md` for the full working rules.
