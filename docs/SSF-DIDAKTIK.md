# SSF-DIDAKTIK.md
## Solar Science Foundation · Didaktisches Grundprinzip

**Version:** 0.4.0
**Erstellt:** 2026-07-15
**Geändert:** 2026-09-01 · v0.4.0: Dramaturgie auf verständnisorientierte Erklärung und sinnvolle Visualisierung/Interaktion umgestellt
**Status:** Kanonisch
**Repo:** thomaspeterkueper/solarsciencefoundation

---

## 1. Die Lernreise — nicht das Modul

Die SSF besteht nicht aus Modulen. Sie besteht aus **Lernreisen**.

Der Unterschied:

| Modul | Lernreise |
|-------|-----------|
| Vermittelt Stoff | Ermöglicht Entdeckung |
| Beginnt mit Definitionen | Beginnt mit einer Frage oder Beobachtung |
| Endet mit Prüfung | Endet mit Verstehen |
| Lernender konsumiert | Lernender entdeckt |

Ein Nutzer sollte nach jedem Abschnitt das Gefühl haben, etwas **verstanden oder selbst entdeckt** zu haben — nicht nur etwas gelesen oder einen Regler bewegt zu haben.

Die SSF ist keine Lernplattform im klassischen Sinn. Sie ist eine **Plattform zum Entdecken und Verstehen**.

---

## 2. Die drei Systeme — drei Rollen

```
Knowledge Graph  →  kennt Fakten
SSF              →  erzählt Geschichten über diese Fakten und macht Zusammenhänge verständlich
NOXIA            →  lässt den Nutzer mit diesen Fakten handeln
```

Der KG ist kein Lehrbuch.
SSF ist kein Lexikon.
NOXIA ist kein Quiz.

Konsequenz für Entscheidungen:
- Ist es eine Tatsache, eine Definition, eine Relation? → **KG**
- Ist es eine Erfahrung, eine Erklärung, ein Zusammenhang? → **SSF**
- Ist es eine Handlung, ein Werkzeug, eine Fähigkeit im Spiel? → **NOXIA**

---

## 3. Die didaktische Dramaturgie

Die SSF verwendet eine **verständnisorientierte Dramaturgie**. Sie ist verbindlich in ihrer Logik, aber nicht mechanisch in der Zahl der Screens oder Sections.

Die Grundfolge lautet:

```
① Frage / Motivation
   Ein konkretes Phänomen, Problem oder eine Beobachtung. Kein Fachjargon als Einstieg.

② Beobachtung
   Was ist tatsächlich zu sehen, zu messen oder aus dem Alltag bekannt?
   Kann mit ① auf demselben Screen verbunden werden.

③ Erste Erklärung
   Gerade genug Modell, damit der Lernende versteht, worauf er beim nächsten Schritt achten soll.
   Keine unnötige Vollständigkeit, Formeln nur wenn bereits verständlich.

④ Veranschaulichung / Erkundung
   Die Darstellungsform wird nach Erkenntniswert gewählt:
   - interaktives Experiment, wenn eigenes Verändern eine neue Einsicht erzeugt;
   - Schema, Illustration, Animation, Foto oder Vergleich, wenn Darstellung genügt;
   - reale Beobachtung oder Beispiel, wenn dies fachlich klarer ist.

⑤ Vertiefte Erklärung / Erkenntnis
   Die Beobachtung aus ④ wird mit dem fachlichen Modell verbunden. Hier darf die Erklärung präziser werden.

⑥ Verbindung / Anwendung
   Das Prinzip wird auf einen konkreten Fall übertragen oder öffnet den nächsten Zusammenhang.

⑦ Verständnisfragen
   Erst nachdem genügend Erklärung und Erfahrung vorhanden sind.
   Quizfragen prüfen Anwendung, Verständnis und Transfer — nicht bloße Begriffserkennung.

⑧ Takeaway
   Ein Satz: die Kernentdeckung des Kapitels.

⑨ Nächster Horizont
   Eine anschließende Frage oder ein verwandter Pfad macht sichtbar, wie das Wissensnetz weitergeht.
```

