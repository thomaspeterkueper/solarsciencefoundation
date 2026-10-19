# SSF-BELEGSTUFEN.md
## Solar Science Foundation · Belegstufen für historische Inhalte

**Version:** 0.1.0
**Erstellt:** 2026-10-19
**Status:** aktiv für die Reihe Vermessung, empfohlen für alle Lernpfade mit historischen Aussagen

---

## Zweck

Lernpfade erklären oft, *wie* Menschen früher gemessen, gebaut oder gerechnet haben. Dabei vermischen sich leicht drei Ebenen: was eine Quelle tatsächlich sagt, was die Forschung daraus ableitet und was SSF zum Lernen nachbaut. Eine mathematisch korrekte Rekonstruktion ist kein Nachweis, dass historisch genau so gearbeitet wurde.

Deshalb tragen Abschnitte mit historischem Inhalt eine **Belegstufe** (`evidence`). Sie erscheint im Lernpfad als Abzeichen mit Erklärung beim Darüberfahren.

## Die drei Stufen

| `evidence` | Abzeichen | Bedeutung | Beispiele |
| --- | --- | --- | --- |
| `quelle` | Quellenbefund | Das sagt ein historischer Text, Fund oder eine Inschrift selbst. | Vitruv beschreibt den Chorobates; Liu Huis Inselaufgabe mit ihren Zahlen; Metallteile einer Groma aus Pompeji |
| `forschung` | Forschungsdeutung | Das leitet die Forschung aus den Quellen ab; Einzelheiten können umstritten sein. | Aussehen und Teilbezeichnungen der Groma; Vermessungspraxis beim antiken Qanat-Bau; Umrechnung antiker Einheiten |
| `rekonstruktion` | Didaktische Rekonstruktion | Modell, Aufgabe oder Versuch der SSF – kein Nachweis historischer Arbeitsweise. | Schemata; Rechenaufgaben mit modernen Zahlen; Mini-Groma, Śulba-Seil, Tischmodell der Inselmessung |

**Ohne Stufe** bleiben Abschnitte mit zeitlosem Sachwissen: Mathematik, Physik, heutige Technik. Ein Lot hängt senkrecht, 3² + 4² = 5² – das braucht keine Belegstufe.

## Regeln

1. Eine Belegstufe gilt für den ganzen Abschnitt. Mischt ein Abschnitt Ebenen, wird er entweder geteilt oder trägt die *schwächere* Stufe; der Text benennt den Übergang ausdrücklich („Wie genau … ist eine Rekonstruktion“).
2. Praxisaufgaben, die eine historische Methode nachstellen, tragen immer `rekonstruktion`.
3. Eigene Schemata tragen `quelle` nur, wenn sie eine überlieferte Aufgabe oder einen Fund unmittelbar darstellen; sonst `rekonstruktion`, nie `forschung`.
4. Formeln in heutiger Schreibweise für überlieferte Rechenregeln werden als solche benannt („in heutiger Schreibweise“) und tragen `rekonstruktion`.
5. Legenden (z. B. das ägyptische 3-4-5-Knotenseil) werden im Text als nicht belegt benannt und nie als `quelle` geführt.

## Verhältnis zu den KUE-Markern

Die historische Grundlage liegt auf kueper.com (für die Reihe Vermessung `DOC:KUE:KUE-HIS-0001-2026-DE`) und verwendet die Epistemik-Marker des Ökosystems. Grobe Entsprechung:

| KUE-Marker | SSF-Belegstufe |
| --- | --- |
| [R] mit Primärquelle oder Fund | `quelle` |
| [R] als Forschungskonsens, [H] | `forschung` |
| [OFFEN] | im SSF-Text als offen benennen, nicht als Tatsache lehren |

SSF darf eine Aussage nicht stärker kennzeichnen als ihre KUE-Grundlage.

## Technik

- Feld: `LearningPathSection.evidence` (`lib/learningPaths.ts`), Beschriftungen in `lib/learningEvidence.ts`.
- Die Reihe Vermessung führt die Zuordnung als eine prüfbare Tabelle `SURVEYING_SECTION_EVIDENCE` in `lib/learningPaths/surveying.ts`.
- Tests (`tests/surveyingLearningPaths.test.ts`) prüfen, dass die Tabelle nur existierende Abschnitte nennt, dass Praxisaufgaben nie als Quellenbefund erscheinen und dass jeder Pfad seine historischen Inhalte kennzeichnet.

---

*Solar Science Foundation · SSF-BELEGSTUFEN.md · v0.1.0 · 2026-10-19*
