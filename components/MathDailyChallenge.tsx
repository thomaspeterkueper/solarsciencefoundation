'use client';

import { useState } from 'react';

export default function MathDailyChallenge() {
  const [value, setValue] = useState('');
  const [feedback, setFeedback] = useState<string | null>(null);

  function checkAnswer() {
    const correct = Number(value.trim()) === 11;
    setFeedback(correct
      ? '✓ Richtig. Von Zahl zu Zahl kommen jeweils 3 hinzu.'
      : 'Noch nicht. Vergleiche die Abstände: 2 → 5 und 5 → 8.');
  }

  return (
    <section className="subject-section" style={{ marginTop: 46 }}>
      <div className="platform-card" style={{ padding: 28, background: 'color-mix(in srgb, var(--steel) 6%, var(--paper))' }}>
        <p className="kicker">Kurz ausprobieren</p>
        <h2 className="section-title" style={{ fontSize: 30, marginBottom: 10 }}>Welche Zahl fehlt?</h2>
        <p style={{ fontSize: 28, fontWeight: 750, letterSpacing: 1, margin: '10px 0 18px' }}>2 → 5 → 8 → ? → 14</p>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          <input
            aria-label="Fehlende Zahl"
            inputMode="numeric"
            value={value}
            onChange={(event) => { setValue(event.target.value); setFeedback(null); }}
            style={{ width: 110, padding: '11px 14px', borderRadius: 12, border: '1px solid var(--line)', background: 'var(--paper)', color: 'var(--ink)', font: 'inherit' }}
          />
          <button type="button" onClick={checkAnswer} className="btn">Prüfen</button>
        </div>
        {feedback && <p role="status" style={{ marginTop: 14, fontWeight: 600 }}>{feedback}</p>}
      </div>
    </section>
  );
}
