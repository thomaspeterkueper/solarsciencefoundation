# NOXIA → SSF: Lernpfade für kanonische NOXIA-Unlocks

**Origin:** NOXIA
**Target:** Solar Science Foundation (SSF)
**Status:** done
**Created:** 2026-08-29
**Completed:** 2026-08-30

NOXIA hat die Semantik und Hierarchie der angefragten Unlocks kanonisch festgelegt. Source of Truth für Unlock-Identität und Spielwirkung bleibt NOXIA; SSF ist Source of Truth für Lerninhalte und didaktische Umsetzung.

## Abschluss

Die angeforderten SSF-Lernpfade sind umgesetzt und im zentralen Lernpfad-Registry registriert. Der bestehende Wasseraufbereitungs-Pfad verwendet die kanonische KG-ID `LRN:SSF:NOX-WATER-PROCESSING` und gibt unverändert `UNL:NOX:water-processing` aus.

Zusätzlich sind folgende Pfade produktiv registriert:

- `UNL:NOX:resource-extraction` → `PATH:SSF:NOX-RESOURCE-EXTRACTION-0001`
- `UNL:NOX:pressure-systems` → `PATH:SSF:NOX-PRESSURE-SYSTEMS-0001`
- `UNL:NOX:airlock` → `PATH:SSF:NOX-AIRLOCK-0001`
- `UNL:NOX:life-support` → `PATH:SSF:NOX-LIFE-SUPPORT-0001`
- `UNL:NOX:thermal-control` → `PATH:SSF:NOX-THERMAL-CONTROL-0001`
- `UNL:NOX:radiation-protection` → `PATH:SSF:NOX-RADIATION-PROTECTION-0001`
- `UNL:NOX:environment-monitoring` → `PATH:SSF:NOX-ENVIRONMENT-MONITORING-0001`
- `UNL:NOX:habitat-redundancy` → `PATH:SSF:NOX-HABITAT-REDUNDANCY-0001`
- `UNL:NOX:mars-habitat` → `PATH:SSF:NOX-MARS-HABITAT-0001`

Produktionsprüfung am 2026-08-30: `https://solarsciencefoundation.vercel.app/api/noxia/modules` antwortet HTTP 200 und liefert die neuen `pathId`-Zuordnungen für die kanonischen KG-Module (u. a. `PHY-L1-000026..28`, `BIO-L1-000002`, `ENG-L1-000005..9`).

Die KG-Source-of-Truth bleibt unverändert; SSF erfindet keine NOXIA-IDs und dupliziert keine NOXIA-Spielregeln.
