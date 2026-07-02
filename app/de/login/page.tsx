import AuthPanel from '../../../components/AuthPanel';

export default function GermanLoginPage() {
  return (
    <div className="container" style={{ paddingTop: 56 }}>
      <p className="kicker">Konto</p>
      <h1 className="hero" style={{ fontSize: 56 }}>Bei SSF anmelden.</h1>
      <p className="lede" style={{ maxWidth: '68ch' }}>
        Erstelle ein SSF-Konto oder melde dich an, um Lernfortschritt, Erfolge und Freischaltungen fuer Partnerprojekte dauerhaft zu speichern.
      </p>
      <AuthPanel />
    </div>
  );
}
