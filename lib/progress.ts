import { learningModules } from './modules';

export type ProgressState = {
  userId: string;
  completedModules: string[];
};

export type NoxiaUnlockState = ProgressState & {
  unlocks: string[];
  buildings: string[];
};

export const demoProgress: ProgressState = {
  userId: 'demo',
  completedModules: ['SSF-PHY-1101'],
};

const unlockToBuildings: Record<string, string[]> = {
  'UNL:NOX:orbital-navigation': ['BLD:NOX:raumhafen-1'],
};

export function getUnlocksForProgress(progress: ProgressState): NoxiaUnlockState {
  const unlocks = new Set<string>();

  for (const module of learningModules) {
    if (progress.completedModules.includes(module.id)) {
      for (const unlock of module.unlocks) unlocks.add(unlock);
    }
  }

  const buildings = [...unlocks].flatMap((unlock) => unlockToBuildings[unlock] ?? []);

  return {
    userId: progress.userId,
    completedModules: progress.completedModules,
    unlocks: [...unlocks],
    buildings,
  };
}
