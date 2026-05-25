'use client';

import { useLang } from '@/lib/providers';
import { config } from '@/lib/config';
import { mcHead } from '@/lib/avatar';

// Deterministic online flag so SSR matches client. Replace with live status if needed.
const onlineSet = new Set(['Aldra_Oak', 'KirinSpark', 'TanglerootSam']);

export default function Staff() {
  const { t } = useLang();
  const s = t.staff as any;
  const members = config.staff.slice(0, config.staffCount);

  return (
    <section id="staff" className="py-24 sm:py-32 bg-cream-soft border-y border-paper-edge">
      <div className="max-w-wrap mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-bark-muted mb-3">{s.eyebrow}</p>
            <h2 className="font-display text-5xl sm:text-6xl font-medium leading-[1.05] tracking-tight">
              {s.title_a} <em className="italic text-moss-dark">{s.title_b}</em>
            </h2>
          </div>
          <p className="text-lg text-bark-soft max-w-md lg:mt-12">{s.aside}</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {members.map(m => {
            const data = s.members?.[m.user];
            const online = onlineSet.has(m.user);
            return (
              <article
                key={m.user}
                className="bg-paper border border-paper-edge rounded-2xl p-5 flex flex-col items-center text-center hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
              >
                <div className="relative mb-3">
                  <img
                    src={mcHead(m.user, 128)}
                    alt={m.user}
                    width={64}
                    height={64}
                    loading="lazy"
                    className="w-16 h-16 rounded-xl [image-rendering:pixelated] bg-paper-edge"
                  />
                  <span
                    aria-label={online ? s.online : s.offline}
                    title={online ? s.online : s.offline}
                    className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-paper ${
                      online ? 'bg-moss animate-pulse-slow' : 'bg-bark-muted'
                    }`}
                  />
                </div>
                <h3 className="font-display font-medium truncate w-full">{m.user}</h3>
                <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-moss-dark mt-1">
                  {s.roles?.[m.role] ?? m.role}
                </p>
                {data?.bio && (
                  <p className="text-xs text-bark-soft mt-3 line-clamp-2">{data.bio}</p>
                )}
                {data?.since && (
                  <p className="font-mono text-[10px] text-bark-muted mt-3">
                    {s.since} {data.since}
                  </p>
                )}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
