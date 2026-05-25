import { NextRequest, NextResponse } from 'next/server';
import { isAuthed } from '@/lib/admin/auth';
import { config } from '@/lib/config';
import en from '@/lib/translations/en';
import de from '@/lib/translations/de';
import es from '@/lib/translations/es';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  if (!isAuthed(req)) {
    return NextResponse.json({ ok: false, error: 'unauthorized' }, { status: 401 });
  }
  return NextResponse.json({
    ok: true,
    config,
    translations: { en, de, es },
  });
}
