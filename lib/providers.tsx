'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import type { Lang, Theme } from './types';
import { translations } from './translations';
import { config } from './config';

/* ═══════════════════════════════════════════════════════════════════
   THEME CONTEXT  ·  light/dark with localStorage + system preference
   ═══════════════════════════════════════════════════════════════════ */
interface ThemeCtx {
  theme: Theme;
  setTheme: (t: Theme) => void;
  toggleTheme: () => void;
}
const ThemeContext = createContext<ThemeCtx | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(config.defaultTheme);

  useEffect(() => {
    // Bootstrap script already set data-theme on <html>; sync React state to match
    const current = (document.documentElement.dataset.theme as Theme) || config.defaultTheme;
    setThemeState(current);
  }, []);

  function applyTheme(t: Theme) {
    document.documentElement.dataset.theme = t;
    setThemeState(t);
  }
  function setTheme(t: Theme) {
    applyTheme(t);
    localStorage.setItem('lmc-theme', t);
  }
  function toggleTheme() {
    setTheme(theme === 'light' ? 'dark' : 'light');
  }

  return <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>{children}</ThemeContext.Provider>;
}
export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
}

/* ═══════════════════════════════════════════════════════════════════
   LANGUAGE CONTEXT  ·  EN/DE/ES via localStorage
   ═══════════════════════════════════════════════════════════════════ */
interface LangCtx {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: typeof translations[Lang];
}
const LangContext = createContext<LangCtx | null>(null);

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(config.defaultLang);

  useEffect(() => {
    const saved = localStorage.getItem('lmc-lang') as Lang | null;
    if (saved && config.languages.includes(saved)) applyLang(saved);
    else {
      // Detect browser language
      const browser = (navigator.language || 'en').slice(0, 2) as Lang;
      if (config.languages.includes(browser)) applyLang(browser);
    }
  }, []);

  function applyLang(l: Lang) {
    document.documentElement.lang = l;
    setLangState(l);
  }
  function setLang(l: Lang) {
    applyLang(l);
    localStorage.setItem('lmc-lang', l);
  }

  return (
    <LangContext.Provider value={{ lang, setLang, t: translations[lang] }}>
      {children}
    </LangContext.Provider>
  );
}
export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error('useLang must be used within LangProvider');
  return ctx;
}
