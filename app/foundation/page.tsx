import PlatformSectionLanding from '../../components/PlatformSectionLanding';

export default function FoundationPage() {
  return <PlatformSectionLanding
    eyebrow="Foundation"
    title="The institution behind the learning platform."
    intro="Solar Science Foundation is not only a navigation layer for lessons. Its identity also includes mission, authorship, transparency, research practice and a community that can support the project independently of NOχ¹Δ."
    entries={[
      { eyebrow: 'Mission', title: 'Open scientific understanding', body: 'SSF translates scientific foundations into understandable, bilingual learning experiences that can stand on their own.' },
      { eyebrow: 'People', title: 'Authors and contributors', body: 'The foundation is designed for visible authorship and multiple contributors rather than anonymous course production.' },
      { eyebrow: 'Trust', title: 'Transparency and provenance', body: 'Sources, AI use, research-watch provenance and the separation between didactics and canonical knowledge should remain inspectable.' },
    ]}
    note="The fictional institutional frame and the real public learning platform should stay clearly distinguishable. Governance pages can describe the project model without presenting a legally registered foundation or active paid membership where none exists."
  />;
}
