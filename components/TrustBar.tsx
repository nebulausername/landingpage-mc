'use client';

import { useLang } from '@/lib/providers';

/* Three-pill trust strip rendered between Hero and Stats.
   Quick, scannable, no chrome — pure signal. */
export default function TrustBar() {
  const { t } = useLang();
  return (
    <div className="bg-cream-soft border-y border-paper-edge">
      <div className="max-w-wrap mx-auto px-4 sm:px-6 py-5 flex flex-wrap items-center justify-center gap-x-10 gap-y-3 text-sm">
        <Pill icon="check" label={t.hero.trust_a}/>
        <Pill icon="globe" label={t.hero.trust_b}/>
        <Pill icon="tree"  label={t.hero.trust_c}/>
      </div>
    </div>
  );
}

function Pill({ icon, label }: { icon: 'check' | 'globe' | 'tree'; label: string }) {
  return (
    <span className="inline-flex items-center gap-2 text-bark-soft">
      <span className="w-7 h-7 grid place-items-center rounded-full bg-paper text-moss-dark">
        {icon === 'check' && <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 8l3 3 7-7"/></svg>}
        {icon === 'globe' && <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6"><circle cx="8" cy="8" r="6"/><path d="M2 8h12 M8 2c2 2 2 10 0 12 M8 2c-2 2-2 10 0 12"/></svg>}
        {icon === 'tree'  && <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"><path d="M8 1l4 6H4z M5 7l3 5 3-5 M7 12h2v3H7z"/></svg>}
      </span>
      <span className="font-medium">{label}</span>
    </span>
  );
}
