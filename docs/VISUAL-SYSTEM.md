<!--
KUEPER · Solar Science Foundation (SSF)
Path:      docs/VISUAL-SYSTEM.md
Repo:      github.com/thomaspeterkueper/solarsciencefoundation/blob/main/docs/VISUAL-SYSTEM.md
Name:      Visual System — Bilder, Grafiken, Animationen
Version:   0.2.0
Created:   2026-07-04
Modified:  2026-07-04 12:00 CEST
Depends:   docs/BRAND.md
-->

# SSF Visual System

Dieses Dokument definiert den Einsatz von Bildern, Grafiken und Animationen
auf der Solar Science Foundation. Es leitet sich aus `docs/BRAND.md` ab und
ist verbindlich für alle visuellen Entscheidungen auf der Plattform.

---

## 0. Grundregel

> Jedes visuelle Element muss einen epistemischen Grund haben.
> Es zeigt etwas, das Text allein nicht zeigen kann —
> oder es schafft atmosphärische Tiefe ohne abzulenken.

Kein Dekor. Kein Füllmaterial. Keine Stock-Fotos.

---

## 1. Drei Bildtypen

### TYPE-A · Atmosphäre (Hero / Landing)

**Zweck:** Raumgefühl, Identität, erster Eindruck. Kein Informationsgehalt.  
**Ansatz:** Generiertes Bild als Basis-Textur + animiertes SVG-Netzwerk
darüber — Bild gibt Tiefe, SVG gibt organische Bewegung.

**Bild-Ebene (statisch):**  
Generiertes Bild als `background-image` auf dem Hero-Container.  
Nach Generierung auf max. 15–20% Opacity reduzieren, als WebP exportieren
(max. 400 KB). Kein dunkles Bild — die Seite bleibt `light-first`.

**SVG-Ebene (animiert):**  
`HeroBackground.tsx` (bestehend) wird mit CSS-Keyframes belebt:
- Knoten: `opacity` 0.25 → 0.5 → 0.25, `duration: 7–11s`, `ease-in-out`,
  individueller `animation-delay` pro Knoten (0–5s) für organisches Pulsieren
- Gold-Dots: `scale` 1.0 → 1.25 → 1.0, `duration: 9s`
- Kanten: keine Animation

**Vier Bilder — langsame Überblendung (CSS-only, ~45s Zyklus):**

Alle vier zeigen organische Netzwerke aus verschiedenen Naturbereichen.
Dateinamen: `ssf-hero1.png` bis `ssf-hero4.png` → `public/images/hero/`.
Nach Generierung: 12–18% Opacity, als WebP exportieren (max. 400 KB je Bild).

**ssf-hero1.png — Myzel**
```
Extreme macro photograph of fungal mycelium threads on warm cream paper.
Very fine pale filaments branching and connecting at nodes. Diffuse overhead
lighting, no shadows, no depth of field blur. Off-white to warm gray threads,
almost like pencil on paper. Scientific, delicate, precise. 16:9, ultra-sharp.

Negative: dark background, color, neon, glow, bokeh, dramatic lighting,
space, text, watermark
```

**ssf-hero2.png — Neuronen**
```
Extreme macro photograph of neural dendrites, fluorescence microscopy style
but rendered in warm sepia tones on cream background. Fine branching structures
connecting at cell bodies. Even lighting, flat, no drama. Like an anatomical
illustration from a 19th century science atlas. 16:9, ultra-sharp.

Negative: dark background, neon blue, high contrast, dramatic lighting,
modern digital look, space, text, watermark
```

**ssf-hero3.png — Kristallgitter**
```
Macro photograph of a salt or mineral crystal lattice structure, warm cream
background, extreme close-up showing the geometric node-and-edge pattern of
the crystal surface. Diffuse light, no shadows, no color grading.
Scientific neutrality. 16:9, ultra-sharp.

Negative: dark background, color saturation, neon, glow, dramatic shadows,
space, text, watermark
```

**ssf-hero4.png — Manganknollen**
```
Underwater macro photograph of manganese nodules on deep ocean floor sediment.
Dark rounded nodules clustered on pale sandy seafloor. Diffuse, even lighting —
no dramatic shadows, no rays of light. Warm cream to pale gray tones.
The nodules read as nodes in a network. Scientific, calm, geological.
16:9, ultra-sharp.

Negative: dark water, blue tones, dramatic underwater lighting, bubbles,
fish, coral, neon, glow, text, watermark
```

---

### TYPE-B · Einstiegsbilder (Fragen / Beobachtungen)

**Zweck:** Jede Einstiegsfrage oder Beobachtung bekommt ein passendes Bild
oder eine Grafik — kein Fach-Label, kein Kategorie-Icon.

Die Navigation läuft nicht über Disziplinen ("Physik", "Chemie"),
sondern über Fragen und Beobachtungen:

> *Warum klingt ein vorbeifahrendes Auto anders?*  
> *Warum schillert eine CD im Licht?*  
> *Warum kühlt Kaffee in einer breiten Tasse schneller ab?*

