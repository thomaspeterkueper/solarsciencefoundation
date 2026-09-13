import assert from 'node:assert/strict';
import test from 'node:test';
import {
  getRegisteredLearningPathById,
  getRegisteredLearningPathForModule,
  learningPathRegistryIssues,
  registeredLearningPaths,
} from '../lib/learningPathRegistry';

const ACTIVE_REGISTRY_BLOCKERS = new Set([
  'duplicate_path_id',
  'duplicate_source_module_id',
  'duplicate_kxf_module_id',
  'duplicate_learning_object_id',
  'broken_unit_gate',
  'broken_alias_target',
  'ambiguous_module_mapping',
  'legacy_domain_reference',
]);

const GOVERNED_REPLACEMENT_PATH_IDS = [
  'PATH:SSF:CHE-KUECHE-KARAMELL-0001',
  'PATH:SSF:CHE-REINIGUNG-ROTWEIN-0001',
  'PATH:SSF:CHE-REINIGUNG-KALK-0001',
  'PATH:SSF:CHE-REINIGUNG-CHLOR-0001',
  'PATH:SSF:ECO-KREDIT-NOXIA-0001',
  'PATH:SSF:ECO-ZINSESZINS-NOXIA-0001',
] as const;

const RETIRED_LEGACY_PATH_IDS = [
  'PATH:SSF:ECO-KREDIT-0001',
  'PATH:SSF:ECO-ZINS-0001',
  'PATH:SSF:ENG-ROHSTOFFGEWINNUNG-0001',
  'PATH:SSF:CHE-WASSER-AUFBEREITUNG-0001',
] as const;

test('consumable learning-path registry has no structural identity blockers', () => {
  const blockers = learningPathRegistryIssues.filter((issue) => ACTIVE_REGISTRY_BLOCKERS.has(issue.type));
  assert.deepEqual(blockers, [], JSON.stringify(blockers, null, 2));
});

test('consumable learning paths expose only canonical KD domain references', () => {
  const legacyRefs = registeredLearningPaths.flatMap((path) =>
    path.domainsNeeded
      .filter((domainId) => domainId.startsWith('KNOW:'))
      .map((domainId) => ({ pathId: path.id, domainId })),
  );
  assert.deepEqual(legacyRefs, [], JSON.stringify(legacyRefs, null, 2));
});

test('governed replacements stay unique while physical legacy cleanup proceeds', () => {
  for (const pathId of GOVERNED_REPLACEMENT_PATH_IDS) {
    const matches = registeredLearningPaths.filter((path) => path.id === pathId);
    assert.equal(matches.length, 1, `${pathId} must resolve to exactly one consumable path`);
    assert.equal(getRegisteredLearningPathById(pathId)?.id, pathId);
  }
});

test('retired legacy path identities do not leak back into the consumable registry', () => {
  for (const pathId of RETIRED_LEGACY_PATH_IDS) {
    assert.equal(getRegisteredLearningPathById(pathId), null, `${pathId} must remain retired`);
  }
});

test('canonical NOXIA replacements exist for retired raw-resource and water paths', () => {
  assert.ok(getRegisteredLearningPathById('PATH:SSF:NOX-RESOURCE-EXTRACTION-0001'));
  assert.ok(getRegisteredLearningPathById('PATH:SSF:NOX-WATER-PROCESSING-0001'));
});

test('chlorine cleaning path resolves only through the canonical KG/KXF contract', () => {
  const path = getRegisteredLearningPathById('PATH:SSF:CHE-REINIGUNG-CHLOR-0001');
  assert.ok(path, 'canonical chlorine-cleaning path must be registered');

  assert.equal(path.sourceModuleId, 'CHM-L1-000004');
  assert.equal(path.kxfModuleId, 'LRN:SSF:CHM-CLEANING-HYPOCHLORITE-0001');
  assert.deepEqual(path.domainsNeeded, [
    'KD:CHM-REDOX:N2',
    'KD:CHM-CHEMICAL-SAFETY:N2',
    'KD:CHM-ACID-BASE:N2',
  ]);

  assert.equal(getRegisteredLearningPathForModule('CHM-L1-000004')?.id, path.id);
  assert.equal(getRegisteredLearningPathForModule('LRN:SSF:CHM-CLEANING-HYPOCHLORITE-0001')?.id, path.id);

  assert.equal(getRegisteredLearningPathForModule('SSF-CHE-2003'), null);
  assert.equal(getRegisteredLearningPathForModule('LRN:SSF:CHE-2003'), null);

  assert.ok(path.suppliedBy.knowledgeGraph.includes('requires CHM-L1-000001 + CHM-L1-000002'));
  assert.ok(path.suppliedBy.knowledgeGraph.includes('REQ:CHM:HYPOCHLORITE-ACID-MIX-SAFETY-0001'));
  assert.ok(path.suppliedBy.knowledgeGraph.includes('REQ:CHM:BLEACH-MECHANISM-QUALIFIER-0001'));
});
