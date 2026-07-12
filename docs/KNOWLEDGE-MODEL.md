<!--
KUEPER - Solar Science Foundation (SSF)
Path: docs/KNOWLEDGE-MODEL.md
Repo: github.com/thomaspeterkueper/solarsciencefoundation/blob/main/docs/KNOWLEDGE-MODEL.md
Name: Knowledge Model
Version: 0.2.0
Created: 2026-07-03
Modified: 2026-07-12 17:11 CEST
Depends: docs/KXF.md, docs/MISSION.md, docs/BRAND.md
-->

# Solar Science Foundation - Knowledge Model

This document describes how knowledge is structured across the KUEPER
ecosystem and consumed by SSF: what entities exist, how depth and difficulty
are measured, how modules relate to their sources, and how prerequisites
work.

It is not the mission (see `MISSION.md`), not the didactic philosophy (see
the still-unwritten `PHILOSOPHY.md`, which should point to
`OTA-ARC-0005-2026-DE` rather than restate it), and not a curriculum-building
methodology (still early - two worked examples exist so far: the Mathematics
foundation tree and a handful of Archivmodule). This document is the
reference for the data model those build on.

**v0.2.0 note:** this is a full refresh, not a light edit. The v0.1.0
version (2026-07-03) was written the same day as several proposals that have
since landed; it described a mix of live and pending state that has now
mostly resolved. All numbers below were re-verified against live exports on
2026-07-12, not carried over from the previous version.

**Maturity note:** every Knowledge Graph registry this document describes
(`system-registry`, `entity-registry`, `relation-registry`) still carries
`status: "draft_productive"`. This document mirrors that - a live but
evolving system, not a frozen spec.

---

## 1. Where knowledge lives - the entity model

The Entity Registry (`exports/entity-registry-0.1.json`) now holds 257
records:

```text
DOC:<system>:<doc-id>      209   Canonical documents - almost entirely OTA,
                                  registered in bulk once ~204 documents were
                                  found to already carry KG-ready frontmatter
KD:<domain>:<level>         16   Knowledge domains (e.g. KD:GEO-SEISM:N2)
CMP:<domain>:<level>        15   Competencies - the "able to create" side of KD
LRN:SSF:<code>              14   SSF learning modules
PATH:<system>:<doc>:READ     2   Reading-access paths into a source document
```

`ENT:*` - generic canonical concepts such as "what is gravity" - is still
unpopulated. kueper-com's `draft_learning_content` role (KG-0011) is the
intended eventual source for this layer; nothing has been drafted there yet.

Registering a document is identity only - it does not create prerequisites.
Of the 209 registered `DOC:*` entities, only a handful have prerequisite
relations attached (see section 5). Bulk registration and curatorial depth
are two different kinds of work, moving at different speeds.

---

## 2. Two depth scales - kept deliberately separate

### N1-N4 - domain depth (live)

From `knowledge-domains-0.1.json` / `OTA-ARC-0005-2026-DE`. Answers: how
deep must your knowledge of a domain be to read a given document. N4
("Kurator / Forschung") stays out of the learner-facing path.

### L0-L6+ - module granularity (live, but not as its own field)

Answers: how atomic/short is a single module. This landed differently than
proposed in `KG-0015` - rather than an additive `meta.level` field
alongside unchanged ids, the ids themselves were restructured to embed the
level directly: `PHY-L1-000001`, `EAR-L2-000001`, etc. There is no separate
`meta.level` field - `meta` still only carries the older `depthMin`/
`depthMax` numeric pair. If you need a module's level, read it from the id.

---

## 3. Module types

`meta.type` on `records.learning_modules` (17 modules total):

```text
grundmodul      6    standalone, no prerequisites, builds N1
brueckenmodul   3    connects two grundmodule, builds N2
reference       5    pre-existing catch-all, advanced/single-topic
archivmodul     3    leads to a specific source document - now real
```

The three live Archivmodule:

```text
AST-L1-000001   Orientierung Planetologie
EAR-L2-000001   Einfuehrung in die planetare Seismologie
EAR-L2-000002   Petrologie und Gesteinsbildung
```

By subject: `MAT` 9, `PHY` 4, `GEO` 2, `AST` 1, `CHM` 1 (still `CHM`, not
`CHE` - the `KG-0006` correction has not propagated to every new module).
By status: 13 `planned`, 4 `built`. "Built" does not yet guarantee its
referenced assets exist as real files - check section 6 before assuming a
built module is complete.

---

## 4. Learning paths (new since v0.1.0)

