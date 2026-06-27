'use client';

import { useState } from 'react';
import { createBrowserSupabaseClient } from '../lib/supabase/client';

export default function AuthPanel() {
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState('');
  const [secret, setSecret] = useState('');
  const [message, setMessage] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function submit() {
    setBusy(true);
    setMessage(null);
    try {
      const supabase = createBrowserSupabaseClient();
      const result = isSignup
        ? await supabase.auth.signUp({ email, password: secret })
        : await supabase.auth.signInWithPassword({ email, password: secret });
      if (result.error) {
        setMessage(result.error.message);
      } else {
        setMessage(isSignup ? 'Account created. Check your email if confirmation is required.' : 'Signed in. Progress can now be stored.');
      }
    } catch {
      setMessage('Authentication is not available yet. Check the Supabase environment variables.');
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="card" style={{ marginTop: 34, maxWidth: 560 }}>
      <div className="module-meta">
        <button className={!isSignup ? 'btn' : 'btn secondary'} onClick={() => setIsSignup(false)} type="button">Login</button>
        <button className={isSignup ? 'btn' : 'btn secondary'} onClick={() => setIsSignup(true)} type="button">Sign up</button>
      </div>
      <label style={{ display: 'block', marginTop: 18 }}>
        <span className="mono" style={{ color: 'var(--steel)', fontSize: 13 }}>Email</span>
        <input value={email} onChange={(event) => setEmail(event.target.value)} type="email" style={{ width: '100%', padding: 14, borderRadius: 10, border: '1px solid var(--border)', marginTop: 6, font: 'inherit' }} />
      </label>
      <label style={{ display: 'block', marginTop: 14 }}>
        <span className="mono" style={{ color: 'var(--steel)', fontSize: 13 }}>Password</span>
        <input value={secret} onChange={(event) => setSecret(event.target.value)} type="password" style={{ width: '100%', padding: 14, borderRadius: 10, border: '1px solid var(--border)', marginTop: 6, font: 'inherit' }} />
      </label>
      <button className="btn" onClick={submit} disabled={busy || !email || !secret} style={{ marginTop: 18 }} type="button">
        {busy ? 'Working…' : isSignup ? 'Create account' : 'Login'}
      </button>
      {message && <p style={{ color: 'var(--steel)' }}>{message}</p>}
    </div>
  );
}
