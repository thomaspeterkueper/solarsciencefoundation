# NOXIA → SSF Request: Jedes NOXIA-relevante Modul mit Prüfung ausliefern

Origin: NOXIA (noxiagame, Teilprojekt Bevölkerung und Ökonomie, 29.10.2026)
Priority: hoch
Status: done (02.11.2026)
Entschieden (Thomas, 28.10.2026): „Nur anschauen des Lernmoduls bringt kein Geld, man muss auch die Prüfung bestehen – sowohl für Prämie als auch für Freischaltung.“

## Was sich in NOXIA geändert hat

- Seit 29.10.2026 bewertet der NOXIA-Server die Antworten gegen die Prüfung, die `GET /api/noxia/modules/{id}` liefert (`assessment[]`, mindestens 70 % richtig).
- Nur wer besteht, schließt ab, bekommt die Freischaltungen und einmal je Modul eine Prämie in Credits (L0 30, L1 60, L2 120 Cr).
- **Ein Modul ohne Prüfung lässt sich in NOXIA nicht mehr abschließen und schaltet nichts frei.**

Didaktik bleibt die der SSF (`docs/SSF-QUIZ-RICHTLINIEN.md`): falsch heißt Erklärung, nicht Strafe. NOXIA zeigt nach jedem Versuch je Frage „richtig/falsch“ mit Erklärung. Neuer Versuch nach drei Fehlversuchen in 30 Minuten.

## Befund (Quellstand SSF `57f8525`)

1. **Lernpfade liefern nie eine Prüfung.** `pathDetail()` in `lib/noxiaBridge.ts` setzt `assessment: []`. Die Kurztests (`kind: 'quiz'`, Format `Frage||A||B*||C||D---…`, `lib/learningQuiz.ts`) gehen als `task` mit Rohtext an NOXIA.
2. **KXF-Module** liefern höchstens eine Frage (`didactic.check`); die Kurztests eines zugehörigen Pfads fehlen.
3. **Erklärungen fehlen:** Das Kurztest-Format hat keine Erklärung je Frage.

Stand der Module, die NOXIA verlangt (Kurztests, die `parseLearningQuiz` lesen kann):

| Modul | Pfad | Kurztests | NOXIA braucht es für |
|---|---|---|---|
| ECO-L0-000001 | ECO-KREDIT-NOXIA-0001 | 2 | Bankkredit |
| ECO-L0-000002 | ECO-ZINSESZINS-NOXIA-0001 | 2 | Festgeld |
| CHE-L1-000015 / SSF-NOX-WATER-0001 | NOX-WATER-PROCESSING-0001 | 4 | Wasseraufbereitung |
| ENG-L1-000005 | NOX-RESOURCE-EXTRACTION-0001 | 3 | Rohstoffabbau |
| AST-L1-000001 | AST-SONNENSYSTEM-0001 | 0 (nur `check`, 1 Frage) | Navigation |
| BIO-L1-000002 | NOX-LIFE-SUPPORT-0001 | **0** | Lebenserhaltung |
| ENG-L1-000001 | NOX-POWER-GENERATION-0001 | **0** | Energie |
| ENG-L1-000006 | NOX-AIRLOCK-0001 | **0** | Schleusen |
| ENG-L1-000007 | NOX-ENVIRONMENT-MONITORING-0001 | **0** | Umweltüberwachung |
| ENG-L1-000008 | NOX-HABITAT-REDUNDANCY-0001 | **0** | Habitat-Redundanz |
| ENG-L1-000009 | NOX-MARS-HABITAT-0001 | **0** | Mars-Habitat |
| PHY-L1-000026 | NOX-PRESSURE-SYSTEMS-0001 | **0** | Drucksysteme |
| PHY-L1-000027 | NOX-THERMAL-CONTROL-0001 | **0** | Thermalkontrolle |
| PHY-L1-000028 | NOX-RADIATION-PROTECTION-0001 | **0** | Strahlenschutz |
| PHY-1101 | (PHY-WAVE-SPECTRUM-0001) | **0** | Pilot (Gravitation, s. EXT-NOXIA-SSF-20261028 Punkt 4) |
| AST-2101 | (PHY-SKY-0001) | **0** | Pilot (Orbitalmechanik, s. ebd.) |
| ECO-L0-000003, ECO-L1-000001, ECO-L1-000002 | – | kein Modul | Sicherheitenwert, Handel, Bodenwert (s. ebd. Punkt 3/5) |

## Bitte

1. **`assessment[]` für Lernpfade füllen:** In `pathDetail()` die Kurztests mit `parseLearningQuiz` in `assessment` übersetzen (`question`, `options`, `correctOption`) und nicht mehr als `task` ausliefern.
2. **KXF-Module:** Gibt es einen zugehörigen Pfad, dessen Kurztests mitliefern, nicht nur `didactic.check`.
3. **Kurztests ergänzen** für alle Module mit **0** in der Tabelle, nach den Quiz-Richtlinien (drei Fragen: Anwendung, Verständnis, Transfer).
4. **Erklärung je Frage** (`explanation`): Formaterweiterung des Kurztests, z. B. `Frage||A||B*||C||D||?Erklärung`. NOXIA zeigt sie nach jedem Versuch.
5. **Regel für die Zukunft:** Jedes Modul mit NOXIA-Freischaltung (`unlocks` mit `UNL:NOX:…`) braucht eine Prüfung; gern als Prüfung in `validateLearningPathRegistry`.

## Zwischenlösung in NOXIA

