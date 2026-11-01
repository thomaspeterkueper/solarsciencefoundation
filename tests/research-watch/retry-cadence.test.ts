/**
 * KUEPER · Solar Science Foundation (SSF)
 * Path:      tests/research-watch/retry-cadence.test.ts
 * Name:      research-watch - failed runs do not consume the cadence window
 * Version:   0.1.0
 * Created:   2026-10-30
 * Depends:   lib/research-watch/engine.ts
 */

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, rm } from 'node:fs/promises';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import type { DiscoveryAdapter } from '../../lib/research-watch/adapters/types';
import { runResearchWatch } from '../../lib/research-watch/engine';
import { MemoryEvidenceStore } from '../../lib/research-watch/store';
import { FIXED_NOW, makeSource, stubAdapter } from './helpers';

const failingAdapter: DiscoveryAdapter = {
  discover: async () => {
    throw new Error('transient upstream failure');
  },
};

async function run(store: MemoryEvidenceStore, adapter: DiscoveryAdapter, outboxDir: string) {
  return runResearchWatch({
    store,
    sources: [makeSource('SRC-RETRY', 'stub', 24)],
    adapters: { stub: adapter },
    now: FIXED_NOW,
    outboxDir,
  });
}

test('failed source run is retried immediately; successful run stays cadence-limited', async () => {
  const outboxDir = await mkdtemp(join(tmpdir(), 'ssf-rw-retry-'));
  try {
    const store = new MemoryEvidenceStore();

    const failed = await run(store, failingAdapter, outboxDir);
    assert.equal(failed.outcomes[0].status, 'error');
    assert.equal(await store.getSourceLastRun('SRC-RETRY'), null);

    const retried = await run(store, stubAdapter([]), outboxDir);
    assert.equal(retried.outcomes[0].status, 'ok');
    assert.equal(await store.getSourceLastRun('SRC-RETRY'), FIXED_NOW.toISOString());

    const limited = await run(store, stubAdapter([]), outboxDir);
    assert.equal(limited.outcomes[0].status, 'skipped_cadence');
  } finally {
    await rm(outboxDir, { recursive: true, force: true });
  }
});
