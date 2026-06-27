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
        id = typeof crypto !== 'undefined' && 'randomUUID' in crypto ? crypto.randomUUID() : 'local-' + Math.random().toString(36).slice(2);
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
          answers: Object.entries(answers).map(([exerciseId, selectedOption]) => ({ exerciseId, selectedOption }))
        })
      });
      setResult((await res.json()) as CompleteResponse);
    } catch {
      setError('Could not reach the server. Try again.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div style={{ marginTop: 28 }}>
      <p className="section-title">Exercises</p>
      {learningModule.exercises.map((ex, i) => (
        <div key={ex.id} style={{ marginBottom: 18 }}>
          <p style={{ margin: '0 0 6px' }}>{i + 1}. {ex.question}</p>
          {ex.options.map((option, idx) => (
            <button key={idx} type="button" className={answers[ex.id] === idx ? 'option selected' : 'option'} onClick={() => setAnswers((prev) => ({ ...prev, [ex.id]: idx }))}>
              {option}
            </button>
          ))}
        </div>
      ))}
      <button className="btn" onClick={submit} disabled={!allAnswered || submitting}>{submitting ? 'Checking…' : 'Complete module'}</button>
      {error && <p style={{ color: '#a32d2d', marginTop: 14 }}>{error}</p>}
      {result && result.status === 'completed' && (
        <div className="result ok">
          <p style={{ margin: '0 0 8px' }}>Module completed. All answers correct.</p>
          <p style={{ margin: '0 0 8px', color: 'var(--steel)' }}>Storage: {result.persistence?.mode ?? 'memory'}{result.persistence?.saved ? ' saved' : ''}</p>
          {result.unlocks && result.unlocks.length > 0 && <p style={{ margin: 0 }}>Unlock granted: <span className="unlock">{result.unlocks[0].id}</span></p>}
        </div>
      )}
      {result && result.status === 'incomplete' && (
        <div className="result"><p style={{ margin: 0 }}>Not quite — {Math.round(result.score * 100)}% correct. Review the module and try again. No unlock granted until every answer is correct.</p></div>
      )}
    </div>
  );
}
