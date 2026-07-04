'use client';

import { useEffect, useState } from 'react';
import type { LearningModule } from '../lib/modules';
import { createBrowserSupabaseClient } from '../lib/supabase/client';

type Unlock = { id: string; sourceModule: string; status: string };

type CompleteResponse = {
  status: 'completed' | 'incomplete' | 'module_not_found';
  score: number;
  unlocks?: Unlock[];
  persistence?: { mode: string; saved: boolean };
};

export default function ModuleRunner({ learningModule }: { learningModule: LearningModule }) {
  const [playerId, setPlayerId] = useState('local');
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [result, setResult] = useState<CompleteResponse | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      const key = 'ssf:playerId';
      let id = window.localStorage.getItem(key);
      if (!id) {
        id = typeof crypto !== 'undefined' && 'randomUUID' in crypto
          ? crypto.randomUUID()
          : 'local-' + Math.random().toString(36).slice(2);
        window.localStorage.setItem(key, id);
      }
      setPlayerId(id);
    } catch {}
  }, []);

  const allAnswered = learningModule.exercises.every((ex) => ex.id in answers);

  async function submit() {
    setSubmitting(true);
    setError(null);
    setResult(null);
    try {
      let token: string | null = null;
      try {
        const supabase = createBrowserSupabaseClient();
        const session = await supabase.auth.getSession();
        token = session.data.session?.access_token ?? null;
      } catch {}

      const headers: Record<string, string> = { 'Content-Type': 'application/json' };
      if (token) headers.Authorization = `Bearer ${token}`;

      const res = await fetch('/api/progress/complete', {
        method: 'POST',
        headers,
        body: JSON.stringify({
          playerId,
          moduleId: learningModule.id,
          answers: Object.entries(answers).map(([exerciseId, selectedOption]) => ({
            exerciseId,
            selectedOption
          }))
        })
      });
      setResult((await res.json()) as CompleteResponse);
    } catch {
      setError('Verbindung fehlgeschlagen. Bitte erneut versuchen.');
    } finally {
      setSubmitting(false);
    }
  }

  if (learningModule.exercises.length === 0) return null;

  return (
    <div style={{ marginTop: 40 }}>
      {learningModule.exercises.map((ex, i) => (
        <div key={ex.id} style={{ marginBottom: 28 }}>
          <p style={{ fontFamily: 'var(--font-serif)', fontSize: 19, lineHeight: 1.55, margin: '0 0 12px', color: 'var(--navy)' }}>
            {ex.question}
          </p>
          {ex.options.map((option, idx) => (
            <button
              key={idx}
              type="button"
              className={answers[ex.id] === idx ? 'option selected' : 'option'}
              onClick={() => setAnswers((prev) => ({ ...prev, [ex.id]: idx }))}
            >
              {option}
            </button>
          ))}
        </div>
      ))}

      {!result && (
        <button
          className="btn"
          onClick={submit}
          disabled={!allAnswered || submitting}
          style={{ marginTop: 8 }}
        >
          {submitting ? 'Wird geprüft …' : 'Antworten prüfen →'}
        </button>
      )}

      {error && (
        <p style={{ color: '#a32d2d', marginTop: 14, fontSize: 15 }}>{error}</p>
      )}

      {result?.status === 'completed' && (
        <div className="result ok" style={{ marginTop: 24 }}>
          <p style={{ margin: '0 0 6px', fontFamily: 'var(--font-serif)', fontSize: 18 }}>
            Richtig. Du hast das verstanden.
          </p>
          {result.unlocks && result.unlocks.length > 0 && (
            <p style={{ margin: '8px 0 0', fontSize: 14, color: 'var(--steel)' }}>
              In NOχ¹Δ freigeschaltet: <span className="unlock">{result.unlocks[0].id}</span>
            </p>
          )}
        </div>
      )}

      {result?.status === 'incomplete' && (
        <div className="result" style={{ marginTop: 24 }}>
          <p style={{ margin: 0, fontFamily: 'var(--font-serif)', fontSize: 18 }}>
            Noch nicht ganz — schau dir die Fragen nochmal an.
          </p>
          <button
            className="btn secondary"
            style={{ marginTop: 14 }}
            onClick={() => { setAnswers({}); setResult(null); }}
            type="button"
          >
            Nochmal versuchen
          </button>
        </div>
      )}
    </div>
  );
}
