'use client';

import { useState } from 'react';
import { useLang } from '@/lib/providers';
import { config } from '@/lib/config';

export default function FAQ() {
  const { t } = useLang();
  const f = t.faq as any;
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section id="faq" className="bg-paper py-24 sm:py-32 border-y border-paper-edge">
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

        {/* Items */}
        <div className="max-w-3xl mx-auto flex flex-col gap-3">
          {Array.from({ length: config.faqCount }).map((_, i) => {
            const q = f[`q${i+1}`];
            const a = f[`a${i+1}`];
            if (!q || !a) return null;
            const isOpen = openIdx === i;
            return (
              <div key={i} className="bg-cream-soft border border-paper-edge rounded-2xl overflow-hidden">
                <button
                  type="button"
                  onClick={() => setOpenIdx(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="w-full text-left flex items-center justify-between gap-4 p-6 hover:bg-paper-edge/30 transition-colors"
                >
                  <span className="font-display text-lg sm:text-xl font-medium">{q}</span>
                  <svg
                    className={`flex-shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-45' : ''}`}
                    width="20" height="20" viewBox="0 0 20 20"
                    fill="none" stroke="currentColor" strokeWidth="1.6"
                  >
                    <path d="M10 4v12M4 10h12"/>
                  </svg>
                </button>
                {isOpen && (
                  <div className="px-6 pb-6 text-bark-soft leading-relaxed animate-fade-in">
                    {a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
