---
name: lumen-conversion-system
description: Defines the Growth Audit conversion journey, lead form field spec, CTA placement rules, and how to build trust without fake social proof. Use when building any form, CTA, or trust-building section on the Lumen Growth site.
---

# Lumen Growth Conversion System

## 1. Purpose

Lumen Growth's website exists to turn visitors (mostly from cold outreach) into Growth Audit requests — not to sell directly. This skill defines the exact journey, the form spec, and how trust gets built without fabricated proof, so every CTA and form decision stays consistent with that single conversion goal.

## 2. When to use this skill

- Before building any form, especially the Growth Audit / Contact form.
- Before placing or wording any CTA anywhere on the site.
- Before designing a "trust," "process," or "why us" section.
- Before deciding what happens after a visitor submits the form (confirmation state, follow-up expectations).

## 3. Core rules

**The journey (do not shortcut or add steps):**
1. Visitor sees the site or arrives after cold outreach.
2. Visitor checks legitimacy (clear offer, clear process, professional design, no red flags).
3. Visitor requests a Growth Audit or submits contact details.
4. Lumen Growth reviews the business.
5. Lumen Growth calls them.
6. Discovery/consultation happens.
7. Pricing and contract are discussed.
8. Contract and payment are handled separately (mostly bank transfer).

The website's job stops at step 3. Never build UI that implies steps 4–8 happen automatically or instantly (no "instant quote," no "book now and pay," no automated pricing calculator that outputs a binding number).

**Two conversion paths (REPOSITIONED July 2026):**
- PRIMARY: "Apply to Join the Community" → /contact membership application form (fields: full name, business name, website optional, email, phone optional, about your business, what you hope to get from the community).
- SECONDARY: "Request a Free Content Audit" → /contact?enquiry=audit audit form (fields: full name, business name, website, email, phone optional, what you want more of, preferred contact method). RENAMED July 2026 (owner decision): the site's free audit offer is a Content Audit (a review of the business's social media presence and content), replacing the SEO-flavoured Growth Audit. SEO audits are offered to companies via outreach only, never as the site offer. "Growth Audit" elsewhere in this skill refers to this same audit path — read it as the Content Audit.
- Only one primary-styled CTA per page; the audit CTA is styled as secondary wherever both appear. Consent checkbox (unticked) stays on both forms per lumen-security.
- Secondary actions (view services, read FAQ, read blog post) are fine as lower-emphasis links/buttons, never styled to compete with the primary CTA.

**Growth Audit form field spec (build exactly this, no more, no fewer without the user's request):**
- Name (required)
- Email (required)
- Phone number (required)
- Business name (required)
- Business address or area (required — free text, e.g. borough or postcode area)
- Website URL (optional)
- Services interested in (required — multi-select from the fixed service list in `lumen-product-strategy`)
- Revenue/profit band (optional — banded ranges plus "prefer not to say"; phrase carefully per `lumen-security`)
- Main marketing challenge (required — free text, capped length)
- Consent checkbox (required, unticked by default — see `lumen-security` for exact wording rules)

**Setting expectations after submission:**
- Confirmation copy (on-screen and/or emailed) should say plainly what happens next: Lumen Growth will review their business and be in touch, typically within a stated timeframe if the user confirms one — never leave the visitor wondering if it worked or what happens next.
- Never imply automatic pricing, instant results, or a guaranteed call time unless the user has confirmed those specifics.

**Trust-building without fake proof:**
Because Lumen Growth is a new agency, trust must be built through:
- Clarity: a plainly explained process (steps 1–8, or the visitor-facing subset of them) so visitors know exactly what happens if they enquire.
- Specificity: naming real target industries and areas, and describing services in concrete, outcome-oriented terms (see `lumen-copywriting-system`).
- Professional execution: design quality, correct grammar, working forms, fast load, accessible navigation — sloppy execution undermines trust faster than any lack of testimonials.
- Transparency: clear Privacy Policy, clear consent language, clear "no obligation" framing around the Growth Audit.
- Direct, non-hyped tone (per `lumen-brand-system`) — overclaiming reads as less credible to a skeptical business owner than calm specificity.

Never simulate trust with fabricated logos, star ratings, testimonial quotes, or client counts. If the user later supplies real testimonials/logos, this skill's rule against fake proof does not block adding real ones — it only blocks invented ones.

## 4. Business-specific instructions

- Because leads often arrive cold (via outreach, not search), the site must independently answer "is this legitimate?" within seconds — prioritise a clear explanation of who Lumen Growth is and what a Growth Audit involves near the top of the homepage and on any landing page used for outreach follow-up.
- The revenue/profit band and "main marketing challenge" fields exist to help Lumen Growth prepare for the call, not to gate or auto-qualify visitors on-site — never add client-side logic that rejects or redirects a submission based on these answers.
- If the user wants a dedicated outreach landing page variant later (e.g. for a specific industry or area), that should still funnel to the same Growth Audit form and follow the same journey — don't invent a parallel conversion path.

## 5. Things to avoid

- No self-serve checkout, instant quote calculator with a binding number, or "book a call" calendar embed unless the user explicitly asks for one (the confirmed flow is: submit → Lumen Growth reviews → Lumen Growth calls).
- No more than one primary-styled CTA per page.
- No fabricated testimonials, logos, review stars, or client counts anywhere, including in placeholder/demo content.
- No pressure tactics (countdown timers, "X people viewing this," fake scarcity).
- No collecting fields beyond the confirmed spec without the user's request.
- No implying automated/instant pricing or results.

## 6. Quality checklist

- [ ] Does every page have exactly one primary CTA, consistently worded ("Request a Growth Audit" per `lumen-brand-system`)?
- [ ] Does the form collect exactly the specified fields, no more, no fewer?
- [ ] Is the consent checkbox required and unticked by default?
- [ ] Does post-submission copy clearly explain what happens next, without overpromising?
- [ ] Is trust built only through clarity/specificity/execution/transparency — zero fabricated proof?
- [ ] Is there zero on-site payment, checkout, or auto-generated binding quote?
- [ ] Would a skeptical business owner, three seconds after landing, understand who this is and what happens if they enquire?
