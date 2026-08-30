# Minimum Viable Mars Colony — Evidenzbasis für 497 Personen

**Status:** SSF Research Note v0.1  
**Datum:** 2026-08-30  
**Population:** 497 Personen  
**Resilienzanforderung:** mindestens 30 Tage ohne externen Nachschub  
**Zweck:** reale wissenschaftlich-technische Grundlage für eine spätere OTA-Systemarchitektur und erst danach eine NOXIA-Projektion.

## 1. Epistemische Trennung

Diese Note unterscheidet drei Klassen:

- **[R] Referenzwert:** direkt aus NASA/ESA bzw. technischer Primärquelle.
- **[S] Skalierung:** transparenter linearer Rechenschritt aus einem Referenzwert.
- **[A] Architekturannahme:** ingenieurmäßiger Planungsbereich, weil es für eine 497-Personen-Marskolonie heute keine qualifizierte Referenzanlage gibt.

Die Zahlen in [A] sind keine Vorhersagen und keine NOXIA-Spielwerte. Sie sind Arbeitsbereiche für die nächste Systemarchitektur.

## 2. Primäre Referenzen

1. NASA OCHMO Carbon Dioxide Technical Brief / Human Integration Design Handbook: Standard Mission Day mit Bewegung: O₂-Verbrauch 0,82 kg/Person/Tag; CO₂-Produktion 1,04 kg/Person/Tag.  
   https://www.nasa.gov/ochmo-tb-004-carbon-dioxide-2/
2. NASA ECLSS: ISS-Wasseraufbereitung; 2023 wurden 98 % Gesamt-Wasserrückgewinnung demonstriert.  
   https://www.nasa.gov/missions/station/iss-research/nasa-achieves-water-recovery-milestone-on-international-space-station/
3. NASA Advanced Life Support: beispielhafte Luft-/Wasserströme pro Crewmitglied: O₂ 0,84 kg/d, CO₂ 1,00 kg/d; Trink-/Speisewasser 2,37 kg/d, Urinspülwasser 0,50 kg/d, Waschwasser 1,29 kg/d.  
   https://ntrs.nasa.gov/api/citations/20100036823/downloads/20100036823.pdf
4. NASA Food Mass Reduction / Mars Food Studies: heutige verpackte Raumfahrtnahrung etwa 1,14–1,83 kg/Person/Tag je nach Systemannahme und Verpackung.  
   https://ntrs.nasa.gov/search.jsp?R=20090006804  
   https://ntrs.nasa.gov/api/citations/20030033919/downloads/20030033919.pdf
5. NASA Spacecraft Habitable Volume Workshop: 80 m³ Netto-Habitatvolumen pro Person wurde als Langzeit-Referenzgröße untersucht.  
   https://ntrs.nasa.gov/citations/20110016362
6. NASA CHAPEA: 1.700 ft² Habitat für vier Personen, inklusive privater Räume, Küche, Medizin, Freizeit, Fitness, Arbeit, Crop Growth und Technik.  
   https://www.nasa.gov/humans-in-space/chapea/about-chapea/
7. NASA Fission Surface Power: aktuelle Demonstrator-Klasse mindestens 40 kWe, ausgelegt für kontinuierlichen Betrieb über Jahre; skalierbar für Mond/Mars, aber ausdrücklich noch keine Kolonieanlage.  
   https://www.nasa.gov/exploration-systems-development-mission-directorate/fission-surface-power/
8. NASA Mars RAD: Marsoberfläche etwa 210 µGy/Tag durch galaktische kosmische Strahlung in der beobachteten Phase; SEP-Ereignisse bleiben ein wesentlicher Unsicherheitsfaktor.  
   https://science.nasa.gov/resource/radiation-measurements-on-mars/
9. NASA Medical System Concept of Operations for Mars: keine verlässliche Echtzeit-Telemedizin/Evakuation; Exploration verlangt deutlich höhere medizinische Autonomie.  
   https://ntrs.nasa.gov/citations/20160013234
10. ESA MELiSSA: Ziel ist ein nahezu geschlossener regenerativer Kreislauf für Wasser, O₂, Nahrung und organische Reststoffe; heutiger Status ist Forschungs-/Pilotniveau, nicht vollwertige Kolonieversorgung.  
    https://www.esa.int/Enabling_Support/Space_Engineering_Technology/Melissa/Closed_Loop_Concept

