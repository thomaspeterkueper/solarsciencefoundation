# Planetary Raman & Resource Reconnaissance

**Status:** wissenschaftliche SSF-Grundlage  
**Datum:** 2026-09-13  
**Evidenzregel:** `[R]` = durch reale Physik, Instrumente, Missionen oder Demonstrationen gestützt; `[H]` = plausible, aber noch nicht demonstrierte/validierte Übertragung oder Missionshypothese.

## 1. Zweck und Abgrenzung

Dieses Dokument liefert die wissenschaftliche Referenzbasis für planetare Raman-Spektroskopie und Ressourcenfernerkundung. Es trennt bewusst drei Ebenen:

1. **etablierte Raman-Physik und reale planetare Instrumente** `[R]`,
2. **reale Langdistanz-Demonstrationen bis in den Bereich von etwa 120 m** `[R]`,
3. **orbitales/flyby-basiertes Raman aus 30–50 km Distanz** `[H]`.

Die 30–50-km-Idee stammt aus der NASA-NIAC-Phase-I-Studie **Interworld Slingshot Resource Surveys** (2026). NASA beschreibt sie ausdrücklich als Machbarkeitsfrage: Es soll erst geklärt werden, ob charakteristische Raman-Linien aus dieser Distanz mit ausreichendem Signal-Rausch-Verhältnis messbar sind. Sie ist damit **keine validierte Technologie**.

SSF übernimmt keine fiktionale Engineering- oder NOXIA-Technik. Dieses Dokument beschreibt nur wissenschaftliche Grundlagen, Grenzen und offene Fragen.

---

## 2. Raman-Grundlagen `[R]`

### 2.1 Was Raman-Spektroskopie misst

Trifft monochromatisches Laserlicht auf Materie, wird der überwiegende Anteil elastisch gestreut (Rayleigh-Streuung). Ein sehr kleiner Anteil tauscht Energie mit Schwingungs- oder Rotationszuständen des Materials aus. Dadurch entsteht gegenüber der Laserlinie eine Frequenzverschiebung.

- **Stokes-Raman:** Das gestreute Photon verliert Energie; das Material nimmt Schwingungsenergie auf.
- **Anti-Stokes-Raman:** Das Photon gewinnt Energie aus bereits angeregten Zuständen des Materials.

Die Lage der Raman-Banden wird üblicherweise als Raman-Verschiebung in `cm⁻¹` angegeben. Sie ist mit molekularen Bindungen, Kristallgitterschwingungen und strukturellen Zuständen verknüpft. Dadurch kann Raman Minerale, bestimmte organische Verbindungen und kristalline Phasen unterscheiden.

Raman liefert dabei primär **molekular-/strukturbezogene Information**, nicht automatisch eine vollständige Elementanalyse.

### 2.2 Warum das Signal schwach ist

Raman-Streuung ist intrinsisch schwach. Die messbare Photonenzahl hängt unter anderem ab von:

- Raman-Wirkungsquerschnitt des Materials,
- Laserwellenlänge und Pulsenergie,
- bestrahlter Fläche / Spotgröße,
- Anzahl angeregter Moleküle bzw. Streuzentren,
- Oberflächenrauigkeit, Korngröße und Orientierung,
- Absorption und Eigenfluoreszenz,
- geometrischer Sammlung des rückgestreuten Lichts,
- Teleskopapertur,
- optischem Durchsatz,
- spektraler Filterung,
- Detektorquanteneffizienz,
- Integrationszeit bzw. Anzahl der Laserpulse,
- Hintergrundlicht.

