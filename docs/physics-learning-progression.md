# Physics learning progression — SSF independent of NOXIA

Status: curriculum specification · 2026-11-13
Owner: SSF. Canonical scientific knowledge: KUEPER Knowledge Graph.

## Problem
The existing KD:PHYS:N1 lesson “Wie wird aus einem Signal belastbares Wissen?” teaches scientific epistemology and advanced sensor selection. It is **not** an adequate first encounter with physics for a beginner at the fictional Gießen university in NOXIA or on the independent SSF website. SSF visitors must never have to know NOXIA exists.

## Two entry contexts, one curriculum
- **Standalone SSF**: choose physics from subject overview; follow learning progression, experiment in browser, earn subject-specific competency milestones. All teaching copy works without any NOXIA-specific noun or fictional scenario. NOXIA transfer is optional, collapsed, or absent in this context.
- **NOXIA university (Gießen)**: enter via university, select Physics and a difficulty appropriate to demonstrated prior knowledge, complete the same competencies through virtual experiments or SSF web fallback. In-game narrative, locations, characters, credits and unlocks are adapter-level features, not canonical subject material.
- An anonymous learner can explore experiments and lessons. Persistent progress can require login only when needed; offer privacy-respecting account-independent access.
- The canonical SSF module ID / KG concept references and assessment rubrics remain stable across contexts. Game-only references belong in optional integration metadata.

## Competency-driven physics sequence
Durations and module identifiers below are *proposals*, not existing registered modules.

| Stage | Learning goal | First playable experiment | Prerequisites |
|---|---|---|---|
| PHY-00 · Entdecken | Distinguish everyday physical phenomena and make qualitative predictions | Roll two balls over different surfaces; predict what changes | none |
| PHY-01 · Größen messen | Understand length, time, mass, temperature, units, repeatability and simple tools | Measure a moving toy car, compare estimates and measurements | none |
| PHY-02 · Bewegung | Relate distance, time, speed; explore acceleration qualitatively | Change a car's starting speed and track motion | PHY-01 |
| PHY-03 · Kräfte | Explore pushing, pulling, friction, inertia and gravity | Ramp-angle slider with visual force arrows | PHY-02 |
| PHY-04 · Materie und Energie | Compare density, heat, pressure, phase changes and energy transfer | Warm/cool water and observe temperature and phase changes | PHY-01, selected PHY-03 concepts |
| PHY-05 · Wellen und Felder | Interpret simple wave, light, sound, electric and magnetic observations | Adjust frequency and amplitude; move magnets near compass | PHY-01, selected PHY-03 concepts |
| PHY-06 · Evidenz aus Messungen | Distinguish measured signal, uncertainty, interpretation, independently tested hypothesis | Scan geological sample, combine sensor observations, choose core sample | PHY-01, relevant field/signal concepts from PHY-05 |
| PHY-07 · Vertiefungen | Enter mechanics, thermodynamics, electromagnetism, optics and later modern physics | Branch-specific experiment | competency-based |

**Curriculum placement**: preserve the existing identifier KD:PHYS:N1 as a KG domain/reference; do not silently repurpose canonical IDs. Relocate the lesson *within the learner journey* to PHY-06; its internal label “PHY 1” is not allowed to imply it is the first foundational lesson. Determine the existing actual module/path mapping before migration.

## Flexible DAG, not mandatory linear schooling
- Represent every module as objectives and prerequisite competency IDs, plus optional recommended ordering.
- Beginner chooses “Von Anfang an”; other learners can pick topics freely or take short diagnostic practical tasks.
- Completion demonstrated through action and explanation, not video watched or time elapsed. Allow safe retries and exploratory mistakes.
- Offer a short beginner route (core experiments) and optional deeper routes (mathematics, full theory, real-world applications).
- Display a visual learning map: completed / available / recommended / needs prerequisite; never show unavailable as permanently inaccessible.
- Optional interdisciplinary bridges: mathematics, chemistry, geology, astronomy. Preserve existing paths and alias mappings; avoid duplicate records.

## Interaction contract
Each node declares: stable path ID; skill objectives; prerequisite skill IDs; visual/interactive scene and accessibility fallback; prediction or decision prompt; observable outputs; formative feedback; rubric; optional applied context and NOXIA integration. Keep hidden simulation ground truth separate from observed data.

## UX acceptance
- Starting from SSF home → Physics: a newcomer can begin a basic practical experiment with no game knowledge and no long text.
- In NOXIA at Gießen, Physics defaults to the same beginner path, not the geology scanner lesson.
- The N1 scanning lesson remains discoverable but is presented as a later science-method competence, not as the first physics course.
- Standalone SSF texts do not assume a player, NOXIA assets, credits, fictional locations or game-specific prerequisites.
- Existing path discovery, knowledge-map navigation and direct deep links continue to work.
- German and English labels and explanations are available or explicitly flagged for translation.
- Responsive and accessible visualization; controlled simulation with text fallback.
- Progress and assessment can be reused where authorized, while optional NOXIA integration does not affect standalone lesson availability.

## Rollout
P0 audit existing registry and courses; tag prerequisites and standalone/game-specific text; identify currently mapped Physics introductory route.
P1 implement Physics overview and first two interactive beginner nodes, with map and proficiency diagnostics.
P2 relocate KD:PHYS:N1 journey position and integrate hands-on scanner mission from docs/interactive-learning-pattern.md.
P3 connect NOXIA university entrypoint through versioned contract (request must originate in NOXIA repository under external-tasks/open/).
P4 test deep links, two language pathways, independent usage, progression and game integration.

Links: docs/interactive-learning-pattern.md; issue #92.
