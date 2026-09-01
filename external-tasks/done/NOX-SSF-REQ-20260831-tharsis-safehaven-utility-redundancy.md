---
id: NOX-SSF-REQ-20260831-THARSIS-SAFEHAVEN-UTILITY-REDUNDANCY
requester: SYS:KUEPER:noxia
target: SYS:KUEPER:ssf
priority: medium
type: focused-evidence-check
created: 2026-08-31
completed: 2026-09-01
status: done
affects: [SSF, OTA, NOXIA]
---

# Tharsis Hub — Evidenzcheck zu Safe-Haven und Medienredundanz

## Ergebnis

### 1. Safe Haven / temporäre Überbelegung

**[R] NASA-Human-Rating-Prinzip:** Safe Haven ist eine Überlebensfähigkeit für eine lebensbedrohliche Anomalie bis Reparatur oder Rettung; sie ist nicht automatisch eine zweite vollwertige Wohnanlage. NASA-Leitlinien betonen Survival Modes, funktionale Redundanz, vorpositionierte Verbrauchsgüter und Logistik statt einer pauschalen prozentualen Reserve-Wohnkapazität.

**[R] ISS / Crew Transportation:** Für ein angedocktes Crewfahrzeug existiert ein konkretes Safe-Haven-Beispiel: bis zu 6 h auf interner Fahrzeugleistung und weitere 18 h bei wiederhergestellter ISS-Leistung. Bei ISS-Notfällen werden gefährdete Sektionen nach Möglichkeit isoliert; bei nicht isolierbaren schweren Ereignissen erfolgt Rückzug in Crewfahrzeuge/Evakuierung.

**[R] Exploration-Class Habitats:** NASA-Studien für Deep-Space-Habitate untersuchen kleine Safe-Havens mit etwa 30 Tagen Wiederherstellungszeit sowie vollständige, gleich große Zweitvolumina für Full-Duration-Survival. Das Common-Habitat-Konzept kombiniert Airlock, Logistikmodule und Druckrover zu einer sekundären Umgebung und erreicht im untersuchten 8-Personen-Konzept mindestens 30 Tage. Dies zeigt ausdrücklich, dass vorhandene Druckvolumina und mobile/Logistik-Elemente gemeinsam als Notunterkunft genutzt werden können.

**[R] Druckverlust / kontaminierte Atmosphäre:** Orion kann über Anzüge und geschlossenes Lebenserhaltungssystem eine positive, atembare Umgebung und Kühlung bis zu 144 h für suited crewmembers aufrechterhalten. NASA fordert Druckanzüge bzw. äquivalente Schutzmaßnahmen für Szenarien, in denen die Kabine ihre Atmosphäre nicht ausreichend halten kann.

**[S] Für Tharsis:** Die belastbare Analogie ist daher nicht „x % freie Betten“, sondern eine definierte **Survival Capacity** je Schadensfall und Dauer. Ein Cluster darf nominal nahezu voll belegt sein, wenn die Architektur nach Verlust eines Segments eine vorher festgelegte Zahl Menschen in verbleibende isolierbare Volumina aufnehmen und dort Atmosphäre, CO2-Abfuhr, O2, thermische Kontrolle, Wasser, minimale Hygiene/Sanitärfunktion und Notverpflegung für die festgelegte Reparatur-/Evakuierungsdauer tragen kann.

**[A] Nicht belegt:** Es wurde keine allgemeine NASA/ESA-Regel gefunden, nach der eine Langzeitsiedlung pauschal z. B. 10 %, 20 % oder 1 komplettes Habitatcluster als freie Wohnkapazität vorhalten muss. Eine solche Prozentzahl darf NOXIA/OTA nicht als Realstandard darstellen.

### 2. Redundanz kritischer Medien

**[R] Systemprinzip:** NASA-Human-Rating fordert Überlebensmodi bei Verlust kritischer Funktionen und betrachtet funktionale bzw. bei Common-Cause-Risiken auch dissimilar redundancy. ECLSS umfasst gekoppelte Funktionen für Atmosphäre, Feuerdetektion/-bekämpfung, O2, Ventilation, Wasser und Abfall; Gateway verteilt ECLSS-Funktionen über mehrere Module, die im offenen Verbund zusammenarbeiten.

**[R] Safe-Haven-Architektur:** Das Common-Habitat-Konzept nutzt mehrere physische Elemente und Utility-Sharing über Docking-Schnittstellen. Redundanz entsteht damit nicht zwingend durch zwei identische Leitungsnetze, sondern durch Kombination aus Segmentierung, alternativen Versorgungswegen, lokalen Reserven und rekonfigurierbaren Elementen.

