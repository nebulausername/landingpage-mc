'use client';

import { useTheme, useLang } from '@/lib/providers';
import { config } from '@/lib/config';

export default function DiscordWidget() {
  const { theme } = useTheme();
  const { t } = useLang();
  const d = t.discord as any;
  const id = config.server.discordWidgetId;

  return (
    <section id="discord" className="py-24 sm:py-32">
      <div className="max-w-wrap mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-5 gap-10 items-start">
          {/* Copy column */}
          <div className="lg:col-span-2">
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-bark-muted mb-3">{d.eyebrow}</p>
            <h2 className="font-display text-5xl sm:text-6xl font-medium leading-[1.05] tracking-tight mb-6">
              {d.title_a} <em className="italic text-moss-dark">{d.title_b}</em>
            </h2>
            <p className="text-lg text-bark-soft mb-8">{d.aside}</p>
            <a
              href={config.server.discord}
              target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 bg-[#5865F2] text-white rounded-2xl font-semibold hover:bg-[#4752c4] transition-colors"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19.27 5.33A19.43 19.43 0 0 0 15.18 4l-.4.84a17.9 17.9 0 0 0-5.56 0L8.82 4A19.43 19.43 0 0 0 4.73 5.33C2.62 8.46 2 11.5 2.32 14.5a19.79 19.79 0 0 0 5.78 2.94l.6-.93a12.34 12.34 0 0 1-2.32-1.13c.19-.14.38-.28.56-.43a14.05 14.05 0 0 0 12.12 0c.18.15.37.29.56.43-.74.45-1.52.83-2.32 1.13l.6.93a19.79 19.79 0 0 0 5.78-2.94c.39-3.5-.4-6.5-2.41-9.17ZM8.52 13.5c-.83 0-1.5-.77-1.5-1.71 0-.94.67-1.71 1.5-1.71.83 0 1.5.77 1.5 1.71 0 .94-.67 1.71-1.5 1.71Zm6.96 0c-.83 0-1.5-.77-1.5-1.71 0-.94.67-1.71 1.5-1.71.83 0 1.5.77 1.5 1.71 0 .94-.67 1.71-1.5 1.71Z"/>
              </svg>
              {d.join}
            </a>
          </div>

          {/* Widget column */}
          <div className="lg:col-span-3">
            {id ? (
              <div className="rounded-2xl overflow-hidden border border-paper-edge bg-cream-soft shadow-lg">
                <iframe
                  src={`https://discord.com/widget?id=${id}&theme=${theme === 'dark' ? 'dark' : 'light'}`}
                  width="100%"
                  height="500"
                  sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
                  loading="lazy"
                  className="border-0 bg-transparent"
                  title="Discord widget"
                />
              </div>
            ) : (
              <DiscordPlaceholder note={d.disabled_note}/>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function DiscordPlaceholder({ note }: { note: string }) {
  // A stylized placeholder used when no widget ID is configured.
  // Keeps the section visually balanced and tells the integrator what to do.
  return (
    <div className="rounded-2xl border border-paper-edge bg-cream-soft p-8 shadow-lg">
      <div className="flex items-center gap-3 mb-5">
        <span className="w-10 h-10 grid place-items-center rounded-xl bg-[#5865F2]/10 text-[#5865F2]">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M19.27 5.33A19.43 19.43 0 0 0 15.18 4l-.4.84a17.9 17.9 0 0 0-5.56 0L8.82 4A19.43 19.43 0 0 0 4.73 5.33C2.62 8.46 2 11.5 2.32 14.5a19.79 19.79 0 0 0 5.78 2.94l.6-.93a12.34 12.34 0 0 1-2.32-1.13c.19-.14.38-.28.56-.43a14.05 14.05 0 0 0 12.12 0c.18.15.37.29.56.43-.74.45-1.52.83-2.32 1.13l.6.93a19.79 19.79 0 0 0 5.78-2.94c.39-3.5-.4-6.5-2.41-9.17ZM8.52 13.5c-.83 0-1.5-.77-1.5-1.71 0-.94.67-1.71 1.5-1.71.83 0 1.5.77 1.5 1.71 0 .94-.67 1.71-1.5 1.71Zm6.96 0c-.83 0-1.5-.77-1.5-1.71 0-.94.67-1.71 1.5-1.71.83 0 1.5.77 1.5 1.71 0 .94-.67 1.71-1.5 1.71Z"/></svg>
        </span>
        <div>
          <p className="font-display text-xl font-medium">Discord</p>
          <p className="font-mono text-xs text-bark-muted">Server widget</p>
        </div>
      </div>
      <div className="flex flex-col gap-2 mb-5">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="flex items-center gap-3 px-3 py-2 rounded-lg bg-paper">
            <span className="w-2 h-2 rounded-full bg-moss"/>
            <span className="h-3 rounded bg-paper-edge flex-1 max-w-[60%]" style={{ width: `${40 + (i * 13) % 50}%` }}/>
          </div>
        ))}
      </div>
      <p className="text-xs text-bark-muted">{note}</p>
    </div>
  );
}
