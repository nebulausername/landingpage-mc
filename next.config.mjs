/** @type {import('next').NextConfig} */
const nextConfig = {
  /* Static export: uncomment to produce an `out/` folder you can drop on any
     static host (Hostinger, IONOS, Netlify, Cloudflare Pages, FTP).
     Vercel does NOT need this — leave it commented for SSR + edge runtime.
     ⚠️ With `output: 'export'`:
        · /api/contact (newsletter) won't work — needs a serverless function
        · /opengraph-image (dynamic OG) won't work — needs edge runtime
        · /admin save/upload won't work — needs Node runtime
     If you need any of these, deploy to Vercel (or another Node host). */
  // output: 'export',

  /* Required when using `output: 'export'`. Harmless on Vercel since we
     don't pass remote URLs to next/image — we use plain <img> for
     mc-heads.net avatars and Discord widget assets. */
  images: { unoptimized: true },

  /* Strict mode catches potential bugs in development */
  reactStrictMode: true,

  /* Don't leak which framework powers the site (small but professional) */
  poweredByHeader: false,

  /* Security headers — applied on every request.
     · X-Frame-Options is SAMEORIGIN so the /admin live preview can iframe /.
       (If you don't use the admin preview, you can switch back to DENY for
       a tiny extra hardening.) */
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options',        value: 'SAMEORIGIN' },
          { key: 'Referrer-Policy',        value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy',     value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()' },
          { key: 'X-DNS-Prefetch-Control', value: 'on' },
        ],
      },
      {
        /* Belt-and-suspenders for the admin: never index, never frame
           from third parties, never share referrer. */
        source: '/admin/:path*',
        headers: [
          { key: 'X-Robots-Tag',  value: 'noindex, nofollow' },
          { key: 'Cache-Control', value: 'no-store' },
        ],
      },
      {
        source: '/api/admin/:path*',
        headers: [
          { key: 'X-Robots-Tag',  value: 'noindex, nofollow' },
          { key: 'Cache-Control', value: 'no-store' },
        ],
      },
    ];
  },
};

export default nextConfig;
