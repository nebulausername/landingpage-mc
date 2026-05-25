'use client';

import { useEffect, useState } from 'react';
import { useTheme, useLang } from '@/lib/providers';
import { config } from '@/lib/config';
import type { Lang } from '@/lib/types';

export default function Nav() {
  const { theme, toggleTheme } = useTheme();
  const { lang, setLang, t } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler, { passive: true });
    handler();
    return () => window.removeEventListener('scroll', handler);
  }, []);

  function copyIP() {
    navigator.clipboard?.writeText(config.server.ip);
    const el = document.getElementById('nav-ip');
    if (el) {
      el.classList.add('ring-2', 'ring-moss');
      setTimeout(() => el.classList.remove('ring-2', 'ring-moss'), 800);
    }
  }

  // Anchor links, in mobile order. Desktop shows the first 5.
  const links: Array<{ key: keyof typeof t.nav | string; href: string }> = [
    { key: 'worlds',  href: '#worlds'   },
    { key: 'realm',   href: '#features' },
    { key: 'gallery', href: '#gallery'  },
    { key: 'ranks',   href: '#ranks'    },
    { key: 'roadmap', href: '#roadmap'  },
    { key: 'staff',   href: '#staff'    },
    { key: 'vote',    href: '#vote'     },
    { key: 'faq',     href: '#faq'      },
  ];

  return (
    <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${scrolled ? 'bg-cream/90 backdrop-blur-md border-b border-paper-edge' : 'bg-transparent'}`}>
      <div className="max-w-wrap mx-auto px-4 sm:px-6 h-16 flex items-center gap-4">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2.5 font-display text-xl tracking-tight">
          <Logo />
          <span className="font-medium">{config.server.name}</span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-0.5 ml-6 text-sm">
          {links.slice(0, 5).map(l => (
            <a key={l.key} href={l.href} className="px-3 py-2 hover:text-moss-dark transition-colors">
              {(t.nav as any)[l.key]}
            </a>
          ))}
        </nav>

        <div className="flex-1" />

        {/* IP copy (desktop) */}
        <button
          id="nav-ip"
          onClick={copyIP}
          className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-cream-soft border border-paper-edge rounded-lg font-mono text-xs hover:bg-paper transition-colors"
          title={t.hero.copy}
        >
          <span className="text-bark-muted">IP</span>
          <span>{config.server.ip}</span>
          <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6"><rect x="4" y="4" width="9" height="9" rx="1"/><path d="M3 3h8v1H4v7H3z"/></svg>
        </button>

        {/* Theme toggle */}
        <button
          onClick={toggleTheme}
          aria-label="Toggle theme"
          className="w-9 h-9 grid place-items-center rounded-lg hover:bg-paper transition-colors"
        >
          {theme === 'light' ? <MoonIcon/> : <SunIcon/>}
        </button>

        {/* Language */}
        <div className="relative">
          <select
            value={lang}
            onChange={e => setLang(e.target.value as Lang)}
            className="appearance-none bg-cream-soft border border-paper-edge rounded-lg px-3 py-1.5 pr-7 text-xs font-mono uppercase hover:bg-paper transition-colors cursor-pointer"
            aria-label="Language"
          >
            {config.languages.map(l => <option key={l} value={l}>{l}</option>)}
          </select>
          <svg className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" width="10" height="10" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 5l3 3 3-3"/></svg>
        </div>

        {/* Mobile menu trigger */}
        <button
          onClick={() => setOpen(true)}
          aria-label="Open menu"
          className="lg:hidden w-9 h-9 grid place-items-center rounded-lg hover:bg-paper transition-colors"
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M3 5h12M3 9h12M3 13h12"/></svg>
        </button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="fixed inset-0 z-50 bg-cream lg:hidden animate-fade-in overflow-y-auto">
          <div className="max-w-wrap mx-auto px-6 h-16 flex items-center">
            <a href="#" className="flex items-center gap-2.5 font-display text-xl">
              <Logo />
              <span className="font-medium">{config.server.name}</span>
            </a>
            <div className="flex-1" />
            <button onClick={() => setOpen(false)} aria-label="Close menu" className="w-9 h-9 grid place-items-center rounded-lg hover:bg-paper">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M4 4l10 10M14 4L4 14"/></svg>
            </button>
          </div>
          <nav className="px-6 py-4 flex flex-col gap-1 font-display text-2xl">
            {links.map(l => (
              <a key={l.key} href={l.href} onClick={() => setOpen(false)} className="py-2 hover:text-moss-dark">
                {(t.nav as any)[l.key]}
              </a>
            ))}
          </nav>
          <div className="px-6 mt-4">
            <button onClick={copyIP} className="w-full flex items-center justify-between gap-2 px-4 py-3 bg-cream-soft border border-paper-edge rounded-lg font-mono">
              <span>{config.server.ip}</span>
              <span className="text-xs text-bark-muted">tap to copy</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

function Logo() {
  return (
    <svg viewBox="0 0 40 40" width="28" height="28" aria-hidden>
      <path d="M20 4 L36 13 L20 22 L4 13 Z" fill="rgb(var(--c-moss))"/>
      <path d="M4 13 L20 22 L20 36 L4 27 Z" fill="rgb(var(--c-amber))" opacity="0.85"/>
      <path d="M36 13 L20 22 L20 36 L36 27 Z" fill="rgb(var(--c-bark-soft))"/>
      <path d="M20 4 L36 13 L20 22 L4 13 Z M4 13 L20 22 L20 36 L4 27 Z M36 13 L20 22 L20 36 L36 27 Z"
            stroke="rgb(var(--c-bark))" strokeWidth=".8" strokeLinejoin="round" fill="none"/>
    </svg>
  );
}

function MoonIcon() {
  return <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M12.5 9.5a5 5 0 1 1-6-6 4 4 0 0 0 6 6Z"/></svg>;
}
function SunIcon() {
  return <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6"><circle cx="8" cy="8" r="3"/><path d="M8 1v2M8 13v2M1 8h2M13 8h2M3 3l1.5 1.5M11.5 11.5L13 13M3 13l1.5-1.5M11.5 4.5L13 3"/></svg>;
}
