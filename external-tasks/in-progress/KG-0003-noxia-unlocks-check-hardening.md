# KG-0003 — `unlocks/check` vor produktiver Aktivierung härten

## Decision
Accepted

## Status
in-progress

## Target System
Solar Science Foundation (SSF)

## Target File
`app/api/noxia/unlocks/check/route.ts`

## Grund
Der Endpunkt nimmt `completedModules` direkt aus dem Request-Body entgegen und leitet daraus Freischaltungen ab – ohne Authentifizierung, API-Key oder Origin-Prüfung.

## Verifizierter Codepfad

```ts
const completedModules = Array.isArray(body.completedModules)
  ? body.completedModules
  : [];

const state = getNoxiaDemoUnlockState(completedModules);
```

## Bewertung
Der Endpunkt ist als Demo-Endpunkt nachvollziehbar. Problematisch wird dies erst dann, wenn NOXIA künftig produktiv gegen SSF arbeitet und dieser Endpunkt autoritative Entscheidungen trifft.

Die Anforderung ist fachlich korrekt und wird als Voraussetzung für eine spätere produktive SSF↔NOXIA-Kopplung akzeptiert.

## Anforderung

1. Serverseitige Fortschrittsauflösung statt Vertrauen auf den Request-Body.
2. Authentifizierung zwischen NOXIA und SSF vorsehen.
3. Origin/CORS einschränken.
4. Demo- und Produktivpfad klar trennen.

## Umsetzungshinweis

Die produktive Variante darf Freischaltungen nur aus serverseitig geprüften SSF-Fortschrittsdaten ableiten. Ein Demo-Pfad kann bestehen bleiben, muss aber eindeutig als Demo gekennzeichnet und darf nicht für produktive NOXIA-Kopplung verwendet werden.

## Priority
High

## Created
2026-07-03

## Accepted
2026-07-03
