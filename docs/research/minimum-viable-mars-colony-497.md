# Minimum Viable Mars Colony — Evidenzbasis für 497 Personen

**Status:** SSF Research Note v0.2 — externer Evidenzaudit eingearbeitet  
**Datum:** 2026-08-30  
**Population:** 497 Personen  
**Resilienzanforderung:** mindestens 30 Tage ohne externen Nachschub  
**Zweck:** reale wissenschaftlich-technische Grundlage für OTA-Systemarchitektur und erst danach NOXIA-Projektion.  
**Audit:** `docs/research/tharsis-hub-497-external-evidence-audit.md`

## 1. Epistemische Trennung

- **[R] Referenzwert:** direkt aus NASA/ESA bzw. technischer Primär-/Fachquelle.
- **[S] Skalierung:** transparenter Rechenschritt aus einem Referenzwert.
- **[A] Architekturannahme:** Planungsbereich, weil es keine qualifizierte Referenzanlage für eine 497-Personen-Marskolonie gibt.

[A]-Werte sind weder Vorhersagen noch NOXIA-Spielwerte. OTA muss sie durch konkrete System-/Objektdossiers verifizieren oder ersetzen.

## 2. Harte Stoffstrombasis

### 2.1 O₂ und CO₂

[R] Geprüfte NASA-Werte liegen je nach Missions-/Aktivitätsannahme bei ungefähr 0,82–0,84 kg O₂/Person/Tag und 1,00–1,04 kg CO₂/Person/Tag.

[S] Für 497 Personen:
- O₂: **407,5–417,5 kg/Tag**
- CO₂: **497–516,9 kg/Tag**
- konservative SSF-Basis: **~408 kg O₂/Tag**, **~517 kg CO₂/Tag**
- 30-Tage-O₂-Äquivalent bei 0,82 kg/P/d: **12,23 t**

[R/A] ISS-ECLSS bestätigt regenerative Prozessketten und Redundanzlogik, nicht die Skalierung unveränderter ISS-Racks auf 497 Personen. OTA muss Prozessstränge dimensionieren.

### 2.2 Wasser

[R] ISS-artige Minimalströme für Trink-/Speise-/Hygiene-/Spülwasser liegen in der Größenordnung 3,8–4,2 kg/Person/Tag; ISS-ECLSS hat 98 % Gesamtwasserrückgewinnung demonstriert.

[S] Für 497 Personen: **~1,88–2,09 t/Tag** sehr sparsamer raumfahrtartiger Bruttodurchsatz.

[A] Für eine dauerhafte Siedlung bleibt Szenario B als interner Habitat-/ECLSS-Arbeitsbereich **15–25 kg/Person/Tag = 7,5–12,4 t/Tag brutto**. **0,3–0,8 t/Tag** bleibt als vorläufige gesicherte Nachspeisekapazität des stark geschlossenen Habitat-/ECLSS-Kerns brauchbar.

**Auditkorrektur:** Diese 0,3–0,8 t/Tag sind **keine vollständige kolonieweite Wasser-ISRU-Kapazität**.

[R] Ralphs et al. (2015) schätzen inklusive Regolithverarbeitung, Fertigung, Perchloratbehandlung, Pflanzenbau, Habitatwartung und Wasserstoffbedarf 1,2 kg/h/Person Bruttobedarf und bei pauschal 90 % Rückgewinnung 0,12 kg/h/Person ISRU-Nachspeisung.

[S] Für 497 Personen: **1,431 t/Tag**. Dieser Wert ist eine breite kolonieweite Vergleichsgröße, keine ECLSS-Messgröße und keine bottom-up dimensionierte Anlage.

Für OTA sind getrennte Wasserbilanzen zwingend: ECLSS/menschlich; Nahrung/Pflanzen; Industrie/ISRU; Verluste/Wartung; Chargen/Inventar/Expansion.

