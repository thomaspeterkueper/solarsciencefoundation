# KG-0004 — SSF-CORE.md mit KG-/ARC-Kanon abgleichen

## Target System
Solar Science Foundation (SSF)

## Origin
KueperKnowledgeGraph — Abgleich SSF-CORE.md v0.1.0 gegen kanonischen Bestand (ARC-0006, ARC-0005)

## Target File
`SSF-CORE.md`

## Reason
SSF-CORE.md v0.1.0 ist als Mission/Philosophie stark, überschreibt aber an drei Stellen still KG-/ARC-Kanon. Diese Punkte betreffen KG-Domäne (Level-System, ID-Vergabe, PATH-Objekte) und sollten angeglichen werden. SSF-interne Inhalte (Mission, Tiefenformel, Prüfungsphilosophie, Modulaufbau) sind ausdrücklich nicht Gegenstand dieser Anforderung — sie bleiben SSFs souveräne Domäne.

## Requested Change

### 1. Level-System entkollidieren (§2.4, §3.1)
Die „KUEPER-Wissenspyramide" L0–L4 kollidiert mit bereits belegten Skalen:

- ARC-0006 §VI: L0–L9 = Modul-Komplexität (L0 kein Vorwissen … L6 Frontier).
- ARC-0005: N0–N3 = Dokument-Vorwissen.

Kuratorische Entscheidung: Option (a). Die Pyramide ist ein eigenständiges epistemisches Konzept und erhält das kollisionsfreie Präfix `EP0–EP4` (Epistemic Pyramid). Die kanonische L0–L9-Komplexitätsachse wird zusätzlich referenziert.

### 2. Modul-IDs auf kanonische Form (§3.2)
`LRN:SSF:PHY-1101` ist Legacy-ID / Export-/Tracking-Schicht. Kanonisch ist die vom KG vergebene Form, z. B. `PHY-L1-000001`.

Umsetzung:

- `id` = kanonische KG-ID
- `legacyId` = `LRN:SSF:*`
- `Tiefenstufe` zu `Komplexität` ändern und auf ARC-0006 §VI beziehen.

### 3. Lernpfade: PATH-Objekte statt „kürzester Weg" (§4)
`PATH:SSF:*`-Objekte sind Grundlage. „Kürzester Weg" ist nur eine mögliche Strategie, nicht die Definition eines Lernpfads. Nicht-lineare Pfade bleiben gemäß ARC-0006 §X als offen zu behandeln.

### 4. Repo-Slug korrigieren
`thomaspeterkueper/SolarScienceFoundation` → `thomaspeterkueper/solarsciencefoundation`

## Was NICHT geändert werden soll
Mission (§1), Neugier-vor-Taxonomie (§2.1), Tiefenformel (§2.3), Modulaufbau (§5), Prüfungs-/Fortschrittsphilosophie (§6). Diese sind SSF-Domäne und stehen.

## Priority
Medium — Konsistenz-Angleichung, kein Laufzeit-Defekt.

## Blocking
Nicht deployment-blockierend. Punkt 1 (Level-System) sollte aber vor der ersten lernerseitigen Umsetzung entschieden sein, damit sich die dreifache L-Bedeutung nicht in Code/Content verfestigt.

## Status
Open

## Created
2026-07-03

## Curator
T.P.K.