## 3. Harte Stoffstrombasis für 497 Personen

### 3.1 Sauerstoff und Kohlendioxid

[R] NASA Standard Mission Day mit Bewegung:

- O₂: 0,82 kg/Person/Tag
- CO₂: 1,04 kg/Person/Tag

[S] Für 497 Personen:

- **O₂-Bedarf: 407,5 kg/Tag**
- **CO₂-Abfuhr: 516,9 kg/Tag**
- 30-Tage-O₂-Äquivalent ohne Regeneration: **12,23 t O₂**
- 30-Tage-CO₂-Verarbeitung: **15,51 t CO₂**

Das Minimum darf daher keine einzelne O₂-Quelle oder einen einzelnen CO₂-Scrubber als Single Point of Failure besitzen. Ein 30-Tage-Tanklager nur für O₂ ist möglich, aber für eine dauerhaft betriebene Siedlung energetisch/logistisch schlechter als regenerativer Betrieb plus Notreserve.

### 3.2 Wasser

[R] Die NASA-Referenz für sehr sparsamen Raumflugbetrieb liegt bei ungefähr 3,8–4,2 kg/Person/Tag an unmittelbar bereitgestelltem Trink-, Speise-, Hygiene- und Spülwasser. [R] ISS-ECLSS hat 98 % Rückgewinnung demonstriert.

[S] Minimaler ISS-artiger Bruttodurchsatz für 497 Personen:

- ca. **1,88–2,07 t Wasser/Tag**

[A] Für eine dauerhafte Kolonie ist dieser Wert als untere Überlebens-/Raumfahrtgrenze zu verstehen. Eine bewohnbare Siedlung mit Duschen, Küche, Medizin, Reinigung, Werkstatt und Pflanzenmodulen benötigt einen höheren internen Bruttodurchsatz. Für Systemarchitektur werden deshalb angesetzt:

- Szenario A: **8–12 kg/Person/Tag** → 4,0–6,0 t/Tag brutto
- Szenario B: **15–25 kg/Person/Tag** → 7,5–12,4 t/Tag brutto
- Szenario C: **25–40 kg/Person/Tag** → 12,4–19,9 t/Tag brutto

Bei 95–98 % tatsächlicher Rückgewinnung bedeutet Szenario B rechnerisch nur etwa **0,15–0,62 t/Tag** Kreislaufverlust. Zusätzlich sind Wasserbindung in Nahrung/Produkten, Leckage, Filterrückstände, EVA-Verluste und Wartung zu berücksichtigen. Für die Basiskolonie wird deshalb zunächst **0,3–0,8 t/Tag gesicherte Nachspeisefähigkeit** als Planungsbereich angesetzt.

30-Tage-Nachspeisereserve B: **9–24 t Wasser**, zusätzlich zu Wasser im laufenden Kreislauf und lokalen Rohwasservorräten.

### 3.3 Nahrung

[R] NASA-Studien nennen für heutige verpackte Raumfahrtnahrung ungefähr 1,14–1,83 kg/Person/Tag.

[S] Für 497 Personen:

- **0,57–0,91 t Nahrung/Tag**
- **17,0–27,3 t für 30 Tage**

[A] Für Szenario B sollte die 30-Tage-Notreserve vollständig lagerfähig und unabhängig von lokaler Pflanzenproduktion sein. Lokale Produktion ist für Frische, Resilienz und spätere Importreduktion sinnvoll, darf im Minimum aber nicht die einzige Kalorienquelle darstellen.

## 4. Habitatgröße

[R] NASA untersuchte für Langzeitmissionen 80 m³ Netto-Habitatvolumen pro Person. CHAPEA stellt für vier Personen ca. 158 m² Gesamtfläche bereit, rund 39,5 m²/Person.

[S] Für 497 Personen:

- **Netto-Habitatvolumen: ca. 39.760 m³** bei 80 m³/Person
- **CHAPEA-artige Nutzfläche: ca. 19.600 m²** bei 39,5 m²/Person

[A] Für eine Minimum-Viable-Colony wird daher nicht mit einem einzigen großen Druckkörper gerechnet, sondern mit segmentierten Druckzonen. Planungsbereich:

