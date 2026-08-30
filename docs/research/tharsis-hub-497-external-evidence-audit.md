# Tharsis Hub / 497 Personen — externer Evidenzaudit

**Status:** SSF Research Audit v1.0  
**Datum:** 2026-08-30  
**Bezug:** `docs/research/minimum-viable-mars-colony-497.md`  
**Auftrag:** `NOX-SSF-REQ-20260830-EXTERNAL-MARS-EVIDENCE-AUDIT`

## 1. Ergebnis in Kurzform

Der Audit bestätigt die Stoffstrombasis für O₂/CO₂, verwirft aber eine lineare Hochskalierung kleiner NASA-Fission-Surface-Power-Systeme auf 497 Personen. Die bisherige SSF-Leistungsspanne von 3–5 MW bleibt deshalb eine Architekturannahme und darf nicht als NASA-abgeleiteter Koloniewert dargestellt werden. Für die nächste OTA-Phase muss die elektrische Last aus konkreten Anlagen und Betriebszuständen bottom-up summiert werden.

Die bisherige Radiatorfläche kann nicht aus einem einzigen W/m²-Wert abgeleitet werden. Mars-Radiatorleistung hängt stark von Betriebstemperatur, Emissivität/Absorptivität, Orientierung, Sichtfaktoren, Sonnen- und IR-Einstrahlung, dünner CO₂-Atmosphäre und Staub ab. Marsstaub ist quantitativ relevant: NASA-Tests zeigen je nach Beschichtung und Staubzustand erhebliche Emissionsänderungen; aktive Staubminderung ist technologisch plausibel, aber nicht als ausgereifte Standardlösung anzusetzen.

Die Habitatangaben müssen begrifflich korrigiert werden. 25 m³ pro Person ist eine in NASA-Entwurfsarbeiten verwendete Mindest-NHV-Annahme, während 80 m³ pro Person Gegenstand einer Langzeit-Habitat-Workshopfrage war und kein allgemeiner NASA-Mindestwert ist. NHV, Habitable Volume und Pressurized Volume dürfen nicht vermischt werden. Für 497 Personen folgt daraus kein einzelner kanonischer Volumenwert.

Die Wasser-ISRU-Diskrepanz ist eine Systemgrenzenfrage: 0,3–0,8 t/d in der SSF-Note beschreibt primär Nachspeisung eines stark geschlossenen Siedlungskreislaufs; 0,12 kg/h/Person aus Ralphs et al. enthält zusätzlich pauschal Regolithverarbeitung, Fertigung, Perchloratbehandlung, Pflanzenbau, Habitatwartung und Wasser für Wasserstoff. Auf 497 Personen sind das 1,431 t/d. Dieser Wert ist als kolonieweite Planungsgröße brauchbar, aber nicht als ECLSS-Nachspeisewert.

## 2. Energie

### Befund

**Klassifikation:** bestätigt als Technologieanker; lineare Personenskalierung methodisch ungeeignet.

[R] NASA Fission Surface Power entwickelt eine mindestens 40-kWe-Klasse für langjährigen kontinuierlichen Oberflächenbetrieb. Das ist ein Demonstrator-/Technologieanker, keine normierte Leistung pro Crewmitglied und keine 497-Personen-Kolonieanlage.

[R] Ein NASA-Mars-Architekturbeispiel nennt für einen frühen 100-m³-Oberflächenhabitatbaustein 30 kWe. Ein NASA-Mars-Transit-Habitat-Sizing-Beispiel liegt bei rund 26,6 kW elektrischer Erzeugungsleistung. Diese Beispiele zeigen zugleich, dass Missionsfunktion, Habitatgröße und Architektur die Last bestimmen; sie rechtfertigen keine lineare Personenhochrechnung.

[R] NASA-ISRU-Studien zeigen außerdem stark prozessabhängige Lasten. Ein Mars Water Extraction Rig mit thermischer Regolithbehandlung wird mit rund 55 kWe inklusive 30 % Wachstumsmarge beschrieben und produziert etwa 3,4 t Wasser pro Monat aus 700 t Regolith. Solche Anlagenlasten sind von Geologie, Produktionsrate und Verfahren abhängig.

[A] Der bisherige SSF-Bereich 3–5 MW Mittel-/5–8 MW Spitzenlast wird durch diesen Audit weder bestätigt noch widerlegt. Er bleibt ein vorläufiges Architekturband.

