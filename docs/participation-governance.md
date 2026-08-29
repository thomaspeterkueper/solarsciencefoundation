# SSF participation and editorial governance

Status: initial operational model

## Principle

Public learning does not require membership. Membership, financial support, authorship, scientific review and editorial publication are separate responsibilities.

## Public roles

- **Learner** — open learning access and own progress.
- **Member** — community participation and feedback after admission.
- **Supporting member** — financial or organizational support; no scientific or editorial authority is attached to support.
- **Author** — may propose and revise SSF didactic content and provide sources; cannot self-publish.
- **Reviewer** — evaluates scientific reliability, sources and source-of-truth boundaries; can request revision or recommend publication.
- **Editor** — owns SSF publication decisions, didactic quality and attribution.

A person may hold more than one admitted role, but permissions derive from each role independently. In particular, supporting membership never implies author, reviewer or editor permissions.

## Public role to technical permission mapping

The public role vocabulary is the user-facing governance model. Existing technical role IDs remain the authorization layer and are not duplicated.

| Public role | Existing technical role IDs |
| --- | --- |
| Learner | `ROLE:SSF:guest`, `ROLE:SSF:free-member` |
| Member | `ROLE:SSF:free-member` |
| Supporting member | `ROLE:SSF:supporting-member` |
| Author | `ROLE:SSF:contributor`, later `ROLE:SSF:co-author` where appropriate |
| Reviewer | `ROLE:SSF:co-author` and/or `ROLE:SSF:curator` depending on actual review scope |
| Editor | `ROLE:SSF:curator` |

`ROLE:SSF:admin` remains a technical administration role and is deliberately not marketed as a public participation role. `ROLE:SSF:donor` remains a technical support record separate from membership.

An application never writes to `member_roles` directly. Admission and role assignment are separate operations so that a public form cannot escalate privileges.

## Application workflow

Authenticated users can submit applications for:

1. regular membership;
2. supporting membership;
3. authorship.

Applications are stored independently from granted roles. Reviewer, editor and administrator roles are not self-service application types at this stage.

## Editorial workflow

1. Proposal
2. Editorial screening
3. Scientific review
4. Revision
5. Editorial approval
6. Publication

Published content must retain visible attribution for authorship and, where applicable, review/provenance.

## Source-of-truth boundary

The KUEPER Knowledge Graph remains source of truth for canonical scientific facts, identifiers and dependencies. SSF owns didactic presentation, explanations, exercises, learning paths, learner progress and editorial publication of the learning layer.

If an SSF contribution requires a canonical KG change, SSF must not modify the KG directly. It creates a Markdown request under `external-tasks/open/` in the Knowledge Graph repository. The target repository decides and remains source of truth for its domain.

NOXIA gameplay permissions, rewards and game UX are likewise outside SSF governance. Cross-repository changes follow the same external-task process.

## Not yet defined

The following require explicit later decisions before implementation:

- legal form and formal membership rules;
- membership fees and supporting contribution levels;
- admission and termination procedure;
- voting or governance rights, if any;
- payment provider and accounting flow;
- identity verification where required;
- detailed author admission criteria and reviewer qualification;
- moderation and appeals process.

The website must not present these workflows as active before they exist.
