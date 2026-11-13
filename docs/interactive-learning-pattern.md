# SSF: Interaktives Lernen statt Textunterricht

Status: Konzept, 13.11.2026. Pilotmodul KD:PHYS:N1 (PHY 1).

## Leitprinzip
Beobachten → Verändern → Vermuten → Überprüfen → Erklären → In NOXIA anwenden.
Keine langen Pflichttexte vor der ersten Interaktion. Ein bis zwei Sätze Kontext, optionale Vertiefung, barrierefreie Textalternative.

## Pilot PHY 1: Was steckt unter dem Boden?
1. Gelände als animierter Querschnitt, Scanner wird bewegt, Heatmap zeigt Anomalien ohne Ground Truth.
2. Sensorposition, Empfindlichkeit, räumliche Auflösung, Rauschen und Nachweisgrenze interaktiv verändern. Visuelle Rückmeldung und Vorhersage vor dem Experiment.
3. Spieler formuliert alternative Hypothesen zur Anomalie. Beobachtung, Interpretation und Prüfung werden durch eine konsistente visuelle Sprache getrennt.
4. Zweite unabhängige Messmethode auswählen, Evidenz vergleichen. Gravimetrie misst Schwerebeschleunigung, Dichtekontraste werden erst interpretiert.
5. Position und Tiefe der Kernprobe auswählen, Bohrung animieren. Nichttreffer schränkt nur die tatsächlich untersuchte Stelle und Tiefe ein.
6. Konkrete Instrumentenlücke erkennen und zwei Bauwege nach Wissen, Material, Komponenten, Energie, Zeit und Risiko vergleichen.
7. Kompetenz im Spiel anhand Entscheidungen demonstrieren statt nur Antworten anzuklicken; Prüfung und bestehende Unlock-Verträge einhalten.

## Wiederverwendbare SSF-Komponenten
- Animierte Grafiken und pausable Kurzsequenzen; reduzierte Bewegung als Alternative.
- Drag-and-drop, Slider, Instrumentenwahl, Messpunkte auf Karten, Versuchsaufbauten.
- Erst eine Prognose abgeben, danach Ergebnis simulieren und Erklärung vergleichen.
- Klare Unterscheidung Messwert / Modellschluss / noch unbekannt; niemals versteckte Simulationswerte als Spielermessung zeigen.
- Kurze kontextuelle Sprechblasen, optionale Audioerklärung mit Untertiteln und Vertiefung auf Abruf.
- Responsive Touch-Bedienung, Tastatursteuerung, kontrastreiche und farbenblindheitsfreundliche Anzeigen.
- Fehler und Wiederholungen erlauben; nachvollziehbare Kompetenzereignisse speichern.

## Zuständigkeiten
SSF besitzt Lerndesign, Interaktionen, Kompetenzbewertung und Fortschritt. KG bleibt fachliche Source of Truth. NOXIA besitzt Spielsimulation, Instrumentphysik, Weltzustand. SSF nutzt versionierte Simulationsschnittstellen und dupliziert die Physik nicht. Lokale Mockdaten sind ausdrücklich als illustrative Beispieldaten zu kennzeichnen.

## Umsetzungsreihenfolge
- P0: Funktionsfähiger mobiler Browserprototyp mit Scannerszene, Reglern, Hypothesenwahl, visueller Datenanzeige und Textalternative.
- P1: Kombination unabhängiger Methoden, Kernprobe, lokale Grenzen des Nichttreffers, erfahrungsbasiertes Assessment.
- P2: Instrumententwicklung, NOXIA-Simulatorintegration und gesicherte Fortschritts-/Credits-/Unlock-Prüfung.
- P3: Komponenten für weitere Fächer (Magnetismus, Chemie, Astronomie, Batterie, Geologie) generalisieren.

## Abnahme
- Erste sinnvolle Aktion vor längerer Textdarstellung; visuelle Ergebnisse unmittelbar.
- Keine falsche Gewissheit durch fehlende Detektion oder durch Modellwerte.
- Gleicher Lerninhalt mit Animation und zugänglicher Textalternative.
- Freischaltungen/Belohnungen erst nach nachgewiesener Kompetenz, nicht nach bloßem Durchklicken.
- UI mobile/desktop, reduziert animiert und per Tastatur bedienbar.
- Repo-Grenzen beachten: Änderungen an KG/NOXIA nur als Anforderungen in deren external-tasks/open/.

Verknüpft mit SSF Issue #92.