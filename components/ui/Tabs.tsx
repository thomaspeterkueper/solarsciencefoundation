'use client';

import type { ReactNode } from 'react';

type Tab = {
  id: string;
  label: ReactNode;
};

type TabsProps = {
  tabs: Tab[];
  active: string;
  onChange: (id: string) => void;
  label: string;
};

export function Tabs({ tabs, active, onChange, label }: TabsProps) {
  return (
    <div className="ui-tabs" role="tablist" aria-label={label}>
      {tabs.map((tab) => (
        <button key={tab.id} type="button" className={active === tab.id ? 'is-active' : ''} onClick={() => onChange(tab.id)}>
          {tab.label}
        </button>
      ))}
    </div>
  );
}
