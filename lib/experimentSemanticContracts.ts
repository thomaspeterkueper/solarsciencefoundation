export const CRITICAL_EXPERIMENT_CONTRACTS = {
  'EXP:POLARITAET': 'PolarityExperiment',
  'EXP:HBRUECKEN': 'HydrogenBondExperiment',
  'EXP:OSMOSE': 'OsmosisExperiment',
  'EXP:POWER:P-VS-E': 'PowerEnergyExperiment',
  'EXP:POWER:FLOW': 'EnergyFlowExperiment',
  'EXP:POWER:HABITAT': 'HabitatPowerExperiment',
  'EXP:POWER:REDUNDANCY': 'PowerRedundancyExperiment',
} as const;

export const KNOWN_SEMANTIC_MISMATCHES = {
  'EXP:POLARITAET': ['SpinExperiment'],
  'EXP:HBRUECKEN': ['WheatstoneExperiment'],
  'EXP:OSMOSE': ['OriginOfLifeTimeline'],
} as const;
