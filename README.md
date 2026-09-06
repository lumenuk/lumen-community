# Lumen Growth — lumengrowth.co.uk

Site for Lumen Growth, a UK-based **AI agency** that builds and steers teams of AI agents for
businesses (Scout agent teams, Archer lead recovery, and Voice answering/callbacks). Next.js App
Router, TypeScript, Tailwind, Motion, Zod. The conversion goals are **booked calls** and **free AI
audit** requests (both on `/contact`).

A client portal (`/sign-in`) is stubbed as a "coming soon" placeholder — there is no login, auth, or
CRM yet, and it won't be built until there's a client to use it.

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
| `RESEND_API_KEY` | Enables emailing each form submission (call request, AI audit) via [Resend](https://resend.com). Without it, submissions are only appended to `data/submissions/*.jsonl` (fine locally / on a persistent server; **lost on serverless hosts**). |
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
3. Recommended: mark the AI-audit / call-request success state as a key event in GA4.

## Deployment

Hosted on **Vercel**, connected to this GitHub repo (`lumenuk/lumen-community`). Pushing to `main`
triggers a production deploy to `lumengrowth.co.uk`. Set the env vars above in the Vercel project
settings.

Note: on any serverless host, the file-based lead store does not persist — make sure
`RESEND_API_KEY` is configured so leads arrive by email.

## Structure

- `src/app/page.tsx` — the one-page home (hero, Meet Scout + walkthrough video, Evidence, FAQ, Book a call).
- `src/app/services/page.tsx` — Solutions (Scout / Archer / Voice).
- `src/app/contact/page.tsx` + `src/lib/actions/contact.ts` — call-request and AI-audit forms.
- `src/app/sign-in/page.tsx` — placeholder for the future client portal (`noindex`).
- `src/lib/site-config.ts` — name, nav, CTAs, and the sign-in entry point.
- `src/app/globals.css` — the dark/electric-blue theme tokens.
- Assets: `public/videos/scout-demo.mp4` (+ poster in `public/images/`).

## Project conventions

- No public prices, no fabricated proof, no guaranteed-results language.
- Brand/copy/security notes live in `.claude/skills/lumen-*`. These predate the AI-agency
  repositioning (Sept 2026) and still describe the community/social-media era — update them before
  relying on them for future work.
- This Next.js version may differ from common conventions — check `node_modules/next/dist/docs/`
  before assuming an API (see `AGENTS.md`).
