'use client';

import { useEffect, useState } from 'react';
import { createBrowserSupabaseClient } from '../lib/supabase/client';

type ProfileDraft = {
  slug: string;
  publicName: string;
  shortBio: string;
  expertise: string;
  websiteUrl: string;
  isPublic: boolean;
};

const empty: ProfileDraft = { slug: '', publicName: '', shortBio: '', expertise: '', websiteUrl: '', isPublic: false };

export default function PublicAuthorProfileEditor() {
  const [userId, setUserId] = useState<string | null>(null);
  const [draft, setDraft] = useState<ProfileDraft>(empty);
  const [message, setMessage] = useState('');
  const [busy, setBusy] = useState(false);

  useEffect(() => { void (async () => {
    const supabase = createBrowserSupabaseClient();
    const { data } = await supabase.auth.getSession();
    const id = data.session?.user.id ?? null;
    setUserId(id);
    if (!id) return;
    const { data: profile } = await supabase.from('public_author_profiles').select('slug, public_name, short_bio, expertise, website_url, is_public').eq('author_id', id).maybeSingle();
    if (profile) setDraft({ slug: profile.slug, publicName: profile.public_name, shortBio: profile.short_bio ?? '', expertise: profile.expertise ?? '', websiteUrl: profile.website_url ?? '', isPublic: profile.is_public });
  })(); }, []);

  async function save() {
    if (!userId) return;
    setBusy(true); setMessage('');
    const supabase = createBrowserSupabaseClient();
    const payload = {
      author_id: userId,
      slug: draft.slug.trim().toLowerCase(),
      public_name: draft.publicName.trim(),
      short_bio: draft.shortBio.trim() || null,
      expertise: draft.expertise.trim() || null,
      website_url: draft.websiteUrl.trim() || null,
      is_public: draft.isPublic,
      updated_at: new Date().toISOString(),
    };
    const { error } = await supabase.from('public_author_profiles').upsert(payload, { onConflict: 'author_id' });
    setMessage(error ? error.message : draft.isPublic ? 'Öffentliches Autorenprofil gespeichert.' : 'Autorenprofil gespeichert, aber noch nicht öffentlich.');
    setBusy(false);
  }

  if (!userId) return null;
  return <section className="card" style={{ marginTop: 36 }}>
    <p className="section-eyebrow">Öffentliche Autorenschaft</p>
    <h2>Autorenprofil</h2>
    <p style={{ color: 'var(--muted)', lineHeight: 1.7 }}>Dieses Profil ist freiwillig. Erst wenn „öffentlich anzeigen“ aktiviert ist, erscheint es im Autorenverzeichnis. Private Kontodaten werden nicht veröffentlicht.</p>
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
      <input placeholder="Öffentlicher Name" value={draft.publicName} onChange={e => setDraft({ ...draft, publicName: e.target.value })} style={{ padding: 12 }} />
      <input placeholder="Profil-Slug, z. B. anna-muster" value={draft.slug} onChange={e => setDraft({ ...draft, slug: e.target.value })} style={{ padding: 12 }} />
    </div>
    <textarea placeholder="Kurzbiografie" value={draft.shortBio} onChange={e => setDraft({ ...draft, shortBio: e.target.value })} rows={4} style={{ width: '100%', padding: 12, marginTop: 10 }} />
    <textarea placeholder="Fachgebiete / Expertise" value={draft.expertise} onChange={e => setDraft({ ...draft, expertise: e.target.value })} rows={3} style={{ width: '100%', padding: 12, marginTop: 10 }} />
    <input placeholder="Website (optional)" value={draft.websiteUrl} onChange={e => setDraft({ ...draft, websiteUrl: e.target.value })} style={{ width: '100%', padding: 12, marginTop: 10 }} />
    <label style={{ display: 'block', marginTop: 14 }}><input type="checkbox" checked={draft.isPublic} onChange={e => setDraft({ ...draft, isPublic: e.target.checked })} /> Öffentlich im SSF-Autorenverzeichnis anzeigen</label>
    <button className="btn" type="button" disabled={busy || draft.publicName.trim().length < 2 || draft.slug.trim().length < 3} onClick={save} style={{ marginTop: 16 }}>{busy ? 'Wird gespeichert …' : 'Profil speichern'}</button>
    {message && <p style={{ color: 'var(--muted)' }}>{message}</p>}
  </section>;
}