Eine Distanzskalierung darf deshalb **nicht durch einen einzigen universellen Exponenten** ersetzt werden. Für einen gegebenen rückstreuenden Bereich sinkt der vom Empfänger erfasste Raumwinkel grundsätzlich ungefähr mit `Aperturfläche / Entfernung²`. Gleichzeitig wächst bei fester Strahldivergenz die beleuchtete Fläche ungefähr mit `Entfernung²`, wodurch die Bestrahlungsstärke fällt. Je nach Footprint, Oberflächenmodell, Empfangs-FOV und räumlicher Auflösung entstehen unterschiedliche effektive Skalierungen. Eine pauschale lineare Extrapolation von 7 m oder 120 m auf 30–50 km ist wissenschaftlich nicht zulässig.

### 2.3 Laserwellenlänge und Messbarkeit

Kürzere Anregungswellenlängen können den Raman-Wirkungsgrad erhöhen, zugleich aber Fluoreszenz, Absorption, Oberflächenschädigung und Anforderungen an Optiken beeinflussen. Deep-UV-Raman kann Fluoreszenz zeitlich/spektral besser separieren und organische Verbindungen resonant anregen; grüne Systeme bei 532 nm sind dagegen technologisch gut etabliert und werden z. B. bei SuperCam eingesetzt.

Die Wahl der Wellenlänge ist daher kein isoliertes Optimierungsproblem, sondern ein Systemkompromiss aus:

- Raman-Effizienz,
- Fluoreszenzuntergrund,
- Laser- und Detektortechnologie,
- Zielmineralogie,
- atmosphärischer Transmission,
- Oberflächenreflexion,
- thermischer und elektrischer Belastung.

### 2.4 Fluoreszenz und Hintergrund

Fluoreszenz kann Raman-Banden überdecken, weil sie oft um Größenordnungen stärker ist und über einen breiten Spektralbereich emittiert. Bei Tageslicht oder sonnenbeschienenen Oberflächen kommt zusätzlich kontinuierlicher Hintergrund hinzu.

Mögliche Gegenmaßnahmen sind:

- enge spektrale Filter,
- gepulste Laser,
- zeitaufgelöste Messung / Time Gating,
- kleine Empfangs-FOV,
- geeignete Wellenlängenwahl,
- wiederholte Pulse und statistische Integration,
- Hintergrundmessung unmittelbar vor/nach dem Laserpuls.

### 2.5 Spektrale Auflösung und Detektoren

Die notwendige spektrale Auflösung hängt davon ab, welche Raman-Banden getrennt werden müssen. Eine höhere Auflösung verbessert die Trennbarkeit benachbarter Linien, reduziert aber bei gegebener Optik oft den Photonenfluss pro Spektralkanal. Für schwache planetare Signale ist daher die Kombination aus Auflösung, Durchsatz, Detektorrauschen und Dynamikbereich entscheidend.

Gated intensified CCDs/CMOS- oder photonenzählende Systeme sind besonders relevant, wenn kurze Empfangsfenster den Laser-Rücklauf vom kontinuierlichen Hintergrund trennen sollen.

---

## 3. Planetare Raman-Heritage `[R]`

### 3.1 SuperCam / Perseverance

SuperCam auf NASA Perseverance kombiniert LIBS, zeitaufgelöstes Raman/Lumineszenz, VIS/NIR-Spektroskopie, Bildgebung und Akustik. Für Raman verwendet SuperCam einen gepulsten 532-nm-Laser und einen intensivierten, zeitlich gegateten Detektor.

Reale Einsatzdistanz des Raman-Kanals: **Meterbereich, typischerweise etwa 2–7 m**. Veröffentlichte Systembeschreibungen nennen Raman-Messungen bis ungefähr 7 m; das Empfangsfeld wächst mit Distanz und liegt bei einigen Millimetern Footprint im oberen Distanzbereich.

Wichtig für die Übertragbarkeit:

- SuperCam demonstriert, dass aktives Raman auf einer fremden Planetenoberfläche im Meterbereich funktioniert.
- Es demonstriert **nicht** orbitales Raman im Kilometerbereich.
- Die Messungen profitieren von langer Verweilzeit des Rovers, kontrolliertem Pointing und der Möglichkeit, viele Pulse auf denselben Zielbereich abzugeben.

