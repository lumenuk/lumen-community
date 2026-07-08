---
name: lumen-build-quality-gate
description: Defines the required technical checks (lint, build, types, accessibility, responsive, SEO metadata) before any Lumen Growth build task is considered done. Use before marking any implementation task complete.
---

# Lumen Growth Build Quality Gate

## 1. Purpose

This skill is the final checklist before calling any implementation work "done." It exists so pages and components don't ship with broken builds, lint errors, accessibility gaps, or missing SEO basics — this is a real client-facing agency site, not a prototype.

## 2. When to use this skill

- Before telling the user a page, component, or feature is finished.
- After any non-trivial change to `src/app` or `src/components`.
- Before running or reporting the results of `npm run lint` / `npm run build` (or this project's equivalent scripts — check `package.json` first, since this is a non-standard/newer Next.js version per `AGENTS.md`).

## 3. Core rules

**Before writing code:**
- This project uses a Next.js version newer than common training data (see root `AGENTS.md`). Check `node_modules/next/dist/docs/` and the installed package versions in `package.json` for the actual current API/conventions (file conventions, metadata API, async `params`/`searchParams`, image config, routing) before assuming standard/older Next.js behaviour.
- Check `package.json` for the real lint/build/typecheck scripts rather than assuming `next lint` exists — newer Next.js versions may have removed or changed CLI commands.

**Required checks before marking work done:**
1. **Lint** — run the project's lint script; fix all errors and warnings you introduced. Do not disable rules to silence errors unless there's a specific, justified reason, and prefer fixing the underlying issue.
2. **Build** — run the project's build script; it must complete without errors. Fix any type errors, missing imports, invalid Server/Client Component boundaries, or async API misuse (e.g. unawaited `params`/`searchParams`/`cookies`/`headers` if this Next.js version requires them async).
3. **Type safety** — no `any` used to paper over a real type mismatch; Zod schemas should drive types where form/data validation is involved rather than duplicating types by hand.
4. **Accessibility basics:**
   - Every interactive element reachable and operable by keyboard (tab order, visible focus states — check `focus-visible` styles aren't accidentally removed).
   - Form fields have associated `<label>`s (not placeholder-as-label).
   - Sufficient colour contrast, especially warm-accent-on-background and text-on-dark-section combinations (per `lumen-visual-reference-system`).
   - Meaningful `alt` text on images that convey information; empty `alt=""` on purely decorative images.
   - Semantic landmarks (`header`, `nav`, `main`, `footer`) present once per page, headings in logical order (no skipped levels).
   - All animation respects `prefers-reduced-motion` (per `lumen-animation-system`) — verify, don't just assume.
5. **Responsive layout** — check mobile (~375px), tablet (~768px), and desktop (~1280px+) widths for every page/component touched. No horizontal overflow, no overlapping text, nav must have a working mobile pattern (e.g. menu toggle).
6. **SEO metadata** — every page exports appropriate metadata (title, description, and Open Graph basics where relevant) using this Next.js version's actual metadata API (verify current convention in the docs rather than assuming). Titles/descriptions should be specific per page, not a repeated default.
7. **No visible placeholders/TODOs** — no `Lorem ipsum`, `TODO`, `[placeholder]`, or unfinished copy visible to end users in shipped pages. If real content is genuinely pending user input (e.g. unconfirmed pricing per `lumen-product-strategy`, or missing logo per `lumen-visual-reference-system`), that must be tracked in your response to the user, not left as visible broken-looking text on the live page.

## 4. Business-specific instructions

- Because the Growth Audit form is the entire commercial purpose of the site, it gets extra scrutiny: test that validation errors are clear, that the honeypot/rate-limiting (per `lumen-security`) doesn't accidentally block real users, and that a successful submission gives unambiguous confirmation.
- Because leads may come from cold outreach on mobile devices (checking a business on their phone), mobile responsiveness and load performance matter more than on a typical desktop-first B2B SaaS site — treat mobile as the primary breakpoint to get right, not an afterthought.
- Cookie consent banner (GDPR foundation) must not block the ability to read the page or reach the Growth Audit form while awaiting a decision, and must not pre-select "accept."

## 5. Things to avoid

- Never report a task as complete without actually running the lint/build checks (or clearly stating you couldn't and why).
- Never silence a lint/type error with a blanket disable comment as a first resort.
- Never ship a page with placeholder/Lorem ipsum copy visible to real users.
- Never assume older Next.js conventions apply without checking this version's docs first.
- Never skip the mobile-width check because desktop "looks fine."

## 6. Quality checklist

- [ ] Lint passes with no errors/warnings introduced by this change?
- [ ] Build completes successfully?
- [ ] No `any`-typed escape hatches introduced to bypass real type errors?
- [ ] Keyboard navigation, labels, contrast, alt text, and landmark structure all checked?
- [ ] Reduced-motion behaviour verified, not assumed?
- [ ] Mobile/tablet/desktop widths all checked for the changed pages?
- [ ] Every touched page has specific, non-duplicated SEO metadata?
- [ ] Zero visible placeholder/TODO/Lorem-ipsum text in shipped output?
- [ ] Growth Audit form validation, spam protection, and confirmation state all manually verified?
