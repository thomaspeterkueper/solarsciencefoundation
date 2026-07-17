'use client';
/**
 * KaramellSimulatorExperiment — EXP:KARAMELL-SIMULATION
 * Temperature + time → caramel color, aroma, residual heat warning
 */
import { useCallback, useEffect, useRef, useState } from 'react';
import styles from './RayleighExperiment.module.css';

const CARAMEL_COLORS = ['#FAFAF5','#FFF8DC','#FFE680','#FFD700','#DAA520','#B8860B','#8B6914','#5C3D0A','#2D1500','#0A0500'];

function getTempColor(T: number): string {
  const idx = Math.max(0, Math.min(9, Math.floor((T - 100) / 10)));
  return CARAMEL_COLORS[idx];
}

function getAroma(T: number): { label: string; intensity: number; quality: string } {
  if (T < 140) return { label: '—', intensity: 0, quality: 'neutral' };
  if (T < 160) return { label: 'leicht süss', intensity: 10, quality: 'gut' };
  if (T < 170) return { label: 'karamellig', intensity: 45, quality: 'gut' };
  if (T < 178) return { label: 'reich, nussig', intensity: 80, quality: 'perfekt' };
  if (T < 186) return { label: 'intensiv, komplex', intensity: 95, quality: 'perfekt' };
  if (T < 193) return { label: 'bitter', intensity: 70, quality: 'schlecht' };
  return { label: 'verbrannt', intensity: 30, quality: 'unbrauchbar' };
}

