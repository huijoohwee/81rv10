const PREFIX = 'drone-dashboard-shell-';
const CACHE = `${PREFIX}v0.3.1-evidence`;
const SHELL = ['./', './index.html', './style.css', './app.mjs', './contracts.mjs', './tools.mjs',
  './evidence-kernel.mjs', './evidence-replay.mjs', './evidence-view.mjs',
  './profiles/aviation-v1.json', './profiles/workspaces.json', './fixtures/aviation-synthetic-v1.json'];
self.addEventListener('install', event => event.waitUntil(
  caches.open(CACHE).then(cache => cache.addAll(SHELL)).then(() => self.skipWaiting())));
self.addEventListener('activate', event => event.waitUntil((async () => {
  for (const key of await caches.keys()) if (key.startsWith(PREFIX) && key !== CACHE) await caches.delete(key);
  await self.clients.claim();
})()));
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);
  if (event.request.method !== 'GET' || url.origin !== self.location.origin || !SHELL.some(path => new URL(path, self.location).pathname === url.pathname)) return;
  // A provisioned revision is an atomic asset set; explicit preparation installs updates.
  event.respondWith((async () => {
    let cached;
    try { cached = await (await caches.open(CACHE)).match(url.pathname); } catch { /* Online fallback; offline preparation reports storage errors. */ }
    return cached || fetch(event.request);
  })());
});
