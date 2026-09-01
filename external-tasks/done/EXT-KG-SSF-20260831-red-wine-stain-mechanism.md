---
id: EXT-KG-SSF-20260831-red-wine-stain-mechanism
title: Rotweinflecken-Lernpfad auf Polyphenolchemie statt Proteindenaturierung umstellen
status: done
source: KG
target: SSF
created: 2026-08-31
completed: 2026-09-01
requested_by: research-validation-loop
priority: high
affects: [KG, SSF]
---

# Completion

SSF has replaced the runtime Rotwein learning experience with a corrected model based on the supplied KG R1 boundary.

Implemented:
- Rotwein is treated as an anthocyanin/polyphenol system rather than a protein-denaturation stain.
- Cotton is explicitly treated as cellulose.
- The unsupported 40 °C / 80 °C cross-linking thresholds were removed from the native experiment.
- No universal hot/cold washing rule or fabricated treatment-efficiency percentages remain in the native experiment.
- Protein denaturation remains only as a contrast case for genuine protein stains such as blood, egg, or milk.
- Scientific mechanism and conditional textile-care advice are explicitly separated.
- A corrected specialized runtime path now takes precedence over the legacy registry entry for `PATH:SSF:CHE-REINIGUNG-ROTWEIN-0001`.
- Incorrect protein-domain/unlock dependencies are not propagated. Canonical replacement KD IDs were not supplied by this request, so SSF deliberately does not invent them.

Implementation commits:
- `1e9ebbbd152f6d397e00c16cd3f7bfc423f12fa5` — corrected native experiment
- `d1d3d6d5a573906d485116f62597895059a64e2a` — corrected specialized learning path
- `c89005b51ab827b9b596d8a878125b47a30a69f3` — registry precedence for corrected path

## Original requirement summary

Research Candidate `RES-20260831-A397C7AD`, revision `R1 — critical-review replacement`, established that the prior protein-denaturation / thermal cross-linking explanation for red wine on cotton was not scientifically supportable. The corrected didactic core is anthocyanin/polyphenol chemistry on a cellulosic substrate, with explicit evidence limits and no universal washing-temperature law.
