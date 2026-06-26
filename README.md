# Solar Science Foundation

Solar Science Foundation (SSF) is the learning platform between the KUEPER Knowledge Graph and the NOXIA game.

Its purpose is to translate scientific foundational knowledge into short, game-compatible learning modules. The KUEPER Knowledge Graph remains the source of truth. SSF turns that knowledge into modules, exercises, progress states, membership layers, and API endpoints. NOXIA consumes SSF progress to unlock game capabilities.

## Core idea

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

## First milestone

A player completes one science module in SSF and NOXIA receives one unlock.

Initial proof module:

```text
SSF-PHY-1101
What is gravity?
Unlock: UNL:NOX:orbital-navigation
```

## Repository structure

```text
app/                 Next.js app routes and API endpoints
components/          UI components
content/modules/     Learning modules
lib/                 Knowledge, module and API helpers
docs/                Mission, architecture, membership, API and roadmap
public/              Static assets
```
