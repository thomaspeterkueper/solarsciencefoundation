# SSF-QUIZ-RICHTLINIEN.md
## Solar Science Foundation · Quiz-Richtlinien

**Version:** 0.2.0
**Erstellt:** 2026-07-15
**Geändert:** 2026-09-13 · an `SSF-DIDAKTIK.md` v0.4.0 angepasst
**Status:** Kanonisch
**Basis:** `SSF-DIDAKTIK.md` v0.4.0

---

## Das SSF-Quiz ist kein Test

Ein SSF-Quiz ist kein Prüfungsinstrument.
Es ist ein **Verständnisgespräch**.

Der Unterschied:

| Prüfungs-Quiz | SSF-Quiz |
|--------------|----------|
| Misst Reproduktion | Prüft Verständnis und Transfer |
| Falsch = Strafe | Falsch = Erklärung |
| Kann Stoff ersetzen | Kommt erst nach ausreichender Vermittlung |
| Einzeln bewertet | Unterstützt den nächsten Erkenntnisschritt |

Ein Quiz darf niemals fehlende Erklärung, Beobachtung, Visualisierung oder Erkundung ersetzen.

---

## Struktur: 3 Fragen pro Kapitel

Ein regulärer Kapitel-Kurztest hat genau **3 Fragen** in dieser Reihenfolge:

### Frage 1 — Anwendung
Eine konkrete Anwendung des Kernprinzips. Das kann eine Rechnung sein, muss es aber nicht.

Beispiel (Kapitel Normalspannung):
> F = 50 kN auf einen Stab mit d = 20 mm. Wie groß ist σ?

### Frage 2 — Verständnis
Warum gilt das Prinzip? Was steckt dahinter?

Beispiel:
> Warum ist σ = F/A und nicht σ = F allein?

### Frage 3 — Transfer
Was folgt für einen anderen Fall, eine veränderte Randbedingung oder eine überraschende Konsequenz?

Beispiel:
> Stahl E = 210 GPa, Alu E = 70 GPa. Bei gleicher Spannung — welches Material dehnt sich mehr?

Die drei Fragen sind ein **Abschluss einer bereits vermittelten Lernsequenz**. Sie definieren nicht die Dramaturgie des Kapitels.

---

## Die 4 Antwortoptionen

Jede Frage hat genau **4 Antwortmöglichkeiten**:

- **Eine richtige** — vollständig, präzise, mit kurzer Begründung
- **Drei falsche** — plausibel aber falsch, keine Fallen-Antworten

### Regeln für falsche Antworten

- Kein „Alle oben genannten“ oder „Keine der genannten“
- Keine offensichtlich absurden Antworten
- Jede falsche Antwort entspricht möglichst einem echten Missverständnis
- Keine Antwort darf nur deshalb falsch sein, weil sie sprachlich schlechter formuliert ist

### Aufbau der richtigen Antwort

Die richtige Antwort darf eine Rechnung oder kurze Begründung enthalten:
> „≈ 159 MPa — A = π/4·20² = 314 mm², σ = 50000/314 ≈ 159 N/mm²“

Das ist kein Schummeln — das ist Transparenz.

---

## Das Feedback (quiz-fb)

Jede Frage braucht ein Feedback, das nach der Antwortwahl erscheint.

Das Feedback erklärt:
1. **Warum** die richtige Antwort richtig ist
2. **welches Missverständnis** hinter einer typischen falschen Antwort steckt, soweit sinnvoll
3. **was** das mit dem Kapitel-Kernprinzip zu tun hat
4. **wann** man das in der Praxis oder im nächsten Zusammenhang braucht, wenn möglich

Länge: in der Regel 3–5 Sätze. Kein Aufsatz.

---

## Was gute Quiz-Fragen vermeiden

- Fragen, die nur Definitionen abfragen („Was ist σ?“)
- Fragen, die ausschließlich auswendig Gelerntes testen („Welche Formel gilt für …?“)
- Fragen mit Fachbegriffen, die vorher nicht erklärt wurden
- Fragen, die nicht eingeführtes Wissen aus anderen Kapiteln voraussetzen
- Mehrdeutige Fragen mit mehreren vertretbaren Antworten
- Fragen zu Details, die für die Kernentdeckung des Kapitels irrelevant sind
- Fragen unmittelbar am Einstieg, bevor ein mentales Modell aufgebaut wurde

---

## Prüffragen für Autoren

Bevor eine Quiz-Frage akzeptiert wird:

1. **Konnte der Lernende die notwendige Grundlage vorher tatsächlich verstehen?**
   Die Antwort muss aus Erklärung, Beobachtung, Schema, Beispiel oder sinnvoller Erkundung hervorgehen. Ein Experiment ist dafür nicht zwingend erforderlich.

2. **Prüft die Frage Anwendung, Verständnis oder Transfer statt bloßer Worterkennung?**
   Wenn die richtige Antwort allein über Formulierungsähnlichkeit erraten werden kann, ist die Frage zu schwach.

3. **Sind die falschen Antworten fachlich plausible Missverständnisse?**
   Wenn sie offensichtlich unsinnig sind, entsteht keine Lerngelegenheit.

4. **Ist die Frage ohne versteckte Zusatzannahmen eindeutig beantwortbar?**
   Notwendige Randbedingungen müssen in der Frage stehen oder vorher klar eingeführt worden sein.

5. **Kommt die Frage spät genug?**
   Nach `SSF-DIDAKTIK.md` folgen Verständnisfragen erst, wenn genügend Erklärung und Erfahrung vorhanden sind.

---

## Beispiel — vollständige Quiz-Frage

```text
Frage: F = 50 kN wirkt auf einen Stab mit d = 20 mm. Wie groß ist σ?

A) 2,5 MPa
B) 100 MPa
C) ≈ 159 MPa — A = π/4·20² = 314 mm², σ = 50000/314 ≈ 159 N/mm²  ← richtig
D) 2500 MPa

Feedback:
A = π/4 · d² = π/4 · 400 = 314,2 mm². σ = F/A = 50.000 N / 314,2 mm² = 159 N/mm² = 159 MPa.
Für Baustahl S235 mit einer nominellen Streckgrenze von 235 MPa liegt dieser Spannungswert darunter; eine reale Bauteilbewertung erfordert jedoch die jeweils geltenden Nachweise und Sicherheitsbeiwerte.
Die Querschnittsfläche ist der entscheidende Zwischenschritt, weil dieselbe Kraft auf kleinerer Fläche eine höhere Normalspannung erzeugt.
```

---

## Verhältnis zur SSF-Dramaturgie

Die kanonische Grundfolge aus `SSF-DIDAKTIK.md` lautet sinngemäß:

`Frage/Motivation → Beobachtung → erste Erklärung → Veranschaulichung/Erkundung → vertiefte Erklärung → Anwendung → Verständnisfragen → Takeaway → nächster Horizont`

Dabei gilt ausdrücklich:

> **Interaktiv, wo Interaktion Erkenntnis erzeugt. Visuell, wo Darstellung genügt.**

Ein Quiz darf daher weder als Einstieg noch als Ersatz für eine fehlende Lernszene verwendet werden.

---

*Solar Science Foundation · SSF-QUIZ-RICHTLINIEN.md · v0.2.0 · 2026-09-13*
