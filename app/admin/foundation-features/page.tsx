import FoundationFeatureAdmin from '../../../components/FoundationFeatureAdmin';

export default function FoundationFeatureAdminPage() {
  return <div className="container" style={{ paddingTop: 56, paddingBottom: 80 }}>
    <p className="section-eyebrow">SSF Redaktion</p>
    <h1 className="section-headline">Beiträge für öffentliche Foundation-Flächen kuratieren.</h1>
    <p style={{ maxWidth: '72ch', color: 'var(--muted)', lineHeight: 1.8 }}>Hier werden ausschließlich bereits reviewte und materialisierte Veröffentlichungen ausgewählt. Die Auswahl verändert weder den Beitrag noch sein Zielmodul oder den Knowledge Graph.</p>
    <FoundationFeatureAdmin />
  </div>;
}
