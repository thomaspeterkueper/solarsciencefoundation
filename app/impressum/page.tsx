/**
 * SSF · Imprint (bare-path redirect) · 2026-07-13
 * The footer links here for English users (no /de prefix).
 * Legal texts exist in German only - redirects to the canonical page.
 */
import { redirect } from 'next/navigation';

export default function Page() {
  redirect('/de/impressum');
}
