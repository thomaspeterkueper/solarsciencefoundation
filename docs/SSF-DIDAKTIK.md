# SSF-DIDAKTIK.md
## Solar Science Foundation · Didaktisches Grundprinzip

**Version:** 0.2.0
**Erstellt:** 2026-07-15
**Geändert:** 2026-07-15 · v0.2.0: Entdeckung, Lernszenen-Regel, Einstiegsfragen-Kapitel, Disziplin-Präzisierung
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
| Lernender konsumiert | Lernender entdeckt |

Ein Nutzer sollte nach jedem Abschnitt das Gefühl haben, etwas **selbst entdeckt** zu haben — nicht nur etwas gelesen zu haben.

Die SSF ist keine Lernplattform im klassischen Sinn. Sie ist eine **Plattform zum Entdecken**.

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
   Ein Satz. Die Kern-Entdeckung des Kapitels.
   Geschrieben als Einsicht, nicht als Zusammenfassung.
   Erscheint erst nach 3/3 Quiz.

⑩ Nächster Horizont
   Vorschau auf das folgende Kapitel — sichtbar aber gesperrt.
   Titel und erste Frage lesbar.
   Erzeugt Anticipation, keine Obligation.
```

---

## 4. Die Lernszene — kleinste Einheit

Eine **Lernszene** ist die kleinste didaktische Einheit der SSF.

### Grundregel: Eine Lernszene beantwortet genau eine Frage.

Eine Lernszene endet nicht mit einem Thema. Sie endet mit einer **beantworteten Frage** — und damit mit einer neuen Entdeckung.

**Schlecht:**
> Schwingungen

> DMS

> Rayleigh-Streuung

**Gut:**
> Warum schwingt eine Gitarrensaite?

> Warum ändert sich der Widerstand eines Drahtes beim Dehnen?

> Warum streuen Luftmoleküle blaues Licht stärker als rotes?

Das ist noch kein Kapitel. Noch kein Modul. Noch kein Pfad.
Es ist eine einzelne **Entdeckung** — eine Szene.

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

## 5. Die gute Einstiegsfrage

Die Einstiegsfrage ist der sichtbarste Teil eines Kapitels. Sie ist der erste Kontakt des Lernenden mit dem Inhalt. Sie entscheidet ob jemand weiterliest oder nicht.

### Merkmale einer guten Einstiegsfrage

- Beschreibt eine Beobachtung oder ein Phänomen
- Enthält keine Lösung
- Enthält **keine Fachbegriffe**
- Macht neugierig — lässt mehrere Vermutungen zu
- Ist aus der Perspektive des Lernenden formuliert, nicht aus der des Lehrenden

### Beispiele

**Gut:**
> Warum ist der Himmel blau?

> Warum wird ein Gummiband dünner wenn man es dehnt?

> Warum klingt ein vorbeifahrendes Auto anders als ein stehendes?

> Wie schneidet man Stahl der härter ist als jedes Werkzeug?

**Nicht gut:**
> Rayleigh-Streuung (Fachbegriff, keine Frage)

> Doppler-Effekt (Fachbegriff, keine Frage)

> Hookesches Gesetz (Fachbegriff, keine Frage)

> Was ist der Wärmeausdehnungskoeffizient? (beginnt mit Lösung, nicht Beobachtung)

### Prüffragen für Autoren

Bevor eine Einstiegsfrage akzeptiert wird, sollte sie diese drei Tests bestehen:

1. **Kann ein 12-Jähriger die Frage verstehen?** — Wenn nicht, zu viele Fachbegriffe.
2. **Lässt die Frage mehrere Antworten zu?** — Wenn nicht, ist es keine echte Frage, sondern eine Aufgabe.
3. **Würde jemand diese Frage stellen, wenn er aus dem Fenster schaut?** — Wenn nicht, beginnt die Frage beim Wissen, nicht bei der Welt.

---

## 6. Was SSF nicht ist

- Kein MOOC — kein Kurs mit festem Start- und Endpunkt
- Kein Schulbuch — kein Top-Down-Curriculum
- Kein Wikipedia — kein enzyklopädisches Nachschlagewerk
- Keine Prüfungsvorbereitung — kein Auswendiglernen

SSF ist ein **Wissensnetzwerk zum Selbstentdecken**.
Der Lernende bestimmt den Einstiegspunkt.
Das Netzwerk zeigt was als nächstes möglich ist.
Niemand schreibt vor wo man beginnen oder enden muss.

---

## 7. Disziplinlabels — kein Einstiegspunkt für Lernende

**Disziplinbezeichnungen strukturieren die Inhalte intern. Sie sind niemals der Einstiegspunkt für Lernende.**

Lernende sehen als Einstieg immer eine Frage — nie eine Disziplinbezeichnung.

Intern (KG, Entwicklerdokumentation, Metadaten) erlaubt:
- Kanonische IDs wie `LRN:SSF:PHY-SKY-0001`
- Domainfelder wie `PHY`, `MAT`, `ENG`
- Verweise auf Quellen und Lehrstühle

In der Lernenden-Ansicht erlaubt (nur als Kontext, nie als Einstieg):
- Verweise unter "Mehr erfahren" oder "Quellen"
- Horizont-Karten die verwandte Themen zeigen

In der Lernenden-Ansicht verboten als Einstieg:
- "Physik · Optik · Kapitel 3"
- "TM2-STRAIN-001"
- "Vorlesung Technische Mechanik 2"

---

## 8. Formelregel

Formeln erscheinen **nach** der intuitiven Erklärung — nie davor.

**Richtige Reihenfolge:**
```
① Beobachtung: Stahl dehnt sich aus.
② Experiment: Slider zeigt wie viel.
③ Erklärung: "Je länger, desto mehr."
④ Formel: ΔL = α · L₀ · ΔT
```

**Falsche Reihenfolge:**
```
① Formel: ΔL = α · L₀ · ΔT
② Erklärung dazu
③ Beispiel
```

Die Formel ist die **Verdichtung** der Entdeckung — nicht ihr Ausgangspunkt.

---

## 9. Zehn Schritte früher

Die SSF beginnt dort wo andere Plattformen und Vorlesungen aufhören zu erklären.

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

SSF richtet sich an Menschen die **verstehen** wollen — nicht an Menschen die bestehen müssen.

---

## Dokumentfamilie

Dieses Dokument ist die Grundlage. Die Autorenfamilie baut darauf auf:

```
SSF-DIDAKTIK.md          ← dieses Dokument
    │
    ├── SSF-AUTORENLEITFADEN.md      ← wie schreibt man einen Lernpfad
    ├── SSF-LERNPFAD-TEMPLATE.md     ← Vorlage für neue Pfade
    ├── SSF-LERNSZENEN-TEMPLATE.md   ← Vorlage für einzelne Szenen
    └── SSF-QUIZ-RICHTLINIEN.md      ← wie schreibt man gute Quiz-Fragen
```

---

*Solar Science Foundation · SSF-DIDAKTIK.md · v0.2.0 · 2026-07-15*
*Autor: Thomas Peter Küper · Repo: thomaspeterkueper/solarsciencefoundation*
*v0.1.0: Grunddokument — Lernreise, drei Rollen, Dramaturgie, Lernszene, Formelregel*
*v0.2.0: Entdeckung als Leitbegriff, Einstiegsfragen-Kapitel, Lernszenen-Grundregel, Disziplin-Präzisierung, Dokumentfamilie*
