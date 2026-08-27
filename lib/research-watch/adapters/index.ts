/**
 * KUEPER · Solar Science Foundation (SSF)
 * Path:      lib/research-watch/adapters/index.ts
 * Repo:      github.com/thomaspeterkueper/solarsciencefoundation/blob/main/lib/research-watch/adapters/index.ts
 * Name:      research-watch - adapter resolution
 * Version:   0.1.0
 * Created:   2026-08-24
 * Modified:  2026-08-24
 * Depends:   lib/research-watch/adapters/*
 *
 * The single place where adapter keys are mapped to implementations.
 * Tests and future integrations may override individual adapters without
 * touching the engine.
 */

import type { DiscoveryAdapter } from './types';
import { FixtureAdapter } from './fixture';
import { HttpJsonAdapter } from './httpJson';

export function getDefaultAdapters(): Record<string, DiscoveryAdapter> {
  return {
    fixture: new FixtureAdapter(),
    'http-json': new HttpJsonAdapter(),
  };
}
