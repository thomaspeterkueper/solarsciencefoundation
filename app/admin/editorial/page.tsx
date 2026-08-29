import EditorialContributionQueue from '../../../components/EditorialContributionQueue';

export default function EditorialAdminPage() {
  return (
    <div className="container" style={{ paddingTop: 56, paddingBottom: 80 }}>
      <p className="section-eyebrow">SSF Redaktion</p>
      <h1 className="section-headline" style={{ maxWidth: '18ch' }}>Beiträge prüfen, zurückgeben und veröffentlichen.</h1>
      <p style={{ maxWidth: '72ch', color: 'var(--muted)', lineHeight: 1.8 }}>
        Diese Ansicht ist für Curator- oder Admin-Konten bestimmt. Kanonische Änderungen bleiben außerhalb von SSF: Wenn ein Beitrag den Knowledge Graph ändern muss, ist vor dem Review eine KG-Anforderung zu referenzieren.
      </p>
      <EditorialContributionQueue />
    </div>
  );
}
