import type { Metadata, Viewport } from 'next';
import { Fraunces, Manrope, JetBrains_Mono } from 'next/font/google';
import { ThemeProvider, LangProvider } from '@/lib/providers';
import Analytics from '@/components/Analytics';
import { config } from '@/lib/config';
import './globals.css';

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  display: 'swap',
});
const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
  display: 'swap',
});
const jbMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jb-mono',
  display: 'swap',
});

const tagline = config.server.tagline ?? 'A handcrafted Minecraft survival world';
const description = `${tagline} — slow-burn economy, claimable lands, weekly festivals, cross-platform Java + Bedrock. IP: ${config.server.ip}`;

export const metadata: Metadata = {
  metadataBase: new URL(config.siteUrl),
  title: {
    default: `${config.server.name} · Minecraft Survival Server`,
    template: `%s · ${config.server.name}`,
  },
  description,
  keywords: [
    'Minecraft', 'Minecraft server', 'survival server', 'SMP',
    'Java Edition', 'Bedrock Edition', 'crossplay',
    config.server.name, 'Minecraft community', 'no pay-to-win',
  ],
  alternates: {
    canonical: '/',
    languages: Object.fromEntries(config.languages.map(l => [l, `/?lang=${l}`])),
  },
  openGraph: {
    title: `${config.server.name} · Minecraft Server`,
    description,
    type: 'website',
    locale: config.defaultLang,
    url: config.siteUrl,
    siteName: config.server.name,
  },
  twitter: {
    card: 'summary_large_image',
    title: `${config.server.name} · Minecraft Server`,
    description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  authors: [{ name: config.server.name }],
  category: 'Gaming',
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#F2EAD3' },
    { media: '(prefers-color-scheme: dark)',  color: '#14110A' },
  ],
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  /* Inline script runs before React hydration to prevent theme flash on load.
     Reads localStorage / system preference, sets data-theme on <html>. */
  const themeBootstrap = `
    (function() {
      try {
        var saved = localStorage.getItem('lmc-theme');
        var system = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        var theme = saved || (${JSON.stringify(config.defaultTheme)} === 'dark' ? 'dark' : system);
        document.documentElement.dataset.theme = theme;
      } catch (e) {
        document.documentElement.dataset.theme = ${JSON.stringify(config.defaultTheme)};
      }
    })();
  `;

  return (
    <html lang={config.defaultLang} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeBootstrap }} />
        <Analytics />
      </head>
      <body className={`${fraunces.variable} ${manrope.variable} ${jbMono.variable} font-sans`}>
        <a href="#main" className="skip-link">Skip to content</a>
        <ThemeProvider>
          <LangProvider>
            {children}
          </LangProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
