import type { ComponentType } from 'react';
import type { LearningPathSection } from '../../lib/learningPaths';
import { getExperimentComponent as getRegistryExperimentComponent } from './experimentRegistry';
import ScratchHardnessExperiment from './ScratchHardnessExperiment';
import WearExperiment from './WearExperiment';

const semanticOverrides: Record<string, ComponentType> = {
  'EXP:MOHS': ScratchHardnessExperiment,
  'EXP:MOTOR-VERSCHLEISS': WearExperiment,
  'EXP:VERSCHLEISS-SIMULATION': WearExperiment,
};

const ambiguousIds = new Set([
  'EXP:HAERTE',
]);

export function resolveExperimentComponent(section: LearningPathSection): ComponentType | undefined {
  const id = section.interactiveId ?? section.id;
  if (ambiguousIds.has(id)) return undefined;
  return semanticOverrides[id] ?? getRegistryExperimentComponent(id);
}

export function isAmbiguousExperimentId(id: string): boolean {
  return ambiguousIds.has(id);
}
