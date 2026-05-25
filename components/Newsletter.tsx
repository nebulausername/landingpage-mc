'use client';

import { useState } from 'react';
import { useLang } from '@/lib/providers';
import { config } from '@/lib/config';

type State = 'idle' | 'sending' | 'success' | 'error';

export default function Newsletter() {
  const { t } = useLang();
  const n = t.newsletter as any;
  const [state, setState] = useState<State>('idle');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');

  if (!config.enableNewsletter) return null;

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (state === 'sending') return;
    setState('sending');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, username }),
      });
      if (!res.ok) throw new Error('failed');
      setState('success');
      setEmail('');
      setUsername('');
    } catch {
      setState('error');
    }
  }

  return (
    <section id="newsletter" className="py-24 sm:py-32 bg-cream-soft border-y border-paper-edge">
      <div className="max-w-wrap mx-auto px-4 sm:px-6">
        <div className="max-w-3xl mx-auto text-center">
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-bark-muted mb-3">{n.eyebrow}</p>
          <h2 className="font-display text-5xl sm:text-6xl font-medium leading-[1.05] tracking-tight mb-5">
            {n.title_a} <em className="italic text-moss-dark">{n.title_b}</em>
          </h2>
          <p className="text-lg text-bark-soft mb-8">{n.aside}</p>

          <form onSubmit={onSubmit} className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto" noValidate>
            <input
              type="email"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder={n.placeholder_email}
              aria-label={n.placeholder_email}
              autoComplete="email"
              className="flex-1 min-w-0 px-4 py-3 bg-paper border border-paper-edge rounded-xl placeholder:text-bark-muted focus-visible:outline-none focus-visible:border-moss-dark"
            />
            <button
              type="submit"
              disabled={state === 'sending'}
              className="px-6 py-3 bg-bark text-cream-soft rounded-xl font-semibold hover:bg-moss-dark transition-colors disabled:opacity-50"
            >
              {state === 'sending' ? n.sending : n.submit}
            </button>
          </form>

          {/* Optional second field (Minecraft username) — hidden by default to keep the form lean */}
          <input
            type="text"
            value={username}
            onChange={e => setUsername(e.target.value)}
            placeholder={n.placeholder_username}
            aria-label={n.placeholder_username}
            className="mt-3 max-w-xl mx-auto block w-full px-4 py-2.5 bg-paper border border-paper-edge rounded-xl text-sm placeholder:text-bark-muted focus-visible:outline-none focus-visible:border-moss-dark"
          />

          <p className="mt-4 text-xs text-bark-muted">{n.privacy}</p>

          {state === 'success' && (
            <p className="mt-5 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-moss text-cream-soft text-sm font-medium animate-fade-in">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 8l3 3 7-7"/></svg>
              {n.success}
            </p>
          )}
          {state === 'error' && (
            <p className="mt-5 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-rust/15 text-rust text-sm font-medium animate-fade-in">
              {n.error}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
