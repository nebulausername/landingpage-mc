import Link from 'next/link';
import { config } from '@/lib/config';

export default function NotFound() {
  return (
    <main className="min-h-screen grid place-items-center px-6 py-24">
      <div className="text-center max-w-md">
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-bark-muted mb-4">404 · Lost in the woods</p>
        <h1 className="font-display text-7xl sm:text-8xl font-medium leading-none tracking-tight mb-6">
          Page not <em className="italic text-moss-dark">found.</em>
        </h1>
        <p className="text-bark-soft mb-10 leading-relaxed">
          The page you were looking for has wandered off the path. Let's get you back home.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-bark text-cream-soft rounded-xl font-semibold hover:bg-moss-dark transition-colors"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M12 8H3M7 4L3 8l4 4"/>
          </svg>
          Back to {config.server.name}
        </Link>
      </div>
    </main>
  );
}
