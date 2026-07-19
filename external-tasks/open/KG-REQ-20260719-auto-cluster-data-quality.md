# KG-REQ-20260719-auto-cluster-data-quality — Auto-Cluster systematisch fehlerhaft

ID: REQ:L3:PENDING
Requester: SYS:KUEPER:knowledge-graph
Recipient: SYS:KUEPER:ssf
Request Type: correction
Status: open
Created: 2026-07-19
Source: KG-REQ-20260718-002 (Aufarbeitung)

## Anlass

Bei der Registrierung der SSF-Cluster im KG (`KG-REQ-20260718-002`) wurde der
„Auto"-Cluster (7 Pfade) systematisch auffällig — beide Probleme treffen auf **5 der
7 Pfade** gleichzeitig zu:

**1. `units: 0` — kein Inhalt vorhanden** (alle 7 von 7 Pfade):
`PHY-AUTO-BESCHLEUNIGUNG-0001`, `PHY-AUTO-MOTOR-0001`, `PHY-AUTO-KOLBEN-0001`,
`PHY-AUTO-BATTERIE-0001`, `PHY-AUTO-BREMSE-0001`, `CHE-AUTO-VERBRENNUNG-0001`,
`PHY-AUTO-DIFFERENTIAL-0001` — nur Titel/Untertitel, keine `units`.

**2. `kxfModuleId`-Kollision mit dem „Reinigung"-Cluster** (5 von 7 Pfade):

| Auto-Pfad | kxfModuleId | kollidiert mit |
|---|---|---|
| `PHY-AUTO-MOTOR-0001` | `LRN:SSF:PHY-2001` | `PHY-REINIGUNG-OBERFLAECHEN-0001` |
| `PHY-AUTO-BREMSE-0001` | `LRN:SSF:PHY-2002` | `PHY-REINIGUNG-FLIESEN-HOLZ-0001` |
| `PHY-AUTO-BESCHLEUNIGUNG-0001` | `LRN:SSF:PHY-2003` | `PHY-REINIGUNG-SIEDEPUNKT-0001` |
| `PHY-AUTO-KOLBEN-0001` | `LRN:SSF:PHY-2004` | `PHY-REINIGUNG-WAERME-0001` |
| `CHE-AUTO-VERBRENNUNG-0001` | `LRN:SSF:CHE-2001` | `CHE-REINIGUNG-TENSIDE-0001` |

Nur `PHY-AUTO-BATTERIE-0001` (`LRN:SSF:PHY-2006`) und `PHY-AUTO-DIFFERENTIAL-0001`
(`LRN:SSF:PHY-2005`) haben eindeutige IDs.

Das Muster wirkt wie kopierte/wiederverwendete Platzhalter-IDs aus dem
Reinigung-Cluster, die nie durch echte eigene IDs ersetzt wurden — ähnlich dem bereits
gemeldeten Einzelfall `PATH:SSF:PHY-PUMPE-WASSER-0001` (`KG-REQ-20260719-duplicate-path-id`),
nur diesmal den gesamten Cluster betreffend.

## Gewünschte Änderung

1. Allen 7 Auto-Pfaden eindeutige `kxfModuleId`-Werte zuweisen (kein Wiederverwenden
   von Reinigung-Cluster-IDs).
2. `units`-Inhalte für den Cluster ausarbeiten, sobald er entwickelt wird.

## Begründung

Der KG hat den Auto-Cluster deshalb **nicht** registriert — eine Registrierung mit den
aktuellen `kxfModuleId`-Werten als `legacyId` würde im KG zwei verschiedene, bereits
registrierte Module (aus Reinigung) fälschlich mit dem Auto-Cluster verknüpfen.

## Betroffene Repositories

- `solarsciencefoundation` (Korrektur, `lib/learningPaths.ts`)

## Erwartetes Ergebnis

Eindeutige `kxfModuleId`-Werte für alle 7 Auto-Pfade. Danach kann der KG den Cluster
regulär registrieren (analog zu den anderen 8 Clustern).

## Hinweise

Nicht blockierend für laufenden Betrieb. Blockiert die vollständige Umsetzung von
`KG-REQ-20260718-002`/`003` — 27/36 verbleibende Module sind registriert, 7 (Auto)
warten auf diese Korrektur, 2 weitere (Küche-Duplikate) wurden aus inhaltlichen Gründen
bewusst nicht übernommen (siehe KG-Commit 996492d).
