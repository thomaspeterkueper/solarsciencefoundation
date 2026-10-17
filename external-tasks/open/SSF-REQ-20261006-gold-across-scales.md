# SSF Request: Gold across scales learning path

**Origin:** cross-project research intake
**Target:** Solar Science Foundation
**Dependency:** canonical KG entities/mappings
**Priority:** medium

## Requested work
Design a learning path that follows gold across physical scales:
1. Au atom and relativistic electronic effects
2. colour/chemistry and electronic structure
3. clusters and nanogold
4. bulk material, alloys and engineering properties
5. Au-197 nuclear properties
6. Au+Au heavy-ion collisions
7. quark-gluon/QCD matter and critical-point searches

Use explicit evidence labels and teach the distinction between a statistically significant non-monotonic observable and a confirmed QCD critical point. Reuse KG IDs once available; do not create competing canonical science entities.

## KG-Handoff 2026-10-17 – Dokumentreferenzen technisch registriert

Der KUEPER Knowledge Graph hat in `exports/kxf-0.6.json` die Shards `exports/document-references-gold-0.1.json` und den bereits vorhandenen `exports/document-references-kue-sci-0.1.json` für die reguläre Dokument-API registriert.

**Für SSF nun referenzierbare Dokument-IDs:**
- `DOC:KUE:KUE-SCI-0195-2026-DE` – naturwissenschaftliche Gold-Grundlagen (Inhalt **Entwurf**, nicht fachlich kanonisiert)
- `DOC:KUE:KUE-SCI-0183-2026-DE` – Goldhydride unter Extrembedingungen (bestehender KUE-Referenzanker)
- `DOC:OTA:OTA-SCI-0106-2026-DE` – skalenübergreifendes OTA-Gold-Dossier
- `DOC:OTA:OTA-SCI-0107-2026-DE` – STAR-Schwerionenbefund, QCD-kritischer Punkt **nicht bestätigt**
- `DOC:OTA:OTA-SCI-0105-2026-DE` – CMS/LHCb-Flavour-Analysen, methodischer Vergleich, **kein** gemeinsamer Gold/QCD-Anomaliennachweis

**Durchgeführte statische Prüfung:** 45 Dokumentreferenzen über Basis- und alle registrierten Shards, 45 eindeutige IDs, Pflichtfelder vorhanden. Neue Gold-Quellpfade vorher gegen GitHub-Inhalte verifiziert.

**Offene Abhängigkeit:** Die KG-Konzepte für Gold, Au-197, relativistische Elektronenstruktur, Nanogold und QCD-Phasen sind noch nicht abschließend auf vorhandene IDs, Relations- und KXF-Zuordnung geprüft. Daher die Lernmodule nur auf Dokumentbezüge vorbereiten und keine provisorischen Concept-/KD-IDs als kanonisch verwenden.

**SSF-Abnahmekriterien:** Eine Abfrage gegen die bereitgestellte KG-API `/api/documents/{id}` liefert alle oben genannten Dokumente; daraus können Module mit Provenienz und Evidenzmarkierung referenzieren. Prüfe tatsächliche Deployment-Version, Netzantwort und Lernpfadverbrauch – diese End-to-End-Verifikation ist **noch offen**. Kein automatischer Merge/Kanontransfer aus diesem Handoff.
