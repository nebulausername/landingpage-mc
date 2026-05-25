'use client';

import { useEffect } from 'react';

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    // Log to console in dev, swap with your error service in production
    console.error('Page error:', error);
  }, [error]);

  return (
    <main className="min-h-screen flex items-center justify-center px-6 bg-cream">
      <div className="text-center max-w-md">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-bark-muted mb-4">Something broke</p>
        <h1 className="font-display text-5xl sm:text-6xl font-medium leading-[1.05] tracking-tight mb-6">
          A branch<br/><em className="italic text-rust">snapped.</em>
        </h1>
        <p className="text-bark-soft mb-10">Don't worry — try once more, or head back to the village.</p>
        <div className="flex flex-wrap gap-3 justify-center">
          <button
            onClick={reset}
            className="inline-flex items-center gap-2 px-6 py-3 bg-bark text-cream-soft rounded-xl font-semibold hover:bg-moss-dark transition-colors"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 border-2 border-bark rounded-xl font-semibold hover:bg-bark hover:text-cream-soft transition-colors"
          >
            Back home
          </a>
        </div>
      </div>
    </main>
  );
}
