import { createServerSupabaseClient } from './supabase/server';

export type PublicAuthorProfile = {
  authorId: string;
  slug: string;
  publicName: string;
  shortBio: string | null;
  expertise: string | null;
  websiteUrl: string | null;
};

export type PublicAuthorContribution = {
  id: string;
  contributionId: string;
  moduleId: string;
  title: string;
  summary: string;
  version: number;
  publishedAt: string;
};

export type FeaturedContribution = PublicAuthorContribution & {
  authorId: string;
  authorName: string | null;
  authorSlug: string | null;
  editorialNote: string | null;
  placement: 'foundation' | 'home';
  sortOrder: number;
};

function mapProfile(row: any): PublicAuthorProfile {
  return { authorId: row.author_id, slug: row.slug, publicName: row.public_name, shortBio: row.short_bio ?? null, expertise: row.expertise ?? null, websiteUrl: row.website_url ?? null };
}

export async function getPublicAuthors(): Promise<PublicAuthorProfile[]> {
  try {
    const supabase = createServerSupabaseClient();
    const { data, error } = await supabase.from('public_author_profiles').select('author_id, slug, public_name, short_bio, expertise, website_url').eq('is_public', true).order('public_name');
    if (error || !data) return [];
    return data.map(mapProfile);
  } catch { return []; }
}

export async function getPublicAuthorBySlug(slug: string): Promise<PublicAuthorProfile | null> {
  try {
    const supabase = createServerSupabaseClient();
    const { data, error } = await supabase.from('public_author_profiles').select('author_id, slug, public_name, short_bio, expertise, website_url').eq('slug', slug).eq('is_public', true).maybeSingle();
    return error || !data ? null : mapProfile(data);
  } catch { return null; }
}

export async function getPublishedContributionsByAuthor(authorId: string): Promise<PublicAuthorContribution[]> {
  try {
    const supabase = createServerSupabaseClient();
    const { data, error } = await supabase.from('published_module_contributions').select('id, contribution_id, module_id, title, summary, version, published_at').eq('author_id', authorId).is('superseded_at', null).order('published_at', { ascending: false });
    if (error || !data) return [];
    return data.map((row: any) => ({ id: row.id, contributionId: row.contribution_id, moduleId: row.module_id, title: row.title, summary: row.summary, version: row.version, publishedAt: row.published_at }));
  } catch { return []; }
}

export async function getFeaturedContributions(placement: 'foundation' | 'home' = 'foundation', limit = 6): Promise<FeaturedContribution[]> {
  try {
    const supabase = createServerSupabaseClient();
    const { data: features, error } = await supabase.from('foundation_featured_contributions').select('publication_id, placement, sort_order, editorial_note').eq('placement', placement).eq('is_active', true).order('sort_order').limit(limit);
    if (error || !features?.length) return [];
    const ids = features.map((row: any) => row.publication_id);
    const { data: publications } = await supabase.from('published_module_contributions').select('id, contribution_id, module_id, title, summary, version, author_id, published_at').in('id', ids).is('superseded_at', null);
    if (!publications) return [];
    const authorIds = [...new Set(publications.map((row: any) => row.author_id))];
    const { data: authors } = authorIds.length ? await supabase.from('public_author_profiles').select('author_id, slug, public_name').in('author_id', authorIds).eq('is_public', true) : { data: [] as any[] };
    const authorMap = new Map((authors ?? []).map((row: any) => [row.author_id, row]));
    const pubMap = new Map(publications.map((row: any) => [row.id, row]));
    return features.flatMap((feature: any) => {
      const pub: any = pubMap.get(feature.publication_id); if (!pub) return [];
      const author: any = authorMap.get(pub.author_id);
      return [{ id: pub.id, contributionId: pub.contribution_id, moduleId: pub.module_id, title: pub.title, summary: pub.summary, version: pub.version, publishedAt: pub.published_at, authorId: pub.author_id, authorName: author?.public_name ?? null, authorSlug: author?.slug ?? null, editorialNote: feature.editorial_note ?? null, placement: feature.placement, sortOrder: feature.sort_order }];
    });
  } catch { return []; }
}
