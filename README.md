# Lumen Growth — lumengrowth.co.uk

Marketing site for Lumen Growth, a London B2B marketing agency. Next.js App Router,
TypeScript, Tailwind, Motion, Zod. The single conversion goal is the Growth Audit
request form — there is no checkout, login, or client portal by design.

## Development

```bash
npm install
npm run dev      # http://localhost:3000
npm run lint
npm run build && npm start   # production build
```

## Environment variables

All optional — the site runs without them, with reduced functionality as noted.

| Variable | Purpose |
| --- | --- |
| `RESEND_API_KEY` | Enables emailing each Growth Audit lead via [Resend](https://resend.com). Without it, leads are only appended to `data/leads/growth-audit-leads.jsonl` (fine locally / on a persistent server; **lost on serverless hosts**). |
| `LEAD_NOTIFY_EMAIL` | Where lead emails go. Defaults to the site contact address (`src/lib/site-config.ts`). On Resend's free tier without a verified domain, this must be the email the Resend account was registered with. |
| `LEAD_FROM_EMAIL` | Lead email sender. Defaults to `Lumen Growth <onboarding@resend.dev>`, which works before the domain is verified. After verifying `lumengrowth.co.uk` in Resend, set e.g. `Lumen Growth <leads@lumengrowth.co.uk>`. |
| `NEXT_PUBLIC_GA_ID` | Google Analytics 4 measurement ID (`G-XXXXXXX`). GA only loads after a visitor accepts optional cookies in the consent banner; without the variable it never loads. |

## Lead-delivery setup (one-time)

1. Create a Resend account with the business email (currently the Gmail address).
2. Copy an API key into `RESEND_API_KEY` on the host.
3. Later, verify `lumengrowth.co.uk` in Resend and set `LEAD_FROM_EMAIL` / update the
   Privacy Policy if providers change.

## Analytics setup (one-time)

1. Create a GA4 property for `lumengrowth.co.uk` at analytics.google.com.
2. Set `NEXT_PUBLIC_GA_ID` on the host and redeploy.
3. Recommended: mark the Growth Audit success state as a key event in GA4.

## Deployment

Recommended: **Netlify** (free tier allows commercial sites and supports Next.js
App Router + Server Actions) — connect the Git repo, set the env vars above, add the
`lumengrowth.co.uk` custom domain. **Vercel** is equally good technically but its free
Hobby tier is licensed for non-commercial use only, so it would need the Pro plan.

Note: on any serverless host, the file-based lead store does not persist — make sure
`RESEND_API_KEY` is configured before going live so leads arrive by email.

## Project conventions

- Brand, copy, conversion, security, and animation rules live in `.claude/skills/lumen-*`
  and are the source of truth for future changes (no public prices, no fake proof,
  no guaranteed-results language, single "Request a Growth Audit" CTA).
- This Next.js version may differ from common conventions — check
  `node_modules/next/dist/docs/` before assuming an API (see `AGENTS.md`).