### 3.2 SHERLOC / Perseverance

SHERLOC ist ein armgetragenes Deep-UV-Raman- und Fluoreszenzinstrument mit etwa 248,6 nm Anregung und ungefähr 100-µm-Spot. Der Arbeitsabstand liegt nur bei wenigen Zentimetern (etwa 48 mm in der Instrumentbeschreibung).

SHERLOC ist damit wissenschaftlich wichtig für:

- mikroskalige Mineralogie,
- organische Verbindungen,
- räumliche Korrelation von Chemie/Mineralogie und Textur.

Es ist **kein** Standoff- oder orbitaler Raman-Nachweis.

### 3.3 Aussagegrenzen realer planetarer Raman-Instrumente

Raman kann unter geeigneten Bedingungen:

- Mineralphasen identifizieren,
- Kristallstrukturen und polymorphe Phasen unterscheiden,
- bestimmte organische Moleküle oder funktionelle Gruppen erfassen,
- Eis-/Salz-/Hydratphasen charakterisieren,
- lokale Veränderungsprozesse sichtbar machen.

Raman allein liefert jedoch nicht automatisch:

- repräsentativen Volumengehalt einer Lagerstätte,
- Mächtigkeit oder Tiefenerstreckung,
- Gesamttonnage,
- Abbau- oder Aufbereitbarkeit,
- wirtschaftliche Gewinnbarkeit.

---

## 4. Reale Long-range-Raman-Demonstrationen `[R]`

Es existieren terrestrische Standoff-Demonstrationen im Bereich bis etwa **120 m**.

Ein peer-reviewtes Beispiel von Misra et al. (2012) zeigte Single-Pulse-Raman-Spektren verschiedener Chemikalien und Minerale aus 120 m Distanz bei Tageslicht. Das System verwendete unter anderem:

- 532-nm-Nd:YAG-Laser,
- etwa 100 mJ pro Puls,
- 10-ns-Pulse,
- 8-Zoll-Sammelteleskop,
- gated ICCD,
- etwa 100-ns-Detektionsfenster.

Rull, Vegas, Sansano und Sobron (2011) berichteten außerdem über Remote-Raman-Analysen arktischer Eisproben in Distanzen von ungefähr 10–120 m.

Diese Experimente zeigen, dass Raman-Signale über >100 m **unter terrestrischen Feldbedingungen** messbar sein können. Sie belegen jedoch nicht die Übertragbarkeit auf 30–50 km, weil sich folgende Größen massiv ändern:

- Entfernung,
- Spotgröße und Bestrahlungsstärke,
- Pointing-Anforderungen,
- Bewegungsunschärfe,
- verfügbare Dwell Time,
- Teleskopapertur relativ zur Reichweite,
- Hintergrundgeometrie,
- Zielrauigkeit und Regolithstruktur,
- atmosphärische bzw. vakuumseitige Randbedingungen.

---

## 5. Orbital/Flyby-Raman aus 30–50 km `[H]`

### 5.1 Status

NASA NIAC 2026 führt **Interworld Slingshot Resource Surveys** als Phase-I-Konzept. Die Kernfrage ist ausdrücklich, ob Raman-Linien wichtiger Minerale aus etwa 30–50 km mit ausreichendem SNR detektiert werden können. NASA beschreibt ein Konzept mit hochenergetischem gepulstem Laser, zeitlich gegatetem photonenzählendem Detektor und Beam Steering.

Daraus folgt für SSF:

> **30–50-km-Raman ist derzeit Forschungsgegenstand, nicht etablierte planetare Messfähigkeit.**

### 5.2 Photonbudget

Für ein belastbares orbitales Raman-Photonbudget müssen mindestens gekoppelt modelliert werden:

`N_detected = f(E_pulse, λ, divergence, range, illuminated_area, Raman_cross_section, surface_state, collection_aperture, optics_throughput, spectral_bandpass, detector_QE, pointing, dwell_time, background)`

