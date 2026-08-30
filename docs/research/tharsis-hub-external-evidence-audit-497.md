# Tharsis Hub — Evidenzaudit für die 497-Personen-Basiskolonie

**Status:** SSF Research Audit v1.0  
**Datum:** 2026-08-30  
**Bezug:** `docs/research/minimum-viable-mars-colony-497.md`  
**Auftrag:** `NOX-SSF-REQ-20260830-EXTERNAL-MARS-EVIDENCE-AUDIT`  
**Zweck:** belastbare Evidenzgrenzen für OTA Phase 2; keine NOXIA-Spielwerte.

## 1. Ergebnis in Kurzform

Der Audit bestätigt die Grundarchitektur der bestehenden SSF-Note, korrigiert aber mehrere Bedeutungsgrenzen.

1. **Energie:** Die bisherige Spanne von 3–5 MW mittlerer elektrischer Last bleibt eine Architekturannahme [A]. Sie wird weder durch lineare Personenskalierung bestätigt noch verworfen. Für OTA Phase 2 ist eine Bottom-up-Bilanz aus Subsystemlasten erforderlich. Die NASA-Fission-Surface-Power-Klasse von mindestens 40 kWe ist ein Technologieanker, kein Skalierungsmodell für eine 497-Personen-Kolonie.
2. **Thermalkontrolle:** 3–6 MW thermische Abfuhr bleiben eine plausible Systemgrenze [A], solange die elektrische Last und externe Prozessabfuhr nicht bottom-up bilanziert sind. Eine einzelne Radiatorfläche darf nicht kanonisiert werden. Marsstaub ist ein realer Degradationsmechanismus und muss als Wartungs-, Reserve- und Reinigungsanforderung behandelt werden.
3. **Habitat:** Net Habitable Volume, funktionales Nutzvolumen, technisches Druckvolumen und gesamtes Bruttodruckvolumen sind getrennte Größen. Die bisherige Spanne von 40.000–60.000 m³ darf nur als gesamtes druckbeaufschlagtes Systemvolumen verstanden werden, nicht als NHV.
4. **O₂/CO₂:** Die vorhandenen SSF-Werte und die extern genannten BVAD-artigen Werte liegen in derselben Größenordnung. Es gibt keinen Grund, sie künstlich auf einen einzigen Normwert zu vereinheitlichen.
5. **Wasser:** 0,3–0,8 t/Tag ist kein Gesamtwasserbedarf der Kolonie. Die Spanne darf nur als gesicherte Nachspeisefähigkeit des stark geschlossenen Habitat-/ECLSS-Kreislaufs verstanden werden. Landwirtschaft, industrielle ISRU-Prozesse, Wartung und chargenweise Bedarfe müssen getrennt bilanziert werden.

Damit ist die Evidenzlage ausreichend, um OTA Phase 2 zu dimensionieren, sofern alle noch nicht belastbaren Zahlen dort als [A]/offen behandelt werden.

---

## 2. Energieaudit

### 2.1 Fission Surface Power

**Klassifikation:** bestätigt / direkt übernehmbar als Technologieanker.

NASA beschreibt Fission Surface Power als kontinuierliche, wetter- und sonnenlichtunabhängige Energiequelle für Mond und Mars. Die aktuelle Demonstratorklasse liegt bei mindestens 40 kWe und ist für jahrelangen Betrieb gedacht.

**Nicht zulässig:** daraus eine Pro-Kopf-Skalierung auf 497 Bewohner abzuleiten.

Die externe Rechnung, die aus kleinen Missionsarchitekturen linear etwa 8–10 MW für 497 Personen ableitet, wird daher als **methodisch ungeeignet** verworfen.

### 2.2 Arbeitsbereich 3–5 MW

**Klassifikation:** als Größenordnung brauchbar, aber nur als [A].

Die bestehende SSF-Spanne 3–5 MW mittlere Last und 5–8 MW Spitzenlast bleibt für die nächste Architekturphase bestehen, bis eine Bottom-up-Bilanz vorliegt. Sie darf nicht als NASA-Referenzwert dargestellt werden.

OTA Phase 2 soll mindestens getrennt bilanzieren:

