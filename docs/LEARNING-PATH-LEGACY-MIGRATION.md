# SSF Learning Path Legacy Migration

**Version:** 1.0.0  
**Status:** Active migration plan  
**Created:** 2026-09-13  
**Scope:** `lib/learningPaths.ts` → governed specialized learning-path files

## Ziel

`lib/learningPaths.ts` ist historisch zu einer sehr großen Sammeldatei angewachsen. Parallel existieren inzwischen fachlich und kanonisch gepflegte Pfade unter `lib/learningPaths/*.ts`.

Die Migration verfolgt drei Ziele:

1. pro Lernpfad genau eine autoritative SSF-Definition;
2. keine versteckten Altidentitäten hinter Registry-Overrides;
3. schrittweises Schrumpfen der Legacy-Datei ohne Verhaltensänderungen im laufenden System.

Die Laufzeit-Source-of-Truth ist `lib/learningPathRegistry.ts`. Neue Lernpfade werden nicht mehr in der Legacy-Sammeldatei angelegt.

---

## Bereits spezialisierte Pfade mit noch vorhandener Legacy-Kopie

Der aktuelle Registry-Stand markiert folgende Legacy-IDs als superseded:

| Path ID | Governed source | Migrationsstatus |
|---|---|---|
| `PATH:SSF:CHE-KUECHE-KARAMELL-0001` | `lib/learningPaths/caramelization.ts` | physische Legacy-Entfernung offen |
| `PATH:SSF:CHE-REINIGUNG-ROTWEIN-0001` | `lib/learningPaths/redWineStain.ts` | physische Legacy-Entfernung offen |
| `PATH:SSF:CHE-REINIGUNG-KALK-0001` | `lib/learningPaths/limescaleCleaning.ts` | physische Legacy-Entfernung offen |
| `PATH:SSF:CHE-REINIGUNG-CHLOR-0001` | `lib/learningPaths/chlorineCleaning.ts` | physische Legacy-Entfernung offen |
| `PATH:SSF:ECO-KREDIT-0001` | `lib/learningPaths/finance.ts` | physische Legacy-Entfernung offen |
| `PATH:SSF:ECO-KREDIT-NOXIA-0001` | `lib/learningPaths/finance.ts` | physische Legacy-Entfernung offen |
| `PATH:SSF:ECO-ZINS-0001` | `lib/learningPaths/finance.ts` | physische Legacy-Entfernung offen |
| `PATH:SSF:ECO-ZINSESZINS-NOXIA-0001` | `lib/learningPaths/finance.ts` | physische Legacy-Entfernung offen |
| `PATH:SSF:ENG-ROHSTOFFGEWINNUNG-0001` | `lib/learningPaths/noxiaResourceExtraction.ts` / governed resource path | physische Legacy-Entfernung offen |
| `PATH:SSF:CHE-WASSER-AUFBEREITUNG-0001` | `lib/learningPaths/noxiaWaterProcessing.ts` / governed water path | physische Legacy-Entfernung offen |

Zusätzlich existieren Foundation-Pfade, deren ältere Varianten durch governed NOXIA-foundation paths ersetzt werden. Diese werden separat im Registry-Layer behandelt und dürfen nicht mit fachlich eigenständigen SSF-Pfaden verwechselt werden.

---

## Entfernung in sicheren Wellen

### Welle A — fachlich abgeschlossene, isolierte Haushalts-/Alltagspfade

1. Karamellisierung
2. Rotweinfleck
3. Kalkreinigung
4. Hypochlorit/Chlorreinigung

Warum zuerst: Diese Pfade besitzen bereits spezialisierte Dateien und sind fachlich weitgehend voneinander isoliert. Das Risiko für fremde Gates und Unlocks ist gering.

### Welle B — Finance

1. Kredit
2. Kredit/NOXIA-Anwendung
3. Zins
4. Zinseszins/NOXIA-Anwendung

Vor physischer Entfernung müssen alle Modul-Aliase und Abhängigkeiten gegen `finance.ts` geprüft werden.

### Welle C — Ressourcen/Wasser

1. Rohstoffgewinnung
2. Wasseraufbereitung

Diese Pfade sind stärker mit NOXIA-Unlocks und Foundation-Pfaden gekoppelt. Vor Entfernung ist ein Gate-/Unlock-Abgleich erforderlich.

---

## Vorgehen je Pfad

Für jede Entfernung gilt dieselbe Reihenfolge:

1. Legacy-Block in `lib/learningPaths.ts` identifizieren.
2. `id`, `sourceModuleId`, `kxfModuleId`, `domainsNeeded`, Unit-IDs, Section-IDs und Gates mit dem governed Pfad vergleichen.
3. Prüfen, ob andere Legacy-Pfade auf Unit-/Section-IDs oder Unlocks verweisen.
4. Regressionstest für die kanonische Registry-Auflösung ergänzen, falls noch nicht vorhanden.
5. Legacy-Block physisch entfernen.
6. zugehörige ID aus `SUPERSEDED_LEGACY_PATH_IDS` entfernen.
7. Tests ausführen.
8. Erst nach grünem CI gilt die Migration als abgeschlossen.

Eine Entfernung darf nicht nur deshalb erfolgen, weil der Registry-Layer die Legacy-Kopie derzeit ausblendet.

---

## Done-Kriterium

Die Migration ist abgeschlossen, wenn:

- `SUPERSEDED_LEGACY_PATH_IDS` leer ist;
- governed Pfade direkt aus spezialisierten Dateien kommen;
- `lib/learningPaths.ts` nur noch nicht migrierte historische Pfade enthält oder vollständig auf Typdefinitionen/Kompatibilität reduziert wurde;
- keine Application-Route den Legacy-Array direkt konsumiert;
- Registry-Tests keine Identitäts-, Domain-, Gate- oder Alias-Probleme melden.

---

## Nicht-Ziele

Diese Migration ist **keine** Gelegenheit, gleichzeitig fachliche Inhalte umzuschreiben, KG-Identitäten zu erfinden oder NOXIA-Verhalten zu ändern. Fachliche Korrekturen werden separat behandelt; Änderungen an fremden Repository-Zuständigkeiten werden als externe Tasks an das jeweilige Ziel-Repository gegeben.
