'use client';

import { useLang } from '@/lib/providers';
import { config } from '@/lib/config';
import { mcHead } from '@/lib/avatar';

export default function Testimonials() {
  const { t } = useLang();
  const ts = t.testimonials as any;
  const items = config.testimonials.slice(0, config.testimonialCount);

  return (
    <section id="testimonials" className="py-24 sm:py-32 bg-paper border-y border-paper-edge">
      <div className="max-w-wrap mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-bark-muted mb-3">{ts.eyebrow}</p>
            <h2 className="font-display text-5xl sm:text-6xl font-medium leading-[1.05] tracking-tight">
              {ts.title_a} <em className="italic text-moss-dark">{ts.title_b}</em>
            </h2>
          </div>
          <p className="text-lg text-bark-soft max-w-md lg:mt-12">{ts.aside}</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map((tm, i) => {
            const quote = ts.items?.[tm.user];
            if (!quote) return null;
            return (
              <figure
                key={tm.user}
                className="bg-cream-soft border border-paper-edge rounded-2xl p-7 flex flex-col hover:-translate-y-1 hover:shadow-xl transition-all duration-300"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <Stars count={tm.rating} label={ts.rating_label}/>
                <blockquote className="mt-4 text-bark-soft leading-relaxed flex-1">
                  &ldquo;{quote}&rdquo;
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3 pt-5 border-t border-paper-edge">
                  <img
                    src={mcHead(tm.user, 64)}
                    alt={tm.user}
                    width={40}
                    height={40}
                    loading="lazy"
                    className="w-10 h-10 rounded-lg [image-rendering:pixelated] bg-paper-edge"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="font-display font-medium truncate">{tm.user}</div>
                    {tm.badge && (
                      <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-moss-dark">
                        {ts.badge?.[tm.badge] ?? tm.badge}
                      </div>
                    )}
                  </div>
                </figcaption>
              </figure>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Stars({ count, label }: { count: number; label: string }) {
  return (
    <div className="inline-flex gap-0.5" aria-label={`${count} ${label}`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          width="16" height="16" viewBox="0 0 16 16"
          fill={i < count ? 'rgb(var(--c-amber))' : 'none'}
          stroke="rgb(var(--c-amber))"
          strokeWidth="1.2"
        >
          <path d="M8 1.5l1.9 4 4.4.6-3.2 3 .8 4.4L8 11.5l-3.9 2 .8-4.4-3.2-3 4.4-.6z"/>
        </svg>
      ))}
    </div>
  );
}