### 3.1 Experiment vor oder nach Erklärung?

Es gibt **keine universelle Regel**, dass ein Experiment immer vor der Erklärung stehen muss.

Ein Experiment darf vor einer ausführlichen Erklärung stehen, wenn das Phänomen ohne Vorwissen sinnvoll beobachtbar und interpretierbar ist. Braucht der Lernende dagegen ein minimales Modell, um überhaupt zu erkennen, was eine Veränderung bedeutet, steht eine **erste Erklärung vor der Interaktion**. Danach folgt die vertiefte Erklärung.

Beispiele:
- Ein fallender Gegenstand kann zunächst beobachtet werden; die Modellierung folgt danach.
- Bei pH, Membrantransport oder elektrischen Ersatzschaltungen kann ein minimales Begriffsmodell vor der Interaktion nötig sein, damit der Nutzer nicht nur Slider bewegt.

### 3.2 Interaktion ist kein Selbstzweck

**Interaktiv, wo Interaktion Erkenntnis erzeugt. Visuell, wo Darstellung genügt.**

Ein Slider, Button oder Drag-and-drop macht einen Inhalt nicht automatisch didaktisch besser. Eine Interaktion ist nur gerechtfertigt, wenn mindestens eine relevante Variable sinnvoll verändert wird und die resultierende Beobachtung einen Zusammenhang sichtbar macht.

Nicht zulässig:
- Slider ohne fachlich interpretierbare Wirkung;
- fachfremde Wiederverwendung eines Experiments nur weil eine Komponente existiert;
- Klickaufgaben, die lediglich Text in eine andere Form übersetzen;
- Quiz als Ersatz für fehlende Erklärung.

Statische oder animierte Grafiken sind ausdrücklich erwünscht, wenn sie den Zusammenhang klarer vermitteln als eine künstliche Interaktion.

---

## 4. Die Lernszene — kleinste Einheit

Eine **Lernszene** ist die kleinste didaktische Einheit der SSF.

### Grundregel: Eine Lernszene beantwortet genau eine Frage.

Eine Lernszene endet nicht mit einem Thema. Sie endet mit einer **beantworteten Frage** — und damit idealerweise mit einer neuen Entdeckung.

**Schlecht:** Schwingungen · DMS · Rayleigh-Streuung

**Gut:**
- Warum schwingt eine Gitarrensaite?
- Warum ändert sich der Widerstand eines Drahtes beim Dehnen?
- Warum streuen Luftmoleküle blaues Licht stärker als rotes?

Mehrere Lernszenen bilden ein **Kapitel**. Mehrere Kapitel bilden einen **Lernpfad**.

### Mapping auf die technische Struktur

| Didaktischer Begriff | Technischer Begriff | Feld in learningPaths.ts |
|---------------------|--------------------|-----------------------|
| Lernreise / Lernpfad | LearningPath | `id`, `title`, `units` |
| Kapitel | LearningPathUnit | `id`, `entryQuestion`, `takeaway` |
| Lernszene | LearningPathSection | `id`, `kind`, `summary` |

Die technischen Begriffe bleiben im Code; die didaktischen Begriffe werden in UI und Dokumentation verwendet.

---

## 5. Die gute Einstiegsfrage

Die Einstiegsfrage ist der erste Kontakt mit dem Inhalt. Sie soll verständlich sein, neugierig machen und beim Phänomen beginnen.

Merkmale:
- konkrete Beobachtung, Situation oder echtes Problem;
- enthält nicht bereits die Lösung;
- keine unnötigen Fachbegriffe;
- aus Perspektive des Lernenden formuliert;
- muss nicht künstlich offen sein, wenn eine präzise Alltagsfrage stärker ist.

Beispiele:
- Warum ist der Himmel blau?
- Warum wird ein Gummiband dünner, wenn man es dehnt?
- Warum klingt ein vorbeifahrendes Auto anders als ein stehendes?
- Wie schneidet man Stahl, der härter ist als das Werkzeug?

Prüffragen:
1. Kann ein interessierter Nichtfachmann die Frage verstehen?
2. Entsteht daraus ein echter Erklärungsbedarf?
3. Führt die folgende Szene tatsächlich zur Antwort?

