import AuthPanel from '../../components/AuthPanel';

export default function LoginPage() {
  return (
    <div className="container" style={{ paddingTop: 56 }}>
      <p className="kicker">Account</p>
      <h1 className="hero" style={{ fontSize: 56 }}>Login to SSF.</h1>
      <p className="lede" style={{ maxWidth: '68ch' }}>
        Create an SSF account or sign in to store learning progress, achievements and partner-project unlocks persistently.
      </p>
      <AuthPanel />
    </div>
  );
}
