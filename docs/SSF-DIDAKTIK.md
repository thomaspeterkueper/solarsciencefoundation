# SSF-DIDAKTIK.md
## Solar Science Foundation · Didaktisches Grundprinzip

**Version:** 0.1.0
**Erstellt:** 2026-07-15
**Status:** Kanonisch
**Repo:** thomaspeterkueper/solarsciencefoundation

---

## 1. Die Lernreise — nicht das Modul

Die SSF besteht nicht aus Modulen. Sie besteht aus **Lernreisen**.

Der Unterschied:

| Modul | Lernreise |
|-------|-----------|
| Vermittelt Stoff | Ermöglicht Entdeckung |
| Beginnt mit Definitionen | Beginnt mit Beobachtungen |
| Endet mit Prüfung | Endet mit Verstehen |
| Lernender konsumiert | Lernender erlebt |

Ein Nutzer sollte nach jedem Abschnitt das Gefühl haben, etwas **selbst entdeckt** zu haben — nicht nur etwas gelesen zu haben.

---

## 2. Die drei Systeme — drei Rollen

```
Knowledge Graph  →  kennt Fakten
SSF              →  erzählt Geschichten über diese Fakten
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

Jeder Lernpfad und jedes Kapitel folgt dieser Sequenz.
Nicht jeder Schritt muss explizit vorhanden sein — aber die Reihenfolge ist nicht verhandelbar.

```
① Beobachtung
   Ein Alltagsphänomen. Keine Fachbegriffe. Kein Vorwissen nötig.
   Beispiel: "Warum klingt ein vorbeifahrendes Auto höher als ein stehendes?"

② Einstiegsfrage
   Die Frage die die Beobachtung aufwirft. Offen, neugierig.
   Keine Disziplinbezeichnung ("Physik", "Chemie").

③ Vermutung
   Der Lernende darf raten. Kein Fehler möglich.
   Optional — aber wo möglich einbauen.

④ Experiment
   Interaktiv, visuell, unmittelbar. Parameter verändern, Wirkung sehen.
   Kein Experiment ohne Slider oder Eingabe — statische Grafiken sind keine Experimente.

⑤ Erklärung
   Kurz. Das eine Prinzip das dieses Kapitel vermittelt.
   Formeln erst nach der Erklärung — nie davor.

⑥ Verbindung
   Was hat das mit etwas zu tun das der Lernende schon kennt?
   Oder: Was öffnet sich dadurch für das nächste Kapitel?

⑦ Anwendung
   Ein konkretes Beispiel oder eine Aufgabe aus der Praxis.
   Optional, aber wertvoll.

⑧ Quiz
   3 Fragen. Kein Auswendiglernen — Verständnis.
   Falsche Antwort öffnet Erklärung, keine Strafe.
   3/3 korrekt → Takeaway + nächstes Kapitel öffnet sich.

⑨ Takeaway
   Ein Satz. Die Kern-Erkenntnis des Kapitels.
   Geschrieben als Einsicht, nicht als Zusammenfassung.
   Erscheint erst nach 3/3 Quiz.

⑩ Nächster Horizont
   Vorschau auf das folgende Kapitel — sichtbar aber gesperrt.
   Titel und erste Frage lesbar. Kein Blur auf die Einstiegsfrage.
   Erzeugt Anticipation, keine Obligation.
```

---

## 4. Die Lernszene — kleinste Einheit

Eine **Lernszene** ist die kleinste didaktische Einheit der SSF.

Sie hat genau **einen Gedanken**.

Beispiele:
- *Warum wird ein Gummiband dünner wenn man es dehnt?*
- *Was passiert mit Licht wenn es auf ein Luftmolekül trifft?*
- *Warum ändert sich der Widerstand eines Drahtes wenn er sich dehnt?*

Das ist noch kein Kapitel. Noch kein Modul. Noch kein Pfad.
Es ist eine einzelne **Erfahrung** — eine Szene.

Mehrere Lernszenen bilden ein **Kapitel**.
Mehrere Kapitel bilden einen **Lernpfad**.

### Mapping auf die technische Struktur

| Didaktischer Begriff | Technischer Begriff | Feld in learningPaths.ts |
|---------------------|--------------------|-----------------------|
| Lernreise / Lernpfad | LearningPath | `id`, `title`, `units` |
| Kapitel | LearningPathUnit | `id`, `entryQuestion`, `takeaway` |
| Lernszene | LearningPathSection | `id`, `kind`, `summary` |

Die technischen Begriffe bleiben unverändert im Code.
Die didaktischen Begriffe werden in der UI und in der Dokumentation verwendet.

---

## 5. Was SSF nicht ist

- Kein MOOC — kein Kurs mit festem Start- und Endpunkt
- Kein Schulbuch — kein Top-Down-Curriculum
- Kein Wikipedia — kein enzyklopädisches Nachschlagewerk
- Keine Prüfungsvorbereitung — kein Auswendiglernen

SSF ist ein **Wissensnetzwerk zum Selbstentdecken**.
Der Lernende bestimmt den Einstiegspunkt.
Das Netzwerk zeigt was als nächstes möglich ist.
Niemand schreibt vor wo man beginnen oder enden muss.

---

## 6. Disziplinlabels — verboten in der Lernenden-Ansicht

Lernende sehen **keine Disziplinbezeichnungen**.

Verboten in der UI:
- "Physik", "Chemie", "Mathematik", "Ingenieurwesen"
- "Kapitel 3 aus TM2" oder ähnliche Vorlesungs-IDs
- Fachsemester-Angaben

Erlaubt (nur intern, im KG und in der Entwicklerdokumentation):
- Kanonische IDs wie `LRN:SSF:PHY-SKY-0001`
- Domainfelder wie `PHY`, `MAT`, `ENG`
- Verweise auf Lehrstühle oder Quellen

Die Einstiegsfrage ist der einzige sichtbare Bezeichner eines Kapitels.

---

## 7. Formelregel

Formeln erscheinen **nach** der intuitiven Erklärung — nie davor.

Richtige Reihenfolge:
```
① Beobachtung: Stahl dehnt sich aus.
② Experiment: Slider zeigt wie viel.
③ Erklärung: "Je länger, desto mehr."
④ Formel: ΔL = α · L₀ · ΔT
```

Falsche Reihenfolge:
```
① Formel: ΔL = α · L₀ · ΔT
② Erklärung dazu
③ Beispiel
```

Die Formel ist die Verdichtung der Erkenntnis — nicht ihr Ausgangspunkt.

---

## 8. Zehn Schritte früher

Die SSF beginnt dort wo andere Plattformen und Vorlesungen **aufhören zu erklären**.

Hochschulen beginnen oft bei:
```
Rosette → Transformation → Tensor → σx
```

SSF beginnt bei:
```
Warum wird ein Gummiband länger?
```

Das ist kein Qualitätsproblem der Hochschulen.
Es ist eine andere Zielgruppe und ein anderes Ziel.

SSF richtet sich an Menschen die verstehen wollen — nicht an Menschen die bestehen müssen.

---

*Solar Science Foundation · SSF-DIDAKTIK.md · v0.1.0 · 2026-07-15*
*Autor: Thomas Peter Küper · Repo: thomaspeterkueper/solarsciencefoundation*
