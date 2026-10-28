# NOXIA → SSF Request: NOXIA-Freischaltungen der Finanzpfade wieder eintragen

Origin: NOXIA (noxiagame, Fix „Lernvoraussetzungen wieder mit Lernmodulen verbinden“, 28.10.2026)
Priority: hoch

## Befund

`GET /api/noxia/modules` liefert die governed Finanzpfade mit leerem `unlocks`:

| Modul | Legacy-ID | Pfad | `unlocks` heute | erwartet |
|---|---|---|---|---|
| LRN:SSF:ECO-L0-000001 | ECO-L0-000001 | PATH:SSF:ECO-KREDIT-NOXIA-0001 | `[]` | `UNL:NOX:bank-credit` |
| LRN:SSF:ECO-L0-000002 | ECO-L0-000002 | PATH:SSF:ECO-ZINSESZINS-NOXIA-0001 | `[]` | `UNL:NOX:bank-compound` |

Ursache: `lib/learningPaths/finance.ts` setzt `unlocks: []`; die Legacy-Pfade in `lib/learningPaths.ts` (mit `UNL:NOX:bank-credit` bzw. `UNL:NOX:bank-compound`) sind über `SUPERSEDED_LEGACY_PATH_IDS` ausgeblendet. Dadurch liefert auch `POST /api/noxia/unlocks/check` für diese Module keine Freischaltung.

## Bitte

1. In `financeLearningPaths` die NOXIA-Freischaltungen wieder eintragen (`UNL:NOX:bank-credit`, `UNL:NOX:bank-compound`).
2. Prüfen, ob `getNoxiaDemoUnlockState` danach für beide Kennungen (LRN:SSF:… und Legacy-ID) die Freischaltung meldet.
3. Falls geplant: Module für `UNL:NOX:bank-collateral`, `UNL:NOX:advanced-trading`, `UNL:NOX:land-value` (Sicherheitenwert, Arbitrage, Bodenwert) – NOXIA zeigt diese als Lernschwellen in Bank, Warenhaus und Verwaltung, findet aber kein Modul.

## Zwischenlösung in NOXIA

NOXIA ordnet bekannte Module über ein eigenes Lernverzeichnis (`lib/knowledge/learningCatalog.ts`) ihrer Freischaltung zu, solange die SSF-Angabe fehlt. Die SSF-Angabe hat Vorrang, sobald sie geliefert wird.
