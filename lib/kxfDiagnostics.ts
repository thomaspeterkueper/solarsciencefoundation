import { fetchLearningModulesSnapshot, toSsfModuleId } from './kxf';

export type UnresolvedRequirement = {
  sourceModuleId: string;
  requiredModuleId: string;
  sourceModuleSsfId: string;
  requiredModuleSsfId: string;
  reason: 'missing_learning_module';
};

type RawLearningModule = {
  id?: unknown;
  requires?: unknown;
  dependencies?: {
    requires?: unknown;
  };
};

function isString(value: unknown): value is string {
  return typeof value === 'string' && value.length > 0;
}

function getRequires(module: RawLearningModule) {
  const modern = module.dependencies?.requires;
  const legacy = module.requires;
  return Array.isArray(modern) ? modern : Array.isArray(legacy) ? legacy : [];
}

export async function findUnresolvedRequirements(): Promise<UnresolvedRequirement[]> {
  const snapshot = await fetchLearningModulesSnapshot();
  const records = snapshot.data?.records as { learning_modules?: RawLearningModule[]; learningModules?: RawLearningModule[] } | undefined;
  const modules = records?.learning_modules ?? records?.learningModules ?? [];
  const moduleIds = new Set(modules.map((module) => module.id).filter(isString));
  const unresolved: UnresolvedRequirement[] = [];

  for (const module of modules) {
    if (!isString(module.id)) continue;
    for (const required of getRequires(module)) {
      if (!isString(required)) continue;
      if (required.startsWith('LRN:SSF:') && !moduleIds.has(required)) {
        unresolved.push({
          sourceModuleId: module.id,
          requiredModuleId: required,
          sourceModuleSsfId: toSsfModuleId(module.id),
          requiredModuleSsfId: toSsfModuleId(required),
          reason: 'missing_learning_module'
        });
      }
    }
  }

  return unresolved;
}
