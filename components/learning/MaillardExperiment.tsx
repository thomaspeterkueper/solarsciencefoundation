'use client';

import { useMemo, useState } from 'react';
import styles from './MaillardExperiment.module.css';

type Mode = 'temperature' | 'time' | 'ph' | 'aroma' | 'reactants' | 'cooking';

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}

function browningColor(value: number) {
  const lightness = 94 - value * 55;
  const saturation = 38 + value * 34;
  return `hsl(34 ${saturation}% ${lightness}%)`;
}

function MaillardLab({ mode }: { mode: Mode }) {
  const [temperature, setTemperature] = useState(155);
  const [time, setTime] = useState(3);
  const [ph, setPh] = useState(6.5);
  const [moisture, setMoisture] = useState(25);
  const [sugar, setSugar] = useState(50);
  const [amino, setAmino] = useState(50);

  const result = useMemo(() => {
    const effectiveTemperature = temperature - moisture * 0.42;
    const thermal = clamp((effectiveTemperature - 105) / 75, 0, 1.25);
    const timeFactor = clamp(time / 5, 0, 1.4);
    const phFactor = clamp(0.55 + (ph - 4) * 0.13, 0.35, 1.35);
    const reactantBalance = Math.sqrt((sugar / 100) * (amino / 100)) * 2;
    const maillard = clamp(thermal * timeFactor * phFactor * reactantBalance, 0, 1);
    const caramel = clamp(thermal * timeFactor * (sugar / 100) * (1 - amino / 150), 0, 1);
    const burn = clamp((temperature - 188) / 28 + (time - 7) / 8, 0, 1);
    const aroma = clamp((maillard * 0.82 + caramel * 0.45) * (1 - burn * 0.72), 0, 1);

    return { effectiveTemperature, maillard, caramel, burn, aroma };
  }, [temperature, time, ph, moisture, sugar, amino]);

  const showTemperature = mode === 'temperature' || mode === 'aroma' || mode === 'cooking';
  const showTime = mode === 'time' || mode === 'aroma' || mode === 'cooking';
  const showPh = mode === 'ph';
  const showMoisture = mode === 'aroma' || mode === 'cooking';
  const showReactants = mode === 'reactants';

  const status = result.burn > 0.45
    ? 'zu dunkel — Bitterkeit nimmt zu'
    : result.maillard > 0.68
      ? 'kräftige Bräunung und Röstaromen'
      : result.maillard > 0.28
        ? 'erste sichtbare Bräunung'
        : result.effectiveTemperature < 105
          ? 'die Oberfläche dämpft noch'
          : 'Reaktion läuft langsam';

  return (
    <div className={styles.lab}>
      <div className={styles.header}>
        <div>
          <span className={styles.eyebrow}>Virtuelles Küchenlabor</span>
          <strong>Maillard-Reaktion</strong>
        </div>
        <span className={styles.status}>{status}</span>
      </div>

      <div className={styles.grid}>
        <div className={styles.controls}>
          {showTemperature && (
            <Control label="Oberflächentemperatur" value={`${temperature} °C`} min={90} max={220} step={1} current={temperature} onChange={setTemperature} />
          )}
          {showTime && (
            <Control label="Zeit" value={`${time.toFixed(1)} min`} min={0.5} max={10} step={0.5} current={time} onChange={setTime} />
          )}
          {showPh && (
            <Control label="pH-Wert" value={ph.toFixed(1)} min={3} max={10} step={0.1} current={ph} onChange={setPh} />
          )}
          {showMoisture && (
            <Control label="Oberflächenfeuchtigkeit" value={`${moisture} %`} min={0} max={100} step={1} current={moisture} onChange={setMoisture} />
          )}
          {showReactants && (
            <>
              <Control label="Zucker" value={`${sugar} %`} min={0} max={100} step={1} current={sugar} onChange={setSugar} />
              <Control label="Aminosäuren" value={`${amino} %`} min={0} max={100} step={1} current={amino} onChange={setAmino} />
            </>
          )}
        </div>

        <div className={styles.visual}>
          <div className={styles.food} style={{ background: browningColor(result.maillard * 0.82 + result.caramel * 0.35 + result.burn * 0.55) }}>
            <span>{result.burn > 0.5 ? 'verbrannt' : result.maillard > 0.55 ? 'kräftig gebräunt' : result.maillard > 0.2 ? 'goldbraun' : 'blass'}</span>
          </div>
          <div className={styles.meters}>
            <Meter label="Maillard" value={result.maillard} />
            <Meter label="Karamellisierung" value={result.caramel} />
            <Meter label="Aroma" value={result.aroma} />
            <Meter label="Bitterkeit" value={result.burn} />
          </div>
        </div>
      </div>

      <div className={styles.explanation}>
        <div>
          <span>Wirksame Oberflächentemperatur</span>
          <strong>{Math.round(result.effectiveTemperature)} °C</strong>
        </div>
        <p>
          Das Modell ist didaktisch vereinfacht. Es zeigt den Zusammenhang: Wasser muss zunächst verdampfen,
          höhere Temperatur beschleunigt die Reaktion, und Zucker sowie Aminosäuren müssen gleichzeitig vorhanden sein.
        </p>
      </div>
    </div>
  );
}

function Control({ label, value, min, max, step, current, onChange }: {
  label: string;
  value: string;
  min: number;
  max: number;
  step: number;
  current: number;
  onChange: (value: number) => void;
}) {
  return (
    <label className={styles.control}>
      <span><b>{label}</b><strong>{value}</strong></span>
      <input type="range" min={min} max={max} step={step} value={current} onChange={(event) => onChange(Number(event.target.value))} />
    </label>
  );
}

function Meter({ label, value }: { label: string; value: number }) {
  return (
    <div className={styles.meter}>
      <span>{label}</span>
      <div><i style={{ width: `${Math.round(value * 100)}%` }} /></div>
      <strong>{Math.round(value * 100)} %</strong>
    </div>
  );
}

export function MaillardTemperatureExperiment() { return <MaillardLab mode="temperature" />; }
export function MaillardTimeExperiment() { return <MaillardLab mode="time" />; }
export function MaillardPhExperiment() { return <MaillardLab mode="ph" />; }
export function MaillardAromaExperiment() { return <MaillardLab mode="aroma" />; }
export function MaillardReactantsExperiment() { return <MaillardLab mode="reactants" />; }
export function MaillardCookingExperiment() { return <MaillardLab mode="cooking" />; }
