---
status: open
id: EXT-NOXIA-SSF-20261029-learning-prerequisites
requester: SYS:KUEPER:noxia
recipient: SYS:KUEPER:ssf
type: content + mapping
priority: high
created: 2026-10-29
supersedes: EXT-NOXIA-SSF-20261028-finance-module-unlocks
related: EXT-NOXIA-SSF-20261029-exams-for-all-modules
blocking: [NOXIA-BANK-CREDIT, NOXIA-BUILD-SMELTER, NOXIA-PHOBOS-WORKSHOP, NOXIA-PILOT-LICENSE, NOXIA-MERCHANT-QUALIFICATION]
---

# NOXIA → SSF: Lernmodule für alle Lernvoraussetzungen im Spiel

Thomas, 28.10.2026: „Es gibt oft Lernvoraussetzungen, z. B. Solarfeld, Kredit usw. … das muss dringend wieder verbunden werden, damit man lernen und Funktionen nutzen kann.“

NOXIA hat die Lernvoraussetzungen am 28.10.2026 wieder mit den Lernmodulen verbunden. Überall, wo eine Voraussetzung angezeigt wird, steht jetzt „Jetzt lernen →“ mit Direktlink auf das Modul, das die SSF für diese Freischaltung liefert. Fehlt das Modul, zeigt NOXIA „Lernmodul folgt“. Dieser Request listet **jede Freischaltung, die NOXIA verlangt**, mit dem Stand der SSF und dem, was fehlt.

Quellstand: SSF `3091fff`, NOXIA `925eefa8` (beide `main`, 29.10.2026). Geprüft über `registeredLearningPaths`, `quarantinedLearningPaths` und `getNoxiaKnowledgeModule()` aus `lib/noxiaBridge.ts`.

Prüfungen (`assessment[]`, Kurztests) sind **nicht** Teil dieses Requests – siehe `EXT-NOXIA-SSF-20261029-exams-for-all-modules`. Ohne Prüfung lässt sich in NOXIA seit 29.10.2026 kein Modul mehr abschließen. Jedes Modul, das hier neu entsteht, braucht deshalb auch einen Kurztest nach `docs/SSF-QUIZ-RICHTLINIEN.md`.

---

## Vertrag, wie NOXIA die SSF nutzt

| Zweck | Aufruf | Was NOXIA daraus liest |
|---|---|---|
| Modulliste | `GET /api/noxia/modules` | `id`, `legacyId`, `pathId`, `title`, `unlocks[]` |
| Modulinhalt | `GET /api/noxia/modules/{id}` | `sections[]`, `assessment[]`, `unlocks[]` |
| Freischaltung nach Abschluss | `POST /api/noxia/unlocks/check` mit `X-NOXIA-API-KEY`, Body `{ "completedModules": ["<id>"] }` | `unlocks[].id` |

Regeln, die für jede Lieferung gelten:

1. **Freischaltungen exakt mit Präfix:** `UNL:NOX:…`, Groß- und Kleinschreibung wie unten. Kurzformen wie `NAV:ORBITAL` oder `SENSOR:ATMOSPHERE` (z. B. in `PATH:SSF:PHY-SKY-0001`) zählen in NOXIA **nicht**.
2. **Beide Kennungen auflösbar:** `GET /api/noxia/modules/{id}` und `unlocks/check` müssen mit der KXF-ID (`LRN:SSF:…`) **und** der Legacy-ID (`sourceModuleId`) dasselbe Modul liefern. NOXIA speichert Abschlüsse unter der ID, die in `/api/noxia/modules` als `id` steht.
3. **NOXIA-Hierarchie:** NOXIA vergibt eine Freischaltung erst, wenn deren Vorstufen vorhanden sind (`lib/knowledge/unlockRegistry.ts`, Feld `requiresUnlocks`). Die Vorstufe `UNL:NOX:orientation` vergibt NOXIA selbst beim Onboarding – dafür braucht es kein SSF-Modul.

---

## A · Kredit und Festgeld: Freischaltung fehlt – **hoch, blockiert Bank**

