# SSF-QUIZ-RICHTLINIEN.md
## Solar Science Foundation · Quiz-Richtlinien

**Version:** 0.1.0
**Erstellt:** 2026-07-15
**Status:** Kanonisch
**Basis:** SSF-DIDAKTIK.md v0.2.0

---

## Das SSF-Quiz ist kein Test

Ein SSF-Quiz ist kein Prüfungsinstrument.
Es ist ein **Verständnisgespräch**.

Der Unterschied:

| Prüfungs-Quiz | SSF-Quiz |
|--------------|----------|
| Misst Reproduktion | Misst Verständnis |
| Falsch = Strafe | Falsch = Erklärung |
| Am Ende des Kurses | Am Ende des Kapitels |
| Einzeln bewertet | Öffnet das nächste Kapitel |

---

## Struktur: 3 Fragen pro Kapitel

Jedes Kapitel hat genau **3 Fragen**. Immer in dieser Reihenfolge:

### Frage 1 — Anwendung
Eine konkrete Rechnung oder direkte Anwendung des Kernprinzips.

Beispiel (Kapitel Normalspannung):
> F = 50 kN auf einen Stab mit d = 20 mm. Wie groß ist σ?

### Frage 2 — Verständnis
Warum gilt das Prinzip? Was steckt dahinter?

Beispiel:
> Warum ist σ = F/A und nicht σ = F allein?

### Frage 3 — Transfer
Was gilt dann für diesen anderen Fall? Überraschende Konsequenz.

Beispiel:
> Stahl E = 210 GPa, Alu E = 70 GPa. Bei gleicher Spannung — welches Material dehnt sich mehr?

---

## Die 4 Antwortoptionen

Jede Frage hat genau **4 Antwortmöglichkeiten**:

- **Eine richtige** — vollständig, präzise, mit kurzer Begründung
- **Drei falsche** — plausibel aber falsch, keine Fallen-Antworten

### Regeln für falsche Antworten

- Kein "Alle oben genannten" oder "Keine der genannten"
- Keine offensichtlich absurden Antworten ("σ = 44 100 000")
- Jede falsche Antwort entspricht einem echten Missverständnis

### Aufbau der richtigen Antwort

Die richtige Antwort darf die Rechnung enthalten:
> "≈ 159 MPa — A = π/4·20² = 314 mm², σ = 50000/314 ≈ 159 N/mm²"

Das ist kein Schummeln — das ist Transparenz.

---

## Das Feedback (quiz-fb)

Jede Frage braucht ein Feedback das erscheint nachdem die Antwort gewählt wurde.

Das Feedback erklärt:
1. **Warum** die richtige Antwort richtig ist
2. **Was** das mit dem Kapitel-Kernprinzip zu tun hat
3. **Wann** man das in der Praxis braucht (wenn möglich)

Länge: 3–5 Sätze. Kein Aufsatz.

---

## Was gute Quiz-Fragen vermeiden

- Fragen die nur Definitionen abfragen ("Was ist σ?")
- Fragen die auswendig Gelerntes testen ("Welche Formel gilt für...?")
- Fragen mit Fachbegriffen die im Kapitel nicht erklärt wurden
- Fragen die Stoff aus anderen Kapiteln voraussetzen
- Mehrdeutige Fragen mit mehreren vertretbaren Antworten

---

## Prüffragen für Autoren

Bevor eine Quiz-Frage akzeptiert wird:

1. **Könnte jemand der das Experiment gespielt hat die Frage beantworten?**
   Wenn nicht, testet die Frage Wissen, nicht Verstehen.

2. **Würde jemand der das Kapitel nur überflogen hat die Frage falsch beantworten?**
   Wenn nicht, ist die Frage zu einfach.

3. **Ist die falsche Antwort verlockend?**
   Wenn nicht, ist es eine Falle, keine Lerngelegenheit.

---

## Beispiel — vollständige Quiz-Frage

```
Frage: F = 50 kN wirkt auf einen Stab mit d = 20 mm. Wie groß ist σ?

A) 2,5 MPa
B) 100 MPa
C) ≈ 159 MPa — A = π/4·20² = 314 mm², σ = 50000/314 ≈ 159 N/mm²  ← richtig
D) 2500 MPa

Feedback:
A = π/4 · d² = π/4 · 400 = 314,2 mm². σ = F/A = 50.000 N / 314,2 mm² = 159 N/mm² = 159 MPa.
Für Baustahl S235 mit Streckgrenze R_e = 235 MPa ist das noch sicher — aber schon 67% ausgelastet.
Die Fläche des Kreisquerschnitts zu berechnen ist der erste und wichtigste Schritt
bei jeder Spannungsberechnung.
```

---

*Solar Science Foundation · SSF-QUIZ-RICHTLINIEN.md · v0.1.0 · 2026-07-15*