Ein brauchbares Modell muss nicht nur die Laserleistung, sondern den gesamten optischen Pfad abbilden.

Kritische Punkte:

- **Strahldivergenz:** vergrößert den Spot mit Entfernung und senkt die Irradianz.
- **Apertur:** größere Empfangsfläche erhöht die gesammelte Photonenzahl, aber Masse, Volumen und Pointing-Anforderungen steigen.
- **Dwell Time:** bei Flybys ist die Zeit auf einem räumlich kleinen Ziel begrenzt.
- **Jitter und smear:** verschmieren Spot und Empfangsfeld; Signalintegration über unterschiedliche Mineralphasen verschlechtert Identifizierbarkeit.
- **Oberflächenrauigkeit:** verändert Rückstreuung und lokale Einstrahlwinkel.
- **Staub / Alteration:** kann die optisch zugängliche Deckschicht dominieren und darunterliegendes Material maskieren.
- **Sonnenlicht:** erhöht den Hintergrund, insbesondere bei breitbandiger oder unzureichend gegateter Detektion.
- **Pulsenergie:** steigert Signal, ist aber durch Laserwirkungsgrad, thermische Last, Stromversorgung und Materialschädigung begrenzt.
- **Mehrfachpulse:** verbessern Statistik nur, wenn derselbe Zielbereich ausreichend lange gehalten wird.

### 5.3 Luftlose Körper vs. Mars

**Mond / Asteroiden / Phobos / Deimos:**

- kein atmosphärischer Extinktionspfad,
- kein atmosphärisches Raman entlang des Laserwegs,
- aber starke solare Beleuchtung, extreme Temperaturbedingungen und unregelmäßige Rauigkeit,
- bei kleinen Körpern zusätzlich schnelle Geometrieänderungen und unregelmäßige Rotation.

**Mars:**

- CO₂-Atmosphäre und Aerosole/Staub beeinflussen Transmission, Streuung und Hintergrund,
- Staub kann sowohl den Laserpfad als auch die oberste optisch sichtbare Oberfläche beeinflussen,
- atmosphärische Streuung erschwert die Trennung schwacher Oberflächensignale,
- dafür existiert reale Raman-Heritage direkt auf Mars als Referenz für Materialantworten.

---

## 6. Vergleich planetarer Ressourcen-Sensoren

