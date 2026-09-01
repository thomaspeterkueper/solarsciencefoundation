# EXPERIMENT_MAP — semantischer Integritätsaudit

Stand: 2026-09-01
Status: Arbeits- und Reviewdokument

## Ziel

`PathRunner.EXPERIMENT_MAP` darf eine Komponente nur dann wiederverwenden, wenn das dargestellte Modell fachlich zum Learning Object passt. Ähnliche UI-Mechanik (Slider, Diagramm, Animation) ist **kein** ausreichender Grund für Wiederverwendung.

## Einstufung

- **A — passend:** gleiche fachliche Größe / gleicher Mechanismus oder bewusst generisches, fachlich korrekt parametriertes Modell.
- **B — prüfen/verbessern:** fachliche Nähe vorhanden, aber Komponente oder Benennung kann eine zu starke Analogie erzeugen.
- **C — ersetzen:** fachfremdes Modell; Wiederverwendung erzeugt falsches Lernen.

## Bereits korrigiert

- `EXP:NEUTRALISATION` → eigenes stöchiometrisches Neutralisationsmodell statt Critical Materials.
- `EXP:OXIDATION`, `EXP:CHLORGAS` → Chlor-/Hypochlorit-Modell statt Critical Materials bzw. Verbrennung.
- `EXP:POROESITAET` → Oberflächen-/Porositätsmodell statt DustGrain.
- `EXP:QUELLUNG` → hygroskopisches Quellungsmodell statt PipeFreezing.
- `EXP:ZELLTURGOR` → qualitatives Wasserpotential/Turgor-Modell statt DewPoint.
- `EXP:WISCHER-TECHNIK` → Wischergeometrie/-bewegung statt Evaporation.
- `EXP:OELEIGENSCHAFTEN` → Öl-/Viskositätsmodell statt Combustion.

## C — klare semantische Fehlzuordnungen

1. `EXP:POLARITAET → SpinExperiment`
   - Elektronen-/Spinmodell ist kein Modell molekularer Polarität.
   - Maßnahme: eigenes Dipol-/Elektronegativitätsmodell oder vorhandenes Wasserdipol-Modell nur bei explizit passendem Scope.

2. `EXP:DAMPFDRUCK-TEMP → DustGrainExperiment`
   - Dampfdruck/Temperatur und Staubkornmechanik sind fachlich verschieden.
   - Maßnahme: eigenes Dampfdruckmodell oder PhaseDiagram/Evaporation nur nach Prüfung der tatsächlich dargestellten Größe.

3. `EXP:OSMOSE → OriginOfLifeTimeline`
   - Timeline ist kein Osmosemodell.
   - Maßnahme: eigenes Membran-/Wasserpotential-Modell.

4. `EXP:HAERTE`, `EXP:MOHS → PiezoMaterialExperiment`
   - Piezoelektrische Materialeigenschaften modellieren keine Ritzhärte.
   - Maßnahme: eigenes Härte-/Ritzvergleichsmodell; Mohs nur für mineralogischen Ritzvergleich verwenden, nicht als universelle Werkstoffhärteskala.

5. `EXP:BATTERIE-ALTERUNG`, `EXP:BATTERIE-MANAGEMENT → ElectrolyzerExperiment`
   - Elektrolyseur ist kein Batteriealterungs- oder BMS-Modell.
   - Maßnahme: Batterie-spezifische Modelle.

6. `EXP:SCHNELLLADEN-SIMULATION`, `EXP:BESCHLEUNIGUNG-VERGLEICH → MaterialsDashboardExperiment`
   - Dashboard-Wiederverwendung ist ohne explizit generischen Datensatz semantisch nicht belastbar.
   - Maßnahme: Schnelllade-/Beschleunigungsmodelle separat prüfen und spezialisieren.

7. `EXP:ASPEKT → PiezoMaterialExperiment`
   - Identifier ist semantisch nicht selbsterklärend; Zuordnung zu Piezo-Materialien nicht begründbar.
   - Maßnahme: Ursprungs-Learning-Object lokalisieren und neu zuordnen oder Interaktivität entfernen.

8. `EXP:MOTOR-VERSCHLEISS`, `EXP:VERSCHLEISS-SIMULATION → PiezoMaterialExperiment`
   - Piezo-Materialvergleich ist kein Verschleißmodell.
   - Maßnahme: tribologisches Modell oder statische Verschleißdarstellung.

9. `EXP:POLAR-SORTIERER → MicelleExperiment`
   - Polarität/Sortierung und Mizellenbildung sind nicht dasselbe Modell.
   - Maßnahme: eigenes Polaritäts-/Löslichkeitsmodell.

10. `EXP:BUILDER → DensityErrorExperiment`
    - generischer Identifier, fachliche Bedeutung nicht aus Mapping ableitbar.
    - Maßnahme: Ursprung lokalisieren; keine Wiederverwendung ohne expliziten Mechanismus.

11. `EXP:GAUSS → LGSExperiment`
    - nur dann A, wenn tatsächlich Gauß-Elimination/LGS gemeint ist. Der Identifier allein reicht nicht.
    - Maßnahme: Learning Object prüfen und semantisch präziseren Identifier vergeben.

