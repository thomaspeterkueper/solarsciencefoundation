/**
 * KUEPER - Solar Science Foundation (SSF)
 * Path: lib/legal.ts
 * Name: Legal content loader from KG registry
 * Version: 1.1.0
 * Created: 2026-07-10
 * Modified: 2026-07-10
 * Source: REQ-KG-LEGAL-ACCESS-20260710
 */

const KG_RAW = 'https://raw.githubusercontent.com/thomaspeterkueper/kueper-knowledge-graph/main';
const SITE_URL = 'https://solarsciencefoundation.vercel.app';

export interface ImpressumData {
  name: string;
  address: string;
  email: string;
  updated: string;
}

export interface LegalContent {
  impressum: ImpressumData;
  privacy: string;
  terms: string;
  status: 'draft_productive' | 'released';
}

export interface LegalProjectInfo {
  projectName: string;
  operatorName: string;
  contactEmail: string;
  postalAddress: string;
  websiteUrl: string;
  imprintUrl: string;
  privacyUrl: string;
  statusNote: string;
  updated: string;
  source: 'kxf' | 'ssf-fallback';
}

function resolveTemplate(text: string, impressum: ImpressumData): string {
  return text
    .replace(/\{\{\s*impressum\.responsible\.name\s*\}\}/g, impressum.name)
    .replace(/\{\{\s*impressum\.responsible\.address\s*\}\}/g, impressum.address)
    .replace(/\{\{\s*impressum\.responsible\.email\s*\}\}/g, impressum.email)
    .replace(/\{\{\s*impressum\.updated\s*\}\}/g, impressum.updated);
}

async function fetchText(url: string) {
  const response = await fetch(url, { next: { revalidate: 86400 } });
  if (!response.ok) throw new Error(`Legal content request failed with HTTP ${response.status}`);
  return response.text();
}

async function fetchJson<T>(url: string): Promise<T> {
  const response = await fetch(url, { next: { revalidate: 86400 } });
  if (!response.ok) throw new Error(`Legal registry request failed with HTTP ${response.status}`);
  return response.json() as Promise<T>;
}

export async function fetchLegalContent(): Promise<LegalContent> {
  const [impressumRaw, privacyRaw, termsRaw] = await Promise.all([
    fetchJson<{ responsible?: { name?: string; address?: string; email?: string }; updated?: string }>(
      `${KG_RAW}/registry/legal/impressum-master.json`
    ),
    fetchText(`${KG_RAW}/registry/legal/datenschutz.de.md`),
    fetchText(`${KG_RAW}/registry/legal/terms.de.md`),
  ]);

  const impressum: ImpressumData = {
    name: impressumRaw.responsible?.name?.trim() ?? '',
    address: impressumRaw.responsible?.address?.trim() ?? '',
    email: impressumRaw.responsible?.email?.trim() ?? '',
    updated: impressumRaw.updated ?? '2026-07-10',
  };

  return {
    impressum,
    privacy: resolveTemplate(privacyRaw, impressum),
    terms: resolveTemplate(termsRaw, impressum),
    status: 'draft_productive',
  };
}

export async function getLegalProjectInfo(): Promise<LegalProjectInfo> {
  try {
    const legal = await fetchLegalContent();
    return {
      projectName: 'Solar Science Foundation',
      operatorName: legal.impressum.name || 'Thomas Peter Küper',
      contactEmail: legal.impressum.email,
      postalAddress: legal.impressum.address,
      websiteUrl: SITE_URL,
      imprintUrl: `${SITE_URL}/imprint`,
      privacyUrl: `${SITE_URL}/legal/privacy`,
      statusNote: 'Independent science learning project. Not an accredited institution or a legally incorporated foundation.',
      updated: legal.impressum.updated,
      source: 'kxf',
    };
  } catch {
    return {
      projectName: 'Solar Science Foundation',
      operatorName: 'Thomas Peter Küper',
      contactEmail: '',
      postalAddress: '',
      websiteUrl: SITE_URL,
      imprintUrl: `${SITE_URL}/imprint`,
      privacyUrl: `${SITE_URL}/legal/privacy`,
      statusNote: 'Independent science learning project. Not an accredited institution or a legally incorporated foundation.',
      updated: '2026-07-10',
      source: 'ssf-fallback',
    };
  }
}
