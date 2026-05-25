'use client';

import { useLang } from '@/lib/providers';
import { config } from '@/lib/config';

const statusStyle: Record<string, string> = {
  done:  'bg-moss text-cream-soft',
  now:   'bg-amber text-bark animate-pulse-slow',
  next:  'bg-paper text-bark border border-paper-edge',
  later: 'bg-paper-edge/40 text-bark-muted',
};

export default function Roadmap() {
  const { t } = useLang();
  const r = t.roadmap as any;
  const items = config.roadmap.slice(0, config.roadmapCount);

  return (
    <section id="roadmap" className="py-24 sm:py-32 bg-paper border-y border-paper-edge">
      <div className="max-w-wrap mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-bark-muted mb-3">{r.eyebrow}</p>
            <h2 className="font-display text-5xl sm:text-6xl font-medium leading-[1.05] tracking-tight">
              {r.title_a} <em className="italic text-moss-dark">{r.title_b}</em>
            </h2>
          </div>
          <p className="text-lg text-bark-soft max-w-md lg:mt-12">{r.aside}</p>
        </div>

        {/* Vertical timeline */}
        <ol className="relative max-w-3xl mx-auto">
          <span aria-hidden className="absolute left-4 top-2 bottom-2 w-px bg-paper-edge"/>
          {items.map((entry, i) => {
            const data = r.items?.[entry.when];
            if (!data) return null;
            return (
              <li key={entry.when} className="relative pl-12 pb-10 last:pb-0">
                <span
                  className={`absolute left-0 top-1 w-9 h-9 rounded-full grid place-items-center ${statusStyle[entry.status]}`}
                  aria-hidden
                >
                  <Dot status={entry.status}/>
                </span>
                <div className="bg-cream-soft border border-paper-edge rounded-2xl p-6">
                  <div className="flex flex-wrap items-baseline gap-3 mb-2">
                    <span className="font-mono text-xs uppercase tracking-[0.16em] text-bark-muted">
                      {entry.when.replace('-', ' ').toUpperCase()}
                    </span>
                    <span className={`font-mono text-[10px] uppercase tracking-[0.16em] px-2 py-0.5 rounded-full ${statusStyle[entry.status]}`}>
                      {r.status?.[entry.status]}
                    </span>
                  </div>
                  <h3 className="font-display text-2xl font-medium mb-1">{data.title}</h3>
                  <p className="text-bark-soft">{data.desc}</p>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}

function Dot({ status }: { status: string }) {
  if (status === 'done') {
    return (
      <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 8l3 3 7-7"/>
      </svg>
    );
  }
  return <span className="w-2.5 h-2.5 rounded-full bg-current"/>;
}
