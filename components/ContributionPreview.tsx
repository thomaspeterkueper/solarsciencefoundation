type ContributionPreviewProps = {
  title: string;
  summary?: string | null;
  bodyMarkdown: string;
  sourceNotes?: string | null;
  targetModuleId?: string | null;
  authorLabel?: string | null;
  statusLabel?: string | null;
};

function renderMarkdownBlocks(markdown: string) {
  const blocks = markdown.split(/\n{2,}/).map((block) => block.trim()).filter(Boolean);
  return blocks.map((block, index) => {
    if (block.startsWith('### ')) return <h4 key={index}>{block.slice(4)}</h4>;
    if (block.startsWith('## ')) return <h3 key={index}>{block.slice(3)}</h3>;
    if (block.startsWith('# ')) return <h2 key={index}>{block.slice(2)}</h2>;
    const lines = block.split('\n');
    if (lines.every((line) => /^[-*] /.test(line))) {
      return <ul key={index}>{lines.map((line) => <li key={line}>{line.slice(2)}</li>)}</ul>;
    }
    return <p key={index} style={{ whiteSpace: 'pre-wrap' }}>{block}</p>;
  });
}

export default function ContributionPreview({
  title,
  summary,
  bodyMarkdown,
  sourceNotes,
  targetModuleId,
  authorLabel,
  statusLabel,
}: ContributionPreviewProps) {
  return (
    <article className="platform-card" style={{ maxWidth: 900 }}>
      <div className="mono" style={{ color: 'var(--muted)', fontSize: 12, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
        <span>SSF-Beitrag</span>
        {statusLabel && <span>{statusLabel}</span>}
        {targetModuleId && <span>Ziel: {targetModuleId}</span>}
      </div>
      <h2 style={{ marginTop: 12 }}>{title || 'Noch ohne Titel'}</h2>
      {summary && <p style={{ color: 'var(--muted)', lineHeight: 1.7, fontSize: 17 }}>{summary}</p>}
      <div style={{ lineHeight: 1.75, marginTop: 22 }}>
        {bodyMarkdown.trim() ? renderMarkdownBlocks(bodyMarkdown) : <p style={{ color: 'var(--muted)' }}>Noch kein Beitragstext.</p>}
      </div>
      {(authorLabel || sourceNotes) && (
        <footer style={{ marginTop: 26, paddingTop: 18, borderTop: '1px solid var(--border)' }}>
          {authorLabel && <p style={{ margin: 0 }}><strong>Autorenschaft:</strong> {authorLabel}</p>}
          {sourceNotes && <details style={{ marginTop: 12 }}><summary>Quellen und Hinweise</summary><div style={{ whiteSpace: 'pre-wrap', marginTop: 10, color: 'var(--muted)' }}>{sourceNotes}</div></details>}
        </footer>
      )}
    </article>
  );
}
