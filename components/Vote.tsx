'use client';

import { useLang } from '@/lib/providers';
import { config } from '@/lib/config';

export default function Vote() {
  const { t } = useLang();
  const v = t.vote as any;
  const sites = config.voteSites.slice(0, config.voteCount);

  return (
    <section id="vote" className="py-24 sm:py-32">
      <div className="max-w-wrap mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-bark-muted mb-3">{v.eyebrow}</p>
            <h2 className="font-display text-5xl sm:text-6xl font-medium leading-[1.05] tracking-tight">
              {v.title_a} <em className="italic text-moss-dark">{v.title_b}</em>
            </h2>
          </div>
          <p className="text-lg text-bark-soft max-w-md lg:mt-12">{v.aside}</p>
        </div>

        {/* Daily reward callout */}
        <div className="mb-8 bg-bark text-cream-soft rounded-2xl p-6 flex flex-wrap items-center gap-5">
          <div className="w-14 h-14 grid place-items-center rounded-xl bg-amber/20 text-amber-bright">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" strokeLinecap="round">
              <path d="M4 10h16v10H4z M4 10l2-4h12l2 4 M12 6v14 M9 14h6"/>
            </svg>
          </div>
          <div className="flex-1 min-w-[200px]">
            <p className="font-mono text-xs uppercase tracking-[0.14em] text-amber-bright">{v.rewards}</p>
            <p className="text-lg mt-1">{v.reward_line}</p>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {sites.map(site => {
            const name = v.sites?.[site.id] ?? site.id;
            return (
              <a
                key={site.id}
                href={site.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-cream-soft border border-paper-edge rounded-2xl p-5 flex items-center justify-between gap-4 hover:border-moss hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-center gap-4 min-w-0">
                  <div className="w-10 h-10 grid place-items-center rounded-lg bg-paper text-moss-dark group-hover:bg-moss group-hover:text-cream-soft transition-colors">
                    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" strokeLinecap="round">
                      <path d="M4 10l4 4 8-8"/>
                    </svg>
                  </div>
                  <div className="min-w-0">
                    <div className="font-display font-medium truncate">{name}</div>
                    <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-bark-muted mt-0.5">
                      {v.every} 24{v.hours}
                    </div>
                  </div>
                </div>
                <span className="px-3 py-1.5 rounded-lg bg-bark text-cream-soft text-xs font-semibold group-hover:bg-moss-dark transition-colors">
                  {v.button}
                </span>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
