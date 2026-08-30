<!--
KUEPER · Solar Science Foundation (SSF)
Path:     docs/ENGINEERING-LEARNING-TEMPLATE.md
Version:  0.1.0
Created:  2026-08-30
Source:   didactic pattern derived from user-provided "Lexikon Konstruktionslehre 1"
-->

# ENGINEERING-LEARNING-TEMPLATE.md
## Autorenmuster für technische und ingenieurwissenschaftliche Lernmodule

**Status:** Pilot · Ergänzung zu `LEARNING-PRINCIPLES.md` und `EDITORIAL.md`  
**Geltung:** technische/ingenieurwissenschaftliche SSF-Module; nach Pilotierung auf andere geeignete Fächer übertragbar  

---

## 1. Zweck

Technische Lerninhalte sollen nicht als Folge isolierter Definitionen oder als `Text → Quiz` aufgebaut werden. Gute Module führen vom beobachtbaren Problem über Begriffe und Systemzusammenhänge zur Anwendung und begründeten Entscheidung.

Das Grundmuster lautet:

> **Orientierung → Begriff → Zusammenhang → Interaktion → Anwendung → Entscheidung → Formel/Modell → Kurztest → Merksatz**

Das Muster ergänzt die epistemische Pyramide EP0–EP4; es ersetzt sie nicht. Kanonische Definitionen und wissenschaftliche Aussagen bleiben KG-/OTA-gebunden gemäß `LEARNING-PRINCIPLES.md` und `EDITORIAL.md`.

---

## 2. Didaktischer Ursprung

Das Muster übernimmt aus der bereitgestellten Konstruktionslehre insbesondere folgende Strukturprinzipien:

- ein Gesamtprozess wird vor seinen Einzelbegriffen sichtbar gemacht;
- Begriffe werden über ihre Rolle im Prozess und ihre Beziehungen erklärt;
- Systemgrenzen werden über **Energie-, Stoff- und Informationsflüsse (E/S/I)** beschrieben;
- Gesamtfunktionen werden in Teilfunktionen zerlegt, bevor konkrete Geräte oder Bauformen gewählt werden;
- für Teilfunktionen werden mehrere Lösungsmöglichkeiten betrachtet;
- Kombinationen werden systematisch synthetisiert und anschließend nach Kriterien bewertet;
- überschlägige Auslegung und späterer Nachweis werden epistemisch getrennt;
- Formeln und Merkhilfen verdichten das zuvor verstandene Modell, statt es zu ersetzen.

Diese Prinzipien sind besonders geeignet für SSF, weil sie Wissen, Modellbildung, Anwendung und Entscheidung miteinander verbinden.

---

## 3. Modulstruktur

### 3.1 Orientierung

Eine konkrete Frage, Beobachtung oder technische Aufgabe eröffnet das Modul.

**Ziel:** Der Lernende versteht, welches Problem erklärt oder gelöst werden soll.

Keine Lösung vorwegnehmen. Narrative dürfen illustrieren, aber gemäß R-01 nicht definieren.

### 3.2 Begriff

Die für das Problem notwendigen Fachbegriffe werden knapp und eindeutig eingeführt.

**Ziel:** gemeinsames Vokabular.

Definitionen müssen auf kanonische KG-/OTA-Quellen zurückführbar sein.

### 3.3 Zusammenhang

Die Begriffe werden in ein Modell, einen Prozess oder eine Funktionsstruktur gebracht.

Für technische Systeme ist die bevorzugte Darstellung zunächst eine lösungsneutrale Blackbox:

- Systemgrenze
- Eingänge
- Ausgänge
- Energieflüsse
- Stoffflüsse
- Informations-/Signalflüsse
- relevante Störgrößen

Danach kann die Gesamtfunktion in Teilfunktionen zerlegt werden.

### 3.4 Interaktion

Der Lernende verändert einen oder wenige relevante Parameter und beobachtet eine kausal verständliche Wirkung.

Geeignet sind beispielsweise:

- Durchfluss, Druck, Temperatur oder Leistung verändern;
- einen Stoff- oder Energiepfad unterbrechen;
- Komponenten/Teilfunktionen ein- und ausschalten;
- zwei Wirkprinzipien vergleichen;
- eine Störung oder einen Ausfall auslösen.

