# EXPERIMENT_MAP — semantischer Integritätsaudit

Stand: 2026-09-06
Status: laufender Audit; die ursprünglich identifizierten C- und B-Zuordnungen sind weitgehend bereinigt.

## Ziel

Ein Experiment darf nur wiederverwendet werden, wenn das dargestellte fachliche Modell zum Learning Object passt. Ähnliche UI-Mechanik wie Slider, Diagramm oder Animation ist kein ausreichender Grund für Wiederverwendung.

Leitprinzip: **Interaktiv, wo Interaktion Erkenntnis erzeugt. Visuell, wo Darstellung genügt.**

## Einstufung

- **A — passend:** gleiche fachliche Größe / gleicher Mechanismus oder bewusst generisches, fachlich korrekt parametriertes Modell.
- **B — prüfen/verbessern:** fachliche Nähe vorhanden, aber Komponente oder Benennung kann eine zu starke Analogie erzeugen.
- **C — ersetzen:** fachfremdes Modell; Wiederverwendung erzeugt falsches Lernen.

## Bereinigte Fehlzuordnungen

### Chemie / Wasser / Reinigung

- `EXP:POLARITAET` → eigenes Polaritäts-/Dipolmodell statt Spinmodell.
- `EXP:HBRUECKEN` → eigenes Wasserstoffbrückenmodell statt Wheatstone-Brücke.
- `EXP:OSMOSE` → eigenes Osmosemodell statt Origin-of-Life-Timeline.
- `EXP:POLAR-SORTIERER` → eigenes Polaritäts-/Löslichkeitsmodell statt Mizellenmodell.
- `EXP:OBERFLSPANNUNG` → eigenes Oberflächenspannungsmodell statt Kapillaritätsmodell.
- `EXP:DAMPFDRUCK-TEMP` → eigenes Dampfdruck-/Siedemodell statt DustGrain.
- `EXP:DRUCK-BLASEN` → Dampfdruck-/Siedemodell; Blasenbildung wird nicht mit einem reinen Phasendiagramm verwechselt.
- `EXP:NEUTRALISATION` → stöchiometrisches Neutralisationsmodell.
- `EXP:OXIDATION`, `EXP:CHLORGAS` → Chlor-/Hypochlorit-Modell.
- `EXP:POROESITAET` → Oberflächen-/Porositätsmodell.
- `EXP:QUELLUNG` → hygroskopisches Quellungsmodell.
- `EXP:ZELLTURGOR` → qualitatives Wasserpotential/Turgor-Modell.
- `EXP:WISCHER-TECHNIK` → Wischergeometrie/-bewegung.
- `EXP:OELEIGENSCHAFTEN` → Öl-/Viskositätsmodell.

### Werkstoffe / Messtechnik

- `EXP:MOHS` → Ritzhärtemodell; Mohs wird nicht als universelle Werkstoffhärte behandelt.
- Legacy `EXP:HAERTE` wird kontextbezogen auf `EXP:WASSERHAERTE` oder `EXP:PIEZO-MATERIALVERGLEICH` normalisiert.
- `EXP:MOTOR-VERSCHLEISS`, `EXP:VERSCHLEISS-SIMULATION` → tribologisches Verschleiß-Lehrmodell.
- `EXP:ROSETTE` → eigenes 0°/45°/90°-DMS-Rosettenmodell mit Hauptdehnungsrekonstruktion.
- `EXP:AUSWERTUNG` → `EXP:DMS-MEASUREMENT-CHAIN`; idealisierte DMS-Messkette statt generischem Fehlerexperiment.
- `EXP:ASPEKT` → `EXP:EDM-ASPECT-RATIO`; Tiefe/Durchmesser-Modell statt Piezo-Materialvergleich.
- `EXP:BUILDER` → `EXP:ERROR-PROPAGATION-BUILDER`; Unsicherheitsbeiträge statt Kugeldichte-spezifischer UI.

### Batterie / Fahrzeug / Mechanik

- `EXP:BATTERIE-ALTERUNG` → batterie-spezifisches Temperatur-/BMS-Lehrmodell.
- `EXP:BATTERIE-MANAGEMENT` → eigenes BMS-Zustandsmodell.
- `EXP:SCHNELLLADEN-SIMULATION` → eigenes SOC-/Temperatur-/Laderatenmodell.
- `EXP:HAFTUNG-REIBUNG`, `EXP:GEWICHT-TRAKTION` → Traktions-/Lastverlagerungsmodell statt Bremsenergie.
- `EXP:KRAFT-DREHZAHL` → Drehmoment-/Drehzahl-/Leistungsmodell statt Viertaktanimation.
- `EXP:BESCHLEUNIGUNG-VERGLEICH` → vereinfachtes Leistungs-/Masse-/Traktionsmodell statt MaterialsDashboard.
- `EXP:ZENTRIFUGAL-SIMULATION` → Zentripetalmodell statt Drehmomentmodell.

### Wärme / Akustik

- `EXP:OBERFLAECHE-VOLUMEN` → geometrisches O/V-Modell statt Wärmekapazität.
- `EXP:WAERMETRANSPORT` → Wärmeleitungsmodell statt Wärmekapazität.
- `EXP:SCHALLDAEMPFUNG` → frequenzabhängiger Ein-/Ausgangsspektrumsvergleich statt bloßer Fourier-Wiederverwendung.

## Bestätigte A-Fälle aus der B-Liste

- `EXP:ARBEITSPUNKT → DiodeExperiment` ist im konkreten Learning Object tatsächlich Diodenkennlinie + Lastgerade + Arbeitspunkt und damit semantisch passend.
- `EXP:GAUSS → LGSExperiment` darf nur aktiv bleiben, wenn das konkrete Learning Object Gauß-Elimination eines linearen Gleichungssystems meint; ansonsten muss die ID umbenannt werden.

## Architekturstatus

Der frühere große String→Component-Switch wurde bereits in eine lesbare Registry und einen semantischen Resolver aufgeteilt. Der Resolver dient derzeit vor allem dazu, Legacy-IDs kontrolliert auf eindeutige semantische IDs bzw. spezialisierte Komponenten zu normalisieren.

Noch sinnvoll als nächste Härtung:

1. Experiment-Metadaten vollständig React-unabhängig halten: `id`, `domains`, `concepts`, `modelType`, optional Modellannahmen.
2. Learning Sections einen erwarteten Concept-/Domain-Scope deklarieren lassen.
3. Tests so erweitern, dass fachlich inkompatible Section↔Experiment-Zuordnungen fehlschlagen.
4. Generische Legacy-IDs (`EXP:HAERTE`, `EXP:ASPEKT`, `EXP:AUSWERTUNG`, `EXP:BUILDER`) schrittweise aus den eigentlichen Lernpfaddaten entfernen; Resolver nur noch als Migrationsschicht verwenden.
5. Fehlende Experimente weiterhin fail-closed behandeln: keine fachfremde Komponente als Platzhalter.

## Offene Reviewpunkte außerhalb des reinen Mappings

Der Mapping-Audit ist nicht identisch mit einem vollständigen Science-Review der Lerntexte. Mehrere Legacy-Pfade enthalten weiterhin zu absolute oder didaktisch problematische Aussagen, unter anderem zu Mohs-Härte, Fensterreinigung, Holz, Motor-/Batteriekennwerten und einzelnen Wasser-/Oberflächen-Erklärungen. Diese müssen separat in den aktiven Pfaden bereinigt bzw. durch spezialisierte Pfade superseded werden.
