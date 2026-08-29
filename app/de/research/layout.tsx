import type { ReactNode } from 'react';
import FoundationJourney from '../../../components/FoundationJourney';

export default function GermanResearchLayout({ children }: { children: ReactNode }) {
  return <>
    {children}
    <div className="container" style={{ paddingBottom: 88 }}>
      <FoundationJourney locale="de" current="research" />
    </div>
  </>;
}
