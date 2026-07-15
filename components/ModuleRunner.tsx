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

  const allAnswered = learningModule.exercises.every((exercise) => exercise.id in answers);

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

      const response = await fetch('/api/progress/complete', {
        method: 'POST',
        headers,
        body: JSON.stringify({
          playerId,
          moduleId: learningModule.id,
          answers: Object.entries(answers).map(([exerciseId, selectedOption]) => ({
            exerciseId,
            selectedOption,
          })),
        }),
      });
      setResult((await response.json()) as CompleteResponse);
    } catch {
      setError('Verbindung fehlgeschlagen. Bitte erneut versuchen.');
    } finally {
      setSubmitting(false);
    }
  }

  if (learningModule.exercises.length === 0) return null;

  return (
    <div className="quiz-runner">
      <div className="quiz-runner__progress">
        <span>{Object.keys(answers).length} von {learningModule.exercises.length} beantwortet</span>
        <div><i style={{ width: `${(Object.keys(answers).length / learningModule.exercises.length) * 100}%` }} /></div>
      </div>

      <div className="quiz-runner__questions">
        {learningModule.exercises.map((exercise, questionIndex) => (
          <fieldset key={exercise.id} className="quiz-runner__question">
            <legend>
              <span>Frage {questionIndex + 1}</span>
              {exercise.question}
            </legend>
            <div className="quiz-runner__options">
              {exercise.options.map((option, optionIndex) => {
                const selected = answers[exercise.id] === optionIndex;
                return (
                  <button
                    key={option}
                    type="button"
                    className={selected ? 'quiz-runner__option is-selected' : 'quiz-runner__option'}
                    onClick={() => {
                      setAnswers((previous) => ({ ...previous, [exercise.id]: optionIndex }));
                      setResult(null);
                    }}
                  >
                    <span className="quiz-runner__marker">{String.fromCharCode(65 + optionIndex)}</span>
                    <span>{option}</span>
                  </button>
                );
              })}
            </div>
          </fieldset>
        ))}
      </div>

      {!result && (
        <button className="btn" onClick={submit} disabled={!allAnswered || submitting} type="button">
          {submitting ? 'Wird geprüft …' : 'Antworten prüfen →'}
        </button>
      )}

      {error && <p className="quiz-runner__error">{error}</p>}

      {result?.status === 'completed' && (
        <div className="quiz-runner__feedback is-success">
          <span>Verstanden</span>
          <strong>Richtig. Du kannst Dehnungsmessung und DMS-Rosette einordnen.</strong>
          {result.unlocks && result.unlocks.length > 0 && (
            <p>In NOχ¹Δ freigeschaltet: <code>{result.unlocks[0].id}</code></p>
          )}
        </div>
      )}

      {result?.status === 'incomplete' && (
        <div className="quiz-runner__feedback">
          <span>Noch offen</span>
          <strong>Mindestens eine Antwort stimmt noch nicht.</strong>
          <p>Gehe zum Lernmodul zurück oder prüfe besonders die Kopplung von Längs- und Querdehnung.</p>
          <button
            className="btn secondary"
            onClick={() => { setAnswers({}); setResult(null); }}
            type="button"
          >
            Antworten zurücksetzen
          </button>
        </div>
      )}
    </div>
  );
}
