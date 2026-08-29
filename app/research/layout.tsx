import type { ReactNode } from 'react';
import FoundationJourney from '../../components/FoundationJourney';

export default function ResearchLayout({ children }: { children: ReactNode }) {
  return <>
    {children}
    <div className="container" style={{ paddingBottom: 88 }}>
      <FoundationJourney locale="en" current="research" />
    </div>
  </>;
}
