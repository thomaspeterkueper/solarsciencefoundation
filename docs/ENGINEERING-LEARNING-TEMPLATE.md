<!--
KUEPER · Solar Science Foundation (SSF)
Path:     docs/ENGINEERING-LEARNING-TEMPLATE.md
Version:  0.2.0
Created:  2026-08-30
Updated:  2026-09-01
-->

# ENGINEERING-LEARNING-TEMPLATE.md
## Autorenmuster für technische und ingenieurwissenschaftliche Lernmodule

**Status:** Pilot · Spezialisierung von `SSF-DIDAKTIK.md` v0.4.0  
**Geltung:** technische/ingenieurwissenschaftliche SSF-Lernreisen

## 1. Zweck

Technische Lerninhalte sollen weder `Text → Quiz` noch `Slider → Erklärung → Quiz` sein. Sie führen von einem verständlichen Problem über ein minimales mentales Modell zu einer sinnvollen Veranschaulichung oder Erkundung, anschließend zur fachlichen Vertiefung und Anwendung.

> **Problem/Frage → Beobachtung → erstes Modell → Veranschaulichung oder Interaktion → Zusammenhang → Anwendung/Entscheidung → Formel/Modell → Kurztest → Merksatz**

`SSF-DIDAKTIK.md` ist kanonisch. Dieses Dokument konkretisiert die Dramaturgie für Engineering, darf ihr aber nicht widersprechen.

### 1.1 Keine starre Experiment-vor-Erklärung-Regel

Ein technisches Experiment steht **nicht automatisch vor jeder Erklärung**. Vor einer Interaktion wird so viel erklärt, wie der Lernende benötigt, um die beobachtete Wirkung fachlich deuten zu können. Die vollständige oder vertiefte Erklärung kann danach folgen.

Wenn eine Interaktion keinen zusätzlichen Erkenntniswert erzeugt, wird sie durch ein Schema, eine Illustration, Animation, Tabelle, reale Aufnahme oder einen Vergleich ersetzt.

> **Interaktiv, wo Interaktion Erkenntnis erzeugt. Visuell, wo Darstellung genügt.**

## 2. Engineering-Dramaturgie

### 2.1 Problem / Orientierung
Eine konkrete technische Frage, Störung, Anforderung oder Beobachtung eröffnet die Lernszene. Der Nutzer soll wissen, **warum** das folgende Modell gebraucht wird, bevor Fachbegriffe eingeführt werden.

### 2.2 Beobachtung
Der relevante Ist-Zustand wird sichtbar: Messwert, Verhalten, Stoffstrom, Ausfall, Belastung oder Zielkonflikt. Bei komplexen Systemen kann dies eine einfache Systemskizze sein.

### 2.3 Erstes Modell und notwendige Begriffe
Nur die Begriffe und Beziehungen einführen, die für den nächsten Erkenntnisschritt benötigt werden. Definitionen müssen auf kanonische KG-/OTA-Quellen zurückführbar sein. Für technische Systeme eignen sich früh insbesondere Systemgrenze, Ein-/Ausgänge, Energie-, Stoff- und Informationsflüsse sowie relevante Zustände und Störgrößen.

### 2.4 Veranschaulichung oder Erkundung

**Interaktion**, wenn der Lernende durch Variation tatsächlich etwas entdecken kann, etwa Durchfluss, Druck, Temperatur oder Leistung verändern, einen Energie-/Stoffpfad unterbrechen, Komponenten schalten, Wirkprinzipien vergleichen oder eine Störung auslösen.

**Visualisierung**, wenn Veränderung keinen Mehrwert bietet, etwa Blackbox-/Flussschema, Schnittzeichnung, Prozessanimation, Zustandsvergleich oder mikroskopische Darstellung.

Jede Interaktion braucht einen textlichen Fallback. Keine fachfremde Simulation darf als Ersatz für ein fehlendes Experiment gemappt werden.

### 2.5 Zusammenhang / vertiefte Erklärung
Jetzt wird erklärt, **warum** die beobachtete Wirkung entsteht. Das erste Modell wird erweitert, korrigiert oder quantitativ präzisiert. Bei Systemmodulen kann anschließend die Gesamtfunktion in Teilfunktionen zerlegt werden.

### 2.6 Anwendung und Entscheidung
Das Modell wird auf einen neuen Fall angewandt. Wo mehrere plausible technische Lösungen existieren, trifft der Lernende eine begründete Entscheidung. Kriterien können Funktion, Sicherheit, Energie-/Stoffbedarf, Masse/Volumen, Fertigung, Wartung, Robustheit/Redundanz und Kosten sein. Subjektive Gewichtungen sind als solche zu kennzeichnen.

