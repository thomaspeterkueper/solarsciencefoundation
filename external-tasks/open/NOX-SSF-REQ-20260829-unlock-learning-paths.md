# NOXIA → SSF: Lernpfade für kanonische NOXIA-Unlocks

**Origin:** NOXIA
**Target:** Solar Science Foundation (SSF)
**Status:** open
**Created:** 2026-08-29

NOXIA hat die Semantik und Hierarchie der angefragten Unlocks kanonisch festgelegt. Source of Truth für Unlock-Identität und Spielwirkung bleibt NOXIA; SSF ist Source of Truth für Lerninhalte und didaktische Umsetzung.

## Mappingvertrag

SSF-Module geben die freigeschalteten NOXIA-IDs im bestehenden Feld `module.unlocks[]` zurück. NOXIA löst Lernmodule anhand dieser IDs auf. SSF soll keine NOXIA-Unlock-IDs umbenennen oder neue NOXIA-IDs erfinden.

## Basispfade

### `UNL:NOX:resource-extraction` — Rohstoffgewinnung I
Scope: Prozesskette Deposit → Entnahme/Abbau → Zerkleinerung → Trennung/Anreicherung → Gewinnung/Aufbereitung → nutzbarer Rohstoff/Handelsgut; Ausbeute, Reinheit, Energie-/Wasserbedarf, Reststoffe. Spielwirkung: `BLD:NOX:mine-1` und basale Deposit-Gewinnung.

Bitte den im SSF-Request vorgeschlagenen Lernpfad mit Stoffgemisch-/Trennexperiment umsetzen und dieses Unlock ausgeben.

### `UNL:NOX:water-processing` — Wasseraufbereitung I
Scope: Rohwasserqualität, Schwebstoffe/gelöste Stoffe/Mikroorganismen, Sedimentation/Filtration, Adsorption, Desinfektion, Membranverfahren/RO bzw. Destillation, Auswahl einer Aufbereitungskette, Recycling- und extraterrestrische Versorgung. Spielwirkung: `BLD:NOX:wasseraufbereitung-1`.

Bitte entsprechenden Lernpfad umsetzen und dieses Unlock ausgeben.

## Mars-Habitat: gestufte Struktur

`UNL:NOX:mars-habitat` ist kanonisch ein **Integrations-/Master-Unlock**. Kleine Lernpfade sollen vorher sichtbare Teilfortschritte ermöglichen.

Kanonische Teil-Unlocks:
- `UNL:NOX:pressure-systems` — Druck/Gasverhalten, gasdichte Druckhülle → einfache Druckkabine
- `UNL:NOX:airlock` — Luftschleusen; benötigt pressure-systems → Luftschleuse
- `UNL:NOX:life-support` — O2, CO2-Abscheidung, Luftumwälzung; benötigt pressure-systems + water-processing + power-generation → Lebenserhaltungsmodul
- `UNL:NOX:thermal-control` — Isolation, Heizen/Kühlen/Wärmetransport; benötigt power-generation
- `UNL:NOX:radiation-protection` — extraterrestrischer Strahlenschutz → geschützter Aufenthaltsbereich
- `UNL:NOX:environment-monitoring` — Sensorik kritischer Habitatparameter; benötigt power-generation
- `UNL:NOX:habitat-redundancy` — Single Points of Failure/Fehlertoleranz; benötigt life-support + environment-monitoring

Master `UNL:NOX:mars-habitat` benötigt zusätzlich die bestehenden `UNL:NOX:water-processing` und `UNL:NOX:power-generation` sowie alle oben genannten Teil-Unlocks und gibt `BLD:NOX:mars-habitat-1` frei.

Bitte kleine fachlich abgeschlossene SSF-Pfade für die Teil-Unlocks und anschließend den Integrationspfad „Wie hält man Menschen auf dem Mars am Leben?“ umsetzen. Didaktisches Muster: Frage/Problem → Beobachtung → Erklärung → Experiment/Schema → Vertiefung → Anwendung/NOXIA-Transfer → Verständnisfragen.

## Akzeptanz

- Jeder Pfad liefert seine kanonische NOXIA-ID in `module.unlocks[]`.
- Voraussetzungen werden in SSF didaktisch berücksichtigt.
- `mars-habitat` wird erst im Integrationspfad vergeben.
- SSF dupliziert keine NOXIA-Spielregeln; NOXIA dupliziert keine SSF-Lerninhalte.

## Stale-Task-Untersuchung und Entblockung 2026-08-29

Der frühere Source-of-Truth-Blocker ist inzwischen aufgehoben. Die im Knowledge Graph angeforderten kanonischen Modulidentitäten sind auf dem KG-Default-Branch in Commit `81aad150ac7b2180b00e73daa90b57a523d9490e` vorhanden; der Rückauftrag `KG-SSF-20260829-noxia-unlock-identities-ready.md` enthält die verbindlichen Zuordnungen.

Damit ist die fachliche SSF-Arbeit wieder lokal, eindeutig und ohne neue Kanonentscheidung möglich. Die kanonischen IDs sind unter anderem:

- `LRN:SSF:NOX-RESOURCE-EXTRACTION`
- `LRN:SSF:NOX-WATER-PROCESSING`
- `LRN:SSF:NOX-PRESSURE-SYSTEMS`
- `LRN:SSF:NOX-AIRLOCK`
- `LRN:SSF:NOX-LIFE-SUPPORT`
- `LRN:SSF:NOX-THERMAL-CONTROL`
- `LRN:SSF:NOX-RADIATION-PROTECTION`
- `LRN:SSF:NOX-ENVIRONMENT-MONITORING`
- `LRN:SSF:NOX-HABITAT-REDUNDANCY`
- `LRN:SSF:NOX-MARS-HABITAT`

**Bereits weitergearbeitet:** Der vorhandene Wasseraufbereitungs-Pfad deckt die angeforderte didaktische Prozesskette bereits ab und war nur noch an eine veraltete lokale KXF-ID gebunden. `lib/learningPaths/noxiaWaterProcessing.ts` verwendet seit Commit `e19b8356dfb711daf0810dc047afba829423af3b` die kanonische KG-ID `LRN:SSF:NOX-WATER-PROCESSING`; die vorhandene NOXIA-ID `UNL:NOX:water-processing` bleibt unverändert.

**Noch offen:** Rohstoffgewinnung sowie die sieben Habitat-Teilpfade und der Habitat-Integrationspfad. Für diese Implementierungen ist nach der KG-Entblockung keine weitere Architektur- oder Kanonentscheidung erforderlich. Der Auftrag bleibt daher unter `open/`, bis diese lokalen SSF-Lernpfade umgesetzt und registriert sind.
