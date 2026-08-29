import FoundationHighlights from '../../components/FoundationHighlights';
import FoundationJourney from '../../components/FoundationJourney';
import PlatformSectionLanding from '../../components/PlatformSectionLanding';

export default function FoundationPage() {
  return <>
    <PlatformSectionLanding
      eyebrow="Foundation"
      title="The public layer that connects learning, research and people."
      intro="Solar Science Foundation is designed as more than a catalogue of lessons. It connects open learning, traceable research sources, visible authorship and structured participation in one public platform."
      entries={[
        { eyebrow: 'Mission', title: 'Understanding before credentials', body: 'Start with questions and build enough understanding to reach sources and research documents.', href: '/learning', cta: 'Start learning →' },
        { eyebrow: 'Research', title: 'Follow knowledge to its sources', body: 'Learning modules can lead into archive documents and research provenance instead of ending at a quiz.', href: '/research', cta: 'Explore research →' },
        { eyebrow: 'People', title: 'Visible authorship', body: 'Published contributions retain authorship, review and publication provenance instead of appearing as anonymous course material.', href: '/authors', cta: 'Meet the authors →' },
        { eyebrow: 'Participation', title: 'Contribute through defined roles', body: 'Membership, support, authorship, review and editorial responsibility remain deliberately distinct.', href: '/participate', cta: 'See how to participate →' },
      ]}
      note="The institutional Foundation frame and the real public learning platform remain distinguishable. SSF does not present itself as a legally registered foundation or paid-membership organization unless those structures actually exist."
    />
    <div className="container" style={{ paddingBottom: 88 }}>
      <FoundationHighlights locale="en" />
      <section style={{ marginTop: 56, maxWidth: '72ch', padding: 28, border: '1px solid var(--border)', borderRadius: 18 }}>
        <p className="section-eyebrow">Trust layer</p>
        <h2 style={{ marginTop: 8 }}>Provenance is part of the product.</h2>
        <p style={{ color: 'var(--muted)', lineHeight: 1.75 }}>Sources, AI use, author attribution and the boundary between SSF didactics and canonical Knowledge Graph content should remain inspectable rather than hidden behind the interface.</p>
        <p style={{ marginBottom: 0 }}><a href="/ki-transparenz">AI transparency →</a></p>
      </section>
      <FoundationJourney locale="en" current="foundation" />
    </div>
  </>;
}
