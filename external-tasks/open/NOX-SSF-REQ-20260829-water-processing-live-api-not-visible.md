# NOXIA → SSF: `UNL:NOX:water-processing` fehlt weiterhin in der Live-API

**Origin:** NOXIA
**Target:** Solar Science Foundation (SSF)
**Status:** open
**Created:** 2026-08-29
**Priority:** high

## Reproduzierbarer Fehler

NOXIA öffnet:

`/academy/learn?unlock=UNL:NOX:water-processing`

und erhält weiterhin:

> Für diese Voraussetzung wurde noch kein SSF-Lernmodul gefunden.

NOXIA lädt hierfür `/api/ssf/modules`; dieser Proxy lädt SSF `/api/noxia/modules` und sucht ausschließlich nach einem Modul, dessen `unlocks[]` exakt `UNL:NOX:water-processing` enthält.

## Repository-Befund

Die fachliche/kanonische Arbeit ist bereits vorhanden:

- KG-Export `exports/kxf-learning-modules-0.1.json` enthält die kanonische Modulzuordnung mit `legacyId: LRN:SSF:NOX-WATER-PROCESSING` und `unlocks: [UNL:NOX:water-processing]`.
- SSF `lib/learningPaths/noxiaWaterProcessing.ts` verwendet `kxfModuleId: LRN:SSF:NOX-WATER-PROCESSING` und den Pfad `PATH:SSF:NOX-WATER-PROCESSING-0001`.
- SSF `lib/learningPathRegistry.ts` registriert diesen Lernpfad.

Trotzdem erscheint das Modul im von NOXIA konsumierten Live-Modulindex offenbar nicht.

## Wahrscheinliche Fehlerstelle

`lib/api/kg.ts` bevorzugt bei gesetztem `KUEPER_KG_API_URL` jede erfolgreiche Live-API-Antwort vor dem GitHub-Raw-Export. Eine erfolgreiche, aber veraltete KG-Live-Antwort kann dadurch den bereits aktualisierten Raw-KXF-Export verdecken. `fetchKgExport()` fällt nur dann auf GitHub Raw zurück, wenn die Live-Endpunkte keine Daten liefern.

Bitte die tatsächlich ausgelieferte Quelle von `/api/noxia/modules` prüfen:

1. Welche `sourceUrl`/welche KXF-Version wird produktiv geladen?
2. Enthält der produktive Modulindex `UNL:NOX:water-processing`?
3. Falls `KUEPER_KG_API_URL` einen veralteten Export liefert: im zuständigen KG-Repository einen External Task für Deployment/Export-Synchronisation anlegen oder die SSF-Adapterlogik so härten, dass ein älterer Live-Snapshot keinen neueren kanonischen Export überschreibt.
4. Keine lokale konkurrierende NOXIA-/KG-Identität erfinden.

## Akzeptanz

- SSF `/api/noxia/modules` liefert ein Modul mit `unlocks[]` einschließlich `UNL:NOX:water-processing`.
- Das Modul besitzt eine stabile kanonische Identität, die auf `LRN:SSF:NOX-WATER-PROCESSING` zurückgeführt wird.
- NOXIA kann `/academy/learn?unlock=UNL:NOX:water-processing` ohne Sonderfall/Fallback öffnen.
- Ursache (staler Live-KG-Export, Deployment oder andere Adapterabweichung) ist im Task dokumentiert.
