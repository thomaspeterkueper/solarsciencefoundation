# SSF participation applications

## Purpose

SSF accepts three application categories in the first operational workflow:

- `member` — community membership;
- `supporting_member` — financial or organizational support;
- `author` — reviewed didactic authorship.

Learning itself remains open and does not require an application.

## Authentication

`GET` and `POST /api/membership/applications` require a valid Supabase bearer token. Applications are bound to the authenticated profile; clients cannot submit an arbitrary user ID.

## Submission

`POST /api/membership/applications`

```json
{
  "applicationType": "author",
  "motivation": "Why I want to contribute to SSF ...",
  "expertise": "Relevant scientific, educational or practical background ...",
  "contributionInterest": "Topics, modules or didactic formats I would like to contribute ..."
}
```

`motivation` is required for all types. `expertise` and `contributionInterest` are required for author applications.

## Status lifecycle

`submitted → screening → review → revision_requested → approved | rejected`

Applicants may also withdraw an application. Review/decision mutations are intentionally not exposed through the public applicant API yet.

## Important separation

An approved application is **not** itself a role grant. Existing SSF role records remain the authorization layer. This prevents a public application workflow from accidentally escalating permissions.

The existing technical roles (`ROLE:SSF:free-member`, `ROLE:SSF:supporting-member`, `ROLE:SSF:contributor`, `ROLE:SSF:co-author`, `ROLE:SSF:curator`, `ROLE:SSF:admin`) predate the public governance language introduced in 2026-08. They should be treated as implementation roles/scopes, not as a second public taxonomy. A later migration may rename or consolidate them only after compatibility with existing API consumers has been checked.

## Not part of this version

- payment processing;
- contribution amounts or membership fees;
- automatic role assignment after approval;
- public reviewer/admin decision endpoints;
- legal voting or association rights.
