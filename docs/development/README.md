# Entwicklungsstand – Solar Science Foundation

```
Stand: 26.11.2026 (Einstieg nach kueper-ecosystem/docs/development-checkpoints.md v1.0.0, EXT-ECO-SSF-20261125-001)
Letzte verifizierte Revision von main: 4a634d2 (25.11.2026)
```

Einstieg nach [`kueper-ecosystem/docs/development-checkpoints.md`](https://github.com/thomaspeterkueper/kueper-ecosystem/blob/main/docs/development-checkpoints.md). Offene Aufgaben stehen in [`external-tasks/open/`](../../external-tasks/open/), in GitHub-Issues und PRs – hier stehen nur Verweise und der belegte Stand, keine zweite Aufgabenliste. Langfristige Phasen: [`docs/ROADMAP.md`](../ROADMAP.md); Übergaben: [`docs/handoffs/`](../handoffs/). Wer einen Workstream fortsetzt, liest zuerst seinen Checkpoint und aktualisiert ihn im selben Commit wie den Arbeitsschritt.

| Workstream | Status | Checkpoint |
|---|---|---|
| Lernpfade aus den Chronomaps | integriert, laufend | unten |
| Physik-Einstieg und KD:PHYS:N1 | KD:PHYS:N1 integriert; kompetenzbasierter Einstieg geplant | unten |
| Lernmodule in Arbeit (Draft-PRs) | implementiert, nicht gemergt | unten |
| Review-Gate für SSF-PRs | implementiert (Entwurf) | unten |

## Lernpfade aus den Chronomaps

- Ziel: Jedes Wissensthema der NOXIA-Chronomaps erhält nach dem Nachtrag im Wissensgraphen einen Platz in einem SSF-Lernpfad (Spieler und NPCs).
- Status: integriert, laufend; vier Lernpfade als Prototyp (zuletzt `PATH:SSF:HIS-RECHT-MACHT-GALILAEA-30-0001`, 21.11.2026).
- Branch / PR: direkt auf `main`.
- Letzte verifizierte Revision: `76ed67c` (21.11.2026, SSF-HIS-3003).
- Tests: `npm test` (Typprüfung und Node-Tests unter `tests/`).
- Offene Schritte: Fahrplan in [`docs/SSF-CHRONOMAP-WISSEN.md`](../SSF-CHRONOMAP-WISSEN.md) (dort geführt, hier nicht kopiert).
- Risiken / offene Fragen: Wissensdateien liegen in `noxiagame`, IDs im KG – neue Themen erst nach dem KG-Nachtrag aufnehmen.
- Abschlusskriterien: alle Wissensdateien des Fahrplans einem Lernpfad zugeordnet.
- Maßgebliche Dokumente: [`docs/SSF-CHRONOMAP-WISSEN.md`](../SSF-CHRONOMAP-WISSEN.md), [`docs/SSF-BELEGSTUFEN.md`](../SSF-BELEGSTUFEN.md), [`docs/SSF-LERNPFAD-TEMPLATE.md`](../SSF-LERNPFAD-TEMPLATE.md).

## Physik-Einstieg und KD:PHYS:N1

- Ziel: kompetenzbasierter Physik-Einstieg mit eigenständigen SSF-Lernpfaden; KD:PHYS:N1 mit geschärften Kurztests.
- Status: KD:PHYS:N1 integriert (#92, Merge `d1e72f7`, 14.11.2026); kompetenzbasierter Einstieg geplant (#93).
- Branch / PR: `claude/ssf-issue-92-nox-observation` (gemergt); für #93 noch keiner.
- Letzte verifizierte Revision: `d1e72f7` (14.11.2026).
- Tests: `npm test`.
- Offene Schritte: Issue #93, Issue #92 (Schließen nach Prüfung).
- Risiken / offene Fragen: Übernahme des NOXIA-Einstufungstests als initiale Einstufung erst nach Prüfung der Aufgaben (Kommentar in #93); siehe [`docs/adaptive-competency-assessment.md`](../adaptive-competency-assessment.md).
- Abschlusskriterien: #93 umgesetzt und auf `main` geprüft.
- Maßgebliche Dokumente: [`docs/LEARNING-PATH-LIFECYCLE.md`](../LEARNING-PATH-LIFECYCLE.md), [`docs/LEARNING-PRINCIPLES.md`](../LEARNING-PRINCIPLES.md).

## Lernmodule in Arbeit (Draft-PRs)

- Ziel: neue Lernmodule bzw. -pfade außerhalb der Chronomap-Reihe; jeder PR ist sein eigener Checkpoint.
- Status: implementiert, nicht gemergt (Stand 26.11.2026).
- Branch / PR: #95 (Dione), #94 (Knoblauch–Ingwer–Zitrone), #86 (schwebende Nanokugel), #84 (Kerntransmutation, Issue #83), #79 und #62 (Saturn-Hexagon), #61 und #60 (atmosphärische Refraktion, Issue #57); Lernbaustein ohne PR: [`docs/handoffs/OTA-225-physical-residual-vs-numerical-artifact.md`](../handoffs/OTA-225-physical-residual-vs-numerical-artifact.md).
- Letzte verifizierte Revision: Head-Commits laut GitHub am 26.11.2026.
- Tests: `npm test` je PR.
- Offene Schritte: die PRs selbst; Lernpfad-Requests in `external-tasks/open/`.
- Risiken / offene Fragen: #62/#79 und #60/#61 behandeln jeweils dasselbe Thema – vor einem Merge klären, welcher PR weitergeführt wird.
- Abschlusskriterien: PR gemergt oder geschlossen; danach Zeile hier entfernen.
- Maßgebliche Dokumente: PR-Beschreibungen, [`docs/SSF-LERNPFAD-TEMPLATE.md`](../SSF-LERNPFAD-TEMPLATE.md).

## Review-Gate für SSF-PRs

- Ziel: Merge nur bei automatisiertem Review für den exakten PR-Head.
- Status: implementiert (Entwurf), nicht gemergt.
- Branch / PR: #54 (`governance/pr-review-gate-draft`).
- Letzte verifizierte Revision: `4cae06b` (01.09.2026).
- Tests: –
- Offene Schritte: #54.
- Risiken / offene Fragen: Überschneidung mit dem zentralen Review in `kueper-ecosystem` (`docs/architecture/AUTOMATED_PR_REVIEW_AGENT.md`); Änderungen an Workflows brauchen Thomas' Freigabe.
- Abschlusskriterien: #54 gemergt oder geschlossen.
- Maßgebliche Dokumente: [`docs/TEST-GOVERNANCE.md`](../TEST-GOVERNANCE.md).
