<!--
KUEPER · Solar Science Foundation (SSF)
Path:      docs/prototypes/lernpfad-v3-konzept.md
Repo:      github.com/thomaspeterkueper/solarsciencefoundation/blob/main/docs/prototypes/lernpfad-v3-konzept.md
Name:      Lernpfad v3 — Konzeptdokumentation
Version:   0.1.0
Created:   2026-07-04
Modified:  2026-07-04 18:00 CEST
Depends:   lib/learningPaths.ts, SSF-CORE.md, docs/BRAND.md
-->

# Lernpfad v3 — Interaktiver Prototyp

**Datum:** 2026-07-04  
**Status:** Prototyp — nicht produktiv  
**Datei:** `docs/prototypes/ssf-lernpfad-v3.html` (standalone, kein Next.js)  

---

## Konzept

Dieser Prototyp setzt die SSF-Lernpfad-Architektur als interaktive HTML-Seite um.
Er dient als Referenz für die spätere Next.js-Implementierung in `app/learning-paths/[id]/`.

### Kernprinzipien

**Keine Disziplinlabels für Lernende.** Die Einheit beginnt mit einer Alltagsfrage — nicht mit "Physik" oder "Akustik". Die interne Struktur (KXF, Domains) bleibt unsichtbar.

**Eigene Beobachtungen als Einstieg.** Drei persönliche Beobachtungen von Thomas Küper:
- Kontrakomologie (Bach vs. Miles Davis — verschiedene Zeitstrukturen)
- Kaffeetasse + Löffel (Resonanz, Luftsäulenlänge)
- Jalousienritze (Lichtbeugung)

**Drei Mini-Experimente mit Web Audio.**

| Experiment | Physik | Interaktivität |
|---|---|---|
| Kaffeetasse | Resonanz, stehende Wellen | Füllstand-Slider, Web Audio OscillatorNode, Canvas |
| Wellenmischer | Interferenz, Fourier | Frequenz + Amplitude für 2 Wellen, Canvas, Web Audio |
| Lichtspektrum | λ/f/E, Fraunhofer-Linien | Wellenlängen-Slider 380–700 nm, Canvas, Farbswatch |

**Skip-Mechanismus.** Beobachtungen und Aufgaben sind optional — direkt zum Quiz möglich.

**Vorschau-Mechanismus.** Einheit 2 ist sichtbar aber gesperrt (blur + Lock-Overlay). Nach 3/3 Quiz Einheit 1: Vorschau klärt sich auf, Einheit 2 wird freigeschaltet (Pulse-Animation).

**Logarithmische Tiefenbar.** `d = 100 × (1 − 1/(1 + raw/26))` — asymptotisch, nie 100%. Jede Interaktion (Audio abspielen, Slider bewegen, Branch öffnen, Quiz lösen) trägt Tiefenpunkte bei.

**Seitenäste.** Zwei optionale Vertiefungen:
- Fourier-Zerlegung: Brücke von Klang zu Spektrum
- Lichtphysik: c = λ·f, E = h·f, Wien-Gesetz

---

## UX-Architektur (für Next.js-Portierung)

```
LearningPathPage
  ├── SiteHeader (sticky, depth bar)
  ├── PathIntro (Titel, Beschreibung)
  ├── Unit (× 2)
  │   ├── UnitHeader (Einheitsnummer, Einstiegsfrage)
  │   ├── SkipBar (optional)
  │   ├── Sections[] (skippable)
  │   │   ├── ObservationCard
  │   │   ├── ExperimentCard (Client Component — Web Audio)
  │   │   ├── ProseBlock
  │   │   └── ExerciseBlock
  │   ├── QuizBlock (mandatory, 3 questions)
  │   └── BranchJunction → BranchPanel (optional)
  ├── PreviewCard (locked until quiz passed)
  ├── CompletionBanner
  └── HorizonNote
```

**Client vs. Server:**
- Audio-Experimente: Client Components (Web Audio API)
- Quiz-Auswertung: kann Server-seitig in `lib/progress.ts` integriert werden
- Depth-Tracking: vorerst clientseitig, später Supabase

---

## Designsprache

Vollständig in SSF-Tokens: `--bg #F9F8F5`, `--navy #1C2B3A`, `--gold #C9A84C`.
Serif für Fließtext und Fragen, Mono für IDs/Labels/Formeln, Sans für UI.
Kein Disziplinlabel sichtbar für Lernende.

---

## Offene Punkte für Portierung

- [ ] ExperimentCard als Next.js Client Component
- [ ] Depth-Tracking in Supabase persistieren
- [ ] Quiz-Gate-Logik mit `lib/progress.ts` verbinden
- [ ] Branch-Panels als lazy-loaded Sections
- [ ] `entryQuestion` aus `LearningPathUnit` im UI nutzen (bereits in learningPaths.ts v0.2.0)
