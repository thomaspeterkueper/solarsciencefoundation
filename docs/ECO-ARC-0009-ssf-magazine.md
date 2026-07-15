# ECO-ARC-0009: SSF Magazine Module

**Status:** Accepted
**Date:** 2026-07-15
**Owner:** Solar Science Foundation (SSF)

---

## Context

Thomas wants to add a recurring editorial format to the KUEPER Ecosystem:
a weekly-themed magazine with a short-form piece for social media and a
longer-form piece for download/email. This revives the concept of his
earlier client magazine "Strukturen," now reimagined as a digital,
ecosystem-native format.

---

## Decision

### 1. Ownership

The magazine is a sub-module of the **Solar Science Foundation (SSF)**,
consistent with SSF's dual real/in-universe nature.
It is not a standalone project and does not introduce a new top-level
entity in the ecosystem.

### 2. Working title

`SSF Magazine` (technical/module name: `ssf-magazine`).
This is a placeholder, not a final public-facing brand name.

### 3. Naming exclusion

"Structures" / "Strukturen" is explicitly **rejected** as a public title.

Rationale:
- Potential trademark/name collision with existing German
  architecture/engineering publications (structure-magazin.de, DETAIL).
- More critically: "structures" will likely collide semantically with
  future Mars/space-architecture and construction content in the NOXIA
  Universe or SSF itself. Reserving it as a magazine brand would create
  ongoing naming conflicts.
- A final public title remains an open decision, independent of the
  "Strukturen" legacy name.

### 4. Content sovereignty unchanged

The magazine is a **distribution layer**, not a primary data owner.

| Source | Sovereign Owner | Magazine relation |
|--------|----------------|-------------------|
| Archive-classified documents | `overtime-archive.org` (ECO-ARC-0007) | Pull + repackage |
| Canonical scientific/MINT+ content | `kueper.com` (ECO-ARC-0007) | Pull + repackage |
| NOXIA Universe primary data | `noxia-universe` Supabase (ECO-ARC-0008) | Pull + repackage |
| SSF course content | SSF (this repo) | Pull + repackage |

The magazine does not fork or duplicate primary data ownership.

---

## Architecture (for future implementation)

```
SSF
 └─ ssf-magazine (module)
     ├─ Candidate Scanner (weekly)
     │   pulls topic candidates from:
     │   - NOXIA Supabase
     │   - overtime-archive.org (OTA)
     │   - kueper.com
     │   - SSF learning paths and course content
     │
     ├─ Draft Generator
     │   Claude API generates:
     │   - short-form draft (social snippet, ~280 chars + 1 para)
     │   - long-form draft (PDF/email, ~800-1200 words)
     │   from source data + KXF context
     │
     ├─ Review Queue
     │   GitHub Issue or PR for human editorial review and approval
     │   Human-in-the-loop step: topic selection, final approval
     │
     └─ Publisher
         ├─ Social snippet (text + optional image, platform TBD)
         ├─ Long-form PDF/download
         └─ Email distribution to subscribers
```

### Relation to existing tooling

The Candidate Scanner overlaps conceptually with the Collector
(ECO-ARC-0005). Whether to build as part of `ssf-magazine` or as
extensions of the existing Collector tooling is an open item.

### Consistency with KG principles

The pull-not-push architecture of the Candidate Scanner is consistent
with the KUEPER Knowledge Graph's "Single Source of Truth" principle:
the magazine reads from canonical sources, it does not write to them.

---

## Relation to SSF-DIDAKTIK.md

The magazine is not a learning format — it is an editorial format.
It does not follow the SSF didactic dramaturgy (§3 SSF-DIDAKTIK.md).

However, it shares SSF's voice principles:
- Entry via observation or question, not via taxonomy
- No discipline labels as headlines
- Concrete, specific, not abstract

Long-form articles may link to SSF learning paths ("Wenn dich das
interessiert: Lernpfad →") but are not themselves learning paths.

---

## Open Items

| Item | Status |
|------|--------|
| Public-facing title for the magazine | Open — deferred |
| Implementation: standalone vs. Collector extension | Open |
| Implementation timeline | Open |
| Email distribution platform | Open |
| Social platform targets | Open |

---

*ECO-ARC-0009 · KUEPER Ecosystem · 2026-07-15*
*Repo: thomaspeterkueper/solarsciencefoundation*
