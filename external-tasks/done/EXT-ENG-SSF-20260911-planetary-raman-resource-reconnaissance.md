---
id: EXT-ENG-SSF-20260911-PLANETARY-RAMAN-RESOURCE-RECONNAISSANCE
title: Planetary Raman & Resource Reconnaissance – wissenschaftliche Grundlage
status: done
source: KUEPER-ENGINEERING
target: SSF
created: 2026-09-11
completed: 2026-09-13
priority: medium
affects: [SSF, Raman, Planetary Science, Remote Sensing, Resources, Moon, Asteroids, Mars]
---

## Ergebnis

SSF hat die wissenschaftliche Referenzbasis umgesetzt:

- `docs/PLANETARY-RAMAN-RESOURCE-RECONNAISSANCE.md`
- Implementierungs-Commit: `e89f4087ee57563948999564ef1d295b770eebde`

## Erfüllte Acceptance Criteria

1. Nahbereichs-Raman und orbitales 30–50-km-Raman werden strikt getrennt.
2. NASA NIAC 2026 **Interworld Slingshot Resource Surveys** ist als Phase-I-Machbarkeitsstudie und das 30–50-km-Regime als `[H]` gekennzeichnet.
3. Raman, VIS/NIR/SWIR, Thermal IR, Radar, Neutronen-, Gamma-, Lidar-, LIBS/XRF-, geophysikalische und Ground-Truth-Verfahren werden in einer Vergleichsmatrix abgegrenzt.
4. `composition detection ≠ grade ≠ thickness/depth ≠ tonnage ≠ recoverable resource ≠ reserve/economic viability` ist explizit dokumentiert.
5. Mond, Near-Earth Asteroids, Phobos/Deimos und Mars werden als unterschiedliche Messumgebungen behandelt.
6. Quellenbasis enthält NASA/NIAC, NASA Science/PDS/NTRS sowie peer-reviewte SuperCam-, SHERLOC- und Long-range-Raman-Literatur.
7. Das Ergebnis bleibt eine wissenschaftliche SSF-Quelle und übernimmt keine KUEPER-Engineering- oder NOXIA-Identität.

## Zentrale wissenschaftliche Festlegung

- Planetare Raman-Messung im Zentimeter-/Meterbereich: `[R]`.
- Terrestrische Standoff-Raman-Demonstrationen bis etwa 120 m: `[R]`.
- Raman aus 30–50 km Orbit-/Flyby-Distanz: `[H]`, bis ein belastbares Photonbudget und experimentelle Demonstration vorliegen.
- Ein Raman-Mineralnachweis ist keine belastbare Lagerstätten-, Ressourcen- oder Reservenschätzung.

## Offene Übergabe an Engineering

Für quantitative Missionsmodelle müssen Laserenergie, Divergenz, Spotgröße, Apertur, optischer Durchsatz, Detektor-QE, Time Gate, Dwell Time, Pointing/Jitter, Hintergrund, Oberflächenzustand und – bei Mars – atmosphärische Transmission/Aerosole gekoppelt modelliert werden. Diese Größen dürfen nicht durch pauschale Reichweitenskalierung ersetzt werden.
