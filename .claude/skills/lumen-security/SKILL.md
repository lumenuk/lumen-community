---
name: lumen-security
description: Defines security, privacy, GDPR, and spam-protection requirements for the Lumen Growth website, especially the lead/Growth Audit form which collects business and commercial data. Use when building forms, handling any personal/business data, or touching validation, storage, or third-party integrations.
---

# Lumen Growth Security & Data Protection

## 1. Purpose

The Growth Audit form collects personal and commercial data (name, contact details, business info, revenue/profit band, marketing challenges) from prospective clients. This skill defines the minimum security, validation, and GDPR-compliant handling required any time this data is touched — before writing form, API route, or storage code.

## 2. When to use this skill

- Before building or editing the Growth Audit / contact form.
- Before adding any API route that receives user input.
- Before choosing how form submissions are stored, emailed, or forwarded (e.g. to a CRM or inbox).
- Before writing the Privacy Policy content structure.
- Any time you touch validation, rate limiting, or third-party form/email integrations.

## 3. Core rules

**Validation (server-side, always):**
- Use Zod schemas to validate every field server-side, not just client-side. Client-side validation is a UX convenience only — never trust it as the security boundary.
- Validate: name (string, reasonable length), email (valid format), phone (reasonable format, allow international), business name, business address/area, website URL (valid URL format, optional), services interested in (enum/multi-select from a fixed list), revenue/profit band (fixed set of ranges, optional), main marketing challenge (string, max length to prevent abuse), consent checkbox (must be `true`, required — cannot submit without it).
- Reject and return clear errors for anything outside expected shape. Never pass raw unvalidated input to email, storage, or logs.
- Enforce reasonable max lengths on every free-text field to prevent abuse/storage bloat.

**Spam protection:**
- Add a honeypot field (hidden from real users via CSS, not `display:none` alone if possible — use an off-screen technique bots are less likely to skip) as a baseline, low-friction layer.
- Add rate limiting on the API route (per-IP, e.g. a small in-memory or edge-based limiter) to prevent submission flooding.
- Consider a lightweight, privacy-respecting CAPTCHA (e.g. Cloudflare Turnstile) if spam becomes a real problem — do not default to Google reCAPTCHA without checking the user's privacy stance first, since it has GDPR/data-transfer implications.
- Never rely on client-side JS alone to block spam; always back it with server-side checks.

**GDPR-friendly handling:**
- The consent checkbox must use clear, unticked-by-default, specific language (e.g. "I consent to Lumen Growth contacting me about my enquiry") — never pre-checked, never bundled with an unrelated marketing opt-in.
- State plainly near the form what the data will be used for (assessing and following up on the Growth Audit request) and link to the Privacy Policy.
- Only collect what's listed in the spec — do not add extra fields "for completeness" without the user's request, since GDPR requires data minimisation.
- The revenue/profit band field must be phrased as an approximate, optional band (e.g. "under £500k," "£500k–£2m," "£2m+", "prefer not to say") — never a mandatory precise figure, and always include an opt-out option.
- Document (in the Privacy Policy) how long submissions are retained and who they're shared with (e.g. if using a third-party email service or CRM, name the category of processor).
- If storing submissions anywhere (database, email, third-party form service), that storage must be described accurately in the Privacy Policy — do not let implementation and policy drift apart.

**Secrets and environment:**
- Any API keys (email service, CAPTCHA, CRM webhook) must go in environment variables, never hard-coded or committed.
- Never log full form submissions (especially business/commercial data) to persistent logs in plaintext beyond what's needed for debugging; scrub or avoid logging sensitive fields in production.

## 4. Business-specific instructions

- Because this form collects commercial/sensitive data (revenue band, business challenges) for B2B outreach targeting professional service businesses (dental, healthcare, property, construction, fitness, aesthetics), treat it with the same care as any lead form handling potentially sensitive commercial information — this is a legitimacy signal for a credible B2B agency, not just legal box-ticking.
- The submission flow should end with the visitor's data going to wherever Lumen Growth actually reviews leads (e.g. an email inbox or simple storage) — confirm with the user what the actual delivery mechanism is (email via a transactional service, a database, a third-party form backend) before wiring it up, since this affects both the security approach and the Privacy Policy content.
- No payment data is ever collected on-site (contracts/payment happen off-site by bank transfer per `lumen-product-strategy`), so PCI-DSS scope does not apply — do not add payment fields or payment-processor integration to this form.

## 5. Things to avoid

- Never trust client-side-only validation.
- Never pre-tick the consent checkbox or make consent implicit.
- Never collect more fields than specified without asking the user first.
- Never hard-code API keys or credentials in source files.
- Never log sensitive form data in plaintext to third-party logging services without the user's awareness.
- Never silently drop server-side rate limiting or spam protection because "it's a new site with low traffic" — cold outreach campaigns can attract scraper/spam traffic quickly.
- Never build a data flow that isn't reflected in the Privacy Policy.

## 6. Quality checklist

Before marking form/data work as done:
- [ ] Is every field validated server-side with Zod, including consent being strictly required?
- [ ] Is there a honeypot field and server-side rate limiting on the submission endpoint?
- [ ] Is the consent checkbox unticked by default with specific, clear language?
- [ ] Is the revenue/profit band optional, banded, and includes a "prefer not to say" option?
- [ ] Are all fields limited to exactly what's specified in the requirements (no scope creep)?
- [ ] Are any API keys/secrets loaded from environment variables only?
- [ ] Does the Privacy Policy accurately describe what's collected, why, how long it's retained, and who (if anyone) it's shared with?
- [ ] Is there zero payment data collection on-site?