Die Interaktion braucht immer einen textlichen Fallback.

### 3.5 Anwendung

Eine kleine Aufgabe verlangt die Verwendung des gerade aufgebauten Modells. Die Aufgabe soll Transfer prüfen, nicht bloß eine Formulierung aus dem Text wiederholen.

### 3.6 Entscheidung

Wo mehrere technisch plausible Lösungen existieren, soll der Lernende eine begründete Auswahl treffen.

Mögliche Kriterien:

- Funktion/Leistung
- Sicherheit
- Energiebedarf
- Stoffbedarf
- Masse/Volumen
- Fertigung/Montage
- Wartung/Instandhaltung
- Robustheit/Redundanz
- Kosten

Bei komplexeren Modulen können Gewichtung, Paarvergleich oder Nutzwertanalyse eingesetzt werden. Eine Bewertungsmethode darf nicht den Eindruck erzeugen, eine subjektive Gewichtung sei eine Naturkonstante.

### 3.7 Formel oder Modell

Eine Formel wird erst dann zentral, wenn die Größen konzeptuell eingeführt sind.

Jede Formel erhält mindestens:

- Bedeutung der Größen und Einheiten;
- Gültigkeitsbereich bzw. Annahmen;
- qualitative Aussage (`wenn X steigt, was geschieht mit Y?`);
- mindestens eine Anwendung oder Parameteränderung.

Überschlägige Auslegung und belastbarer Nachweis sind sprachlich zu unterscheiden.

### 3.8 Kurztest

2–5 kurze Fragen prüfen unterschiedliche Ebenen:

1. Begriff erkennen;
2. Zusammenhang erklären;
3. Modell anwenden;
4. optional eine technische Entscheidung begründen.

### 3.9 Merksatz

Am Ende steht eine kurze Verdichtung des Moduls. Merksätze dürfen vereinfachen, aber nicht fachlich falsch werden.

---

## 4. Engineering-spezifisches Vertiefungsmuster

Für System- und Konstruktionsmodule kann die Modulfolge erweitert werden:

1. **Anforderung klären** — Was muss das System leisten? Was ist Festforderung, was Wunsch?
2. **Blackbox bilden** — Was überschreitet die Systemgrenze als Energie, Stoff oder Information?
3. **Gesamtfunktion formulieren** — lösungsneutral, bevorzugt Substantiv + Tätigkeitswort.
4. **Teilfunktionen bilden** — noch keine konkrete Geräteauswahl.
5. **Teillösungen sammeln** — mehrere Wirkprinzipien zulassen.
6. **Lösungen kombinieren** — bei Bedarf morphologischer Kasten.
7. **Unverträglichkeiten erkennen** — technisch unsinnige Kombinationen ausscheiden.
8. **Varianten bewerten** — transparente Kriterien und Gewichtungen.
9. **Grob auslegen** — Größenordnungen, Leistung, Stoffströme, Dimensionen.
10. **Grenzen und Unsicherheiten benennen** — was wäre für einen echten Nachweis zusätzlich nötig?

Diese Reihenfolge verhindert, dass ein bekanntes Bauteil voreilig zur vermeintlich einzigen Lösung wird.

---

## 5. Mapping auf EP0–EP4

| Modulschritt | Schwerpunkt | typische EP-Ebene |
|---|---|---|
| Orientierung | Beobachtung/Problem | EP0 |
| Begriff | Benennung/Definition | EP1 |
| Zusammenhang | Modell/Funktionsstruktur | EP2 |
| Interaktion | Modell explorieren | EP2–EP3 |
| Anwendung | Transfer | EP3 |
| Entscheidung | technische Abwägung | EP3 |
| Formel/Modell | quantitative Modellierung | EP2–EP3 |
| Kurztest | Diagnose | EP1–EP3 |
| Merksatz | Verdichtung | EP1–EP2 |
| NOXIA-/Weltbezug | Illustration/Anwendung | EP3–EP4 |

EP4 bleibt nachgeordnet: Ein NOXIA-Gebäude darf zeigen, wozu Wissen gebraucht wird, aber nicht definieren, wie Natur oder Technik grundsätzlich funktioniert.

---

