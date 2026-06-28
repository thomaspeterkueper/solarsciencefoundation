<!--
KUEPER - Solar Science Foundation (SSF)
Path: docs/requests/KB-REQUEST-0002-ssf-legal-project-info.md
Name: Knowledge Graph request - SSF legal project info
Version: 0.1.0
Created: 2026-06-28
-->

# KB-REQUEST-0002 - SSF legal project info

## Needed by

Solar Science Foundation

## Purpose

SSF should not hard-code shared operator and project metadata. Legal project metadata should come from the KUEPER Knowledge Graph and be consumed by SSF pages, email templates and future project surfaces.

## Current Knowledge Graph state

KXF already contains:

```json
{
  "id": "ORG:SSF",
  "type": "Organization",
  "name": "Solar Science Foundation"
}
```

## Requested extension

Please extend `ORG:SSF` with project/legal metadata that can be safely published:

```json
{
  "id": "ORG:SSF",
  "type": "Organization",
  "name": "Solar Science Foundation",
  "operatorName": "Thomas Peter Küper",
  "websiteUrl": "https://solarsciencefoundation.vercel.app",
  "privacyUrl": "https://solarsciencefoundation.vercel.app/legal/privacy",
  "imprintUrl": "https://solarsciencefoundation.vercel.app/imprint",
  "statusNote": "Independent science learning project. Not an accredited institution."
}
```

Optional later fields:

```json
{
  "contactEmail": "...",
  "operatorAddress": "...",
  "jurisdiction": "DE",
  "languages": ["de", "en"],
  "emailTemplates": {
    "confirmSignup": {
      "de": "...",
      "en": "..."
    }
  }
}
```

## Consumers

- `/imprint`
- `/legal/privacy`
- Supabase confirmation email template
- future `/terms`
- NOXIA or other KUEPER projects if they need shared operator metadata

## Priority

High, because SSF now has login, accounts and stored progress.