- reine Wohn-/Arbeits-/Medizin-/Gemeinschaftsfläche: **18.000–25.000 m²**
- zusätzliche druckbeaufschlagte Technik/Lager/Schleusen: **5.000–10.000 m²**
- gesamtes netto druckbeaufschlagtes Volumen: **40.000–60.000 m³**

Mindestens mehrere unabhängig isolierbare Brand-/Drucksegmente sind sicherheitsbedingt zwingend.

## 5. Elektrische Leistung und Energiespeicherung

Es gibt keinen heutigen belastbaren NASA-Wert „kW pro 497-Personen-Marskolonie“. Die 40-kWe-Fission-Surface-Power-Klasse ist ein Technologieanker, kein Größenmodell für eine Kolonie.

[A] Für Szenario B wird deshalb ein Bottom-up-Planungsband verwendet, das ECLSS, Wasseraufbereitung, Wärme-/Kälteanlagen, Beleuchtung, IT/Kommunikation, medizinische Infrastruktur, Werkstatt, Lagerlogistik, Roverladung, begrenzte ISRU und Reserve berücksichtigt:

- **mittlere elektrische Last: 3–5 MW**
- **Spitzenlast: 5–8 MW**
- kritische lebenserhaltende Last, die auch im schweren Fehlerfall erhalten bleiben muss: zunächst **1,5–2,5 MW** als zu verifizierender Architekturwert

Diese Werte sind [A], nicht [R]. Sie müssen im OTA-Systementwurf pro Subsystem neu bilanziert werden.

### Energiespeicherung

Bei nuklearer Grundlast muss nicht die gesamte Kolonie über Tage aus Batterien laufen. Speicher dient vor allem für Lastsprünge, Umschaltung, Schwarzstart und zeitweise Trennung von Netzsegmenten.

[A] Szenario B:

- Kurzzeitspeicher 2–4 h kritische Last: **3–10 MWh**
- zusätzliche 12–24-h-Resilienz sollte vorzugsweise über räumlich getrennte Erzeuger, Brennstoff-/Reaktordiversität oder andere Langzeitspeicher realisiert werden, nicht ausschließlich über Batterien.

## 6. Thermische Kontrolle

Fast jede elektrische Leistung und menschliche Stoffwechselenergie wird letztlich zu Wärme. Auf Mars ist Konvektion an die dünne Außenatmosphäre begrenzt; Wärmeabfuhr braucht gezielte Radiatoren/Wärmesenken.

[A] Als erste Systemgrenze ist bei 3–5 MW mittlerer elektrischer Last mit einer **thermisch abzuführenden Größenordnung von 3–6 MW** zu rechnen, abhängig davon, welcher Anteil über Außenprozesse, Abgas-/Prozessströme oder gespeicherte Produkte abgeführt wird.

Thermalkontrolle ist damit kein Nebensystem, sondern ein primärer Netzdienst der Kolonie.

## 7. Abfall- und Reststoffströme

Für eine 497-Personen-Kolonie ist eine einzige seriöse kg/Tag-Zahl nicht aus heutigen Raumfahrtdaten ableitbar, weil lokale Nahrungserzeugung, Verpackung, Hygiene, Reparatur und Fertigung den Strom dominieren.

[A] Die Architektur muss mindestens getrennt behandeln:

- Urin/Schwarzwasser
- Grauwasser
- organische Küchen-/Pflanzenreste
- trockene Hygiene-/Verpackungsabfälle
- technische Abfälle/Filter/Harze
- Metallschrott und polymerbasierte Fertigungsreste
- medizinisch kontaminierte Stoffe

Für Szenario B ist **Materialrückgewinnung vor Entsorgung** zwingend. Organische und wasserreiche Ströme sind Ressourcen für Wasser-/Nährstoffrückgewinnung, nicht bloß Müll.

## 8. Medizin

[R] NASA Mars-Medizinkonzepte gehen von hoher Autonomie aus, weil Evakuation und Echtzeit-Telemedizin nicht zuverlässig zur Verfügung stehen.

Für 497 Menschen ist die Größenordnung nicht mehr „Crew medical kit“, sondern eine kleine, technisch autarke Klinik.

[A] Funktional zwingend:

- 24/7 Erst- und Notfallversorgung
- Diagnostik inkl. Labor, Ultraschall und Röntgen/geeigneter Bildgebung
- chirurgische Stabilisierung und kleinere/akute Operationen
- Zahnmedizin
- Isolation/Infektionskontrolle
- Apotheke und steriles Material
- psychologische/psychiatrische Versorgung
- Rehabilitation/Physiotherapie
- telemedizinische Datenverbindung mit asynchroner Entscheidungsunterstützung

