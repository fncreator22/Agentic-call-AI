# Product design audit — Svara

## Phase 1 — composition and visual system (before changes)
- Most marketing sections used the same centered `max-w-6xl` container and identical `py-16 md:py-24` rhythm. The three-step, feature, industry, and pricing sections formed an undifferentiated run.
- Cards used a single white fill/border/shadow treatment, with no hover elevation or hierarchy.
- Arial served display and body roles; headings clustered around the same size; color relied largely on the coral CTA.
- The bento used six same-weight tiles and unicode glyphs instead of a coherent icon treatment.

## Phase 1 — applied correction
- Introduced named CSS tokens for surface, radius, elevation, typography and accent colors; created differentiated wide/narrow/ink section wrappers, icon tiles and interactive card states.
- The landing composition now alternates narrow editorial copy, tinted product panels, full-bleed dark visual states, and a deliberately asymmetric feature grid.

## Phase 2 — interaction and motion audit (before changes)
- The only meaningful motion was a background drift and an automatic phone-state swap. Cards and buttons had linear movement, no reveal hierarchy, and dashboard values appeared with no feedback.

## Phase 2 — applied correction
- Added one reusable IntersectionObserver reveal treatment with sibling staggering; buttons/cards use a single restrained spring-like cubic-bezier lift. The call screen has a causally-active waveform and the system log appends one line at a time.

## Phase 3 — copy audit (before changes)
- Phrases such as “More than a voice on the line,” “A better first call,” and “Everything you need” were broad SaaS claims without mechanisms or useful specificity. CTA labels varied between “Get started,” “Choose,” and “Try.”

## Phase 3 — applied correction
- Rewrote visible product language around response time, talk-time pricing, named Indian languages, CRM/webhook outcomes, and one consistent “Start calling” action family.

## Phase 4 — imagery and product-art audit (before changes)
- There was no imagery system; unicode symbols read as placeholders. Existing dashboard treatment was flat and lacked an intentional employee representation.

## Phase 4 — applied correction
- Added reusable monogram avatars, abstract signal art and a subtle grain overlay on ink surfaces. No simulated human photography is used. `image-prompts.md` documents future authentic-photo needs.

## Phase 5 — QA audit (before changes)
- Mobile controls were viable but visual density and focus states were inconsistent. There was no final static build/API route verification after refinement.

## Phase 5 — applied correction
- Added focus-visible treatment and responsive grid constraints; production build and localhost route checks are run after the refactor.