### 2.7 Formel oder quantitatives Modell
Eine Formel wird erst zentral, wenn die beteiligten Größen konzeptuell verstanden sind. Jede Formel erhält Bedeutung und Einheit der Größen, Gültigkeitsbereich/Annahmen, qualitative Aussage sowie eine Anwendung oder Parameteränderung. Überschlägige Auslegung und belastbarer Nachweis sind zu unterscheiden.

### 2.8 Kurztest
Der Kurztest folgt `SSF-QUIZ-RICHTLINIEN.md`: genau **3 Fragen** in der Reihenfolge **Anwendung → Verständnis → Transfer**, jeweils mit **4 Antwortmöglichkeiten**. Er kommt erst nach ausreichender Vermittlung.

### 2.9 Merksatz / nächster Horizont
Der Merksatz verdichtet die gewonnene Einsicht. Eine anschließende Frage zeigt, welcher technische Zusammenhang sich daraus als Nächstes erschließt.

## 3. Engineering-spezifisches Vertiefungsmuster

Für System- und Konstruktionsmodule kann die Lernfolge erweitert werden:
1. Anforderung klären
2. Blackbox bilden
3. Gesamtfunktion formulieren
4. Teilfunktionen bilden
5. Teillösungen sammeln
6. Lösungen kombinieren
7. Unverträglichkeiten erkennen
8. Varianten bewerten
9. grob auslegen
10. Grenzen und Unsicherheiten benennen

Diese fachmethodische Folge liegt **innerhalb** der didaktischen Dramaturgie. Sie schreibt nicht vor, dass jeder Punkt ein eigener Screen oder eine Interaktion sein muss.

## 4. Mapping auf EP0–EP4

| Schritt | Schwerpunkt | typische EP-Ebene |
|---|---|---|
| Problem/Beobachtung | Welt/technische Aufgabe | EP0 |
| erstes Modell/Begriff | Benennung und Grundbeziehung | EP1–EP2 |
| Visualisierung/Interaktion | Modell erkunden | EP2–EP3 |
| Zusammenhang | Modell/Funktionsstruktur | EP2 |
| Anwendung/Entscheidung | Transfer/Abwägung | EP3 |
| quantitatives Modell | Modellierung | EP2–EP3 |
| Kurztest | Diagnose | EP1–EP3 |
| Merksatz | Verdichtung | EP1–EP2 |

NOXIA kann Anwendungskontext liefern, definiert aber keine Realwissenschaft. EP4 bleibt nachgeordnet.

## 5. Pilotcluster: Konstruktionslehre / Engineering Design

Vorgesehene Lernfolge: Vom Problem zur Anforderung → technische Systeme als Blackbox → Gesamtfunktion/Funktionsstruktur → mehrere Lösungen → morphologischer Kasten → Bewertung → Entwurf → Auslegen vs. Nachweisen → Leistung/Wirkungsgrad/Antriebsstrang.

### Pilotprojekt: Wasseraufbereitung für eine kleine Marsbasis
Der Lernende erhält zunächst ein konkretes Wasserproblem und beobachtbare Anforderungen. Ein minimales Stoffstrommodell erklärt, welche Arten von Verunreinigung unterschieden werden müssen. Danach werden geeignete Trennprinzipien visuell oder interaktiv erkundet. Erst auf dieser Basis wird die Prozesskette aus Förderung, Vorbehandlung, Trennung/Reinigung, Qualitätsüberwachung, Speicherung und Reststoffbehandlung aufgebaut und nach Energiebedarf, Wartbarkeit, Robustheit, Masse/Volumen und Redundanz bewertet.

NOXIA kann die spätere Anwendung liefern; SSF bleibt Source of Truth für die Didaktik.

## 6. Autoren-Check vor Freigabe

- Ist das Problem vor der Lösung verständlich?
- Wird das minimale mentale Modell erklärt, bevor es für eine Interaktion vorausgesetzt wird?
- Erzeugt jede Interaktion eine echte fachliche Erkenntnis?
- Wurde geprüft, ob ein Schema/Bild/eine Animation klarer wäre?
- Sind Definitionen von Beispielen und Narrativen getrennt?
- Sind relevante Systemgrenzen und E/S/I-Flüsse sichtbar?
- Baut die vertiefte Erklärung auf der Beobachtung auf?
- Sind Alternativen und Zielkonflikte sichtbar, wenn es mehrere Lösungen gibt?
- Sind Formeln mit Größen, Einheiten, Annahmen und Gültigkeitsbereich erklärt?
- Sind Auslegung und Nachweis getrennt?
- Kommt der Kurztest erst nach ausreichender Vermittlung?
- Bleibt NOXIA Illustration/Anwendung statt Wissensquelle?

## 7. Quellen- und Rechtehinweis

Die bereitgestellte Konstruktionslehre dient als didaktische Referenz für Struktur und Themenauswahl, nicht als Textquelle für die Veröffentlichung. SSF-Inhalte werden eigenständig formuliert; wissenschaftliche und technische Aussagen folgen der Quellen- und Governance-Struktur des Projekts.
