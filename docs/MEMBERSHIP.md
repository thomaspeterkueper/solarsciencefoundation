<!--
KUEPER - Solar Science Foundation (SSF)
Path: docs/MEMBERSHIP.md
Repo: github.com/thomaspeterkueper/solarsciencefoundation/blob/main/docs/MEMBERSHIP.md
Name: Membership model
Version: 0.1.0
Created: 2026-06-26
Modified: 2026-06-27 09:20 CEST
Depends: lib/membership.ts
-->

# Solar Science Foundation Membership

SSF includes a membership and supporter layer in addition to the learning system.

Membership must support the project without turning NOXIA into pay-to-win. Learning progress may unlock game capabilities. Payment status must not directly buy scientific power in NOXIA.

## Ecosystem principle

Membership is not only an SSF concern. It should be compatible with the wider KUEPER ecosystem:

```text
SSF          learning, progress, membership source
NOXIA        consumes learning progress and selected project-access flags
Knowledge KG canonical people, organisations and contributor mappings later
OTA          may consume contributor / curator status later
kueper.com   may consume public author / contributor attribution later
```

Therefore the model separates:

```text
Member       who the person is inside the ecosystem
Role         what the person is allowed to do
Scope        concrete permission-like capability
System       where that access applies
Progress     what the person learned
Unlock       what learning enables in partner projects
```

## Current roles

Defined in `lib/membership.ts`:

```text
ROLE:SSF:guest
ROLE:SSF:free-member
ROLE:SSF:supporting-member
ROLE:SSF:donor
ROLE:SSF:contributor
ROLE:SSF:co-author
ROLE:SSF:curator
ROLE:SSF:admin
```

## Current scopes

```text
read_public_content
store_learning_progress
earn_learning_unlocks
support_project
submit_content
review_content
publish_content
manage_membership
```

## API endpoints

```text
GET /api/membership/roles
GET /api/membership/demo
GET /api/membership/project-access/[memberId]/[system]
```

Examples:

```text
/api/membership/project-access/MEM:SSF:demo-free/noxia
/api/membership/project-access/MEM:SSF:demo-coauthor/knowledge-graph
```

The project-access endpoint returns a neutral shape that NOXIA and later systems can consume:

```json
{
  "schema": "KUEPER-PROJECT-ACCESS-0.1",
  "access": {
    "memberId": "MEM:SSF:demo-free",
    "system": "SYS:KUEPER:noxia",
    "active": true,
    "roles": ["ROLE:SSF:free-member"],
    "scopes": ["read_public_content", "store_learning_progress", "earn_learning_unlocks"],
    "canGrantGamePower": false
  }
}
```

## Hard rule

```text
Membership can support access, recognition, contribution and governance.
Scientific or game-relevant unlocks come from learning achievement, not payment.
```

This rule is encoded in every role with:

```json
"canGrantGamePower": false
```

## Later database model

When persistence is added, start with these tables:

```text
members
roles
member_roles
systems
member_system_access
supporter_records
contributor_attributions
```

Progress remains separate:

```text
learning_progress
exercise_attempts
unlocks
```

That separation keeps membership compatible with NOXIA and future projects without turning support status into game power.
