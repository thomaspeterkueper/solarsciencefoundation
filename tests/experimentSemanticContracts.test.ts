import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import { CRITICAL_EXPERIMENT_CONTRACTS, KNOWN_SEMANTIC_MISMATCHES } from '../lib/experimentSemanticContracts';

const registrySource = readFileSync('components/learning/experimentRegistry.ts', 'utf8');

test('critical experiment ids resolve to their intended semantic components', () => {
  for (const [experimentId, componentName] of Object.entries(CRITICAL_EXPERIMENT_CONTRACTS)) {
    const pattern = new RegExp(`['\"]${experimentId.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}['\"]\\s*:\\s*\\{\\s*component:\\s*${componentName}\\b`);
    assert.match(registrySource, pattern, `${experimentId} must map to ${componentName}`);
  }
});

test('known fachfremde mappings cannot return for audited ids', () => {
  for (const [experimentId, forbiddenComponents] of Object.entries(KNOWN_SEMANTIC_MISMATCHES)) {
    for (const forbidden of forbiddenComponents) {
      const pattern = new RegExp(`['\"]${experimentId.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}['\"]\\s*:\\s*\\{\\s*component:\\s*${forbidden}\\b`);
      assert.doesNotMatch(registrySource, pattern, `${experimentId} must not map to ${forbidden}`);
    }
  }
});
