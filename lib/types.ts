export type Lang = 'en' | 'de' | 'es';
export type Theme = 'light' | 'dark';

export interface ServerConfig {
  name: string;
  ip: string;
  version: string;
  discord: string;
  store: string;
  statusApi: string | null;
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

export interface SiteConfig {
  server: ServerConfig;
  defaultTheme: Theme;
  defaultLang: Lang;
  languages: Lang[];
  fallback: { players: number; maxPlayers: number };
  worlds: WorldEntry[];
  ranks: RankEntry[];
  faqCount: number;
  social: {
    discord: string;
    twitter?: string;
    youtube?: string;
  };
}

export interface ServerStatus {
  online: boolean;
  players: number;
  maxPlayers: number;
  version: string;
}

/* Translation tree — kept loose to allow per-language tweaks */
export type Translations = {
  nav:      Record<string, string>;
  hero:     Record<string, string>;
  stats:    Record<string, string>;
  worlds:   Record<string, any>;
  features: Record<string, any>;
  ranks:    Record<string, any>;
  faq:      Record<string, string>;
  cta:      Record<string, string>;
  footer:   Record<string, string>;
};
