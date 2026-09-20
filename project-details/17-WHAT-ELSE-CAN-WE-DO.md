# 17 — What Else Can We Do? (consultant's backlog)

Only ideas with a real buyer/business reason. Ordered by value/effort.

1. **Real contact + site URL (launch blocker).** Phone/WhatsApp/email/address + `NEXT_PUBLIC_SITE_URL`. Unlocks calls, WhatsApp handoff, canonical/OG. Effort: minutes. Owner action.
2. **Server-side enquiry API + email alerts.** WhatsApp handoff is excellent for speed but leads vanish if the tab is abandoned. A `/api/enquiry` that stores + emails the owner (keeping WhatsApp as the express lane) fixes attribution. Needs inbox + DB decision.
3. **Analytics funnel.** 8 events specced in `07-AUTOMATION-MASTERPLAN.md`. Without it, every future design choice is a guess.
4. **Verified trust assets.** Lab reports, FSSAI/IEC mentions, packing photos, 3–5 permissioned buyer quotes. Biggest conversion lever — but only with real documents. Never fabricate.
5. **Buyer's guide per grade.** One line each: best for (korma/posto/sweets/repacking). Owner-reviewed, high SEO value.
6. **Hindi/Bengali microcopy.** Posto belt buyers; start with hero + FAQ. Needs native review.
7. **MOQ + lead-time transparency.** "Standard dispatch X days, custom packing Y" — kills the #1 B2B hesitation. Needs ops input.
8. **Sticky mobile enquiry bar.** Appears after hero on small screens. Deferred: test against clutter; measure with analytics first.
9. **Print/PDF spec sheet.** One-page grade × pack matrix buyers can forward to procurement. Cheap, high B2B utility.
10. **CI workflow + link checker.** `.github/workflows/check.yml` running `npm run check`; weekly anchor/image scan. Prevents silent rot.
11. **Seasonality/provenance notes.** Harvest calendar, storage guidance — only if the owner can stand behind the claims.
12. **What NOT to do:** cart/checkout (no pricing policy), chatbot (human handoff converts better here), testimonials without permission, "best in India" superlatives, dark-mode toggle (brand is the palette), parallax/video hero (weight + motion cost).
