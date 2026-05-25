'use client';

import { useLang } from '@/lib/providers';
import { config } from '@/lib/config';

function cellNode(val: boolean | string, c: any) {
  if (val === true)  return <span className="inline-flex items-center gap-2 text-moss-dark font-medium"><Check/> {c.yes}</span>;
  if (val === false) return <span className="inline-flex items-center gap-2 text-rust"><Cross/> {c.no}</span>;
  return <span className="text-bark">{val}</span>;
}

export default function Comparison() {
  const { t } = useLang();
  const c = t.comparison as any;

  return (
    <section id="comparison" className="py-24 sm:py-32">
      <div className="max-w-wrap mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-bark-muted mb-3">{c.eyebrow}</p>
            <h2 className="font-display text-5xl sm:text-6xl font-medium leading-[1.05] tracking-tight">
              {c.title_a} <em className="italic text-moss-dark">{c.title_b}</em>
            </h2>
          </div>
          <p className="text-lg text-bark-soft max-w-md lg:mt-12">{c.aside}</p>
        </div>

        <div className="overflow-hidden rounded-2xl border border-paper-edge bg-cream-soft shadow-sm">
          {/* Header row */}
          <div className="grid grid-cols-[1.5fr_1fr_1fr] gap-2 px-4 sm:px-6 py-4 bg-paper border-b border-paper-edge font-mono text-xs uppercase tracking-[0.14em] text-bark-muted">
            <span/>
            <span className="text-center text-moss-dark font-semibold">{c.header_us}</span>
            <span className="text-center">{c.header_others}</span>
          </div>
          {/* Rows */}
          {config.comparison.map((row, i) => {
            const label = c.rows?.[row.id] ?? row.id;
            return (
              <div
                key={row.id}
                className={`grid grid-cols-[1.5fr_1fr_1fr] items-center gap-2 px-4 sm:px-6 py-4 ${i % 2 ? 'bg-paper/40' : ''} ${i ? 'border-t border-paper-edge' : ''}`}
              >
                <span className="font-display text-base sm:text-lg">{label}</span>
                <span className="text-center">{cellNode(row.us, c)}</span>
                <span className="text-center text-bark-soft">{cellNode(row.others, c)}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Check() {
  return <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 10l4 4 8-8"/></svg>;
}
function Cross() {
  return <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M5 5l10 10M15 5L5 15"/></svg>;
}
