import type { Metadata } from 'next';
import { fetchLearningModules } from '../../lib/learning-modules';
import { LearnMap } from '../../components/LearnMap';

export const metadata: Metadata = {
  title: 'Entdecken · Solar Science Foundation',
  description: 'Folge deiner Neugier durch Physik, Chemie, Mathematik, Geschichte, Sprache und mehr.'
};

export default async function LearnPage() {
  const modules = await fetchLearningModules();
  return <LearnMap modules={modules} />;
}
