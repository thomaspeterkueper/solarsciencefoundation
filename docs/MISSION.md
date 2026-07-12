<!--
KUEPER - Solar Science Foundation (SSF)
Path: docs/MISSION.md
Repo: github.com/thomaspeterkueper/solarsciencefoundation/blob/main/docs/MISSION.md
Name: Mission
Version: 0.2.0
Created: 2026-06-26
Modified: 2026-07-12 17:11 CEST
Depends: docs/BRAND.md
-->

# Solar Science Foundation Mission

**v0.2.0 change note:** aligned with `docs/BRAND.md` v0.2.0 - SSF is positioned
as a fictional institution within the NOXIA universe, founded 2045 in
Sundern, teaching real science. v0.1.0 predates that decision and described
a neutral, non-fictional platform. See `BRAND.md` for the full reasoning.

Solar Science Foundation translates the KUEPER Knowledge Graph into short,
understandable, game-compatible learning modules - presented as a fictional
institution within the NOXIA universe. The science is real; the institution
teaching it is not.

The platform connects scientific learning with NOXIA. A user learns a
concept, completes exercises, stores progress and unlocks relevant
scientific capabilities in the game.

## Mission statement

Solar Science Foundation makes foundational science playable, understandable
and reusable across the KUEPER ecosystem - through the frame of an
institution that exists only within NOXIA.

## System role

```text
kueper-ecosystem         = ecosystem governance, repository roles, project
                            registry (production URLs, cross-repo workflow)
KUEPER Knowledge Graph    = source of truth for canonical entities,
                            relations, learning modules, learning paths
kueper.com                = published knowledge documents, MINT-plus
                             foundation content (KG-0011)
SSF                       = learning, progress, membership and API layer;
                             fictional institution, real content
OTA (overtime-archive.org)= archive and primary-source documents;
                             the ecosystem's fictional archive/application
                             layer (kueper-ecosystem/docs/repository-roles.md)
NOXIA                     = game application and unlock consumer;
                             the universe SSF is part of
```

## First proof (historical)

The first milestone, achieved early in the project:

```text
A player completes SSF-PHY-1101.
SSF records completion.
NOXIA receives UNL:NOX:orbital-navigation.
```

`SSF-PHY-1101` used the original flat ID scheme, since superseded by the
level-embedded scheme (`PHY-L1-000001` etc.) - kept here as a historical
record of the first working loop, not a current id.

## Since then

The loop this document originally called "only after this loop works should
the system expand" has expanded - a real Mathematics foundation tree exists
(`MAT-L0-000001` through `MAT-L2-000003`), `archivmodul` and canonical
learning paths (`records.learning_paths`) are live in the Knowledge Graph, a
MediaAsset model replaces ad-hoc asset references, and kueper-com has a
defined role supplying MINT-plus foundation content. See
`docs/KNOWLEDGE-MODEL.md` for the current state of the data model these are
built on.
