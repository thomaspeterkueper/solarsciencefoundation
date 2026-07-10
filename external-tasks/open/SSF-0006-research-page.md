# SSF-0006

Status: open
Created: 2026-07-10

## Origin
Follow-up to the "what should Research contain" discussion (2026-07-10). `/research` is already linked from the main nav (`components/SiteNav.tsx`, both desktop and mobile) but the route does not exist - confirmed via `find app -iname "*research*"`, zero results. This is currently a dead link on every page of the live site, in the primary nav, not just the footer.

## Target Files
New: `app/research/page.tsx` (and `app/de/research/page.tsx` or equivalent locale handling, matching the pattern already used elsewhere)

## Purpose

Two things belong here, distinguishing it clearly from the three existing nav items:

```text
Explore / Knowledge Map  (/learn)            the graph of modules
Subjects                 (/subjects)          coarse topic browsing
Learning Paths           (/learning-paths)    guided L0-L6 sequences
Research                 (/research)          NEW - primary sources + N4 material,
                                               the destination the learning paths
                                               were always building toward
```

1. **Primary source documents** - OTA and kueper-com documents (`DOC:OTA:*`, `DOC:KUE:*`), each shown with its registered prerequisites (`PATH:<system>:<doc>:READ` -> `TARGETS` -> `DOC:<system>:<doc>`, already live for `OTA-SCI-0083`/`OTA-FND-0028`). Locked documents show what's needed to unlock them (the actual point of the Archivmodul concept from `OTA-ARC-0005` III.3.2, given visible form for the first time).

2. **N4-tier ("Kurator / Forschung") domain content** - currently tracked in the Knowledge Graph but deliberately never learner-facing anywhere else (`docs/KNOWLEDGE-MODEL.md` section 2). This is the one place it should surface, clearly marked as beyond the guided path rather than an achievable module level.

## Scope reality check

As of 2026-07-10: only 2 of 212 OTA documents and 0 of 8 kueper-com documents are registered as `DOC:*` entities. Build the page and its data-fetching now against whatever's actually registered - it will legitimately show very little at first (2 documents). Do not block the page on the registration backlog (`KG-REQ-20260710-batch-register-ota-documents.md`, filed separately) - build to scale, launch thin, let it fill in as that request lands.

## Requested Change

1. `app/research/page.tsx` - fetch and list registered `DOC:*` entities from the Entity Registry, grouped by source system (OTA / kueper-com), each showing lock state derived from prerequisite completion, matching the existing prerequisite-checking logic already used elsewhere in the codebase.

2. Empty/thin states need to look intentional, not broken - "more sources are being added" rather than a bare empty list, given the honest 2-of-220 starting point.

3. Add to both `SiteNav.tsx` modes (already linked - no nav change needed) and confirm the `/de/research` locale path resolves the same way other locale-aware pages do.

## Priority
High - this is currently a dead link in the primary nav on every page, more visible than the footer links fixed in `SSF-0005`.

## Blocking
None for building the page itself. Content richness blocks on the registration/prerequisites requests filed separately today.

## Status
Open
