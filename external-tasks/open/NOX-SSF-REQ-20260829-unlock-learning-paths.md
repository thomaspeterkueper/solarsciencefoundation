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

## Blocker-Prüfung 2026-08-29

Der Auftrag lag länger als zwei Stunden offen und wurde deshalb gemäß Stale-Task-Regel unmittelbar untersucht. Der Stillstand ist nicht durch fehlende SSF-Implementierungsfähigkeit verursacht, sondern durch eine bestehende Source-of-Truth-Abhängigkeit:

- `docs/noxia-module-api.md` definiert den Knowledge Graph als Source of Truth für kanonische Wissens-/Modulidentität und strukturelle Metadaten; SSF besitzt Didaktik und Lerninhalt.
- `lib/kxf.ts` normalisiert die Live-Lernmodule aus dem KG/KXF-Export. `module.unlocks[]` stammt dabei aus den KXF-Modulrecords (`dependencies.moduleUnlocks` / `module_unlocks` / `unlocks` bzw. `noxia.grants`).
- Für die hier geforderten neuen Lernpfade sind im KG derzeit keine passenden kanonischen Modulrecords auffindbar. Würde SSF eigenständig neue kanonische Modulidentitäten oder konkurrierende Unlock-Zuordnungen erfinden, würde es die bestehende Source-of-Truth-Grenze verletzen.

Der fehlende strukturelle Schritt wurde daher an das zuständige Repository geroutet:

`kueper-knowledge-graph/external-tasks/open/EXT-SSF-KG-20260829-noxia-unlock-learning-module-identities.md`

**Nächster Schritt:** KG stellt kanonische `LRN:SSF:*`-Identitäten bzw. Zuordnungen und die NOXIA-Grant-Metadaten im Learning-Modules-KXF bereit. Danach kann SSF die didaktischen Pfade lokal implementieren und diesen Auftrag nach `done/` verschieben.
