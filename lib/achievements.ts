/**
 * KUEPER - Solar Science Foundation (SSF)
 * Path: lib/achievements.ts
 * Repo: github.com/thomaspeterkueper/solarsciencefoundation/blob/main/lib/achievements.ts
 * Name: achievements - learning achievement model
 * Version: 0.1.0
 * Created: 2026-06-27
 * Modified: 2026-06-27 10:25 CEST
 * Depends: lib/progress
 */

import type { PlayerProgress } from './progress';

export type Achievement = {
  id: string;
  title: string;
  description: string;
  requiredModules: string[];
  disclaimer: string;
};

export type AchievementState = Achievement & {
  completed: boolean;
  completedRequiredModules: string[];
  remainingModules: string[];
};

export const achievements: Achievement[] = [
  {
    id: 'ACH:SSF:mathematics-foundations-1',
    title: 'Mathematics Foundations I',
    description: 'Complete the first arithmetic path: numbers, addition, multiplication, fractions and percentages.',
    requiredModules: [
      'SSF-MAT-0001',
      'SSF-MAT-0002',
      'SSF-MAT-0003',
      'SSF-MAT-0004',
      'SSF-MAT-0005'
    ],
    disclaimer: 'Learning achievement within the SSF project — not a formal or accredited qualification.'
  },
  {
    id: 'ACH:SSF:orbital-entry-1',
    title: 'Orbital Entry I',
    description: 'Complete the first gravity module and unlock the initial orbital-navigation bridge for partner projects.',
    requiredModules: ['SSF-PHY-1101'],
    disclaimer: 'Learning achievement within the SSF project — not a formal or accredited qualification.'
  }
];

export function deriveAchievementStates(progress: PlayerProgress): AchievementState[] {
  const completed = new Set(progress.completedModules.map((module) => module.moduleId));

  return achievements.map((achievement) => {
    const completedRequiredModules = achievement.requiredModules.filter((moduleId) => completed.has(moduleId));
    const remainingModules = achievement.requiredModules.filter((moduleId) => !completed.has(moduleId));

    return {
      ...achievement,
      completed: remainingModules.length === 0,
      completedRequiredModules,
      remainingModules
    };
  });
}
