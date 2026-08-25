/**
 * KUEPER · Solar Science Foundation (SSF)
 * Path:      tests/research-watch/helpers.ts
 * Name:      research-watch - test helpers
 * Version:   0.1.0
 * Created:   2026-08-24
 */

import type { DiscoveryAdapter } from '../../lib/research-watch/adapters/types';
import type { NormalizedWork, WatchSource } from '../../lib/research-watch/types';

export const FIXED_NOW = new Date('2026-08-24T04:20:00.000Z');

export function stubAdapter(works: NormalizedWork[]): DiscoveryAdapter {
  return { discover: async () => works };
}

export function makeSource(id: string, adapter = 'stub', cadenceHours = 0): WatchSource {
  return {
    id,
    name: `Test source ${id}`,
    source_class: 'primary-literature',
    adapter,
    enabled: true,
    cadence_hours: cadenceHours,
    cost_policy: 'immediate',
    coverage_note: 'Test-only source; covers only injected works.',
  };
}

export function work(overrides: Partial<NormalizedWork> & { raw_id: string; title: string }): NormalizedWork {
  return {
    evidence_type: 'primary-study',
    publication_status: 'published',
    ...overrides,
  };
}