[A] Bis OTA die Prozessbilanz liefert, ist **1,4 t/Tag nur als Prüfpunkt** für kolonieweite Rohwassergewinnung mitzuführen. Reserve, Spitzen-/Chargenbedarf und N-1-Fähigkeit kommen zusätzlich hinzu.

### 2.3 Nahrung

[R] NASA-Studien nennen für verpackte Raumfahrtnahrung ungefähr 1,14–1,83 kg/Person/Tag.

[S] Für 497 Personen: **0,57–0,91 t/Tag**, für 30 Tage **17,0–27,3 t**.

[A] Die 30-Tage-Notreserve bleibt vollständig lagerfähig und unabhängig von lokaler Pflanzenproduktion.

## 3. Habitatvolumen — korrigierte Begriffe

[R] NASA unterscheidet Pressurized Volume, Habitable Volume und Net Habitable Volume (NHV). NHV ist das tatsächlich funktional für die Crew verbleibende Volumen nach Abzügen u. a. für Stowage, Müll und unbrauchbare Hohlräume.

[R] Eine NASA-Deep-Space-Habitat-Entwurfsarbeit verwendet **25 m³ Mindest-NHV pro Crewmitglied als Designannahme**. [S] Für 497 Personen wären das **12.425 m³ NHV**. Das ist keine Marsstadt-Norm und kein Bruttodruckvolumen.

[R] Die früher verwendeten **80 m³/Person** stammen aus einer NASA-Workshopfrage zur Akzeptabilität eines Langzeit-Deep-Space-Habitats. Sie sind **kein NASA-Mindestwert**. Die frühere Ableitung 39.760 m³ als wissenschaftlich bestimmtes Mindest-NHV wird zurückgezogen.

[R] CHAPEA stellt vier Personen rund 158 m² Gesamtfläche zur Verfügung, ist jedoch ein Analoghabitat und keine Skalierungsnorm.

[A] Die bisherigen SSF-Bereiche dürfen OTA als Startgrößen prüfen, aber nicht als direkte Evidenz behandeln:
- Wohn-/Arbeits-/Medizin-/Gemeinschaftsfläche: **18.000–25.000 m² [A]**
- zusätzliche druckbeaufschlagte Technik/Lager/Schleusen: **5.000–10.000 m² [A]**
- Bruttodruckvolumen: **bottom-up aus Segmenten bestimmen**; bisherige 40.000–60.000 m³ nur historische Planungsbandbreite, nicht kanonisieren.

## 4. Druck-, Brand- und Kontaminationssegmentierung

[R] NASA-Safe-Haven- und Habitatstudien bestätigen mehrere isolierbare Druckvolumina als Schutz gegen Feuer, Rauch/Kontamination und Druckverlust. Konzepte reichen von einem 30-Tage-Safe-Haven bis zu zwei vollwertigen Druckvolumina. Kritische Funktionen können segmentbezogen verteilt bzw. mehrfach vorhanden sein.

[A] Tharsis Hub darf deshalb **keine einzelne durchgehend gekoppelte Druck-/Luftzone** besitzen.

Nicht belegt und daher verworfen: pauschale Grenzen wie 50–150 Personen pro Segment.

OTA muss Segmentgröße aus Hazard-Analyse bestimmen und mindestens Druckisolation, getrennte Luftzirkulation, Feuer-/Rauchkontrolle, Überleben nach Verlust des größten Segments, Safe-Haven-/Medizin-/Fluchtzugang, redundante Medien/ECLSS, Storm Shelter, Wartung und Erweiterung prüfen.

## 5. Elektrische Leistung — Bottom-up statt Personenskalierung

[R] NASA Fission Surface Power (mindestens 40-kWe-Klasse) ist ein Technologieanker, **kein kW/Person-Modell**.

[R] NASA-Beispiele zeigen stark funktionsabhängige Lasten: ein früher 100-m³-Marsoberflächenhabitatbaustein wird mit 30 kWe beschrieben; ein Mars-Transit-Habitat-Sizing-Beispiel mit etwa 26,6 kW; ein Mars Water Extraction Rig im Referenzfall mit rund 55 kWe inklusive Wachstumsmarge. Diese Werte sind nicht linear mit Bevölkerung skalierbar.

