# KG-0003 — `unlocks/check` vor produktiver Aktivierung härten

## Target System
Solar Science Foundation (SSF)

## Origin
KueperKnowledgeGraph — Architektur-/Datenfluss-Review (Ist-Zustand 2026-07-03), am Code verifiziert

## Target File
`app/api/noxia/unlocks/check/route.ts`

## Reason
Der Endpunkt nimmt `completedModules` **direkt aus dem Request-Body** entgegen und
leitet daraus Freischaltungen ab — **ohne Auth, ohne API-Key, ohne CORS-Grenze**.
Ein Client kann damit beliebigen „Fortschritt" behaupten und Unlocks auslösen.

Verifiziert am Code:

```ts
const completedModules = Array.isArray(body.completedModules) ? … : [];
const state = getNoxiaDemoUnlockState(completedModules);
```

Einordnung: Der Endpunkt ist heute ausdrücklich **Demo-Grade** (Schema
`SSF-NOXIA-UNLOCK-CHECK-0.1`, `getNoxiaDemoUnlockState`). Als Demo ist das in
Ordnung. Das Problem entsteht **erst**, wenn NOXIA→SSF produktiv aktiviert wird
(`KNOWLEDGE_SOURCE=ssf`) und dieser Pfad autoritativ wird.

## Requested Change
Bevor der Endpunkt als produktiver/autoritativer Pfad genutzt wird:
1. **Serverseitige Fortschrittsauflösung** — echten Spielerfortschritt aus Supabase
   nachschlagen statt aus dem Body zu vertrauen.
2. **Authentifizierung** zwischen NOXIA und SSF (z. B. shared API-Key / signierte
   Requests) einführen.
3. **CORS/Origin** explizit begrenzen.
4. Demo-Pfad klar von Produktiv-Pfad trennen (z. B. eigener Demo-Endpunkt bleibt,
   Produktiv-Endpunkt validiert).

## Priority
High — als Voraussetzung, nicht als Sofort-Bug

## Blocking
Blockiert die produktive Aktivierung von SSF↔NOXIA. Solange der Pfad Demo bleibt,
nicht blockierend.

## Related
Hängt mit NOX-0003 (SSF-Basis-URL) zusammen: beide betreffen dieselbe SSF↔NOXIA-Kopplung.

## Status
Open

## Created
2026-07-03
