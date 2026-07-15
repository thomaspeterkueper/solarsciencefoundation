'use client';

import { useMemo, useState } from 'react';

const E_STEEL_MPA = 210000;
const NU_STEEL = 0.3;

function microstrainToUnit(value: number) {
  return value * 1e-6;
}

export default function StrainRosetteExperiment() {
  const [e0, setE0] = useState(500);
  const [e45, setE45] = useState(150);
  const [e90, setE90] = useState(-200);

  const result = useMemo(() => {
    const ex = microstrainToUnit(e0);
    const ey = microstrainToUnit(e90);
    const gamma = microstrainToUnit(2 * e45 - e0 - e90);
    const factor = E_STEEL_MPA / (1 - NU_STEEL ** 2);
    const shearModulus = E_STEEL_MPA / (2 * (1 + NU_STEEL));

    return {
      gammaMicro: 2 * e45 - e0 - e90,
      sigmaX: factor * (ex + NU_STEEL * ey),
      sigmaY: factor * (ey + NU_STEEL * ex),
      tauXY: shearModulus * gamma,
    };
  }, [e0, e45, e90]);

  return (
    <div className="strain-exp">
      <div className="strain-exp__header">
        <div>
          <span className="strain-exp__eyebrow">Interaktives Experiment</span>
          <h3>Was verrät eine 0°/45°/90°-Rosette?</h3>
        </div>
        <span className="strain-exp__material">Stahl · E = 210 GPa · ν = 0,30</span>
      </div>

      <p className="strain-exp__intro">
        Verändere die drei gemessenen Dehnungen. Die Seite rekonstruiert daraus den ebenen
        Dehnungszustand und berechnet die zugehörigen Spannungen.
      </p>

      <div className="strain-exp__grid">
        <div className="strain-exp__controls">
          <RosetteSlider label="DMS 0° · ε₀" value={e0} onChange={setE0} />
          <RosetteSlider label="DMS 45° · ε₄₅" value={e45} onChange={setE45} />
          <RosetteSlider label="DMS 90° · ε₉₀" value={e90} onChange={setE90} />
        </div>

        <div className="strain-exp__diagram" aria-label="Schematische DMS-Rosette">
          <div className="strain-exp__disc">
            <span className="strain-exp__gauge strain-exp__gauge--0">0°</span>
            <span className="strain-exp__gauge strain-exp__gauge--45">45°</span>
            <span className="strain-exp__gauge strain-exp__gauge--90">90°</span>
          </div>
          <p>Drei Messrichtungen · ein gemeinsamer Messpunkt</p>
        </div>
      </div>

      <div className="strain-exp__results">
        <Result label="Schubverzerrung γxy" value={`${result.gammaMicro.toFixed(0)} µε`} />
        <Result label="Normalspannung σx" value={`${result.sigmaX.toFixed(1)} MPa`} />
        <Result label="Normalspannung σy" value={`${result.sigmaY.toFixed(1)} MPa`} />
        <Result label="Schubspannung τxy" value={`${result.tauXY.toFixed(1)} MPa`} />
      </div>

      <p className="strain-exp__note">
        Modellannahme: isotroper, linear-elastischer Werkstoff im ebenen Spannungszustand.
        Für reale Auswertungen müssen Rosettenwinkel, Temperaturkompensation, Klebung und
        Messunsicherheit mit berücksichtigt werden.
      </p>
    </div>
  );
}

function RosetteSlider({ label, value, onChange }: { label: string; value: number; onChange: (value: number) => void }) {
  return (
    <label className="strain-exp__slider">
      <span><strong>{label}</strong><output>{value} µε</output></span>
      <input
        type="range"
        min="-1000"
        max="1000"
        step="10"
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
      />
    </label>
  );
}

function Result({ label, value }: { label: string; value: string }) {
  return (
    <div className="strain-exp__result">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}
