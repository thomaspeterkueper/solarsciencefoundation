import assert from 'node:assert/strict';
import test from 'node:test';
import { learningPathRegistryIssues, registeredLearningPaths } from '../lib/learningPathRegistry';

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
