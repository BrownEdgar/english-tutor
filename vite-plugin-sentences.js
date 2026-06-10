import { readFileSync, writeFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DATA_FILE = resolve(__dirname, 'src/sentences/data.js');

function formatEntry(item) {
  const en = JSON.stringify(item.en);
  const am = JSON.stringify(item.am || '');
  const hl = JSON.stringify(item.hl || []);
  return `  { id: ${item.id}, en: ${en}, am: ${am}, hl: ${hl} },`;
}

export function sentencesPlugin() {
  return {
    name: 'vite-plugin-sentences',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (req.url !== '/api/sentences-sync' || req.method !== 'POST') {
          return next();
        }

        let body = '';
        req.on('data', (chunk) => (body += chunk));
        req.on('end', () => {
          try {
            const sentences = JSON.parse(body);
            if (!Array.isArray(sentences) || sentences.length === 0) {
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ synced: 0 }));
              return;
            }

            let content = readFileSync(DATA_FILE, 'utf-8');
            const marker = '\n];';
            const idx = content.lastIndexOf(marker);
            if (idx === -1) throw new Error('data.js format not recognized');

            const newEntries = sentences.map(formatEntry).join('\n');
            content =
              content.slice(0, idx) +
              '\n' +
              newEntries +
              '\n' +
              marker +
              content.slice(idx + marker.length);

            writeFileSync(DATA_FILE, content);

            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ synced: sentences.length }));
          } catch (err) {
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ error: err.message }));
          }
        });
      });
    },
  };
}
