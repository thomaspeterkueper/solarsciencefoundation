import ContributionMaterializationPanel from '../../../components/ContributionMaterializationPanel';

export default function MaterializationAdminPage() {
  return (
    <div className="container" style={{ paddingTop: 56, paddingBottom: 80 }}>
      <p className="section-eyebrow">SSF Redaktion</p>
      <h1 className="section-headline" style={{ maxWidth: '18ch' }}>Freigegebene Beiträge kontrolliert veröffentlichen.</h1>
      <p style={{ maxWidth: '72ch', color: 'var(--muted)', lineHeight: 1.8 }}>
        Dieser Schritt erzeugt einen unveränderlichen, versionierten Veröffentlichungssnapshot für das angegebene SSF-Modul. Bestehende statische Didaktik und KXF/KG-Kanon werden nicht überschrieben.
      </p>
      <ContributionMaterializationPanel />
    </div>
  );
}
