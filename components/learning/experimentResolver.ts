import type { ComponentType } from 'react';
import type { LearningPathSection } from '../../lib/learningPaths';
import { getExperimentComponent as getRegistryExperimentComponent } from './experimentRegistry';
import ScratchHardnessExperiment from './ScratchHardnessExperiment';
import WearExperiment from './WearExperiment';
import WaterHardnessExperiment from './WaterHardnessExperiment';
import PiezoMaterialExperiment from './PiezoMaterialExperiment';
import BatteryTemperatureExperiment from './BatteryTemperatureExperiment';
import SurfaceVolumeExperiment from './SurfaceVolumeExperiment';
import HeatTransportExperiment from './HeatTransportExperiment';
import CentripetalExperiment from './CentripetalExperiment';
import ErrorPropagationBuilderExperiment from './ErrorPropagationBuilderExperiment';
import EdmAspectRatioExperiment from './EdmAspectRatioExperiment';
import DmsMeasurementChainExperiment from './DmsMeasurementChainExperiment';
import SurfaceTensionExperiment from './SurfaceTensionExperiment';
import VaporPressureBoilingExperiment from './VaporPressureBoilingExperiment';
import PolaritySolubilityExperiment from './PolaritySolubilityExperiment';
import TractionExperiment from './TractionExperiment';
import TorqueSpeedExperiment from './TorqueSpeedExperiment';
import DmsRosetteExperiment from './DmsRosetteExperiment';
import SoundAttenuationExperiment from './SoundAttenuationExperiment';
import VehicleAccelerationExperiment from './VehicleAccelerationExperiment';

const semanticOverrides: Record<string, ComponentType> = {
  'EXP:MOHS': ScratchHardnessExperiment,
  'EXP:MOTOR-VERSCHLEISS': WearExperiment,
  'EXP:VERSCHLEISS-SIMULATION': WearExperiment,
  'EXP:BATTERIE-ALTERUNG': BatteryTemperatureExperiment,
  'EXP:WASSERHAERTE': WaterHardnessExperiment,
  'EXP:PIEZO-MATERIALVERGLEICH': PiezoMaterialExperiment,
  'EXP:OBERFLAECHE-VOLUMEN': SurfaceVolumeExperiment,
  'EXP:WAERMETRANSPORT': HeatTransportExperiment,
  'EXP:ZENTRIFUGAL-SIMULATION': CentripetalExperiment,
  'EXP:ERROR-PROPAGATION-BUILDER': ErrorPropagationBuilderExperiment,
  'EXP:EDM-ASPECT-RATIO': EdmAspectRatioExperiment,
  'EXP:DMS-MEASUREMENT-CHAIN': DmsMeasurementChainExperiment,
  'EXP:OBERFLSPANNUNG': SurfaceTensionExperiment,
  'EXP:DAMPFDRUCK-TEMP': VaporPressureBoilingExperiment,
  'EXP:DRUCK-BLASEN': VaporPressureBoilingExperiment,
  'EXP:POLAR-SORTIERER': PolaritySolubilityExperiment,
  'EXP:HAFTUNG-REIBUNG': TractionExperiment,
  'EXP:GEWICHT-TRAKTION': TractionExperiment,
  'EXP:KRAFT-DREHZAHL': TorqueSpeedExperiment,
  'EXP:ROSETTE': DmsRosetteExperiment,
  'EXP:SCHALLDAEMPFUNG': SoundAttenuationExperiment,
  'EXP:BESCHLEUNIGUNG-VERGLEICH': VehicleAccelerationExperiment,
};

const legacySemanticIds: Record<string, string> = {
  'EXP:BUILDER': 'EXP:ERROR-PROPAGATION-BUILDER',
  'EXP:ASPEKT': 'EXP:EDM-ASPECT-RATIO',
  'EXP:AUSWERTUNG': 'EXP:DMS-MEASUREMENT-CHAIN',
};

/** Keep old authored data readable while normalizing ambiguous/generic legacy IDs. */
function normalizeLegacyId(section: LearningPathSection): string | undefined {
  const id = section.interactiveId ?? section.id;
  if (legacySemanticIds[id]) return legacySemanticIds[id];
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

export function getSemanticExperimentId(section: LearningPathSection): string | undefined { return normalizeLegacyId(section); }

export function isAmbiguousExperimentId(id: string): boolean {
  return id === 'EXP:HAERTE' || id === 'EXP:BUILDER' || id === 'EXP:ASPEKT' || id === 'EXP:AUSWERTUNG';
}
