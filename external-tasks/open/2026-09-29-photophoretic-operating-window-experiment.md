# Request — Interactive photophoretic operating-window experiment

Date: 2026-09-29
Status: open
Dependencies: KG photophoretic knowledge model; ENG-CALC-PHOTOPHORETIC-0001

Build a native SSF interactive Experiment using the existing Experiment.tsx architecture.

Inputs: atmosphere/profile, pressure, temperature, irradiance, pore size, deltaT, areal mass, characteristic size. Advanced mode exposes gas/material parameters.

Pipeline:
pressure + temperature + gas -> mean free path -> Kn_pore / Kn_body -> validated force model -> supported areal mass -> payload margin -> operating state.

UI must explain why an input changes the result and link each stage to KG learning prerequisites. Include Earth and Mars presets only as presets; never as hard-coded applicability flags.

Visual outputs: regime indicator, Kn values, force/area, supported areal mass, payload margin and limiting factors. Add day/night and altitude sweep once the scalar model is validated.

Do not present future large-payload scaling as demonstrated fact.
