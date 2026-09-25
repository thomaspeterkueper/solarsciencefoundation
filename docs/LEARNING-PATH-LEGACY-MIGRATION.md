# SSF Learning Path Legacy Migration

**Version:** 1.1.0  
**Status:** Active migration plan  
**Created:** 2026-09-13  
**Updated:** 2026-09-25  
**Scope:** `lib/learningPaths.ts` → governed specialized learning-path files

## Ziel

`lib/learningPaths.ts` ist historisch zu einer sehr großen Sammeldatei angewachsen. Parallel existieren inzwischen fachlich und kanonisch gepflegte Pfade unter `lib/learningPaths/*.ts`.

Die Migration verfolgt drei Ziele:

1. pro Lernpfad genau eine autoritative SSF-Definition;
2. keine versteckten Altidentitäten hinter Registry-Overrides;
3. schrittweises Schrumpfen der Legacy-Datei ohne Verhaltensänderungen im laufenden System.

Die Laufzeit-Source-of-Truth ist `lib/learningPathRegistry.ts`. Neue Lernpfade werden nicht mehr in der Legacy-Sammeldatei angelegt.

---

## Aktueller Migrationsbestand

Der Registry-Layer blendet derzeit mehrere historische IDs aus. Dabei müssen zwei Fälle unterschieden werden.

### A. Gleiche Path-ID, governed Ersatz vorhanden

Diese IDs bleiben als konsumierbare Lernpfade erhalten; ihre autoritative Definition kommt aus einer spezialisierten Datei:

| Path ID | Governed source | Migrationsstatus |
|---|---|---|
| `PATH:SSF:CHE-KUECHE-KARAMELL-0001` | `lib/learningPaths/caramelization.ts` | **Welle A abgeschlossen 2026-09-25** |
| `PATH:SSF:CHE-REINIGUNG-ROTWEIN-0001` | `lib/learningPaths/redWineStain.ts` | **Welle A abgeschlossen 2026-09-25** |
| `PATH:SSF:CHE-REINIGUNG-KALK-0001` | `lib/learningPaths/limescaleCleaning.ts` | **Welle A abgeschlossen 2026-09-25** |
| `PATH:SSF:CHE-REINIGUNG-CHLOR-0001` | `lib/learningPaths/chlorineCleaning.ts` | **Welle A abgeschlossen 2026-09-25** |
| `PATH:SSF:ECO-KREDIT-NOXIA-0001` | `lib/learningPaths/finance.ts` | physische Legacy-Entfernung offen |
| `PATH:SSF:ECO-ZINSESZINS-NOXIA-0001` | `lib/learningPaths/finance.ts` | physische Legacy-Entfernung offen |

### B. Historische Path-ID ist bewusst retired

Diese IDs sollen **nicht** wieder als konsumierbare Pfade auftauchen. Inhaltlich relevante Nachfolger besitzen andere kanonische IDs:

| Retired legacy ID | Heutiger governed Bezug | Regel |
|---|---|---|
| `PATH:SSF:ECO-KREDIT-0001` | `PATH:SSF:ECO-KREDIT-NOXIA-0001` | alte ID bleibt retired |
| `PATH:SSF:ECO-ZINS-0001` | `PATH:SSF:ECO-ZINSESZINS-NOXIA-0001` | alte ID bleibt retired |
| `PATH:SSF:ENG-ROHSTOFFGEWINNUNG-0001` | `PATH:SSF:NOX-RESOURCE-EXTRACTION-0001` | alte ID bleibt retired |
| `PATH:SSF:CHE-WASSER-AUFBEREITUNG-0001` | `PATH:SSF:NOX-WATER-PROCESSING-0001` | alte ID bleibt retired |

Diese Unterscheidung ist wichtig: Eine superseded ID bedeutet nicht automatisch, dass exakt dieselbe ID in einer spezialisierten Datei weiterleben muss.

