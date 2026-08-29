# SSF participation and editorial governance

Status: operational application and review model

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

## Application and admission workflow

Authenticated users can submit applications for regular membership, supporting membership and authorship. Applications do not grant privileges.

Administrative review runs through controlled states:

1. `submitted`
2. `screening`
3. optional `review` for authorship
4. optional `revision_requested`
5. `approved` or `rejected`

Reviewer, editor and administrator roles remain outside public self-service.

Approval is performed by an authenticated account holding `ROLE:SSF:admin`. Authorization is checked inside PostgreSQL by security-definer functions rather than being trusted to the browser or API route alone.

On approval, SSF grants only the minimum technical role:

| Application | Automatic technical role on approval |
| --- | --- |
| Membership | `ROLE:SSF:free-member` |
| Supporting membership | `ROLE:SSF:supporting-member` plus an active `supporter_records` entry |
| Authorship | `ROLE:SSF:contributor` |

`ROLE:SSF:co-author`, `ROLE:SSF:curator` and `ROLE:SSF:admin` are never granted by this workflow. They require a separate deliberate administrative decision.

The internal review UI is `/admin/participation`. It is intentionally not part of the public primary navigation.

## First administrator bootstrap

The first administrator cannot be created through the public application system because that would make administration self-granting. After the intended administrator has created an SSF account and therefore has a row in `public.profiles`, assign the technical role once from the Supabase SQL editor using the known user UUID:

```sql
insert into public.member_roles (user_id, role_id)
values ('<USER-UUID>'::uuid, 'ROLE:SSF:admin')
on conflict (user_id, role_id) do nothing;
```

After at least one administrator exists, further administrative role assignments should remain an explicit controlled operation rather than a public form.

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
- admission termination/suspension rules beyond the technical application decision;
- voting or governance rights, if any;
- payment provider and accounting flow;
- identity verification where required;
- criteria for promotion from contributor to co-author/reviewer/editor;
- moderation and appeals process.

The website must not present legal membership rights, contribution levels or payment workflows as active before they exist.
