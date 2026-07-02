import ProgressDashboard from '../../../components/ProgressDashboard';

export default function GermanProgressPage() {
  return (
    <div className="container" style={{ paddingTop: 56 }}>
      <p className="kicker">Lernfortschritt</p>
      <h1 className="hero" style={{ fontSize: 56 }}>Dein SSF-Fortschritt.</h1>
      <p className="lede" style={{ maxWidth: '68ch' }}>
        Dieses Dashboard zeigt abgeschlossene Module, Lernerfolge und Freischaltungen fuer Partnerprojekte.
        Die aktuelle Version nutzt noch den Demo-Fortschrittsspeicher; dauerhafte Speicherung folgt spaeter.
      </p>
      <ProgressDashboard />
    </div>
  );
}
