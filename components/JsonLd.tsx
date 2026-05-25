import { config } from '@/lib/config';
import en from '@/lib/translations/en';

/* Server component — emits JSON-LD structured data for richer SERP.
   - Organization: brand graph
   - WebSite: sitelinks search box hint
   - VideoGame: positions the server as a playable product
   - FAQPage: lets Google show FAQ in search results
   - Product (per rank): pricing markup */
export default function JsonLd() {
  const { server, siteUrl, social, ranks, faqCount } = config;

  const organization = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: server.name,
    url: siteUrl,
    logo: `${siteUrl}/icon.svg`,
    sameAs: Object.values(social).filter(Boolean),
  };

  const website = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: server.name,
    url: siteUrl,
  };

  const game = {
    '@context': 'https://schema.org',
    '@type': 'VideoGame',
    name: `${server.name} Minecraft Server`,
    description: server.tagline ?? 'A handcrafted Minecraft survival world.',
    url: siteUrl,
    gamePlatform: ['Java Edition', 'Bedrock Edition'],
    applicationCategory: 'GameServer',
    operatingSystem: 'Cross-platform',
  };

  const faq = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: Array.from({ length: faqCount }).map((_, i) => {
      const q = (en.faq as any)[`q${i + 1}`];
      const a = (en.faq as any)[`a${i + 1}`];
      if (!q || !a) return null;
      return {
        '@type': 'Question',
        name: q,
        acceptedAnswer: { '@type': 'Answer', text: a },
      };
    }).filter(Boolean),
  };

  const products = ranks.map(r => {
    const data = (en.ranks as any)[r.id];
    if (!data) return null;
    const [_, amount] = r.price.match(/([\d.]+)/) ?? [];
    return {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: `${data.name} rank · ${server.name}`,
      description: data.desc,
      brand: { '@type': 'Brand', name: server.name },
      offers: {
        '@type': 'Offer',
        price: amount ?? r.price,
        priceCurrency: 'EUR',
        availability: 'https://schema.org/InStock',
        url: r.buyUrl,
      },
    };
  }).filter(Boolean);

  const all = [organization, website, game, faq, ...products];

  return (
    <script
      type="application/ld+json"
      // Inline JSON-LD — safe; data is not user-controlled
      dangerouslySetInnerHTML={{ __html: JSON.stringify(all) }}
    />
  );
}
