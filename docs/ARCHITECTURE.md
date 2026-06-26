# Solar Science Foundation Architecture

SSF is the didactic and progress layer between KUEPER and NOXIA.

## High-level flow

```text
kueper.com
     |
     v
kueper-knowledge-graph
     |
     +----> SolarScienceFoundation
     |             |
     |             v
     +----> NOXIA <---- progress/API
```

## Responsibilities

### KUEPER Knowledge Graph

- Source of truth for entities, concepts, relations and mappings.
- Exports KXF datasets.
- Does not store learning progress.

### kueper.com

- Published knowledge documents and foundation articles.
- Referenced by KXF document records.

### Solar Science Foundation

- Reads KXF and KUEPER references.
- Publishes learning modules and exercises.
- Stores user progress.
- Manages memberships and contributor roles.
- Exposes API endpoints for NOXIA unlocks.

### NOXIA

- Consumes SSF progress and unlock states.
- Does not own scientific source knowledge.

### OTA / KUEPER

- Provides archive material, hypotheses, models, mappings and fictionalisations.

## Initial repository structure

```text
app/                 Next.js routes and API endpoints
components/          Shared UI components
content/modules/     Source learning modules
lib/                 Module registry, KXF and API helpers
docs/                Mission, architecture, membership, API and roadmap
public/              Static assets
```

## Design rule

KXF is the data model. Supabase, Neo4j or another database may implement it later, but should not define the conceptual architecture.