### Vorgabe für OTA Phase 2

Die Lastbilanz muss mindestens getrennt ausweisen:

1. Habitat-Grundlast: Beleuchtung, IT, Kommunikation, Haushalts-/Gemeinschaftslasten.
2. ECLSS: Atmosphärenzirkulation, CO₂-Abtrennung, O₂-Erzeugung, Wasseraufbereitung, Abfallbehandlung.
3. Thermalkontrolle: Pumpen, Ventilatoren/Gebläse, Wärmepumpen/Chiller soweit erforderlich.
4. Wasser-ISRU: Gewinnung, Aufbereitung, Pumpen, Speicher.
5. Nahrung/Pflanzen: Beleuchtung nur dort, wo künstliche Beleuchtung tatsächlich gewählt wird; Pumpen/Klima getrennt.
6. Werkstatt/Fertigung und Bau-/Regolithverarbeitung.
7. Medizin/Labor.
8. Außenlogistik und Fahrzeugladung.
9. Netzverluste und Reserve.
10. Betriebszustände: normal, Spitzenbetrieb, degradierter Betrieb, isolierter Sektor, Black Start.

**Entscheidung:** Keine MW-Zahl aus `kW × Personen` ableiten. OTA darf 3–5 MW nur als zu prüfenden SSF-Startbereich verwenden.

## 3. Thermalkontrolle und Radiatoren

### Befund

**Klassifikation:** Größenordnung brauchbar; Einzelwert ohne Randbedingungen nicht ausreichend.

[R] NASA-Mars-Thermalstudien modellieren Radiatoren nicht mit einer universellen spezifischen Leistung. Eine NASA-Studie verwendet beispielsweise für einen Mars-Radiator ε = 0,8, α = 0,2 und etwa 275 K mittlere Radiatortemperatur und betrachtet einseitig horizontale sowie zweiseitig vertikale Geometrien. Marsboden und Atmosphäre liefern zusätzliche IR-Randbedingungen; Konvektion ist trotz geringer Dichte nicht grundsätzlich null.

[R] Ein NASA-Mars-Transit-Habitat-Beispiel koppelt 26,64 kW elektrische Erzeugung an rund 100 m² Radiatorfläche. Das ist ein konkretes Fahrzeugdesign und kein auf eine Kolonie übertragbarer W/m²-Nennwert.

[R] Die Radiatorbilanz muss mindestens ε, α, T_Radiator, effektive Himmels-/Boden-/Atmosphärentemperatur, Sonnenlast, Sichtfaktoren, Orientierung, ein-/zweiseitige Nutzung und konvektiven Anteil enthalten.

### Marsstaub

**Klassifikation:** bestätigt, aber nur unter klaren Randbedingungen.

[R] NASA-Versuche mit Marsstaubsimulant zeigten bei hoch emittierenden Beschichtungen eine Abnahme der effektiven Emissivität von nahe 0,9 bis etwa 0,5 mit zunehmender Staubauflage. Andere NASA-Windtunnelversuche fanden je nach Staubmaterial etwa 10–20 % Degradation bei basaltischem Staub und 20–40 % bei Fe₂O₃; Wind kann Staub teilweise entfernen, hohe staubbeladene Windgeschwindigkeiten können aber abrasiv wirken.

[R] NASA führt 2026 Thermal Radiator With Electrodynamic Dust Shield (TREDS) als Technologie für Mond/Mars mit TRL 4. Das ist ein plausibler Mitigationspfad, aber keine reife, ausfallsichere Koloniekomponente.

### Vorgabe für OTA Phase 2

- Keine kanonische Gesamtfläche 8.000–36.000 m² übernehmen.
- Radiatorfläche je Wärmeniveau/Prozessstrang aus Wärmeleistung und zulässiger Betriebstemperatur bestimmen.
- Niedertemperatur-Habitatwärme und höher temperierte Prozessabwärme getrennt behandeln.
- Staubreserve/Degradation explizit in der Auslegung berücksichtigen.
- Reinigungs-/Mitigationskonzept als wartungsbedürftiges Subsystem modellieren; passive Windreinigung nicht als garantierte Funktion ansetzen.
- Kritische Kühlung redundant und segmentiert auslegen.

