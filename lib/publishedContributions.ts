import { createServerSupabaseClient } from './supabase/server';

export type PublishedModuleContribution = {
  id: string;
  contributionId: string;
  version: number;
  moduleId: string;
  title: string;
  summary: string;
  bodyMarkdown: string;
  sourceNotes: string | null;
  authorId: string;
  canonicalChangeRequired: boolean;
  kgRequestRef: string | null;
  publishedAt: string;
};

type PublishedRow = {
  id: string;
  contribution_id: string;
  version: number;
  module_id: string;
  title: string;
  summary: string;
  body_markdown: string;
  source_notes: string | null;
  author_id: string;
  canonical_change_required: boolean;
  kg_request_ref: string | null;
  published_at: string;
};

function mapRow(row: PublishedRow): PublishedModuleContribution {
  return {
    id: row.id,
    contributionId: row.contribution_id,
    version: row.version,
    moduleId: row.module_id,
    title: row.title,
    summary: row.summary,
    bodyMarkdown: row.body_markdown,
    sourceNotes: row.source_notes,
    authorId: row.author_id,
    canonicalChangeRequired: row.canonical_change_required,
    kgRequestRef: row.kg_request_ref,
    publishedAt: row.published_at,
  };
}

export async function getPublishedContributionsForModule(moduleId: string) {
  try {
    const supabase = createServerSupabaseClient();
    const { data, error } = await supabase
      .from('published_module_contributions')
      .select('id, contribution_id, version, module_id, title, summary, body_markdown, source_notes, author_id, canonical_change_required, kg_request_ref, published_at')
      .eq('module_id', moduleId.trim().toUpperCase())
      .is('superseded_at', null)
      .order('published_at', { ascending: true });

    if (error || !data) return [];
    return (data as PublishedRow[]).map(mapRow);
  } catch {
    // Public learning must still render when Supabase is unavailable.
    return [];
  }
}