12. `EXP:HBRUECKEN → WheatstoneExperiment`
    - falls „H-Brücken“ Wasserstoffbrücken meint: klare Fehlzuordnung zur Wheatstone-Brücke.
    - Maßnahme: Ursprungsinhalt prüfen; bei Wasserstoffbrücken molekulares Modell verwenden.

## B — fachliche Nähe, aber Review erforderlich

- `EXP:OBERFLSPANNUNG → CapillaryExperiment`: Kapillarität hängt mit Oberflächenspannung zusammen, ist aber nicht identisch. Prüfen, ob die Komponente Oberflächenspannung selbst sichtbar macht.
- `EXP:DRUCK-BLASEN → PhaseDiagramExperiment`: Phasendiagramm kann Druck-/Siedezusammenhänge zeigen; „Blasen“ benötigt ggf. Keimbildung/Sieden als eigenes Modell.
- `EXP:OBERFLAECHE-VOLUMEN → WaterHeatCapacityExperiment`: Oberfläche/Volumen ist geometrisch; Wärmekapazität ist eine andere Größe. Wahrscheinlich C nach Ursprungsprüfung.
- `EXP:WAERMETRANSPORT → WaterHeatCapacityExperiment`: Wärmekapazität beeinflusst Energiespeicherung, ist aber nicht Wärmetransport. Wahrscheinlich C.
- `EXP:ROSETTE → HookeExperiment`: bei DMS-Rosette nur teilweise passend; Rosettengeometrie und Dehnungsrekonstruktion fehlen möglicherweise.
- `EXP:ZENTRIFUGAL-SIMULATION → TorqueExperiment`: Drehmoment und Zentrifugal-/Zentripetalzusammenhang sind verschieden. Wahrscheinlich C.
- `EXP:SCHALLDAEMPFUNG → FourierExperiment`: Spektralanalyse kann Dämmwirkung darstellen, aber nur wenn Ein-/Ausgangsspektrum explizit modelliert wird.
- `EXP:GEWICHT-TRAKTION`, `EXP:HAFTUNG-REIBUNG → BrakeEnergyExperiment`: Bremsenergie ist nicht automatisch Reibungs-/Traktionsmodell.
- `EXP:KRAFT-DREHZAHL → FourStrokeExperiment`: Motortakt und Drehmoment-/Drehzahlkennfeld sind verschieden.
- `EXP:ARBEITSPUNKT → DiodeExperiment`: passend nur bei elektrischem Dioden-Arbeitspunkt; Kontext prüfen.
- `EXP:AUSWERTUNG → DensityErrorExperiment`: generischer Identifier; fachliche Bedeutung muss explizit gemacht werden.

## A — derzeit plausible Wiederverwendung

Beispiele: Rayleigh/Atmosphärenweg, Vektorrechner/Skalar, thermische Dehnung, Hooke, Poisson, Wheatstone-Brücke, Diodenkennlinie, Fourier/Wellenmischung, Wasser-Molekül, Erwärmungskurve, Dichteanomalie, Taupunkt, Phasendiagramm, Verdunstung, Kapillarität (für Kapillar-Learning-Objects), Rohrsprengung durch Gefrieren, Viertakt/Kolbenmechanik, Bremsenergie/Reibungswärme, Verbrennungschemie/-temperatur, Emulsion/Emulgator, Kollagen/Gelatine, Mizelle/Tensid, Batterie Laden/Entladen/Innenwiderstand, Pumpenmodelle, Magnetismusmodelle, Piezo-Funke/DMS, Hohmann-Transfer, NOXIA Wasser- und Ressourcenketten.

## Architekturproblem

Der Audit zeigt ein strukturelles Problem: `EXPERIMENT_MAP` ist ein großer globaler String→Component-Switch. Dadurch kann ein fachlich falsches Mapping technisch völlig gültig sein.

### Empfohlene Härtung

1. Experiment-Metadaten einführen: `id`, `component`, `domains`, `concepts`, `modelType`.
2. Learning Sections deklarieren neben `interactiveId` den erwarteten Concept-/Domain-Scope.
3. Registry-Test schlägt fehl, wenn Experiment- und Section-Scope nicht kompatibel sind.
4. Generische IDs wie `EXP:ASPEKT`, `EXP:AUSWERTUNG`, `EXP:BUILDER` aus aktiven Pfaden entfernen bzw. semantisch umbenennen.
5. Fehlende Experimente nicht durch fachfremde Komponenten ersetzen. Statische Schema-/Erklärsektion ist der korrekte Fallback.

## Nächste Abarbeitungsreihenfolge

1. Polarität / H-Brücken / Osmose
2. Härte / Mohs / Verschleiß
3. Batteriealterung / BMS / Schnellladen
4. Oberfläche-Volumen / Wärmetransport / Zentrifugal
5. generische IDs `ASPEKT`, `AUSWERTUNG`, `BUILDER`
6. verbleibende B-Fälle einzeln anhand ihrer Learning Objects klassifizieren
