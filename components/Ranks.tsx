'use client';

import { useLang } from '@/lib/providers';
import { config } from '@/lib/config';

export default function Ranks() {
  const { t } = useLang();
  const r = t.ranks as any;

  return (
    <section id="ranks" className="py-24 sm:py-32">
      <div className="max-w-wrap mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-bark-muted mb-3">{r.eyebrow}</p>
            <h2 className="font-display text-5xl sm:text-6xl font-medium leading-[1.05] tracking-tight">
              {r.title_a} <em className="italic text-moss-dark">{r.title_b}</em>
            </h2>
          </div>
          <p className="text-lg text-bark-soft max-w-md lg:mt-12">{r.aside}</p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-5">
          {config.ranks.map(rank => {
            const data = r[rank.id];
            if (!data) return null;
            return (
              <article
                key={rank.id}
                className={`relative bg-cream-soft border-2 rounded-3xl p-8 flex flex-col transition-all ${
                  rank.popular
                    ? 'border-moss-dark md:scale-[1.03] shadow-lg'
                    : 'border-paper-edge hover:border-bark-muted'
                }`}
              >
                {rank.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-moss-dark text-cream-soft px-3 py-1 rounded-full text-xs font-mono uppercase tracking-[0.12em]">
                    {r.popular}
                  </span>
                )}
                <h3 className="font-display text-3xl font-medium mb-2">{data.name}</h3>
                <p className="text-bark-soft mb-6">{data.desc}</p>
                <div className="mb-6">
                  <span className="font-display text-5xl font-medium">{rank.price}</span>
                  <span className="text-bark-muted text-sm ml-1">{r.once}</span>
                </div>
                <ul className="flex flex-col gap-2.5 mb-8 text-sm flex-1">
                  {data.perks.map((perk: string, i: number) => (
                    <li key={i} className="flex gap-2.5">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="rgb(var(--c-moss-dark))" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0 mt-0.5">
                        <path d="M3 8l3 3 7-7"/>
                      </svg>
                      <span>{perk}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href={rank.buyUrl}
                  target="_blank" rel="noopener noreferrer"
                  className={`block w-full text-center py-3 rounded-xl font-semibold transition-colors ${
                    rank.popular
                      ? 'bg-moss-dark text-cream-soft hover:bg-bark'
                      : 'bg-cream border border-paper-edge hover:border-bark hover:bg-paper'
                  }`}
                >
                  {r.choose} {data.name}
                </a>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
