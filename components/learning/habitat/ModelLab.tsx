'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { defaults, fmt, type ModelDef, type SimResult } from '../../../lib/habitatModels';
import { getModel } from '../../../lib/workshopModels';
import styles from './ModelLab.module.css';

const W = 640, H = 300;
const M = { l: 58, r: 16, t: 14, b: 40 };

function niceTicks(min: number, max: number, count = 5): number[] {
  const span = max - min || 1;
  const raw = span / count;
  const pow = Math.pow(10, Math.floor(Math.log10(raw)));
  const step = [1, 2, 2.5, 5, 10].map((m) => m * pow).find((s) => s >= raw) ?? pow * 10;
  const start = Math.ceil(min / step) * step;
  const out: number[] = [];
  for (let v = start; v <= max + step * 1e-6; v += step) out.push(Number(v.toPrecision(12)));
  return out;
}

function Chart({ result, cursor }: { result: SimResult; cursor: number }) {
  const { x, series, thresholds, markers, logY } = result;
  const xMin = x[0], xMax = x[x.length - 1];
  const all = series.flatMap((s) => s.values).filter((v) => Number.isFinite(v));
  const th = thresholds.map((t) => t.y);
  let yMin = result.yMin ?? Math.min(...all, ...th);
  let yMax = result.yMax ?? Math.max(...all, ...th) * 1.05;
  if (yMax <= yMin) yMax = yMin + 1;
  const ly = (v: number) => Math.log10(Math.max(v, 1e-12));
  const sy = (v: number) => {
    const f = logY ? (ly(v) - ly(yMin)) / (ly(yMax) - ly(yMin)) : (v - yMin) / (yMax - yMin);
    return M.t + (1 - Math.min(1.02, Math.max(-0.02, f))) * (H - M.t - M.b);
  };
  const sx = (v: number) => M.l + ((v - xMin) / (xMax - xMin || 1)) * (W - M.l - M.r);
  const yTicks = logY
    ? Array.from({ length: Math.round(ly(yMax) - ly(yMin)) + 1 }, (_, k) => Math.pow(10, Math.round(ly(yMin)) + k))
    : niceTicks(yMin, yMax);
  const xTicks = x.length <= 8 ? x : niceTicks(xMin, xMax, 6);
  const path = (vals: number[]) => vals.map((v, i) => `${i ? 'L' : 'M'}${sx(x[i]).toFixed(1)},${sy(v).toFixed(1)}`).join(' ');
  const yStep = yTicks.length > 1 ? Math.abs(yTicks[1] - yTicks[0]) : 1;
  const yDecimals = Math.min(3, Math.max(0, -Math.floor(Math.log10(yStep) + 1e-9)));
  const tickLabel = (v: number) => (logY ? `10${superscript(Math.round(Math.log10(v)))}` : v.toLocaleString('de-DE', { minimumFractionDigits: yDecimals, maximumFractionDigits: yDecimals }));
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className={styles.chart} role="img" aria-label={`${result.yLabel} über ${result.xLabel}`}>
      {yTicks.map((v) => (
        <g key={`y${v}`}>
          <line x1={M.l} x2={W - M.r} y1={sy(v)} y2={sy(v)} stroke="#e6e2d8" />
          <text x={M.l - 6} y={sy(v) + 4} textAnchor="end" className={styles.axis}>{tickLabel(v)}</text>
        </g>
      ))}
      {xTicks.map((v) => (
        <g key={`x${v}`}>
          <line x1={sx(v)} x2={sx(v)} y1={H - M.b} y2={H - M.b + 4} stroke="#888" />
          <text x={sx(v)} y={H - M.b + 17} textAnchor="middle" className={styles.axis}>{fmt(v, 1)}</text>
        </g>
      ))}
      <line x1={M.l} x2={W - M.r} y1={H - M.b} y2={H - M.b} stroke="#888" />
      <line x1={M.l} x2={M.l} y1={M.t} y2={H - M.b} stroke="#888" />
      <text x={(M.l + W - M.r) / 2} y={H - 6} textAnchor="middle" className={styles.axisLabel}>{result.xLabel}</text>
      <text transform={`translate(14 ${(M.t + H - M.b) / 2}) rotate(-90)`} textAnchor="middle" className={styles.axisLabel}>{result.yLabel}</text>
      {thresholds.map((t) => (
        <g key={t.label}>
          <line x1={M.l} x2={W - M.r} y1={sy(t.y)} y2={sy(t.y)} stroke={t.tone === 'bad' ? '#b3261e' : '#c99a1c'} strokeDasharray="6 4" />
          <text x={W - M.r - 4} y={sy(t.y) - 4} textAnchor="end" className={styles.thLabel} fill={t.tone === 'bad' ? '#b3261e' : '#8a6a0c'}>{t.label}</text>
        </g>
      ))}
      {markers.map((m) => (
        <g key={m.label + m.x}>
          <line x1={sx(m.x)} x2={sx(m.x)} y1={M.t} y2={H - M.b} stroke={m.color} strokeDasharray="2 3" />
          <text x={sx(m.x) + 3} y={M.t + 11} className={styles.thLabel} fill={m.color}>{m.label}</text>
        </g>
      ))}
      {series.map((s) => (
        <path key={s.name} d={path(s.values)} fill="none" stroke={s.color} strokeWidth={s.thin ? 1.2 : 2.4} strokeDasharray={s.dashed ? '5 4' : undefined} strokeLinejoin="round" />
      ))}
      {cursor >= 0 && cursor < x.length && (
        <g>
          <line x1={sx(x[cursor])} x2={sx(x[cursor])} y1={M.t} y2={H - M.b} stroke="#1d1d1b" strokeWidth={1} />
          {series.map((s) => <circle key={s.name} cx={sx(x[cursor])} cy={sy(s.values[cursor])} r={4} fill={s.color} stroke="#fff" strokeWidth={1.5} />)}
        </g>
      )}
    </svg>
  );
}

