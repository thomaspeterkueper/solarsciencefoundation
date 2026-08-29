import ParticipationAdminPanel from '../../../components/ParticipationAdminPanel';

export default function ParticipationAdminPage() {
  return (
    <div className="container" style={{ paddingTop: 56, paddingBottom: 80 }}>
      <p className="section-eyebrow">SSF Administration</p>
      <h1 className="section-headline" style={{ maxWidth: '18ch' }}>Anträge prüfen und kontrolliert freigeben.</h1>
      <p style={{ maxWidth: '72ch', color: 'var(--muted)', lineHeight: 1.8 }}>
        Diese interne Ansicht ist ausschließlich für Konten mit der technischen Rolle ROLE:SSF:admin bestimmt. Eine Annahme vergibt nur die minimal vorgesehene technische Rolle; weitergehende Autoren-, Review- oder Redaktionsrechte werden hier nicht automatisch vergeben.
      </p>
      <ParticipationAdminPanel />
    </div>
  );
}
