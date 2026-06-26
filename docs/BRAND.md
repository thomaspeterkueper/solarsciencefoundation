<!--
KUEPER · Solar Science Foundation (SSF)
Path:      docs/BRAND.md
Repo:      github.com/thomaspeterkueper/solarsciencefoundation/blob/main/docs/BRAND.md
Name:      Brand & positioning
Version:   0.1.0
Created:   2026-06-26
Modified:  2026-06-26 13:00 CEST
Depends:   —
-->

# Solar Science Foundation — Brand & Positioning

This document locks the identity decisions for SSF so they stay consistent
across the site, modules, certificates and future surfaces. It is reference,
not law — update it deliberately when the positioning genuinely changes.

## Positioning

SSF is an **independent science learning project**, created and maintained by
Thomas Peter Küper. It turns knowledge from the KUEPER Knowledge Graph into
short, connected learning modules in German and English.

What SSF is:
- a real, honest indie learning project
- a reusable layer that produces learning progress and unlocks
- bilingual (DE / EN) from the ground up

What SSF is not:
- not an accredited educational institution
- not a registered foundation (German: keine „Stiftung")
- not the companion site of a single game

It presents itself plainly. There is no heavy "this is fiction" marker — the
honesty lives in the footer and the About page, not in a warning banner. The
reason this is safe: teaching real science as a named indie project is
unimpeachable; the only risk was implying official or accredited status, and
the plain wording below removes it. (Not legal advice — confirm names against
DPMA / EUIPO before a public launch, since "The Solar Foundation" and
"The Sol Foundation" exist as real organizations.)

## Place in the ecosystem

```text
KUEPER Knowledge Graph   master / source of truth
        │  KXF
        ▼
Solar Science Foundation didactic layer: modules, progress, unlocks
        │
        ├─► NOXIA            first consumer
        └─► (future projects) any registered consumer may read SSF progress
```

SSF is consumer-agnostic. NOXIA is the first project to use its unlocks; the
presentation never assumes it is the only one.

## Visual identity

Light-first. A learning platform is read, not flown through — the reading
surface is warm white, never a dark space background. Navy and steel are the
**ink and structure**, not the canvas. Dark mode is a comfort option, added
on top, never the primary.

### Colour tokens

| Role                | Hex       | Notes                                  |
| ------------------- | --------- | -------------------------------------- |
| Page surface (warm) | `#faf9f6` | primary reading background             |
| Card / panel        | `#ffffff` | raised reading blocks                  |
| Hairline border     | `#e7e3da` | warm, quiet dividers                   |
| Body ink            | `#1d1d1f` | near-black text                        |
| Heading / navy ink  | `#16273a` | headlines, signet, structure           |
| Steel / secondary   | `#5b6b7b` | metadata, captions, mono labels        |
| Link / science blue | `#1e4f91` | links and primary actions              |
| Gold accent         | `#c9a961` | sparing — signet sun, rare emphasis    |

Gold is an accent, never a fill. If a screen looks gold-and-navy "elite
university", pull the gold back.

### Typography — two voices

- Serif voice: wordmark, headlines, module titles. Gives the calm gravitas of
  a textbook or archive.
- Sans: UI, navigation, body copy.
- Mono: IDs, module codes, unlock codes (`SSF-PHY-1101`,
  `UNL:NOX:orbital-navigation`) and small meta labels. This carries the
  "research station / archive" character without any space-opera styling.

Two weights only (regular + medium). Sentence case everywhere.

### Signet

An orbital glyph: a navy ring, a gold sun, one orbiting dot. Original and
deliberately neutral — it must not echo any real agency insignia
(NASA / ESA / DLR), no eagles, no laurel, no heraldry.

### Avoid

Starfields, galaxies, lens flares, neon blue, cyberpunk, "NASA poster" optics.
Those read as science fiction; SSF reads as science.

## Voice & copy

Science first, reading first. NOXIA appears only as a downstream application,
never in the hero. Whenever an unlock is shown, the mechanism is explained
once and honestly — dezent, but never hidden.

### Canonical strings

Hero — EN: "Learn how the universe works."
Hero — DE: „Verstehe, wie das Universum funktioniert."

Sub — EN: "Short, connected science learning modules. Built on the KUEPER
Knowledge Graph. In German and English."
Sub — DE: „Kurze, verbundene Wissenschafts-Lernmodule. Aufgebaut auf dem
KUEPER Knowledge Graph. Auf Deutsch und Englisch."

Applications — EN: "Progress earned here can unlock capabilities in partner
projects. The NOXIA universe is the first; others may follow."

Footer — EN: "A science learning project by Thomas Peter Küper. Not an
accredited institution."
Footer — DE: „Ein Wissenschafts-Lernprojekt von Thomas Peter Küper. Keine
akkreditierte Einrichtung."

About blurb — EN: "The Solar Science Foundation is an independent science
learning project created and maintained by Thomas Peter Küper. It turns
knowledge from the KUEPER Knowledge Graph into short learning modules in German
and English. It is not an accredited educational institution and issues no
formal qualifications. Progress earned here can be used by partner projects —
the NOXIA science and exploration universe is the first of these."

Certificate disclaimer — EN: "Learning achievement within the SSF project —
not a formal or accredited qualification."

## Consequence for the data model

Because DE / EN is core, modules must carry localized fields (title, summary,
body, exercise text) per locale from the start — not bolted on later. Build
this into the KXF module shape in the Knowledge Graph now.