**Befund**
- `lib/learningPaths/finance.ts` Zeile 18 (`PATH:SSF:ECO-KREDIT-NOXIA-0001`) und Zeile 61 (`PATH:SSF:ECO-ZINSESZINS-NOXIA-0001`): `unlocks: []`.
- Die Legacy-Pfade in `lib/learningPaths.ts` (Zeile ~4637 mit `UNL:NOX:bank-credit`, ~4721 mit `UNL:NOX:bank-compound`) sind über `SUPERSEDED_LEGACY_PATH_IDS` ausgeblendet. Dabei ging die Zuordnung verloren.
- Folge: `unlocks/check` meldet für beide Module **keine** Freischaltung (getestet mit `getNoxiaDemoUnlockState(['LRN:SSF:ECO-L0-000001'])` → `[]`).

**Soll**

| Modul | Legacy-ID | `unlocks` |
|---|---|---|
| `LRN:SSF:ECO-L0-000001` „Was kostet geliehenes Kapital wirklich?“ | `ECO-L0-000001` | `['UNL:NOX:bank-credit']` |
| `LRN:SSF:ECO-L0-000002` „Warum wächst Zinseszins anders …?“ | `ECO-L0-000002` | `['UNL:NOX:bank-compound']` |

**Abnahme**
- `GET /api/noxia/modules` → Eintrag `LRN:SSF:ECO-L0-000001` hat `"unlocks": ["UNL:NOX:bank-credit"]`, `LRN:SSF:ECO-L0-000002` hat `"unlocks": ["UNL:NOX:bank-compound"]`.
- `POST /api/noxia/unlocks/check` mit `{"completedModules":["LRN:SSF:ECO-L0-000001"]}` **und** mit `{"completedModules":["ECO-L0-000001"]}` → `unlocks` enthält `{ "id": "UNL:NOX:bank-credit" }`. Dasselbe für `…000002` → `UNL:NOX:bank-compound`.

---

## B · Schmelze: kein Modul – **hoch, blockiert Bauen**

**Befund:** NOXIA sperrt das Gebäude `smelter` (Schmelze I) serverseitig, bis `UNL:NOX:smelting` vorliegt (`lib/knowledge/buildRequirements.ts`). Kein registrierter Pfad trägt `UNL:NOX:smelting`. Die Schmelze ist damit für niemanden baubar. Der frühere NOXIA-Verweis auf `LRN:SSF:CHE-1301` passt nicht – die SSF bildet `SSF-CHE-1301` auf `PATH:SSF:CHE-IRIDIUM-0001` (Iridium-Katalysatoren) ab.

**Soll:** neuer Pfad, Vorschlag `PATH:SSF:NOX-SMELTING-0001`, im Stil der `noxiaUnlockFoundations`.
- Titel als Leitfrage, z. B. „Wie wird aus Erz ein nutzbares Metall?“
- Inhalt laut NOXIA-Scope: thermische Metallgewinnung und Weiterverarbeitung – Reduktion, Schmelzen, Schlacke, Energiebedarf, Reinheit, Legieren, Gießen
- `unlocks: ['UNL:NOX:smelting']`
- NOXIA-Vorstufe: `UNL:NOX:resource-extraction` (Modul `LRN:SSF:NOX-RESOURCE-EXTRACTION`) – bitte als fachliche Voraussetzung im Pfad nennen
- Kurztest nach Quiz-Richtlinien

**Abnahme:** `GET /api/noxia/modules` enthält ein Modul mit `"unlocks": ["UNL:NOX:smelting"]`, `sections` > 0 und `assessment` > 0. `unlocks/check` liefert `UNL:NOX:smelting`.

---

## C · Phobos-Werkstatt: zwei Technologien ohne Modul – **hoch, blockiert Fertigung**

**Befund:** Die Werkstatt (`lib/game/vehicles/robotModuleManufacturing.ts`) fertigt nur mit diesen Freischaltungen. Für keine gibt es ein SSF-Modul. Kein Rezept ist herstellbar.

| Freischaltung | Rezepte, die daran hängen |
|---|---|
| `UNL:NOX:ENG:ROBOT-FABRICATION` | Regolithschaufel, Reaktionskompensierter Bohrer, Geschlossener Materialhopper, Werkzeugwechsler, Ersatzteilrack |
| `UNL:NOX:ENG:PRECISION-INSTRUMENTATION` | Bodenradar, Massenmesszelle, Inspektionskamera, Spektrometerpaket (zusätzlich `UNL:NOX:SENSOR:SPECTRAL` – vorhanden über `LRN:SSF:PHY-L1-000001`) |

