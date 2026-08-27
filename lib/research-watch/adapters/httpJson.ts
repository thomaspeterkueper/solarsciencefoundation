/**
 * KUEPER · Solar Science Foundation (SSF)
 * Path:      lib/research-watch/adapters/httpJson.ts
 * Repo:      github.com/thomaspeterkueper/solarsciencefoundation/blob/main/lib/research-watch/adapters/httpJson.ts
 * Name:      research-watch - generic HTTP JSON feed adapter
 * Version:   0.1.0
 * Created:   2026-08-24
 * Modified:  2026-08-24
 * Depends:   lib/research-watch/adapters/types.ts
 *
 * Provider-agnostic JSON feed consumer. The feed URL comes from the source
 * config (config.env_feed_url reads the named environment variable, falling
 * back to config.feed_url). Provider/model identity is config, never code.
 *
 * Accepted payload shapes: a JSON array of normalized works, or an object
 * with a "works" array.
 */

import type { NormalizedWork, WatchSource } from '../types';
import type { DiscoveryAdapter } from './types';

export class HttpJsonAdapter implements DiscoveryAdapter {
  async discover(source: WatchSource): Promise<NormalizedWork[]> {
    const feedUrl = this.resolveFeedUrl(source);
    if (!feedUrl) {
      throw new Error(`http-json adapter: source ${source.id} has no feed URL configured`);
    }

    const response = await fetch(feedUrl, {
      headers: { accept: 'application/json' },
      cache: 'no-store',
    });
    if (!response.ok) {
      throw new Error(`http-json adapter: ${source.id} returned HTTP ${response.status}`);
    }

    const payload = (await response.json()) as unknown;
    const works = Array.isArray(payload)
      ? payload
      : (payload as { works?: unknown } | null)?.works;

    if (!Array.isArray(works)) {
      throw new Error(`http-json adapter: ${source.id} payload has no works array`);
    }

    const valid: NormalizedWork[] = [];
    for (const entry of works as NormalizedWork[]) {
      if (entry && typeof entry.raw_id === 'string' && typeof entry.title === 'string') {
        valid.push(entry);
      }
    }
    return valid;
  }

  private resolveFeedUrl(source: WatchSource): string | null {
    const envName = source.config?.env_feed_url;
    if (typeof envName === 'string' && envName) {
      const fromEnv = process.env[envName]?.trim();
      if (fromEnv) return fromEnv;
    }
    const staticUrl = source.config?.feed_url;
    if (typeof staticUrl === 'string' && staticUrl) return staticUrl;
    return null;
  }
}