Die Personalausstattung gehört in OTA/Sozialarchitektur, nicht in diese technische SSF-Note.

## 9. Strahlenschutz

[R] Curiosity RAD maß auf der Marsoberfläche in der beobachteten Phase rund 210 µGy/Tag aus galaktischer kosmischer Strahlung. Solar Particle Events sind zusätzlich und stark variabel.

Folgerung:

- normale Aufenthaltsbereiche benötigen dauerhafte Abschirmstrategie;
- mindestens ein stark geschützter Storm Shelter pro unabhängigem Habitatsegment ist sicherheitsbedingt zwingend;
- Wasser, Vorräte und lokaler Regolith sind als multifunktionale Abschirmmassen technisch attraktiv;
- Abschirmung muss mit Sekundärstrahlung und Materialwahl gemeinsam bewertet werden; „mehr Metall“ ist nicht automatisch besser.

## 10. Oberflächenmobilität, Logistik und Mediennetze

Noch keine Anzahl konkreter NOXIA-Fahrzeuge festlegen. Für das Minimum sind jedoch folgende Funktionen zwingend:

1. druckbeaufschlagter Personen-/Rettungstransport
2. unbemannter Frachttransport
3. Bau-/Erdbewegung für Regolith, Schutzwälle und Leitungsbau
4. Wartungs-/Bergefahrzeug
5. EVA-Unterstützung in Basisnähe
6. Inspektion/Robotik für Außenanlagen

Mediennetze müssen mindestens Strom, Daten, Wasser, O₂/Prozessgase und Abwasser führen. Kritische Netze brauchen segmentierbare Ring-/Mehrwege-Topologie; ein einziger zentraler Leitungskorridor wäre kein Minimum, sondern ein systemischer Single Point of Failure.

## 11. Szenariovergleich

| Größe | A — konservativ | B — plausible Basiskolonie | C — weiter entwickelt |
|---|---:|---:|---:|
| Population | 497 | 497 | 497 |
| O₂-Stoffstrom | 408 kg/d | 408 kg/d | 408 kg/d |
| CO₂-Verarbeitung | 517 kg/d | 517 kg/d | 517 kg/d |
| Wasser brutto intern | 4–6 t/d | 7,5–12,4 t/d | 12,4–19,9 t/d |
| Wasser-Rückgewinnung | 90–95 % [A] | 95–98 % [A/R-Ziel] | ≥98 % [A] |
| Wasser-Nachspeisung | 0,3–0,8+ t/d | 0,3–0,8 t/d | <0,4 t/d, soweit technisch erreichbar |
| Nahrung importiert | überwiegend | 0,57–0,91 t/d als sichere Obergrenze/Reserve | deutlich reduziert durch lokale Produktion |
| 30-Tage-Nahrungsreserve | 17–27 t | 17–27 t | 17–27 t Notreserve trotz lokaler Produktion |
| Druckvolumen | 35–45 Tsd. m³ | 40–60 Tsd. m³ | 50–80 Tsd. m³ |
| Nutzfläche | 18–22 Tsd. m² | 23–35 Tsd. m² inkl. Drucktechnik | 30–45 Tsd. m² |
| mittlere elektrische Last | 2–4 MW [A] | 3–5 MW [A] | 5–10 MW [A] |
| Spitzenlast | 4–6 MW [A] | 5–8 MW [A] | 8–15 MW [A] |
| Kurzzeitspeicher | 2–6 MWh [A] | 3–10 MWh [A] | 5–20 MWh [A] |
| lokale ISRU | gering | Wasser/O₂/Baustoffe begrenzt | deutlich höher |
| lokale Nahrungsproduktion | gering | Ergänzung/Frische | wesentlicher Anteil |

**Bewertung:** Szenario B ist für Tharsis Hub der sinnvollste Startanker. A ist für 497 Personen logistisch zu importabhängig; C setzt Technologien und lokale Produktionsketten voraus, die besser als spätere Entwicklungsstufe behandelt werden.

## 12. Minimum-funktionale Systemarchitektur

### Funktional zwingend