NOXIA liest die Rohtext-Kurztests selbst (`lib/ssfKnowledge.ts`, `assessmentFromQuizSections`), solange `assessment[]` leer ist. Damit sind die Module mit Kurztests (Kredit, Festgeld, Wasser, Rohstoffe) wieder abschließbar. Liefert die SSF `assessment[]`, gilt ihre Prüfung. Für Module ohne Kurztest erzeugt NOXIA bewusst keinen Ersatz.

---

## Erledigt-Vermerk SSF (02.11.2026, SSF `main` `126317b`)

**Status: erledigt.** Bitte 1–5 sind umgesetzt. Verbleibende benannte Lücken stehen unter Punkt 5.

1. **`assessment[]` für Lernpfade:** `pathAssessment()` (neu in `lib/learningPathAssessment.ts`, von `lib/noxiaBridge.ts` genutzt) übersetzt alle Kurztests eines Pfads mit `parseLearningQuiz` in `assessment[]` (`question`, `options`, `correctOption`, `explanation`). Lesbare Kurztests gehen nicht mehr als `task` hinaus. Freitext-Selbstchecks bleiben `task`.
2. **KXF-Module:** Hat das Modul einen zugehörigen Pfad, liefert `getNoxiaKnowledgeModule()` dessen Kurztests. Ohne Pfadtests bleibt `didactic.check` die Rückfalllösung. Die `unlocks` sind die Vereinigung aus Modul und Pfad.
3. **Kurztests ergänzt (je Modul 6 Fragen = zwei Tests, Anwendung → Verständnis → Transfer):**

| Modul | Pfad | Fragen |
|---|---|---|
| `ENG-L1-000001` | `NOX-POWER-GENERATION-0001` | 9 (drei Tests; der Einstieg bleibt Freitext) |
| `PHY-L1-000026` | `NOX-PRESSURE-SYSTEMS-0001` | 6 |
| `ENG-L1-000006` | `NOX-AIRLOCK-0001` | 6 |
| `BIO-L1-000002` | `NOX-LIFE-SUPPORT-0001` | 6 |
| `PHY-L1-000027` | `NOX-THERMAL-CONTROL-0001` | 6 |
| `PHY-L1-000028` | `NOX-RADIATION-PROTECTION-0001` | 6 |
| `ENG-L1-000007` | `NOX-ENVIRONMENT-MONITORING-0001` | 6 |
| `ENG-L1-000008` | `NOX-HABITAT-REDUNDANCY-0001` | 6 |
| `ENG-L1-000009` | `NOX-MARS-HABITAT-0001` | 6 |
| `PHY-L2-000005` / `LRN:SSF:PHY-ENERGIE-ARBEIT-0001` | `PHY-ENERGIE-ARBEIT-0001` (Pilot Gravitation) | 6 |
| `AST-L1-000001` | `AST-SONNENSYSTEM-0001` (Pilot Orbitalmechanik) | 6 |
| `ECO-L0-000003`, `ECO-L1-000001`, `ECO-L1-000002`, `NOX-SMELTING`, `NOX-ROBOT-FABRICATION`, `NOX-PRECISION-INSTRUMENTATION` | neue Pfade, s. Learning-Prerequisites-Vermerk | je 6 |

   Warum 6 Fragen: Bei 70 % Bestehensgrenze verlangen 3 Fragen alle richtig. Bei 6 genügen 5 (83 %), also ist ein Fehler erlaubt. Alle Größen, die zur Lösung nötig sind, stehen in der Frage. Jede Frage hat eine Erklärung.
4. **Erklärung je Frage:** Format `Frage||A||B*||C||D||?Erklärung`. Der sechste Teil ist optional, `parseLearningQuiz` liefert `explanation`. Fehlt sie, setzt `assessment[]` „Richtig: <Antwort>. <Merksatz der Lerneinheit>“ ein, damit NOXIA immer eine Erklärung hat.
5. **Regel für die Zukunft:** `tests/noxiaExams.test.ts` prüft, dass jedes Modul mit `UNL:NOX:…`-Freischaltung mindestens 6 Prüfungsfragen liefert. Das ist ein Test und keine Prüfung in `validateLearningPathRegistry`, weil Lücken benannt werden müssen. **Benannte Ausnahmen (noch ohne Prüfung, in der Liste `KNOWN_EXAM_GAPS`):** `AST-MARS-REGOLITH-0001`, `AST-MONDNAVIGATION-0001`, `ENG-COLONY-FOUND-0001`, `ENG-LIFESUPPORT-MOBIL-0001`, `ENG-STATION-FOUND-0001`, `NOX-SCIENTIFIC-OBSERVATION-0001`, `PHY-MONDSTAUB-VERSCHLEISS-0001`, `PHY-SPEKTRALANALYSE-0001`, `PHY-WASSER-DIPOL-0001`, `PHY-WASSER-EIS-0001`, `PHY-WASSER-PHASEN-0001`, `PHY-WASSER-SUBLIM-0001`, `PHY-WASSER-VAKUUM-0001`. Diese Module standen nicht in der Tabelle dieses Requests. Naheliegende nächste Kandidaten sind `COLONY-FOUND`, `STATION-FOUND` (Gründungen) und `PHY-SPEKTRALANALYSE` (Sensor Spektral), weil sie Spielfunktionen freischalten. NOXIA kann die Reihenfolge vorgeben.

**Offener Hinweis zur Qualität:** Die Beobachtungs- und Erklärabschnitte der Habitat-Grundlagenmodule (`noxiaUnlockFoundations.ts`) sind weiterhin generisch formuliert. Die Kurztests tragen deshalb die benötigten Größen in der Frage. Eine inhaltliche Vertiefung dieser Module ist nicht Teil dieses Requests.
