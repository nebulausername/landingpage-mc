'use client';

import { useState } from 'react';
import { useLang } from '@/lib/providers';
import { useServerStatus } from '@/lib/hooks';
import { config } from '@/lib/config';

export default function Hero() {
  const { t } = useLang();
  const status = useServerStatus();
  const [copied, setCopied] = useState(false);

  function copyIP() {
    navigator.clipboard?.writeText(config.server.ip);
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  }

  return (
    <section className="relative min-h-[100vh] pt-24 pb-16 overflow-hidden">
      {/* Parallax SVG scene */}
      <div className="absolute inset-0 -z-10 overflow-hidden bg-grain">
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" aria-hidden>
          <defs>
            <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0"   stopColor="rgb(var(--c-cream-soft))"/>
              <stop offset=".55" stopColor="rgb(var(--c-paper))"/>
              <stop offset="1"   stopColor="rgb(var(--c-amber))" stopOpacity=".35"/>
            </linearGradient>
            <radialGradient id="sun" cx=".5" cy=".5" r=".5">
              <stop offset="0"  stopColor="rgb(var(--c-amber-bright))" stopOpacity=".7"/>
              <stop offset="1"  stopColor="rgb(var(--c-amber-bright))" stopOpacity="0"/>
            </radialGradient>
          </defs>
          <rect width="1600" height="900" fill="url(#sky)"/>
          {/* Sun glow */}
          <circle cx="1150" cy="380" r="260" fill="url(#sun)"/>
          <circle cx="1150" cy="380" r="65" fill="rgb(var(--c-amber-bright))" opacity=".55"/>
          {/* Far hills */}
          <path d="M0 620 L120 580 L280 605 L460 555 L640 590 L820 545 L1000 580 L1180 535 L1360 575 L1500 555 L1600 580 L1600 900 L0 900 Z"
                fill="rgb(var(--c-bark-soft))" opacity=".35"/>
          {/* Mid hills */}
          <path d="M0 720 L160 685 L340 700 L520 660 L700 690 L880 650 L1060 680 L1240 640 L1420 675 L1600 660 L1600 900 L0 900 Z"
                fill="rgb(var(--c-bark-soft))" opacity=".55"/>
          {/* Tree silhouettes */}
          <g fill="rgb(var(--c-bark))" opacity=".75">
            <path d="M180 720 L195 660 L210 720 Z M195 720 v 25 h -3 v -25"/>
            <path d="M420 720 L440 640 L460 720 Z M440 720 v 30 h -3 v -30"/>
            <path d="M780 720 L800 650 L820 720 Z M800 720 v 30 h -3 v -30"/>
            <path d="M1240 720 L1258 660 L1276 720 Z M1258 720 v 25 h -3 v -25"/>
          </g>
          {/* Foreground */}
          <path d="M0 820 L1600 820 L1600 900 L0 900 Z" fill="rgb(var(--c-bark))" opacity=".82"/>
        </svg>
        {/* Fireflies */}
        {[...Array(8)].map((_, i) => (
          <span
            key={i}
            className="absolute w-1 h-1 rounded-full bg-amber-bright animate-sparkle"
            style={{
              top:    `${20 + (i * 53) % 60}%`,
              left:   `${10 + (i * 73) % 80}%`,
              animationDelay: `${i * 0.6}s`,
              boxShadow: '0 0 8px rgb(var(--c-amber-bright))',
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="max-w-wrap mx-auto px-4 sm:px-6 relative">
        <div className="max-w-3xl pt-16 lg:pt-24 animate-slide-up">
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-bark-muted mb-5">{t.hero.eyebrow}</p>
          <h1 className="font-display text-5xl sm:text-7xl lg:text-8xl leading-[.95] tracking-tight font-medium mb-6">
            {t.hero.title_a}<br/>
            <em className="italic font-medium text-moss-dark">{t.hero.title_b}</em>
          </h1>
          <p className="text-lg sm:text-xl text-bark-soft max-w-xl leading-relaxed">{t.hero.lede}</p>
        </div>

        {/* IP card + Discord CTA */}
        <div className="mt-10 flex flex-wrap items-end gap-4 max-w-2xl">
          <div className="flex-1 min-w-[280px] bg-cream-soft/95 backdrop-blur border border-paper-edge rounded-2xl p-5 shadow-lg">
            <p className="font-mono text-xs uppercase tracking-[0.16em] text-bark-muted mb-2">{t.hero.ip_label}</p>
            <div className="flex items-center gap-3">
              <code className="font-mono text-xl sm:text-2xl text-bark flex-1 truncate">{config.server.ip}</code>
              <button
                onClick={copyIP}
                className="px-4 py-2 bg-bark text-cream-soft rounded-lg text-sm font-semibold hover:bg-moss-dark transition-colors whitespace-nowrap"
              >
                {copied ? t.hero.copied : t.hero.copy}
              </button>
            </div>
            <p className="text-xs text-bark-muted mt-3 font-mono">
              {config.server.version} · Java + Bedrock
            </p>
          </div>

          <a
            href={config.server.discord}
            target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-3 border-2 border-bark rounded-2xl font-semibold hover:bg-bark hover:text-cream-soft transition-colors"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M19.27 5.33A19.43 19.43 0 0 0 15.18 4l-.4.84a17.9 17.9 0 0 0-5.56 0L8.82 4A19.43 19.43 0 0 0 4.73 5.33C2.62 8.46 2 11.5 2.32 14.5a19.79 19.79 0 0 0 5.78 2.94l.6-.93a12.34 12.34 0 0 1-2.32-1.13c.19-.14.38-.28.56-.43a14.05 14.05 0 0 0 12.12 0c.18.15.37.29.56.43-.74.45-1.52.83-2.32 1.13l.6.93a19.79 19.79 0 0 0 5.78-2.94c.39-3.5-.4-6.5-2.41-9.17ZM8.52 13.5c-.83 0-1.5-.77-1.5-1.71 0-.94.67-1.71 1.5-1.71.83 0 1.5.77 1.5 1.71 0 .94-.67 1.71-1.5 1.71Zm6.96 0c-.83 0-1.5-.77-1.5-1.71 0-.94.67-1.71 1.5-1.71.83 0 1.5.77 1.5 1.71 0 .94-.67 1.71-1.5 1.71Z"/></svg>
            {t.hero.cta_discord}
          </a>

          {/* Live online badge */}
          <div className="basis-full flex items-center gap-2 text-sm text-bark-soft mt-1">
            <span className="relative flex w-2 h-2">
              <span className="absolute inset-0 rounded-full bg-moss-dark animate-pulse-slow"/>
              <span className="relative rounded-full w-2 h-2 bg-moss"/>
            </span>
            <span className="font-mono tabular">{status.players}</span>
            <span>{t.hero.online_suffix}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