- segmentierte druckbeaufschlagte Habitate
- O₂-Erzeugung / O₂-Speicher / Atmosphärenmischung
- CO₂-Entfernung und Spurengasmanagement
- Wasseraufbereitung und getrennte Wasserqualitäten
- elektrische Grundlastversorgung
- thermische Kontrolle
- Nahrungslager und Essensversorgung
- Sanitär-/Abwassersystem
- Daten-/Kommunikationssystem
- EVA-/Airlock-System
- technische Werkstatt und Ersatzteillager
- Medizin

### Sicherheitsbedingt zwingend

- räumlich getrennte Energiequellen bzw. unabhängige Erzeugungsstränge
- N+1 bzw. funktional gleichwertige Redundanz für O₂, CO₂, Wasser und kritische Pumpen
- isolierbare Druck-/Brandsegmente
- Storm Shelters
- Branddetektion/-bekämpfung
- Not-O₂ und Notstrom
- mehrere unabhängige Flucht-/Rettungswege innerhalb der Basisarchitektur
- getrennte kritische Medienrouten

### Für 30 Tage Resilienz zwingend

- 17–27 t lagerfähige Nahrungsreserve
- 9–24 t Wasser-Nachspeisereserve für Szenario B plus Kreislaufbestand
- kritische Filter, Sorbentien, Dichtungen, Pumpen-/Ventilteile, Elektronikmodule, medizinische Verbrauchsmaterialien
- ausreichende O₂-Pufferreserve bzw. alternative O₂-Erzeugung
- Ersatz-/Notleistung für kritische Lasten

### Sinnvoll, aber nicht zwingend für den Start

- größere lokale Nahrungsproduktion
- umfangreiche Metallurgie
- große kommerzielle Fertigung
- Komfortflächen oberhalb des Langzeit-Habitabilitätsminimums
- private Fahrzeuge

## 13. Offene Unsicherheiten für OTA

Vor einer konkreten Anlagenliste müssen in OTA folgende Architekturentscheidungen getroffen werden:

1. Primärenergie: Kernspaltung, Solar+nuklearer Backup oder anderes Hybridmodell?
2. Lokale Wasserquelle: Eisabbau, hydratisierte Minerale, importiertes Startinventar; welche Förderleistung ist kanonisch?
3. O₂: Elektrolyse aus Wasser, CO₂-Elektrolyse, kombinierte Systeme?
4. Grad lokaler Nahrungsproduktion im Startjahr.
5. Unterirdische/überdeckte Habitate vs. oberirdische Druckmodule.
6. zentrale vs. verteilte ECLSS-Architektur.
7. zulässiger Technikstand und Wartungsautomatisierung im NOXIA-Zeitraum.

Diese Entscheidungen sind Welttechnik und gehören nicht SSF.

## 14. Kernaussage für Tharsis Hub

Eine 497-Personen-Basiskolonie ist technisch bereits eine **kleine industrielle Anlage**, keine vergrößerte Raumstationscrew. Der plausible Startzustand besteht nicht aus möglichst wenigen Gebäuden, sondern aus möglichst wenigen **unabhängigen Funktionen mit notwendiger Redundanz**.

Für Szenario B sind als erste Gesamtgrößenordnung anzusetzen:

```text
Population                         497 Personen
Autarkiereserve                    >= 30 Tage
O2-Bedarf                          ~408 kg/Tag
CO2-Abfuhr                         ~517 kg/Tag
Wasser-Bruttodurchsatz             ~7,5–12,4 t/Tag
Wasser-Nettonachspeisung           ~0,3–0,8 t/Tag
Nahrungsbedarf / Importreferenz    ~0,57–0,91 t/Tag
30-Tage-Nahrungsreserve            ~17–27 t
30-Tage-Wasser-Nachspeisereserve   ~9–24 t
mittlere elektrische Last          ~3–5 MW [A]
Spitzenlast                        ~5–8 MW [A]
Kurzzeit-Energiespeicher           ~3–10 MWh [A]
thermische Abfuhr                  ~3–6 MW [A]
Netto-Druckvolumen                 ~40.000–60.000 m3
Nutzfläche druckbeaufschlagt       ~23.000–35.000 m2
```

Diese Bilanz ist ausreichend, um als nächstes im OTA die kanonische Welttechnik-Systemarchitektur zu definieren. Sie ist noch nicht ausreichend, um NOXIA-Gebäudeanzahlen direkt festzulegen.
