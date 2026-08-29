---
id: NOX-SSF-REQ-20260829-GRAVITATIONSBRUNNEN
requester: SYS:KUEPER:noxia
target: SYS:KUEPER:ssf
priority: high
type: learning-content
created: 2026-08-29
status: open
affects: [SSF, NOXIA]
---

# Interaktive Animation „Gravitationsbrunnen“ bereitstellen

## Anlass

NOXIA rendert SSF-Lerninhalte direkt innerhalb der Akademie. Im Kurs **„Energie & Arbeit“** erscheint derzeit beim Abschnitt **„Gravitationsbrunnen visualisiert“** nur ein Platzhalter:

> Animation: gravitationsbrunnen
> Interaktive Animation folgt in Solar Academy 0.3

Damit ist die Lernreise an dieser Stelle sichtbar unvollständig.

## Gewünschte Änderung in SSF

1. Für den Content-Typ/die Referenz `gravitationsbrunnen` eine echte interaktive Lernanimation bereitstellen.
2. Die Animation soll über den bestehenden strukturierten SSF→NOXIA-Contentvertrag auslieferbar sein und darf keinen separaten Browser-Tab erfordern.
3. Inhaltlich soll sie mindestens anschaulich machen:
   - Gravitationspotential bzw. Potentialdifferenz,
   - Zusammenhang zwischen Abstand, potentieller Energie und notwendiger Arbeit,
   - warum das Verlassen eines Gravitationsfeldes Energie benötigt,
   - optional den Vergleich unterschiedlicher Himmelskörper/Massen, sofern didaktisch sinnvoll.
4. Interaktion bevorzugt über wenige klare Parameter (z. B. Masse/Himmelskörper und Abstand) statt einer rein dekorativen Animation.
5. Eine textuelle Fallback-Darstellung muss geliefert werden, falls der Client die Interaktion nicht rendern kann.
6. SSF bleibt Source of Truth für Inhalt, Didaktik und fachliche Aussagen. NOXIA übernimmt ausschließlich die In-Game-Darstellung.

## Integrationsvertrag für NOXIA

Bitte im strukturierten Modul-/Kursinhalt einen eindeutig typisierten interaktiven Abschnitt ausliefern, beispielsweise semantisch:

- `type: interactive` / bestehender äquivalenter SSF-Typ
- stabile ID bzw. `interactiveId: gravitationsbrunnen`
- Titel
- kurze Instruktion
- notwendige Konfiguration/Parameter
- Fallback-Text

Keine NOXIA-spezifische UI in SSF implementieren. NOXIA baut nach Lieferung den Renderer für diesen strukturierten Typ.

## Akzeptanzkriterien

- Der bisherige „folgt in Solar Academy 0.3“-Platzhalter ist in der kanonischen SSF-Lernreise ersetzt.
- Die Animation ist über die SSF-API strukturiert abrufbar.
- NOXIA kann sie ohne iframe/externe Navigation innerhalb der bestehenden Akademie darstellen.
- Fachliche Erklärung und Interaktion bilden eine zusammenhängende Lerneinheit.
- Fehlende Client-Unterstützung führt zu einem sinnvollen Text-Fallback und nicht zu einem leeren Platzhalter.

## Rückgabe an NOXIA

Nach Umsetzung bitte die endgültige Payload-Struktur und die stabile Interactive-ID dokumentieren, damit NOXIA den Renderer gezielt anbinden kann.

---

## Erledigt 2026-08-29 (SSF)

### Umsetzung

Der Platzhalter ist durch eine echte, strukturiert auslieferbare Lernanimation ersetzt. SSF bleibt Source of Truth für Inhalt, Didaktik und fachliche Aussagen; es wurde keine NOXIA-spezifische UI in SSF implementiert.

