/**
 * KUEPER · Solar Science Foundation (SSF)
 * Path:      tests/research-watch/identity.test.ts
 * Name:      research-watch - identity/deduplication key tests
 * Version:   0.1.0
 * Created:   2026-08-24
 * Depends:   lib/research-watch/identity.ts
 */

import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  hasStableIdentity,
  identityKeys,
  normaliseArxiv,
  normaliseDoi,
  primaryIdentityKey,
  titleFingerprint,
} from '../../lib/research-watch/identity';

test('normaliseDoi strips prefixes and lowercases', () => {
  assert.equal(
    normaliseDoi('https://doi.org/10.2401/ssf.2026.grav-dup'),
    '10.2401/ssf.2026.grav-dup'
  );
  assert.equal(normaliseDoi('DOI: 10.2401/ABC'), '10.2401/abc');
  assert.equal(normaliseDoi('10.2401/ssf.2026.grav-dup'), '10.2401/ssf.2026.grav-dup');
  assert.equal(normaliseDoi('not a doi'), null);
});

test('normaliseArxiv extracts id and version', () => {
  assert.equal(normaliseArxiv('arXiv:2501.04567v2'), '2501.04567v2');
  assert.equal(normaliseArxiv('https://arxiv.org/abs/2501.04567'), '2501.04567');
  assert.equal(normaliseArxiv('2501.04567V1'), '2501.04567v1');
  assert.equal(normaliseArxiv('10.2401/not-arxiv'), null);
});

test('title fingerprint is deterministic and title-sensitive', () => {
  const a = titleFingerprint('The same title', 'https://example.invalid/x');
  const b = titleFingerprint('The same title', 'https://example.invalid/x');
  const c = titleFingerprint('A different title', 'https://example.invalid/x');
  const d = titleFingerprint('The same title', undefined);
  assert.equal(a, b);
  assert.notEqual(a, c);
  assert.notEqual(a, d);
});

test('identity keys follow the preferred order; fingerprint is fallback-only', () => {
  const keys = identityKeys({
    title: 'Some work',
    identifiers: {
      doi: 'https://doi.org/10.2401/example',
      arxiv: 'arXiv:2501.04567v1',
      registry: 'PUBMED:12345',
      dataset: 'DS-42',
    },
  });
  assert.deepEqual(keys, [
    'doi:10.2401/example',
    'arxiv:2501.04567v1',
    'registry:pubmed:12345',
    'dataset:ds-42',
  ]);
  assert.equal(primaryIdentityKey(keys), 'doi:10.2401/example');

  const fallback = identityKeys({ title: 'No identifiers at all' });
  assert.equal(fallback.length, 1);
  assert.equal(fallback[0].startsWith('fingerprint:'), true);
});

test('stable identity requires DOI/arXiv/registry/dataset, not fingerprint', () => {
  assert.equal(hasStableIdentity(['doi:10.2401/example']), true);
  assert.equal(hasStableIdentity(['arxiv:2501.04567v1']), true);
  assert.equal(hasStableIdentity(['dataset:ds-42']), true);
  assert.equal(hasStableIdentity(['fingerprint:abcdef0123456789']), false);
  assert.equal(hasStableIdentity(['fingerprint:abcdef0123456789', 'doi:10.2401/x']), true);
});

test('arXiv identity is version-sensitive', () => {
  const v1 = identityKeys({ title: 'T', identifiers: { arxiv: '2501.04567v1' } });
  const v2 = identityKeys({ title: 'T', identifiers: { arxiv: '2501.04567v2' } });
  assert.notDeepEqual(v1, v2);
});
