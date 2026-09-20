<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Shree Santosh Traders — website

## What this is
The public website for Shree Santosh Traders, a B2B supplier of quality-graded poppy seeds.
Its single job is to turn a qualified buyer (distributor, food manufacturer, sweet shop, exporter)
into an enquiry. One page, anchor-linked sections, WhatsApp-first enquiry with an email fallback.

This is a live business site, not a demo and not a starter scaffold. There is nothing here to
generate or reverse-engineer — build features directly against the code.

## Stack
- **Next.js 16** App Router + Turbopack · **React 19** · **TypeScript strict** (no `any`)
- **Tailwind CSS v4** — tokens declared with `@theme` in `src/app/globals.css`, no config file
- **Fonts** — Cormorant Garamond (display, italic emphasis) + Inter (UI/body), via `next/font/google`
- **Icons** — `lucide-react`; original brand SVGs in `components/decor.tsx` and `components/illustrations.tsx`
- **Node 24** (`engines.node >= 24`, `.nvmrc`) · deployed on Vercel

## Commands
- `npm run dev` — dev server
- `npm run build` — production build
- `npm run lint` — ESLint
- `npm run typecheck` — `tsc --noEmit`
- `npm run check` — lint + typecheck + build. **Run this before handing work back.**

## Single sources of truth

| What | Where |
|---|---|
| Company name, wordmark, contact details, navigation | `src/data/site-config.ts` |
| Products, packaging, process, uses, features, FAQ | `src/data/*.ts` |
| Colours, type scale, radii, shadows, motion durations | `@theme` in `src/app/globals.css` |
| Design decisions and rationale | `design-system/shree-santosh-traders/MASTER.md` |

**Never hard-code** the company name, a phone number, an email address, a URL or a colour in a
component. Read it from `site-config.ts` or a `@theme` token. Contact values that still read
`ADD_…` are unfilled placeholders and must never reach a visitor — gate them with
`isConfigured()` from `src/lib/contact.ts`.

Tailwind classes must be literal strings. Never assemble a class name at runtime
(`text-${color}` silently produces nothing); pick between whole literal classes with `cn()`.
Custom type sizes are registered with tailwind-merge in `src/lib/utils.ts` — add new ones there.

## Brand tokens
Forest `#12372A` · botanical `#0B2419` · cream `#F6F0E4` · warm-white `#FCFAF5` · gold `#C49A45` ·
saffron `#D98B3A` · terracotta `#B85C3D` · leaf `#6D8B68` · sage `#C9D8C4` · peach `#E8B99C` ·
charcoal `#172019`.

Gold, terracotta and leaf are **decorative on light surfaces only**. Text on light surfaces uses
the `-deep` variants (`gold-deep` `#8A6420`, `terracotta-deep` `#9A4A2F`, `leaf-deep` `#4E6B4A`)
or `ink-muted` `#4A554C`, all ≥ 4.5:1.

Grade identity: King → gold · Shubh Laxmi → sage/olive · Shri → terracotta · White Tinopal →
cream/soft gold. Used only on backdrop, number, tab line and bullets — never on body text.

## Motion rules
Scroll and load animation belong to **one** system: GSAP + ScrollTrigger + SplitText, with Lenis
for smooth scrolling, driven by GSAP's ticker. `motion` (`motion/react`) is allowed **only** for
the nav pill and the tab indicators. No second scroll library, no three.js, no AOS, no custom
cursor.

1. **Content is visible without JavaScript.** Hidden starting states are set by GSAP
   (`gsap.set` / `from`), never in static CSS — the one exception is the existing `.reveal`
   pattern, which is gated behind `@media (scripting: enabled)`.
2. Animate **`transform` and `opacity`** only (plus `clip-path`, `filter: brightness`, and the
   radius on the single stacked panel). Never animate `width`, `height`, `top`, `left` or `margin`.
3. `will-change: transform` only on pinned or scrubbed elements, and only while they are active.
4. Call `ScrollTrigger.refresh()` after `document.fonts.ready` and after images inside pinned
   sections load.
5. **Reduced motion** (`prefers-reduced-motion: reduce`) → no Lenis, no preloader, no pins, no
   scrubs, no marquee motion, no idle float. Just the final state.
6. **Never hijack touch scrolling.** Pins are desktop-only — desktop means
   `min-width: 1024px` **and** `min-height: 700px`.
7. Anchor links go through `use-scroll-to.ts`, then move focus to the section heading
   (`tabIndex={-1}`) so keyboard and screen-reader users follow the jump.
8. Keep the existing `.reveal` component for simple blocks. Never wrap a block in two reveal systems.
9. Every `useGSAP` passes `{ scope }`. No global selectors.
10. Big moments are **scrubbed** (tied to scroll position, reversible). Small moments **play once**.
    Every animation must answer "what does this show?" — no fade-up on every paragraph.
11. No layout shift: keep `pinSpacing` on, and set `aspect-ratio` on media.

Motion tokens live in `globals.css`: `--dur-fast` 180ms · `--dur-normal` 350ms ·
`--dur-premium` 500ms · `--dur-reveal` 700ms · `--dur-hero` 1200ms ·
`--ease-premium` `cubic-bezier(0.16,1,0.3,1)` · `--ease-inout` `cubic-bezier(0.65,0,0.35,1)`.
GSAP equivalents: `expo.out` ≈ ease-premium, `power2.inOut` ≈ ease-inout, and `ease: "none"`
for **every** scrubbed tween.

> The GSAP/Lenis stack lands in Phase 1. Until then the only animation is CSS in `globals.css`
> plus the `.reveal` hook — check `package.json` before importing an animation package.

## Accessibility and honesty — do not regress these
- WAI-ARIA tabs with arrow/Home/End keys in Grades and Packaging (`hooks/use-tabs.ts`)
- Enquiry form: inline validation, error summary, focus jump to the first invalid field,
  `role="status"` live regions for the outcome
- Skip link, visible focus rings, 44px touch targets, no horizontal overflow from 320px to 1920px
- WCAG 2.2 AA, axe-core clean at 375px and 1440px
- **No invented facts.** No client counts, years in business, tonnages, certifications or
  testimonials unless the owner supplied them. Product images are illustrative renders, not
  photographs, and their alt text says so.
- The success animation fires only when the enquiry actually went somewhere. If it did not,
  say so and offer the copy-details fallback.

## Code style
- Named exports · PascalCase components · camelCase utilities · 2-space indent
- One section per file in `components/sections/`, in scroll order
- Tailwind utilities, no inline styles (an animated CSS custom property is the exception)
- Mobile-first responsive
- Comments explain *why*, and only where the reason is not obvious from the code
