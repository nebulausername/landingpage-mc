import Script from 'next/script';
import { config } from '@/lib/config';

/* Privacy-friendly analytics loader.
   Configure in lib/config.ts under `analytics`.
   - Plausible:  no cookies, no PII, GDPR-friendly by default.
   - Umami:      same. Self-host or cloud.
   - null:       renders nothing. */
export default function Analytics() {
  const a = config.analytics;
  if (!a.provider) return null;

  if (a.provider === 'plausible' && a.scriptUrl && a.domain) {
    return (
      <Script
        defer
        data-domain={a.domain}
        src={a.scriptUrl}
        strategy="afterInteractive"
      />
    );
  }
  if (a.provider === 'umami' && a.scriptUrl && a.websiteId) {
    return (
      <Script
        defer
        data-website-id={a.websiteId}
        src={a.scriptUrl}
        strategy="afterInteractive"
      />
    );
  }
  return null;
}
