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

## Stale-Untersuchung / Blocker — 2026-08-29

Der Auftrag lag länger als zwei Stunden unverändert. Die Intake-Ursache ist nicht ein lokaler SSF-Workflowfehler: Das SSF-Repository besitzt derzeit keine eigenen GitHub-Actions-Läufe. Die fachliche Implementierung ist jedoch an einer fehlenden kanonischen Integrationszuordnung blockiert.

Die Prüfung des bestehenden Vertrags ergibt:

- `lib/noxiaBridge.ts` liefert Inhalte ausschließlich für kanonische SSF/KXF-Modulidentitäten über `/api/noxia/modules/{moduleId}` aus.
- NOXIA nutzt für nicht zugeordnete lokale Kurse bewusst den lokalen DB-Kursrenderer als Fallback.
- Der Platzhalter `animation_id: gravitationsbrunnen` stammt aus diesem lokalen NOXIA-Kurssystem.
- Im NOXIA-Repository ist für den Kurs „Energie & Arbeit“ keine eindeutige `PATH:SSF:*`-/`LRN:SSF:*`-Zuordnung dokumentiert; die vorhandene `kg_path_id`-Migration deckt nur die Kurse Zahlen & Einheiten sowie Prozentrechnung ab.

SSF würde mit einer frei gewählten Modul-ID eine konkurrierende kanonische Lernidentität erzeugen. Das ist gemäß Source-of-Truth-Grenze nicht zulässig.

**Gerouteter nächster Schritt:** Im Ziel-Repository NOXIA wurde `external-tasks/open/SSF-NOX-REQ-20260829-gravitationsbrunnen-module-mapping.md` angelegt. Dort sind lokale `kurs_id`, kanonische Pfad-ID und SSF/KG-Modul-ID zu bestätigen bzw. bei fehlender kanonischer Identität an den Knowledge Graph weiterzurouten.

Bis diese Zuordnung vorliegt, bleibt dieser Auftrag unter `open/`. Die Interactive-ID `gravitationsbrunnen` und die fachlich-didaktischen Anforderungen sind bereits eindeutig; nach Rückmeldung ist die SSF-Implementierung lokal und ohne weitere fachliche Entscheidung möglich.