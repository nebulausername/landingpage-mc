'use client';

import { useLang } from '@/lib/providers';

export default function Features() {
  const { t } = useLang();
  const f = t.features as any;
  return (
    <section id="features" className="bg-paper py-24 sm:py-32 border-y border-paper-edge">
      <div className="max-w-wrap mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-bark-muted mb-3">{f.eyebrow}</p>
            <h2 className="font-display text-5xl sm:text-6xl font-medium leading-[1.05] tracking-tight">
              {f.title_a} <em className="italic text-moss-dark">{f.title_b}</em>
            </h2>
          </div>
          <p className="text-lg text-bark-soft max-w-md lg:mt-12">{f.aside}</p>
        </div>

        {/* Bento */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 [grid-auto-rows:minmax(180px,auto)]">
          {/* Large economy tile */}
          <article className="col-span-2 row-span-2 bg-cream-soft border border-paper-edge rounded-2xl p-8 flex flex-col">
            <Icon name="economy"/>
            <h3 className="font-display text-3xl font-medium mt-6 mb-3">{f.economy.title}</h3>
            <p className="text-bark-soft leading-relaxed">{f.economy.desc}</p>
          </article>

          {/* Claims */}
          <article className="bg-cream-soft border border-paper-edge rounded-2xl p-6">
            <Icon name="claims"/>
            <h3 className="font-display text-xl font-medium mt-4 mb-2">{f.claims.title}</h3>
            <p className="text-sm text-bark-soft">{f.claims.desc}</p>
          </article>

          {/* Mobs */}
          <article className="bg-cream-soft border border-paper-edge rounded-2xl p-6">
            <Icon name="mobs"/>
            <h3 className="font-display text-xl font-medium mt-4 mb-2">{f.mobs.title}</h3>
            <p className="text-sm text-bark-soft">{f.mobs.desc}</p>
          </article>

          {/* Events */}
          <article className="col-span-2 bg-cream-soft border border-paper-edge rounded-2xl p-6 flex items-center gap-5">
            <Icon name="events"/>
            <div>
              <h3 className="font-display text-xl font-medium mb-1">{f.events.title}</h3>
              <p className="text-sm text-bark-soft">{f.events.desc}</p>
            </div>
          </article>

          {/* Staff (dark) */}
          <article className="col-span-2 bg-bark text-cream-soft rounded-2xl p-6 flex items-center gap-5">
            <div className="w-12 h-12 grid place-items-center rounded-xl bg-cream-soft/10">
              <Icon name="staff" white/>
            </div>
            <div>
              <h3 className="font-display text-xl font-medium mb-1">{f.staff.title}</h3>
              <p className="text-sm opacity-80">{f.staff.desc}</p>
            </div>
          </article>
        </div>

        {/* Quote */}
        <blockquote className="mt-10 max-w-3xl mx-auto text-center">
          <p className="font-display text-2xl sm:text-3xl italic leading-snug">"{f.quote}"</p>
          <cite className="block mt-4 not-italic font-mono text-xs uppercase tracking-[0.14em] text-bark-muted">{f.author}</cite>
        </blockquote>
      </div>
    </section>
  );
}

function Icon({ name, white }: { name: string; white?: boolean }) {
  const c = white ? 'rgb(var(--c-cream-soft))' : 'rgb(var(--c-moss-dark))';
  const wrapper = white ? '' : 'w-12 h-12 grid place-items-center rounded-xl bg-paper-edge/40 text-moss-dark';
  const paths: Record<string,string> = {
    economy: 'M3 10h14v6H3z M5 10V7a3 3 0 0 1 6 0v3 M10 13h4',
    claims:  'M4 6l6-3 6 3v8l-6 3-6-3z M10 3v15',
    mobs:    'M5 9a5 5 0 0 1 10 0v2H5z M7 11v3 M13 11v3 M9 6v1 M11 6v1',
    events:  'M4 6h12v10H4z M4 9h12 M7 4v3 M13 4v3',
    staff:   'M10 3l2 5 5 .5-3.5 3.5L15 17l-5-3-5 3 1.5-5L3 8.5 8 8z',
  };
  return (
    <div className={wrapper}>
      <svg width={white ? 20 : 22} height={white ? 20 : 22} viewBox="0 0 20 20" fill="none" stroke={c} strokeWidth="1.6" strokeLinejoin="round" strokeLinecap="round">
        <path d={paths[name]}/>
      </svg>
    </div>
  );
}
