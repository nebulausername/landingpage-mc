'use client';

import { useLang } from '@/lib/providers';
import { config } from '@/lib/config';

const iconMap: Record<string, JSX.Element> = {
  survival: <PathSvg d="M3 13l5-9 5 9-2 6H5z" />,
  creative: <PathSvg d="M4 14V4h12v10M4 14l4-3 3 2 5-4M4 14h12" />,
  hardcore: <PathSvg d="M10 3l1.5 4.5L16 9l-3.5 2.5L14 16l-4-2.5L6 16l1.5-4.5L4 9l4.5-1.5z" />,
  skyblock: <PathSvg d="M4 13h12M5 11l3-3 3 2 4-4M3 13v2h14v-2" />,
  arena:    <PathSvg d="M3 5h14l-2 4 2 4H3l2-4z" />,
};

/* Deterministic "online" counts so SSR and client match.
   Customize these or wire to a live API per-world. */
const onlineCounts: Record<string, number> = {
  survival: 87,
  creative: 23,
  hardcore: 8,
  skyblock: 41,
  arena:    19,
};

export default function Worlds() {
  const { t } = useLang();

  return (
    <section id="worlds" className="py-24 sm:py-32">
      <div className="max-w-wrap mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-bark-muted mb-3">{t.worlds.eyebrow}</p>
            <h2 className="font-display text-5xl sm:text-6xl font-medium leading-[1.05] tracking-tight">
              {t.worlds.title_a} <em className="italic text-moss-dark">{t.worlds.title_b}</em>
            </h2>
          </div>
          <p className="text-lg text-bark-soft max-w-md lg:mt-12">{t.worlds.aside}</p>
        </div>

        {/* Asymmetric grid: featured large tile + 4 smaller */}
        <div className="grid lg:grid-cols-3 gap-5">
          {config.worlds.map(w => {
            const data = (t.worlds as any)[w.id];
            if (!data) return null;
            return (
              <article
                key={w.id}
                className={`group relative bg-cream-soft border border-paper-edge rounded-2xl p-7 hover:-translate-y-1 hover:shadow-xl transition-all duration-300 ${w.featured ? 'lg:col-span-1 lg:row-span-2 lg:p-10' : ''}`}
              >
                <div className="flex items-start justify-between mb-5">
                  <span className={`font-mono text-xs uppercase tracking-[0.14em] text-bark-muted`}>{data.tag}</span>
                  <span className="inline-flex items-center gap-1.5 font-mono text-xs">
                    <span className="w-1.5 h-1.5 rounded-full bg-moss animate-pulse-slow"/>
                    <span className="tabular">{onlineCounts[w.id] ?? 0}</span>
                    <span className="text-bark-muted">{t.worlds.online}</span>
                  </span>
                </div>
                <div className="w-14 h-14 mb-5 grid place-items-center rounded-xl bg-paper text-moss-dark group-hover:bg-moss group-hover:text-cream-soft transition-colors">
                  {iconMap[w.id]}
                </div>
                <h3 className={`font-display ${w.featured ? 'text-4xl sm:text-5xl' : 'text-2xl'} font-medium mb-3 leading-tight`}>
                  {data.name}
                </h3>
                <p className={`text-bark-soft leading-relaxed ${w.featured ? 'text-base sm:text-lg max-w-md' : 'text-sm'}`}>
                  {data.desc}
                </p>
                {w.featured && (
                  <div className="absolute bottom-7 left-10 right-10 hidden lg:flex items-center gap-3 text-xs font-mono text-bark-muted pt-6 border-t border-paper-edge">
                    <span>// flagship realm</span>
                  </div>
                )}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function PathSvg({ d }: { d: string }) {
  return <svg width="24" height="24" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" strokeLinecap="round"><path d={d}/></svg>;
}