**Auditentscheidung:** Eine Hochrechnung auf 8–10 MW aus kleinen Crew-/FSP-Systemen ist methodisch ungeeignet.

[A] Der bisherige SSF-Bereich bleibt ausschließlich als zu prüfender Startbereich:
- mittlere Last: **3–5 MW [A]**
- Spitzenlast: **5–8 MW [A]**
- kritische Last: **1,5–2,5 MW [A]**
- Kurzzeitspeicher: **3–10 MWh [A]**

OTA Phase 2 muss eine Lasttabelle aus konkreten Anlagen erzeugen: Habitatgrundlast, ECLSS, Thermalkontrolle, Wasser-ISRU, Nahrung/Pflanzen, Werkstatt/Fertigung, Medizin/Labor, Außenlogistik/Fahrzeugladung, Netzverluste und Reserve; jeweils normal/peak/degraded/Black Start.

## 6. Thermalkontrolle und Marsstaub

[A] 3–6 MW abzuführende Wärme bleibt lediglich eine Systemgrenzenannahme, solange die elektrische/thermische Bottom-up-Bilanz fehlt.

[R] Eine universelle Radiatorleistung in W/m² ist für Mars nicht belastbar. Relevante Größen sind Radiatortemperatur, Emissivität, solare Absorptivität, Orientierung/ein- oder zweiseitige Fläche, Sichtfaktoren, Solar- und atmosphärische IR-Last, dünne Konvektion und Staubzustand.

[R] NASA-Marsstaubversuche zeigen bei hoch emittierenden Beschichtungen eine Abnahme effektiver Emissivität von nahe 0,9 bis etwa 0,5 mit zunehmender Staubauflage. Andere Tests zeigen je nach Staubmaterial ungefähr 10–40 % Degradation. Wind kann reinigen, bei hohen staubbeladenen Geschwindigkeiten aber auch abrasiv wirken.

[R] NASA führt 2026 Thermal Radiator With Electrodynamic Dust Shield (TREDS) für Mond/Mars mit TRL 4. Aktive Staubminderung ist ein realer Technologiepfad, aber noch keine reife Standardkomponente.

**Auditentscheidung:** Die externe Radiatorfläche **8.000–36.000 m² nicht kanonisieren**. OTA muss Radiatoren nach Wärmeniveau/Prozessstrang auslegen. Staubdegradation, Reinigung, Wartung und N-1-Fähigkeit gehören in das Dossier.

## 7. Wasser-ISRU-Technologie

Die externe Angabe `385 kg/h Regolith → 7,7 kg/h Wasser` konnte in belastbarer Primärform nicht ausreichend bestätigt werden und wird nicht übernommen.

[R] Besser belegte NASA-Referenz: ein Mars Water Extraction Rig verarbeitet im Referenzfall rund 700 t Regolith für 3,4 t Wasser pro Monat; Peak ~35 kWe Heizung plus ~7 kWe Wasserprozess, mit 30 % Wachstumsmarge ~55 kWe. Andere NASA-ISRU-Studien zeigen starke Abhängigkeit von Wassergehalt/Mineralogie und Extraktionstemperatur.

**Folgerung:** keine Anlagenzahl per einfacher Division. OTA muss Standortwassergehalt, Verfahren, Aufbereitung, Produktionsrate, Betriebszeit, Reserve und Ausfall eines Strangs gemeinsam dimensionieren.

## 8. Weitere Mindestfunktionen

### Medizin
[R] Marsmissionen benötigen hohe medizinische Autonomie. [A] Für 497 Menschen mindestens: 24/7 Notfallversorgung, Labor/Bildgebung, chirurgische Stabilisierung, Zahnmedizin, Isolation, Apotheke/Sterilgut, psychologische Versorgung, Rehabilitation und asynchrone Telemedizin.