function superscript(n: number): string {
  const map: Record<string, string> = { '-': '⁻', '0': '⁰', '1': '¹', '2': '²', '3': '³', '4': '⁴', '5': '⁵', '6': '⁶', '7': '⁷', '8': '⁸', '9': '⁹' };
  return String(n).split('').map((c) => map[c] ?? c).join('');
}

export function ModelLab({ model }: { model: ModelDef }) {
  const [values, setValues] = useState<Record<string, number>>(() => defaults(model));
  const result = useMemo(() => model.simulate(values), [model, values]);
  const last = result.x.length - 1;
  const [cursor, setCursor] = useState(last);
  const [playing, setPlaying] = useState(false);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => { setCursor(result.x.length - 1); }, [result.x.length]);

  useEffect(() => {
    if (!playing) return undefined;
    const stride = Math.max(1, Math.ceil(last / 120));
    timer.current = setInterval(() => {
      setCursor((c) => {
        if (c + stride >= last) { setPlaying(false); return last; }
        return c + stride;
      });
    }, 50);
    return () => { if (timer.current) clearInterval(timer.current); };
  }, [playing, last]);

  const play = () => { setCursor(0); setPlaying(true); };
  const set = (key: string, v: number) => { setPlaying(false); setValues((cur) => ({ ...cur, [key]: v })); };

  return (
    <div className={styles.lab}>
      <h4 className={styles.title}>{model.title}</h4>
      <p className={styles.intro}>{model.intro}</p>
      <div className={styles.controls}>
        {model.params.map((p) => p.kind === 'range' ? (
          <label key={p.key} className={styles.control}>
            <span>{p.label}: <strong>{fmt(values[p.key], 2)} {p.unit}</strong></span>
            <input type="range" min={p.min} max={p.max} step={p.step} value={values[p.key]} onChange={(e) => set(p.key, +e.target.value)} />
          </label>
        ) : p.kind === 'select' ? (
          <label key={p.key} className={styles.control}>
            <span>{p.label}</span>
            <select value={values[p.key]} onChange={(e) => set(p.key, +e.target.value)}>
              {p.options.map((o) => <option key={o.label} value={o.value}>{o.label}</option>)}
            </select>
          </label>
        ) : (
          <label key={p.key} className={`${styles.control} ${styles.toggle}`}>
            <input type="checkbox" checked={values[p.key] === 1} onChange={(e) => set(p.key, e.target.checked ? 1 : 0)} />
            <span>{p.label}</span>
          </label>
        ))}
      </div>
      <div className={styles.chartWrap}><Chart result={result} cursor={cursor} /></div>
      <div className={styles.legend}>
        {result.series.map((s) => <span key={s.name}><i className={styles.swatch} style={{ borderColor: s.color, borderTopStyle: s.dashed ? 'dashed' : 'solid' }} />{s.name}</span>)}
      </div>
      <div className={styles.player}>
        <button type="button" onClick={play}>{playing ? '… läuft' : '▶ Ablauf abspielen'}</button>
        <input type="range" min={0} max={last} value={Math.min(cursor, last)} onChange={(e) => { setPlaying(false); setCursor(+e.target.value); }} aria-label="Zeitpunkt wählen" />
        <button type="button" className={`${styles.secondary} ${styles.reset}`} onClick={() => { setPlaying(false); setValues(defaults(model)); }}>Zurücksetzen</button>
      </div>
      <div className={styles.readouts}>
        {result.atCursor(Math.min(cursor, last)).map((r) => <div key={r.label} className={`${styles.readout} ${r.tone ? styles[r.tone] : ''}`}><small>{r.label}</small><b>{r.value}</b></div>)}
        {result.readouts.map((r) => <div key={r.label} className={`${styles.readout} ${r.tone ? styles[r.tone] : ''}`}><small>{r.label}</small><b>{r.value}</b></div>)}
      </div>
      <div className={`${styles.verdict} ${styles[result.verdict.tone]}`}><strong>Ergebnis: </strong>{result.verdict.text}</div>
      <strong>Probiere aus:</strong>
      <ul className={styles.try}>{model.tryThis.map((t) => <li key={t}>{t}</li>)}</ul>
      <p className={styles.assume}>Modellannahmen: {model.assumptions}</p>
    </div>
  );
}

export function habitatExperiment(id: string) {
  const model = getModel(id);
  if (!model) throw new Error(`Unbekanntes Lernmodell ${id}`);
  const Component = () => <ModelLab model={model} />;
  Component.displayName = `HabitatModel(${id})`;
  return Component;
}