## 4. Habitatvolumen und Segmentierung

### Begriffe

**Klassifikation:** bestehende SSF-Formulierung muss präzisiert werden.

[R] NASA definiert **Pressurized Volume** als Gesamtvolumen innerhalb der Druckhülle. **Habitable Volume** ist das nach fest installierter Hardware/Systemen verbleibende Volumen. **Net Habitable Volume (NHV)** ist das tatsächlich funktional für die Crew verbleibende Volumen nach weiteren Abzügen wie verstauter Ausrüstung, Müll und unbrauchbaren Hohlräumen.

[R] Eine NASA-Deep-Space-Habitat-Entwurfsarbeit verwendet 25 m³ Mindest-NHV pro Crewmitglied als Designannahme. Für 497 Personen ergäbe reine Skalierung 12.425 m³ NHV. Das ist keine direkte Aussage über eine Marsstadt und keine Aussage über Bruttodruckvolumen.

[R] Der NASA-Habitable-Volume-Workshop untersuchte die Frage, ob 80 m³ pro Person für ein Langzeit-Deep-Space-Habitat akzeptabel seien. Die 80 m³ sind daher nicht als NASA-Mindestanforderung zu zitieren.

[S] 25 m³/Person und 80 m³/Person beschreiben unterschiedliche Entwurfs-/Forschungsbezüge; die bisherige SSF-Angabe von 40.000–60.000 m³ darf nicht als aus 80 m³ NHV/Person wissenschaftlich abgeleitete Mindestgröße bezeichnet werden.

### Segmentierung

**Klassifikation:** Notwendigkeit bestätigt; konkrete Personen-/m³-Grenze weiterer Forschungsbedarf/Architekturentscheidung.

[R] NASA-Safe-Haven-Studien für Langzeitmissionen behandeln Feuer, Rauch und Druckverlust ausdrücklich durch mehrere isolierbare Druckvolumina. Konzepte reichen von einem 30-Tage-Safe-Haven bis zu zwei vollwertigen Druckvolumina. NASA-Habitatstudien nennen Atmosphärenzirkulation, Thermalkontrolle, Stromverteilung und Feuerdetektion/-unterdrückung als Funktionen, die bei modularen Druckvolumina verteilt bzw. mehrfach vorhanden sein können.

[R] Historische NASA-Architekturstudien zeigen ebenfalls zwei druckisolierbare Volumina mit getrennten ECLSS-/Thermal-/Informationssystemen, sodass Kontamination eines Volumens nicht über die Luftführung auf das andere übertragen wird.

[R] NASA-Feuersicherheitsunterlagen verlangen die Betrachtung von Detektion, Unterdrückung, Isolation und Nachreinigung; Brandverhalten hängt außerdem von Druck, O₂-Anteil und Partialgravitation ab.

[A] Für Tharsis Hub ist daher eine einzelne durchgehend gekoppelte Druck-/Luftzone nicht akzeptabel. Eine wissenschaftlich belastbare maximale Zahl `Personen pro Segment` lässt sich aus den geprüften Quellen jedoch nicht ableiten.

### Vorgabe für OTA Phase 2

Segmentgröße muss aus Hazard-Analyse statt aus einer pauschalen Personenzahl entstehen. Für jedes Segment sind mindestens zu prüfen:

- vollständige druckseitige Isolation,
- getrennte/absperrbare Luftzirkulation,
- Feuerdetektion/-unterdrückung und Rauch-/Kontaminationskontrolle,
- Überlebensfähigkeit der Bewohner nach Verlust des größten Segments,
- Zugang zu Safe Haven/Medizin/Fluchtwegen,
- Redundanz von Strom, Daten, Wasser und kritischem ECLSS,
- Strahlenschutz/Storm Shelter,
- Wartung und Erweiterbarkeit.

## 5. O₂ und CO₂

**Klassifikation:** bestätigt; Größenordnung direkt übernehmbar.

[R] Die geprüften NASA-Werte liegen je nach Missions-/Aktivitätsannahme ungefähr bei 0,82–0,84 kg O₂/Person/Tag und 1,00–1,04 kg CO₂/Person/Tag.

[S] Für 497 Personen entspricht dies ungefähr:

- O₂: **407,5–417,5 kg/Tag**
- CO₂: **497–516,9 kg/Tag**

