const CACHE = 'drone-dashboard-shell-v0.2.0';
const SHELL = ['./', './index.html', './style.css', './app.mjs', './contracts.mjs', './tools.mjs'];
self.addEventListener('install', event => event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(SHELL)).then(() => self.skipWaiting())));
self.addEventListener('activate', event => event.waitUntil(self.clients.claim()));
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);
  if (event.request.method !== 'GET' || url.origin !== self.location.origin || !SHELL.some(path => new URL(path, self.location).pathname === url.pathname)) return;
  event.respondWith(fetch(event.request).catch(async () => (await caches.open(CACHE)).match(url.pathname)));
});