- ECLSS Luft- und Wasserkreisläufe,
- O₂-Erzeugung und Gasverdichtung,
- Wassergewinnung/ISRU,
- thermische Pumpen, Verdichter und Kühlkreise,
- Habitat-Grundlast, Beleuchtung und IT,
- Kommunikation und Navigation,
- medizinische Infrastruktur,
- Kühl-/Trockenlager,
- lokale Pflanzenproduktion,
- Werkstatt und Fertigung,
- Fahrzeug- und Robotikladung,
- Außenanlagen, Pumpen und Leitungsheizung,
- Reserve-, Umwandlungs- und Verteilverluste.

### 2.3 Redundanz

**Klassifikation:** bestätigt, aber Architekturentscheidung bleibt OTA.

Für die Basiskolonie ist eine einzelne zentrale Erzeugungseinheit nicht akzeptabel. OTA soll mehrere räumlich und elektrisch trennbare Erzeugungsstränge, Black-Start-Fähigkeit und kritische Inselnetze vorsehen. Die konkrete Modulzahl folgt erst aus der gewählten fiktiven Reaktorklasse und der Bottom-up-Lastbilanz.

---

## 3. Thermalkontrolle und Radiatoren

### 3.1 Mars-Randbedingungen

**Klassifikation:** bestätigt, aber nur unter klaren Randbedingungen.

Auf Mars ist Wärmeabfuhr nicht identisch mit Vakuumbetrieb. Die dünne CO₂-Atmosphäre liefert begrenzte, aber nicht vollständig vernachlässigbare Konvektion; außerdem wirken Bodentemperatur, atmosphärische IR-Strahlung, Solarstrahlung und Staub auf Radiatoren.

Eine fixe Ableitung wie „166 W/m²“ oder „370 W/m²“ wird nicht als allgemeiner Koloniewert übernommen. Die zulässige Wärmestromdichte hängt mindestens ab von:

- Radiatortemperatur,
- Emissivität und Solarabsorptivität,
- ein- oder zweiseitiger Abstrahlung,
- Orientierung,
- lokaler Sicht auf Himmel/Boden,
- Tageszeit/Jahreszeit,
- Staubbeladung,
- zulässiger Rücklauftemperatur des jeweiligen Wärmekreises.

### 3.2 Marsstaub

**Klassifikation:** bestätigt / direkt als Designanforderung übernehmbar; quantitative Einheitszahl nicht zulässig.

NASA-Versuche zeigen, dass Marsstaub die effektive Emissivität von Radiatoroberflächen deutlich verändern kann. Bei untersuchten Hoch-Emissions-Beschichtungen sank die effektive Emissivität mit zunehmender Staubbeladung von etwa 0,9 in Richtung 0,5. Andere Mars-Windkanalversuche fanden materialabhängig ungefähr 10–40 % Degradation. Die Ergebnisse sind stark material-, Staub- und Randbedingungsabhängig.

Daraus folgen für OTA Phase 2:

- keine Radiatoranlage ohne Degradationsreserve,
- segmentierte Radiatorfelder statt eines einzigen Feldes,
- zugängliche Reinigungs-/Wartungsstrategie,
- Staubmonitoring über thermische Leistungskennwerte,
- Fähigkeit, einzelne Felder für Wartung zu isolieren,
- keine Annahme, dass Marswind zuverlässig selbst reinigt,
- aktive Staubminderung kann technologisch vorgesehen werden, ist aber nicht als perfekt wirksam zu behandeln.

NASA führt inzwischen Electrodynamic Dust Shield für Thermalradiatoren als Technologie für Mond/Mars. Das bestätigt die technische Plausibilität aktiver Staubminderung, nicht deren vollständige Reife für eine Kolonie.

### 3.3 Radiatorfläche

**Klassifikation:** weiterer Architekturbedarf.

Die externe Spanne 8.000–36.000 m² ist als Sensitivitätsbereich nachvollziehbar, aber nicht kanonisch. OTA soll zunächst Radiatorleistung als thermische Kapazität und Reservefaktor spezifizieren und die konkrete Fläche erst nach Wahl plausibler Betriebstemperaturen ableiten.

---

## 4. Habitatvolumen und Segmentierung

### 4.1 Begriffsabgrenzung

**Klassifikation:** bestehende SSF-Note muss präziser gelesen werden, nicht vollständig verworfen.

