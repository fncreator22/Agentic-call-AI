# Visual quality gate

Every meaningful marketing-page change is reviewed at three checkpoints:

1. **Before implementation** — map the reference hierarchy, viewport behavior, visual density, color roles and deliberately asymmetric sections. Having all sections is not visual parity.
2. **During implementation** — check 375px, 768px and 1440px after high-impact changes. Check body overflow, intended alignment, tap targets, interaction state and that the browser loaded the new bundle.
3. **After implementation** — run a production build, reload localhost, inspect live screenshots, test interactive states and record a revised fidelity estimate.

## AI-template anti-pattern checks

- **Purple-only identity:** indigo is for actions and status; deep violet is restricted to the industry interruption and dashboard mockup. Large neutral surfaces remain white/lilac.
- **Everything centered:** only the hero, setup proposition, data transition, pricing proposition and final CTA are centered. Workflow, capability, industry, employee-story and FAQ compositions are intentionally left- or split-aligned.
- **Mechanical spacing:** use the 8px-derived 16/24/40/64/88px rhythm.
- **Em dashes:** avoid em dashes in UI copy; use short sentences, commas or parentheses.
- **Headline/eyebrow repetition:** headline scale and alignment vary by section. Eyebrows are section transitions, not card decoration.
- **Flat card grids:** every product section includes a purpose-built product artifact or structured data state, not text cards alone.

## Latest verification

- Production build: pass (`npm run build`).
- Live server: HTTP 200 after replacing stale dev artifacts.
- 375px: client width 360px, scroll width 360px; no horizontal body overflow.
- 768px: client width 753px, scroll width 753px; three workflow cards, six capability cards and four FAQ controls render.
- 1440px: live screenshot confirms compact hero, neutral/lilac canvas, dense product mockups and an intentional dark-violet interruption.
- Deliberate distinction: Svara uses original copy, monogram/abstract product art and its own employee demo, rather than copied brands or human portrait imagery.
