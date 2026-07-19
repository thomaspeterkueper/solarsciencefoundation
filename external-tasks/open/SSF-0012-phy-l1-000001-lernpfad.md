---
id: SSF-0012
requester: SYS:KUEPER:noxia
recipient: SYS:KUEPER:ssf
type: content
priority: high
tier: 1
created: 2026-07-19
module: PHY-L1-000001
unlock: UNL:NOX:SENSOR:SPECTRAL
blocking: NOXIA-BETA
---

# SSF-0012 — Lernpfad: Was die Welt aus sich macht — Spektralanalyse

## Modul-Info

| Feld | Wert |
|------|------|
| Modul-ID | `PHY-L1-000001` |
| Titel | Was die Welt aus sich macht — Spektralanalyse |
| Dauer | 4–6 Min |
| Niveau | L1 |
| Unlock | `UNL:NOX:SENSOR:SPECTRAL` → Spektralsensor (Ressourcen-Analyse) |
| Voraussetzung | keine |

## Lernziele

1. Was elektromagnetisches Spektrum ist
2. Wie Spektralanalyse funktioniert (jedes Element hat Fingerabdruck)
3. Wie Astronomen Sterne und Planeten analysieren
4. Wie NOXIA-Scanner Ressourcen auf Kacheln erkennen

## Quiz

Frage: Warum kann man aus dem Licht eines Sterns ablesen woraus er besteht?
A) Weil Sterne leuchten
B) Weil jedes chemische Element Licht bei bestimmten Wellenlängen absorbiert und emittiert ← richtig
C) Weil Teleskope Röntgenstrahlen nutzen
D) Weil die Farbe des Sterns seine Temperatur zeigt

## NOXIA-Kontext (in Lernpfad einbauen)

> Schaltet den Spektralsensor frei — Scanner-Gebäude zeigen detaillierte Ressourcendaten auf umliegenden Kacheln.

## Referenz

- KXF-Modul: `PHY-L1-000001` in `exports/kxf-learning-modules-0.1.json`
- NOXIA Unlock-Key: `UNL:NOX:SENSOR:SPECTRAL`
- Analog zu: SSF-0009 (ECO-L0-000001) als Referenz-Implementierung