### Strahlenschutz
[R] Marsoberflächenstrahlung und variable Solarereignisse verlangen dauerhafte Abschirmung und besonders geschützte Bereiche. [A] Mindestens ein stark geschützter Storm Shelter je unabhängigem Habitat-/Safe-Haven-Verbund.

### Netze und Mobilität
[A] Kritische Netze für Strom, Daten, Wasser, O₂/Prozessgase und Abwasser müssen segmentierbar und mehrwegig sein. Ein einzelner zentraler Medienkorridor ist kein resilientes Minimum.

Funktional erforderlich, Stückzahlen erst nach OTA: druckbeaufschlagter Personen-/Rettungstransport; unbemannter Frachttransport; Bau-/Erdbewegung; Wartungs-/Bergefahrzeug; EVA-Unterstützung; Außeninspektion/Robotik.

## 9. Verbindliche Übergabeparameter für OTA Phase 2

**Direkt belastbare Stoffstrombasis:**
- Population: **497**
- Resilienz ohne externen Nachschub: **≥30 Tage**
- O₂: **~408 kg/Tag** als SSF-Referenz, Literaturband ~408–418
- CO₂: **~517 kg/Tag** als konservative SSF-Referenz, Literaturband ~497–517
- Nahrung: **0,57–0,91 t/Tag**, 30 Tage **17–27 t**

**Von OTA zu dimensionieren:**
- Habitat-NHV/Bruttodruckvolumen: bottom-up; 25 m³/P nur Design-Referenz, 80 m³/P kein Mindestwert
- Wasser ECLSS-Nachspeisung: **0,3–0,8 t/Tag [A]**
- kolonieweite Wassergewinnung: **1,4 t/Tag nur Prüfpunkt**, bottom-up ersetzen
- elektrische Last: **3–5 MW Mittel / 5–8 MW Peak nur [A]-Startband**, bottom-up ersetzen
- Wärmeabfuhr/Radiatorfläche: aus Lasten, Temperaturniveaus und Mars-Randbedingungen berechnen
- Druck-/Brandsegmente: mehrere isolierbare Volumina zwingend; Größe aus Hazard-Analyse
- Redundanz: keine Single Points of Failure bei O₂, CO₂-Abfuhr, Wasser, kritischer Kühlung, Strom-/Datenversorgung und Safe-Haven-Funktion

## 10. Tragende Quellen

1. NASA OCHMO CO₂: https://www.nasa.gov/ochmo-tb-004-carbon-dioxide-2/
2. NASA ISS 98 % water recovery: https://www.nasa.gov/missions/station/iss-research/nasa-achieves-water-recovery-milestone-on-international-space-station/
3. NASA Advanced Life Support: https://ntrs.nasa.gov/api/citations/20100036823/downloads/20100036823.pdf
4. NASA Fission Surface Power: https://www.nasa.gov/exploration-systems-development-mission-directorate/fission-surface-power/
5. NASA functional-volume definitions: https://www.nasa.gov/wp-content/uploads/2015/03/human_integration_design_processes.pdf
6. NASA Human-System Standard definitions: https://www.nasa.gov/reference/appendix-c-vol-2/
7. NASA Deep Space Habitat design example: https://ntrs.nasa.gov/citations/20205007970
8. NASA Habitable Volume Workshop: https://ntrs.nasa.gov/citations/20110016362
9. NASA Safe Haven Configurations: https://ntrs.nasa.gov/citations/20170012311
10. NASA Mars thermal architecture: https://ntrs.nasa.gov/citations/19970001606
11. NASA Martian dust/radiators: https://ntrs.nasa.gov/citations/20040161153
12. NASA aeolian radiator dust study: https://ntrs.nasa.gov/citations/19900016752
13. NASA Dust Mitigation / TREDS: https://www.nasa.gov/dust-mitigation/
14. NASA Mars Water Extraction Rig: https://ntrs.nasa.gov/citations/20230018562
15. Ralphs et al. 2015, *Water extraction on Mars for an expanding human colony*, Life Sciences in Space Research 7, DOI 10.1016/j.lssr.2015.10.001.
