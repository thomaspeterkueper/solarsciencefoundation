---
id: NOX-SSF-REQ-20260830-MINIMUM-VIABLE-MARS-COLONY-497
requester: SYS:KUEPER:noxia
target: SYS:KUEPER:ssf
priority: high
type: research-evidence
created: 2026-08-30
status: open
affects: [SSF, NOXIA, OTA, KG]
---

# Wissenschaftliche Basis für eine minimale Marskolonie mit 497 Personen

## Anlass

Die bestehende NOXIA-Startkolonie **Tharsis Hub** soll grundlegend neu aufgebaut werden. Die Startkolonie ist keine bereits entwickelte Stadt, sondern eine staatlich finanzierte Basiskolonie: Es soll nur die Infrastruktur vorhanden sein, die für einen sicheren und plausiblen Betrieb unbedingt erforderlich ist. Der spätere Ausbau ist Teil des Spiels.

Die konkrete Gebäude-, Fahrzeug- und Infrastrukturplanung darf deshalb nicht aus vorhandenen Game-Assets rückwärts abgeleitet werden. Zuerst ist die reale technische Mindestanforderung zu bestimmen; daraus werden anschließend OTA-Welttechnik und NOXIA-Spielobjekte abgeleitet.

## Forschungsleitfrage

> Welche minimale technische Infrastruktur benötigt eine dauerhaft bewohnte Marsbasis mit 497 Personen, damit sie unter wissenschaftlich plausiblen Annahmen mindestens 30 Tage ohne externen Nachschub und dauerhaft bei regulärer Versorgung betrieben werden kann?

Die Zahl 497 ist die aktuelle Zielpopulation der NOXIA-Basiskolonie und dient als konkrete Rechengröße. Wo belastbare Daten nur pro Person, pro kg Nutzlast oder für andere Besatzungsgrößen vorliegen, sollen diese transparent skaliert und Skalierungseffekte ausdrücklich markiert werden.

## Rolle von SSF

SSF liefert die reale wissenschaftlich-technische Evidenzbasis. Es erfindet keine NOXIA-Gebäude und keine fiktionalen Leistungswerte.

Zu jeder wesentlichen Größe sollen, soweit möglich, dokumentiert werden:

- belastbare Referenzwerte bzw. Wertebereiche,
- Quelle und Quellenart,
- Annahmen,
- Unsicherheit,
- Skalierungslogik,
- technische Abhängigkeiten,
- Stand heutiger Technik vs. plausible Weiterentwicklung,
- Punkte, an denen mehrere technisch plausible Lösungen existieren.

NASA, ESA und peer-reviewte Fachliteratur sind gegenüber populären Sekundärquellen zu bevorzugen. Herstellerdaten dürfen für konkrete technische Systeme ergänzend verwendet werden, müssen aber als solche erkennbar bleiben.

## Zu untersuchende Systembereiche

Mindestens folgende Bereiche sind als zusammenhängendes System zu untersuchen:

1. Habitat und druckbeaufschlagtes Volumen
2. Sauerstofferzeugung und Atmosphärenkontrolle
3. CO2-Entfernung und Spurengasmanagement
4. Wasserbedarf, Wassergewinnung und Wasserrecycling
5. Energieerzeugung, Spitzenlast und Energiespeicherung
6. thermische Kontrolle und Wärmeabfuhr
7. Nahrung, Vorräte und realistisch erforderliche lokale Produktion
8. Abwasser, Feststoffe und Abfallkreisläufe
9. medizinische Grund- und Notfallversorgung
10. Wartung, Werkstatt, Ersatzteile und kritische Verbrauchsmaterialien
11. Lager- und Frachtlogistik
12. Kommunikation und Navigation
13. Oberflächenmobilität: bemannte/unbemannte Rover, Frachtfahrzeuge und Spezialfahrzeuge
14. Verkehrsflächen, Fahrwege und notwendige Erschließung
15. Mediennetze: Strom, Daten, Wasser, Gase und gegebenenfalls Wärme
16. EVA-/Airlock-Infrastruktur und Dekontamination
17. Strahlenschutz
18. Brand-, Druckverlust- und sonstige Notfallinfrastruktur
19. Redundanz, Isolation von Schadenssegmenten und Mindestreserven
20. Bau, Reparatur und schrittweise Erweiterbarkeit der Basis

## Erforderliche Gesamtbilanz

Als erstes Ergebnis wird keine Gebäudeliste, sondern eine nachvollziehbare Systembilanz erwartet. Sie soll mindestens Größenordnungen für folgende Größen liefern:

```text
Population                         497 Personen
Autarkiereserve ohne Nachschub     >= 30 Tage

O2-Bedarf                          kg/Tag
Wasser-Bruttobedarf                kg/Tag
Wasser-Nettoverlust/Nachspeisung   kg/Tag
CO2-Abfuhr                         kg/Tag
Nahrungsbedarf                     kg/Tag
Abfall-/Reststoffströme            kg/Tag
mittlere elektrische Last          kW/MW
Spitzenlast                        kW/MW
notwendige Energiespeicherung      kWh/MWh
thermische Abfuhr                  kW/MW
Druckvolumen                       m3
Habitatfläche                      m2
30-Tage-Verbrauchsreserve          t bzw. m3
kritische Ersatzteilreserve        begründeter Ansatz
Fracht-/Transportbedarf            begründeter Ansatz
```

