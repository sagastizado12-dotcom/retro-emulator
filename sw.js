// Service worker: app shell precache + cache-first EmulatorJS cores
const VERSION = 'v1';
const SHELL_CACHE = 'retro-shell-' + VERSION;
const CORE_CACHE = 'retro-cores-v1'; // cores are versioned by EmulatorJS release (4.2.3)
const SHELL = [
  './',
  'app.js',
  'consoles.js',
  'db.js',
  'icons/icon-180.png',
  'icons/icon-192.png',
  'icons/icon-512.png',
  'index.html',
  'manifest.webmanifest',
  'play.html',
  'play.js',
  'style.css',
  'data/loader.js',
  'data/emulator.min.js',
  'data/emulator.min.css',
  'data/version.json',
  'data/localization/en-US.json',
  'data/compression/extract7z.js',
  'data/compression/extractzip.js',
  'data/compression/libunrar.js',
  'data/compression/libunrar.wasm',
  'data/cores/reports/gambatte.json',
  'data/cores/reports/mgba.json',
  'data/cores/reports/mupen64plus_next.json',
  'data/cores/reports/pcsx_rearmed.json',
  'data/cores/reports/snes9x.json',
];
self.addEventListener('install', e => {
  e.waitUntil(caches.open(SHELL_CACHE).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k.startsWith('retro-shell-') && k !== SHELL_CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('message', e => { if (e.data === 'precache') caches.open(SHELL_CACHE).then(c => c.addAll(SHELL)); });
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  // EmulatorJS update check: answer locally so it works offline
  if (url.hostname === 'cdn.emulatorjs.org' && url.pathname.endsWith('/version.json')) {
    e.respondWith(caches.match(new URL('data/version.json', self.registration.scope).href).then(r => r || new Response('{"version":"4.2.3"}', { headers: { 'Content-Type': 'application/json' } })));
    return;
  }
  if (url.origin !== location.origin) return;
  if (url.pathname.includes('/data/cores/')) {
    e.respondWith(caches.open(CORE_CACHE).then(async c => {
      const hit = await caches.match(req.url);
      if (hit) return hit;
      const res = await fetch(req);
      if (res.ok) c.put(req.url, res.clone());
      return res;
    }));
    return;
  }
  // App shell: cache-first (ignore ?id= on play.html), fall back to network and cache it
  e.respondWith(caches.match(req, { ignoreSearch: true }).then(hit => hit || fetch(req).then(res => {
    if (res.ok) { const cl = res.clone(); caches.open(SHELL_CACHE).then(c => c.put(req, cl)); }
    return res;
  }).catch(() => req.mode === 'navigate' ? caches.match('./index.html') : Response.error())));
});