| Verfahren | Primäre Information | Typische Stärke | Wesentliche Grenze | Eignung für Ressourcenschätzung |
|---|---|---|---|---|
| VIS/NIR/SWIR-Reflexion | elektronische/vibratorische Absorptionsmerkmale, Oberflächenmineralogie | großflächige passive Kartierung | optisch oberste Schicht, Mischpixel, Raumverwitterung/Staub | gut für Prospektion, schwach für Volumen/Tonnage |
| Thermal IR | Emissivität, Silikat-/Mineralphasen, Temperatur/thermische Trägheit | Mineral- und Materialkontext | Temperaturkorrektur, grobe Mischsignale | indirekter Hinweis, keine Reservebestimmung |
| Radar | Dielektrizität, Rauigkeit, Struktur, teils Untergrund | Tiefen-/Strukturinformation, Eisindikationen | Mehrdeutigkeit zwischen Material, Porosität, Rauigkeit | wichtig für Mächtigkeit/Struktur, braucht Kalibrierung |
| Neutronenspektroskopie | v. a. Wasserstoff-/Elementkontext über Wechselwirkung kosmischer Strahlung | orbital, Bulk-Sensitivität bis in dm-Bereich | Wasserstoff ≠ eindeutig H₂O; räumliche Auflösung begrenzt | gut für volatile Prospektion, nicht allein für Lagerstättenmodell |
| Gamma-Ray-Spektroskopie | Elementhäufigkeiten in oberflächennahen dm | quantitative Bulk-Elementchemie | lange Integration, begrenzte räumliche Auflösung | wichtige regionale Geochemie, keine Geometrie/Tonnage allein |
| Lidar / Laser Altimetry | Topographie, Rauigkeit, Reflexion | sehr genaue Geometrie | kaum direkte Mineralidentifikation | zentral für Volumenmodell, nicht für Grade allein |
| Raman | molekulare/mineralische Fingerprints | hohe mineralogische Spezifität | schwaches Signal, oberflächen-/spotbezogen, Reichweitenproblem | gut für Identifikation, nicht allein für Grade/Tonnage |
| LIBS | Elementchemie über Laserplasma | schnelle lokale Elementanalyse | Nah-/Meterbereich, Ablation, kleine Spots | Ground truth / lokale Grade-Hinweise, nicht allein repräsentativ |
| XRF / PIXL-artig | Elementverteilung | hochauflösende lokale Elementchemie | Nähe erforderlich, kleine Fläche | sehr gut für lokale Ground Truth |
| Seismik / Geophysik | Schichtgrenzen, Dichte-/Elastizitätskontraste | Tiefenstruktur | benötigt Kontakt/Geometrie und Inversion | wesentlich für Volumen und Tiefenmodell |
| Ground-penetrating radar | dielektrische Schichtstruktur | Untergrund und Schichtmächtigkeit | materialabhängige Eindringtiefe/Ambiguität | stark für Struktur, braucht Zusammensetzungsdaten |
| Bohren / Proben / Sample return | direkte Materialeigenschaften, Chemie, Mineralogie | höchste Ground-Truth-Qualität | teuer, lokal begrenzt | unverzichtbar zur Kalibrierung belastbarer Ressourcenmodelle |

### Kernaussage: Sensorfusion statt „bestem Sensor“

Kein einzelnes Verfahren liefert gleichzeitig belastbar:

- Mineralidentität,
- Elementgehalt,
- räumliche Ausdehnung,
- Tiefenverteilung,
- Porosität/Dichte,
- mechanische Gewinnbarkeit,
- Aufbereitbarkeit,
- wirtschaftliche Verwertbarkeit.

Ein belastbares Explorationsmodell benötigt deshalb eine Kette aus **regionaler Fernerkundung → hochauflösender Prospektion → geophysikalischer Strukturinformation → lokaler Ground Truth**.

---

## 7. Von Mineralnachweis zu Ressourcenschätzung

Die wichtigste epistemische Trennung lautet:

```text
composition detection
≠ grade
≠ thickness/depth
≠ tonnage
≠ recoverable resource
≠ reserve / economic viability
```

### 7.1 Composition detection

Ein Sensor erkennt ein Mineral, Element oder molekulares Merkmal an einer Oberfläche oder in einem Messvolumen.

### 7.2 Grade

`Grade` bezeichnet den Anteil bzw. die Konzentration des relevanten Materials. Ein Raman-Spektrum kann das Vorhandensein einer Phase zeigen, ist aber ohne geeignete Kalibrierung und repräsentative Probengeometrie kein direkter Bulk-Grade-Messer.

### 7.3 Thickness / depth

Für Mächtigkeit und Tiefe werden geometrische bzw. geophysikalische Informationen benötigt. Oberflächenspektroskopie allein kann nicht bestimmen, ob ein Signal nur eine dünne Beschichtung oder einen meter-/kilometertiefen Körper repräsentiert.

### 7.4 Tonnage

Tonnage erfordert mindestens ein Volumenmodell und eine Dichteannahme bzw. Dichtemessung. Ein mineralogischer Pixel oder Raman-Spot enthält diese Information nicht.

### 7.5 Recoverable resource

Gewinnbare Menge hängt zusätzlich ab von:

- Mineraltextur und Korngröße,
- mechanischer Festigkeit,
- Porosität,
- Aufbereitung,
- Energiebedarf,
- Extraktionsverlusten,
- Standort-/Transportbedingungen.

### 7.6 „Resource“ und „Reserve“

