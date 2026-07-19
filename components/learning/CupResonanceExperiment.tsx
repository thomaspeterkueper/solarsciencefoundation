'use client';
/**
 * CupResonanceExperiment — EXP:KAFFEETASSE
 * Cup resonance: fill level → frequency, cup shape visualization, Web Audio
 * Physics: Helmholtz resonator + standing wave in air column
 * Parameters: fill level (0–100%), cup width, wall thickness
 */
import { useCallback, useEffect, useRef, useState } from 'react';
import styles from './RayleighExperiment.module.css';

// ── Physics ───────────────────────────────────────────────────────────────
// Simplified Helmholtz/air-column model for ceramic cup:
// Empty cup: long air column → low frequency (~280 Hz)
// Full cup: short air column → high frequency (~800 Hz)
// Cup width: narrower → higher resonance (less volume)
// Wall thickness: thicker → more mass → slightly lower fundamental
function calcFrequency(fill: number, width: number, thickness: number): number {
  const columnHeight = 1 - fill / 100;          // 0 = full (short column), 1 = empty (long)
  const widthFactor  = 1 + (1 - width / 100) * 0.3;   // narrower → higher
  const massFactor   = 1 - (thickness / 100) * 0.12;  // thicker walls → lower
  const base = 280 + columnHeight * 520;
  return Math.round(base * widthFactor * massFactor);
}

