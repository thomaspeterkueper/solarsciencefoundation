---

id: EXT-KG-SSF-20261102-MAGBIO-CURVATURE-GATE

status: done

source: KG

target: SSF

created: 2026-11-02

priority: high

---

# KG-Rückmeldung: Lernvoraussetzungen Abschnitt G

KG hat die bestehenden IDs geprüft: MAT-L0-000003 (Geometrie Grundlagen) mit UNL:NOX:NAV:CURVATURE; BIO-L1-000003 (Magnetobiologie-Grundlagen); BIO-L2-000001 (mitochondriale Kontexte); BIO-L2-000003 (Experimentdesign, requires BIO-L2-000002).

KG-PR https://github.com/thomaspeterkueper/kueper-knowledge-graph/pull/266 ergänzt die exakt benötigte Unlock-ID UNL:NOX:research:magnetobiology-experiment-design, zusätzlich zur Legacy-Schreibweise. Erst nach Merge konsumieren.

Fachliches Gate: Experimentdesign und kritische Evidenzbewertung sind als Lerngegenstand zulässig; keine Human-/Therapiewirkung, kein Habitat-Feldbedarf belegt. Quellen Reed et al. 2026, DOI 10.18632/aging.206424; Rishabh et al. 2026, DOI 10.1093/pnasnexus/pgag152. Details im KG PR #266.

SSF-Auftrag: (1) Lerninhalte und assessment[] für beide Pfade herstellen, (2) Module über GET /api/noxia/modules/{id} auflösbar machen, (3) Exakt beide Unlocks über POST /api/noxia/unlocks/check nach erfolgreichem Quiz ausgeben, (4) BIO-L2-000002 und NOXIA orientation als Voraussetzungen abstimmen, (5) kritische Evidenzgrenzen didaktisch zeigen.

Quellrequest EXT-NOXIA-SSF-20261029-learning-prerequisites verbleibt in open/ als partially-done bis nachgewiesenen API- und Quiz-Tests. Kein Direkt-Eingriff in SSF-Code.

## KG-Nachtrag 2026-11-10

KG-PR #266 (fachliches Evidenz-Gate) ist gemergt: `18df90df9a4d3e7bbda1827eaecd612e7c159685`. Die exakte NOXIA-Unlock-ID wurde separat mit KG-PR #286 gemergt: `36551b3e21419b5442419adaa8b0823b24ce2c93`. Der KXF-Lernmodulexport enthält nun `UNL:NOX:research:magnetobiology-experiment-design` bei `BIO-L2-000003` neben dem Alt-Alias. Die zuvor im ursprünglichen Auftrag beschriebene noch offene KG-Integration ist damit abgeschlossen; **die SSF-API- und Quiz-Abnahme bleibt offen**. Bitte vor Bearbeitung den aktuellen KG-Export lesen und Request `EXT-NOXIA-SSF-20261029-learning-prerequisites` bis zur Abnahme `partially-done` belassen.

## Erledigt (Claude, Ökosystem-Kreislauf, 18.11.2026)

Status: done
Umgesetzt auf Branch `claude/EXT-KG-SSF-20261102-MAGBIO-CURVATURE-GATE`, Datei `lib/learningPaths/noxiaPrerequisiteModules.ts`:

| Modul (`id` in `/api/noxia/modules`) | Legacy-ID | Pfad | `unlocks` |
|---|---|---|---|
| `LRN:SSF:MAT-L0-000003` | `MAT-L0-000003` | `PATH:SSF:MAT-KRUEMMUNG-NOXIA-0001` „Wie stark biegt sich eine Bahn?“ | `UNL:NOX:NAV:CURVATURE` |
| `LRN:SSF:BIO-L2-000003` | `BIO-L2-000003` | `PATH:SSF:BIO-MAGNETOBIOLOGIE-EXPERIMENT-NOXIA-0001` „Vom Paper zum Habitat-Experiment“ | `UNL:NOX:research:magnetobiology-experiment-design` (exakt), zusätzlich KG-Legacy `UNL:NOX:RESEARCH:MAGNETOBIOLOGY-EXPERIMENT-DESIGN` |

1. Lerninhalte: je zwei Einheiten mit Beobachtung, Erklärung, Übung mit Lösung; `assessment[]` je 6 Fragen mit Erklärung.
2. `GET /api/noxia/modules/{id}`: löst mit KXF- und Legacy-Kennung auf (15 bzw. 16 Abschnitte). KXF-Module ohne didaktischen Text bekommen jetzt die Abschnitte des zugeordneten Lernpfads (`kxfModuleSections` in `lib/noxiaBridge.ts`), vorher kam eine leere Liste.
3. `POST /api/noxia/unlocks/check`: liefert für beide Kennungen genau die Freischaltungen oben (geprüft über `getNoxiaDemoUnlockState`).
4. Voraussetzungen: `BIO-L2-000002` und `UNL:NOX:orientation` sind im Pfad als fachliche bzw. NOXIA-Vorstufe genannt; die Sperre selbst setzt NOXIA (`requiresUnlocks`). SSF hat für `BIO-L2-000002` noch keinen eigenen Lernpfad.
5. Evidenzgrenzen: eigener Abschnitt „Evidenzgrenze dieses Moduls“ nach dem KG-Gate; nur quellengebundene tierexperimentelle Beobachtungen (Reed et al. 2026, Rishabh et al. 2026), keine Human-, Habitat- oder Therapieaussage.

Tests: `tests/noxiaPrerequisites.test.ts` (Kennungen, exakte Schreibweise, Prüfung, Evidenzgrenze), `npm test` 121/121 grün, `tsc --noEmit` grün.