Terrestrische Standards wie CRIRSCO und SEC S-K 1300 verbinden **Mineral Resource** bereits mit geologischer Evidenz, Menge/Grade und realistischen Aussichten auf wirtschaftliche Gewinnung. Eine **Mineral Reserve** ist noch enger und erfordert technische/wirtschaftliche Machbarkeit und Modifying Factors.

Für planetare Exploration sollte SSF diese Begriffe deshalb nicht vorschnell formal übernehmen. Solange diese Kriterien fehlen, sind präzisere Ausdrücke vorzuziehen, z. B.:

- `detected mineral phase`,
- `compositional anomaly`,
- `candidate resource-bearing unit`,
- `prospective volatile-bearing region`.

Ein Spektralnachweis allein ist **keine Reserve** und häufig noch nicht einmal eine belastbare Ressourcenschätzung.

---

## 8. Zielkörper getrennt betrachtet

### 8.1 Mond

**Relevante Ziele:** Wassereis/Wasserstoff, Ilmenit, Pyroxene, Plagioklas, pyroklastische Materialien.

Besonderheiten:

- Neutronenspektroskopie hat orbital Wasserstoffanreicherungen an den Polen gezeigt.
- Diese Messungen sind Bulk-/Near-surface-Indikatoren und kein direkter Nachweis einer bestimmten Eisgeometrie.
- VIS/NIR kann Oberflächenmineralogie und OH/H₂O-Signaturen liefern.
- Radar kann Hinweise auf Struktur und Eis liefern, ist aber oft mehrdeutig.
- Raman könnte bei ausreichendem SNR spezifische Phasen bestätigen, bliebe jedoch zunächst oberflächen-/footprint-bezogen.

Für eine belastbare Eisressource werden zusätzlich Mächtigkeit, räumliche Kontinuität, Gehalt, Temperatur, Regolithmechanik und Extrahierbarkeit benötigt.

### 8.2 Near-Earth Asteroids

**Relevante Ziele:** Silikate, Metallphasen, Kohlenstoff-/Organik-reiche Materialien, hydratisierte Minerale.

Besonderheiten:

- kleine Körper besitzen oft unregelmäßige Form, Rotation und heterogene Oberflächen,
- Regolithmigration und space weathering erschweren Repräsentativität,
- Radar/Radio Science unterstützen Form-, Dichte- und Strukturmodelle,
- Spektroskopie liefert Oberflächenzusammensetzung,
- Sample Return bleibt die stärkste Ground Truth.

Ein lokales Spektrum darf nicht ungeprüft auf den gesamten Asteroiden hochgerechnet werden.

### 8.3 Phobos und Deimos

**Relevante Ziele:** Silikate, hydratisierte/volatile-bearing Phasen, organische Komponenten.

Besonderheiten:

- Herkunft und genaue Zusammensetzung sind weiterhin wissenschaftlich umstritten,
- Oberflächenregolith kann stark verarbeitet sein,
- Raman könnte spezifische Phasen identifizieren, sofern SNR und Footprint ausreichen,
- ein Phasennachweis löst die Herkunftsfrage nicht automatisch und quantifiziert keine nutzbare Volatilmenge.

### 8.4 Mars

**Relevante Ziele:** hydratisierte Minerale, Sulfate, Carbonate, Salze, Eis, organische Verbindungen.

Besonderheiten:

- Atmosphäre und Staub beeinflussen aktive und passive Optik,
- Oberflächenalteration kann ursprüngliches Material maskieren,
- reale Raman-Heritage durch SuperCam und SHERLOC existiert,
- orbitales Raman würde jedoch einen völlig neuen Reichweitenbereich darstellen.

Mars benötigt daher ein eigenes Photonbudget einschließlich atmosphärischer Transmission, Aerosolbeladung und Streuhintergrund.

---

## 9. Offene wissenschaftliche Fragen für 30–50-km-Raman

Engineering darf die folgenden Punkte nicht durch Setzungen verdecken:

