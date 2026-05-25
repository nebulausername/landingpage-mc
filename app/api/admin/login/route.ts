import { NextRequest, NextResponse } from 'next/server';
import { adminEnabled, checkPassword, createSessionToken, sessionCookieHeader } from '@/lib/admin/auth';

export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  if (!adminEnabled()) {
    return NextResponse.json({ ok: false, error: 'admin_disabled' }, { status: 503 });
  }
  let password: unknown;
  try {
    const body = await req.json();
    password = body?.password;
  } catch {
    return NextResponse.json({ ok: false, error: 'bad_request' }, { status: 400 });
  }
  if (!checkPassword(password)) {
    return NextResponse.json({ ok: false, error: 'wrong_password' }, { status: 401 });
  }
  const token = createSessionToken();
  return new NextResponse(JSON.stringify({ ok: true }), {
    status: 200,
    headers: { 'Content-Type': 'application/json', 'Set-Cookie': sessionCookieHeader(token) },
  });
}
