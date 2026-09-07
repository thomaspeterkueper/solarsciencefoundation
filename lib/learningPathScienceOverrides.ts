import type { LearningPath } from './learningPaths';
import { surfaceCleaningLearningPath } from './learningPaths/surfaceCleaning';
import { windowCleaningLearningPath } from './learningPaths/windowCleaning';
import { tileWoodCleaningLearningPath } from './learningPaths/tileWoodCleaning';
import { autoMotorLearningPath } from './learningPaths/autoMotor';
import { autoBatteryLearningPath } from './learningPaths/autoBattery';
import { osmosisLearningPath } from './learningPaths/osmosis';
import { boilingPressureLearningPath } from './learningPaths/boilingPressure';
import { emulsionLearningPath } from './learningPaths/emulsion';
import { waterSurfaceLearningPath } from './learningPaths/waterSurface';
import { chlorineCleaningLearningPath } from './learningPaths/chlorineCleaning';

const overrides = new Map<string, LearningPath>([
  [surfaceCleaningLearningPath.id, surfaceCleaningLearningPath],
  [windowCleaningLearningPath.id, windowCleaningLearningPath],
  [tileWoodCleaningLearningPath.id, tileWoodCleaningLearningPath],
  [autoMotorLearningPath.id, autoMotorLearningPath],
  [autoBatteryLearningPath.id, autoBatteryLearningPath],
  [osmosisLearningPath.id, osmosisLearningPath],
  [boilingPressureLearningPath.id, boilingPressureLearningPath],
  [emulsionLearningPath.id, emulsionLearningPath],
  [waterSurfaceLearningPath.id, waterSurfaceLearningPath],
  [chlorineCleaningLearningPath.id, chlorineCleaningLearningPath],
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
