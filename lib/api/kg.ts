/**
 * KUEPER - Solar Science Foundation (SSF)
 * Path: lib/api/kg.ts
 * Name: Knowledge Graph API adapter
 * Version: 0.1.0
 * Created: 2026-07-08
 */

const KG_RAW_BASE = 'https://raw.githubusercontent.com/thomaspeterkueper/kueper-knowledge-graph/main';

type KgFetchResult<T> = {
  data: T | null;
  sourceUrl: string;
  sourceType: 'kg-live-api' | 'github-raw' | 'none';
  loaded: boolean;
  error?: string;
};

function trimTrailingSlash(value: string) {
  return value.replace(/\/+$/, '');
}

function normalisePath(path: string) {
  return path.startsWith('/') ? path : `/${path}`;
}

export function kgLiveApiBaseUrl() {
  return process.env.KUEPER_KG_API_URL?.trim() || null;
}

export function kgRawExportUrl(exportPath: string) {
  return `${KG_RAW_BASE}${normalisePath(exportPath)}`;
}

function candidateLiveUrls(exportPath: string) {
  const base = kgLiveApiBaseUrl();
  if (!base) return [];

  const cleanBase = trimTrailingSlash(base);
  const path = normalisePath(exportPath);
  const filename = path.split('/').pop() ?? path.replace(/^\//, '');

  return [
    `${cleanBase}/api/exports/${filename}`,
    `${cleanBase}/exports/${filename}`,
    `${cleanBase}${path}`,
  ];
}

async function fetchJson<T>(sourceUrl: string): Promise<{ data: T | null; error?: string }> {
  try {
    const response = await fetch(sourceUrl, {
      next: { revalidate: 300 },
      headers: { accept: 'application/json' }
    });

    if (!response.ok) {
      return { data: null, error: `HTTP ${response.status}` };
    }

    return { data: (await response.json()) as T };
  } catch (error) {
    return {
      data: null,
      error: error instanceof Error ? error.message : 'Unknown fetch error'
    };
  }
}

export async function fetchKgExport<T>(exportPath: string): Promise<KgFetchResult<T>> {
  const liveUrls = candidateLiveUrls(exportPath);
  const errors: string[] = [];

  for (const sourceUrl of liveUrls) {
    const result = await fetchJson<T>(sourceUrl);
    if (result.data) {
      return { data: result.data, sourceUrl, sourceType: 'kg-live-api', loaded: true };
    }
    errors.push(`${sourceUrl}: ${result.error ?? 'no data'}`);
  }

  const rawUrl = kgRawExportUrl(exportPath);
  const raw = await fetchJson<T>(rawUrl);
  if (raw.data) {
    return {
      data: raw.data,
      sourceUrl: rawUrl,
      sourceType: 'github-raw',
      loaded: true,
      error: errors.length ? errors.join(' | ') : undefined
    };
  }

  errors.push(`${rawUrl}: ${raw.error ?? 'no data'}`);
  return {
    data: null,
    sourceUrl: rawUrl,
    sourceType: 'none',
    loaded: false,
    error: errors.join(' | ')
  };
}

export async function resolveKgId<T>(id: string): Promise<KgFetchResult<T>> {
  const base = kgLiveApiBaseUrl();
  if (!base) {
    return {
      data: null,
      sourceUrl: '',
      sourceType: 'none',
      loaded: false,
      error: 'KUEPER_KG_API_URL is not configured'
    };
  }

  const cleanBase = trimTrailingSlash(base);
  const encodedId = encodeURIComponent(id);
  const candidates = [
    `${cleanBase}/api/resolve/${encodedId}`,
    `${cleanBase}/resolve/${encodedId}`,
    `${cleanBase}/api/entities/${encodedId}`,
  ];
  const errors: string[] = [];

  for (const sourceUrl of candidates) {
    const result = await fetchJson<T>(sourceUrl);
    if (result.data) {
      return { data: result.data, sourceUrl, sourceType: 'kg-live-api', loaded: true };
    }
    errors.push(`${sourceUrl}: ${result.error ?? 'no data'}`);
  }

  return {
    data: null,
    sourceUrl: candidates[0],
    sourceType: 'none',
    loaded: false,
    error: errors.join(' | ')
  };
}
