'use client';

import { useEffect, useMemo, useRef, useState } from 'react';

/* ═══════════════════════════════════════════════════════════════════
   ADMIN EDITOR
   ═══════════════════════════════════════════════════════════════════
   Tabs: Server · Worlds · Ranks · Testimonials · Gallery · Staff ·
         Vote · Roadmap · Comparison · FAQ · Texts · Settings

   Save writes to lib/config.ts and lib/translations/*.ts. In `next dev`
   this triggers HMR so the public site updates immediately. */

type Lang = 'en' | 'de' | 'es';
const LANGS: Lang[] = ['en', 'de', 'es'];

interface AdminState {
  config: any;
  translations: Record<Lang, any>;
}

const TABS = [
  { id: 'server',       label: 'Server',       hint: 'Name, IP, Discord, Store' },
  { id: 'worlds',       label: 'Worlds',       hint: 'Game-modes shown on the page' },
  { id: 'ranks',        label: 'Ranks',        hint: 'Pricing tiers' },
  { id: 'testimonials', label: 'Testimonials', hint: 'Player quotes' },
  { id: 'gallery',      label: 'Gallery',      hint: 'Upload screenshots' },
  { id: 'staff',        label: 'Staff',        hint: 'Team members' },
  { id: 'vote',         label: 'Vote',         hint: 'Vote-site list' },
  { id: 'roadmap',      label: 'Roadmap',      hint: 'Timeline entries' },
  { id: 'comparison',   label: 'Compare',      hint: 'Comparison table' },
  { id: 'faq',          label: 'FAQ',          hint: 'Questions & answers' },
  { id: 'texts',        label: 'Texts',        hint: 'Hero, CTA, footer copy' },
  { id: 'settings',     label: 'Settings',     hint: 'Theme, analytics, SEO' },
] as const;

type TabId = typeof TABS[number]['id'];