**Soll:** zwei Pfade, Vorschlag `PATH:SSF:NOX-ROBOT-FABRICATION-0001` und `PATH:SSF:NOX-PRECISION-INSTRUMENTATION-0001`.
- **Robotikfertigung:** modulare Werkzeuge an Robotern, Schnittstellen und Werkzeugwechsel, Reaktionskräfte beim Bohren in geringer Schwerkraft (Phobos), Staubdichtigkeit, Ersatzteilhaltung
- **Präzisionsinstrumente:** Messprinzip, Kalibrierung, Messunsicherheit, Bodenradar, Massenmessung ohne nutzbare Gewichtskraft, Bildinspektion
- `unlocks` jeweils genau die eine Freischaltung oben, dazu Kurztest

**Abnahme:** je ein Modul mit der Freischaltung in `GET /api/noxia/modules`, Inhalt und Prüfung vorhanden.

---

## D · Flugausbildung (Pilot): Module falsch verknüpft oder leer – **hoch, blockiert eigene Pilotenlizenz**

**Befund:** NOXIA verlangt für die eigene Flugausbildung zwei Abschlüsse: `PILOT_TRAINING_MODULES = ['PHY-1101', 'AST-2101']` in `lib/game/pilotQualification.ts`. NOXIA vergleicht dabei nur das Kürzel nach dem letzten `:`. `LRN:SSF:PHY-1101` zählt also, `LRN:SSF:PHY-1103` nicht.

| NOXIA verlangt | SSF liefert heute | Problem |
|---|---|---|
| `PHY-1101` – Gravitation | `GET …/modules/PHY-1101` → KXF-Modul `SSF-PHY-1101` „Was ist Schwerkraft?“, **0 Abschnitte**, `unlocks: ['UNL:NOX:orbital-navigation']` | nicht abschließbar. Zusätzlich zeigt `MODULE_ALIAS_MAP['SSF-PHY-1101']` auf `PATH:SSF:PHY-WAVE-SPECTRUM-0001` „Was Schwingungen erzählen“ (Spektren, nicht Gravitation), dessen `kxfModuleId` ebenfalls `LRN:SSF:PHY-1101` ist. Zwei Themen teilen sich eine Kennung. |
| `AST-2101` – Orbitalmechanik | `GET …/modules/AST-2101` → `null`. `LRN:SSF:AST-2101` → über `MODULE_ALIAS_MAP['SSF-AST-2101']` → `PATH:SSF:PHY-SKY-0001` „Warum ist der Himmel blau“ (`LRN:SSF:PHY-1103`) | unauffindbar mit Kurzform. Mit Langform falsches Thema, und der Abschluss wird als `PHY-1103` gespeichert und zählt nicht. |

**Soll – Vorschlag, die SSF entscheidet:**
1. **Gravitation:** Ein Modul mit Inhalt und Prüfung unter einer Kennung, die auf `PHY-1101` endet. Naheliegend ist der vorhandene, aktive Pfad `PATH:SSF:PHY-ENERGIE-ARBEIT-0001` „Warum kostet es Energie, einen Himmelskörper zu verlassen?“ (Gravitationsbrunnen, `PHY-L2-000005`, 7 Abschnitte, interaktiv, noch ohne Kurztest). Die Spektren-Inhalte bräuchten dann eine eigene Kennung.
2. **Orbitalmechanik:** `AST-2101` auf `PATH:SSF:AST-SONNENSYSTEM-0001` „Warum fliegen Raumschiffe Kurven“ (Hohmann-Transfer, `LRN:SSF:AST-L1-000001`) abbilden statt auf „Warum ist der Himmel blau“. Die Kurzform `AST-2101` muss dabei auflösbar sein.
3. **Rückmeldung an NOXIA:** Wenn ihr andere kanonische Kennungen wählt, nennt sie im Erledigt-Vermerk. NOXIA passt dann `PILOT_TRAINING_MODULES` an. Wichtig ist nur: eine Kennung je Thema, und die Kennung, die `/api/noxia/modules` als `id` liefert, ist die, die NOXIA speichert.

