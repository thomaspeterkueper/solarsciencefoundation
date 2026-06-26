import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Solar Science Foundation',
  description: 'Learning platform between the KUEPER Knowledge Graph and NOXIA.'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
