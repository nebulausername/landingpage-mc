'use client';

import { useState } from 'react';

export default function LoginForm({ enabled }: { enabled: boolean }) {
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setErr(null);
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      const json = await res.json();
      if (json.ok) {
        window.location.reload();
      } else {
        setErr(json.error === 'wrong_password' ? 'Falsches Passwort' : json.error === 'admin_disabled' ? 'Admin ist deaktiviert (ADMIN_PASSWORD nicht gesetzt)' : 'Login fehlgeschlagen');
      }
    } catch {
      setErr('Netzwerk-Fehler');
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="min-h-screen grid place-items-center bg-cream p-4">
      <form onSubmit={submit} className="w-full max-w-sm bg-cream-soft border border-paper-edge rounded-2xl p-8 shadow-lg">
        <h1 className="font-display text-3xl font-medium mb-1">Admin</h1>
        <p className="text-sm text-bark-muted mb-6">landing-mc Verwaltung</p>

        {!enabled && (
          <div className="mb-5 text-sm bg-amber/15 text-bark border border-amber/40 rounded-lg p-3">
            <strong className="block mb-1">Admin ist deaktiviert.</strong>
            Setze die Environment Variable <code className="font-mono">ADMIN_PASSWORD</code> (min. 6 Zeichen) und starte neu.
          </div>
        )}

        <label className="block text-sm font-medium mb-2">Passwort</label>
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          autoFocus
          disabled={!enabled}
          className="w-full px-4 py-3 bg-paper border border-paper-edge rounded-xl focus-visible:outline-none focus-visible:border-moss-dark disabled:opacity-50"
        />

        {err && <p className="mt-3 text-sm text-rust">{err}</p>}

        <button
          type="submit"
          disabled={busy || !enabled || !password}
          className="mt-5 w-full px-5 py-3 bg-bark text-cream-soft rounded-xl font-semibold hover:bg-moss-dark transition-colors disabled:opacity-50"
        >
          {busy ? 'Anmelden…' : 'Anmelden'}
        </button>

        <a href="/" className="mt-4 block text-center text-xs text-bark-muted hover:text-moss-dark">← zurück zur Website</a>
      </form>
    </div>
  );
}
