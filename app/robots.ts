import type { MetadataRoute } from 'next';
import { config } from '@/lib/config';

export default function robots(): MetadataRoute.Robots {
  const base = process.env.NEXT_PUBLIC_SITE_URL || config.siteUrl || 'https://example.com';
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin', '/api/'],
    },
    sitemap: `${base}/sitemap.xml`,
  };
}