`exports/kxf-learning-paths-0.1.json` / `records.learning_paths` - resolved
`KG-0002` on 2026-07-08. 12 real paths exist, each bundling a module
sequence toward a goal - a concept, or an Archivmodul's target document.
Includes at least one NOXIA-specific path
(`PATH:NOXIA:GEN-MARS:SCIENCE-FOUNDATION`).

This schema describes *structure* only - which modules, in what order,
toward what. It does not yet describe *presentation* (text, tables, quiz
slides). NOXIA independently built a working presentation layer for exactly
this (`foundation_folien`, eight slide types, `KursRenderer.tsx`) before this
schema existed, disconnected from it. `KG-REQ-20260711-learning-path-slides-
schema.md` (open) proposes bringing that design into the canonical schema.
`NOX-0008` (open) proposes migrating NOXIA's local `kurs_id` values to these
canonical `PATH:*` ids.

---

## 5. Prerequisites and the relation model

`relation-registry-0.1.json`: 15 relations - `REQUIRES` (9), `TEACHES` (3),
`TARGETS` (2), `SATISFIES` (1). Small relative to 209 registered documents -
registration at scale does not imply prerequisite depth at scale.

Archive access uses a source-agnostic path pattern:

```text
PATH:<system>:<doc-id>:READ  --TARGETS-->  DOC:<system>:<doc-id>
```

Proven for two OTA documents (`OTA-SCI-0083`, `OTA-FND-0028`, both with
complete prerequisite sets). Not yet exercised for a `DOC:KUE:*` document -
kueper-com's 8 content documents remain unregistered as of this writing
(`KG-0012`, open).

---

## 6. Media assets (new since v0.1.0)

v0.1.0 of this document didn't cover this - it didn't need to yet. Since
then, a real problem surfaced and was resolved: module `assets` fields
referenced files that were never created (`content/phy-1101/prose.md` and
similar - checked directly, none existed). `OTA-ARC-0010-2026-DE` ("Grundsatz
Medium != Wissen") introduced a canonical MediaAsset model:

```text
docs/MEDIA-ASSETS.md            standard
schemas/media-asset.schema.json schema
media/index.json                registry - 4 assets so far
```

First registered asset: `MED:L3:ssf-obs-wasserglas-001`, one of the original
observation photographs - real content that existed but was unlinked, now
properly registered rather than left as a dangling reference.

---

## 7. Document sources

```text
OTA          DOC:OTA:*   209 registered, ~2 with full prerequisite sets
kueper.com   DOC:KUE:*   0 registered as content (3 legal-only DOC:KUE:*
                         entries exist - Impressum/Datenschutz/AGB, not
                         knowledge content)
```

kueper-com's system role (`KG-0011`) covers MINT-plus foundation content:
`MAT, PHY, CHE, AST, BIO, EAR, LANG-*, HIS-*, PHIL-*, TEC-methodology`.
Drafts, KG curates and canonicalises - same rule as every other source.

---

## 8. Connection to NOXIA

Two separate integration points, at different states:

**Module unlocks** - `dependencies.noxia.grants` / `records.unlocks`, one
unlock per module. Live, working (`/api/player/[id]/unlocks`,
`NOXIA_API_KEY` server-to-server auth in place).

**Kurse (courses)** - NOXIA built its own parallel course/slide system
(`foundation_kurse`, `foundation_folien`) before the canonical
`records.learning_paths` schema existed, referencing local ids with no
connection to the Knowledge Graph. This is why a NOXIA player could see a
generated task with no matching content - the canonical path existed
(`PATH:SSF:MAT-FOUNDATIONS-0001`, `PATH:SSF:AST-PLANET-STRUCTURE-0001`) but
nothing pointed NOXIA's course lookup at it. `NOX-0008` (open) is the fix.

---

## 9. Open items this document will need to track

```text
KG-0012                                   register kueper.com's DOC:KUE:* content
KG-REQ-20260711-learning-path-slides-schema  bring NOXIA's slide model into the
                                            canonical learning_paths schema
NOX-0008                                  migrate NOXIA's kurs_id to canonical
                                            PATH:* ids
NOX-0007                                  School task topic-to-domain mapping
                                            never routes toward mathematics
KG-REQ-20260711-mat-l0-arithmetic-content real content for the arithmetic-
                                            basics floor module
KG-REQ-20260710-che-1101-source-gap       route CHE-1101 content to kueper-com
KG-REQ-20260712-org-ssf-domain-correction ORG:SSF's URLs point at an
                                            unconnected .org domain instead of
                                            the working .vercel.app one
```

Revise this document as each lands, not on a fixed schedule - the entity
model, level scheme, and NOXIA connection are the parts of SSF most likely
to go stale silently, as this refresh itself demonstrated.