1. Welche Raman-Photonenzahl pro Puls ist für relevante Minerale unter realistischen Regolithbedingungen zu erwarten?
2. Welche Laserenergie und Divergenz sind nötig, um bei 30–50 km genügend Irradianz im Footprint zu erreichen?
3. Welche Apertur ist erforderlich, um genügend rückgestreute Photonen zu sammeln?
4. Wie groß darf Pointing-Jitter sein, bevor Raman-Signal und räumliche Zuordnung unbrauchbar werden?
5. Welche Dwell Time steht bei realistischen Orbit-/Flyby-Geschwindigkeiten pro Footprint zur Verfügung?
6. Wie viele Pulse können auf denselben Zielbereich abgegeben werden?
7. Wie verändert Sonnenlicht das SNR bei Mond, Asteroid und Marsmonden?
8. Wie stark beeinflussen Regolithrauigkeit, Kornmischung und Staub die Raman-Spektren?
9. Welche Minerale/Phasen liefern ausreichend starke Raman-Banden, welche nicht?
10. Welche Falschpositiv-/Ambiguitätsraten entstehen bei Mischspektren?
11. Wie gut kann Time Gating Laser-Rücklauf, atmosphärische Beiträge und Hintergrund trennen?
12. Wie unterscheiden sich Vakuumziele von Mars hinsichtlich optischem Pfad und Streuung?
13. Welche thermischen, elektrischen und Lebensdauergrenzen setzen hochenergetische gepulste Laser im Raumfahrzeug?
14. Kann ein Instrument gleichzeitig die geforderte Spektralauflösung, Photonenempfindlichkeit, Apertur und Masseklasse erreichen?
15. Welche unabhängigen Sensoren sind zur Validierung jedes Raman-Befunds erforderlich?

Bis diese Punkte quantitativ geschlossen sind, bleibt die 30–50-km-Fähigkeit `[H]`.

---

## 10. Wissenschaftliche Mindestanforderungen an spätere Missionsmodelle

Ein späteres Engineering-Modell sollte mindestens folgende Größen explizit führen:

```text
range
relative_velocity
surface_track_rate
dwell_time
laser_wavelength
pulse_energy
pulse_width
pulse_repetition_rate
beam_divergence
spot_diameter
surface_irradiance
receiver_aperture
receiver_fov
optical_throughput
spectral_resolution
gate_delay
gate_width
detector_quantum_efficiency
dark_count/read_noise
solar_background
surface_albedo_or_BRDF
raman_cross_section_or_empirical_yield
pointing_error
jitter
surface_roughness
atmospheric_transmission (Mars)
aerosol_optical_depth (Mars)
required_SNR
number_of_pulses
```

Ein Ergebnis ohne diese Kopplung ist höchstens eine Konzeptskizze, kein validiertes Photonbudget.

---

## 11. Schlussfolgerung

**[R]** Raman ist ein leistungsfähiges Verfahren zur spezifischen Identifikation von Mineralen, molekularen Strukturen und bestimmten organischen/volatilen Phasen. Planetare Raman-Messungen sind auf Mars im Nah- und Meterbereich real demonstriert. Terrestrische Standoff-Systeme haben Raman bis etwa 120 m demonstriert.

**[H]** Der Sprung auf 30–50 km ist dagegen ein neues Regime. Das NIAC-Projekt ist wissenschaftlich plausibel genug für eine Machbarkeitsstudie, aber noch kein Beleg dafür, dass orbitales Raman mit missionstauglichem SNR, Footprint, Dwell Time und Leistungsbudget funktioniert.

Für planetare Ressourcenexploration ist Raman deshalb am stärksten als Teil einer **Sensorfusionskette**: spezifische Phasenidentifikation kombiniert mit passiver Spektroskopie, Neutron/Gamma, Radar/Geophysik, Geometrie/Altimetrie und schließlich lokaler Ground Truth.

