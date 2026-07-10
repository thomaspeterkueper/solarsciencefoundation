<!--
KUEPER - Solar Science Foundation (SSF)
Path: docs/requests/KB-REQUEST-0004-id-normalization.md
Name: Knowledge Graph request - SSF module ID normalization
Version: 0.1.0
Created: 2026-07-10
Requestor: SYS:KUEPER:noxia via SYS:KUEPER:ssf
-->

# KB-REQUEST-0004 — SSF module ID normalization

## Problem

The SSF API (`/api/noxia/modules`) currently delivers modules with
inconsistent ID formats. NOXIA and the KG use `LRN:SSF:*` as the
canonical prefix, but the SSF API returns bare IDs without this prefix.

### Current state (SSF API response)

```json
{ "id": "SSF-PHY-1101" }
{ "id": "MAT-L0-000001" }
{ "id": "ECO-L0-000001" }
{ "id": "TM2-COMB-001" }
```

### Expected state (KXF canonical)

```json
{ "id": "LRN:SSF:PHY-1101" }
{ "id": "LRN:SSF:MAT-L0-000001" }
{ "id": "LRN:SSF:ECO-L0-000001" }
{ "id": "LRN:SSF:TM2-COMB-001" }
```

## Why it matters

1. **NOXIA unlock gates** reference `LRN:SSF:ECO-L0-0001` in
   `player_learning_progress`. If SSF delivers `ECO-L0-000001`, the
   gate check fails silently.

2. **KG SSOT principle** — the KG owns IDs. Bare IDs in SSF API responses
   are local aliases, not canonical references.

3. **Cross-system consistency** — `lib/knowledge/data.ts` in NOXIA,
   `lib/progress.ts` in SSF and KXF exports must all use the same ID.

## Requested change

### Option A — SSF normalizes on output (recommended)

`lib/noxiaBridge.ts` in SSF maps bare IDs to canonical form before
delivering to NOXIA:

```typescript
// In getNoxiaKnowledgeModules()
id: module.id.startsWith('LRN:SSF:')
  ? module.id
  : `LRN:SSF:${module.id}`
```

### Option B — KG provides canonical IDs in KXF export

The KXF export includes both canonical ID and legacy alias:

```json
{
  "id": "LRN:SSF:PHY-1101",
  "legacyId": "SSF-PHY-1101"
}
```

## Recommended resolution

**Option A short-term** (SSF normalizes output) — no KG change needed,
immediate fix for NOXIA gate checks.

**Option B long-term** (KG owns canonical IDs in KXF) — aligns with
`single_source_of_truth` principle from `ecosystem-0.1.json`.

## Additional normalization needed

NOXIA `lib/knowledge/data.ts` uses `LRN:SSF:` prefix with slightly
different numbering (`PHY-1101` not `PHY-L1-000001`). Once ECO modules
exist in SSF, NOXIA must adopt the SSF ID format exactly.

Mapping table (current NOXIA → canonical SSF):

| NOXIA local ID | SSF API ID | Canonical KXF ID |
|---|---|---|
| `LRN:SSF:PHY-1101` | `SSF-PHY-1101` | `LRN:SSF:PHY-1101` |
| `LRN:SSF:MAT-1001` | `MAT-L0-000001` | `LRN:SSF:MAT-L0-000001` |
| `LRN:SSF:ECO-L0-0001` | _(not yet in SSF)_ | `LRN:SSF:ECO-L0-000001` |

## Priority

High — blocks correct NOXIA unlock gate behavior with `KNOWLEDGE_SOURCE=ssf`.

## Blocks

- Bank credit gate in NOXIA (depends on ECO module ID match)
- Any future NOXIA unlock that references a SSF module ID
