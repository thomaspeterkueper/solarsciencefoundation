import type { Metadata } from 'next';
import { fetchLearningModules } from '../../lib/learning-modules';
import { LearnMap } from '../../components/LearnMap';

export const metadata: Metadata = {
  title: 'Wissensnetz · Solar Science Foundation',
  description: 'Was hast du heute schon gefragt? Entdecke das Netz aus Fragen, Experimenten und Verbindungen — ohne Disziplinlabels, ohne Noten.',
};

export default async function LearnPage() {
  const modules = await fetchLearningModules();
  return <LearnMap modules={modules} />;
}