**Abnahme:** `GET /api/noxia/modules/{Gravitation-ID}` und `…/{Orbitalmechanik-ID}` liefern jeweils das richtige Thema mit `sections` > 0 und `assessment` > 0.

---

## E · Kaufmännische Grundausbildung: drittes Wirtschafts-Grundmodul fehlt – **mittel**

**Befund:** Das erste eigene Schiff verlangt eine kaufmännische Qualifikation. Dafür gibt es zwei Wege: fünf Verkäufe an einem anderen Ort oder **drei verschiedene abgeschlossene Wirtschafts-Grundmodule** (`COMMERCIAL_BASICS_MODULES = 3`, `lib/game/merchantQualification.ts`). NOXIA erkennt sie am Muster `/(^|:)ECO-L0-\d+$/`. Die SSF hat nur zwei (`ECO-L0-000001`, `ECO-L0-000002`). Der Weg über die Akademie ist damit verschlossen.

**Soll:** `ECO-L0-000003` „Was ist ein Sicherheitenwert?“ (KXF `LRN:SSF:ECO-L0-000003`).
- Inhalt: Sicherheit, Beleihungswert, warum der Kreditrahmen am Wert der Sicherheiten hängt
- NOXIA-Bezug für den Praxisteil: Kreditrahmen = 70 % des Sicherheitenwerts (Schiffe zu 60 % ihres Neupreises), höchstens 50 000 Cr
- `unlocks: ['UNL:NOX:bank-collateral']`
- Kurztest

**Abnahme:** Modul in `/api/noxia/modules` mit `id` `LRN:SSF:ECO-L0-000003`, Legacy-ID `ECO-L0-000003`, `unlocks` wie oben, Inhalt und Prüfung vorhanden.

---

## F · Handel und Bodenwert: keine Module – **mittel**

NOXIA zeigt diese als Lernschwellen im Warenhaus und in der Verwaltung („hilft“, noch keine harte Sperre) und findet kein Modul.

| Kennung (Vorschlag) | Titel | `unlocks` | Inhalt / NOXIA-Bezug |
|---|---|---|---|
| `LRN:SSF:ECO-L1-000001` / `ECO-L1-000001` | „Was ist Arbitrage?“ | `UNL:NOX:advanced-trading` | Preisunterschiede zwischen Orten, Transportkosten, Risiko. NOXIA hat Ortspreise je Standort und Spediteure (bis 40 t, 12 % vom Erlös). |
| `LRN:SSF:ECO-L1-000002` / `ECO-L1-000002` | „Was ist Bodenwert?“ | `UNL:NOX:land-value` | Bodenwert, Lage, Grundsteuer. NOXIA: Lage (Nähe zur Ortsmitte) erhöht den Preis, Konsumsteuer 19 %. |

Hinweis: Die Kennung `ECO-L1-…` zählt in NOXIA bewusst **nicht** zur kaufmännischen Grundausbildung (nur `ECO-L0-…`).

---

## G · Weitere Freischaltungen ohne Modul – **niedrig**

| Freischaltung | Wo in NOXIA | Stand |
|---|---|---|
| `UNL:NOX:NAV:CURVATURE` | Raumhafen, Lernschwelle „Bahnkrümmung“ (hilft der Navigation) | kein Modul |
| `UNL:NOX:research:magnetobiology-experiment-design` | Forschungshandlung `ACT:NOX:RESEARCH:MAGNETOBIOLOGY-EXPERIMENT-DESIGN` (`lib/knowledge/researchCapability.ts`) | kein Modul. NOXIA-Scope: Magnetfeld-Expositionen als Forschungsvariable planen – Organismus/Genotyp, Kontrollen, Endpunkte, Replikation, Nullbefunde; ausdrücklich keine Human- oder Therapiewirkung. Vorstufe: `UNL:NOX:orientation`. |

---

## H · Zur Kenntnis – im NOXIA-Katalog, noch keine Sperre

Diese Freischaltungen stehen in `lib/knowledge/data.ts`, sperren aber noch nichts. Bitte vormerken, nicht dringend.