export default function KaramellSimulatorExperiment() {
  const [T, setT] = useState(140);
  const [herdAn, setHerdAn] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Simulated temperature when herd is on
  const heatingRate = 3; // °C per second
  const residualHeat = 8; // °C added after turning off

  const toggleHerd = useCallback(() => {
    if (herdAn) {
      setHerdAn(false);
      setT(prev => Math.min(200, prev + residualHeat));
      if (intervalRef.current) clearInterval(intervalRef.current);
    } else {
      setHerdAn(true);
    }
  }, [herdAn]);

  useEffect(() => {
    if (herdAn) {
      intervalRef.current = setInterval(() => {
        setT(prev => Math.min(200, prev + heatingRate));
        setElapsed(prev => prev + 1);
      }, 1000);
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [herdAn]);

  const reset = () => { setT(140); setElapsed(0); setHerdAn(false); if (intervalRef.current) clearInterval(intervalRef.current); };

  const color = getTempColor(T);
  const aroma = getAroma(T);
  const isWarning = T >= 186;
  const isPerfect = T >= 170 && T < 186;

  // Draw pot
  useEffect(() => {
    const canvas = canvasRef.current; if (!canvas) return;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = canvas.offsetWidth * dpr; canvas.height = 120 * dpr;
    const ctx = canvas.getContext('2d')!; ctx.scale(dpr, dpr);
    const W = canvas.offsetWidth, H = 120;
    ctx.fillStyle = '#F9F8F5'; ctx.fillRect(0, 0, W, H);
    // Herd flame
    if (herdAn) {
      for (let i = 0; i < 5; i++) {
        const fx = W * 0.5 + (i - 2) * 22;
        ctx.fillStyle = i % 2 === 0 ? '#FF6B00' : '#FFD700';
        ctx.beginPath(); ctx.ellipse(fx, H - 8, 5, 10, 0, 0, Math.PI * 2); ctx.fill();
      }
    }
    // Pot
    const cx = W / 2, cy = H * 0.52, pw = W * 0.52, ph = H * 0.42;
    ctx.strokeStyle = '#888'; ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(cx - pw / 2, cy - ph); ctx.lineTo(cx - pw / 2, cy);
    ctx.quadraticCurveTo(cx - pw / 2, cy + 12, cx, cy + 12);
    ctx.quadraticCurveTo(cx + pw / 2, cy + 12, cx + pw / 2, cy);
    ctx.lineTo(cx + pw / 2, cy - ph); ctx.stroke();
    // Fill
    const fH = ph * 0.6;
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(cx - pw / 2 + 3, cy - fH + 3); ctx.lineTo(cx + pw / 2 - 3, cy - fH + 3);
    ctx.lineTo(cx + pw / 2 - 3, cy); ctx.quadraticCurveTo(cx + pw / 2 - 3, cy + 10, cx, cy + 10);
    ctx.quadraticCurveTo(cx - pw / 2 + 3, cy + 10, cx - pw / 2 + 3, cy);
    ctx.closePath(); ctx.fill();
    // Steam if hot
    if (T > 155) {
      for (let i = 0; i < 3; i++) {
        ctx.strokeStyle = 'rgba(200,200,200,0.5)'; ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(cx - 15 + i * 15, cy - fH - 5);
        ctx.bezierCurveTo(cx - 10 + i * 15, cy - fH - 15, cx + 5 + i * 15, cy - fH - 20, cx + i * 15, cy - fH - 30);
        ctx.stroke();
      }
    }
    // Temp label
    ctx.fillStyle = isWarning ? '#DC143C' : isPerfect ? '#2A5C2A' : '#1C2B3A';
    ctx.font = 'bold 14px monospace'; ctx.textAlign = 'center';
    ctx.fillText(T + '°C', cx + pw / 2 + 28, cy - fH / 2 + 5);
  }, [T, herdAn, color, isWarning, isPerfect]);

  useEffect(() => {
    const obs = new ResizeObserver(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const dpr = window.devicePixelRatio || 1;
      canvas.width = canvas.offsetWidth * dpr;
    });
    if (canvasRef.current) obs.observe(canvasRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div className={styles.nativeExperiment}>
      <div className={styles.header}><span className={styles.label}>Experiment</span><strong>Karamell-Simulator</strong></div>

      <canvas ref={canvasRef} style={{ display: 'block', width: '100%', height: 120, borderRadius: 6, border: `2px solid ${isWarning ? '#DC143C' : isPerfect ? '#7AAD7A' : 'var(--border)'}`, marginBottom: 12 }} />

      {/* Manual slider */}
      <label className={styles.sliderLabel} htmlFor="ks-t" style={{ marginBottom: 4 }}><span>Temperatur (manuell)</span><strong>{T}°C</strong></label>
      <input id="ks-t" type="range" min="100" max="200" value={T} onChange={e => { setT(+e.target.value); setHerdAn(false); if (intervalRef.current) clearInterval(intervalRef.current); }} />

      {/* Controls */}
      <div style={{ display: 'flex', gap: 8, marginTop: 10 }}>
        <button onClick={toggleHerd} style={{
          flex: 1, padding: '9px 0', borderRadius: 6, border: 'none', cursor: 'pointer',
          fontFamily: 'var(--font-mono)', fontSize: 12, letterSpacing: '.04em',
          background: herdAn ? '#DC143C' : 'var(--navy)', color: '#fff',
        }}>
          {herdAn ? '🔥 Herd AUS' : '▶ Herd AN'}
        </button>
        <button onClick={reset} style={{
          padding: '9px 16px', borderRadius: 6, border: '1px solid var(--border)',
          fontFamily: 'var(--font-mono)', fontSize: 12, background: 'var(--soft)', color: 'var(--muted)', cursor: 'pointer',
        }}>Neu</button>
      </div>

      {/* Status */}
      <div style={{ marginTop: 10, padding: '12px 14px', background: isWarning ? '#F5EEEE' : isPerfect ? '#EEF3EE' : 'var(--surface)', borderRadius: 6, border: `1px solid ${isWarning ? '#C49090' : isPerfect ? '#7AAD7A' : 'var(--border)'}` }}>
        <strong style={{ color: isWarning ? '#6B2222' : isPerfect ? 'var(--ok-t)' : 'var(--muted)', fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '.08em', textTransform: 'uppercase' }}>
          {isWarning ? '⚠ VERBRANNT — Fenster auf!' : isPerfect ? '✓ PERFEKT — jetzt von der Hitze nehmen!' : T < 160 ? 'Noch warten...' : 'Karamellisiert'}
        </strong>
        <div style={{ marginTop: 4, fontSize: 13.5, color: 'var(--text-2)' }}>
          {isWarning ? 'Restverbrennungen sind nicht mehr rückgängig zu machen. Topf weggeben.' :
           isPerfect ? 'Der Topf gibt noch Wärme ab — von der Herdplatte nehmen bevor es zu spät ist.' :
           T < 160 ? `Noch ${160 - T}°C bis zur Karamellisierung.` :
           'Karamellisierung läuft. Noch nicht von der Hitze nehmen.'}
        </div>
      </div>

      <div className={styles.stats} style={{ marginTop: 10 }}>
        <div><span>Aroma</span><strong>{aroma.label}</strong></div>
        <div><span>Zeit</span><strong>{elapsed} s</strong></div>
        <div><span>Aroma-Intensität</span>
          <strong style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <div style={{ width: 60, height: 6, background: 'var(--surface2)', borderRadius: 3, overflow: 'hidden' }}>
              <div style={{ width: `${aroma.intensity}%`, height: '100%', background: isWarning ? '#DC143C' : '#C9A84C', borderRadius: 3 }} />
            </div>
            {aroma.intensity}%
          </strong>
        </div>
        <div><span>Qualität</span><strong style={{ color: aroma.quality === 'perfekt' ? 'var(--ok-t)' : aroma.quality === 'schlecht' || aroma.quality === 'unbrauchbar' ? '#DC143C' : 'var(--muted)' }}>{aroma.quality}</strong></div>
      </div>
    </div>
  );
}
