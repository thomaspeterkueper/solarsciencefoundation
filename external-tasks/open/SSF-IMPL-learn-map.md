<!-- external-tasks/open/SSF-IMPL-learn-map.md
     source:   thomaspeterkueper/kueper-knowledge-graph
     target:   thomaspeterkueper/solarsciencefoundation
     version:  0.1.0
     created:  2026-07-02
     modified: 2026-07-02T16:00:00+02:00
     requires: KB-REQUEST-0006 implemented in KG
-->

# SSF · Implementierung Themenkarte `/learn`

## Status

Open external task.

## Voraussetzung

KB-REQUEST-0006 ist im KUEPER Knowledge Graph umgesetzt.

Der benoetigte Export existiert:

```text
https://raw.githubusercontent.com/thomaspeterkueper/kueper-knowledge-graph/main/exports/kxf-learning-modules-0.1.json
```

Er liefert:

```text
records.learning_modules
```

## Dateistruktur

```text
app/
└── learn/
    └── page.tsx

components/
└── LearnMap/
    ├── index.ts
    ├── LearnMap.tsx
    ├── GridView.tsx
    ├── GraphView.tsx
    ├── NodeCard.tsx
    ├── DetailPanel.tsx
    └── types.ts

lib/
└── learning-modules.ts

public/
└── fallback-modules.json
```

## Kernanforderung

Die Route `/learn` soll eine Themenkarte der SSF-Lernmodule anzeigen.

Die Datenquelle ist der KG-Export:

```ts
const KXF_URL =
  'https://raw.githubusercontent.com/thomaspeterkueper/' +
  'kueper-knowledge-graph/main/exports/kxf-learning-modules-0.1.json'
```

`getLearningModules()` liest `data.records.learning_modules` und faellt bei Fehlern auf `public/fallback-modules.json` zurueck.

## UI-Komponenten

- `LearnMap.tsx` als Client Shell mit View-Toggle und Fachfilter
- `GridView.tsx` als Gitter nach Fach
- `GraphView.tsx` als Canvas-Abhaengigkeitsgraph ohne externes Graph-Framework
- `NodeCard.tsx` fuer Modulkarte
- `DetailPanel.tsx` als Slide-in Panel
- `types.ts` mit `LearningModule`, `SubjectCode`, `ModuleStatus`, `ModuleType`

## Designprinzipien

- CSS Custom Properties aus `app/globals.css` verwenden: `--navy`, `--gold`, `--surface`, `--font-serif`, `--font-mono`
- Keine neuen globalen Klassen
- Geplante Module mit `opacity: 0.55`, kein Click-Handler
- Titel geplanter Module nicht blurren
- Canvas-Graph ohne zusaetzliches Graph-Framework

## Nicht Gegenstand

- Fortschrittsanzeige pro Modul
- Supabase-Authentifizierung
- Inhalt der Modulseiten `app/modules/[id]/page.tsx`

## Umsetzungsschritte

```text
1. components/LearnMap/types.ts
2. lib/learning-modules.ts
3. public/fallback-modules.json
4. components/LearnMap/NodeCard.tsx
5. components/LearnMap/GridView.tsx
6. components/LearnMap/DetailPanel.tsx
7. components/LearnMap/GraphView.tsx
8. components/LearnMap/LearnMap.tsx
9. app/learn/page.tsx
```
