import type { ComponentType } from 'react';
import type { LearningPathSection } from '../../lib/learningPaths';
import { getExperimentComponent as getRegistryExperimentComponent } from './experimentRegistry';
import ScratchHardnessExperiment from './ScratchHardnessExperiment';
import WearExperiment from './WearExperiment';
import WaterHardnessExperiment from './WaterHardnessExperiment';
import PiezoMaterialExperiment from './PiezoMaterialExperiment';
import BatteryTemperatureExperiment from './BatteryTemperatureExperiment';

const semanticOverrides: Record<string, ComponentType> = {
  'EXP:MOHS': ScratchHardnessExperiment,
  'EXP:MOTOR-VERSCHLEISS': WearExperiment,
  'EXP:VERSCHLEISS-SIMULATION': WearExperiment,
  'EXP:BATTERIE-ALTERUNG': BatteryTemperatureExperiment,
  'EXP:WASSERHAERTE': WaterHardnessExperiment,
  'EXP:PIEZO-MATERIALVERGLEICH': PiezoMaterialExperiment,
};

/**
 * Legacy EXP:HAERTE was accidentally reused for two unrelated concepts.
 * Keep the old authored data readable, but normalize it to semantic runtime IDs.
 * New content must use the explicit IDs above.
 */
function normalizeLegacyId(section: LearningPathSection): string | undefined {
  const id = section.interactiveId ?? section.id;
  if (id !== 'EXP:HAERTE') return id;

  const context = `${section.title} ${section.summary}`.toLowerCase();
  if (context.includes('wasserh') || context.includes('ca2+') || context.includes('kalk')) return 'EXP:WASSERHAERTE';
  if (context.includes('piezo') || context.includes('pzt') || context.includes('quarz') || context.includes('material-vergleich')) return 'EXP:PIEZO-MATERIALVERGLEICH';
  return undefined;
}

export function resolveExperimentComponent(section: LearningPathSection): ComponentType | undefined {
  const id = normalizeLegacyId(section);
  if (!id) return undefined;
  return semanticOverrides[id] ?? getRegistryExperimentComponent(id);
}

export function getSemanticExperimentId(section: LearningPathSection): string | undefined {
  return normalizeLegacyId(section);
}

export function isAmbiguousExperimentId(id: string): boolean {
  return id === 'EXP:HAERTE';
}