// ── Cup SVG drawing ───────────────────────────────────────────────────────
function drawCup(
  canvas: HTMLCanvasElement,
  fill: number,
  width: number,
  thickness: number,
  freq: number,
  vibrating: boolean,
  tick: number,
) {
  const dpr = window.devicePixelRatio || 1;
  canvas.width  = canvas.offsetWidth  * dpr;
  canvas.height = canvas.offsetHeight * dpr;
  const ctx = canvas.getContext('2d')!;
  ctx.scale(dpr, dpr);
  const W = canvas.offsetWidth, H = canvas.offsetHeight;
  ctx.clearRect(0, 0, W, H);

  // ── Cup geometry ─────────────────────────────────────────────────────
  const cupW    = (width  / 100) * 90 + 40;   // 40–130px wide
  const wallT   = (thickness / 100) * 12 + 4; // 4–16px wall
  const cupH    = 110;
  const cupX    = (W - cupW) / 2;
  const cupY    = H - 30 - cupH;
  const taper   = 10; // top is wider than bottom

  // Vibration wobble when sound playing
  const wobble = vibrating ? Math.sin(tick * 0.4) * 1.5 : 0;

  // ── Cup silhouette (ceramic) ─────────────────────────────────────────
  ctx.beginPath();
  ctx.moveTo(cupX + taper + wobble,       cupY);               // top-left outer
  ctx.lineTo(cupX + cupW - taper - wobble, cupY);              // top-right outer
  ctx.lineTo(cupX + cupW - wobble,         cupY + cupH);       // bottom-right outer
  ctx.lineTo(cupX + wobble,                cupY + cupH);       // bottom-left outer
  ctx.closePath();
  const cupGrad = ctx.createLinearGradient(cupX, 0, cupX + cupW, 0);
  cupGrad.addColorStop(0,   '#D9D2C8');
  cupGrad.addColorStop(0.15,'#F5F0E8');
  cupGrad.addColorStop(0.85,'#EDE8E0');
  cupGrad.addColorStop(1,   '#C8C0B4');
  ctx.fillStyle = cupGrad;
  ctx.fill();

  // ── Inner cavity ────────────────────────────────────────────────────
  const innerX  = cupX + wallT + wobble * 0.5;
  const innerW  = cupW - 2 * wallT;
  const innerY  = cupY + wallT;
  const innerH  = cupH - wallT;
  ctx.clearRect(innerX, innerY, innerW, innerH);

  // ── Liquid ───────────────────────────────────────────────────────────
  if (fill > 0) {
    const liquidH = innerH * (fill / 100);
    const liquidY = innerY + innerH - liquidH;
    // Slight wave animation on surface
    ctx.beginPath();
    ctx.moveTo(innerX, liquidY + Math.sin(tick * 0.3) * (vibrating ? 3 : 1));
    ctx.lineTo(innerX + innerW, liquidY + Math.sin(tick * 0.3 + 1.5) * (vibrating ? 3 : 1));
    ctx.lineTo(innerX + innerW, innerY + innerH);
    ctx.lineTo(innerX, innerY + innerH);
    ctx.closePath();
    const liqGrad = ctx.createLinearGradient(0, liquidY, 0, innerY + innerH);
    liqGrad.addColorStop(0, '#5B8FB9CC');
    liqGrad.addColorStop(1, '#3A6A9088');
    ctx.fillStyle = liqGrad;
    ctx.fill();

    // Surface shimmer
    ctx.beginPath();
    ctx.ellipse(
      innerX + innerW / 2,
      liquidY + Math.sin(tick * 0.3) * (vibrating ? 3 : 1),
      innerW / 2 - 4, 4, 0, 0, Math.PI * 2
    );
    ctx.fillStyle = 'rgba(255,255,255,0.25)';
    ctx.fill();
  }

  // ── Air column highlight ──────────────────────────────────────────────
  const airH = innerH * (1 - fill / 100);
  if (airH > 8) {
    // Standing wave pattern in air column
    const waveAmp = vibrating ? 6 : 2;
    ctx.strokeStyle = 'rgba(201,168,76,0.5)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    const segments = 20;
    for (let i = 0; i <= segments; i++) {
      const y = innerY + (airH / segments) * i;
      const x = innerX + innerW / 2 + Math.sin((i / segments) * Math.PI * 2 + tick * 0.2) * waveAmp;
      i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    }
    ctx.stroke();
  }

  // ── Air column length label ───────────────────────────────────────────
  const airLenLabel = Math.round(innerH * (1 - fill / 100) * 0.8); // ~mm
  if (airH > 20) {
    ctx.fillStyle = 'rgba(201,168,76,0.8)';
    ctx.font = `${Math.min(11, Math.round(dpr * 9))}px monospace`;
    ctx.textAlign = 'center';
    ctx.fillText('↕ ' + airLenLabel + ' mm', innerX + innerW / 2, innerY + airH / 2 + 4);
  }

  // ── Handle ───────────────────────────────────────────────────────────
  const hx = cupX + cupW + wobble;
  ctx.beginPath();
  ctx.arc(hx + 16, cupY + cupH * 0.45, 18, -Math.PI * 0.55, Math.PI * 0.55);
  ctx.arc(hx + 16, cupY + cupH * 0.45, 9,  Math.PI * 0.55, -Math.PI * 0.55, true);
  ctx.closePath();
  ctx.fillStyle = '#D9D2C8';
  ctx.fill();

  // ── Cup outline ──────────────────────────────────────────────────────
  ctx.beginPath();
  ctx.moveTo(cupX + taper + wobble,        cupY);
  ctx.lineTo(cupX + cupW - taper - wobble, cupY);
  ctx.lineTo(cupX + cupW - wobble,         cupY + cupH);
  ctx.lineTo(cupX + wobble,                cupY + cupH);
  ctx.closePath();
  ctx.strokeStyle = '#A89880';
  ctx.lineWidth = 1.5;
  ctx.stroke();

  // ── Frequency label above cup ─────────────────────────────────────────
  ctx.fillStyle = vibrating ? '#C9A84C' : 'var(--ink, #1E1A14)';
  ctx.font = 'bold 15px monospace';
  ctx.textAlign = 'center';
  ctx.shadowColor = vibrating ? '#C9A84C' : 'transparent';
  ctx.shadowBlur  = vibrating ? 10 : 0;
  ctx.fillText(freq + ' Hz', W / 2, cupY - 14);
  ctx.shadowBlur = 0;

  // ── Wall thickness indicator ──────────────────────────────────────────
  ctx.fillStyle = 'rgba(120,100,80,0.55)';
  ctx.font = '9px monospace';
  ctx.textAlign = 'left';
  ctx.fillText('Wand ' + Math.round(wallT) + ' mm', cupX - 2, cupY + cupH + 20);
}

