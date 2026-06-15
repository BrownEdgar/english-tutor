/**
 * One-off: ensure every entry in src/top500/data.js has `hy` and `exhy`
 * (empty string when missing). Rewrites the file with a stable key order.
 */
import { writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { words } from '../src/top500/data.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const outPath = join(__dirname, '../src/top500/data.js');

const KEY_ORDER = ['en', 'ipa', 'ru', 'hy', 'ex', 'exhy', 'cat', 'level'];

function literal(value) {
  return JSON.stringify(value);
}

function formatWord(w) {
  const merged = { ...w, hy: w.hy ?? '', exhy: w.exhy ?? '' };
  const used = new Set();
  const lines = [];

  for (const key of KEY_ORDER) {
    if (!(key in merged)) continue;
    lines.push(`    ${key}: ${literal(merged[key])},`);
    used.add(key);
  }

  for (const key of Object.keys(merged).sort()) {
    if (used.has(key)) continue;
    lines.push(`    ${key}: ${literal(merged[key])},`);
    used.add(key);
  }

  return ['  {', ...lines, '  }'].join('\n');
}

const body = words.map(formatWord).join(',\n');
const fileContent = `export const words = [\n${body},\n];\n`;

writeFileSync(outPath, fileContent, 'utf8');
console.log(`Wrote ${words.length} entries to ${outPath}`);