Wo eine einzelne Zahl wissenschaftlich nicht seriös ist, soll ausdrücklich ein Bereich oder mehrere Szenarien angegeben werden.

## Szenarien

Mindestens drei technische Szenarien gegenüberstellen:

- **A — konservativ:** hoher Importanteil, heutige bzw. nahe heutige Technik, wenig lokale Produktion
- **B — plausible Basiskolonie:** hohe Kreislaufschließung, begrenzte ISRU und lokale Produktion, robuste staatliche Infrastruktur
- **C — weiter entwickelte Kolonie:** stärkere ISRU/Produktion als Vergleich, aber nicht automatisch NOXIA-Startzustand

Für NOXIA ist zunächst Szenario B der wichtigste Kandidat. Die Forschung soll aber zeigen, welche Annahmen dafür erforderlich sind.

## Wichtige Modellierungsregel

**Minimum viable** bedeutet nicht „keine Redundanz“. Bei lebenswichtigen Systemen ist technisch erforderliche Redundanz Bestandteil des Minimums. SSF soll deshalb zwischen folgenden Kategorien unterscheiden:

- funktional zwingend,
- sicherheitsbedingt zwingend,
- für 30-Tage-Resilienz erforderlich,
- sinnvoll, aber verzichtbar,
- erst für späteres Koloniewachstum erforderlich.

Damit kann NOXIA später tatsächlich nur das staatliche Minimum auf die Startkarte setzen.

## Übergabe an OTA

Nach belastbarer SSF-Systembilanz soll ein Folgeauftrag an OTA vorbereitet werden. Vorgesehener erster Welttechnik-Anker:

`Tharsis Hub — Minimum Viable Mars Colony: Systemanforderungen für 497 Bewohner`

Das OTA-Dokument soll die realen SSF-Anker sauber von fiktionalen Festlegungen trennen. Erst danach werden bei Bedarf einzelne OTA-Technikdokumente für konkrete Anlagen und Objektklassen angelegt, beispielsweise Energieversorgung, Habitat, Wassersystem, Atmosphärenkreislauf, Lager, Rover, Frachtfahrzeuge, Airlocks, Mediennetz und Fahrwege.

Nicht vorab dutzende Einzelobjekte erzeugen: zuerst Gesamtbilanz und Systemarchitektur, dann Zerlegung.

## Übergabe an Knowledge Graph

Der KG soll später nur stabile Identitäten und Beziehungen der tatsächlich festgelegten Systeme erhalten, beispielsweise:

```text
FACILITY -> located_at -> Tharsis Hub
FACILITY -> provides -> oxygen/water/power
FACILITY -> depends_on -> FACILITY
VEHICLE_CLASS -> supports -> logistics/EVA/construction
OTA_DOCUMENT -> documents -> FACILITY/TECHNOLOGY
NOXIA_OBJECT -> derived_from -> OTA/SSF reference
```

Keine vollständigen wissenschaftlichen Tabellen oder Lore-Texte in den KG duplizieren.

## Übergabe an NOXIA

NOXIA erhält erst nach der fachlichen und OTA-seitigen Klärung die spielrelevante Projektion. Daraus soll die Startkolonie neu aufgebaut werden. Die vorhandene Karte ist kein Sollzustand.

Insbesondere sollen daraus ableitbar werden:

- welche Startgebäude tatsächlich vorhanden sein müssen,
- Anzahl und Kapazität dieser Gebäude,
- welche Systeme zentral oder dezentral sinnvoll sind,
- welche Redundanzen räumlich getrennt werden müssen,
- welche Fahrzeuge zwingend vorhanden sind,
- welche Fahrwege wirklich benötigt werden,
- welche Leitungs-/Medienverbindungen bestehen müssen,
- welche freien Flächen für Sicherheit und spätere Erweiterung sinnvoll sind.

## Nicht Bestandteil dieses ersten Requests

- endgültiges NOXIA-Balancing
- grafisches Gebäudedesign
- komplette Stadtplanung einer ausgewachsenen Marsstadt
- militärische Infrastruktur
- dekorative Infrastruktur
- kommerzielle/private Ausbauphase
- willkürliche Gebäudeanzahl aus Gameplaygründen

## Akzeptanzkriterien

Der Request ist fachlich abgeschlossen, wenn:

1. eine quellenbasierte Gesamtbilanz für 497 Personen vorliegt,
2. die 30-Tage-Reserve explizit berücksichtigt ist,
3. mindestens die Szenarien A/B/C verglichen sind,
4. lebenswichtige Abhängigkeiten und Redundanzen identifiziert sind,
5. Wertebereiche, Unsicherheiten und Skalierungsannahmen sichtbar bleiben,
6. klar zwischen realem Stand, plausibler Fortschreibung und offener Annahme unterschieden wird,
7. eine minimale funktionale Systemarchitektur abgeleitet ist, ohne bereits NOXIA-Gebäude zu erfinden,
8. daraus ein klarer Folgeauftrag für das erste OTA-Systemdokument formuliert werden kann.

## Priorität

**Hoch.** Diese Recherche ist Voraussetzung für den geplanten Neuaufbau von Tharsis Hub und sollte vor weiteren kosmetischen Reparaturen am bestehenden Straßennetz erfolgen.
