<!--
KUEPER - Solar Science Foundation (SSF)
Path: docs/requests/KB-REQUEST-0003-economics-foundations.md
Name: Knowledge Graph request - economics foundations for NOXIA
Version: 0.1.0
Created: 2026-07-10
Requestor: SYS:KUEPER:noxia
-->

# KB-REQUEST-0003 — Economics foundations for NOXIA

## Needed by

NOXIA (via SSF `/api/noxia/modules`)

## Purpose

NOXIA uses SSF modules as unlock gates for in-game mechanics. The first
gate is the bank credit system: a player must complete an economics module
before the bank credit tab becomes available. Currently NOXIA has these
modules hardcoded locally (`lib/knowledge/data.ts`). They should become
canonical SSF modules so NOXIA can consume them via the SSF API
(`KNOWLEDGE_SOURCE=ssf`) like all other modules.

## Requested modules

### ECO-L0-0001 — Was ist Kredit?

```json
{
  "id": "ECO-L0-000001",
  "title": "Was ist Kredit?",
  "domain": "Economics",
  "difficulty": 1,
  "durationMinutes": 3,
  "summary": "Wie funktioniert geliehenes Geld — und warum kostet es etwas?",
  "teaches": ["CON:ECO:L0:kredit", "CON:ECO:L0:zinsen", "CON:ECO:L0:schulden"],
  "requires": [],
  "unlocks": ["UNL:NOX:bank-credit"]
}
```

**NOXIA gate:** `UNL:NOX:bank-credit` → schaltet Bank-Kredit-Tab frei.

**Lerninhalt:** Ein Kredit ist geliehenes Geld das mit Zinsen zurückgezahlt
wird. Die Bank leiht Ressourcen heute gegen die Zusage, mehr morgen
zurückzugeben. Sinnvoll wenn der erwartete Gewinn die Zinslast übersteigt.

**Quiz:** Was ist der Hauptnachteil eines Kredits?
- A) Sofortiger Ressourcenzugang
- B) Zinsen erhöhen die Rückzahlungssumme ← korrekt
- C) Keine Rückzahlung nötig
- D) Zinsen werden dem Kreditnehmer gutgeschrieben

---

### ECO-L0-0002 — Was ist Zinseszins?

```json
{
  "id": "ECO-L0-000002",
  "title": "Was ist Zinseszins?",
  "domain": "Economics",
  "difficulty": 1,
  "durationMinutes": 3,
  "summary": "Warum wachsen Schulden schneller als erwartet — und Ersparnisse auch?",
  "teaches": ["CON:ECO:L0:zinseszins", "CON:ECO:L0:exponentielles-wachstum"],
  "requires": ["ECO-L0-000001"],
  "unlocks": ["UNL:NOX:bank-compound"]
}
```

**NOXIA gate:** `UNL:NOX:bank-compound` → schaltet Zinseszins-Vorschau in der Bank frei.

**Quiz:** Warum ist Zinseszins bei Schulden gefährlich?
- A) Schulden wachsen linear
- B) Schulden wachsen exponentiell ← korrekt
- C) Schulden sinken automatisch
- D) Zinsen werden nur einmal berechnet

---

### ECO-L0-0003 — Was ist ein Sicherheitenwert?

```json
{
  "id": "ECO-L0-000003",
  "title": "Was ist ein Sicherheitenwert?",
  "domain": "Economics",
  "difficulty": 1,
  "durationMinutes": 3,
  "summary": "Warum verlangt eine Bank ein Pfand — und wie wird es bewertet?",
  "teaches": ["CON:ECO:L0:sicherheiten", "CON:ECO:L0:beleihungswert"],
  "requires": ["ECO-L0-000001"],
  "unlocks": ["UNL:NOX:bank-collateral"]
}
```

**NOXIA gate:** `UNL:NOX:bank-collateral` → schaltet Sicherheiten-Tab in der Bank frei.

---

### ECO-L1-0001 — Was ist Arbitrage?

```json
{
  "id": "ECO-L1-000001",
  "title": "Was ist Arbitrage?",
  "domain": "Economics",
  "difficulty": 2,
  "durationMinutes": 4,
  "summary": "Wie entsteht risikoloser Gewinn durch Preisunterschiede — und warum verschwindet er?",
  "teaches": ["CON:ECO:L1:arbitrage", "CON:ECO:L1:preisgleichgewicht"],
  "requires": ["ECO-L0-000001"],
  "unlocks": ["UNL:NOX:advanced-trading"]
}
```

---

### ECO-L1-0002 — Was ist Bodenwert?

```json
{
  "id": "ECO-L1-000002",
  "title": "Was ist Bodenwert?",
  "domain": "Economics",
  "difficulty": 2,
  "durationMinutes": 4,
  "summary": "Warum ist dasselbe Grundstück an verschiedenen Orten unterschiedlich viel wert?",
  "teaches": ["CON:ECO:L1:bodenwert", "CON:ECO:L1:grundsteuer", "CON:ECO:L1:henry-george"],
  "requires": ["ECO-L0-000001"],
  "unlocks": ["UNL:NOX:land-value"]
}
```

**Kontext:** Direkt verknüpft mit NOXIA-CITY-SIMULATION F2 (Landwertsteuer nach
Henry George). Der Spieler lernt das Konzept bevor er es im Spiel anwendet.

---

## Requested KXF concepts

```text
CON:ECO:L0:kredit
CON:ECO:L0:zinsen
CON:ECO:L0:schulden
CON:ECO:L0:zinseszins
CON:ECO:L0:exponentielles-wachstum
CON:ECO:L0:sicherheiten
CON:ECO:L0:beleihungswert
CON:ECO:L1:arbitrage
CON:ECO:L1:preisgleichgewicht
CON:ECO:L1:bodenwert
CON:ECO:L1:grundsteuer
CON:ECO:L1:henry-george
```

## Requested NOXIA unlocks (already in NOXIA lib/knowledge/data.ts)

```text
UNL:NOX:bank-credit      → BLD:NOX:bank-credit-1
UNL:NOX:bank-compound    → BLD:NOX:bank-compound-1
UNL:NOX:bank-collateral  → BLD:NOX:bank-collateral-1
UNL:NOX:advanced-trading → BLD:NOX:markt-1
UNL:NOX:land-value       → BLD:NOX:verwaltung-1
```

## Priority

High — bank gate is live in NOXIA Alpha but currently local-only.

## Blocks

- `KNOWLEDGE_SOURCE=ssf` in NOXIA (currently set) requires ECO modules in SSF API
- Bank credit tab remains locked for all players until ECO-L0-000001 exists in SSF
- NOXIA `lib/knowledge/data.ts` ECO entries can be removed once SSF delivers them

## Current workaround

NOXIA has ECO-L0-0001/0002/0003/ECO-L1-0001/0002 hardcoded in
`lib/knowledge/data.ts` with `player_learning_progress` table.
Once SSF delivers canonical modules, NOXIA will switch to SSF IDs
and remove local duplicates.
