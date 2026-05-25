import type { SiteConfig } from './types';

/* ═══════════════════════════════════════════════════════════════════
   🌳 SERVER CONFIG  ·  Change these to make this template yours
   ═══════════════════════════════════════════════════════════════════
   This is THE file you edit to customize the server identity.
   Everything else (translations, components) usually doesn't need
   touching unless you want deeper changes.
   ═══════════════════════════════════════════════════════════════════ */

export const config: SiteConfig = {
  /* — Identity ———————————————————————————————————————————————————— */
  server: {
    name:      'Oakhaven',
    ip:        'play.oakhaven.gg',
    version:   '1.21.x',
    discord:   'https://discord.gg/oakhaven',
    store:     'https://store.oakhaven.gg',
    tagline:   'A handcrafted Minecraft survival world',
    // Optional: a mcsrvstat.us URL for live player counts.
    // Example: 'https://api.mcsrvstat.us/3/play.oakhaven.gg'
    // Set to null to disable live status and use fallback values.
    statusApi: null,
    // Optional: Discord server ID for the live widget. Enable the
    // widget in Discord → Server Settings → Widget. Set to null to hide.
    discordWidgetId: null,
  },

  /* — Site (SEO/OG) ——————————————————————————————————————————————— */
  siteUrl: 'https://oakhaven.gg',

  /* — Defaults ———————————————————————————————————————————————————— */
  defaultTheme: 'light',     // 'light' or 'dark'
  defaultLang:  'en',        // First language a visitor sees
  languages:    ['en', 'de', 'es'],  // Available languages (must have matching files in lib/translations)

  /* — Status fallback ——————————————————————————————————————————————
     Shown when statusApi is null or fails to respond. */
  fallback: { players: 142, maxPlayers: 250 },

  /* — Worlds  (game modes shown in the Worlds section) ———————————— */
  worlds: [
    { id: 'survival', featured: true },  // The featured world (large tile)
    { id: 'creative' },
    { id: 'hardcore' },
    { id: 'skyblock' },
    { id: 'arena' },
  ],

  /* — Ranks  (pricing tiers — text is in lib/translations) ———————— */
  ranks: [
    { id: 'wayfarer', price: '€4.99',  popular: false, buyUrl: 'https://store.oakhaven.gg/wayfarer', perks: 4 },
    { id: 'settler',  price: '€9.99',  popular: true,  buyUrl: 'https://store.oakhaven.gg/settler',  perks: 5 },
    { id: 'elder',    price: '€19.99', popular: false, buyUrl: 'https://store.oakhaven.gg/elder',    perks: 5 },
  ],

  /* — Testimonials  (Minecraft usernames -> avatars via mc-heads.net) ———— */
  testimonials: [
    { user: 'Wren_Hollow',     rating: 5, badge: 'veteran' },
    { user: 'BirchAndAsh',     rating: 5 },
    { user: 'Mira_Lumen',      rating: 5, badge: 'patron' },
    { user: 'TanglerootSam',   rating: 5, badge: 'staff' },
    { user: 'CinderfoxKai',    rating: 5 },
    { user: 'NoraQuartz',      rating: 5, badge: 'veteran' },
    { user: 'AshenTales',      rating: 4 },
    { user: 'PineHollowFinn',  rating: 5, badge: 'newcomer' },
  ],
  testimonialCount: 6,

  /* — Gallery  (replace src with your own screenshots in /public/gallery) ———— */
  gallery: [
    { src: '/gallery/spawn.jpg',    size: 'big' },
    { src: '/gallery/market.jpg' },
    { src: '/gallery/forge.jpg' },
    { src: '/gallery/skyblock.jpg', size: 'wide' },
    { src: '/gallery/festival.jpg' },
    { src: '/gallery/hardcore.jpg', size: 'tall' },
    { src: '/gallery/build1.jpg' },
    { src: '/gallery/sunset.jpg' },
  ],

  /* — Staff team  (text in translations under staff.[user]) ——————— */
  staff: [
    { user: 'Aldra_Oak',     role: 'owner'   },
    { user: 'Mossbeard',     role: 'admin'   },
    { user: 'WillowBramble', role: 'admin'   },
    { user: 'KirinSpark',    role: 'mod'     },
    { user: 'TanglerootSam', role: 'mod'     },
    { user: 'EmberCoil',     role: 'builder' },
    { user: 'NoxPineDev',    role: 'dev'     },
  ],
  staffCount: 6,

  /* — Vote sites (text in translations under vote.sites.[id]) ———— */
  voteSites: [
    { id: 'minecraft-server-list',     url: 'https://minecraft-server-list.com/server/000000/vote/' },
    { id: 'minecraftservers-org',      url: 'https://minecraftservers.org/vote/000000' },
    { id: 'topminecraftservers',       url: 'https://topminecraftservers.org/vote/000000' },
    { id: 'planetminecraft',           url: 'https://www.planetminecraft.com/server/oakhaven/vote/' },
    { id: 'minecraft-mp',              url: 'https://minecraft-mp.com/server/000000/vote/' },
  ],
  voteCount: 5,

  /* — Roadmap timeline (text in translations under roadmap.items.[when]) ———— */
  roadmap: [
    { when: 'q4-2025', status: 'done'  },
    { when: 'q1-2026', status: 'done'  },
    { when: 'q2-2026', status: 'now'   },
    { when: 'q3-2026', status: 'next'  },
    { when: 'q4-2026', status: 'later' },
  ],
  roadmapCount: 5,

  /* — Comparison table (translations under comparison.rows.[id]) ———— */
  comparison: [
    { id: 'pay-to-win',     us: false,           others: true  },
    { id: 'land-claims',    us: true,            others: 'partial' },
    { id: 'anti-cheat',     us: 'NoCheat+ pro',  others: 'basic' },
    { id: 'staff-hours',    us: '18h / day',     others: '4-8h' },
    { id: 'seasons',        us: '9 months',      others: 'rolling' },
    { id: 'cross-platform', us: true,            others: true  },
    { id: 'community-vote', us: true,            others: false },
  ],

  /* — FAQ ———————————————————————————————————————————————————————— */
  faqCount: 6,  // Edit Q&A text in lib/translations/[lang].ts

  /* — Newsletter / lead capture ————————————————————————————————————
     Set CONTACT_WEBHOOK_URL in .env.local (Discord webhook URL).
     Set this to false to hide the form altogether. */
  enableNewsletter: true,

  /* — Analytics  (privacy-first, no cookies) ————————————————————————
     Plausible: { provider: 'plausible', domain: 'oakhaven.gg', scriptUrl: 'https://plausible.io/js/script.js' }
     Umami:     { provider: 'umami', scriptUrl: 'https://cloud.umami.is/script.js', websiteId: 'xxxxx' }
     Disabled:  { provider: null } */
  analytics: {
    provider: null,
  },

  /* — Social links (used in footer) ————————————————————————————— */
  social: {
    discord: 'https://discord.gg/oakhaven',
    // twitter: 'https://twitter.com/oakhaven',
    // youtube: 'https://youtube.com/@oakhaven',
    // tiktok:  'https://tiktok.com/@oakhaven',
    // instagram: 'https://instagram.com/oakhaven',
  },
};