**Neue kanonische Lernreise:** `PATH:SSF:PHY-GRAVITATIONSBRUNNEN-0001`
„Warum kostet es Energie, einen Himmelskörper zu verlassen?" (Kurs „Energie & Arbeit", Physik) mit den Einheiten „Der Gravitationsbrunnen" und „Arbeit, Abstand und Flucht" — Beobachtung, interaktiver Abschnitt, Erklärungen, Beispiele und Quiz.

**Modul:** `SSF-PHY-GRAVITATIONSBRUNNEN-0001` (SSF-lokal, authority `ssf-local`, `CON:L1:gravitation`), Unlock `UNL:NOX:gravitationsbrunnen`.

**Web-Rendering SSF:** `components/learning/GravityWellExperiment.tsx` — Canvas-Animation des Potentialbrunnens Φ = −G·M/r mit zwei Parametern (Himmelskörper: Mond/Mars/Erde/Jupiter; Abstand r in Körperradien 1–10). Live: Φ(r), Potentialdifferenz zur Oberfläche, Hubarbeit für 1 t, Fluchtgeschwindigkeit, Oberflächengravitation.

**Strukturierter Vertrag:** `GET /api/noxia/modules/{moduleId}` liefert `contentVersion: "1.1"` mit neuem Section-Typ `interactive` (siehe `docs/noxia-module-api.md`). Kein iframe, kein separater Tab nötig. `fallback` enthält die vollständige textuelle Erklärung für Clients ohne interaktiven Renderer.

### Rückgabe an NOXIA — endgültige Payload-Struktur

Stabile Interactive-ID: **`gravitationsbrunnen`**

```json
{
  "type": "interactive",
  "interactiveId": "gravitationsbrunnen",
  "title": "Gravitationsbrunnen visualisiert",
  "instruction": "Wähle einen Himmelskörper und verschiebe den Abstand r vom Zentrum. Beobachte, wie Gravitationspotential Φ = −G·M/r, notwendige Hubarbeit und Fluchtgeschwindigkeit zusammenhängen.",
  "params": {
    "bodies": [
      { "id": "mond",    "label": "Mond",    "massKg": 7.35e22,  "radiusM": 1737000 },
      { "id": "mars",    "label": "Mars",    "massKg": 6.42e23,  "radiusM": 3390000 },
      { "id": "erde",    "label": "Erde",    "massKg": 5.97e24,  "radiusM": 6371000 },
      { "id": "jupiter", "label": "Jupiter", "massKg": 1.898e27, "radiusM": 69911000 }
    ],
    "distance": { "unit": "body_radii", "min": 1, "max": 10, "step": 0.1, "default": 1 },
    "testMassKg": 1000,
    "constants": { "G": 6.674e-11 }
  },
  "fallback": "Jeder Himmelskörper sitzt in einem Gravitationsbrunnen: … (vollständige textuelle Erklärung)"
}
```

Abgeleitete Größen (mit gelieferten Konstanten berechnen): Φ = −G·M/r, ΔΦ = Φ(r) − Φ(R), W = testMassKg·ΔΦ, v_esc = √(2·G·M/r). Interaktion inline in der Akademie rendern; bei fehlender Interaktions-Unterstützung `fallback` anzeigen.

### Akzeptanzkriterien

- ✅ Platzhalter „folgt in Solar Academy 0.3" ist in der kanonischen SSF-Lernreise ersetzt (neuer Lernpfad mit echtem interaktivem Abschnitt).
- ✅ Animation ist strukturiert über die SSF-API abrufbar (`/api/noxia/modules/SSF-PHY-GRAVITATIONSBRUNNEN-0001`, Section `type: interactive`).
- ✅ Darstellung ohne iframe/externe Navigation möglich (strukturierter Vertrag, s. `docs/noxia-module-api.md`).
- ✅ Fachliche Erklärung und Interaktion bilden eine zusammenhängende Lerneinheit (Lernziele → Entdecken → Interaktiv → Beispiele → Aufgabe → Wissenscheck).
- ✅ Text-Fallback bei fehlender Client-Unterstützung ist Teil des Payloads (Feld `fallback`).

**Status:** done — 2026-08-29
