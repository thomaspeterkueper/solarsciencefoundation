---
id: NOX-SSF-REQ-20260830-MINIMUM-VIABLE-MARS-COLONY-497
requester: SYS:KUEPER:noxia
target: SYS:KUEPER:ssf
priority: high
type: research-evidence
created: 2026-08-30
completed: 2026-08-30
status: done
affects: [SSF, NOXIA, OTA, KG]
---

# Wissenschaftliche Basis für eine minimale Marskolonie mit 497 Personen — abgeschlossen

## Ursprüngliches Ziel

Quellenbasierte Systembilanz für eine dauerhaft bewohnte Marsbasis mit 497 Personen, mindestens 30 Tagen Betrieb ohne externen Nachschub und einer klaren Trennung zwischen realem Technikstand, transparenter Skalierung und plausibler Fortschreibung. Noch keine NOXIA-Gebäudeliste und kein Gameplay-Balancing.

## Ergebnis

Die SSF Research Note liegt vor unter:

`docs/research/minimum-viable-mars-colony-497.md`

Sie untersucht als zusammenhängendes System Habitat/Druckvolumen, O2/CO2, Wasser, Energie, thermische Kontrolle, Nahrung, Reststoffkreisläufe, Medizin, Wartung/Ersatzteile, Logistik, Kommunikation, Mobilität, Mediennetze, Airlocks/EVA, Strahlenschutz, Notfallinfrastruktur, Redundanz und Erweiterbarkeit.

### Szenario-B-Anker

```text
Population                         497 Personen
Autarkiereserve                    >= 30 Tage
O2-Bedarf                          ~408 kg/Tag
CO2-Abfuhr                         ~517 kg/Tag
Wasser-Bruttodurchsatz             ~7,5–12,4 t/Tag
Wasser-Nettonachspeisung           ~0,3–0,8 t/Tag
Nahrungsbedarf / Importreferenz    ~0,57–0,91 t/Tag
30-Tage-Nahrungsreserve            ~17–27 t
30-Tage-Wasser-Nachspeisereserve   ~9–24 t
mittlere elektrische Last          ~3–5 MW [Architekturannahme]
Spitzenlast                        ~5–8 MW [Architekturannahme]
Kurzzeit-Energiespeicher           ~3–10 MWh [Architekturannahme]
thermische Abfuhr                  ~3–6 MW [Architekturannahme]
Netto-Druckvolumen                 ~40.000–60.000 m3
Nutzfläche druckbeaufschlagt       ~23.000–35.000 m2
```

Die Note stellt Szenario A (importlastig/konservativ), B (plausible robuste Basiskolonie) und C (weiter entwickelte lokale Produktion) gegenüber und markiert explizit, welche Werte reale NASA/ESA-Anker, lineare Skalierungen oder noch zu verifizierende Architekturannahmen sind.

## Wichtigste Schlussfolgerung

497 Bewohner bilden technisch bereits eine kleine industrielle Anlage. `Minimum viable` bedeutet deshalb nicht minimale Gebäudezahl, sondern minimale Anzahl zwingender Funktionen **einschließlich** Redundanz, Segmentierung und 30-Tage-Resilienz.

## Folgeauftrag

Der Welttechnik-Schritt wurde gemäß Repository-Governance nicht in OTA direkt umgesetzt, sondern als Request angelegt:

`thomaspeterkueper/overtime-archive.org/external-tasks/open/SSF-OTA-REQ-20260830-tharsis-hub-minimum-viable-colony-497.md`

OTA soll daraus zuerst die kanonische Systemarchitektur für Tharsis Hub ableiten. Erst danach soll NOXIA Gebäude, Anlagen, Fahrzeuge, Fahrwege und Mediennetze als Spielprojektion festlegen. KG erhält anschließend nur stabile Identitäten und Beziehungen.

## Akzeptanzprüfung

1. quellenbasierte Gesamtbilanz für 497 Personen: erfüllt
2. 30-Tage-Reserve explizit: erfüllt
3. Szenarien A/B/C: erfüllt
4. lebenswichtige Abhängigkeiten und Redundanzen: erfüllt
5. Wertebereiche/Unsicherheiten/Skalierung sichtbar: erfüllt
6. realer Stand vs. Fortschreibung vs. Annahme: erfüllt durch [R]/[S]/[A]
7. minimale funktionale Systemarchitektur ohne NOXIA-Gebäudeerfindung: erfüllt
8. klarer OTA-Folgeauftrag: angelegt
