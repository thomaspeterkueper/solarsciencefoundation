---
id: NOX-SSF-REQ-20260830-EXTERNAL-MARS-EVIDENCE-AUDIT
requester: SYS:KUEPER:noxia
target: SYS:KUEPER:ssf
priority: high
type: research-evidence-audit
created: 2026-08-30
status: open
affects: [SSF, OTA, NOXIA]
---

# Evidenzaudit: externe Recherche zu Tharsis Hub / 497 Personen

## Anlass

Nach Abschluss der SSF-Research-Note `docs/research/minimum-viable-mars-colony-497.md` wurde eine zusätzliche externe Recherche zu den drei priorisierten Unsicherheiten Energie, Thermalkontrolle und Habitatdimensionierung durchgeführt. Als Nebenprodukte liegen neue Angaben zu O2/CO2 und Wasser-ISRU vor.

Die externe Recherche ist ausdrücklich **nicht kanonisch**. Bitte Primärquellen, Berechnungen, Begriffsabgrenzungen und Kombinierbarkeit prüfen, bevor Werte in die SSF-Basisnote oder OTA-Dossiers übernommen werden.

## Zu prüfende externe Befunde

### 1. Energie

- NASA Kilopower/FSP als realer Technologieanker.
- Referenzarchitektur: mehrere kleine Reaktormodule mit Redundanz statt eines einzelnen Erzeugers.
- Externe lineare Vergleichsrechnung aus 40–100 kWe für kleine Marscrews ergibt für 497 Personen grob 8–10 MW, wird aber selbst als methodisch naiv gekennzeichnet.
- Bisheriger SSF-Arbeitsbereich: 3–5 MW mittlere Last, 5–8 MW Spitze.

**Auditfrage:** Die 3–5 MW nicht durch lineare Personenskalierung bestätigen oder verwerfen, sondern soweit möglich durch eine Bottom-up-Lastbilanz der in OTA-TEC-0038 definierten Subsysteme eingrenzen. Welche Lastanteile sind belastbar, welche bleiben Architekturannahme?

### 2. Thermalkontrolle

Externe Referenzangaben:
- ISS-Radiatoren: aus den angegebenen Flächen-/Leistungswerten etwa 166 W/m2 abgeleitet.
- weiteres Radiatorkonzept: etwa 370 W/m2 bei höherer/anderer thermischer Auslegung.
- daraus für 3–6 MW grobe Radiatorflächen von etwa 8.000–36.000 m2.

**Auditfrage:** Quellen und Flächenrechnung prüfen. Vor allem klären, welche Radiator-Betriebstemperatur(en), Emissivität, ein-/zweiseitige Abstrahlung und Mars-Randbedingungen für eine plausible Koloniearchitektur angesetzt werden dürfen. Keine einzelne Fläche kanonisieren, solange diese Parameter nicht feststehen.

**Offene Forschung:** quantitative Mars-Staubwirkung auf Radiatoroberflächen bzw. geeignete Analogiequellen identifizieren.

### 3. Habitat / NHV

Externe Recherche nennt NASA-HIDH-basierte Mindestwerte um 25 m3 Net Habitable Volume pro Person und verweist auf Mehrfachnutzung von Funktionsräumen sowie Wachstumsreserve.

Für 497 Personen ergäbe eine reine Multiplikation ca. 12.425 m3 NHV. Das ist nicht automatisch mit den bisherigen SSF-Werten von 40.000–60.000 m3 gesamtem druckbeaufschlagtem Volumen vergleichbar.

**Auditfrage:** Begriffe strikt abgrenzen: NHV, funktionales Nutzvolumen, Bruttodruckvolumen, technische Volumina, Lager/Schleusen/Verbindungen. Prüfen, ob und wie die bisherige SSF-Habitatspanne korrigiert oder lediglich präziser benannt werden muss.

**Offene Forschung:** technisch/sicherheitsseitig sinnvolle maximale Größe eines unabhängig isolierbaren Druck-/Brandsegments. Keine willkürliche 50–150-Personen-Segmentgröße übernehmen.

