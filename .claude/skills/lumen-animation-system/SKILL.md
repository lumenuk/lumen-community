---
name: lumen-animation-system
description: Defines Lumen Growth's motion and animation standards using Motion (Framer Motion successor) — editorial, subtle, accessible. Use before implementing any animation, transition, hover effect, or the visibility-transformation animation.
---

# Lumen Growth Animation System

## 1. Purpose

This skill defines how motion should feel and behave across the Lumen Growth site: subtle, editorial, premium — never gimmicky. It exists so animation choices stay consistent with a serious B2B brand instead of drifting toward flashy startup-template motion.

## 2. When to use this skill

- Before implementing any page transition, scroll reveal, hover state, or entrance animation.
- Before building the hero animation or the "weak visibility → strong visibility" transformation animation.
- Before building the process-steps slideshow/cards.
- Whenever adding `motion` (the animation library) usage anywhere in the codebase.
- When reviewing whether existing motion feels "on-brand" or excessive.

## 3. Core rules

**Library and technical baseline:**
- Use Motion (the modern successor to Framer Motion) for all animation — check `node_modules/next/dist/docs/` and the installed `motion` package docs for current API before writing animation code, since APIs may differ from older Framer Motion training data.
- Every animation must respect `prefers-reduced-motion`. Use Motion's built-in reduced-motion handling (e.g. `useReducedMotion` hook) or a CSS media query fallback to disable/simplify non-essential motion for users who request it. This is non-negotiable, not a nice-to-have.
- Keep animations performant: prefer `transform` and `opacity` animations over animating layout-triggering properties (`width`, `height`, `top`, `left`) where possible.

**Feel and pacing:**
- Editorial, not playful: think slow, confident fades and gentle position shifts — not bouncy, elastic, or spring-heavy easing unless very subtle.
- Durations: entrance/reveal animations roughly 300–600ms; hover/micro-interactions roughly 150–250ms. Nothing should feel sluggish (>800ms) or jittery (<100ms).
- Easing: prefer smooth ease-out/ease-in-out curves. Avoid bouncy/spring physics for anything except very small hover affordances (e.g. a card lifting 2–4px), and even then keep it restrained.
- Stagger children sparingly (e.g. a row of service cards fading in with a small stagger) — never stagger so much that the page feels like it's "typing itself in."

**Named animation patterns to build:**
1. **Hero animation** — subtle, editorial. Could be a slow fade/reveal of headline and supporting elements, or a restrained visual motif tied to visibility/light. Must not be a generic animated gradient blob or particle background — those read as generic SaaS template, which is explicitly banned in `lumen-brand-system`.
2. **Transformation animation** — shows a business moving from weak visibility/reviews/search/social presence to stronger visibility and trust. This should be built as a clear before/after or step-by-step visual (e.g. a card or panel transitioning states, or a scroll-triggered sequence), not a literal fake dashboard unless explicitly designed as a clearly conceptual, stylised visual (per the visual reference skill) rather than a fake SaaS analytics screenshot.
3. **Process steps slideshow/cards** — a sequence explaining the 8-step journey (see `lumen-conversion-system`) or a subset of it, presented as cards or a stepped layout. Cards may move subtly on hover (slight lift/scale, e.g. 1.02x scale or 4px translate) but should not spin, flip, or over-animate.
4. **Hover states** — subtle lift, shadow increase, or colour shift on interactive cards/buttons. Keep consistent across the whole site (same easing/duration values reused, not bespoke per component).

## 4. Business-specific instructions

- The transformation animation is a key differentiator for this brand — it should visually and credibly represent the real problem Lumen Growth solves (a business that's hard to find/trust online becoming easy to find/trust) using abstract, editorial visual language (e.g. shifting light/contrast, sharpening blurred elements, star ratings appearing, a map pin becoming prominent) rather than literal fake charts.
- Because the target audience is business owners (not designers or developers), animation should never get in the way of reading the offer — motion supports comprehension, it doesn't replace clear copy. If in doubt, favour a static, well-designed layout over an animated one that risks feeling gimmicky to a dentist or property developer evaluating credibility.
- Keep a single shared set of motion tokens (duration/easing constants) defined once (e.g. in a `lib/motion.ts` or similar) and reused across hero, cards, and transitions, rather than each component inventing its own timing — this keeps the site feeling coherent rather than assembled from disparate template pieces.

## 5. Things to avoid

- No parallax scrolling effects.
- No particle backgrounds, animated gradient blobs, or floating 3D shapes — these are generic SaaS/startup template signals explicitly banned by the brand direction.
- No auto-playing carousels that cycle without user control for anything conversion-critical (services, pricing) — process-step cards can auto-advance gently if there's also manual control, but never for content the user needs time to read.
- No excessive stagger/typewriter text effects.
- No animation that can't be disabled or simplified under `prefers-reduced-motion`.
- No spring/bounce easing on large elements (headlines, hero sections) — reserve any bounce for tiny, optional micro-interactions only, and keep it minimal even there.
- Do not animate for the sake of animating — every motion choice should support clarity or feedback, not decoration.

## 6. Quality checklist

Before marking any animation work as done:
- [ ] Does every animation degrade gracefully (or disable) under `prefers-reduced-motion`?
- [ ] Are durations/easings pulled from a shared, reused set of values rather than invented per component?
- [ ] Is the hero animation free of generic gradient/particle/blob effects?
- [ ] Does the transformation animation use abstract/editorial visual language rather than a fake literal dashboard (unless explicitly signed off as a designed conceptual visual)?
- [ ] Do hover effects stay subtle (small lift/scale, no spin/flip)?
- [ ] Is there no auto-playing carousel controlling conversion-critical content without manual override?
- [ ] Would a business owner reviewing this on a laptop feel it's "professional and smooth," not "flashy startup template"?
