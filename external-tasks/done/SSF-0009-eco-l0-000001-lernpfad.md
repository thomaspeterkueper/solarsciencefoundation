---
id: SSF-0009-eco-l0-000001-lernpfad
requester: SYS:KUEPER:noxia
recipient: SYS:KUEPER:ssf
type: content
priority: high
created: 2026-07-19
blocking: [NOXIA-BETA, UNL:NOX:bank-credit]
status: done
---

# SSF-0009 — Vollständiger Lernpfad für ECO-L0-000001: Was ist ein Kredit?

## Problem

Das Modul `ECO-L0-000001 — Was ist ein Kredit?` zeigt aktuell:

> Für dieses Wissensmodul ist noch kein vollständiger Lernpfad veröffentlicht.
> Die vorhandenen interaktiven Pfade findest du in der Lernpfadübersicht.

Spieler können das Modul nicht abschließen → `UNL:NOX:bank-credit` bleibt gesperrt
→ Bank-Kredit-Tab in NOXIA bleibt gesperrt → Beta-Gate blockiert.

## Gewünschter Lernpfad

**Modul:** `ECO-L0-000001`
**Titel:** Was ist ein Kredit — und warum gibt jemand heute etwas, das erst später zurückkommt?
**Dauer:** 3–5 Min
**Niveau:** L0 (Einstieg, kein Vorwissen nötig)
**Domäne:** Economics / Wirtschaft

### Lernziele

Nach Abschluss versteht der Spieler:
1. Was ein Kredit ist (geliehenes Geld mit Rückzahlungspflicht)
2. Warum Banken Kredite vergeben (Zinsen = Preis für Kapital)
3. Was passiert wenn man zu viel leiht (Überschuldung, Zinseszins)
4. Wann ein Kredit in NOXIA sinnvoll ist (ROI > Zinslast)

### Vorgeschlagener Aufbau

**Folie 1 — Das Grundprinzip**
Ein Kredit ist ein Versprechen: Jemand gibt dir heute etwas Wertvolles —
und du gibst später mehr zurück. Das "Mehr" ist der Zins. Der Zins ist der
Preis dafür, dass du *heute* kaufen kannst, was du *morgen* erst verdienen wirst.

**Folie 2 — Das Modell (interaktiv)**
Schieberegler: Kreditsumme × Zinssatz × Laufzeit = Gesamtrückzahlung
Spieler sieht live: bei 1.000 Cr, 5% Zins, 10 Ticks → 1.629 Cr zurückzahlen.

**Folie 3 — Wann lohnt es sich?**
Kredit lohnt wenn: Gewinn aus Investition > Zinszahlung
Beispiel: Mine kostet 1.500 Cr Kredit, produziert +5 Metall/Tick × 40 Cr = 200 Cr/Tick
Kreditkosten: 75 Cr/Tick → Gewinn: 125 Cr/Tick → Kredit lohnt sich.

**Quiz-Frage**
"Du nimmst 500 Cr Kredit zu 10% Zins. Nach einem Tick schuldest du:"
A) 500 Cr  B) 550 Cr ← richtig  C) 510 Cr  D) 600 Cr

### NOXIA-Kontext (in Folie einbauen)

> In NOXIA kannst du nach Abschluss dieses Moduls Kredite bei der Koloniebank
> aufnehmen — um schneller zu bauen bevor deine Einnahmen es erlauben.
> Risiko: Bei Überschuldung steigt die Tilgung überproportional.

### Unlock

Nach Abschluss: `UNL:NOX:bank-credit` → NOXIA Bank-Kredit-Tab freigeschaltet

### Referenz-Materialien

- KB-REQUEST-0003 (in diesem Repo) — ECO-Modul-Spezifikation
- `CON:ECO:L0:kredit` im KG
- `PATH:SSF:ECO-FOUNDATIONS-0001` — Lernpfad-ID für diesen Pfad


## Erledigt 2026-07-19

PATH:SSF:ECO-KREDIT-NOXIA-0001 implementiert. Schaltet UNL:NOX:bank-credit frei.
