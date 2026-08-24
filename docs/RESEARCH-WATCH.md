<!--
KUEPER · Solar Science Foundation (SSF)
Path:      docs/RESEARCH-WATCH.md
Repo:      github.com/thomaspeterkueper/solarsciencefoundation/blob/main/docs/RESEARCH-WATCH.md
Name:      SSF Research Watch v0.1
Version:   0.1.0
Created:   2026-08-24
Modified:  2026-08-24
Depends:   kueper-ecosystem docs/architecture/SSF_RESEARCH_WATCH.md, docs/ARCHITECTURE.md
-->

# SSF Research Watch v0.1

SSF Research Watch is the real-world science sensor of SSF: it discovers
potentially relevant scientific publications and data releases, records them
as evidence, compares them against the current SSF/KG scope, and emits
bounded, reviewable task candidates.

It is a **watch-and-triage system, not an autonomous scientific authority**.
Publication is not truth; a discovery NEVER rewrites curriculum or canonical
knowledge. Every potential change is routed through a review task.

Implements: `EXT-ECO-SSF-20260821-001` (architecture:
`kueper-ecosystem/docs/architecture/SSF_RESEARCH_WATCH.md`).

## Pipeline

```text
Sources -> Discovery -> Deduplication -> Relevance -> Evidence Record
       -> Impact classification -> bounded TaskCandidate promotion
       -> KUEPER outbox emission (cross-project only)
```

Three-layer boundary (discovery / evidence / canon impact) — see the
architecture document. Discovery alone MUST NOT update learning content.

## Components

| Piece | Location |
| --- | --- |
| Watch-topic registry | `config/research-watch/topics.json` |
| Source registry | `config/research-watch/sources.json` |
| Deterministic fixtures | `config/research-watch/fixtures/works.json` |
| Engine + pipeline | `lib/research-watch/` |
| Discovery adapters | `lib/research-watch/adapters/` (replaceable by key) |
| Persistence | Supabase tables `research_watch_*` (migration `20260824120000_research_watch.sql`) |
| Cron entry | `app/api/cron/research-watch/route.ts` (Vercel cron `20 4 * * *`) |
| Tests | `tests/research-watch/` (`npm test`) |

## Watch topics

`topics.json` is the explicit registry against which relevance is evaluated.
It is derived from the current SSF module scope (`modules` field per topic;
`watchScopeGap()` in `lib/research-watch/topics.ts` reports drift, asserted
empty by the tests). `canon_claims` are v0.1 seed statements maintained by
SSF curators — the KG remains the source of truth; CANON_VALIDATION defers
judgment there. New topics may be proposed but MUST NOT silently expand the
monitored scope.

## Sources

Sources are configuration, not code. Each entry carries:

- `source_class` (primary-literature / authoritative-agency / dataset-feed / fixture),
- an `adapter` key naming a replaceable implementation (`fixture`,
  `http-json` — provider/model identity lives in config only),
- `cadence_hours`, `cost_policy`, `enabled`,
- an explicit `coverage_note`: absence from the watch is never interpreted
  as absence from science.

Network sources (`SSF-SRC-ARXIV-001`, `SSF-SRC-AGENCY-001`) are pre-configured
but disabled until a feed URL is approved for operations; enable via
`sources.json` or the env feed URLs (`RESEARCH_WATCH_ARXIV_FEED_URL`,
`RESEARCH_WATCH_AGENCY_FEED_URL`, expected payload: JSON array of normalized
works or `{ "works": [...] }`). The fixture source is enabled and provides
the deterministic self-test dataset.

## Identity and deduplication

Preference order: DOI > arXiv id+version > registry id > dataset/release id >
normalized URL+title fingerprint (`lib/research-watch/identity.ts`). The same
work discovered through multiple sources becomes ONE evidence object with
multiple `source_refs`; arXiv identity is version-sensitive. Negative and
out-of-scope classifications are retained so work is never repeated.

## Impact classification

`NEW / CONFIRMS / REVISES / CONTRADICTS / DEPRECATES / NO_IMPACT / UNCERTAIN`
(`lib/research-watch/impact.ts`). v0.1 classifies deterministically from
structured source metadata (relation hints, publication status, evidence
type):

- retractions/corrections never auto-accept — they park as UNCERTAIN review
  with `cost_policy: immediate` when they touch a watched topic;
- conflicting hints park as UNCERTAIN (contradictory evidence is represented,
  never reconciled by generated prose);
- works without structured hints park as UNCERTAIN with
  `classification: semantic_required` — the expensive semantic review is
  deferred off-peak;
- a relevant work with an explicit `no_relation` hint classifies NO_IMPACT.

## Promotion gate

A discovery may become a candidate only with: promotable impact class,
stable identity (DOI/arXiv/registry/dataset; fingerprint-only works are
retained but not promoted), allowed evidence type, sufficient relevance, no
open candidate fingerprint, and remaining budget
(`max_candidates_per_run`, default 5). Output types:

- `RESEARCH_DISCOVERY` (NEW/CONFIRMS/UNCERTAIN) → SSF-internal review;
- `CANON_VALIDATION` (CONTRADICTS/REVISES/DEPRECATES) → routed to the KG.

Cross-project requests are emitted ONLY as valid KUEPER outbox envelopes
(`lib/research-watch/envelope.ts`, `.kueper/outbox/*.json`, max routing
depth 3). SSF-internal candidates stay in the candidate store and emit
nothing. Envelopes are written only when `RESEARCH_WATCH_OUTBOX_DIR` is set
(local writable checkout); on Vercel, candidates remain in the store for the
ecosystem loop to pick up.

## Cost policy

Discovery and deterministic dedup are cheap and periodic. Semantic relevance
classification may later use a low-cost model (extension point — no provider
or model is hard-coded). Expensive synthesis/review carries
`cost_policy: prefer_off_peak`; broad review synthesis may use
`off_peak_only`; retractions/corrections touching published SSF content
override to `immediate`.

## Operations

- Dry-run by default (`RESEARCH_WATCH_DRY_RUN != 'false'`): the full pipeline
  runs on an in-memory store; nothing persists. Set to `false` to persist via
  Supabase (service role; tables are RLS-locked to the service role).
- Cron: `/api/cron/research-watch` (CRON_SECRET, like the retention job),
  `20 4 * * *` UTC — off-peak.
- `npm test` compiles the watch library and runs the deterministic test suite.

## v0.1 scope guardrails

- No curriculum mutation from discoveries — ever.
- Preprint/retraction/correction metadata is preserved on the evidence.
- Claims retain provenance to their source; generated summaries are not
  evidence.
- Candidates are bounded and reviewable; promotion is deterministic.
