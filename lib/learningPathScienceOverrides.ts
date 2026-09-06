import type { LearningPath } from './learningPaths';
import { surfaceCleaningLearningPath } from './learningPaths/surfaceCleaning';
import { windowCleaningLearningPath } from './learningPaths/windowCleaning';
import { tileWoodCleaningLearningPath } from './learningPaths/tileWoodCleaning';
import { autoMotorLearningPath } from './learningPaths/autoMotor';
import { autoBatteryLearningPath } from './learningPaths/autoBattery';

const overrides = new Map<string, LearningPath>([
  [surfaceCleaningLearningPath.id, surfaceCleaningLearningPath],
  [windowCleaningLearningPath.id, windowCleaningLearningPath],
  [tileWoodCleaningLearningPath.id, tileWoodCleaningLearningPath],
  [autoMotorLearningPath.id, autoMotorLearningPath],
  [autoBatteryLearningPath.id, autoBatteryLearningPath],
]);

export function applyLearningPathScienceOverride(path: LearningPath | null): LearningPath | null {
  if (!path) return null;
  return overrides.get(path.id) ?? path;
}

export function applyLearningPathScienceOverrides(paths: LearningPath[]): LearningPath[] {
  return paths.map(path => overrides.get(path.id) ?? path);
}

export function getScienceOverrideIds(): string[] {
  return [...overrides.keys()];
}
