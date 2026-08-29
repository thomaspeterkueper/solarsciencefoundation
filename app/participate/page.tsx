import PlatformSectionLanding from '../../components/PlatformSectionLanding';

export default function ParticipatePage() {
  return <PlatformSectionLanding
    eyebrow="Participate"
    title="SSF should be more than a course catalogue."
    intro="The platform is intended to become a place where learners, authors and supporters can contribute in different roles. This page makes that part of the project visible without pretending that unfinished membership workflows already exist."
    entries={[
      { eyebrow: 'Community', title: 'Membership', body: 'A future regular membership can connect people who want to learn, discuss and help shape the foundation over time.' },
      { eyebrow: 'Support', title: 'Supporting membership', body: 'A separate supporting role is planned for people who want to strengthen open scientific learning financially or organizationally without needing an author role.' },
      { eyebrow: 'Contribute knowledge', title: 'Become an author', body: 'SSF is designed for multiple authors. Contributors should be able to propose didactic modules while canonical scientific knowledge remains governed by the Knowledge Graph.' },
    ]}
    note="Membership applications, payments and author onboarding are not active yet. The next implementation step should define roles, rights, review workflow and the boundary between editorial SSF content and canonical KG knowledge before forms are opened."
  />;
}
