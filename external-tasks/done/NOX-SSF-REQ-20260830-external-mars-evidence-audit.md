---
id: NOX-SSF-REQ-20260830-EXTERNAL-MARS-EVIDENCE-AUDIT
requester: SYS:KUEPER:noxia
target: SYS:KUEPER:ssf
priority: high
type: research-evidence-audit
created: 2026-08-30
completed: 2026-08-30
status: done
affects: [SSF, OTA, NOXIA]
---

# Evidenzaudit: externe Recherche zu Tharsis Hub / 497 Personen

## Abschluss

Audit abgeschlossen und in SSF `main` integriert.

Ergebnisse:
- Detailaudit: `docs/research/tharsis-hub-497-external-evidence-audit.md`
- aktualisierte Basisnote: `docs/research/minimum-viable-mars-colony-497.md` v0.2
- Merge: PR #41, Commit `a7d636c2f69b6dabc705551aad872ee72733bf34`
- OTA-Handoff: `external-tasks/open/SSF-OTA-REQ-20260830-tharsis-hub-evidence-audit-result.md` im Repository `overtime-archive.org`

Kernaussagen:
- keine lineare Personenskalierung für Kolonieenergie; 3–5 MW bleibt [A] bis OTA Bottom-up bilanziert,
- Radiatorfläche nicht pauschal kanonisieren; Marsstaub ist quantitativ relevant,
- 80 m³/P ist kein NASA-Mindestwert; NHV/Bruttodruckvolumen strikt trennen,
- Segmentierung ist hazard-getrieben; keine unbelegte Personenobergrenze,
- 0,3–0,8 t/d Wasser gilt nur für Habitat-/ECLSS-Nachspeisung [A],
- 1,431 t/d ist ein breiter kolonieweiter Vergleichspunkt, keine kanonische Anlagenleistung,
- O₂/CO₂-Größenordnung bestätigt.

Der nächste fachliche Schritt liegt bei OTA Phase 2. NOXIA soll erst aus den dort festgelegten Objektgrenzen, Redundanzen und Abhängigkeiten das Startlayout ableiten.
