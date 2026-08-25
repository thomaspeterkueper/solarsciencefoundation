/**
 * KUEPER · Solar Science Foundation (SSF)
 * Path:      lib/research-watch/adapters/types.ts
 * Repo:      github.com/thomaspeterkueper/solarsciencefoundation/blob/main/lib/research-watch/adapters/types.ts
 * Name:      research-watch - discovery adapter interface
 * Version:   0.1.0
 * Created:   2026-08-24
 * Modified:  2026-08-24
 * Depends:   lib/research-watch/types.ts
 *
 * Adapters are replaceable. The engine resolves an adapter by the source
 * entry's "adapter" key; provider and model identity live in config, never
 * in adapter code.
 */

import type { NormalizedWork, WatchSource } from '../types';

export interface DiscoveryAdapter {
  /** Discover works from the configured source. Throws on unusable config. */
  discover(source: WatchSource): Promise<NormalizedWork[]>;
}
