/**
 * KUEPER · Solar Science Foundation (SSF)
 * Path:      lib/research-watch/adapters/fixture.ts
 * Repo:      github.com/thomaspeterkueper/solarsciencefoundation/blob/main/lib/research-watch/adapters/fixture.ts
 * Name:      research-watch - deterministic fixture adapter
 * Version:   0.1.0
 * Created:   2026-08-24
 * Modified:  2026-08-24
 * Depends:   lib/research-watch/adapters/types.ts, config/research-watch/fixtures/works.json
 *
 * Deterministic self-test data. Never a real science feed — see the source
 * coverage_note in config/research-watch/sources.json.
 */

import type { NormalizedWork, WatchSource } from '../types';
import type { DiscoveryAdapter } from './types';
import fixtureWorks from '../../../config/research-watch/fixtures/works.json';

const works = (fixtureWorks as { works: unknown }).works as NormalizedWork[];

export class FixtureAdapter implements DiscoveryAdapter {
  async discover(_source: WatchSource): Promise<NormalizedWork[]> {
    return works;
  }
}
