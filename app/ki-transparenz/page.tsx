/**
 * SSF · KI-Transparenz (bare-path redirect) · 2026-08-21
 * The footer links here for English users (no /de prefix).
 * The transparency policy exists in German only - redirects to the canonical page.
 */
import { redirect } from 'next/navigation';

export default function Page() {
  redirect('/de/ki-transparenz');
}