export default function Editor({ initial }: { initial: AdminState }) {
  const [data, setData] = useState<AdminState>(initial);
  const [tab, setTab] = useState<TabId>('server');
  const [dirty, setDirty] = useState(false);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState<{ type: 'ok' | 'err'; text: string } | null>(null);

  // Warn before leaving with unsaved changes
  useEffect(() => {
    if (!dirty) return;
    const handler = (e: BeforeUnloadEvent) => { e.preventDefault(); e.returnValue = ''; };
    window.addEventListener('beforeunload', handler);
    return () => window.removeEventListener('beforeunload', handler);
  }, [dirty]);

  function setConfig(updater: (c: any) => any) {
    setData(d => ({ ...d, config: updater(structuredClone(d.config)) }));
    setDirty(true);
  }
  function setT(lang: Lang, updater: (t: any) => any) {
    setData(d => ({
      ...d,
      translations: { ...d.translations, [lang]: updater(structuredClone(d.translations[lang])) },
    }));
    setDirty(true);
  }
  async function save() {
    setSaving(true);
    setMsg(null);
    try {
      const res = await fetch('/api/admin/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (json.ok) {
        setDirty(false);
        setMsg({ type: 'ok', text: `Gespeichert · ${(json.written || []).length} Dateien aktualisiert` });
      } else {
        setMsg({ type: 'err', text: `Fehler: ${json.detail || json.error}` });
      }
    } catch (e) {
      setMsg({ type: 'err', text: `Fehler: ${String(e)}` });
    } finally {
      setSaving(false);
      setTimeout(() => setMsg(null), 5000);
    }
  }

  async function logout() {
    await fetch('/api/admin/logout', { method: 'POST' });
    window.location.reload();
  }

  return (
    <div className="min-h-screen flex bg-cream">
      {/* Sidebar */}
      <aside className="w-64 shrink-0 bg-bark text-cream-soft flex flex-col">
        <div className="px-5 py-5 border-b border-cream-soft/10">
          <h1 className="font-display text-2xl">Admin</h1>
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-cream-soft/50 mt-1">landing-mc</p>
        </div>
        <nav className="flex-1 py-3 overflow-y-auto">
          {TABS.map(t => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`w-full text-left px-5 py-2.5 text-sm flex items-baseline gap-2 transition-colors ${
                tab === t.id
                  ? 'bg-moss-dark text-cream-soft'
                  : 'hover:bg-cream-soft/5 text-cream-soft/90'
              }`}
            >
              <span className="font-medium">{t.label}</span>
              <span className="text-[10px] text-cream-soft/40 truncate">{t.hint}</span>
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-cream-soft/10 flex flex-col gap-2">
          <a href="/" target="_blank" rel="noopener noreferrer" className="text-xs text-cream-soft/60 hover:text-cream-soft">
            ↗ Live site
          </a>
          <button onClick={logout} className="text-xs text-left text-cream-soft/60 hover:text-rust">
            Abmelden
          </button>
        </div>
      </aside>

      {/* Content */}
      <div className="flex-1 flex flex-col min-w-0">
        <main className="flex-1 overflow-y-auto px-8 py-8">
          {tab === 'server'       && <ServerTab       data={data} setConfig={setConfig} />}
          {tab === 'worlds'       && <WorldsTab       data={data} setConfig={setConfig} />}
          {tab === 'ranks'        && <RanksTab        data={data} setConfig={setConfig} setT={setT} />}
          {tab === 'testimonials' && <TestimonialsTab data={data} setConfig={setConfig} setT={setT} />}
          {tab === 'gallery'      && <GalleryTab      data={data} setConfig={setConfig} setT={setT} />}
          {tab === 'staff'        && <StaffTab        data={data} setConfig={setConfig} setT={setT} />}
          {tab === 'vote'         && <VoteTab         data={data} setConfig={setConfig} setT={setT} />}
          {tab === 'roadmap'      && <RoadmapTab      data={data} setConfig={setConfig} setT={setT} />}
          {tab === 'comparison'   && <ComparisonTab   data={data} setConfig={setConfig} setT={setT} />}
          {tab === 'faq'          && <FaqTab          data={data} setConfig={setConfig} setT={setT} />}
          {tab === 'texts'        && <TextsTab        data={data} setT={setT} />}
          {tab === 'settings'     && <SettingsTab     data={data} setConfig={setConfig} />}
        </main>

        {/* Sticky save bar */}
        <footer className="bg-cream-soft border-t border-paper-edge px-8 py-4 flex items-center gap-4">
          <div className={`w-2 h-2 rounded-full ${dirty ? 'bg-amber animate-pulse-slow' : 'bg-moss'}`} aria-hidden/>
          <span className="text-sm text-bark-muted">{dirty ? 'Ungespeicherte Änderungen' : 'Alles gespeichert'}</span>
          {msg && (
            <span className={`text-sm px-3 py-1 rounded-lg ${msg.type === 'ok' ? 'bg-moss/15 text-moss-dark' : 'bg-rust/15 text-rust'}`}>
              {msg.text}
            </span>
          )}
          <div className="flex-1" />
          <button
            onClick={save}
            disabled={!dirty || saving}
            className="px-6 py-2.5 bg-bark text-cream-soft rounded-xl font-semibold hover:bg-moss-dark transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {saving ? 'Speichere…' : 'Alle Änderungen speichern'}
          </button>
        </footer>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   PRIMITIVES
   ═══════════════════════════════════════════════════════════════════ */

function H({ title, hint }: { title: string; hint?: string }) {
  return (
    <header className="mb-8">
      <h2 className="font-display text-4xl font-medium tracking-tight">{title}</h2>
      {hint && <p className="text-bark-muted mt-1">{hint}</p>}
    </header>
  );
}

function Card({ children, title }: { children: React.ReactNode; title?: string }) {
  return (
    <section className="bg-cream-soft border border-paper-edge rounded-2xl p-6 mb-5">
      {title && <h3 className="font-display text-lg font-medium mb-4 text-bark">{title}</h3>}
      {children}
    </section>
  );
}

function Field({ label, value, onChange, placeholder, type = 'text' }: {
  label: string; value: string; onChange: (v: string) => void; placeholder?: string; type?: string;
}) {
  return (
    <label className="block">
      <span className="block text-xs uppercase tracking-[0.12em] font-mono text-bark-muted mb-1.5">{label}</span>
      <input
        type={type}
        value={value ?? ''}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-3 py-2 bg-paper border border-paper-edge rounded-lg focus-visible:outline-none focus-visible:border-moss-dark"
      />
    </label>
  );
}

function TextArea({ label, value, onChange, rows = 3 }: {
  label: string; value: string; onChange: (v: string) => void; rows?: number;
}) {
  return (
    <label className="block">
      <span className="block text-xs uppercase tracking-[0.12em] font-mono text-bark-muted mb-1.5">{label}</span>
      <textarea
        value={value ?? ''}
        onChange={e => onChange(e.target.value)}
        rows={rows}
        className="w-full px-3 py-2 bg-paper border border-paper-edge rounded-lg focus-visible:outline-none focus-visible:border-moss-dark font-sans leading-relaxed resize-y"
      />
    </label>
  );
}

function NumberField({ label, value, onChange }: { label: string; value: number; onChange: (v: number) => void }) {
  return (
    <label className="block">
      <span className="block text-xs uppercase tracking-[0.12em] font-mono text-bark-muted mb-1.5">{label}</span>
      <input
        type="number"
        value={value ?? 0}
        onChange={e => onChange(parseInt(e.target.value, 10) || 0)}
        className="w-full px-3 py-2 bg-paper border border-paper-edge rounded-lg focus-visible:outline-none focus-visible:border-moss-dark"
      />
    </label>
  );
}

function Toggle({ label, value, onChange }: { label: string; value: boolean; onChange: (v: boolean) => void }) {
  return (
    <label className="flex items-center gap-3 cursor-pointer">
      <button
        type="button"
        role="switch"
        aria-checked={value}
        onClick={() => onChange(!value)}
        className={`relative w-11 h-6 rounded-full transition-colors ${value ? 'bg-moss-dark' : 'bg-paper-edge'}`}
      >
        <span className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-cream-soft transition-transform ${value ? 'translate-x-5' : ''}`}/>
      </button>
      <span className="text-sm">{label}</span>
    </label>
  );
}

function Select<T extends string>({ label, value, options, onChange }: {
  label: string; value: T; options: readonly T[]; onChange: (v: T) => void;
}) {
  return (
    <label className="block">
      <span className="block text-xs uppercase tracking-[0.12em] font-mono text-bark-muted mb-1.5">{label}</span>
      <select
        value={value}
        onChange={e => onChange(e.target.value as T)}
        className="w-full px-3 py-2 bg-paper border border-paper-edge rounded-lg focus-visible:outline-none focus-visible:border-moss-dark"
      >
        {options.map(o => <option key={o} value={o}>{o}</option>)}
      </select>
    </label>
  );
}

function LangSwitch({ value, onChange }: { value: Lang; onChange: (v: Lang) => void }) {
  return (
    <div className="inline-flex rounded-lg bg-paper border border-paper-edge p-0.5 mb-5">
      {LANGS.map(l => (
        <button
          key={l}
          onClick={() => onChange(l)}
          className={`px-3 py-1 text-xs font-mono uppercase tracking-[0.14em] rounded-md transition-colors ${
            value === l ? 'bg-bark text-cream-soft' : 'text-bark-muted hover:text-bark'
          }`}
        >
          {l}
        </button>
      ))}
    </div>
  );
}

function RowButton({ onClick, children, danger }: { onClick: () => void; children: React.ReactNode; danger?: boolean }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
        danger ? 'bg-rust/10 text-rust hover:bg-rust/20' : 'bg-paper hover:bg-paper-edge text-bark'
      }`}
    >
      {children}
    </button>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   TABS
   ═══════════════════════════════════════════════════════════════════ */

type Props = {
  data: AdminState;
  setConfig: (u: (c: any) => any) => void;
  setT: (lang: Lang, u: (t: any) => any) => void;
};
type PropsConfigOnly = Pick<Props, 'data' | 'setConfig'>;
type PropsWithLang = Pick<Props, 'data' | 'setConfig' | 'setT'>;
type PropsTextsOnly = { data: AdminState; setT: Props['setT'] };

/* ─── Server ────────────────────────────────────────────────────── */
function ServerTab({ data, setConfig }: PropsConfigOnly) {
  const s = data.config.server || {};
  return (
    <>
      <H title="Server-Identität" hint="Die Grundwerte deines Servers."/>
      <Card title="Identity">
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Name"    value={s.name}    onChange={v => setConfig(c => ({ ...c, server: { ...c.server, name: v }}))}/>
          <Field label="Version" value={s.version} onChange={v => setConfig(c => ({ ...c, server: { ...c.server, version: v }}))} placeholder="1.21.x"/>
          <Field label="IP"      value={s.ip}      onChange={v => setConfig(c => ({ ...c, server: { ...c.server, ip: v }}))}/>
          <Field label="Tagline" value={s.tagline ?? ''} onChange={v => setConfig(c => ({ ...c, server: { ...c.server, tagline: v }}))}/>
          <Field label="Discord-Link" value={s.discord} onChange={v => setConfig(c => ({ ...c, server: { ...c.server, discord: v }}))}/>
          <Field label="Store-Link"   value={s.store}   onChange={v => setConfig(c => ({ ...c, server: { ...c.server, store: v }}))}/>
        </div>
      </Card>

      <Card title="Live-Integrationen">
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Status-API URL (mcsrvstat.us)" value={s.statusApi ?? ''} onChange={v => setConfig(c => ({ ...c, server: { ...c.server, statusApi: v || null }}))} placeholder="https://api.mcsrvstat.us/3/..."/>
          <Field label="Discord Server-ID (Widget)" value={s.discordWidgetId ?? ''} onChange={v => setConfig(c => ({ ...c, server: { ...c.server, discordWidgetId: v || null }}))} placeholder="123456789012345678"/>
        </div>
      </Card>

      <Card title="Fallback bei API-Ausfall">
        <div className="grid sm:grid-cols-2 gap-4">
          <NumberField label="Spieler online (Fallback)" value={data.config.fallback?.players ?? 0}    onChange={v => setConfig(c => ({ ...c, fallback: { ...c.fallback, players: v }}))}/>
          <NumberField label="Max Spieler (Fallback)"    value={data.config.fallback?.maxPlayers ?? 0} onChange={v => setConfig(c => ({ ...c, fallback: { ...c.fallback, maxPlayers: v }}))}/>
        </div>
      </Card>

      <Card title="Social">
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Discord (Footer)" value={data.config.social?.discord ?? ''} onChange={v => setConfig(c => ({ ...c, social: { ...c.social, discord: v }}))}/>
          <Field label="Twitter / X"      value={data.config.social?.twitter ?? ''} onChange={v => setConfig(c => ({ ...c, social: { ...c.social, twitter: v || undefined }}))}/>
          <Field label="YouTube"          value={data.config.social?.youtube ?? ''} onChange={v => setConfig(c => ({ ...c, social: { ...c.social, youtube: v || undefined }}))}/>
          <Field label="TikTok"           value={data.config.social?.tiktok ?? ''}  onChange={v => setConfig(c => ({ ...c, social: { ...c.social, tiktok: v || undefined }}))}/>
          <Field label="Instagram"        value={data.config.social?.instagram ?? ''} onChange={v => setConfig(c => ({ ...c, social: { ...c.social, instagram: v || undefined }}))}/>
        </div>
      </Card>
    </>
  );
}

/* ─── Worlds ────────────────────────────────────────────────────── */
function WorldsTab({ data, setConfig }: PropsConfigOnly) {
  const worlds = data.config.worlds || [];
  const allIds = ['survival', 'creative', 'hardcore', 'skyblock', 'arena'] as const;
  return (
    <>
      <H title="Welten / Spielmodi" hint="Wähle, welche Welten in der Worlds-Sektion erscheinen und welche groß angezeigt wird."/>
      <Card>
        <div className="grid sm:grid-cols-2 gap-3">
          {allIds.map(id => {
            const idx = worlds.findIndex((w: any) => w.id === id);
            const enabled = idx >= 0;
            const featured = enabled && !!worlds[idx]?.featured;
            return (
              <div key={id} className="flex items-center gap-3 p-3 bg-paper border border-paper-edge rounded-lg">
                <div className="flex-1">
                  <div className="font-medium capitalize">{id}</div>
                  <Toggle
                    label="Anzeigen"
                    value={enabled}
                    onChange={on => setConfig(c => {
                      const next = [...(c.worlds || [])];
                      if (on && !enabled) next.push({ id });
                      if (!on && enabled) next.splice(idx, 1);
                      return { ...c, worlds: next };
                    })}
                  />
                </div>
                {enabled && (
                  <Toggle
                    label="Featured (groß)"
                    value={featured}
                    onChange={on => setConfig(c => {
                      const next = (c.worlds || []).map((w: any) => ({ ...w, featured: w.id === id ? on : false }));
                      return { ...c, worlds: next };
                    })}
                  />
                )}
              </div>
            );
          })}
        </div>
      </Card>
    </>
  );
}

/* ─── Ranks ─────────────────────────────────────────────────────── */
function RanksTab({ data, setConfig, setT }: PropsWithLang) {
  const [lang, setLang] = useState<Lang>('en');
  const ranks = data.config.ranks || [];

  return (
    <>
      <H title="Ränge & Preise" hint="Drei-Tier-Pricing. Texte pro Sprache, Preise/URLs global."/>

      {ranks.map((r: any, i: number) => (
        <Card key={r.id} title={`${r.id} ${r.popular ? '· beliebteste' : ''}`}>
          <div className="grid sm:grid-cols-3 gap-4 mb-4">
            <Field label="Preis"    value={r.price}   onChange={v => setConfig(c => { const n = [...c.ranks]; n[i] = { ...n[i], price: v }; return { ...c, ranks: n }; })}/>
            <Field label="Buy-URL"  value={r.buyUrl}  onChange={v => setConfig(c => { const n = [...c.ranks]; n[i] = { ...n[i], buyUrl: v }; return { ...c, ranks: n }; })}/>
            <NumberField label="Perks-Anzahl"  value={r.perks ?? 0} onChange={v => setConfig(c => { const n = [...c.ranks]; n[i] = { ...n[i], perks: v }; return { ...c, ranks: n }; })}/>
          </div>
          <Toggle
            label="Popular (Highlight)"
            value={!!r.popular}
            onChange={on => setConfig(c => { const n = c.ranks.map((x: any) => ({ ...x, popular: x.id === r.id ? on : false })); return { ...c, ranks: n }; })}
          />
        </Card>
      ))}

      <Card title="Rang-Texte">
        <LangSwitch value={lang} onChange={setLang}/>
        {ranks.map((r: any) => {
          const t = data.translations[lang]?.ranks?.[r.id] ?? {};
          return (
            <div key={r.id} className="mb-5 pb-5 border-b border-paper-edge last:border-b-0">
              <h4 className="font-display text-base mb-3 capitalize">{r.id}</h4>
              <div className="grid sm:grid-cols-2 gap-3 mb-3">
                <Field label="Name"        value={t.name ?? ''} onChange={v => setT(lang, x => ({ ...x, ranks: { ...x.ranks, [r.id]: { ...x.ranks[r.id], name: v }}}))}/>
                <Field label="Beschreibung" value={t.desc ?? ''} onChange={v => setT(lang, x => ({ ...x, ranks: { ...x.ranks, [r.id]: { ...x.ranks[r.id], desc: v }}}))}/>
              </div>
              <span className="block text-xs uppercase tracking-[0.12em] font-mono text-bark-muted mb-1.5">Perks (eine pro Zeile)</span>
              <textarea
                value={(t.perks ?? []).join('\n')}
                onChange={e => setT(lang, x => ({ ...x, ranks: { ...x.ranks, [r.id]: { ...x.ranks[r.id], perks: e.target.value.split('\n').map(s => s.trim()).filter(Boolean) }}}))}
                rows={5}
                className="w-full px-3 py-2 bg-paper border border-paper-edge rounded-lg focus-visible:outline-none focus-visible:border-moss-dark font-sans leading-relaxed"
              />
            </div>
          );
        })}
      </Card>

      <Card title="Sektions-Header">
        <LangSwitch value={lang} onChange={setLang}/>
        <div className="grid sm:grid-cols-2 gap-3 mb-3">
          <Field label="Eyebrow"  value={data.translations[lang]?.ranks?.eyebrow ?? ''}   onChange={v => setT(lang, x => ({ ...x, ranks: { ...x.ranks, eyebrow: v }}))}/>
          <Field label="Titel A"  value={data.translations[lang]?.ranks?.title_a ?? ''}  onChange={v => setT(lang, x => ({ ...x, ranks: { ...x.ranks, title_a: v }}))}/>
          <Field label="Titel B"  value={data.translations[lang]?.ranks?.title_b ?? ''}  onChange={v => setT(lang, x => ({ ...x, ranks: { ...x.ranks, title_b: v }}))}/>
          <Field label="Aside"     value={data.translations[lang]?.ranks?.aside ?? ''}    onChange={v => setT(lang, x => ({ ...x, ranks: { ...x.ranks, aside: v }}))}/>
          <Field label="Popular-Badge" value={data.translations[lang]?.ranks?.popular ?? ''} onChange={v => setT(lang, x => ({ ...x, ranks: { ...x.ranks, popular: v }}))}/>
          <Field label="Choose-Button" value={data.translations[lang]?.ranks?.choose ?? ''}  onChange={v => setT(lang, x => ({ ...x, ranks: { ...x.ranks, choose: v }}))}/>
          <Field label="Preis-Suffix"  value={data.translations[lang]?.ranks?.once ?? ''}    onChange={v => setT(lang, x => ({ ...x, ranks: { ...x.ranks, once: v }}))}/>
          <Field label="Garantie-Zeile" value={data.translations[lang]?.ranks?.guarantee ?? ''} onChange={v => setT(lang, x => ({ ...x, ranks: { ...x.ranks, guarantee: v }}))}/>
        </div>
      </Card>
    </>
  );
}

/* ─── Testimonials ──────────────────────────────────────────────── */
function TestimonialsTab({ data, setConfig, setT }: PropsWithLang) {
  const [lang, setLang] = useState<Lang>('en');
  const items = data.config.testimonials || [];

  function addItem() {
    setConfig(c => ({ ...c, testimonials: [...(c.testimonials || []), { user: 'NewPlayer' + (items.length + 1), rating: 5 }] }));
  }
  function removeItem(idx: number) {
    setConfig(c => ({ ...c, testimonials: c.testimonials.filter((_: any, i: number) => i !== idx) }));
  }

  return (
    <>
      <H title="Testimonials" hint="Spieler-Stimmen mit Sternen. Avatare kommen automatisch von mc-heads.net."/>
      <Card>
        <div className="flex items-center gap-3 mb-4">
          <NumberField label="Anzahl auf der Seite" value={data.config.testimonialCount ?? 6} onChange={v => setConfig(c => ({ ...c, testimonialCount: v }))}/>
          <div className="flex-1"/>
          <RowButton onClick={addItem}>+ Hinzufügen</RowButton>
        </div>

        {items.map((it: any, i: number) => (
          <div key={i} className="grid sm:grid-cols-[1fr_120px_140px_auto] gap-3 items-end mb-3 p-3 bg-paper border border-paper-edge rounded-lg">
            <Field label="Minecraft-Name" value={it.user} onChange={v => setConfig(c => { const n = [...c.testimonials]; n[i] = { ...n[i], user: v }; return { ...c, testimonials: n }; })}/>
            <NumberField label="Sterne (1-5)" value={it.rating ?? 5} onChange={v => setConfig(c => { const n = [...c.testimonials]; n[i] = { ...n[i], rating: Math.max(1, Math.min(5, v)) }; return { ...c, testimonials: n }; })}/>
            <Select label="Badge" value={it.badge ?? ''} options={['', 'veteran', 'staff', 'patron', 'newcomer'] as const} onChange={v => setConfig(c => { const n = [...c.testimonials]; n[i] = { ...n[i], badge: v || undefined }; return { ...c, testimonials: n }; })}/>
            <RowButton danger onClick={() => removeItem(i)}>×</RowButton>
          </div>
        ))}
      </Card>

      <Card title="Zitate pro Spieler">
        <LangSwitch value={lang} onChange={setLang}/>
        {items.map((it: any) => (
          <div key={it.user} className="mb-4">
            <TextArea
              label={it.user}
              value={data.translations[lang]?.testimonials?.items?.[it.user] ?? ''}
              onChange={v => setT(lang, x => ({ ...x, testimonials: { ...x.testimonials, items: { ...x.testimonials.items, [it.user]: v }}}))}
              rows={3}
            />
          </div>
        ))}
      </Card>

      <Card title="Sektions-Header">
        <LangSwitch value={lang} onChange={setLang}/>
        <div className="grid sm:grid-cols-2 gap-3">
          <Field label="Eyebrow" value={data.translations[lang]?.testimonials?.eyebrow ?? ''} onChange={v => setT(lang, x => ({ ...x, testimonials: { ...x.testimonials, eyebrow: v }}))}/>
          <Field label="Titel A"  value={data.translations[lang]?.testimonials?.title_a ?? ''} onChange={v => setT(lang, x => ({ ...x, testimonials: { ...x.testimonials, title_a: v }}))}/>
          <Field label="Titel B"  value={data.translations[lang]?.testimonials?.title_b ?? ''} onChange={v => setT(lang, x => ({ ...x, testimonials: { ...x.testimonials, title_b: v }}))}/>
          <Field label="Aside"   value={data.translations[lang]?.testimonials?.aside ?? ''} onChange={v => setT(lang, x => ({ ...x, testimonials: { ...x.testimonials, aside: v }}))}/>
        </div>
      </Card>
    </>
  );
}

/* ─── Gallery ───────────────────────────────────────────────────── */
function GalleryTab({ data, setConfig, setT }: PropsWithLang) {
  const [lang, setLang] = useState<Lang>('en');
  const items = data.config.gallery || [];
  const fileRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [uploadMsg, setUploadMsg] = useState<string | null>(null);

  async function upload(files: FileList | null) {
    if (!files || !files.length) return;
    setBusy(true);
    setUploadMsg(null);
    const results: string[] = [];
    const errors: string[] = [];
    for (const file of Array.from(files)) {
      const form = new FormData();
      form.append('file', file);
      form.append('filename', file.name);
      try {
        const res = await fetch('/api/admin/upload', { method: 'POST', body: form });
        const json = await res.json();
        if (json.ok) {
          results.push(json.path);
        } else {
          errors.push(`${file.name}: ${json.error}`);
        }
      } catch (e) {
        errors.push(`${file.name}: ${String(e)}`);
      }
    }
    if (results.length) {
      setConfig(c => ({
        ...c,
        gallery: [...(c.gallery || []), ...results.map(p => ({ src: p }))],
      }));
      setUploadMsg(`${results.length} Bild${results.length === 1 ? '' : 'er'} hochgeladen`);
    }
    if (errors.length) setUploadMsg([...(results.length ? [`${results.length} OK`] : []), ...errors].join(' · '));
    setBusy(false);
    setTimeout(() => setUploadMsg(null), 5000);
  }

  function move(i: number, delta: number) {
    const j = i + delta;
    if (j < 0 || j >= items.length) return;
    setConfig(c => {
      const n = [...c.gallery];
      [n[i], n[j]] = [n[j], n[i]];
      return { ...c, gallery: n };
    });
  }
  function removeAt(i: number) {
    setConfig(c => ({ ...c, gallery: c.gallery.filter((_: any, idx: number) => idx !== i) }));
  }

  function captionKey(src: string): string {
    const base = src.split('/').pop() ?? '';
    return base.replace(/\.(jpg|jpeg|png|webp|avif|gif)$/i, '');
  }

  return (
    <>
      <H title="Galerie" hint="Bilder per Drag & Drop hochladen. Werden direkt in public/gallery/ gespeichert."/>

      <Card>
        <div
          onDragOver={e => { e.preventDefault(); e.currentTarget.classList.add('border-moss-dark'); }}
          onDragLeave={e => e.currentTarget.classList.remove('border-moss-dark')}
          onDrop={e => { e.preventDefault(); e.currentTarget.classList.remove('border-moss-dark'); upload(e.dataTransfer.files); }}
          onClick={() => fileRef.current?.click()}
          className="border-2 border-dashed border-paper-edge rounded-2xl p-10 text-center cursor-pointer hover:bg-paper transition-colors"
        >
          <p className="font-display text-lg mb-1">Bilder hierhin ziehen oder klicken</p>
          <p className="text-sm text-bark-muted">JPG · PNG · WebP · max 8 MB</p>
          <input
            ref={fileRef}
            type="file"
            multiple
            accept="image/jpeg,image/png,image/webp,image/avif,image/gif"
            onChange={e => upload(e.target.files)}
            className="hidden"
          />
          {busy && <p className="mt-3 text-sm text-moss-dark">Lade hoch…</p>}
          {uploadMsg && <p className="mt-3 text-sm">{uploadMsg}</p>}
        </div>
      </Card>

      <Card title={`Bilder (${items.length})`}>
        {items.length === 0 && <p className="text-bark-muted text-sm">Noch keine Bilder.</p>}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {items.map((it: any, i: number) => {
            const key = captionKey(it.src);
            const caption = data.translations[lang]?.gallery?.captions?.[key] ?? '';
            return (
              <div key={i} className="relative bg-paper border border-paper-edge rounded-xl overflow-hidden">
                <div className="aspect-video bg-paper-edge/40 grid place-items-center">
                  <img src={it.src} alt={key} className="w-full h-full object-cover" onError={(e) => { (e.currentTarget as HTMLImageElement).style.opacity = '0.2'; }}/>
                </div>
                <div className="p-3 flex flex-col gap-2">
                  <code className="text-xs font-mono text-bark-muted truncate" title={it.src}>{it.src}</code>
                  <div className="flex items-center gap-2">
                    <Select label="Größe" value={it.size ?? ''} options={['', 'wide', 'tall', 'big'] as const} onChange={v => setConfig(c => { const n = [...c.gallery]; n[i] = { ...n[i], size: v || undefined }; return { ...c, gallery: n }; })}/>
                  </div>
                  <TextArea
                    label={`Caption (${lang})`}
                    value={caption}
                    rows={2}
                    onChange={v => setT(lang, x => ({ ...x, gallery: { ...x.gallery, captions: { ...x.gallery.captions, [key]: v }}}))}
                  />
                  <div className="flex gap-1.5">
                    <RowButton onClick={() => move(i, -1)}>↑</RowButton>
                    <RowButton onClick={() => move(i, +1)}>↓</RowButton>
                    <div className="flex-1"/>
                    <RowButton danger onClick={() => removeAt(i)}>Entfernen</RowButton>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="mt-4">
          <LangSwitch value={lang} onChange={setLang}/>
        </div>
      </Card>
    </>
  );
}

/* ─── Staff ─────────────────────────────────────────────────────── */
function StaffTab({ data, setConfig, setT }: PropsWithLang) {
  const [lang, setLang] = useState<Lang>('en');
  const items = data.config.staff || [];

  function add() {
    setConfig(c => ({ ...c, staff: [...(c.staff || []), { user: 'NewStaff' + (items.length + 1), role: 'mod' }] }));
  }
  function removeAt(i: number) {
    setConfig(c => ({ ...c, staff: c.staff.filter((_: any, idx: number) => idx !== i) }));
  }

  return (
    <>
      <H title="Team / Staff" hint="Staff-Mitglieder mit Rolle und Bio."/>
      <Card>
        <div className="flex items-center gap-3 mb-4">
          <NumberField label="Anzahl auf der Seite" value={data.config.staffCount ?? 6} onChange={v => setConfig(c => ({ ...c, staffCount: v }))}/>
          <div className="flex-1"/>
          <RowButton onClick={add}>+ Hinzufügen</RowButton>
        </div>

        {items.map((m: any, i: number) => (
          <div key={i} className="grid sm:grid-cols-[1fr_140px_auto] gap-3 items-end mb-3 p-3 bg-paper border border-paper-edge rounded-lg">
            <Field label="Minecraft-Name" value={m.user} onChange={v => setConfig(c => { const n = [...c.staff]; n[i] = { ...n[i], user: v }; return { ...c, staff: n }; })}/>
            <Select label="Rolle" value={m.role ?? 'mod'} options={['owner', 'admin', 'mod', 'builder', 'dev'] as const} onChange={v => setConfig(c => { const n = [...c.staff]; n[i] = { ...n[i], role: v }; return { ...c, staff: n }; })}/>
            <RowButton danger onClick={() => removeAt(i)}>×</RowButton>
          </div>
        ))}
      </Card>

      <Card title="Bios pro Mitglied">
        <LangSwitch value={lang} onChange={setLang}/>
        {items.map((m: any) => {
          const t = data.translations[lang]?.staff?.members?.[m.user] ?? {};
          return (
            <div key={m.user} className="mb-4 pb-4 border-b border-paper-edge last:border-0">
              <h4 className="font-display text-base mb-2">{m.user}</h4>
              <div className="grid sm:grid-cols-3 gap-3">
                <Field label="Tag (Position)" value={t.tag ?? ''} onChange={v => setT(lang, x => ({ ...x, staff: { ...x.staff, members: { ...x.staff.members, [m.user]: { ...t, tag: v }}}}))}/>
                <Field label="Bio"            value={t.bio ?? ''} onChange={v => setT(lang, x => ({ ...x, staff: { ...x.staff, members: { ...x.staff.members, [m.user]: { ...t, bio: v }}}}))}/>
                <Field label="Seit"           value={t.since ?? ''} onChange={v => setT(lang, x => ({ ...x, staff: { ...x.staff, members: { ...x.staff.members, [m.user]: { ...t, since: v }}}}))}/>
              </div>
            </div>
          );
        })}
      </Card>
    </>
  );
}

/* ─── Vote ──────────────────────────────────────────────────────── */
function VoteTab({ data, setConfig, setT }: PropsWithLang) {
  const [lang, setLang] = useState<Lang>('en');
  const items = data.config.voteSites || [];

  return (
    <>
      <H title="Vote-Seiten" hint="Externe Vote-Listings für Reward-Cycle."/>
      <Card>
        <div className="flex items-center gap-3 mb-4">
          <NumberField label="Anzahl auf der Seite" value={data.config.voteCount ?? 5} onChange={v => setConfig(c => ({ ...c, voteCount: v }))}/>
          <div className="flex-1"/>
          <RowButton onClick={() => setConfig(c => ({ ...c, voteSites: [...(c.voteSites || []), { id: 'new-site-' + Date.now(), url: 'https://' }] }))}>+ Hinzufügen</RowButton>
        </div>

        {items.map((s: any, i: number) => (
          <div key={i} className="grid sm:grid-cols-[200px_1fr_auto] gap-3 items-end mb-3 p-3 bg-paper border border-paper-edge rounded-lg">
            <Field label="ID (slug)" value={s.id}  onChange={v => setConfig(c => { const n = [...c.voteSites]; n[i] = { ...n[i], id: v }; return { ...c, voteSites: n }; })}/>
            <Field label="URL"        value={s.url} onChange={v => setConfig(c => { const n = [...c.voteSites]; n[i] = { ...n[i], url: v }; return { ...c, voteSites: n }; })}/>
            <RowButton danger onClick={() => setConfig(c => ({ ...c, voteSites: c.voteSites.filter((_: any, idx: number) => idx !== i) }))}>×</RowButton>
          </div>
        ))}
      </Card>

      <Card title="Anzeigename pro Seite">
        <LangSwitch value={lang} onChange={setLang}/>
        {items.map((s: any) => (
          <Field key={s.id} label={s.id} value={data.translations[lang]?.vote?.sites?.[s.id] ?? ''} onChange={v => setT(lang, x => ({ ...x, vote: { ...x.vote, sites: { ...x.vote.sites, [s.id]: v }}}))}/>
        ))}
      </Card>

      <Card title="Reward-Zeile">
        <LangSwitch value={lang} onChange={setLang}/>
        <Field label="Reward-Zeile" value={data.translations[lang]?.vote?.reward_line ?? ''} onChange={v => setT(lang, x => ({ ...x, vote: { ...x.vote, reward_line: v }}))}/>
      </Card>
    </>
  );
}

/* ─── Roadmap ───────────────────────────────────────────────────── */
function RoadmapTab({ data, setConfig, setT }: PropsWithLang) {
  const [lang, setLang] = useState<Lang>('en');
  const items = data.config.roadmap || [];

  return (
    <>
      <H title="Roadmap" hint="Quartale mit Status und Beschreibung."/>
      <Card>
        <div className="flex items-center gap-3 mb-4">
          <NumberField label="Anzahl auf der Seite" value={data.config.roadmapCount ?? 5} onChange={v => setConfig(c => ({ ...c, roadmapCount: v }))}/>
          <div className="flex-1"/>
          <RowButton onClick={() => setConfig(c => ({ ...c, roadmap: [...(c.roadmap || []), { when: 'q1-2027', status: 'later' }] }))}>+ Hinzufügen</RowButton>
        </div>

        {items.map((r: any, i: number) => (
          <div key={i} className="grid sm:grid-cols-[200px_180px_auto] gap-3 items-end mb-3 p-3 bg-paper border border-paper-edge rounded-lg">
            <Field label="Wann (Slug, z.B. q2-2026)" value={r.when} onChange={v => setConfig(c => { const n = [...c.roadmap]; n[i] = { ...n[i], when: v }; return { ...c, roadmap: n }; })}/>
            <Select label="Status" value={r.status ?? 'later'} options={['done', 'now', 'next', 'later'] as const} onChange={v => setConfig(c => { const n = [...c.roadmap]; n[i] = { ...n[i], status: v }; return { ...c, roadmap: n }; })}/>
            <RowButton danger onClick={() => setConfig(c => ({ ...c, roadmap: c.roadmap.filter((_: any, idx: number) => idx !== i) }))}>×</RowButton>
          </div>
        ))}
      </Card>

      <Card title="Texte pro Eintrag">
        <LangSwitch value={lang} onChange={setLang}/>
        {items.map((r: any) => {
          const t = data.translations[lang]?.roadmap?.items?.[r.when] ?? {};
          return (
            <div key={r.when} className="mb-4 pb-4 border-b border-paper-edge last:border-0">
              <h4 className="font-mono text-xs uppercase tracking-[0.16em] text-bark-muted mb-2">{r.when}</h4>
              <div className="grid sm:grid-cols-2 gap-3">
                <Field label="Titel" value={t.title ?? ''} onChange={v => setT(lang, x => ({ ...x, roadmap: { ...x.roadmap, items: { ...x.roadmap.items, [r.when]: { ...t, title: v }}}}))}/>
                <Field label="Beschreibung" value={t.desc ?? ''} onChange={v => setT(lang, x => ({ ...x, roadmap: { ...x.roadmap, items: { ...x.roadmap.items, [r.when]: { ...t, desc: v }}}}))}/>
              </div>
            </div>
          );
        })}
      </Card>
    </>
  );
}

/* ─── Comparison ────────────────────────────────────────────────── */
function ComparisonTab({ data, setConfig, setT }: PropsWithLang) {
  const [lang, setLang] = useState<Lang>('en');
  const rows = data.config.comparison || [];

  return (
    <>
      <H title="Vergleichstabelle" hint="Du vs. typischer Server. Werte: true = ja, false = nein, oder ein eigener Text."/>
      <Card>
        <RowButton onClick={() => setConfig(c => ({ ...c, comparison: [...(c.comparison || []), { id: 'new-feature-' + Date.now(), us: true, others: false }] }))}>+ Zeile hinzufügen</RowButton>
        <div className="mt-4 space-y-3">
          {rows.map((r: any, i: number) => (
            <div key={i} className="grid sm:grid-cols-[1fr_180px_180px_auto] gap-3 items-end p-3 bg-paper border border-paper-edge rounded-lg">
              <Field label="ID (slug)"            value={r.id} onChange={v => setConfig(c => { const n = [...c.comparison]; n[i] = { ...n[i], id: v }; return { ...c, comparison: n }; })}/>
              <Field label="Du (true/false/Text)" value={String(r.us)}     onChange={v => setConfig(c => { const n = [...c.comparison]; n[i] = { ...n[i], us: v === 'true' ? true : v === 'false' ? false : v }; return { ...c, comparison: n }; })}/>
              <Field label="Andere"                value={String(r.others)} onChange={v => setConfig(c => { const n = [...c.comparison]; n[i] = { ...n[i], others: v === 'true' ? true : v === 'false' ? false : v }; return { ...c, comparison: n }; })}/>
              <RowButton danger onClick={() => setConfig(c => ({ ...c, comparison: c.comparison.filter((_: any, idx: number) => idx !== i) }))}>×</RowButton>
            </div>
          ))}
        </div>
      </Card>

      <Card title="Zeilen-Labels">
        <LangSwitch value={lang} onChange={setLang}/>
        {rows.map((r: any) => (
          <Field key={r.id} label={r.id} value={data.translations[lang]?.comparison?.rows?.[r.id] ?? ''} onChange={v => setT(lang, x => ({ ...x, comparison: { ...x.comparison, rows: { ...x.comparison.rows, [r.id]: v }}}))}/>
        ))}
      </Card>
    </>
  );
}

/* ─── FAQ ───────────────────────────────────────────────────────── */
function FaqTab({ data, setConfig, setT }: PropsWithLang) {
  const [lang, setLang] = useState<Lang>('en');
  const count = data.config.faqCount ?? 6;

  return (
    <>
      <H title="FAQ" hint="Häufig gestellte Fragen."/>
      <Card>
        <NumberField label="Anzahl Fragen" value={count} onChange={v => setConfig(c => ({ ...c, faqCount: Math.max(1, Math.min(20, v)) }))}/>
      </Card>

      <Card title="Fragen & Antworten">
        <LangSwitch value={lang} onChange={setLang}/>
        {Array.from({ length: count }).map((_, i) => {
          const n = i + 1;
          const qKey = `q${n}`;
          const aKey = `a${n}`;
          return (
            <div key={n} className="mb-4 pb-4 border-b border-paper-edge last:border-0">
              <Field label={`Frage ${n}`}    value={data.translations[lang]?.faq?.[qKey] ?? ''} onChange={v => setT(lang, x => ({ ...x, faq: { ...x.faq, [qKey]: v }}))}/>
              <div className="mt-2"/>
              <TextArea label={`Antwort ${n}`} value={data.translations[lang]?.faq?.[aKey] ?? ''} onChange={v => setT(lang, x => ({ ...x, faq: { ...x.faq, [aKey]: v }}))} rows={3}/>
            </div>
          );
        })}
      </Card>
    </>
  );
}

/* ─── Texts ─────────────────────────────────────────────────────── */
function TextsTab({ data, setT }: PropsTextsOnly) {
  const [lang, setLang] = useState<Lang>('en');
  const t = data.translations[lang] || {};

  const sections: Array<{ key: keyof typeof t; title: string; fields: Array<{ k: string; rows?: number }> }> = [
    { key: 'hero' as any, title: 'Hero', fields: [
      { k: 'eyebrow' }, { k: 'title_a' }, { k: 'title_b' },
      { k: 'lede', rows: 3 }, { k: 'ip_label' }, { k: 'copy' }, { k: 'copied' },
      { k: 'cta_discord' }, { k: 'online_suffix' }, { k: 'uptime' },
      { k: 'trust_a' }, { k: 'trust_b' }, { k: 'trust_c' },
    ]},
    { key: 'cta' as any, title: 'CTA-Band', fields: [{ k: 'eyebrow' }, { k: 'title_a' }, { k: 'title_b' }] },
    { key: 'newsletter' as any, title: 'Newsletter', fields: [
      { k: 'eyebrow' }, { k: 'title_a' }, { k: 'title_b' }, { k: 'aside', rows: 2 },
      { k: 'placeholder_email' }, { k: 'placeholder_username' }, { k: 'submit' }, { k: 'sending' },
      { k: 'success' }, { k: 'error' }, { k: 'privacy', rows: 2 },
    ]},
    { key: 'nav' as any, title: 'Navigation', fields: [
      { k: 'worlds' }, { k: 'realm' }, { k: 'ranks' }, { k: 'faq' },
      { k: 'gallery' }, { k: 'staff' }, { k: 'vote' }, { k: 'roadmap' }, { k: 'community' },
    ]},
    { key: 'footer' as any, title: 'Footer', fields: [
      { k: 'tag', rows: 3 }, { k: 'realm' }, { k: 'community' }, { k: 'legal' }, { k: 'explore' },
      { k: 'discord' }, { k: 'forums' }, { k: 'map' }, { k: 'vote' },
      { k: 'gallery' }, { k: 'staff' }, { k: 'roadmap' },
      { k: 'privacy' }, { k: 'terms' }, { k: 'refund' }, { k: 'eula' },
      { k: 'copyright', rows: 2 }, { k: 'made' },
    ]},
    { key: 'discord' as any, title: 'Discord-Sektion', fields: [
      { k: 'eyebrow' }, { k: 'title_a' }, { k: 'title_b' }, { k: 'aside', rows: 2 },
      { k: 'join' }, { k: 'disabled_note', rows: 2 },
    ]},
  ];

  return (
    <>
      <H title="Texte" hint="Marketing-Copy: Hero, CTA-Band, Newsletter, Nav, Footer."/>
      <LangSwitch value={lang} onChange={setLang}/>
      {sections.map(sec => (
        <Card key={sec.title as string} title={sec.title}>
          <div className="grid sm:grid-cols-2 gap-3">
            {sec.fields.map(f => f.rows ? (
              <div key={f.k} className="sm:col-span-2">
                <TextArea label={f.k} value={(t as any)[sec.key]?.[f.k] ?? ''} rows={f.rows} onChange={v => setT(lang, x => ({ ...x, [sec.key]: { ...(x as any)[sec.key], [f.k]: v }}))}/>
              </div>
            ) : (
              <Field key={f.k} label={f.k} value={(t as any)[sec.key]?.[f.k] ?? ''} onChange={v => setT(lang, x => ({ ...x, [sec.key]: { ...(x as any)[sec.key], [f.k]: v }}))}/>
            ))}
          </div>
        </Card>
      ))}
    </>
  );
}

/* ─── Settings ──────────────────────────────────────────────────── */
function SettingsTab({ data, setConfig }: PropsConfigOnly) {
  const c = data.config;
  return (
    <>
      <H title="Einstellungen" hint="Theme, Sprache, SEO, Analytics."/>
      <Card title="Sprache & Theme">
        <div className="grid sm:grid-cols-2 gap-4">
          <Select label="Standard-Theme" value={c.defaultTheme ?? 'light'} options={['light', 'dark'] as const} onChange={v => setConfig(x => ({ ...x, defaultTheme: v }))}/>
          <Select label="Standard-Sprache" value={c.defaultLang ?? 'en'} options={['en', 'de', 'es'] as const} onChange={v => setConfig(x => ({ ...x, defaultLang: v }))}/>
        </div>
      </Card>

      <Card title="SEO">
        <Field label="Site-URL (canonical)" value={c.siteUrl ?? ''} onChange={v => setConfig(x => ({ ...x, siteUrl: v }))}/>
      </Card>

      <Card title="Features umschalten">
        <Toggle label="Newsletter-Sektion anzeigen" value={!!c.enableNewsletter} onChange={v => setConfig(x => ({ ...x, enableNewsletter: v }))}/>
      </Card>

      <Card title="Analytics (Plausible / Umami)">
        <div className="grid sm:grid-cols-2 gap-3">
          <Select label="Provider" value={c.analytics?.provider ?? ''} options={['', 'plausible', 'umami'] as const} onChange={v => setConfig(x => ({ ...x, analytics: { ...x.analytics, provider: v || null }}))}/>
          <Field label="Domain (Plausible)" value={c.analytics?.domain ?? ''} onChange={v => setConfig(x => ({ ...x, analytics: { ...x.analytics, domain: v }}))}/>
          <Field label="Script-URL" value={c.analytics?.scriptUrl ?? ''} onChange={v => setConfig(x => ({ ...x, analytics: { ...x.analytics, scriptUrl: v }}))}/>
          <Field label="Website-ID (Umami)" value={c.analytics?.websiteId ?? ''} onChange={v => setConfig(x => ({ ...x, analytics: { ...x.analytics, websiteId: v }}))}/>
        </div>
      </Card>
    </>
  );
}
