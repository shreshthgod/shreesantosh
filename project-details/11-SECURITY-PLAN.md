# 11 — Security Plan

## Findings (code-reviewed)

| Area | Status |
|---|---|
| Secrets in repo | ✅ none found. `site-config.ts` uses `ADD_*` placeholders + `NEXT_PUBLIC_SITE_URL` env; `isConfigured()` blocks placeholders from rendering/linking |
| Client-side secrets | ✅ none; WhatsApp number is a routing address, not a secret — still gated by `isWhatsAppAvailable()` |
| Supabase/auth | N/A — no backend, no auth in this project |
| Form handling | ✅ client-only; message `encodeURIComponent`-encoded into `wa.me` URL; `window.open(..., "noopener,noreferrer")`; validation on all required fields; no `dangerouslySetInnerHTML` anywhere |
| External links | YouTube/sponsor links in README use `rel="noopener noreferrer"` where applicable; app has no untrusted outbound links |
| Dependencies | 5 runtime deps; run `npm audit` per release; Next 16 + React 19 current |
| Headers | Recommended at hosting layer (see below); no app-level secret headers needed |

## Rules Enforced

1. NEVER put API keys, tokens, or private numbers in `src/` or commit `.env*` (`.gitignore` covers env files — verified).
2. `ADD_*` convention: any config starting with `ADD_` is treated as unconfigured everywhere (contact list, WhatsApp, tel:/mailto: links).
3. Future `/api/enquiry` (see automation plan) must: validate with zod, rate-limit, honeypot, never echo PII into logs, and keep the WhatsApp/copy fallback on failure.

## Hosting Checklist (Vercel)

- Set `NEXT_PUBLIC_SITE_URL` to production origin.
- Enable HTTPS/HSTS (default), configure `Content-Security-Policy` + `Referrer-Policy` if a backend is later added.
- Restrict preview deployments if enquiry API lands (CORS + token).
