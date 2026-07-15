# ssf-magazine

**Module:** Solar Science Foundation (SSF)
**Status:** Planned — architecture defined in ECO-ARC-0009
**ADR:** `/docs/ECO-ARC-0009-ssf-magazine.md`

---

## Was dieses Modul ist

Ein wöchentliches Editorial-Format innerhalb der SSF.

Kein Kurs. Kein Lernpfad. Ein **Magazin**.

Zwei Formate pro Ausgabe:
- **Kurzform** — Social Snippet (~280 Zeichen + 1 Absatz)
- **Langform** — PDF/E-Mail (~800–1200 Wörter)

---

## Was dieses Modul nicht ist

- Kein primärer Daten-Owner — Content kommt aus KG, OTA, kueper.com, NOXIA
- Kein Lernpfad — folgt nicht der SSF-Didaktik-Dramaturgie
- Kein eigenständiges Top-Level-Projekt im Ökosystem

---

## Architektur (geplant)

```
Candidate Scanner
    ↓
Draft Generator (Claude API)
    ↓
Review Queue (GitHub Issue/PR)
    ↓
Publisher (Social / PDF / E-Mail)
```

Details: `/docs/ECO-ARC-0009-ssf-magazine.md`

---

## Öffentlicher Name

Arbeitstitel: `SSF Magazine`

"Strukturen" / "Structures" ist ausgeschlossen (Naming-Konflikt).
Finaler öffentlicher Name: offen.

---

## Status der Implementierung

- [x] ADR akzeptiert (ECO-ARC-0009)
- [ ] Candidate Scanner
- [ ] Draft Generator
- [ ] Review Queue
- [ ] Publisher

---

*ssf-magazine · Solar Science Foundation · 2026-07-15*
