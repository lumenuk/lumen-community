---
name: lumen-visual-reference-system
description: Defines Lumen Growth's locked colour system (white / charcoal / one warm accent), logo usage, and visual reference boundaries. Use before choosing colours, imagery style, or component visual treatment.
---

# Lumen Growth Visual Reference System

## 1. Purpose

The visual direction for Lumen Growth is now locked (July 2026): the real logo has been supplied, the colour system is confirmed by the site owner, and reference hero pages have been reviewed. This skill defines that system so visual work stays consistent and doesn't drift back to earlier working directions.

## 2. When to use this skill

- Before setting or changing the Tailwind theme colours, CSS variables, or design tokens.
- Before choosing imagery style, iconography treatment, or component visual polish (shadows, borders, radii).
- Before placing or restyling the logo anywhere.
- When evaluating whether a new component or page "looks like Lumen Growth."

## 3. Core rules

**Confirmed colour system (owner-approved, do not re-litigate):**
- **White is the primary background.** Use true white or a neutral light grey for light sections — never cream, off-white/warm-cream, or beige washes.
- **Charcoal/black** (a near-black warm-toned dark, not pure `#000` or cold slate) for text, headings, and full dark sections.
- **One warm accent colour** — a burnt-amber/terracotta tone defined once as the `--warm` CSS token. The supplied logo is monochrome (`currentColor`), so the accent is a deliberate site-level choice paired with it, per the owner's brief ("terracotta/rust/amber-adjacent"). Used sparingly: primary CTA, key highlights, small detail moments (icon accents, active states, the map-pin/star moments in the transformation visual). Never a large background flood, never a second dominant colour.
- Explicitly banned: navy, cream backgrounds, generic gradients, cold blue-grey/slate palettes, neon or saturated startup gradients, pastel palettes, anything that reads as a SaaS template.
- Both light and dark (charcoal) sections are encouraged — mixing keeps the site editorial rather than flat.

**Logo (real asset — always use it, never a placeholder):**
- The real logo kit lives in `public/`: `lumen-growth-logo.svg` / `lumen-growth-icon.svg` (dark) and `-white` variants (for charcoal sections). SVGs use `currentColor` and can be recoloured via CSS.
- The mark is a minimal sunburst/rising-light icon plus a plain wordmark. Header: full logo or icon+text lockup. Footer on dark: white variant. Favicon/app icons: standalone icon (`src/app/icon.png`, `apple-icon.png`).
- Do not recolour the logo into the warm accent as its default treatment — it's a monochrome mark (charcoal on light, white on dark). Accent-tinting is acceptable only for small, deliberate moments, not as the standard lockup.

**Design tokens:**
- Never hard-code the warm accent (or any brand colour) as a raw hex inside individual components — always reference the shared CSS variable/design token (`--warm`, `--charcoal`, etc.). Component-local illustration colours (e.g. the stylised map's park/water/road neutrals) may be local values, but any brand-accent moment inside them should still use the token.

**Imagery and iconography:**
- Icons: Lucide React, one consistent weight/size system across the site — don't mix icon libraries or styles. (Hand-drawn inline SVGs inside the stylised map-transformation visual are part of that illustration, not UI icons — exempt.)
- No fake dashboard/analytics screenshots presented as real product UI. Clearly conceptual, stylised visuals (e.g. the map-transformation animation, labelled as an illustrative example) are the approved pattern.
- Prefer real, specific-feeling imagery of real London settings/industries once real assets exist; until then use clearly stylised/editorial visuals rather than generic stock photos.

## 4. Business-specific instructions

- The visual system must read as credible to dental clinics, healthcare providers, property companies, construction firms, gyms, and beauty/aesthetics clinics — corporate-enough-to-trust without being cold. Favour clean grids, generous whitespace, confident type hierarchy over decorative flourishes.
- Because the brand is not founder-led, avoid visual treatments that centre a personal photo/portrait as the dominant hero visual.
- Reference hero pages the owner supplied (Montix/Starship-style: generous type, stat-card layouts, light backgrounds) are loose layout inspiration only — do not copy their fabricated stats ("12 years experience", client counts) or their cream/green palettes.

## 5. Things to avoid

- Never reintroduce navy, cream/off-white backgrounds, or gradients.
- Never hard-code brand colours per component instead of tokens.
- Never swap the real logo for a text-only or placeholder mark.
- Never use fake dashboard screenshots as if they were real product UI.
- Never mix icon styles/libraries.

## 6. Quality checklist

- [ ] Are light sections true white or neutral light grey (no cream)?
- [ ] Is the warm accent defined once as a token and referenced everywhere, used sparingly?
- [ ] Is the real logo (correct variant for the background) used in header, footer, and favicon?
- [ ] Zero navy, cream, or gradient treatments anywhere?
- [ ] Are both light and charcoal sections used somewhere, not just one flat tone?
- [ ] Is any dashboard-style visual clearly conceptual/stylised (and labelled illustrative where it shows a fictional business)?
- [ ] Are icons consistently Lucide React at one style/weight?