Zusätzlich existieren Foundation-Pfade, deren ältere Varianten durch governed NOXIA-foundation paths ersetzt werden. Diese werden separat im Registry-Layer behandelt und dürfen nicht mit fachlich eigenständigen SSF-Pfaden verwechselt werden.

---

## Entfernung in sicheren Wellen

### Welle A — fachlich abgeschlossene, isolierte Haushalts-/Alltagspfade

1. Karamellisierung
2. Rotweinfleck
3. Kalkreinigung
4. Hypochlorit/Chlorreinigung

**Abgeschlossen am 2026-09-25.** Die vier Legacy-Blöcke wurden physisch aus `lib/learningPaths.ts` entfernt; die zugehörigen IDs wurden anschließend aus `SUPERSEDED_LEGACY_PATH_IDS` entfernt. Die governed Definitionen bleiben autoritativ.

### Welle B — Finance

1. historische Kreditdefinitionen
2. historische Zinsdefinitionen

Vor physischer Entfernung müssen Modul-Aliase und Abhängigkeiten gegen `finance.ts` geprüft werden. Die retired IDs `PATH:SSF:ECO-KREDIT-0001` und `PATH:SSF:ECO-ZINS-0001` dürfen dabei nicht versehentlich reaktiviert werden.

### Welle C — Ressourcen/Wasser

1. historische Rohstoffgewinnung
2. historische Wasseraufbereitung

Diese Pfade sind stärker mit NOXIA-Unlocks und Foundation-Pfaden gekoppelt. Vor Entfernung ist ein Gate-/Unlock-Abgleich erforderlich. Die kanonischen Nachfolger sind `PATH:SSF:NOX-RESOURCE-EXTRACTION-0001` und `PATH:SSF:NOX-WATER-PROCESSING-0001`.

---

## Vorgehen je Pfad

Für jede Entfernung gilt dieselbe Reihenfolge:

1. Legacy-Block in `lib/learningPaths.ts` identifizieren.
2. `id`, `sourceModuleId`, `kxfModuleId`, `domainsNeeded`, Unit-IDs, Section-IDs und Gates mit dem governed Pfad oder dem dokumentierten Nachfolger vergleichen.
3. Prüfen, ob andere Legacy-Pfade auf Unit-/Section-IDs oder Unlocks verweisen.
4. Regressionstest für die kanonische Registry-Auflösung ergänzen, falls noch nicht vorhanden.
5. Bei retired IDs zusätzlich testen, dass die alte Identität **nicht** wieder konsumierbar wird.
6. Legacy-Block physisch entfernen.
7. zugehörige ID aus `SUPERSEDED_LEGACY_PATH_IDS` entfernen, sobald der Block tatsächlich nicht mehr existiert.
8. Tests ausführen.
9. Erst nach grünem CI gilt die Migration als abgeschlossen.

Eine Entfernung darf nicht nur deshalb erfolgen, weil der Registry-Layer die Legacy-Kopie derzeit ausblendet.

---

## Done-Kriterium

Die Migration ist abgeschlossen, wenn:

- `SUPERSEDED_LEGACY_PATH_IDS` leer ist;
- governed Pfade direkt aus spezialisierten Dateien kommen;
- retired Legacy-IDs durch Regressionstests gegen versehentliche Reaktivierung geschützt sind;
- `lib/learningPaths.ts` nur noch nicht migrierte historische Pfade enthält oder vollständig auf Typdefinitionen/Kompatibilität reduziert wurde;
- keine Application-Route den Legacy-Array direkt konsumiert;
- Registry-Tests keine Identitäts-, Domain-, Gate- oder Alias-Probleme melden.

---

## Nicht-Ziele

Diese Migration ist **keine** Gelegenheit, gleichzeitig fachliche Inhalte umzuschreiben, KG-Identitäten zu erfinden oder NOXIA-Verhalten zu ändern. Fachliche Korrekturen werden separat behandelt; Änderungen an fremden Repository-Zuständigkeiten werden als externe Tasks an das jeweilige Ziel-Repository gegeben.
