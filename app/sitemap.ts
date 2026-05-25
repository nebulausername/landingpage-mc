import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  // When deploying, set NEXT_PUBLIC_SITE_URL in Vercel to your real domain.
  // Falls back to a placeholder; safe to leave as-is during initial deploy.
  const base = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com';
  const now = new Date();

  return [
    { url: base,            lastModified: now, priority: 1.0 },
    { url: `${base}/#worlds`,   lastModified: now, priority: 0.8 },
    { url: `${base}/#features`, lastModified: now, priority: 0.8 },
    { url: `${base}/#ranks`,    lastModified: now, priority: 0.7 },
    { url: `${base}/#faq`,      lastModified: now, priority: 0.6 },
  ];
}
