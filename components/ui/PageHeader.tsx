import type { ReactNode } from 'react';

type PageHeaderProps = {
  eyebrow?: string;
  title: string;
  lead?: string;
  children?: ReactNode;
};

export function PageHeader({ eyebrow, title, lead, children }: PageHeaderProps) {
  return (
    <header className="ui-page-header">
      {eyebrow && <p className="ui-eyebrow">{eyebrow}</p>}
      <h1 className="ui-page-title">{title}</h1>
      {lead && <p className="ui-page-lead">{lead}</p>}
      {children && <div className="ui-page-header-extra">{children}</div>}
    </header>
  );
}