Der wissenschaftlich zentrale Schutzsatz lautet:

> **Ein detektiertes Mineral ist eine Beobachtung. Eine Lagerstätte ist ein geologisches Modell. Eine Ressource benötigt Menge und Gewinnbarkeit. Eine Reserve benötigt zusätzlich technische und wirtschaftliche Rechtfertigung.**

---

## 12. Quellen

### Primär-/Missionsquellen

1. NASA NIAC (2026): **Interworld Slingshot Resource Surveys**. https://www.nasa.gov/directorates/stmd/niac/niac-studies/interworld-slingshot-resource-surveys/
2. NASA NIAC (2026): **NIAC 2026 Selections**. https://www.nasa.gov/directorates/stmd/niac/niac-studies/niac-2026-selections/
3. NASA: **Perseverance Science Instruments – SuperCam / SHERLOC**. https://science.nasa.gov/mission/mars-2020-perseverance/science-instruments/
4. NASA NTRS: Bhartia et al., **Perseverance’s SHERLOC Investigation**. https://ntrs.nasa.gov/citations/20210026490
5. NASA PDS: **SHERLOC instrument context**. https://pds.nasa.gov/ds-view/pds/viewContext.jsp?identifier=urn:nasa:pds:context:instrument:mars2020.sherloc
6. NASA: **Lunar Prospector**. https://science.nasa.gov/mission/lunar-prospector/
7. NASA PDS: **Lunar Prospector Neutron Spectrometer**. https://pds.nasa.gov/ds-view/pds/viewContext.jsp?identifier=urn:nasa:pds:context:instrument:lp.ns
8. NASA NTRS: **Global Hydrogen Abundances on the Lunar Surface**. https://ntrs.nasa.gov/citations/20220010737
9. NASA: **Dawn Science Payload – VIR / GRaND**. https://science.nasa.gov/mission/dawn/technology/science-payload/
10. NASA: **GeMini Plus – planetary gamma-ray spectroscopy**. https://science.nasa.gov/science-research/science-enabling-technology/technology-highlights/gemini-plus-enables-next-generation-planetary-composition-measurements/

### Peer-reviewed Raman / Instrumentation

11. Wiens et al. / SuperCam team (2021): **The SuperCam Instrument Suite on the Mars 2020 Rover: Science Objectives and Mast-Unit Description**, Space Science Reviews. https://link.springer.com/article/10.1007/s11214-021-00807-w
12. Manrique et al. / SuperCam team (2020): **The SuperCam Instrument Suite on the NASA Mars 2020 Rover: Body Unit and Combined System Tests**, Space Science Reviews. https://link.springer.com/article/10.1007/s11214-020-00777-5
13. Lopez-Reyes et al. (2025): **SuperCam Raman Activities at Jezero Crater, Mars: Observational Strategies, Data Processing, and Mineral Detections During the First 1000 Sols**, JGR Planets, DOI 10.1029/2025JE008943.
14. Misra, Sharma, Acosta, Porter & Bates (2012): **Single-Pulse Standoff Raman Detection of Chemicals from 120 m Distance during Daytime**, Applied Spectroscopy 66(11), 1279–1285. DOI 10.1366/12-06617.
15. Rull, Vegas, Sansano & Sobron (2011): **Analysis of Arctic ices by remote Raman spectroscopy**, Spectrochimica Acta Part A 80(1), 148–155. DOI 10.1016/j.saa.2011.04.007.

### Projektkontext / Standards

16. SETI Institute (2026): **A New Way to Find Resources in Space**. https://www.seti.org/news/a-new-way-to-find-resources-in-space/
17. CRIRSCO: **International Reporting Template / Standard Definitions**. https://crirsco.com/document-library/
18. U.S. SEC: **Regulation S-K Subpart 1300 – Disclosure by Registrants Engaged in Mining Operations**. https://www.ecfr.gov/current/title-17/chapter-II/part-229/subpart-229.1300
