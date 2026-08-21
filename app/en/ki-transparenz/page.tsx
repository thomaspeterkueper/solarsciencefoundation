/**
 * SSF · KI-Transparenz (EN redirect) · 2026-08-21
 * Redirects to DE version — the transparency policy is in German only.
 */
import { redirect } from 'next/navigation';

export default function Page() {
  redirect('/de/ki-transparenz');
}