Die bestehende SSF-Basis von rund 408 kg O₂/Tag und 517 kg CO₂/Tag ist damit als konservativ konsistente Referenz beizubehalten. Es gibt keinen fachlichen Grund, die Bandbreite künstlich auf einen einzigen universellen Stoffwechselwert zu reduzieren.

[R/A] ISS-Regenerativ-ECLSS belegt die technische Prozesskette und Redundanzlogik, nicht die direkte Skalierbarkeit unveränderter ISS-Racks auf 497 Personen. OTA soll Prozessstränge mit Wartungs-/Redundanzgrenzen entwerfen, nicht `497/ISS-Crew` Einheiten zählen.

## 6. Wasser und ISRU

### Systemgrenzen

**Klassifikation:** externe 0,12-kg/h/Person-Zahl als kolonieweite Größenordnung brauchbar, aber nicht direkt mit SSF-ECLSS-Nachspeisung vergleichbar.

[R] Ralphs et al. (Life Sciences in Space Research 7, 2015) setzen zunächst rund 0,6 kg/h/Person für menschliches Leben an, erhöhen auf 0,7 kg/h/Person für Schwerkraftbetrieb und schätzen inklusive Regolithverarbeitung, Fertigung, Perchloratbehandlung, Pflanzenbau und Habitatwartung 1,2 kg/h/Person. Bei pauschal 90 % Rückgewinnung werden 0,12 kg/h/Person ISRU-Bedarf angesetzt. Die Autoren schließen Wasser für Wasserstoffgewinnung ein.

[S] Für 497 Personen: **59,64 kg/h = 1,431 t/Tag**.

Dieser Wert ist kein gemessener Bedarf einer realen Marskolonie und seine einzelnen Industriekategorien sind nicht bottom-up hergeleitet. Er ist deshalb kein Ersatz für eine Prozessbilanz.

Die Wasserbilanz für OTA muss mindestens fünf Grenzen getrennt führen:

1. **ECLSS/menschlich:** Trinkwasser, Speisenzubereitung, Hygiene, Sanitär; Rückgewinnung aus Kondensat/Urin/Grauwasser.
2. **Nahrung/Pflanzen:** Transpiration und Rückgewinnung getrennt von dauerhaft gebundenem/verlorenem Wasser.
3. **Industrie/ISRU:** Regolithwäsche/-behandlung, Perchloratbehandlung, Fertigung, chemische Prozesse; Kreisläufe nach Wasserqualität trennen.
4. **Verluste/Wartung:** Leckage, Filter-/Harzwechsel, EVA, Reinigungs- und Wartungsverluste.
5. **Chargen/Inventar:** Befüllung neuer Habitate/Leitungen, Bauprozesse, Produkte, Notvorräte. Diese sind nicht als täglicher Dauerverbrauch zu behandeln.

[A] Der bisherige SSF-Wert **0,3–0,8 t/Tag** bleibt als vorläufige gesicherte Nachspeisekapazität für den stark geschlossenen Habitat-/ECLSS-Kern brauchbar. Er darf nicht mehr als vollständige kolonieweite Wasser-ISRU-Kapazität bezeichnet werden.

[A] Für die OTA-Gesamtarchitektur ist bis zur Bottom-up-Prozessbilanz **1,4 t/Tag als Vergleichs-/Prüfpunkt**, nicht als Sollwert, mitzuführen. Die tatsächlich installierte Rohwassergewinnung muss zusätzlich Spitzen-/Chargenbedarf, Reserve und Ausfall eines Gewinnungsstrangs berücksichtigen.

### Regolith-Wassergewinnung

**Klassifikation:** konkrete `385 kg/h Regolith → 7,7 kg/h Wasser`-Angabe nicht ausreichend verifiziert; nicht übernehmen.

[R] Besser belegte NASA-Referenzen zeigen die starke Standort-/Verfahrensabhängigkeit. Ein aktuelles NASA Mars Water Extraction Rig verarbeitet im Referenzfall insgesamt rund 700 t Regolith für 3,4 t Wasser pro Monat; Peak-Leistung etwa 35 kWe Heizung + 7 kWe Wasserprozess, mit 30 % Wachstumsmarge rund 55 kWe. Eine andere NASA-Mars-ISRU-Studie zeigt für unterschiedliche Regolith-/Mineralannahmen stark verschiedene Massenströme und Heizleistungen.

