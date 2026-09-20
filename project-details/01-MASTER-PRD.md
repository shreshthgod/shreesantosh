# 01 — Master PRD: Shree Santosh Traders

## Project Overview

| Item | Value |
|---|---|
| Project name | Shree Santosh Traders |
| Business type | B2B bulk commodity supplier — quality-graded poppy seeds |
| Product | Poppy seeds in 4 grades: King, Shubh Laxmi, Shri, White Tinopal |
| Stack | Next.js 16 (App Router) · React 19 · TypeScript strict · Tailwind CSS v4 · shadcn/ui patterns · Lucide icons |
| Page model | Single-page anchor site (`src/app/page.tsx`): Hero → Grades → About → Packaging → Process → Uses → Enquiry → Footer |
| Purpose | Turn qualified visitors (distributors, food businesses, export buyers) into enquiries via a WhatsApp-first contact flow |

**Core value proposition:** "Quality selected. Carefully processed. Reliably supplied." — graded selection, controlled 6-stage processing, dependable bulk supply (25/50 kg standard, 50 g–2 kg on demand).

## Problem Statement

- Buyers of bulk poppy seeds cannot easily verify grade consistency, processing rigour, or pack flexibility from a generic listing.
- The site solves this by showing the 4 grades with specs, the 6-stage process (purchase → export), packaging options, culinary relevance, and a structured enquiry form that captures grade + quantity + packing up front — so first contact is already qualified.
- Trust is earned through process transparency, precise pack/grade data, and a low-friction enquiry path (WhatsApp deep-link + copy-details fallback). No fabricated claims are used anywhere.
- The single action every page drives toward: **Send an enquiry** (`#contact`).

## Target Users

### 1. Wholesale distributor / stockist
- Goals: consistent batch quality, 25/50 kg sacks, repeat supply.
- Needs: grade differentiation, pack sizes, quick quote path.
- Pain points: inconsistent sizing/cleanliness from mandi sourcing.
- Journey: Hero → Grades (compare) → Packaging → Enquiry (grade + quantity).

### 2. Food business (manufacturer, sweets/curry producer)
- Goals: application-fit grade, reliable volumes.
- Needs: clean, uniform seed; retail-pack options for repacking.
- Pain points: impurity, off-spec batches stopping production.
- Journey: Hero → About (process) → Process → Grades → Enquiry.

### 3. Export buyer
- Goals: export-grade selection, compliant documentation.
- Needs: grading evidence, custom packing, phytosanitary readiness.
- Pain points: suppliers without documentation discipline.
- Journey: Hero → Process (export stage) → Packaging (custom) → Enquiry.

### 4. Retail repacker (on-demand small packs)
- Goals: 50 g–2 kg pouches packed to order.
- Needs: confirmation that small packs exist and how to request them.
- Journey: Packaging (Retail tab) → Enquiry (packing field).

## Website Goals

1. **Trust** — process transparency + precise specifications.
2. **Product discovery** — 4 grades comparable in one interactive panel.
3. **Lead generation** — every section has a contextual CTA to `#contact`.
4. **Contact completion** — structured form pre-fills grade from product cards.
5. **Brand credibility** — premium, calm, consistent visual language.
6. **Engagement** — scroll-driven process story, culinary uses explorer.

Non-goals (deliberate): online payment, cart/checkout, user accounts, CMS.

## Information Architecture

```
#home (Hero)
#grades (Product grades — tabbed explorer, 4 grades)
#about (About + 4 buyer benefits)
#packaging (Bulk / Retail tabbed panel + custom requirement)
#process (6-stage scroll story: 01 Purchase … 06 Export)
#uses (4 culinary tiles)
#faq (Buyer questions — added in this programme)
#contact (Enquiry form + contact details)
Footer (brand, explore nav, contact, back-to-top)
```

## User Journeys

- **Primary:** Visitor → Hero → Grades → Enquire (grade preselected) → WhatsApp send. Fewest steps, highest intent.
- **Due-diligence:** Visitor → About → Process → Packaging → Enquiry.
- **Pack-first:** Visitor → Packaging (Retail tab) → Enquiry (packing preselected intent).
- **Culinary validation:** Visitor → Uses → Grades → Enquiry.
- **Question resolution (new):** Any section → FAQ → Enquiry.

## Functional Requirements

1. Anchor navigation with active-section highlight + mobile menu (Escape/outside-click close).
2. Grade explorer: tabs, prev/next, swipe, preselect-grade → enquiry form.
3. Packaging explorer: Bulk/Retail tabs with distinct visual treatments.
4. Scroll-driven process timeline (desktop pinned, mobile vertical).
5. Uses tiles: hover/focus/tap expand with accessible disclosure buttons.
6. Enquiry form: validation, error summary + focus management, WhatsApp deep-link, copy-details fallback when WhatsApp unconfigured, success/prepared/error states.
7. Contact placeholders (`ADD_*`) never rendered to visitors.
8. FAQ accordion (keyboard accessible, single-open, deep-linkable) + FAQ JSON-LD.
9. SEO: canonical, OG/Twitter, sitemap, robots, Organization + FAQ structured data.
10. 404 + error boundaries with recovery path back to enquiry.

## Non-Functional Requirements

- Performance: LCP image eager + priority; below-fold images lazy; transform/opacity-only animations; `prefers-reduced-motion` respected; no new heavy dependencies.
- Accessibility: skip link, labelled controls, visible focus, aria-current/tab semantics, ≥4.5:1 body text contrast (documented in `globals.css` header), 44px+ touch targets.
- Responsiveness: mobile-first; 360px → large desktop; no horizontal overflow.
- SEO: semantic headings, single H1, descriptive alts, sitemap/robots, structured data.
- Maintainability: data-driven sections (`src/data/*`), typed contracts (`src/types/business.ts`), small components.
- Security: no secrets in client code; WhatsApp number from config only; external links `noopener/noreferrer`; form input encoded before URL construction.
- Browser compatibility: evergreen Chrome/Firefox/Edge/Safari; graceful degradation without JS (content visible, reveal CSS gated on `scripting: enabled`).
