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
