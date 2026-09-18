# Design System Master File

> **LOGIC:** When building a specific page, first check `design-system/pages/[page-name].md`.
> If that file exists, its rules **override** this Master file.
> If not, strictly follow the rules below.

---

**Project:** Shrisantosh Traders
**Generated:** 2026-09-17 18:47:38
**Category:** B2B Service
**Design Dials:** Variance 3/10 (Centered / Minimal) | Motion 6/10 (Standard) | Density 3/10 (Spacious)

---

## Implemented system (authoritative — overrides the generated rules below)

The owner rejected the plain minimal version. The site is now a **premium, colourful, editorial Indian agricultural ingredient brand**.
It uses deep forest green, cream and grain gold, with saffron, terracotta, sage and peach as intentional section and product accents.
The source of truth is `src/app/globals.css` (`@theme` tokens, `container-page`, `section-space`, `grain` and `micro-label` utilities).
The generated "Liquid Glass" style was rejected, because the owner excluded glassmorphism.

| Area | Decision |
|---|---|
| Colour | forest #12372A, botanical #0B2419, cream #F6F0E4, warm-white #FCFAF5, gold #C49A45, saffron #D98B3A, terracotta #B85C3D, leaf #6D8B68, sage #C9D8C4, peach #E8B99C, charcoal #172019. Gold, terracotta and leaf are decorative on light surfaces; `gold-deep` #8A6420, `terracotta-deep` #9A4A2F, `leaf-deep` #4E6B4A and `ink-muted` #4A554C carry text (≥4.5:1). |
| Rhythm | Hero forest → Grades cream → About warm-white → Packaging cream→sage gradient with a forest panel → Process shifting tints (sage, olive, green, gold, peach, forest) → Uses cream with saffron/sage/peach/forest tiles → Enquiry forest with cream form → Footer botanical. |
| Grade identity | King gold, Shubh Laxmi sage/olive, Shri terracotta, White Tinopal cream/soft gold. Used only on backdrop, number, tab line and bullets. |
| Type | Cormorant Garamond (display, italic emphasis) + Inter (UI/body). `text-hero` clamp 40→84px, `text-display` 38→64px, `text-statement` 40→80px, `text-title` 28→38px, `text-lead` 18px, `micro-label` 12px uppercase tracked. Custom sizes are registered with tailwind-merge in `src/lib/utils.ts`. Tailwind classes must be literal strings, never assembled at runtime. |
| Composition | 12-column editorial grids (7/5 splits). Arch and circle image crops, overlapping images, floating labels, oversized numbers, thin gold rules. Decor (`decor.tsx`): seed scatter, botanical stem, pod line art, growth curve, rings, all low opacity. |
| Interactions | Grades: WAI-ARIA tabs with arrow/Home/End keys, swipe, prev/next buttons and an image crossfade (1.04 out, 0.96 in). Packaging: Bulk/Retail tabs stacked in one grid cell, so the layout never jumps. Process: IntersectionObserver sentinels over the pinned range, a sticky horizontal timeline on desktop and a vertical one on mobile. Uses: tiles reveal on hover, focus or tap (`aria-expanded`). |
| Motion | Tokens: 180 / 350 / 500 / 700ms, `ease-premium` cubic-bezier(0.16,1,0.3,1). Hero load is staggered in CSS (≤1.3s total). Reveal is 700ms and applies only while scripting is enabled. Reduced motion collapses all animation and turns off smooth scroll. |
| Honesty | Success animation only when WhatsApp actually opens; otherwise an informational "ready to share" state with copy. `ADD_*` contact placeholders are hidden by `src/lib/contact.ts`. Uses illustrations are original SVGs. Product images are illustrative renders, not photographs. |

Verified 2026-09-17 on the production build: axe-core 4.13 (WCAG 2.2 AA plus best-practice) reports 0 violations at 375px and 1440px. At all 12 widths from 320px to 1920px there is no horizontal overflow, no broken images or anchors, no visible placeholders and no console errors. Weight: about 245KB JS, 75KB fonts, 71KB CSS, 78–152KB images.

---

## Global Rules

### Color Palette

| Role | Hex | CSS Variable |
|------|-----|--------------|
| Primary | `#1E293B` | `--color-primary` |
| On Primary | `#FFFFFF` | `--color-on-primary` |
| Secondary | `#334155` | `--color-secondary` |
| Accent/CTA | `#DC2626` | `--color-accent` |
| Background | `#F8FAFC` | `--color-background` |
| Foreground | `#0F172A` | `--color-foreground` |
| Muted | `#E9EDF1` | `--color-muted` |
| Border | `#E2E8F0` | `--color-border` |
| Destructive | `#DC2626` | `--color-destructive` |
| Ring | `#1E293B` | `--color-ring` |

**Color Notes:** Premium dark + action red

### Typography

- **Heading Font:** Inter
- **Body Font:** Inter
- **Mood:** dark, cinematic, technical, precision, clean, premium, developer, professional, high-end utility
- **Google Fonts:** [Inter + Inter](https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap)

**CSS Import:**
```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
```

### Spacing Variables

*Density: 3/10 — Spacious*