Das Bild zur Frage ist konkret, sachlich, nicht dekorativ.
Es zeigt das Phänomen — nicht das Konzept dahinter.

**Format:** 3:2, max. 800px breit, WebP oder SVG.  
**Regel:** Kein Mensch, kein Gesicht, keine erkennbare Institution.

Beispiele:

| Einstiegsfrage | Bild/Grafik |
|----------------|-------------|
| Warum klingt ein vorbeifahrendes Auto anders? | Schallwellen-Kompression (SVG) oder Straßenfoto mit Bewegungsunschärfe |
| Warum schillert eine CD? | Makrofoto CD-Oberfläche mit Lichtbrechung |
| Warum kühlt Kaffee in breiter Tasse schneller? | Zwei Tassen von oben, klar sichtbare Oberfläche |
| Wie groß ist die Sonne wirklich? | Maßstabsvergleich SVG (Sonne / Erde / Punkt) |
| Was ist eine Zelle? | Fluoreszenzmikroskop-Aufnahme (frei lizenziert) |

---

### TYPE-C · Modul-Visualisierungen (Lerninhalt)

**Zweck:** Konzepte zeigen, die Text allein nicht vollständig vermitteln kann.  
**Format:** SVG (bevorzugt), interaktive HTML-Komponente, oder Foto.  
**Verpflichtend:** Jedes Modul bekommt mindestens eine Visualisierung.

**Drei Ebenen — aufsteigend nach Aufwand:**

#### C1 · Erklär-SVG (statisch)
Inline-SVG, direkt im Modul. Zeigt das Kernkonzept visuell.  
Beispiele: Wellendiagramm, Zahlenstrahl, Molekülstruktur, Orbitschema.

#### C2 · Interaktives Experiment (React-Komponente)
Kleine Simulation im Browser — Lernende können Parameter verändern
und das Ergebnis sofort sehen.  
Beispiele: Frequenz-Schieberegler → Wellenform ändert sich live,
Linsen-Simulator, Stöchiometrie-Rechner.

#### C3 · Echtes Bild (Foto / NASA / ESA)
Nur wo SVG oder Experiment nicht ausreichen — echte Aufnahmen von
Phänomenen (Sonnenoberfläche, Kristallstruktur, Neuronennetz).  
Quelle immer angeben. Nur frei lizenzierte Bilder (CC0, NASA, ESA).

**Entscheidungsregel:**
```
Kann ich das Konzept als SVG zeigen?     → C1
Würde Interaktion das Verständnis erhöhen? → C2
Braucht es ein echtes Phänomenfoto?       → C3
```

---

## 2. Was nie eingesetzt wird

Aus BRAND.md:
- Starfelder, Galaxien, Nebel, Weltraumfotos im NASA-Poster-Stil
- Lens Flares, Neon-Blau, Cyberpunk-Ästhetik
- Stock-Fotos von Menschen oder Laboren
- KI-generierte Gesichter oder „Wissenschaftler"-Illustrationen
- Fach-Kategorie-Icons oder Disziplinlabels als visuelle Elemente
- Systemgrafiken des KUEPER-Ökosystems — das ist interne Architektur,
  nicht Besucherinhalt

---

## 3. Dateistruktur

```
public/
  images/
    hero/
      hero-bg.webp               ← TYPE-A Hintergrundbild
    questions/
      {frage-slug}.webp          ← TYPE-B Einstiegsbilder
      {frage-slug}.svg
    modules/
      {module-id}-fig-01.svg     ← TYPE-C Erklär-SVGs
      {module-id}-fig-01.webp    ← TYPE-C Fotos
components/
  HeroBackground.tsx             ← TYPE-A SVG-Animation
  ModuleFigure.tsx               ← TYPE-C Wrapper (Caption, Lizenz)
  ModuleExperiment.tsx           ← TYPE-C2 interaktive Experimente
```

---

## 4. Umsetzungsreihenfolge

| Priorität | Typ | Was | Status |
|-----------|-----|-----|--------|
| 1 | TYPE-A | SVG-Animation in HeroBackground.tsx | OFFEN |
| 2 | TYPE-A | Hintergrundbild generieren + einbinden | OFFEN |
| 3 | TYPE-B | Einstiegsbilder für erste 5 Module | — |
| 4 | TYPE-C1 | Erklär-SVGs für erste 3 Module | — |
| 5 | TYPE-C2 | Erstes interaktives Experiment | — |

---

*Solar Science Foundation · docs/VISUAL-SYSTEM.md · v0.3.0 · 2026-07-04*  
*v0.2.0: TYPE-B auf Fragen/Beobachtungen umgestellt, TYPE-C drei Ebenen,
TYPE-D entfernt, TYPE-A auf Bild+SVG kombiniert*  
*v0.3.0: Vier Hero-Bildprompts (ssf-hero1–4): Myzel, Neuronen, Kristall,
Manganknollen — langsame CSS-Überblendung*
