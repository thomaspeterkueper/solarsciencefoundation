import AuthorWorkspace from '../../components/AuthorWorkspace';

export default function AuthorPage() {
  return (
    <div className="container" style={{ paddingTop: 56, paddingBottom: 80 }}>
      <p className="section-eyebrow">SSF Autorenschaft</p>
      <h1 className="section-headline" style={{ maxWidth: '18ch' }}>Didaktische Beiträge entwickeln und durch Review bringen.</h1>
      <p style={{ maxWidth: '72ch', color: 'var(--muted)', lineHeight: 1.8 }}>
        Der Autorenbereich ist für freigeschaltete SSF-Autorinnen und -Autoren. Entwürfe bleiben zunächst privat, werden anschließend fachlich geprüft, bei Bedarf überarbeitet und erst nach redaktioneller Freigabe veröffentlicht.
      </p>
      <AuthorWorkspace />
    </div>
  );
}