Für Tharsis Hub werden vier Ebenen getrennt:

1. **NHV / Net Habitable Volume:** tatsächlich für Menschen nutzbarer Aufenthaltsraum.
2. **Funktionales Nutzvolumen:** NHV plus medizinische, operative, landwirtschaftliche und logistische Innenfunktionen.
3. **Technisches Druckvolumen:** ECLSS, Technikräume, Schleusen, Drucklager, Versorgungsknoten.
4. **Gesamtes Bruttodruckvolumen:** alle druckbeaufschlagten Volumina einschließlich Verbindungen und struktureller Verluste.

Die bestehende Spanne **40.000–60.000 m³** wird deshalb als [A] für das **gesamte druckbeaufschlagte Systemvolumen** verstanden. Sie ist nicht als 80 m³ NHV pro Bewohner zu kanonisieren.

### 4.2 Druck-/Brandsegmente

**Klassifikation:** Sicherheitsprinzip bestätigt; konkrete Personenzahl pro Segment offen.

NASA-STD-3001 verlangt systematische Beherrschung von Habitat-, Umwelt- und Crewrisiken auch für planetare Habitate. Daraus lässt sich kein belastbarer pauschaler Grenzwert wie „50–150 Personen pro Segment“ ableiten.

OTA Phase 2 soll die maximale Segmentgröße funktional bestimmen aus:

- Beherrschbarkeit eines Druckverlusts,
- Brandisolation,
- Evakuierungs- und Schleusenwegen,
- erreichbarem Storm Shelter,
- ECLSS-Inselbetrieb,
- unabhängiger Energie-/Datenversorgung,
- zulässiger Notbelegung benachbarter Segmente,
- Wartungsfähigkeit bei stillgelegtem Segment.

**Leitregel:** Kein einzelnes Drucksegment darf für das Überleben der gesamten Kolonie unverzichtbar sein.

---

## 5. O₂- und CO₂-Bilanz

**Klassifikation:** bestehende Größenordnung bestätigt.

Die SSF-Basis mit ungefähr 0,82 kg O₂/Person/Tag und 1,04 kg CO₂/Person/Tag sowie alternative Referenzwerte um 0,84 kg O₂ und 1,00 kg CO₂ liegen nahe genug beieinander, dass unterschiedliche Aktivitäts- und Missionsannahmen die Differenz erklären können.

Für 497 Personen bleibt deshalb als belastbare Größenordnung:

- O₂ etwa **0,41 t/Tag**,
- CO₂-Verarbeitung etwa **0,50–0,52 t/Tag**.

OTA Phase 2 soll keine Dutzende unveränderter ISS-Einheiten hochskalieren. Für eine Kolonie sind parallelisierbare industrielle Prozessstränge plausibler, wobei reale ISS-Technik nur als Funktionsanker dient.

---

## 6. Wasser-ISRU-Audit

### 6.1 Auflösung der scheinbaren Diskrepanz

**Klassifikation:** beide Zahlen können unter unterschiedlichen Systemgrenzen sinnvoll sein.

Die bisherige SSF-Spanne von **0,3–0,8 t/Tag** wird präzisiert zu:

> gesicherte kontinuierliche Nachspeisefähigkeit für den stark geschlossenen Habitat-/ECLSS-Wasserkreislauf einschließlich realistischer Leckage-, Wartungs- und Kreislaufverluste.

Sie ist ausdrücklich **nicht** das gesamte lokal zu gewinnende Wasser für die Kolonie.

Eine externe Größenordnung um 1,43 t/Tag kann zusätzliche Verbraucher enthalten und widerspricht dieser engeren Grenze daher nicht automatisch.

### 6.2 Für OTA getrennte Wasserbilanzen

OTA Phase 2 muss mindestens fünf Wasserbudgets führen:

1. **ECLSS/Habitat:** Trinkwasser, Hygiene, medizinische Nutzung, Kreislaufverluste.
2. **Pflanzen/Nahrung:** Bewässerung, Nährlösung, Aufbereitung, unvermeidbare Verluste.
3. **Industrie/ISRU:** Regolithbehandlung, Perchlorat-/Rohwasserbehandlung, Fertigung und Prozessmedien.
4. **Wartung/Leckage:** Spülungen, Reparaturen, Dekontamination, Leitungs-/Tankverluste.
5. **Chargen-/Aufbaubedarf:** Erstbefüllung, Bauprozesse, größere Wartungsereignisse und Erweiterungen.

