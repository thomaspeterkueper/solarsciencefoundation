---
id: NOX-SSF-REQ-20260831-THARSIS-SAFEHAVEN-UTILITY-REDUNDANCY
requester: SYS:KUEPER:noxia
target: SYS:KUEPER:ssf
priority: medium
type: focused-evidence-check
created: 2026-08-31
status: open
affects: [SSF, OTA, NOXIA]
---

# Tharsis Hub — fokussierter Evidenzcheck zu Safe-Haven und Medienredundanz

Aus dem NOXIA Implementierungs-/Layout-Review ergeben sich zwei realwissenschaftliche Teilfragen. Bitte **keine NOXIA-Spielwerte** und keine neue OTA-Objektarchitektur festlegen; nur Evidenz/Engineering-Anker liefern.

Kontext:
- 497 Bewohner
- 6 Habitatcluster × 84 nominale Plätze = 504
- mehrere isolierbare Druck-/Brandsegmente
- zwei räumlich getrennte Utility-Backbones vorgesehen
- OTA-Klärungsauftrag: `NOX-OTA-REQ-20260831-THARSIS-SEED-REVIEW-CLARIFICATIONS`

## 1. Safe-Haven / temporäre Überbelegung nach Segmentverlust

Gesucht sind belastbare NASA/ESA/Space-Habitat- oder analoge technische Anker für die Frage:

**Wie wird bei langdauernden isolierten Habitaten die temporäre Aufnahme der Bewohner eines ausgefallenen Druck-/Brandsegments dimensioniert, ohne dauerhaft volle Ersatz-Wohnkapazität vorzuhalten?**

Bitte soweit vorhanden unterscheiden:
- nominale Habitable-/Wohnkapazität,
- Safe-Haven-Kapazität,
- zeitlich begrenzte Notüberbelegung,
- minimale Lebenserhaltungs-/CO2-/O2-/Wasser-/Sanitärleistung bei Evakuierung,
- Dauerannahmen (Stunden/Tage),
- Brandschutz-/Kontaminationsfall vs. Druckverlust.

Wenn es keine belastbare Personen-/Flächenregel gibt, ausdrücklich so kennzeichnen. Ziel ist **nicht**, eine unbelegte „x % Reserveplätze“-Regel zu erfinden.

## 2. Redundanz kritischer Mediennetze

Gesucht sind Engineering-Anker für segmentierte, isolierbare Habitat-/Industrienetze:

- elektrische Leistung,
- Daten/Steuerung,
- Trink-/Prozesswasser,
- O2/Atmosphärenversorgung,
- Prozessgase,
- Abwasser,
- thermische Kreise.

Bitte prüfen:
- welche Medien in Raumfahrthabitaten typischerweise dual/redundant geführt oder durch lokale Backup-Systeme abgesichert werden;
- wo Ring-, Loop-, Cross-Tie-, isolierbare Segment- oder lokale Reservearchitekturen verwendet werden;
- ob „zwei vollständige Backbones für jedes Medium“ technisch sinnvoll/notwendig ist oder ob unterschiedliche Redundanzstrategien pro Medium plausibler sind.

## Erwartete Ausgabe

Kurzer Evidenzbericht mit [R]/[S]/[A]-Trennung und Primärquellen. Besonders wichtig: keine Scheingenauigkeit, keine Übertragung von ISS-Crewarchitektur auf 497 Personen ohne Kennzeichnung.

Die Ergebnisse sollen an OTA zurückgegeben werden; NOXIA setzt anschließend nur die kanonisch bestätigte technische Architektur um.