import { createServer } from 'node:http';
import { readFile, realpath } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { resolve, sep } from 'node:path';

const root = await realpath(fileURLToPath(new URL('./app/', import.meta.url)));
const types = { html: 'text/html', mjs: 'text/javascript', css: 'text/css', json: 'application/json' };
export const server = createServer(async (req, res) => {
  try {
    if (!['GET', 'HEAD'].includes(req.method)) { res.writeHead(405); res.end(); return; }
    const path = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
    const selected = await realpath(resolve(root, '.' + (path === '/' ? '/index.html' : path)));
    if (!selected.startsWith(root + sep)) throw new Error('Outside public root');
    const body = await readFile(selected);
    res.writeHead(200, { 'Content-Type': `${types[selected.split('.').at(-1)] || 'application/octet-stream'}; charset=utf-8`,
      'Cache-Control': 'no-cache', 'X-Content-Type-Options': 'nosniff', 'Referrer-Policy': 'no-referrer',
      'Content-Security-Policy': "default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self' blob:; connect-src 'self'; frame-src http://127.0.0.1:* http://localhost:* https:; object-src 'none'; base-uri 'none'; form-action 'self'; frame-ancestors 'none'" });
    res.end(req.method === 'HEAD' ? undefined : body);
  } catch { res.writeHead(404); res.end('Not found'); }
});
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  server.listen(Number(process.env.DRONE_DASHBOARD_PORT || 4199), '127.0.0.1', () => {
    console.log(`Agentic Drone Dashboard: http://127.0.0.1:${server.address().port}/`);
  });
}