### 4. O2 / CO2

Externe BVAD-Angaben:
- ca. 0,84 kg O2/Person/Tag
- ca. 1,00 kg CO2/Person/Tag

Skaliert auf 497 Personen etwa 417,5 kg O2/Tag und 497 kg CO2/Tag. Dies liegt nahe an der bestehenden SSF-Basis von etwa 408 kg O2/Tag und 517 kg CO2/Tag.

**Auditfrage:** Referenzen und unterschiedliche Aktivitäts-/Missionsannahmen vergleichen. Erwartung: bestehende Größenordnung bestätigen, nicht künstlich auf einen einzigen Wert vereinheitlichen.

Die externe Recherche nennt außerdem ISS-Elektrolyseeinheiten mit wenigen kg O2/Tag und folgert, dass 497 Personen Großanlagen/skalierte Prozessstränge statt Dutzender unveränderter ISS-Einheiten erfordern. Diese Schlussfolgerung bitte technisch prüfen, ohne vorschnell eine konkrete OTA-Anlagenzahl festzulegen.

### 5. Wasser-ISRU — prioritäre Diskrepanz

SSF bisher: für Szenario B etwa 0,3–0,8 t/Tag gesicherte Netto-Nachspeisefähigkeit unter Berücksichtigung eines stark geschlossenen Wasserkreislaufs.

Externe Recherche zitiert eine Marskolonie-Studie mit etwa 0,12 kg/h/Person verbleibendem ISRU-Bedarf bei 90 % Rückgewinnung, einschließlich weiterer Verbraucher wie Regolithverarbeitung, Fertigung, Perchloratbehandlung, Pflanzenbau und Habitatwartung. Lineare Skalierung auf 497 Personen ergibt etwa 1,43 t/Tag.

**Auditfrage:** Das ist wahrscheinlich keine direkte Widerlegung der SSF-Zahl, weil unterschiedliche Systemgrenzen vorliegen. Bitte die Verbraucherkategorien beider Ansätze explizit gegenüberstellen und mindestens unterscheiden:
1. menschlicher/ECLSS-Nachspeisebedarf,
2. Nahrungs-/Pflanzenproduktion,
3. industrielle/ISRU-Prozesswässer,
4. Verluste/Leckage/Wartung,
5. einmalige bzw. chargenweise Prozessbedarfe.

Danach eine für OTA brauchbare Wasserbilanz mit getrennten Kreisläufen bzw. Systemgrenzen zurückgeben.

Die externe Recherche nennt außerdem als Beispiel Mikrowellen-Regolithverarbeitung mit 385 kg/h Regolith und 7,7 kg/h Wasseroutput pro Verarbeitungseinheit. Quelle, Randbedingungen und Übertragbarkeit auf den Standort Tharsis bitte prüfen; keine Anlagenzahl aus der einfachen Division übernehmen.

## Gewünschtes Ergebnis

Bitte einen kurzen Auditbericht erstellen, der jeden Befund klassifiziert als:

- bestätigt / direkt übernehmbar,
- bestätigt, aber nur unter klaren Randbedingungen,
- als Größenordnung brauchbar,
- methodisch ungeeignet,
- Quelle/Randbedingung nicht ausreichend,
- weiterer Forschungsbedarf.

Anschließend die bestehende SSF-Research-Note nur dort aktualisieren, wo der Audit eine Änderung rechtfertigt. Änderungen müssen sichtbar zwischen [R], [S] und [A] unterscheiden.

## Übergabe an OTA

Der laufende OTA-Auftrag `NOX-OTA-REQ-20260830-THARSIS-HUB-PHASE2-OBJECT-DOSSIERS` soll die auditierten Ergebnisse verwenden. Besonders relevant sind Energieanlage, Thermalkontrolle, Habitatcluster, Wasser-ISRU/ECLSS sowie Straßen-/Medienlayout. Nicht auditierte externe Zahlen dürfen nicht als kanonische OTA-Parameter übernommen werden.