| Freischaltung | Gebäude laut Katalog |
|---|---|
| `UNL:NOX:solar-grid` | Batteriespeicher I |
| `UNL:NOX:greenhouse-systems` | Gewächshaus I, Nahrungsproduktion I (Lebensmittel werden in NOXIA gerade zur echten Ware) |
| `UNL:NOX:controlled-biology` | Biolabor I |
| `UNL:NOX:transfer-routes` | Frachtkontrolle I |
| `UNL:NOX:orbital-navigation` | Raumhafen I. Trägt heute nur das leere KXF-Modul `SSF-PHY-1101`, s. D. |

---

## Was bereits passt (kein Handlungsbedarf außer Prüfung)

| Freischaltung | SSF-Modul | Legacy-ID |
|---|---|---|
| `UNL:NOX:power-generation` (Solarfeld) | `LRN:SSF:ENG-POWER-GENERATION-0001` | `ENG-L1-000001` |
| `UNL:NOX:water-processing` | `LRN:SSF:NOX-WATER-PROCESSING` | `SSF-NOX-WATER-0001` |
| `UNL:NOX:resource-extraction` (Mine) | `LRN:SSF:NOX-RESOURCE-EXTRACTION` | `ENG-L1-000005` |
| `UNL:NOX:pressure-systems` | `LRN:SSF:NOX-PRESSURE-SYSTEMS` | `PHY-L1-000026` |
| `UNL:NOX:airlock` | `LRN:SSF:NOX-AIRLOCK` | `ENG-L1-000006` |
| `UNL:NOX:life-support` | `LRN:SSF:NOX-LIFE-SUPPORT` | `BIO-L1-000002` |
| `UNL:NOX:thermal-control` | `LRN:SSF:NOX-THERMAL-CONTROL` | `PHY-L1-000027` |
| `UNL:NOX:radiation-protection` | `LRN:SSF:NOX-RADIATION-PROTECTION` | `PHY-L1-000028` |
| `UNL:NOX:environment-monitoring` | `LRN:SSF:NOX-ENVIRONMENT-MONITORING` | `ENG-L1-000007` |
| `UNL:NOX:habitat-redundancy` | `LRN:SSF:NOX-HABITAT-REDUNDANCY` | `ENG-L1-000008` |
| `UNL:NOX:mars-habitat` | `LRN:SSF:NOX-MARS-HABITAT` | `ENG-L1-000009` |
| `UNL:NOX:NAV:ORBITAL` | `LRN:SSF:AST-L1-000001` (auch `LRN:SSF:STATION-L1-000001`) | `AST-L1-000001` |
| `UNL:NOX:SENSOR:SPECTRAL` | `LRN:SSF:PHY-L1-000001` | `PHY-L1-000001` |
| `UNL:NOX:COLONY:FOUND`, `UNL:NOX:SHIP:PIONEER` | `LRN:SSF:COLONY-L1-000001` | `COLONY-L1-000001` |
| `UNL:NOX:STATION:FOUND` | `LRN:SSF:STATION-L1-000001` | `STATION-L1-000001` |
| `UNL:NOX:SHIP:SCOUT` | `LRN:SSF:AST-L1-000001` | `AST-L1-000001` |

Alle haben Inhalt. Die Prüfung fehlt bzw. kommt noch als Rohtext – siehe Exams-Request.

---

## Reihenfolge

1. **A** (kleine Änderung, sofort wirksam für die Bank)
2. **B, C, D** (blockieren Spielfunktionen vollständig)
3. **E, F**
4. **G, H**

## Zwischenlösung in NOXIA

- `lib/knowledge/learningCatalog.ts` ordnet die Module aus A und die Module mit passender Legacy-ID ihrer Freischaltung zu, solange die SSF-Angabe fehlt. Die SSF-Angabe hat Vorrang, sobald sie geliefert wird.
- Wo kein Modul existiert (B, C, D, E, F, G), zeigt NOXIA „Lernmodul folgt“. Sobald ein Modul mit der Freischaltung in `/api/noxia/modules` auftaucht, erscheint dort automatisch „Jetzt lernen →“ – ohne Änderung in NOXIA. Ausnahme ist D, falls sich die Kennungen ändern.

Bitte je Abschnitt einen Erledigt-Vermerk mit den tatsächlichen Kennungen ergänzen.
