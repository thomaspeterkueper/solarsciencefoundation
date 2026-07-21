---
id: SSF-0019-deep-link-api
requester: SYS:KUEPER:noxia
recipient: SYS:KUEPER:ssf
type: feature
priority: high
created: 2026-07-20
blocking: [NOXIA-BETA]
---

# SSF-0019 — Deep-Link API: Direktlinks zu Lernpfaden und Modulen

## Problem

NOXIA verlinkt auf spezifische SSF-Lernpfade per URL:
```
https://solarsciencefoundation.vercel.app/learning-paths/PATH:SSF:ECO-KREDIT-NOXIA-0001?ref=noxia&uid=xxx
https://solarsciencefoundation.vercel.app/modules/ECO-L0-000001?ref=noxia&uid=xxx
```

Beide URLs landen auf `/learn` — der allgemeinen Einstiegsseite mit 60 Fragen.

## Gewünschtes Verhalten

**Option A:** Die URLs `/learning-paths/[id]` und `/modules/[id]` existieren und
zeigen den spezifischen Lernpfad/das Modul.

**Option B:** Ein Redirect-Endpoint der `?ref=noxia&uid=...` versteht:
```
/api/noxia/redirect?module=ECO-L0-000001&uid=xxx
→ leitet zur richtigen Seite weiter
```

**Option C (Minimal):** `/learn?module=ECO-L0-000001&uid=xxx&ref=noxia`
→ SSF öffnet `/learn` aber selektiert automatisch das passende Modul/die Frage

## NOXIA-Parameter

- `ref=noxia` — Herkunft NOXIA
- `uid={uuid}` — NOXIA User-ID für Abschluss-Zuordnung
- `module={id}` — Modul-ID (ECO-L0-000001 etc.)
- `path={id}` — Lernpfad-ID (PATH:SSF:ECO-KREDIT-NOXIA-0001 etc.)

## Aktuell in NOXIA (Übergangslösung)

Bis dieser Task erledigt ist zeigt NOXIA einen Link auf:
`https://solarsciencefoundation.vercel.app/learn?ref=noxia&uid={uid}&module={moduleId}`

## Blocks

- Spieler können das richtige Modul nicht direkt öffnen
- SSF-Unlock-Kette funktioniert, aber UX ist suboptimal


## Erledigt 2026-07-21

- `/app/learn/page.tsx`: handle `?path=` und `?module=` → redirect zu /learning-paths/[id], uid/ref erhalten
- `/app/api/noxia/redirect/route.ts`: GET /api/noxia/redirect?path=...&uid=... → 302 redirect oder JSON URL

**NOXIA kann jetzt verwenden:**

```
/learn?path=PATH:SSF:ECO-KREDIT-NOXIA-0001&ref=noxia&uid={uid}
/learn?module=ECO-L0-000001&ref=noxia&uid={uid}
/api/noxia/redirect?path=PATH:SSF:ECO-KREDIT-NOXIA-0001&uid={uid}
```


## Resolution — 2026-07-20

SSF hat Option 1 (/learn?path=...) und Option 2 (/api/noxia/redirect) implementiert.
NOXIA nutzt Option 1 — `getSsfPathUrl()` in `ssfPaths.ts` v1.2.0.

**Status: Done**
