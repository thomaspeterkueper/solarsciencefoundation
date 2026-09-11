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
