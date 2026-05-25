/* Generate TypeScript source from edited state.
   - Produces stable, diff-friendly output
   - Uses unquoted identifier keys where safe (more idiomatic) */

const ID_RE = /^[a-zA-Z_$][a-zA-Z0-9_$]*$/;

function indent(n: number): string {
  return '  '.repeat(n);
}

function stringifyValue(value: unknown, depth: number): string {
  if (value === null) return 'null';
  if (value === undefined) return 'undefined';
  if (typeof value === 'string') return JSON.stringify(value);
  if (typeof value === 'number' || typeof value === 'boolean') return String(value);

  if (Array.isArray(value)) {
    if (value.length === 0) return '[]';
    const allPrim = value.every(v => v === null || ['string', 'number', 'boolean'].includes(typeof v));
    if (allPrim && value.length <= 6) {
      return `[${value.map(v => stringifyValue(v, depth)).join(', ')}]`;
    }
    const lines = value.map(v => `${indent(depth + 1)}${stringifyValue(v, depth + 1)}`);
    return `[\n${lines.join(',\n')},\n${indent(depth)}]`;
  }

  if (typeof value === 'object') {
    const entries = Object.entries(value as Record<string, unknown>);
    if (entries.length === 0) return '{}';
    const lines = entries.map(([k, v]) => {
      const key = ID_RE.test(k) ? k : JSON.stringify(k);
      return `${indent(depth + 1)}${key}: ${stringifyValue(v, depth + 1)}`;
    });
    return `{\n${lines.join(',\n')},\n${indent(depth)}}`;
  }

  return JSON.stringify(value);
}

export function serializeConfig(config: unknown): string {
  return `import type { SiteConfig } from './types';

/* ═══════════════════════════════════════════════════════════════════
   🌳 SERVER CONFIG  ·  Managed by the admin panel — also editable
   here by hand. The file is re-generated when admins click Save.
   ═══════════════════════════════════════════════════════════════════ */

export const config: SiteConfig = ${stringifyValue(config, 0)};
`;
}

export function serializeTranslations(t: unknown): string {
  return `import type { Translations } from '../types';

/* Managed by the admin panel — also editable here by hand. */

const t: Translations = ${stringifyValue(t, 0)};

export default t;
`;
}
