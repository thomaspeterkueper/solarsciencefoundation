# KG-REQ-20260719-duplicate-path-id — PATH:SSF:PHY-SKY-0001 doppelt vergeben

ID: REQ:L3:PENDING
Requester: SYS:KUEPER:knowledge-graph
Recipient: SYS:KUEPER:ssf
Request Type: correction
Status: open
Created: 2026-07-19

## Anlass

Bei der Aufarbeitung von `KG-REQ-20260718-002`/`003` (KG-Sync gegen `lib/learningPaths.ts`
v1.0.2) wurde festgestellt: `PATH:SSF:PHY-SKY-0001` ist **zweimal** vergeben, mit
unterschiedlichem Inhalt:

| Zeile | subtitle | suppliedBy.ssf |
|---|---|---|
| 255 | „Von der Farbe des Himmels zu Sonnenuntergaengen: Rayleigh-Streuung, Wellenlaenge und das Auge." | (leer) |
| 377 | „Von Rayleigh-Streuung zu Sonnenuntergaengen und Mondfinsternissen — dasselbe Prinzip, zwei Perspektiven." | „Rayleigh-Experiment (lambda^-4 live)", „Atmosphaeren-Weglaengen-Slider", „Seitenast Mie-Streuung" |

Beide tragen `sourceModuleId: 'SSF-PHY-1103'` und `kxfModuleId: 'LRN:SSF:PHY-1103'`.
Der zweite Eintrag wirkt inhaltlich weiter entwickelt (reichhaltigeres `suppliedBy.ssf`),
vermutlich ein Überarbeitungsstand, der den ersten hätte ersetzen sollen.

## Gewünschte Änderung

Einen der beiden Einträge entfernen (vermutlich den ersten, Zeile ~254–309) oder beide
unter unterscheidbaren IDs führen, falls beide bewusst erhalten bleiben sollen.

## Begründung

Eine doppelt vergebene ID verhindert eine eindeutige KG-Registrierung — der KG kann
nicht wissen, welche Fassung kanonisch werden soll.

## Betroffene Repositories

- `solarsciencefoundation` (Korrektur, 1 Datei: `lib/learningPaths.ts`)

## Erwartetes Ergebnis

`PATH:SSF:PHY-SKY-0001` existiert genau einmal in `lib/learningPaths.ts`.

## Hinweise

Nicht blockierend für den laufenden Betrieb, aber blockierend für die vollständige
KG-Registrierung dieses Pfads im Rahmen von `KG-REQ-20260718-003`.
