/**
 * SSF · Privacy Policy (EN redirect) · 2026-07-10
 * Redirects to DE version — legal texts are in German only.
 */
import { redirect } from 'next/navigation';

export default function Page() {
  redirect('/de/datenschutz');
}
