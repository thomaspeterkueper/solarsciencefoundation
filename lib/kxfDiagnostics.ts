import { fetchKxfSnapshot, toSsfModuleId } from './kxf';

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
};

function isString(value: unknown): value is string {
  return typeof value === 'string' && value.length > 0;
}

export async function findUnresolvedRequirements(): Promise<UnresolvedRequirement[]> {
  const snapshot = await fetchKxfSnapshot();
  const modules = (snapshot.data?.records?.learningModules ?? []) as RawLearningModule[];
  const moduleIds = new Set(modules.map((module) => module.id).filter(isString));
  const unresolved: UnresolvedRequirement[] = [];

  for (const module of modules) {
    if (!isString(module.id) || !Array.isArray(module.requires)) continue;
    for (const required of module.requires) {
      if (!isString(required)) continue;
      if (!moduleIds.has(required)) {
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
