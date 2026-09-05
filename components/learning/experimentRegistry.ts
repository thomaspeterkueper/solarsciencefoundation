import type { ComponentType } from 'react';
import RayleighExperiment from './RayleighExperiment';
import LGSExperiment from './LGSExperiment';
import SunsetExperiment from './SunsetExperiment';
import VectorExperiment from './VectorExperiment';
import DensityErrorExperiment from './DensityErrorExperiment';
import FourierExperiment from './FourierExperiment';
import ThermalExpansionExperiment from './ThermalExpansionExperiment';
import StressExperiment from './StressExperiment';
import HookeExperiment from './HookeExperiment';
import PoissonExperiment from './PoissonExperiment';
import WheatstoneExperiment from './WheatstoneExperiment';
import DiodeExperiment from './DiodeExperiment';
import SeriesExperiment from './SeriesExperiment';
import TorqueExperiment from './TorqueExperiment';
import ScalarExperiment from './ScalarExperiment';
import CoolingExperiment from './CoolingExperiment';
import CupResonanceExperiment from './CupResonanceExperiment';
import KaramellTempExperiment from './KaramellTempExperiment';
import ZuckerartenExperiment from './ZuckerartenExperiment';
import KaramellSimulatorExperiment from './KaramellSimulatorExperiment';
import WaterMoleculeExperiment from './WaterMoleculeExperiment';
import HeatingCurveExperiment from './HeatingCurveExperiment';
import DensityAnomalyExperiment from './DensityAnomalyExperiment';
import DewPointExperiment from './DewPointExperiment';
import WaterHeatCapacityExperiment from './WaterHeatCapacityExperiment';
import PhaseDiagramExperiment from './PhaseDiagramExperiment';
import EvaporationExperiment from './EvaporationExperiment';
import CapillaryExperiment from './CapillaryExperiment';
import HydrationExperiment from './HydrationExperiment';
import PipeFreezingExperiment from './PipeFreezingExperiment';
import FourStrokeExperiment from './FourStrokeExperiment';
import BrakeEnergyExperiment from './BrakeEnergyExperiment';
import CombustionExperiment from './CombustionExperiment';
import EmulsionExperiment from './EmulsionExperiment';
import CollagenExperiment from './CollagenExperiment';
import MicelleExperiment from './MicelleExperiment';
import BatteryExperiment from './BatteryExperiment';
import PumpExperiment from './PumpExperiment';
import MaterialMatrixExperiment from './MaterialMatrixExperiment';
import ElectromagnetExperiment from './ElectromagnetExperiment';
import EarlyEarthExperiment from './EarlyEarthExperiment';
import MillerUreyExperiment from './MillerUreyExperiment';
import PiezoExperiment from './PiezoExperiment';
import PiezoMaterialExperiment from './PiezoMaterialExperiment';
import EnergyHarvestingExperiment from './EnergyHarvestingExperiment';
import DifferentialExperiment from './DifferentialExperiment';
import CoulombQuizExperiment from './CoulombQuizExperiment';
import SpectralAnalysisExperiment from './SpectralAnalysisExperiment';
import RotweinExperiment from './RotweinExperiment';
import SpiralExperiment from './SpiralExperiment';
import ColonyExperiment from './ColonyExperiment';
import HohmannExperiment from './HohmannExperiment';
import KreditExperiment from './KreditExperiment';
import StationExperiment from './StationExperiment';
import WaterTreatmentExperiment from './WaterTreatmentExperiment';
import ResourceSeparationExperiment from './ResourceSeparationExperiment';
import PHScaleExperiment from './PHScaleExperiment';
import NeutralizationStoichiometryExperiment from './NeutralizationStoichiometryExperiment';
import ChlorineCleaningExperiment from './ChlorineCleaningExperiment';
import SurfacePorosityExperiment from './SurfacePorosityExperiment';
import SwellingExperiment from './SwellingExperiment';
import PlantTurgorExperiment from './PlantTurgorExperiment';
import WiperTechniqueExperiment from './WiperTechniqueExperiment';
import OilPropertiesExperiment from './OilPropertiesExperiment';
import PowerEnergyExperiment from './PowerEnergyExperiment';
import EnergyFlowExperiment from './EnergyFlowExperiment';
import HabitatPowerExperiment from './HabitatPowerExperiment';
import PowerRedundancyExperiment from './PowerRedundancyExperiment';
import PolarityExperiment from './PolarityExperiment';
import HydrogenBondExperiment from './HydrogenBondExperiment';
import OsmosisExperiment from './OsmosisExperiment';
import BatteryManagementExperiment from './BatteryManagementExperiment';
import BatteryFastChargeExperiment from './BatteryFastChargeExperiment';

export type ExperimentModelType = 'interactive-model' | 'simulation' | 'calculator' | 'visualization';
export type ExperimentDefinition = { component: ComponentType; modelType: ExperimentModelType; concepts?: string[] };

