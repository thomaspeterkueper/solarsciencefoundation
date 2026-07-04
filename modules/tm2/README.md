# TM2 Lernmodule · Zusammengesetzte Beanspruchung

Status: Draft  
Quelle: `Zusammengesetzte_Beanspruchung_Lernheft.pdf`

Dieses Verzeichnis enthält die erste konkrete SSF-Umwandlung eines bestehenden Lernhefts in maschinenlesbare Lernmodule.

## Lernpfad

- `LEARNING-PATH-TM2-COMBINED-STRESS.yaml` — Zusammengesetzte Beanspruchung

## Module

1. `TM2-COMB-001.yaml` — Überlagerung von Spannungen *(foundation)*
2. `TM2-PRESS-001.yaml` — Dünnwandige Druckbehälter und Kesselformeln *(optional_bridge)*
3. `TM2-STRESS-001.yaml` — Spannungszustand im Punkt *(conceptual_core)*
4. `TM2-PRINCIPAL-001.yaml` — Hauptspannungen und Mohrscher Kreis *(advanced_core)*
5. `TM2-COMB-002.yaml` — Biegung und Torsion an Wellen *(engineering_application)*
6. `TM2-STRAIN-001.yaml` — Mehrachsige Dehnung, Hooke und DMS *(measurement_and_extension)*
7. `TM2-EQUIV-001.yaml` — Vergleichsspannung und Festigkeitsnachweis *(capstone)*

## Dependency Graph

```
TM2-COMB-001 (Einstieg)
├── TM2-PRESS-001 (optional_bridge)
├── TM2-STRESS-001
│   ├── TM2-PRINCIPAL-001
│   │   └── TM2-COMB-002 (+ TM2-COMB-001)
│   │       └── TM2-EQUIV-001
│   └── TM2-STRAIN-001 (extends TM2-PRINCIPAL-001)
```

## Zweck

Diese Dateien sind absichtlich noch nicht endgültig. Sie dienen als praktischer Testfall für:

- SSF-Modulformat
- mehrsprachige Kursstruktur
- Knowledge-Graph-Anforderungen
- spätere Website-Ausspielung
- spätere NOXIA- oder Kurs-Integration

## Offene nächste Schritte

- Kanonische IDs aus dem KUEPER Knowledge Graph übernehmen.
- Modul-Schema gegen KG-0006 (Schema-Alignment) validieren.
- Englische Fassungen ergänzen.
- Aufgaben und Lösungen als eigene `Assessment`-Objekte auslagern.
- Formeln als eigene `Formula`-Entitäten im Knowledge Graph referenzieren.