| Token | Value | Usage |
|-------|-------|-------|
| `--space-xs` | `4px` / `0.25rem` | Tight gaps |
| `--space-sm` | `8px` / `0.5rem` | Icon gaps, inline spacing |
| `--space-md` | `24px` / `1.5rem` | Standard padding |
| `--space-lg` | `32px` / `2rem` | Section padding |
| `--space-xl` | `48px` / `3rem` | Large gaps |
| `--space-2xl` | `64px` / `4rem` | Section margins |
| `--space-3xl` | `96px` / `6rem` | Hero padding |

### Shadow Depths

| Level | Value | Usage |
|-------|-------|-------|
| `--shadow-sm` | `0 1px 2px rgba(0,0,0,0.05)` | Subtle lift |
| `--shadow-md` | `0 4px 6px rgba(0,0,0,0.1)` | Cards, buttons |
| `--shadow-lg` | `0 10px 15px rgba(0,0,0,0.1)` | Modals, dropdowns |
| `--shadow-xl` | `0 20px 25px rgba(0,0,0,0.15)` | Hero images, featured cards |

---

## Component Specs

### Buttons

```css
/* Primary Button */
.btn-primary {
  background: #DC2626;
  color: white;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
  transition: all 200ms ease;
  cursor: pointer;
}

.btn-primary:hover {
  opacity: 0.9;
  transform: translateY(-1px);
}

/* Secondary Button */
.btn-secondary {
  background: transparent;
  color: #1E293B;
  border: 2px solid #1E293B;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
  transition: all 200ms ease;
  cursor: pointer;
}
```

### Cards

```css
.card {
  background: #F8FAFC;
  border-radius: 12px;
  padding: 24px;
  box-shadow: var(--shadow-md);
  transition: all 200ms ease;
  cursor: pointer;
}

.card:hover {
  box-shadow: var(--shadow-lg);
  transform: translateY(-2px);
}
```

### Inputs

```css
.input {
  padding: 12px 16px;
  border: 1px solid #E2E8F0;
  border-radius: 8px;
  font-size: 16px;
  transition: border-color 200ms ease;
}

.input:focus {
  border-color: #1E293B;
  outline: none;
  box-shadow: 0 0 0 3px #1E293B20;
}
```

### Modals

```css
.modal-overlay {
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
}

.modal {
  background: white;
  border-radius: 16px;
  padding: 32px;
  box-shadow: var(--shadow-xl);
  max-width: 500px;
  width: 90%;
}
```

---

## Style Guidelines

**Style:** Exaggerated Minimalism

**Keywords:** Bold minimalism, oversized typography, high contrast, negative space, loud minimal, statement design

**Best For:** Fashion, architecture, portfolios, agency landing pages, luxury brands, editorial

**Key Effects:** font-size: clamp(3rem 10vw 12rem), font-weight: 900, letter-spacing: -0.05em, massive whitespace

### Page Pattern

**Pattern Name:** Minimal Single Column

- **Conversion Strategy:** Single CTA focus. Large typography. Lots of whitespace. No nav clutter. Mobile-first.
- **CTA Placement:** Center, large CTA button
- **Section Order:** 1. Hero headline, 2. Short description, 3. Benefit bullets (3 max), 4. CTA, 5. Footer

---

## Motion

**Page Transition** (Standard) — Trigger: route change | Duration: 400-600ms | Easing: `power2.inOut`

```js
const tl = gsap.timeline(); tl.to('.transition-overlay', { yPercent: 0, duration: 0.4, ease: 'power2.inOut' }).call(navigate).to('.transition-overlay', { yPercent: -100, duration: 0.4, ease: 'power2.inOut', delay: 0.1 });
```

**Framework notes:** Keep the overlay element mounted at the layout root (outside the page component) so it survives the route swap

- ✅ Show a lightweight loading indicator if the destination route's data fetch outlasts the overlay
- ❌ Don't tie the overlay's reveal directly to data-fetch completion without a max-wait timeout; a slow API stalls the whole transition
- ⚡ Prefer CSS transform (yPercent) over top/left to keep the overlay animation on the compositor thread

---

## Anti-Patterns (Do NOT Use)

- ❌ Playful design
- ❌ Hidden credentials
- ❌ AI purple/pink gradients

### Additional Forbidden Patterns

- ❌ **Emojis as icons** — Use SVG icons (Heroicons, Lucide, Simple Icons)
- ❌ **Missing cursor:pointer** — All clickable elements must have cursor:pointer
- ❌ **Layout-shifting hovers** — Avoid scale transforms that shift layout
- ❌ **Low contrast text** — Maintain 4.5:1 minimum contrast ratio
- ❌ **Instant state changes** — Always use transitions (150-300ms)
- ❌ **Invisible focus states** — Focus states must be visible for a11y

---

## Pre-Delivery Checklist

Before delivering any UI code, verify:

- [ ] No emojis used as icons (use SVG instead)
- [ ] All icons from consistent icon set (Heroicons/Lucide)
- [ ] `cursor-pointer` on all clickable elements
- [ ] Hover states with smooth transitions (150-300ms)
- [ ] Light mode: text contrast 4.5:1 minimum
- [ ] Focus states visible for keyboard navigation
- [ ] `prefers-reduced-motion` respected
- [ ] Responsive: 375px, 768px, 1024px, 1440px
- [ ] No content hidden behind fixed navbars
- [ ] No horizontal scroll on mobile
