---
id: KG-SSF-REQ-20260719-ECO-L0
requester: SYS:KUEPER:kg
target: SYS:KUEPER:ssf
priority: high
type: implementation
created: 2026-07-19
status: done
affects: [SSF, NOXIA]
source_context: SSF-NOXIA-REQ-20260719-ECO-L0
canonical_modules: [ECO-L0-000001, ECO-L0-000002]
---

# KG-SSF-REQ-20260719-ECO-L0 — Kredit und Zins/Zinseszins als SSF-Lernreisen umsetzen

## Anlass

Der Knowledge Graph hat die zwei bisher fehlenden wirtschaftlichen Grundlagenmodule kanonisch registriert:

- `ECO-L0-000001` — **Was ist ein Kredit?**
- `ECO-L0-000002` — **Zins und Zinseszins**

Beide stehen im KXF-Learning-Modules-Export auf `planned`. Die fachlichen IDs, Metadaten und Abhängigkeiten sind damit geklärt. Die didaktische Ausarbeitung liegt gemäß Repository-Rollen bei SSF.

## Kanonische Abhängigkeiten

```text
MAT-L0-000001
  ↓
ECO-L0-000001  Kredit
  ↓
ECO-L0-000002  Zins und Zinseszins
```

`ECO-L0-000002` setzt zusätzlich `MAT-L0-000001` voraus.

## Gewünschte Umsetzung in SSF

Zwei echte SSF-Lernreisen nach `docs/SSF-DIDAKTIK.md` erstellen.

### A — Kredit

Einstiegsfrage:

> Was ist ein Kredit — und warum gibt jemand heute etwas, das erst später zurückkommt?

Didaktischer Scope:

- Alltagssituation vor Definition
- Kreditgeber / Kreditnehmer
- Kapitalüberlassung über Zeit
- Rückzahlung
- Laufzeit und Tilgung
- Unterschied Kreditbetrag / Zins / Gesamtrückzahlung
- Abgrenzung zu Einkommen, Geschenk und Eigenkapital
- interaktive Simulation mit Kreditbetrag, Laufzeit, Tilgung und Zins
- mehrere kleine Zahlenbeispiele
- Verständnisquiz

### B — Zins und Zinseszins

Einstiegsfrage:

> Warum wächst ein Betrag schneller, wenn auch die Zinsen wieder verzinst werden?

Didaktischer Scope:

- einfacher Zins
- Zinssatz und Zinsperiode
- Zinseszins
- linearer gegenüber exponentiellem Verlauf
- Sparen und Kreditkosten
- interaktive Zeit-/Zinssatz-Simulation
- direkte visuelle Gegenüberstellung einfacher Zins vs. Zinseszins
- kleine nachvollziehbare Zahlenbeispiele
- Verständnisquiz

## SSF-Didaktik

Die Lernreisen sollen der kanonischen Dramaturgie folgen:

```text
Beobachtung → Einstiegsfrage → Vermutung → Experiment → Erklärung → Verbindung → Anwendung → Quiz → Takeaway → Nächster Horizont
```

Keine Vorlesungs- oder Disziplinlabels in der Lernenden-Ansicht.

## Integration

- kanonische IDs aus dem KG verwenden
- keine neuen lokalen SSF-IDs erfinden
- KXF-Modulbezug sauber hinterlegen
- MAT-L0-Arithmetik als Voraussetzung respektieren
- die Lernreisen so bereitstellen, dass NOXIA sie nach Abschluss referenzieren kann

## Akzeptanzkriterien

1. Beide kanonischen Module haben eine SSF-Lernreise.
2. Jede Lernreise enthält echte Lerninhalte vor dem Quiz.
3. Mindestens eine native interaktive Simulation pro Lernreise ist vorhanden.
4. Abhängigkeiten zu `MAT-L0-000001` bzw. `ECO-L0-000001` sind berücksichtigt.
5. Die Lernreisen sind über die SSF-Registry auffindbar.
6. NOXIA kann anschließend seine Gates auf die kanonischen Module umstellen.

## Priorität

**High** — KG ist abgeschlossen; dies ist jetzt der nächste Blocker in der Kette KG → SSF → NOXIA.


## Erledigt

PATH:SSF:ECO-KREDIT-0001 und PATH:SSF:ECO-ZINS-0001
in learningPaths.ts v1.0.4 implementiert.
