---
id: NOX-SSF-REQ-20260829-GRAVITATIONSBRUNNEN
requester: SYS:KUEPER:noxia
target: SYS:KUEPER:ssf
priority: high
type: learning-content
created: 2026-08-29
status: done
affects: [SSF, NOXIA]
completed: 2026-08-30
implementation_pr: 40
---

# Interaktive Animation „Gravitationsbrunnen“ bereitstellen

## Anlass

NOXIA rendert SSF-Lerninhalte direkt innerhalb der Akademie. Im Kurs **„Energie & Arbeit“** erschien beim Abschnitt **„Gravitationsbrunnen visualisiert“** nur ein Platzhalter:

> Animation: gravitationsbrunnen
> Interaktive Animation folgt in Solar Academy 0.3

Damit war die Lernreise an dieser Stelle sichtbar unvollständig.

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
6. SSF bleibt Source of Truth für Inhalt und Didaktik innerhalb des SSF-Zuständigkeitsbereichs; kanonische wissenschaftliche Identitäten/Aussagen bleiben an KG bzw. die dort referenzierten Quellen gebunden. NOXIA übernimmt die In-Game-Darstellung.

## Integrationsvertrag für NOXIA

Im strukturierten Modul-/Kursinhalt wird ein eindeutig typisierter interaktiver Abschnitt ausgeliefert:

- `type: interactive` / bestehender äquivalenter SSF-Typ
- stabile ID `interactiveId: gravitationsbrunnen`
- Titel
- kurze Instruktion
- notwendige Konfiguration/Parameter
- Fallback-Text

Keine NOXIA-spezifische UI in SSF implementieren. NOXIA baut den Renderer für diesen strukturierten Typ.

## Akzeptanzkriterien

- Der bisherige „folgt in Solar Academy 0.3“-Platzhalter ist in der kanonischen SSF-Lernreise ersetzt.
- Die Animation ist über die SSF-API strukturiert abrufbar.
- NOXIA kann sie ohne iframe/externe Navigation innerhalb der bestehenden Akademie darstellen.
- Fachliche Erklärung und Interaktion bilden eine zusammenhängende Lerneinheit.
- Fehlende Client-Unterstützung führt zu einem sinnvollen Text-Fallback und nicht zu einem leeren Platzhalter.

## Blocker-Historie

Am 2026-08-29 war die Umsetzung zunächst durch fehlende kanonische Modul-/Pfadidentitäten blockiert. PR #28 führte nicht bestätigte Identitäten ein und wurde deshalb ausdrücklich als nicht integrierbar markiert. Die kanonische Zuordnung wurde anschließend im Knowledge Graph bereitgestellt.

Finale Identitäten:

- Modul: `PHY-L2-000005`
- Legacy-/Learning-ID: `LRN:SSF:PHY-ENERGIE-ARBEIT-0001`
- Pfad: `PATH:SSF:PHY-ENERGIE-ARBEIT-0001`
- Interactive-ID: `gravitationsbrunnen`

## Umsetzung / Rückgabe an NOXIA

SSF PR #40 **Add canonical Gravitationsbrunnen interactive contract** wurde am 2026-08-30 in `main` integriert. Die Implementierung verwendet die vom KG gelieferten kanonischen Identitäten, liefert einen strukturierten SSF→NOXIA-Interactive-Payload inklusive Text-Fallback und korrigiert die frühere physikalische Übertreibung zur Verteilung der Fluchtarbeit.

Damit sind die SSF-seitigen Akzeptanzkriterien dieses Requests erfüllt. Eine konkrete NOXIA-Renderer-Implementierung bleibt NOXIA-eigene Zuständigkeit und wird nicht in diesem Repository umgesetzt.
