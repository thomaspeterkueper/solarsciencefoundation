'use client';

import { useMemo, useState } from 'react';

function wavelengthToRgb(wavelength: number): string {
  let r = 0;
  let g = 0;
  let b = 0;

  if (wavelength >= 380 && wavelength < 440) {
    r = -(wavelength - 440) / 60;
    b = 1;
  } else if (wavelength < 490) {
    g = (wavelength - 440) / 50;
    b = 1;
  } else if (wavelength < 510) {
    g = 1;
    b = -(wavelength - 510) / 20;
  } else if (wavelength < 580) {
    r = (wavelength - 510) / 70;
    g = 1;
  } else if (wavelength < 645) {
    r = 1;
    g = -(wavelength - 645) / 65;
  } else {
    r = 1;
  }

  const factor = wavelength < 420
    ? 0.35 + 0.65 * (wavelength - 380) / 40
    : wavelength > 700
      ? 0.35 + 0.65 * (780 - wavelength) / 80
      : 1;

  const channel = (value: number) => Math.round(255 * Math.pow(value * factor, 0.8));
  return `rgb(${channel(r)}, ${channel(g)}, ${channel(b)})`;
}

export default function RayleighExperiment() {
  const [wavelength, setWavelength] = useState(450);

  const relativeScattering = useMemo(() => {
    return Math.pow(700 / wavelength, 4);
  }, [wavelength]);

  const color = wavelengthToRgb(wavelength);
  const width = Math.min(100, (relativeScattering / 11.6) * 100);

  return (
    <div className="native-experiment" aria-label="Interaktives Experiment zur Rayleigh-Streuung">
      <div className="native-experiment-header">
        <span className="native-experiment-label">Interaktives Experiment</span>
        <strong>Rayleigh-Streuung</strong>
      </div>

      <p className="native-experiment-copy">
        Verändere die Wellenlänge. Die Streuung wächst mit <code>1 / λ⁴</code>:
        kurzwelliges Licht wird wesentlich stärker in alle Richtungen verteilt.
      </p>

      <label className="native-slider-label" htmlFor="rayleigh-wavelength">
        <span>Wellenlänge</span>
        <strong>{wavelength} nm</strong>
      </label>
      <input
        id="rayleigh-wavelength"
        type="range"
        min="380"
        max="700"
        step="1"
        value={wavelength}
        onChange={(event) => setWavelength(Number(event.target.value))}
      />

      <div className="rayleigh-visual">
        <div className="rayleigh-light" style={{ background: color }} />
        <div className="rayleigh-meter">
          <span style={{ width: `${width}%`, background: color }} />
        </div>
      </div>

      <div className="native-experiment-stats">
        <div>
          <span>Relative Streuung</span>
          <strong>{relativeScattering.toFixed(2)} × Rot bei 700 nm</strong>
        </div>
        <div>
          <span>Beobachtung</span>
          <strong>{wavelength < 500 ? 'stark gestreut' : wavelength < 600 ? 'mittel' : 'schwach gestreut'}</strong>
        </div>
      </div>
    </div>
  );
}
