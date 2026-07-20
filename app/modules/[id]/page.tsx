import { notFound, redirect } from 'next/navigation';
import type { Metadata } from 'next';
import { getKxfLearningModuleById } from '../../../lib/kxf';
import { getRegisteredLearningPathForModule } from '../../../lib/learningPathRegistry';

type PageProps = {
  params: Promise<{ id: string }>;
  searchParams?: { uid?: string; ref?: string };
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const mod = await getKxfLearningModuleById(id);
  const question = mod?.summary && !mod.summary.startsWith('A learning module')
    ? mod.summary : (mod?.title ?? id);
  return { title: `${question} · Solar Science Foundation` };
}

export default async function ModulePage({ params, searchParams }: PageProps) {
  const { id } = await params;

  // Build query string to preserve NOXIA context
  const qs = new URLSearchParams();
  if (searchParams?.uid) qs.set('uid', searchParams.uid);
  if (searchParams?.ref) qs.set('ref', searchParams.ref);
  const q = qs.toString() ? '?' + qs.toString() : '';

  // Step 1: Try alias map by raw route ID (catches KG YAML IDs directly)
  const pathByRawId = getRegisteredLearningPathForModule(id);
  if (pathByRawId) {
    redirect('/learning-paths/' + encodeURIComponent(pathByRawId.id) + q);
  }

  // Step 2: Try via KXF module lookup
  const mod = await getKxfLearningModuleById(id);
  if (mod) {
    const path = getRegisteredLearningPathForModule(mod.id);
    if (path) {
      redirect('/learning-paths/' + encodeURIComponent(path.id) + q);
    }
    // Module found but no path — redirect to /learn to show it in context
    redirect('/learn');
  }

  // Step 3: Nothing found — to overview
  redirect('/learning-paths');
}
