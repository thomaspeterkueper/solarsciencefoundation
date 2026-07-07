import type { ReactNode } from 'react';

type SectionProps = {
  children: ReactNode;
  className?: string;
  eyebrow?: string;
  title?: string;
  lead?: string;
};

export function Section({ children, className = '', eyebrow, title, lead }: SectionProps) {
  return (
    <section className={`ui-section ${className}`.trim()}>
      {(eyebrow || title || lead) && (
        <header className="ui-section-header">
          {eyebrow && <p className="ui-eyebrow">{eyebrow}</p>}
          {title && <h2 className="ui-section-title">{title}</h2>}
          {lead && <p className="ui-section-lead">{lead}</p>}
        </header>
      )}
      {children}
    </section>
  );
}