Für das Startlayout darf die Förderanlage daher nicht nur gegen 0,3–0,8 t/Tag ausgelegt werden. Diese Spanne bildet lediglich die **lebenserhaltende Mindest-Nachspeisung**. Die nominelle Rohwasser-/ISRU-Kapazität muss zusätzlich Prozess- und Reservebedarf tragen.

### 6.3 Mikrowellen-Regolithverarbeitung

**Klassifikation:** Quelle/Randbedingungen für direkte Anlagenzahl nicht ausreichend.

Die genannte Beispielrate 385 kg/h Regolith bei 7,7 kg/h Wasser ist nicht als universeller Tharsis-Wert geeignet. Eisgehalt, Mineralogie, Korngröße, thermische Verluste, Prozesswirkungsgrad und Standortgeologie dominieren die Übertragbarkeit. OTA darf daraus keine Anlagenzahl durch einfache Division bestimmen.

---

## 7. Freigabeparameter für OTA Phase 2

Für die folgende OTA-Arbeit gelten damit diese Evidenzgrenzen:

| Parameter | Status für OTA Phase 2 |
|---|---|
| 497 Bewohner | gesetzt |
| Resilienz ohne Nachschub | mindestens 30 Tage |
| O₂-Verbrauch | ca. 0,41 t/Tag Größenordnung |
| CO₂-Verarbeitung | ca. 0,50–0,52 t/Tag Größenordnung |
| ECLSS-Wasser-Nachspeisung | 0,3–0,8 t/Tag [A], eng definierte Systemgrenze |
| Gesamt-ISRU-Wasserförderung | bottom-up zu bestimmen; größer als reine ECLSS-Nachspeisung möglich |
| mittlere elektrische Last | 3–5 MW [A], bottom-up zu prüfen |
| Spitzenlast | 5–8 MW [A], bottom-up zu prüfen |
| kritische elektrische Last | 1,5–2,5 MW [A], in OTA zu prüfen |
| thermische Abfuhr | 3–6 MW [A], nach Lastbilanz zu prüfen |
| Radiatorfläche | offen; aus Temperatur, Emissivität, Randbedingungen und Reserve abzuleiten |
| Radiator-Staubreserve | zwingend; kein universeller Prozentwert |
| gesamtes Druckvolumen | 40.000–60.000 m³ [A], nicht NHV |
| Segmentgröße | funktional/sicherheitsbasiert abzuleiten, keine pauschale Personenzahl |
| 30-Tage-Nahrungsreserve | 17–27 t Größenordnung |
| lokale Vollautarkie Nahrung | im Startzustand nicht gefordert |

---

## 8. Quellenanker

- NASA Fission Surface Power — mindestens 40-kWe-Demonstratorklasse, kontinuierlicher Betrieb für Mond/Mars.
- NASA NTRS: *The Effect of Martian Dust on Radiator Performance* — Emissivitätsänderung durch Marsstaub.
- NASA NTRS: *Aeolian removal of dust from radiator surfaces on Mars* — materialabhängige Degradation und Windkanalversuche.
- NASA Thermal Management Technology Catalog 2026 — Thermal Radiator with Electrodynamic Dust Shield, Zielumgebung Mond/Mars.
- NASA-STD-3001 Volume 2 — Human Factors, Habitability and Environmental Health für bemannte planetare Habitate.
- Bestehende Primärquellen der SSF-Research-Note `minimum-viable-mars-colony-497.md` für O₂/CO₂, Wasser, Nahrung, Strahlung und Medizin.

## 9. Abschluss

Der externe Evidenzaudit ist abgeschlossen. Keine der geprüften Unsicherheiten blockiert OTA Phase 2, sofern die oben markierten Architekturwerte nicht als Realreferenzen ausgegeben werden.

Die wichtigste Änderung gegenüber der Vorfassung ist keine einzelne neue Zahl, sondern die saubere Systemgrenze:

**Realwissen bestimmt die physikalischen Randbedingungen; OTA entscheidet die technische Weltarchitektur; NOXIA entscheidet erst danach Objektzahlen, Kosten, Bauzeiten und Balance.**
