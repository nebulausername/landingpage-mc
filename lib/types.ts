/* To add a new language: add the ISO code here, then create
   lib/translations/<code>.ts (copy from en.ts) and register it in
   lib/translations/index.ts. The Nav language switcher picks it up
   automatically via config.languages. */
export type Lang = 'en' | 'de' | 'es';
export type Theme = 'light' | 'dark';

export interface ServerConfig {
  name: string;
  ip: string;
  version: string;
  discord: string;
  store: string;
  statusApi: string | null;
  /** Optional Discord server widget ID for the live widget. Leave null to hide. */
  discordWidgetId?: string | null;
  /** Vanity tagline shown in OG image / structured data. */
  tagline?: string;
}

export interface WorldEntry {
  id: 'survival' | 'creative' | 'hardcore' | 'skyblock' | 'arena';
  featured?: boolean;
}

export interface RankEntry {
  id: 'wayfarer' | 'settler' | 'elder';
  price: string;
  popular?: boolean;
  buyUrl: string;
  perks: number;
}

export interface TestimonialEntry {
  /** Minecraft username — used to fetch avatar from mc-heads.net */
  user: string;
  rating: 1 | 2 | 3 | 4 | 5;
  /** Optional accent: 'staff', 'veteran', 'patron' — shown as a small chip */
  badge?: 'veteran' | 'staff' | 'patron' | 'newcomer';
}

export interface GalleryEntry {
  /** Local image under /public or remote URL */
  src: string;
  /** Spans extra columns/rows in the grid (e.g. 'wide', 'tall', 'big') */
  size?: 'wide' | 'tall' | 'big';
}

export interface StaffEntry {
  user: string;
  role: 'owner' | 'admin' | 'mod' | 'builder' | 'dev';
}

export interface VoteSiteEntry {
  /** Vote site ID — translations provide name + reward text */
  id: string;
  url: string;
}

export interface RoadmapEntry {
  /** Quarter label e.g. 'Q1 2026' */
  when: string;
  status: 'done' | 'now' | 'next' | 'later';
}

export interface ComparisonRow {
  /** Translation key under comparison.rows */
  id: string;
  /** Tri-state per column: true = yes, false = no, string = custom value */
  us: boolean | string;
  others: boolean | string;
}

export interface SiteConfig {
  server: ServerConfig;
  defaultTheme: Theme;
  defaultLang: Lang;
  languages: Lang[];
  fallback: { players: number; maxPlayers: number };
  worlds: WorldEntry[];
  ranks: RankEntry[];
  testimonials: TestimonialEntry[];
  gallery: GalleryEntry[];
  staff: StaffEntry[];
  voteSites: VoteSiteEntry[];
  roadmap: RoadmapEntry[];
  comparison: ComparisonRow[];
  faqCount: number;
  /** Number of items to render from each translated list. */
  testimonialCount: number;
  staffCount: number;
  roadmapCount: number;
  voteCount: number;
  social: {
    discord: string;
    twitter?: string;
    youtube?: string;
    tiktok?: string;
    instagram?: string;
  };
  /** Lead-capture: Discord webhook URL is read from env (CONTACT_WEBHOOK_URL). Set this to false to hide the form entirely. */
  enableNewsletter: boolean;
  /** Privacy-friendly analytics: 'plausible', 'umami', or null */
  analytics: {
    provider: 'plausible' | 'umami' | null;
    domain?: string;
    scriptUrl?: string;
    websiteId?: string;
  };
  /** SEO: canonical site URL — used for OG, JSON-LD, sitemap */
  siteUrl: string;
}

export interface ServerStatus {
  online: boolean;
  players: number;
  maxPlayers: number;
  version: string;
}

/* Translation tree — kept loose to allow per-language tweaks */
export type Translations = {
  nav:          Record<string, string>;
  hero:         Record<string, string>;
  stats:        Record<string, string>;
  worlds:       Record<string, any>;
  features:     Record<string, any>;
  ranks:        Record<string, any>;
  testimonials: Record<string, any>;
  gallery:      Record<string, any>;
  staff:        Record<string, any>;
  vote:         Record<string, any>;
  roadmap:      Record<string, any>;
  discord:      Record<string, any>;
  comparison:   Record<string, any>;
  newsletter:   Record<string, any>;
  faq:          Record<string, string>;
  cta:          Record<string, string>;
  footer:       Record<string, string>;
};
