---
id: EXT-KG-SSF-20260831-permanent-magnet-material-data
title: Verifizierte Werkstoffdaten für MAG-004/005 übernehmen
status: open
source: KG
target: SSF
created: 2026-08-31
requested_by: research-validation-loop
priority: medium
affects: [KG, SSF]
---

## Anlass

Research Candidate `RES-20260831-EAA9EDD9` wurde im Knowledge Graph als nicht-kanonischer Evidenzanker aufgenommen. Er liefert quellenverifizierte Eigenschaftsdaten für die vier Permanentmagnet-Klassen, die in `MAG-004`/`MAG-005` verglichen werden: Ferrit, AlNiCo, SmCo und NdFeB.

Der Candidate bestätigt die qualitative Grundrichtung des Curriculums, liefert aber belastbarere Zahlenbereiche und drei wichtige didaktische Präzisierungen.

## Anforderung an SSF

Bitte `modules/materials/MAG-004.yaml` und den relevanten Vergleichs-/Anwendungsteil von `MAG-005` gegen den Evidenzanker prüfen und die SSF-eigenen Lerninhalte entsprechend aktualisieren.

### 1. Vergleichswerte quellengebunden führen

Für Tabellen und Vergleiche möglichst Bereiche bzw. konkrete Sortenwerte statt scheinbar universeller Einzelwerte verwenden. Besonders relevant sind:

- Curie-Temperatur,
- maximale Einsatztemperatur,
- maximales Energieprodukt `(BH)max`,
- Koerzitivfeldstärke,
- Korrosionsverhalten,
- relative Kosten,
- Seltene-Erden-/kritische-Rohstoff-Abhängigkeit,
- Recyclingstatus.

### 2. Ferrit

- preisgünstigste Klasse,
- keine Seltenen Erden,
- sehr gute Korrosionsbeständigkeit,
- deutlich geringeres Energieprodukt als NdFeB/SmCo,
- typische Einsatztemperatur deutlich höher als bei Standard-NdFeB.

Keine einzelne Kohäsions-/Materialzahl als allgemeingültigen Ferritwert behandeln; Sorten unterscheiden sich.

### 3. AlNiCo

Die didaktisch wichtigste Einschränkung klar hervorheben: **nicht die Temperaturbeständigkeit, sondern die relativ geringe Koerzitivfeldstärke ist die zentrale Auswahlrestriktion.** Dadurch besteht erhöhte Entmagnetisierungsgefahr in Gegenfeldern.

AlNiCo besitzt sehr hohe Curie-/Einsatztemperaturen und gute Korrosionsbeständigkeit, enthält aber erhebliche Kobaltanteile.

### 4. SmCo

- hohe Temperaturbeständigkeit,
- hohe Koerzitivität,
- gute bis sehr gute Korrosionsbeständigkeit,
- höchste Kostenklasse pro kg im Vergleich,
- kritische Rohstoffabhängigkeit durch Samarium und Kobalt.

SmCo5 und Sm2Co17 nicht unnötig zu einem einzigen exakten Zahlenwert zusammenziehen; sie unterscheiden sich deutlich bei Curie-Temperatur, Energieprodukt und Einsatztemperatur.

### 5. NdFeB

- stärkster kommerzieller Permanentmagnet im Vergleich,
- hohes Energieprodukt und gutes Preis-pro-Fluss-Verhältnis,
- sortenabhängige Einsatztemperatur; hochenergetische N50/N52-Sorten sind thermisch besonders eingeschränkt,
- **intrinsisch korrosionsanfällig; Beschichtung/Schutz ist konstruktiv wesentlich**,
- hohe Abhängigkeit von Nd/Pr sowie bei Hochtemperatur-/Hochkoerzitivsorten häufig Dy/Tb.

Nicht pauschal „NdFeB bis 200 °C“ o. Ä. lehren; der zulässige Temperaturbereich ist stark sortenabhängig.

### 6. Rohstoffe und Recycling

Die Lernmodule dürfen die qualitative Supply-Chain-Aussage verwenden, dass NdFeB und SmCo stark von Seltenen Erden und konzentrierten Verarbeitungsketten abhängen. Zeitabhängige Markt-/Exportkontrollzahlen nur mit Datum und Quelle nennen und nicht als zeitlosen Kanonwert behandeln.

Beim Recycling klar zwischen theoretischer/technischer Recyclingfähigkeit, heutigen End-of-Life-Quoten und im Aufbau befindlichen industriellen Kreisläufen unterscheiden.

## Source-of-Truth-Grenze

KG hält die kanonischen Magnet-/Materialbegriffe und den Research Candidate. SSF bleibt Source of Truth für Didaktik, Lerntext, Aufgaben, Reihenfolge und redaktionelle Lerndauer. Der Candidate soll nicht 1:1 als Lerntext übernommen werden.

## Erwartetes Ergebnis

MAG-004/005 vergleichen Ferrit, AlNiCo, SmCo und NdFeB mit quellengebundenen, sortenbewussten Wertebereichen und vermitteln die tatsächlichen Auswahlrestriktionen: Feldstärke/Energieprodukt, Entmagnetisierungsfestigkeit, Temperatur, Korrosion, Kosten und Rohstoffabhängigkeit.

## Referenz

- Research ID: `RES-20260831-EAA9EDD9`
- KG-Pfad: `research/candidates/RES-20260831-EAA9EDD9.md`
