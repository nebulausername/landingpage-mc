import { NextRequest, NextResponse } from 'next/server';
import fs from 'node:fs/promises';
import path from 'node:path';
import { isAuthed } from '@/lib/admin/auth';
import { serializeConfig, serializeTranslations } from '@/lib/admin/serialize';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

interface Body {
  config?: unknown;
  translations?: Record<string, unknown>;
}

export async function POST(req: NextRequest) {
  if (!isAuthed(req)) {
    return NextResponse.json({ ok: false, error: 'unauthorized' }, { status: 401 });
  }

  let body: Body;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'bad_request' }, { status: 400 });
  }

  if (!body.config || !body.translations) {
    return NextResponse.json({ ok: false, error: 'missing_fields' }, { status: 400 });
  }

  const root = process.cwd();
  const written: string[] = [];

  try {
    // Write config.ts
    const configPath = path.join(root, 'lib', 'config.ts');
    await fs.writeFile(configPath, serializeConfig(body.config), 'utf8');
    written.push('lib/config.ts');

    // Write each translation file
    for (const [lang, t] of Object.entries(body.translations)) {
      if (!/^[a-z]{2}$/.test(lang)) continue; // only ISO-2 codes
      const dst = path.join(root, 'lib', 'translations', `${lang}.ts`);
      await fs.writeFile(dst, serializeTranslations(t), 'utf8');
      written.push(`lib/translations/${lang}.ts`);
    }
  } catch (err) {
    console.error('[admin/save]', err);
    return NextResponse.json({
      ok: false,
      error: 'write_failed',
      detail: err instanceof Error ? err.message : String(err),
      written,
    }, { status: 500 });
  }

  return NextResponse.json({ ok: true, written });
}
