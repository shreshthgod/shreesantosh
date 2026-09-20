# 15 — Implementation Roadmap

| Phase | Tasks | Files | Done when |
|---|---|---|---|
| 1. Foundation + docs | Discovery, 18-file `project-details/` system, TODO | `project-details/*` | ✅ docs complete, no invented claims |
| 2. SEO foundation | robots, sitemap, Twitter meta, manifest, JSON-LD (Org+WebSite) | `app/robots.ts`, `app/sitemap.ts`, `app/layout.tsx`, `components/json-ld.tsx`, `public/site.webmanifest` | ✅ build passes; `/robots.txt`, `/sitemap.xml` 200 |
| 3. FAQ + conversion | faq data + section + nav + FAQPage schema | `data/faq.ts`, `sections/faq.tsx`, `data/site-config.ts`, `app/page.tsx` | ✅ accordion keyboard-operable; schema validates |
| 4. Form + a11y fixes | quantity "Not sure", descriptive alts | `sections/enquiry.tsx`, `hero.tsx`, `about.tsx` | ✅ validation symmetric; alts meaningful |
| 5. Error surfaces | branded 404 + error boundary | `app/not-found.tsx`, `app/error.tsx` | ✅ unknown route shows brand page with CTAs |
| 6. QA + verification | `npm run check`, keyboard/SR pass, responsive sweep, reduced-motion | — | ✅ lint+type+build green; checklist signed |
| 7. Handoff | update `18-FINAL-PROJECT-HANDOFF.md` status, owner action list | `project-details/18*` | ✅ owner knows the 2 launch inputs |

Deferred (needs owner): A1 server enquiry API, analytics keys, testimonials/certs, translations, sticky mobile CTA design sign-off.
