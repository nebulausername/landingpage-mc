import { NextRequest, NextResponse } from 'next/server';
import fs from 'node:fs/promises';
import path from 'node:path';
import { isAuthed } from '@/lib/admin/auth';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const MAX_BYTES = 8 * 1024 * 1024;
const ALLOWED_EXT = new Set(['.jpg', '.jpeg', '.png', '.webp', '.avif', '.gif']);

function sanitize(name: string): string {
  const base = name.replace(/\\/g, '/').split('/').pop() || 'image';
  return base
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9._-]/g, '')
    .slice(0, 80);
}

export async function POST(req: NextRequest) {
  if (!isAuthed(req)) {
    return NextResponse.json({ ok: false, error: 'unauthorized' }, { status: 401 });
  }

  const form = await req.formData().catch(() => null);
  if (!form) return NextResponse.json({ ok: false, error: 'bad_form' }, { status: 400 });

  const file = form.get('file');
  const givenName = form.get('filename');

  if (!(file instanceof File)) {
    return NextResponse.json({ ok: false, error: 'no_file' }, { status: 400 });
  }
  if (file.size > MAX_BYTES) {
    return NextResponse.json({ ok: false, error: 'too_large', max: MAX_BYTES }, { status: 413 });
  }

  const name = sanitize(typeof givenName === 'string' && givenName ? givenName : file.name);
  const ext = path.extname(name).toLowerCase();
  if (!ALLOWED_EXT.has(ext)) {
    return NextResponse.json({ ok: false, error: 'bad_extension', allowed: [...ALLOWED_EXT] }, { status: 400 });
  }

  const bytes = new Uint8Array(await file.arrayBuffer());
  const galleryDir = path.join(process.cwd(), 'public', 'gallery');

  try {
    await fs.mkdir(galleryDir, { recursive: true });
    const dst = path.join(galleryDir, name);
    await fs.writeFile(dst, bytes);
    return NextResponse.json({ ok: true, path: `/gallery/${name}`, bytes: bytes.length });
  } catch (err) {
    console.error('[admin/upload]', err);
    return NextResponse.json({
      ok: false,
      error: 'write_failed',
      detail: err instanceof Error ? err.message : String(err),
      hint: 'On Vercel the filesystem is read-only — upload images to public/gallery via git instead, or wire BLOB_READ_WRITE_TOKEN for Vercel Blob support.',
    }, { status: 500 });
  }
}
