import { NextRequest, NextResponse } from 'next/server';

/* ═══════════════════════════════════════════════════════════════════
   POST /api/contact  ·  Newsletter / lead capture
   ═══════════════════════════════════════════════════════════════════
   Forwards submissions to a Discord webhook (set CONTACT_WEBHOOK_URL
   in .env.local). Falls back to in-memory log if no webhook is set so
   the form still "works" in local dev.

   Rate-limit: a tiny in-memory bucket per IP (best-effort, resets on
   server restart — enough for a marketing site, not a bank). */

interface Body {
  email?: unknown;
  username?: unknown;
}

const ipBucket = new Map<string, { count: number; firstAt: number }>();
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 5;

function rateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = ipBucket.get(ip);
  if (!entry || now - entry.firstAt > WINDOW_MS) {
    ipBucket.set(ip, { count: 1, firstAt: now });
    return true;
  }
  entry.count += 1;
  return entry.count <= MAX_PER_WINDOW;
}

function isEmail(s: unknown): s is string {
  return typeof s === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s) && s.length < 200;
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
  if (!rateLimit(ip)) {
    return NextResponse.json({ ok: false, error: 'rate_limited' }, { status: 429 });
  }

  let body: Body;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'bad_request' }, { status: 400 });
  }

  if (!isEmail(body.email)) {
    return NextResponse.json({ ok: false, error: 'invalid_email' }, { status: 400 });
  }
  const username = typeof body.username === 'string' && body.username.length < 64
    ? body.username
    : '';

  const webhook = process.env.CONTACT_WEBHOOK_URL;
  if (webhook) {
    try {
      const res = await fetch(webhook, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: 'Landing newsletter',
          embeds: [{
            title: 'New newsletter signup',
            color: 0x5a7a3a,
            fields: [
              { name: 'Email',    value: body.email,                inline: true  },
              { name: 'Username', value: username || '—',           inline: true  },
              { name: 'IP',       value: ip,                        inline: false },
              { name: 'At',       value: new Date().toISOString(),  inline: false },
            ],
          }],
        }),
      });
      if (!res.ok) throw new Error('webhook failed: ' + res.status);
    } catch (err) {
      console.error('[contact]', err);
      return NextResponse.json({ ok: false, error: 'forward_failed' }, { status: 502 });
    }
  } else {
    // Dev fallback — log to server console so you can wire it up later
    console.log('[contact] signup', { email: body.email, username, ip });
  }

  return NextResponse.json({ ok: true });
}
