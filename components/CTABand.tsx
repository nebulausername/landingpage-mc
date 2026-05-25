'use client';

import { useState } from 'react';
import { useLang } from '@/lib/providers';
import { config } from '@/lib/config';

export default function CTABand() {
  const { t } = useLang();
  const [copied, setCopied] = useState(false);

  function copyIP() {
    navigator.clipboard?.writeText(config.server.ip);
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  }

  return (
    <section className="bg-bark text-cream-soft py-20 sm:py-28 relative overflow-hidden">
      {/* Subtle animated glow */}
      <div
        className="absolute inset-0 opacity-40 animate-drift pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 30% 50%, rgb(var(--c-amber)) 0%, transparent 50%)',
        }}
      />

      <div className="max-w-wrap mx-auto px-4 sm:px-6 relative text-center">
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-amber mb-4">{t.cta.eyebrow}</p>
        <h2 className="font-display text-5xl sm:text-7xl font-medium leading-[1.05] tracking-tight mb-10">
          {t.cta.title_a}<br/>
          <em className="italic">{t.cta.title_b}</em>
        </h2>
        <div className="inline-flex flex-wrap items-center justify-center gap-3 bg-cream-soft/10 backdrop-blur px-2 py-2 rounded-2xl border border-cream-soft/15">
          <code className="font-mono text-lg sm:text-xl px-4">{config.server.ip}</code>
          <button
            onClick={copyIP}
            className="px-5 py-2.5 bg-cream-soft text-bark rounded-xl text-sm font-semibold hover:bg-amber-bright transition-colors"
          >
            {copied ? t.hero.copied : t.hero.copy}
          </button>
        </div>
      </div>
    </section>
  );
}