**Entscheidung:** Keine Anlagenzahl aus einer einfachen Division der Koloniewassermenge durch einen einzelnen Labor-/Konzeptwert ableiten. Standortwassergehalt, Abbauverfahren, Temperatur, Aufbereitung, Verfügbarkeit und Redundanz müssen im OTA-Dossier gemeinsam gewählt werden.

## 7. Auditklassifikation

| Befund | Auditurteil |
|---|---|
| NASA FSP/Kilopower als Technologieanker | bestätigt / direkt übernehmbar |
| 8–10 MW aus linearer Crewskalierung | methodisch ungeeignet |
| SSF 3–5 MW mittlere Last | Architekturannahme; Bottom-up zu prüfen |
| Radiator 166 oder 370 W/m² als universeller Wert | Quelle/Randbedingung nicht ausreichend |
| Radiatorfläche 8.000–36.000 m² | als grobe Größenordnung erklärbar, nicht kanonisieren |
| Marsstaub beeinflusst Radiatorleistung | bestätigt, randbedingungsabhängig |
| aktive elektrodynamische Staubminderung | realer Technologiepfad, derzeit nicht als reife Standardlösung ansetzen |
| 25 m³/Person NHV | als NASA-Entwurfsannahme bestätigt; kein universelles Siedlungsminimum |
| 80 m³/Person | Forschungs-/Workshopreferenz, kein NASA-Mindestwert |
| mehrere isolierbare Druck-/Brandzonen | technisch/sicherheitsseitig bestätigt |
| feste 50–150 Personen pro Segment | nicht belegt; nicht übernehmen |
| O₂/CO₂-Größenordnung | bestätigt |
| 0,3–0,8 t/d Wasser | für Habitat-/ECLSS-Nachspeisung als [A] brauchbar |
| 1,43 t/d Wasser | kolonieweiter Vergleichswert aus breiterer Systemgrenze, nicht ECLSS-Wert |
| 385 kg/h → 7,7 kg/h Regolithanlage | nicht ausreichend verifiziert; nicht übernehmen |

## 8. Quellen

- NASA, Fission Surface Power: https://www.nasa.gov/exploration-systems-development-mission-directorate/fission-surface-power/
- NASA NTRS, Sustaining Human Presence on Mars Using ISRU and a Reusable Lander: https://ntrs.nasa.gov/citations/20160006324
- NASA NTRS, Mars Transit Habitat sizing example: https://ntrs.nasa.gov/citations/20205008227
- NASA NTRS, Kiloton Class ISRU Systems / Mars Water Extraction Rig: https://ntrs.nasa.gov/citations/20230018562
- NASA NTRS, Mars thermal environment / radiator architecture: https://ntrs.nasa.gov/citations/19970001606
- NASA NTRS, The Effect of Martian Dust on Radiator Performance: https://ntrs.nasa.gov/citations/20040161153
- NASA NTRS, Aeolian removal of dust from radiator surfaces on Mars: https://ntrs.nasa.gov/citations/19900016752
- NASA, Dust Mitigation / TREDS: https://www.nasa.gov/dust-mitigation/
- NASA, Space Flight Human-System Standard Vol. 2, definitions: https://www.nasa.gov/reference/appendix-c-vol-2/
- NASA TP-2014-218556, functional volume definitions: https://www.nasa.gov/wp-content/uploads/2015/03/human_integration_design_processes.pdf
- NASA NTRS, Deep Space Habitat conceptual design (25 m³/crew design assumption): https://ntrs.nasa.gov/citations/20205007970
- NASA NTRS, Spacecraft Habitable Volume Workshop: https://ntrs.nasa.gov/citations/20110016362
- NASA NTRS, Safe Haven Configurations for Deep Space Transit Habitats: https://ntrs.nasa.gov/citations/20170012311
- NASA Technology Roadmaps TA 6, Fire Detection/Suppression/Recovery: https://www.nasa.gov/wp-content/uploads/2016/08/2015_nasa_technology_roadmaps_ta_6_human_health_life_support_habitation_final.pdf
- Ralphs, Franz, Baker, Howe (2015), Water extraction on Mars for an expanding human colony, Life Sciences in Space Research 7, 57–60, DOI 10.1016/j.lssr.2015.10.001.
