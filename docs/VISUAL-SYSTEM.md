<!--
KUEPER · Solar Science Foundation (SSF)
Path:      docs/VISUAL-SYSTEM.md
Repo:      github.com/thomaspeterkueper/solarsciencefoundation/blob/main/docs/VISUAL-SYSTEM.md
Name:      Visual System — Bilder, Grafiken, Animationen
Version:   0.1.0
Created:   2026-07-04
Modified:  2026-07-04 00:00 CEST
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

## 1. Vier Bildtypen

### TYPE-A · Atmosphäre (Hero / Landing)

**Zweck:** Raumgefühl, Identität, erster Eindruck. Kein Informationsgehalt.  
**Anforderung:** Funktioniert als subtiler Hintergrund — Text und UI bleiben
vollständig lesbar.  
**Palette:** Ausschließlich aus `--bg` (#fbfaf7), `--border` (#cfc6b6),
`--gold` (#b98b2d) — keine Fremdfarben.  
**Zwei Varianten (offen, eine wird gewählt):**

- **TYPE-A1 · Generiertes Bild** (Midjourney / Stable Diffusion)
- **TYPE-A2 · Animiertes SVG** (CSS-Keyframes, kein JS-Loop)

→ Bildprompt und SVG-Animation: siehe §4 und §5.

---

### TYPE-B · Fachbild (Subjects-Übersicht)

**Zweck:** Je Fach ein charakteristisches, nicht-dekoratives Bild.  
**Stil:** Wissenschaftlich-sachlich. Echte Phänomene, keine Illustrationen.  
**Format:** 3:2, max. 800px breit, WebP.  
**Einsatzort:** `subject-card` Header, Subjects-Index, ggf. Modul-Header.

| Fach | Motiv | Bildprompt-Schlagwort |
|------|-------|----------------------|
| Mathematik | Geometrische Musterstruktur | `mathematical lattice crystal macro` |
| Physik | Welleninterferenz im Wasser | `water wave interference macro photograph` |
| Chemie | Kristallstruktur unter Mikroskop | `salt crystal macro electron microscope` |
| Astronomie | Sonnenoberfläche / Granulation | `solar granulation NASA photograph` |
| Biologie | Zellmembran / Neuronen-Netz | `neuron network microscope fluorescent` |

**Regel:** Kein Mensch, kein Gesicht, keine erkennbare Institution im Bild.

---

### TYPE-C · Erklärvisualisierung (Modulseiten)

**Zweck:** Ein Konzept zeigen, das Text allein nicht vollständig vermitteln kann.  
**Format:** SVG (bevorzugt) oder PNG, inline im Modul.  
**Verpflichtend:** Nur einsetzen, wenn die Visualisierung das Verständnis
nachweislich erhöht. Kein Dekor.

Beispiele nach Domäne:

| Domäne | Visualisierung |
|--------|----------------|
| Physik | Wellendiagramm (Amplitude, Frequenz, Wellenlänge) |
| Mathematik | Zahlenstrahl, Funktionsgraph, geometrische Konstruktion |
| Chemie | Molekülstruktur (2D), Reaktionsschema |
| Astronomie | Orbitdarstellung, Maßstabsvergleich |
| Biologie | Zellaufbau, Stoffwechselkette |

**Quelle:** Eigene SVGs (bevorzugt) → lizenzfreie NASA/ESA-Grafiken
(mit Quellenangabe) → generierte Illustrationen (nur als letzter Ausweg).

---

### TYPE-D · Systemgrafik (Dokumentation / About)

**Zweck:** Ökosystem-Übersicht, KG-Architektur, KXF-Fluss.  
**Format:** SVG, eingebettet in Markdown oder als eigene Seite.  
**Einsatzort:** `/about`, `docs/`, evtl. Footer-Bereich.

---

## 2. Was nie eingesetzt wird

Verboten (aus BRAND.md):

- Starfelder, Galaxien, Nebel, Weltraumfotos im NASA-Poster-Stil
- Lens Flares, Neon-Blau, Cyberpunk-Ästhetik
- Stock-Fotos von Menschen oder Laboren
- KI-generierte Gesichter oder „Wissenschaftler"-Illustrationen
- Animations-Loops die UI-Elemente überlagern oder ablenken

---

## 3. Dateistruktur

```
public/
  images/
    hero/
      hero-network.svg          ← TYPE-A2 (animiertes SVG, falls gewählt)
      hero-bg.webp               ← TYPE-A1 (generiertes Bild, falls gewählt)
    subjects/
      mathematics.webp
      physics.webp
      chemistry.webp
      astronomy.webp
      biology.webp
    modules/
      {module-id}-fig-01.svg    ← TYPE-C Erklärvisualisierungen
```

Namenskonvention: `{kontext}-{beschreibung}.{ext}` — alles lowercase, keine Leerzeichen.

---

## 4. TYPE-A1 · Bildprompt (Generiertes Hintergrundbild)

```
Prompt (Midjourney / Stable Diffusion):

"A subtle, fine-line network of interconnected nodes and edges on a warm
off-white surface, resembling a scientific knowledge graph or neural
structure. Minimal, precise, technical. Thin lines in warm gray (#cfc6b6),
small circular nodes with faint gold centers (#b98b2d). Very low contrast,
background texture only. No text, no labels, no human figures, no glowing
effects. Soft, even lighting. Scientific illustration style. 16:9 aspect ratio.
High resolution."

Negative prompt:
"dark background, neon, glow, stars, space, fantasy, cyberpunk,
photorealistic, bokeh, depth of field, dramatic lighting, text, labels"
```

**Nach Generierung:** In Photoshop / Figma auf max. 25% Opacity reduzieren,
mit `--bg` (#fbfaf7) überlagern, als WebP exportieren (max. 400 KB).

---

## 5. TYPE-A2 · Animiertes SVG (Alternative zum Bild)

Bestehende `HeroBackground.tsx` als Basis.

Geplante Animation (CSS-Keyframes, kein JS):

- Knoten: `opacity` von 0.3 → 0.55 → 0.3, `duration: 6–10s`, `ease-in-out`,
  jeder Knoten mit individuellem `animation-delay` (0–4s) für organische Wirkung
- Kanten: keine Animation (zu unruhig)
- Gold-Dots: dezentes `scale` 1.0 → 1.3 → 1.0, `duration: 8s`

Implementierungsaufwand: ~30 Zeilen CSS. Sofort umsetzbar.

---

## 6. Umsetzungsreihenfolge

| Priorität | Typ | Aufwand | Status |
|-----------|-----|---------|--------|
| 1 | TYPE-A: Hero entscheiden (A1 vs A2) | klein | OFFEN |
| 2 | TYPE-A2: SVG-Animation implementieren | 30 min | — |
| 3 | TYPE-B: 5 Fachbilder generieren/beschaffen | mittel | — |
| 4 | TYPE-C: Erste Erklärvisualisierungen (PHY, MAT) | groß | — |
| 5 | TYPE-D: Systemgrafik KG-Ökosystem | mittel | — |

---

*Solar Science Foundation · docs/VISUAL-SYSTEM.md · v0.1.0 · 2026-07-04*