// ── Component ─────────────────────────────────────────────────────────────
export default function CupResonanceExperiment() {
  const [fill,      setFill]      = useState(50);
  const [width,     setWidth]     = useState(55);
  const [thickness, setThickness] = useState(40);
  const [playing,   setPlaying]   = useState(false);
  const [tick,      setTick]      = useState(0);

  const canvasRef  = useRef<HTMLCanvasElement>(null);
  const audioCtx   = useRef<AudioContext | null>(null);
  const oscRef     = useRef<OscillatorNode | null>(null);
  const gainRef    = useRef<GainNode | null>(null);
  const animRef    = useRef<ReturnType<typeof setInterval> | null>(null);

  const freq = calcFrequency(fill, width, thickness);

  // Animate tick
  useEffect(() => {
    animRef.current = setInterval(() => setTick(t => t + 1), 50);
    return () => { if (animRef.current) clearInterval(animRef.current); };
  }, []);

  // Redraw
  useEffect(() => {
    if (canvasRef.current) drawCup(canvasRef.current, fill, width, thickness, freq, playing, tick);
  }, [fill, width, thickness, freq, playing, tick]);

  useEffect(() => {
    const obs = new ResizeObserver(() => {
      if (canvasRef.current) drawCup(canvasRef.current, fill, width, thickness, freq, playing, tick);
    });
    if (canvasRef.current) obs.observe(canvasRef.current);
    return () => obs.disconnect();
  }, [fill, width, thickness, freq, playing, tick]);

  // Update oscillator frequency live
  useEffect(() => {
    if (oscRef.current && audioCtx.current) {
      oscRef.current.frequency.setTargetAtTime(freq, audioCtx.current.currentTime, 0.05);
    }
  }, [freq]);

  const toggleSound = useCallback(() => {
    if (!audioCtx.current) {
      audioCtx.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    const ctx = audioCtx.current;

    if (playing) {
      gainRef.current?.gain.setTargetAtTime(0, ctx.currentTime, 0.1);
      setTimeout(() => { oscRef.current?.stop(); oscRef.current = null; }, 300);
      setPlaying(false);
      return;
    }

    const osc  = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(0, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.18, ctx.currentTime + 0.08);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    oscRef.current  = osc;
    gainRef.current = gain;
    setPlaying(true);
  }, [freq, playing]);

  // Cleanup on unmount
  useEffect(() => () => {
    oscRef.current?.stop();
    audioCtx.current?.close();
  }, []);

  const material = thickness < 30 ? 'Dünnes Porzellan' : thickness < 60 ? 'Normales Porzellan' : 'Dickwandige Keramik';
  const cupType  = width < 35 ? 'Espressotasse' : width < 65 ? 'Kaffeetasse' : 'Großer Becher';

  return (
    <div className={styles.nativeExperiment}>
      <div className={styles.header}>
        <span className={styles.label}>Experiment</span>
        <strong>Kaffeetasse als Resonator</strong>
      </div>

      {/* Cup canvas */}
      <canvas
        ref={canvasRef}
        style={{
          display: 'block', width: '100%', height: 200,
          borderRadius: 8, border: '1px solid var(--border)',
          background: 'var(--soft, #F0EDE6)',
          marginBottom: 14,
        }}
      />

      {/* Sliders */}
      <label className={styles.sliderLabel} htmlFor="cup-fill">
        <span>Füllstand</span>
        <strong>{fill}%</strong>
      </label>
      <input id="cup-fill" type="range" min="0" max="100" value={fill}
        onChange={e => setFill(+e.target.value)} />

      <label className={styles.sliderLabel} htmlFor="cup-width" style={{ marginTop: 8 }}>
        <span>Tassenbreite — {cupType}</span>
        <strong>{Math.round(40 + (width / 100) * 90)} mm</strong>
      </label>
      <input id="cup-width" type="range" min="0" max="100" value={width}
        onChange={e => setWidth(+e.target.value)} />

      <label className={styles.sliderLabel} htmlFor="cup-wall" style={{ marginTop: 8 }}>
        <span>Wanddicke — {material}</span>
        <strong>{Math.round(4 + (thickness / 100) * 12)} mm</strong>
      </label>
      <input id="cup-wall" type="range" min="0" max="100" value={thickness}
        onChange={e => setThickness(+e.target.value)} />

      {/* Sound button */}
      <button onClick={toggleSound} style={{
        marginTop: 12, width: '100%', padding: '10px 0',
        borderRadius: 8, border: 'none',
        background: playing ? '#C9A84C' : 'var(--navy)',
        color: '#fff', fontFamily: 'var(--font-mono)',
        fontSize: 12, cursor: 'pointer', letterSpacing: '.06em',
        transition: 'background .2s',
      }}>
        {playing ? '⏸ Ton stoppen' : '▶ Ton abspielen — ' + freq + ' Hz'}
      </button>

      {/* Stats */}
      <div className={styles.stats} style={{ marginTop: 12 }}>
        <div>
          <span>Frequenz</span>
          <strong style={{ fontSize: 18, color: playing ? '#C9A84C' : 'var(--ink)' }}>
            {freq} Hz
          </strong>
        </div>
        <div>
          <span>Luftsäule</span>
          <strong>{Math.round((1 - fill / 100) * 80)} mm</strong>
        </div>
        <div style={{ gridColumn: 'span 2' }}>
          <span>Warum ändert sich der Ton?</span>
          <strong style={{ fontSize: 12 }}>
            {fill > 70
              ? 'Kurze Luftsäule → wenig Platz für die Welle → hohe Frequenz'
              : fill < 30
              ? 'Lange Luftsäule → viel Platz für die Welle → tiefer Ton'
              : 'Mittlere Füllung → mittlere Frequenz. Schiebe den Regler!'}
          </strong>
        </div>
      </div>
    </div>
  );
}
