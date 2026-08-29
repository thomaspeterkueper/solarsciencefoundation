import PlatformSectionLanding from '../../components/PlatformSectionLanding';

export default function LearningHubPage() {
  return <PlatformSectionLanding
    eyebrow="Learning"
    title="One place to start learning."
    intro="The knowledge map, subjects and learning paths are three views of the same learning system. They now live together here instead of competing for space in the main navigation."
    entries={[
      { eyebrow: 'Guided', title: 'Learning paths', body: 'Follow structured journeys from an everyday question to experiments, explanations and checks.', href: '/learning-paths', cta: 'Open learning paths →' },
      { eyebrow: 'By field', title: 'Subjects', body: 'Browse physics, chemistry, mathematics, astronomy and the other scientific fields directly.', href: '/subjects', cta: 'Browse subjects →' },
      { eyebrow: 'Connected', title: 'Knowledge map', body: 'Explore how modules and ideas connect when you do not want to follow a fixed route.', href: '/learn', cta: 'Explore the map →' },
    ]}
    note="SSF remains useful as a standalone learning platform. NOχ¹Δ can consume progress and unlocks, but the learning structure does not depend on the game."
  />;
}