---

## 6. Was SSF nicht ist

- Kein MOOC mit vorgeschriebenem Gesamtweg
- Kein Schulbuch mit reinem Top-down-Curriculum
- Kein Wikipedia-Ersatz
- Keine Prüfungsvorbereitung
- Keine Sammlung dekorativer Simulationen

SSF ist ein **Wissensnetzwerk zum Selbstentdecken und Verstehen**. Der Lernende kann an unterschiedlichen Fragen einsteigen; Voraussetzungen und Verbindungen sorgen dafür, dass daraus ein konsistentes Wissensnetz entsteht.

---

## 7. Disziplinlabels — kein Einstiegspunkt für Lernende

Disziplinbezeichnungen strukturieren Inhalte intern. Der lernende Nutzer beginnt mit einer Frage oder einem Problem, nicht mit einer Verwaltungs-ID.

Intern erlaubt sind kanonische IDs, Domains, Quellen und Fachklassifikation. In der Lernendenansicht können Fachgebiete als Kontext oder Navigation erscheinen, aber nicht die eigentliche Einstiegsfrage ersetzen.

---

## 8. Formelregel

Formeln erscheinen **nach einer intuitiven Erklärung der Größen und des Zusammenhangs**.

Beispiel:
```
① Frage/Beobachtung: Ein langer Stahlstab wird beim Erwärmen länger.
② Erste Erklärung: Temperatur verändert den mittleren Abstand der Teilchen; die Längenänderung hängt auch von Ausgangslänge und Material ab.
③ Visualisierung/Experiment: Temperatur und Ausgangslänge variieren.
④ Erkenntnis: doppelte Ausgangslänge → unter gleichen Bedingungen doppelte Längenänderung.
⑤ Formel: ΔL = α · L₀ · ΔT
```

Die Formel ist die **Verdichtung eines bereits verstandenen Modells**, nicht dessen Ersatz.

---

## 9. Zehn Schritte früher

Die SSF beginnt häufig dort, wo Fachliteratur Vorwissen voraussetzt. Das bedeutet nicht, Fachlichkeit zu vermeiden, sondern sie **aufzubauen**.

Hochschulmaterial kann bei `Rosette → Transformation → Tensor → σx` beginnen. Eine SSF-Lernreise kann vorher fragen: `Warum ändert ein gedehnter Draht überhaupt seinen elektrischen Widerstand?`

SSF richtet sich an Menschen, die verstehen wollen. Fortgeschrittene Tiefe darf folgen, sobald das begriffliche Fundament trägt.

---

## 10. Autoren- und Reviewregel

Vor Freigabe jeder Lernreise ist zu prüfen:
1. Gibt es eine echte motivierende Frage oder Beobachtung?
2. Wird das notwendige mentale Modell erklärt, bevor es vorausgesetzt wird?
3. Hat jede Interaktion einen eigenen fachlichen Erkenntniswert?
4. Wäre ein Schema/Bild/eine Animation klarer als die Interaktion? Falls ja, wird die visuelle Form bevorzugt.
5. Baut die vertiefte Erklärung sichtbar auf der Beobachtung auf?
6. Kommen Verständnisfragen erst nach ausreichender Vermittlung?
7. Ist das Takeaway fachlich korrekt und als Einsicht formulierbar?

---

## Dokumentfamilie

`SSF-DIDAKTIK.md` ist kanonisch. Spezialisierte Templates dürfen die Grundregeln konkretisieren, aber nicht durch starre Reihenfolgen widersprechen.

- `SSF-AUTORENLEITFADEN.md`
- `ENGINEERING-LEARNING-TEMPLATE.md`
- `SSF-LERNPFAD-TEMPLATE.md`
- `SSF-LERNSZENEN-TEMPLATE.md`
- `SSF-QUIZ-RICHTLINIEN.md`

---

*Solar Science Foundation · SSF-DIDAKTIK.md · v0.4.0 · 2026-09-01*
*Autor: Thomas Peter Küper · Repo: thomaspeterkueper/solarsciencefoundation*
