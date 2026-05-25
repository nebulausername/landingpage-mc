'use client';

import { useEffect, useState } from 'react';
import { useLang } from '@/lib/providers';
import { config } from '@/lib/config';

function captionKey(src: string): string {
  const base = src.split('/').pop() ?? '';
  return base.replace(/\.(jpg|jpeg|png|webp|avif)$/i, '');
}

export default function Gallery() {
  const { t } = useLang();
  const g = t.gallery as any;
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  useEffect(() => {
    if (openIdx === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpenIdx(null);
      if (e.key === 'ArrowRight') setOpenIdx(i => (i === null ? null : (i + 1) % config.gallery.length));
      if (e.key === 'ArrowLeft')  setOpenIdx(i => (i === null ? null : (i - 1 + config.gallery.length) % config.gallery.length));
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [openIdx]);

  return (
    <section id="gallery" className="py-24 sm:py-32">
      <div className="max-w-wrap mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-bark-muted mb-3">{g.eyebrow}</p>
            <h2 className="font-display text-5xl sm:text-6xl font-medium leading-[1.05] tracking-tight">
              {g.title_a} <em className="italic text-moss-dark">{g.title_b}</em>
            </h2>
          </div>
          <p className="text-lg text-bark-soft max-w-md lg:mt-12">{g.aside}</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[180px] gap-3 sm:gap-4">
          {config.gallery.map((item, i) => {
            const key = captionKey(item.src);
            const caption = g.captions?.[key] ?? '';
            const span = item.size === 'big'  ? 'col-span-2 row-span-2'
                       : item.size === 'wide' ? 'col-span-2'
                       : item.size === 'tall' ? 'row-span-2'
                       : '';
            return (
              <button
                key={i}
                onClick={() => setOpenIdx(i)}
                className={`group relative overflow-hidden rounded-2xl bg-paper border border-paper-edge ${span} focus-visible:ring-2 focus-visible:ring-moss`}
                aria-label={caption || g.view}
              >
                {/* Fallback gradient while image loads or if missing */}
                <div
                  aria-hidden
                  className="absolute inset-0"
                  style={{
                    background:
                      `linear-gradient(135deg, rgb(var(--c-paper)) 0%, rgb(var(--c-paper-edge)) 50%, rgb(var(--c-bark-muted) / 0.3) 100%)`,
                  }}
                />
                <img
                  src={item.src}
                  alt={caption}
                  loading="lazy"
                  className="relative w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  onError={(e) => { (e.currentTarget as HTMLImageElement).style.visibility = 'hidden'; }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-bark/70 via-bark/0 to-bark/0 opacity-0 group-hover:opacity-100 transition-opacity"/>
                {caption && (
                  <div className="absolute bottom-3 left-4 right-4 text-cream-soft text-sm font-mono opacity-0 group-hover:opacity-100 transition-opacity translate-y-1 group-hover:translate-y-0 duration-300">
                    {caption}
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Lightbox */}
      {openIdx !== null && (() => {
        const item = config.gallery[openIdx];
        const key = captionKey(item.src);
        const caption = g.captions?.[key] ?? '';
        return (
          <div
            role="dialog"
            aria-modal="true"
            className="fixed inset-0 z-[60] bg-bark/95 backdrop-blur grid place-items-center p-4 animate-fade-in"
            onClick={() => setOpenIdx(null)}
          >
            <button
              type="button"
              aria-label="Close"
              onClick={() => setOpenIdx(null)}
              className="absolute top-4 right-4 w-10 h-10 grid place-items-center rounded-full bg-cream-soft/15 hover:bg-cream-soft/25 text-cream-soft"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M3 3l10 10M13 3L3 13"/></svg>
            </button>
            <figure className="max-w-5xl w-full" onClick={e => e.stopPropagation()}>
              <img
                src={item.src}
                alt={caption}
                className="w-full h-auto max-h-[80vh] object-contain rounded-2xl bg-bark-soft"
              />
              {caption && (
                <figcaption className="text-cream-soft text-center mt-4 font-mono text-sm">{caption}</figcaption>
              )}
            </figure>
          </div>
        );
      })()}
    </section>
  );
}
