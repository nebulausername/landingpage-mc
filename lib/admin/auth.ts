import { createHmac, timingSafeEqual } from 'node:crypto';
import type { NextRequest } from 'next/server';

/* ═══════════════════════════════════════════════════════════════════
   Admin auth — HMAC-signed cookie session
   ═══════════════════════════════════════════════════════════════════
   - Requires ADMIN_PASSWORD env var. Unset → admin disabled.
   - Cookie value: `<issued-at>.<hmac>` — HMAC keyed by the password
     itself, so rotating the password invalidates all sessions.
   - 7-day expiry. HttpOnly, SameSite=Strict. */

export const COOKIE_NAME = 'admin_session';
const MAX_AGE_S = 60 * 60 * 24 * 7;

export function adminEnabled(): boolean {
  return !!process.env.ADMIN_PASSWORD && process.env.ADMIN_PASSWORD.length >= 6;
}

function getSecret(): string {
  return process.env.ADMIN_PASSWORD || '';
}

export function checkPassword(password: unknown): boolean {
  if (typeof password !== 'string') return false;
  const expected = getSecret();
  if (!expected) return false;
  const a = Buffer.from(password);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;
  try {
    return timingSafeEqual(a, b);
  } catch {
    return false;
  }
}

function sign(value: string): string {
  const hmac = createHmac('sha256', getSecret());
  hmac.update(value);
  return `${value}.${hmac.digest('hex')}`;
}

export function createSessionToken(): string {
  return sign(String(Date.now()));
}

export function verifySessionToken(signed: string | undefined): boolean {
  if (!signed || !adminEnabled()) return false;
  const [value, sig] = signed.split('.');
  if (!value || !sig) return false;
  const hmac = createHmac('sha256', getSecret());
  hmac.update(value);
  const expected = hmac.digest('hex');
  try {
    const equal = timingSafeEqual(Buffer.from(sig, 'hex'), Buffer.from(expected, 'hex'));
    if (!equal) return false;
  } catch {
    return false;
  }
  const issuedMs = parseInt(value, 10);
  if (!Number.isFinite(issuedMs)) return false;
  return Date.now() - issuedMs < MAX_AGE_S * 1000;
}

export function isAuthed(req: NextRequest): boolean {
  return verifySessionToken(req.cookies.get(COOKIE_NAME)?.value);
}

export function sessionCookieHeader(token: string): string {
  return `${COOKIE_NAME}=${token}; Path=/; HttpOnly; SameSite=Strict; Max-Age=${MAX_AGE_S}`;
}

export function clearCookieHeader(): string {
  return `${COOKIE_NAME}=; Path=/; HttpOnly; SameSite=Strict; Max-Age=0`;
}
