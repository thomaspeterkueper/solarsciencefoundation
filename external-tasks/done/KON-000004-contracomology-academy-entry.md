# KON-000004 — Prepare Contracomology Academy entry

Source: `thomaspeterkueper/contracomology` → `external-tasks/open/KG.KON-000004-ssf-akademie-eintrag.md`
Target: `thomaspeterkueper/solarsciencefoundation`
Status: open
Routed: 2026-08-27

## Requirement

Prepare an SSF Academy catalogue entry for the Contracomology introductory course.

## Link target

`contracomology.org`, once the course/site is deployed and the target is verified.

## Scope boundary

SSF owns the course catalogue and learning context. Knowledge Graph owns authoritative concept definitions. Contracomology owns the subject portal/course surface.

## Blocker

Do not publish an unverified external link or invent missing course metadata. The implementation requires confirmation that the intended Contracomology course page is deployed and stable.

## Provenance

This file routes an existing cross-repository requirement into the repository that owns the SSF Academy catalogue. It does not modify scientific content or canon.

## Umsetzung / Rückgabe an KG

Umgesetzt 2026-08-31 in `thomaspeterkueper/solarsciencefoundation` (Branch `ecosystem/task-af49b4dc`):

- SSF-Academy-Katalogeintrag: `PATH:SSF:KON-EINFUEHRUNG-0001` — neue Datei `lib/learningPaths/contracomology.ts`, registriert in `lib/learningPathRegistry.ts`
- Modul-/KXF-IDs: `KON-L1-000001` (sourceModuleId), `LRN:SSF:KON-L1-000001` (kxfModuleId)
- Subject-Eintrag `SUB:KON` (slug `contracomology`) in `lib/subjects.ts`
- Fachliche Grundlage ausschließlich `KD:KON:N1` und die sechs kanonischen Konzepte `CON:L1:zeitform`, `CON:L1:avi-punkt`, `CON:L1:oem`, `CON:L1:paradigma-1/2/3`; `CON:L1:ma-u` / `CON:L1:ma-ta-u` wurden nicht verwendet (`definitionStatus=pending_definition`)
- Epistemischer Marker [W] (Werk-Theorie, keine externe wissenschaftliche Validierung, kein Peer-Review, kein empirischer Befund) ist im Eintrag ausgewiesen
- Link-Ziel: ausschließlich die verifizierte Portal-Root `https://contracomology.org/` (durch KG verifiziert erreichbar, unabhängig geprüft 2026-08-31). Kein Deep-Link auf eine Kursseite veröffentlicht, da die Contracomology-Kursfläche auf dem Portal noch nicht deployed ist — Deep-Link folgt, sobald Contracomology die Kursseite bereitstellt und sie verifiziert ist
- Keine NOXIA-Unlock-Keys erfunden (Gameplay-Wirkung bleibt NOXIA Source of Truth); `unlocks: []`
- Rückmeldung der Modul-/Pfad-IDs an den KG zur Registrierung im Learning-Contract: `.kueper/outbox/SSF-KG-KON-000004-learning-contract-registration.json`
