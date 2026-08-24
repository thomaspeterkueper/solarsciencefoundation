/**
 * KUEPER · Solar Science Foundation (SSF)
 * Path:      lib/research-watch/sources.ts
 * Repo:      github.com/thomaspeterkueper/solarsciencefoundation/blob/main/lib/research-watch/sources.ts
 * Name:      research-watch - source registry access
 * Version:   0.1.0
 * Created:   2026-08-24
 * Modified:  2026-08-24
 * Depends:   config/research-watch/sources.json
 *
 * Sources are configuration, not hard-coded agent knowledge. Adapter keys
 * name replaceable implementations; provider identity lives in config only.
 */

import sourceRegistry from '../../config/research-watch/sources.json';
import type { WatchSource } from './types';

const registry = sourceRegistry as { sources: unknown };

export function getWatchSources(): WatchSource[] {
  if (!registry || !Array.isArray(registry.sources)) {
    throw new Error('research-watch sources.json: missing or invalid "sources" array');
  }
  const sources = registry.sources as WatchSource[];
  const ids = new Set<string>();

  for (const source of sources) {
    if (!source.id || ids.has(source.id)) {
      throw new Error(`research-watch sources.json: duplicate source id "${source.id}"`);
    }
    ids.add(source.id);
    if (!source.name || !source.adapter || !source.coverage_note) {
      throw new Error(`research-watch source ${source.id}: name, adapter and coverage_note are required`);
    }
    if (typeof source.enabled !== 'boolean' || typeof source.cadence_hours !== 'number') {
      throw new Error(`research-watch source ${source.id}: enabled and cadence_hours are required`);
    }
  }

  return sources;
}

export function getEnabledWatchSources(): WatchSource[] {
  return getWatchSources().filter((source) => source.enabled);
}
