/** @type {import('next').NextConfig} */
const nextConfig = {
  /* Static export: uncomment this to produce an "out" folder you can host anywhere
     (Hostinger, IONOS, Netlify, Cloudflare Pages, even bare FTP).
     Leave commented when deploying to Vercel — Vercel works better with SSR. */
  // output: 'export',

  /* Required when using `output: 'export'` */
  images: { unoptimized: true },

  /* Strict mode catches potential bugs in development */
  reactStrictMode: true,

  /* Don't leak which framework powers the site (small but professional) */
  poweredByHeader: false,

  /* Security headers — applied on every request */
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options',        value: 'DENY' },
          { key: 'Referrer-Policy',        value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy',     value: 'camera=(), microphone=(), geolocation=()' },
        ],
      },
    ];
  },
};

export default nextConfig;
