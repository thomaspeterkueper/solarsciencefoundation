# SSF-AUTORENLEITFADEN.md
## Solar Science Foundation · Autorenleitfaden

**Version:** 0.1.0
**Erstellt:** 2026-07-15
**Status:** Draft
**Basis:** SSF-DIDAKTIK.md v0.2.0

---

## Für wen ist dieser Leitfaden?

Für alle die einen neuen Lernpfad für die SSF erstellen oder bestehende Pfade erweitern.

Er beantwortet drei Fragen:
1. Womit fange ich an?
2. Wie baue ich einen Lernpfad auf?
3. Woran erkenne ich ob er gut ist?

---

## Schritt 1: Die Einstiegsfrage finden

Bevor du irgendetwas schreibst, findest du die Frage.

Nicht das Thema. Die **Frage**.

### Übung

Schreibe das Thema auf das du vermitteln willst:
```
Thema: _______________
```

Streiche es. Schreibe stattdessen:
```
Was würde jemand fragen, wenn er das zum ersten Mal beobachtet?
```

Beispiel:
- Thema: Rayleigh-Streuung → Frage: Warum ist der Himmel blau?
- Thema: Hookesches Gesetz → Frage: Warum federt ein Gummiband zurück?
- Thema: DMS-Rosette → Frage: Warum reichen drei Messungen um Spannungen in alle Richtungen zu kennen?

### Test

Die Einstiegsfrage besteht den Test wenn:
- [ ] Ein 12-Jähriger sie versteht
- [ ] Sie kein Fachwort enthält
- [ ] Sie mehrere Antworten zulässt
- [ ] Sie aus der Alltagswelt kommt

---

## Schritt 2: Die Kapitelstruktur planen

Schreibe alle Fragen auf die beantwortet werden müssen bevor die Einstiegsfrage vollständig beantwortet ist.

Das sind deine Kapitel.

Beispiel für "Warum kann Stahl brechen?":
```
K1: Warum werden Materialien länger?
K2: Was ist Spannung?
K3: Was ist Dehnung?
K4: Warum werden Materialien dünner?
K5: Wie misst ein DMS?
K6: Warum reicht eine Messung nicht?
K7: Wenn Spannung in mehrere Richtungen wirkt?
K8: Vom Messwert zur Spannung?
```

**Faustregel:** 4–8 Kapitel pro Lernpfad. Weniger ist besser als mehr.

---

## Schritt 3: Jedes Kapitel aufbauen

Jedes Kapitel folgt der didaktischen Dramaturgie aus SSF-DIDAKTIK.md §3.

Für jedes Kapitel:

### ① Beobachtung (Pflicht)
Ein konkretes Alltagsphänomen. 2–4 Sätze. Keine Fachbegriffe.

Prüffrage: *Könnte dieser Satz in einem Sachbuch für Jugendliche stehen?*

### ② Einstiegsfrage (Pflicht)
Steht als H2-Überschrift über dem Kapitel. Ist gleichzeitig `entryQuestion` in learningPaths.ts.

### ③ Experiment (Pflicht wenn möglich)
Mindestens ein interaktiver Slider. Die Wirkung muss sofort sichtbar sein.

Prüffrage: *Verändert sich etwas wenn der Nutzer einen Slider bewegt?*

### ④ Erklärung (Pflicht)
2–5 Sätze. Das eine Prinzip. Dann erst die Formel.

### ⑤ Quiz (Pflicht)
Genau 3 Fragen. Alle testen Verständnis, keine Reproduktion.

Prüffrage: *Kann man die Frage beantworten ohne die Erklärung auswendig gelernt zu haben?*

### ⑥ Takeaway (Pflicht)
Ein Satz. Beginnt mit dem Kern-Begriff, endet mit der Überraschung.

Prüffrage: *Würde jemand diesen Satz in einer Nachricht zitieren?*

---

## Schritt 4: Quiz-Fragen schreiben

Drei Fragen pro Kapitel. Für jede Frage:

1. **Eine Rechenaufgabe** — Formel anwenden (wenn relevant)
2. **Eine Verständnisfrage** — Warum gilt das?
3. **Eine Transferfrage** — Was gilt dann für diesen anderen Fall?

Falsche Antworten öffnen Erklärungen. Sie sind keine Fallen — sie sind Lernchancen.

Jede falsche Antwort braucht ein `quiz-fb` — eine Feedback-Box die erklärt **warum** sie falsch ist und **was** richtig wäre.

---

## Schritt 5: Technisch anlegen

1. Eintrag in `/lib/learningPaths.ts` anlegen (siehe `SSF-LERNPFAD-TEMPLATE.md`)
2. HTML-Prototyp in `/docs/prototypes/ssf-[slug].html` erstellen
3. HTML-Prototyp nach `/public/prototypes/ssf-[slug].html` kopieren
4. Experiment-Komponenten als React `.tsx` in `/components/learning/` portieren
5. Experiment-ID in `EXPERIMENT_MAP` in `PathRunner.tsx` eintragen

---

## Qualitätsscheck vor dem Commit

- [ ] Einstiegsfrage besteht den 3-Punkte-Test (§5 SSF-DIDAKTIK.md)
- [ ] Kein Kapitel beginnt mit einer Formel
- [ ] Jedes Kapitel hat mindestens eine Beobachtung
- [ ] Jedes Experiment hat mindestens einen Slider
- [ ] Jede Quiz-Frage testet Verständnis, nicht Reproduktion
- [ ] Jedes Kapitel hat einen Takeaway
- [ ] Kein Disziplinlabel in der Lernenden-Ansicht

---

*Solar Science Foundation · SSF-AUTORENLEITFADEN.md · v0.1.0 · 2026-07-15*
