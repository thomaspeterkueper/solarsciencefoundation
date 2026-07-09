<!--
KUEPER · Solar Science Foundation (SSF)
Path:      external-tasks/open/KG-0005-entry-question-levels.md
Name:      KG-0005: Drei Einstiegsfragen-Ebenen pro Modul
Version:   0.1.0
Created:   2026-07-05
Modified:  2026-07-05 CEST
Depends:   KXF-Schema, ARC-0006 §VI (L0–L9 Komplexitätsskala)
-->

# EXTERNAL TASK KG-0005

## Target System

KUEPER Knowledge Graph

## Origin

Solar Science Foundation

## Reason

Externes Feedback zur SSF (2026-07-05) hat einen strukturellen Bedarf bestätigt, den der Prototyp
noch nicht abdeckt: Jedes Modul braucht mehrere Einstiegsfragen für verschiedene Wissensstufen —
nicht als separate Module, sondern als verschiedene Türen ins selbe Thema.

Aktuell hat jedes Modul eine einzige `summary` (Einstiegsfrage). Das reicht für einen Einstieg,
aber nicht für einen echten alters- und niveaugerechten Zugang. Ein Zehnjähriger und ein
Physikstudent sollen dieselbe Kaffeetasse als Einstieg nutzen können — mit verschiedenen Fragen,
die beide ins selbe Modul führen.

## Requested Change

Erweiterung des KXF-Modul-Schemas um drei optionale Einstiegsfragen-Felder zusätzlich zur
bestehenden `summary`.

## Vorgeschlagene Felder

```
entryQuestion: {
  L0: string   // Alltagssprache, keine Fachbegriffe, für alle zugänglich
                // Beispiel: "Warum klingt eine Tasse anders wenn man reinhaut?"
  L1: string   // Mit Grundbegriffen, Schulniveau
                // Beispiel: "Warum verändert sich der Ton einer Tasse mit dem Füllstand?"
  L2: string   // Konzeptionell, Fachbegriffe möglich
                // Beispiel: "Wie hängt die Resonanzfrequenz einer Luftsäule von ihrer Länge ab?"
}
```

Die bestehende `summary` bleibt als primäre kanonische Einstiegsfrage (entspricht etwa L1).
Die neuen Felder sind optional — nicht jedes Modul muss alle drei haben.

## Verhältnis zu bestehenden Skalen

Diese Felder beschreiben **nicht** die Modulkomplexität (L0–L9, ARC-0006 §VI), sondern die
**sprachliche Zugangsstufe** der Einstiegsfrage. Ein L2-Einstieg kann in ein L3-Modul führen.
Die Bezeichnungen L0/L1/L2 hier sind Einstiegsfragen-Level, keine Modul-Level — falls das zu
Verwechslungen führt, kann der KG andere Bezeichnungen vergeben (z.B. `EQ:A`, `EQ:B`, `EQ:C`
oder `curious`, `informed`, `advanced`).

## Konkretes Beispiel

Modul: `LRN:SSF:PHY-1101` — Klang & Resonanz

```
summary:        "Warum klingt eine Kaffeetasse anders, je nachdem wie voll sie ist?"
entryQuestion:
  L0: "Warum macht eine Tasse mit Löffel einen anderen Ton als eine volle?"
  L1: "Warum klingt eine Kaffeetasse anders, je nachdem wie voll sie ist?"
  L2: "Wie bestimmt die Länge der Luftsäule in einer Tasse ihre Resonanzfrequenz?"
```

## SSF-seitige Nutzung

SSF würde die Einstiegsfrage anhand eines einfachen Nutzerprofils wählen:

- Kein Profil / erster Besuch → L0
- Nutzer hat bereits Module abgeschlossen → L1
- Nutzer hat Tiefe > 50 in einem verwandten Pfad → L2

Die Auswahl bleibt vollständig clientseitig in der SSF und braucht keine KG-Logik.

## Impact

- KXF-Schema: 3 neue optionale Felder im Modul-Objekt
- SSF `lib/learningPaths.ts`: `LearningPathUnit.entryQuestion` wird zu `entryQuestions: { L0, L1, L2 }`
- `RandomPathEntry` und `ObservationTeaser`: zeigen L0-Frage für neue Nutzer
- Keine Breaking Changes wenn Felder optional

## Priority

Medium — kein Blocking für laufende Entwicklung

## Created

2026-07-05

## Curator

Thomas Küper
