'use client';

/**
 * KUEPER - Solar Science Foundation (SSF)
 * Path: components/ProgressDashboard.tsx
 * Repo: github.com/thomaspeterkueper/solarsciencefoundation/blob/main/components/ProgressDashboard.tsx
 * Name: ProgressDashboard
 * Version: 0.1.0
 * Created: 2026-06-27
 * Modified: 2026-06-27 10:25 CEST
 * Depends: react, SSF progress APIs
 */

import { useEffect, useState } from 'react';

type ProgressResponse = {
  progress: {
    playerId: string;
    completedModules: { moduleId: string; completedAt: string; score: number }[];
    attempts: number;
  };
};

type UnlockResponse = {
  unlocks: { id: string; sourceModule: string; status: string }[];
};

type AchievementResponse = {
  achievements: {
    id: string;
    title: string;
    description: string;
    completed: boolean;
    completedRequiredModules: string[];
    remainingModules: string[];
    disclaimer: string;
  }[];
};

export default function ProgressDashboard() {
  const [playerId, setPlayerId] = useState('local');
  const [progress, setProgress] = useState<ProgressResponse['progress'] | null>(null);
  const [unlocks, setUnlocks] = useState<UnlockResponse['unlocks']>([]);
  const [achievements, setAchievements] = useState<AchievementResponse['achievements']>([]);

  useEffect(() => {
    try {
      const key = 'ssf:playerId';
      let id = window.localStorage.getItem(key);
      if (!id) {
        id =
          typeof crypto !== 'undefined' && 'randomUUID' in crypto
            ? crypto.randomUUID()
            : 'local-' + Math.random().toString(36).slice(2);
        window.localStorage.setItem(key, id);
      }
      setPlayerId(id);
    } catch {
      setPlayerId('local');
    }
  }, []);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      const [progressRes, unlockRes, achievementRes] = await Promise.all([
        fetch(`/api/player/${playerId}/progress`),
        fetch(`/api/player/${playerId}/unlocks`),
        fetch(`/api/player/${playerId}/achievements`)
      ]);

      if (cancelled) return;

      const progressData = (await progressRes.json()) as ProgressResponse;
      const unlockData = (await unlockRes.json()) as UnlockResponse;
      const achievementData = (await achievementRes.json()) as AchievementResponse;

      setProgress(progressData.progress);
      setUnlocks(unlockData.unlocks);
      setAchievements(achievementData.achievements);
    }

    load().catch(() => {
      if (!cancelled) {
        setProgress({ playerId, completedModules: [], attempts: 0 });
      }
    });

    return () => {
      cancelled = true;
    };
  }, [playerId]);

  const completedCount = progress?.completedModules.length ?? 0;
  const completedAchievements = achievements.filter((achievement) => achievement.completed).length;

  return (
    <div>
      <section className="platform-grid" style={{ marginTop: 34 }}>
        <div className="platform-card">
          <p className="section-title">Completed modules</p>
          <p style={{ fontSize: 42, color: 'var(--navy)', lineHeight: 1 }}>{completedCount}</p>
        </div>
        <div className="platform-card">
          <p className="section-title">Unlocks earned</p>
          <p style={{ fontSize: 42, color: 'var(--navy)', lineHeight: 1 }}>{unlocks.length}</p>
        </div>
        <div className="platform-card">
          <p className="section-title">Achievements</p>
          <p style={{ fontSize: 42, color: 'var(--navy)', lineHeight: 1 }}>{completedAchievements}</p>
        </div>
      </section>

      <section className="subject-section">
        <div className="section-row">
          <h2 className="section-title" style={{ fontSize: 34 }}>Achievements</h2>
          <span className="mono" style={{ color: 'var(--steel)' }}>Player {playerId.slice(0, 8)}</span>
        </div>
        <div className="subject-grid">
          {achievements.map((achievement) => (
            <article key={achievement.id} className="subject-card">
              <span className="code">{achievement.id}</span>
              <strong style={{ marginTop: 16 }}>{achievement.title}</strong>
              <small>{achievement.completed ? 'Completed' : `${achievement.remainingModules.length} modules remaining`}</small>
              <p>{achievement.description}</p>
              <p className="mono" style={{ fontSize: 12, color: 'var(--muted)' }}>{achievement.disclaimer}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="subject-section">
        <div className="section-row">
          <h2 className="section-title" style={{ fontSize: 34 }}>Completed modules</h2>
        </div>
        {progress && progress.completedModules.length > 0 ? (
          <div className="subject-grid">
            {progress.completedModules.map((module) => (
              <article key={module.moduleId} className="subject-card">
                <span className="code">{module.moduleId}</span>
                <strong style={{ marginTop: 16 }}>Completed</strong>
                <small>{Math.round(module.score * 100)}% score</small>
                <p>Completed at {new Date(module.completedAt).toLocaleString()}</p>
              </article>
            ))}
          </div>
        ) : (
          <p style={{ color: 'var(--steel)' }}>No completed modules yet. Start with the featured module or the mathematics foundations path.</p>
        )}
      </section>
    </div>
  );
}