**[S] Plausible Tharsis-Architektur je Medium:**

- **Elektrische Leistung:** räumlich getrennte Feeder/Busse zu kritischen Lasten, Cross-Ties und lokale Notenergie; gemeinsame Fehlerursachen vermeiden.
- **Daten/Steuerung:** physisch/logisch redundante Pfade und lokale autonome Steuerfähigkeit für lebenswichtige Funktionen.
- **O2 / Kabinenatmosphäre:** isolierbare Drucksegmente, lokale Not-O2-/Atemreserven sowie rekonfigurierbare Verbindungen; nicht auf einen einzigen zentralen Pfad angewiesen.
- **Trinkwasser:** segmentierbare Verteilung plus lokale Vorräte. Vollständiges doppeltes Rohrnetz ist nicht aus den Quellen als generelle Pflicht ableitbar.
- **Prozesswasser / Prozessgase:** Redundanz nach Kritikalität; industrielle Versorgung muss nicht dieselbe Survival-Klasse wie Atemgas besitzen.
- **Abwasser:** Absperr-/Bypass- und lokale Pufferfähigkeit sind plausibler als zwingend zwei komplette parallele Abwassernetze.
- **Thermische Kreise:** segmentierte/isolierbare Kreise, alternative Wärmeabfuhr für kritische Zonen und Lastabwurf; Verlust der Wärmeabfuhr kann selbst einen Safe-Haven-Fall auslösen.

**[S] Kernaussage:** „Zwei vollständige Backbones für jedes Medium“ ist als pauschale Architektur **nicht** evidenzbasiert. Für Tharsis ist eine **mediumspezifische Redundanzmatrix** technisch plausibler: Kritikalität × zulässige Ausfallzeit × Segmentierbarkeit × lokale Reserve × alternativer Pfad × Reparierbarkeit.

### 3. Konsequenz für die 497-Personen-Konfiguration

**[S]** Die vorhandenen Zahlen `497 Bewohner / 504 nominale Plätze` reichen allein weder zum Bestätigen noch zum Verwerfen der Architektur. Die sieben freien Nominalplätze sind keine belastbare Safe-Haven-Kapazität. OTA/NOXIA sollten stattdessen mindestens folgende Designfälle dimensionieren:

1. Verlust eines einzelnen Drucksegments;
2. Brand/Rauch/Kontamination eines Segments bei erhaltener Druckhülle;
3. Verlust eines Habitatclusters bzw. seines kritischen Utility-Anschlusses;
4. Ausfall eines primären Utility-Backbones;
5. gleichzeitiger Common-Cause-Ausfall, soweit durch räumliche Trennung nicht ausgeschlossen.

Für jeden Fall müssen Evakuierte, Zielvolumen, Dauer und minimale Survival-Leistungen explizit bilanziert werden. Erst daraus folgt, ob zusätzliche Druckräume, lokale Vorräte oder Utility-Kapazitäten erforderlich sind.

## Primärquellen / technische Anker

- NASA, *Safe Haven Configurations for Deep Space Transit Habitats*, NTRS 20170012311 / 20170012304.
- NASA, Robert L. Howard Jr., *A Safe Haven Concept for the Common Habitat in Moon, Mars, and Transit Environments*, NTRS 20210020788 (2021).
- NASA, *ISS Crew Transportation and Services Requirements Document*, CCT-REQ-1130 Rev. F, §3.4.2.5 ISS Safe Haven.
- NASA, *Crew Systems / Orion ECLSS* — 144-hour suited survival capability for pressure-vessel leak or contaminated atmosphere.
- NASA, *Environmental Control and Life Support Systems (ECLSS)* — Water Recovery, Air Revitalization, Oxygen Generation and environmental functions.
- NASA, *Gateway Integrated ECLSS Overview and Status*, NTRS 20230015263.
- NASA Human-Rating Requirements, NPR 8705.2 / 8705.2A — survival modes, safe haven and functional/dissimilar redundancy principles.

## Übergabe

Das Ergebnis liefert ausschließlich realwissenschaftliche/Engineering-Anker. Es legt keine NOXIA-Spielwerte und keine OTA-Objektarchitektur fest. Die kanonische Tharsis-Architektur muss im zuständigen OTA-Kontext entschieden werden; NOXIA kann danach die bestätigte Architektur implementieren.
