<!--
KUEPER · Solar Science Foundation (SSF)
Path:      docs/BRAND.md
Repo:      github.com/thomaspeterkueper/solarsciencefoundation/blob/main/docs/BRAND.md
Name:      Brand & positioning
Version:   0.2.0
Created:   2026-06-26
Modified:  2026-07-10 23:34 CEST
Depends:   —
-->

# Solar Science Foundation — Brand & Positioning

This document locks the identity decisions for SSF so they stay consistent
across the site, modules, certificates and future surfaces. It is reference,
not law — update it deliberately when the positioning genuinely changes.

**v0.2.0 change note:** positioning reversed from v0.1.0. SSF is now
presented as a fictional institution within the NOXIA universe, not as a
real-world indie project. This was a deliberate decision, not a drift — see
below for what changed and why. Visual identity (colour, typography, signet)
is unaffected.

## Positioning

The Solar Science Foundation is a **fictional scientific institution within
the NOXIA universe**, founded 2045 in Sundern. It teaches real science —
the physics, mathematics and chemistry content is genuine — through the
frame of an institution that does not exist.

What SSF is:
- a fictional institution, clearly labelled as such on every page
- built on real scientific content from the KUEPER Knowledge Graph
- part of the NOXIA universe, not a standalone real-world nonprofit
- bilingual (DE / EN) from the ground up

What SSF is not:
- not a real, currently-existing organization
- not a registered foundation (German: keine „Stiftung")
- not presented as an accredited educational institution, even within the
  fiction — the certificates and progress it grants are framed as
  in-universe achievements, not real-world qualifications

### Why fiction, and why it stays legally safe

Earlier drafts of this document (v0.1.0) took the opposite approach —
presenting SSF as an honest, real indie project specifically to avoid any
confusion with existing organizations ("The Solar Foundation", "The Sol
Foundation" are real). That reasoning still matters, it just resolves
differently now: the safety comes from the fiction being **clearly and
persistently labelled**, not from SSF being non-fictional.

In practice this means the fictional framing is never hidden or implied only
by context — it is stated plainly, every time, the same way a novel's cover
says "a novel." The current footer text is the reference implementation of
this:

```text
Gegründet in Sundern 2045 · NOχ¹Δ Universe · Fiktives Wissenschaftsprojekt
Founded in Sundern 2045 · NOχ¹Δ Universe · Fictional science project
```

"Fiktives Wissenschaftsprojekt" / "Fictional science project" is not
decoration — it is the load-bearing phrase that keeps this positioning
legally distinct from claiming to be a real institution. It should not be
dropped from any surface that carries the founding tagline.

(Not legal advice — confirm names against DPMA / EUIPO before a public
launch regardless of the fictional framing, since real organizations with
similar names still exist.)

## Place in the ecosystem

```text
KUEPER Knowledge Graph   master / source of truth
        │  KXF
        ▼
Solar Science Foundation didactic layer: modules, progress, unlocks
        │  fictional institution, real content
        ▼
NOXIA                    the universe SSF is part of
        │
        └─► (future projects) any registered consumer may read SSF progress
```

Unlike v0.1.0, NOXIA is no longer framed as merely "the first consumer" of
SSF's unlocks — SSF is now explicitly part of the NOXIA universe by design,
not a neutral platform that happens to feed it. Other projects may still
consume SSF progress, but the NOXIA relationship is definitional, not
incidental.

Per `kueper-ecosystem` (the ecosystem's own governance repository), the
"fictional archive and application layer" role is formally assigned to
`overtime-archive.org`, not SSF — `docs/repository-roles.md` and
`docs/system-map.md` there still describe SSF as a neutral "learning and
mediation layer" as of this writing. That description has not yet been
updated to reflect this positioning change. Worth reconciling there at some
point; not blocking this document.

### Domain

Production stays on `solarsciencefoundation.vercel.app` while SSF, OTA and
NOXIA remain in test. A custom domain is not yet in use — do not reference
`solarsciencefoundation.org` as live anywhere until that changes.

## Visual identity

Unchanged from v0.1.0. Light-first. A learning platform is read, not flown
through — the reading surface is warm white, never a dark space background.
Navy and steel are the **ink and structure**, not the canvas. Dark mode is a
comfort option, added on top, never the primary.

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
- Mono: IDs, module codes, unlock codes (`PHY-L1-000001`,
  `UNL:NOX:orbital-navigation`) and small meta labels. This carries the
  "research station / archive" character without any space-opera styling.

Two weights only (regular + medium). Sentence case everywhere.

### Signet

An orbital glyph: a navy ring, a gold sun, one orbiting dot. Original and
deliberately neutral — it must not echo any real agency insignia
(NASA / ESA / DLR), no eagles, no laurel, no heraldry.

### Avoid

Starfields, galaxies, lens flares, neon blue, cyberpunk, "NASA poster" optics.
Those read as science fiction visually; SSF is fiction in its framing, not
in its visual register — the reading surface stays calm and textbook-like
even though the institution behind it is fictional.

## Voice & copy

Science first, reading first — the fictional framing sits around the
content, not inside it. NOXIA may now appear in the hero and framing copy,
since it is definitional rather than a downstream application. Whenever an
unlock is shown, the mechanism is explained once and honestly — dezent, but
never hidden.

### Canonical strings

Hero — EN: "Learn how the universe works."
Hero — DE: „Verstehe, wie das Universum funktioniert."

Sub — EN: "Short, connected science learning modules. Built on the KUEPER
Knowledge Graph. In German and English."
Sub — DE: „Kurze, verbundene Wissenschafts-Lernmodule. Aufgebaut auf dem
KUEPER Knowledge Graph. Auf Deutsch und Englisch."

Founding tagline — EN: "Founded in Sundern 2045 · NOχ¹Δ Universe · Fictional
science project."
Founding tagline — DE: „Gegründet in Sundern 2045 · NOχ¹Δ Universe ·
Fiktives Wissenschaftsprojekt."

Applications — EN: "Progress earned here unlocks capabilities within the
NOXIA universe."

Footer — EN: "An independent platform for scientific curiosity — open to
everyone, everywhere." + founding tagline (always both together, never the
first line alone).
Footer — DE: „Eine unabhängige Plattform für wissenschaftliche Neugier —
offen für alle, überall." + founding tagline.

About blurb — EN: "The Solar Science Foundation is a fictional institution
within the NOXIA universe, founded in Sundern in 2045. The science it
teaches is real, built from the KUEPER Knowledge Graph and presented in
German and English. Progress earned here unlocks capabilities within NOXIA."

Certificate disclaimer — EN: "An in-universe achievement within the NOXIA
Solar Science Foundation — not a real-world qualification."

## Consequence for the data model

Unchanged from v0.1.0. Because DE / EN is core, modules must carry localized
fields (title, summary, body, exercise text) per locale from the start — not
bolted on later. This is already reflected in the current KXF module shape
in the Knowledge Graph.
