'use client';

import { useEffect } from 'react';

/**
 * Meldet die Inhaltshöhe an die einbettende Seite (NOXIA), damit der Rahmen
 * genau so hoch wird wie das Experiment und keine eigene Scrollleiste braucht.
 */
export default function EmbedHeightReporter({ id }: { id: string }) {
  useEffect(() => {
    if (window.parent === window) return;
    const send = () => {
      const height = Math.ceil(document.documentElement.scrollHeight);
      window.parent.postMessage({ type: 'ssf-embed-height', id, height }, '*');
    };
    send();
    const observer = new ResizeObserver(send);
    observer.observe(document.body);
    window.addEventListener('load', send);
    return () => {
      observer.disconnect();
      window.removeEventListener('load', send);
    };
  }, [id]);
  return null;
}