const registry: Record<string, ExperimentDefinition> = {
  'EXP:POWER:P-VS-E': { component: PowerEnergyExperiment, modelType: 'interactive-model', concepts: ['CON:ENG:power-vs-energy'] },
  'EXP:POWER:FLOW': { component: EnergyFlowExperiment, modelType: 'interactive-model', concepts: ['CON:ENG:energy-conversion-chain','CON:ENG:generation-efficiency'] },
  'EXP:POWER:HABITAT': { component: HabitatPowerExperiment, modelType: 'simulation', concepts: ['CON:ENG:generation-profile','CON:ENG:electrical-generation-balance'] },
  'EXP:POWER:REDUNDANCY': { component: PowerRedundancyExperiment, modelType: 'simulation', concepts: ['CON:ENG:storage-grid-redundancy'] },
  'EXP:POLARITAET': { component: PolarityExperiment, modelType: 'interactive-model' },
  'EXP:HBRUECKEN': { component: HydrogenBondExperiment, modelType: 'interactive-model' },
  'EXP:OSMOSE': { component: OsmosisExperiment, modelType: 'interactive-model' },
  'EXP:BATTERIE-MANAGEMENT': { component: BatteryManagementExperiment, modelType: 'interactive-model' },
  'EXP:SCHNELLLADEN-SIMULATION': { component: BatteryFastChargeExperiment, modelType: 'simulation' },
  'EXP:RAYLEIGH': { component: RayleighExperiment, modelType: 'visualization' },
  'EXP:ATMOSPHAERE-PFAD': { component: SunsetExperiment, modelType: 'visualization' },
  'EXP:WEGLAENGE': { component: SunsetExperiment, modelType: 'visualization' },
  'EXP:LGS-GRAFISCH': { component: LGSExperiment, modelType: 'interactive-model' },
  'EXP:VEC-RECHNER': { component: VectorExperiment, modelType: 'calculator' },
  'EXP:SKALAR': { component: ScalarExperiment, modelType: 'calculator' },
  'EXP:DREHMOMENT': { component: TorqueExperiment, modelType: 'interactive-model' },
  'EXP:KUGELDICHTE': { component: DensityErrorExperiment, modelType: 'calculator' },
  'EXP:FOURIER': { component: FourierExperiment, modelType: 'interactive-model' },
  'EXP:REIHE': { component: SeriesExperiment, modelType: 'interactive-model' },
  'EXP:DEHNUNG-WAERME': { component: ThermalExpansionExperiment, modelType: 'interactive-model' },
  'EXP:SPANNUNG': { component: StressExperiment, modelType: 'interactive-model' },
  'EXP:HOOKE': { component: HookeExperiment, modelType: 'interactive-model' },
  'EXP:QUERKONTRAKTION': { component: PoissonExperiment, modelType: 'interactive-model' },
  'EXP:BRUECKE': { component: WheatstoneExperiment, modelType: 'interactive-model' },
  'EXP:KENNLINIE': { component: DiodeExperiment, modelType: 'interactive-model' },
  'EXP:KAFFEETASSE': { component: CupResonanceExperiment, modelType: 'visualization' },
  'EXP:WELLENMISCHER': { component: FourierExperiment, modelType: 'interactive-model' },
  'EXP:KARAMELL-TEMP': { component: KaramellTempExperiment, modelType: 'interactive-model' },
  'EXP:ZUCKERARTEN': { component: ZuckerartenExperiment, modelType: 'interactive-model' },
  'EXP:KARAMELL-SIMULATION': { component: KaramellSimulatorExperiment, modelType: 'simulation' },
  'EXP:WASSER-MOLEKUEL': { component: WaterMoleculeExperiment, modelType: 'visualization' },
  'EXP:ERWAERMUNGSKURVE': { component: HeatingCurveExperiment, modelType: 'interactive-model' },
  'EXP:DICHTE-KURVE': { component: DensityAnomalyExperiment, modelType: 'interactive-model' },
  'EXP:TAUPUNKT': { component: DewPointExperiment, modelType: 'interactive-model' },
  'EXP:WAERMEKAPAZITAET': { component: WaterHeatCapacityExperiment, modelType: 'interactive-model' },
  'EXP:PHASENDIAGRAMM': { component: PhaseDiagramExperiment, modelType: 'interactive-model' },
  'EXP:VERDUNSTUNG-RATE': { component: EvaporationExperiment, modelType: 'interactive-model' },
  'EXP:KAPILLAR': { component: CapillaryExperiment, modelType: 'interactive-model' },
  'EXP:HYDRATATION': { component: HydrationExperiment, modelType: 'interactive-model' },
  'EXP:ROHR-SPRENGUNG': { component: PipeFreezingExperiment, modelType: 'simulation' },
  'EXP:VIERTAKT': { component: FourStrokeExperiment, modelType: 'visualization' },
  'EXP:KOLBEN-KURBEL': { component: FourStrokeExperiment, modelType: 'visualization' },
  'EXP:KOLBEN-DRUCK': { component: FourStrokeExperiment, modelType: 'visualization' },
  'EXP:BREMSENERGIE': { component: BrakeEnergyExperiment, modelType: 'interactive-model' },
  'EXP:REIBUNG-WAERME': { component: BrakeEnergyExperiment, modelType: 'interactive-model' },
  'EXP:VERBRENNUNG-CHEMIE': { component: CombustionExperiment, modelType: 'interactive-model' },
  'EXP:VERBRENNUNG-TEMP': { component: CombustionExperiment, modelType: 'interactive-model' },
  'EXP:KATALYSATOR': { component: CombustionExperiment, modelType: 'interactive-model' },
  'EXP:BATTERIE-LADEN-ENTLADEN': { component: BatteryExperiment, modelType: 'simulation' },
  'EXP:BATTERIE-WAERMEENTWICKLUNG': { component: BatteryExperiment, modelType: 'simulation' },
  'EXP:BATTERIE-INNENWIDERSTAND': { component: BatteryExperiment, modelType: 'simulation' },
  'EXP:EMULSION-TRENNUNG': { component: EmulsionExperiment, modelType: 'interactive-model' },
  'EXP:EMULGATOR-WIRKUNG': { component: EmulsionExperiment, modelType: 'interactive-model' },
  'EXP:OEL-WASSER': { component: EmulsionExperiment, modelType: 'interactive-model' },
  'EXP:LECITHIN': { component: EmulsionExperiment, modelType: 'interactive-model' },
  'EXP:KOLLAGEN-TEMP': { component: CollagenExperiment, modelType: 'interactive-model' },
  'EXP:GELATINE-BILDUNG': { component: CollagenExperiment, modelType: 'interactive-model' },
  'EXP:FLEISCH-SIMULATION': { component: CollagenExperiment, modelType: 'simulation' },
  'EXP:MIZELLE': { component: MicelleExperiment, modelType: 'interactive-model' },
  'EXP:TENSID-MOLEKUEL': { component: MicelleExperiment, modelType: 'visualization' },
  'EXP:KOLBENPUMPE-SIMULATION': { component: PumpExperiment, modelType: 'simulation' },
  'EXP:UNTERDRUCK-SAUGEN': { component: PumpExperiment, modelType: 'interactive-model' },
  'EXP:SAUGHOEHE': { component: PumpExperiment, modelType: 'interactive-model' },
  'EXP:MATERIAL-MATRIX': { component: MaterialMatrixExperiment, modelType: 'interactive-model' },
  'EXP:DRAHT': { component: ElectromagnetExperiment, modelType: 'interactive-model' },
  'EXP:KLIMA-EFFEKT': { component: EarlyEarthExperiment, modelType: 'simulation' },
  'EXP:MILLER-UREY': { component: MillerUreyExperiment, modelType: 'simulation' },
  'EXP:FUNKE': { component: PiezoExperiment, modelType: 'interactive-model' },
  'EXP:DMS-WIDERSTAND': { component: PiezoExperiment, modelType: 'interactive-model' },
  'EXP:HAERTE': { component: PiezoMaterialExperiment, modelType: 'interactive-model' },
  'EXP:MOHS': { component: PiezoMaterialExperiment, modelType: 'interactive-model' },
  'EXP:WIRKUNGSGRAD': { component: EnergyHarvestingExperiment, modelType: 'interactive-model' },
  'EXP:OXIDATION': { component: ChlorineCleaningExperiment, modelType: 'interactive-model' },
  'EXP:NEUTRALISATION': { component: NeutralizationStoichiometryExperiment, modelType: 'calculator' },
  'EXP:CHE-PH:SCALE': { component: PHScaleExperiment, modelType: 'interactive-model' },
  'EXP:CHE-NEUTRAL:STOICHIOMETRY': { component: NeutralizationStoichiometryExperiment, modelType: 'calculator' },
  'EXP:ARBEITSPUNKT': { component: DiodeExperiment, modelType: 'interactive-model' },
  'EXP:BREMSVIBRATION': { component: BrakeEnergyExperiment, modelType: 'interactive-model' },
  'EXP:GEWICHT-TRAKTION': { component: BrakeEnergyExperiment, modelType: 'interactive-model' },
  'EXP:HAFTUNG-REIBUNG': { component: BrakeEnergyExperiment, modelType: 'interactive-model' },
  'EXP:KRAFT-DREHZAHL': { component: FourStrokeExperiment, modelType: 'interactive-model' },
  'EXP:KUEHLKREISLAUF': { component: CoolingExperiment, modelType: 'simulation' },
  'EXP:MOTOR-KUEHLKREISLAUF': { component: CoolingExperiment, modelType: 'simulation' },
  'EXP:CHLORGAS': { component: ChlorineCleaningExperiment, modelType: 'interactive-model' },
  'EXP:MAYONNAISE-SIMULATION': { component: EmulsionExperiment, modelType: 'simulation' },
  'EXP:OBERFLSPANNUNG': { component: CapillaryExperiment, modelType: 'interactive-model' },
  'EXP:OELEIGENSCHAFTEN': { component: OilPropertiesExperiment, modelType: 'interactive-model' },
  'EXP:POLAR-SORTIERER': { component: MicelleExperiment, modelType: 'interactive-model' },
  'EXP:POROESITAET': { component: SurfacePorosityExperiment, modelType: 'interactive-model' },
  'EXP:QUELLUNG': { component: SwellingExperiment, modelType: 'interactive-model' },
  'EXP:WISCHER-TECHNIK': { component: WiperTechniqueExperiment, modelType: 'interactive-model' },
  'EXP:ZELLTURGOR': { component: PlantTurgorExperiment, modelType: 'interactive-model' },
  'EXP:DRUCK-BLASEN': { component: PhaseDiagramExperiment, modelType: 'interactive-model' },
  'EXP:SCHNELLKOCHTOPF': { component: PhaseDiagramExperiment, modelType: 'interactive-model' },
  'EXP:SIEDEPUNKT': { component: PhaseDiagramExperiment, modelType: 'interactive-model' },
  'EXP:SIEDEPUNKT-HOEHE': { component: PhaseDiagramExperiment, modelType: 'interactive-model' },
  'EXP:VERDUNSTUNG': { component: EvaporationExperiment, modelType: 'interactive-model' },
  'EXP:PUMPENKENNLINIE': { component: PumpExperiment, modelType: 'interactive-model' },
  'EXP:COULOMB-QUIZ': { component: CoulombQuizExperiment, modelType: 'interactive-model' },
  'EXP:HOHMANN-TRANSFER': { component: HohmannExperiment, modelType: 'simulation' },
  'EXP:KREDIT-RECHNER': { component: KreditExperiment, modelType: 'calculator' },
  'EXP:KREDIT-NOXIA': { component: KreditExperiment, modelType: 'calculator' },
  'EXP:COLONY-STANDORT': { component: ColonyExperiment, modelType: 'simulation' },
  'EXP:COLONY-LEBENSERHALT': { component: ColonyExperiment, modelType: 'simulation' },
  'EXP:STATION-ORBIT': { component: StationExperiment, modelType: 'simulation' },
  'EXP:STATION-ANDOCK': { component: StationExperiment, modelType: 'simulation' },
  'EXP:POLARKURVEN': { component: SpiralExperiment, modelType: 'visualization' },
  'EXP:SCHMIEGEKREIS': { component: SpiralExperiment, modelType: 'visualization' },
  'EXP:DENATURIERUNG': { component: RotweinExperiment, modelType: 'interactive-model' },
  'EXP:FLECK-BEHANDLUNG': { component: RotweinExperiment, modelType: 'interactive-model' },
  'EXP:ABSORPTIONSLINIEN': { component: SpectralAnalysisExperiment, modelType: 'interactive-model' },
  'EXP:LICHTSPEKTRUM': { component: SpectralAnalysisExperiment, modelType: 'interactive-model' },
  'EXP:SOLAR-SYSTEM': { component: SpectralAnalysisExperiment, modelType: 'interactive-model' },
  'EXP:DIFFERENTIAL-MECHANIK': { component: DifferentialExperiment, modelType: 'interactive-model' },
  'EXP:DIFFERENTIAL-SIMULATION': { component: DifferentialExperiment, modelType: 'simulation' },
  'EXP:DIFFERENTIAL-VERGLEICH': { component: DifferentialExperiment, modelType: 'interactive-model' },
  'EXP:NOX-WATER-FILTER': { component: WaterTreatmentExperiment, modelType: 'interactive-model' },
  'EXP:NOX-WATER-DESTILLATION': { component: WaterTreatmentExperiment, modelType: 'interactive-model' },
  'EXP:NOX-WATER-CHAIN': { component: WaterTreatmentExperiment, modelType: 'simulation' },
  'EXP:NOX-RESOURCE-CHAIN': { component: ResourceSeparationExperiment, modelType: 'simulation' },
};

export function getExperimentDefinition(id: string | undefined): ExperimentDefinition | undefined { return id ? registry[id] : undefined; }
export function getExperimentComponent(id: string | undefined): ComponentType | undefined { return getExperimentDefinition(id)?.component; }
export function getRegisteredExperimentIds(): string[] { return Object.keys(registry); }