## 6. Pilotcluster: Konstruktionslehre / Engineering Design

Der erste Pilotcluster soll nicht einfach das bereitgestellte Skript reproduzieren, sondern dessen didaktische Struktur in eigenständige SSF-Module überführen.

Vorgeschlagene Lernfolge:

1. **Vom Problem zur Anforderung**  
   Lastenheft/Pflichtenheft als Kontext; Festforderung vs. Wunsch; Anforderungsgruppen.

2. **Technische Systeme als Blackbox**  
   Systemgrenze; Energie, Stoff, Information; Störgrößen.

3. **Von der Gesamtfunktion zur Funktionsstruktur**  
   Haupt-, Neben- und Störfunktionen; lösungsneutrale Teilfunktionen.

4. **Mehr als eine Lösung finden**  
   systematische und intuitive Lösungssuche; Lösungsklassen.

5. **Der morphologische Kasten**  
   Teilfunktionen × Teillösungen; Kombination und Unverträglichkeit.

6. **Technische Lösungen bewerten**  
   Kriterien, Gewichtung, Nutzwertanalyse; technische und wirtschaftliche Zielkonflikte.

7. **Vom Konzept zum Entwurf**  
   Prinzipskizze, Grob-/Feingestaltung, Baustruktur.

8. **Auslegen ist nicht Nachweisen**  
   überschlägige Dimensionierung, Sicherheitsannahmen, Iteration, Nachweisrechnung.

9. **Leistung, Wirkungsgrad und Antriebsstrang**  
   Energieerhaltung, Verluste, Leistung/Drehmoment/Drehzahl als quantitative Anwendung.

### Pilotprojekt innerhalb des Clusters

**Systemaufgabe: Wasseraufbereitung für eine kleine Marsbasis**

Der Lernende erhält Anforderungen und modelliert zunächst die Blackbox. Danach zerlegt er das System beispielsweise in Förderung, Vorbehandlung, Trennung/Reinigung, Qualitätsüberwachung, Speicherung und Reststoffbehandlung. Erst anschließend werden technische Teillösungen angeboten. Varianten können nach Energiebedarf, Wartbarkeit, Robustheit, Masse/Volumen und Redundanz bewertet werden.

NOXIA kann später eine konkrete Spielsituation als EP3/EP4-Anwendung liefern. Die wissenschaftlich-technische Definition und Didaktik bleiben SSF-eigen.

---

## 7. Autoren-Check vor Freigabe

Ein technisches Modul ist erst freigabefähig, wenn alle zutreffenden Fragen mit Ja beantwortet werden können:

- Ist das Problem vor der Lösung verständlich?
- Sind Definitionen von Beispielen/Narrativen getrennt?
- Ist die Systemgrenze klar?
- Sind relevante Energie-, Stoff- und Informationsflüsse sichtbar?
- Wird bei einer frühen Funktionsanalyse nicht bereits unnötig eine konkrete Bauform vorausgesetzt?
- Kann der Lernende mindestens einen Zusammenhang selbst anwenden oder verändern?
- Sind Alternativen und Zielkonflikte sichtbar, wenn es tatsächlich mehrere Lösungen gibt?
- Sind Formeln mit Größen, Einheiten, Annahmen und Gültigkeitsbereich erklärt?
- Sind Auslegung, Annahme und Nachweis sauber getrennt?
- Prüft der Kurztest Verständnis statt bloß Textwiedererkennung?
- Ist der Merksatz korrekt genug, um ohne den restlichen Text stehen zu können?
- Bleibt ein NOXIA-/Narrativbezug Illustration oder Anwendung statt Wissensquelle?

---

## 8. Quellen- und Rechtehinweis

Die bereitgestellte Konstruktionslehre dient hier als **didaktische Referenz für Struktur und Themenauswahl**, nicht als Textquelle für die Veröffentlichung. SSF-Module werden eigenständig formuliert. Wissenschaftliche/technische Aussagen erhalten vor Veröffentlichung die nach `EDITORIAL.md` erforderlichen KG-/OTA- bzw. Primärquellen.

Formulierungen, Tabellen, Merkhilfen, Beispiele und Grafiken der Vorlage werden nicht ungeprüft oder wörtlich in öffentliche SSF-Inhalte übernommen.
