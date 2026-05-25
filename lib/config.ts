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
    // Optional: a mcsrvstat.us URL for live player counts.
    // Example: 'https://api.mcsrvstat.us/3/play.oakhaven.gg'
    // Set to null to disable live status and use fallback values.
    statusApi: null,
  },

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

  /* — FAQ ———————————————————————————————————————————————————————— */
  faqCount: 5,  // Edit Q&A text in lib/translations/[lang].ts

  /* — Social links (used in footer) ————————————————————————————— */
  social: {
    discord: 'https://discord.gg/oakhaven',
    // twitter: 'https://twitter.com/oakhaven',
    // youtube: 'https://youtube.com/@oakhaven',
  },
};
