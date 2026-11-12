// Network-first so updates show immediately; cache keeps it working offline.
const CACHE = 'tuon-v26';
const FILES = ['./', 'index.html', 'styles.css', 'app.js', 'hello-audio.js', 'hello-video.js', 'skills.js', 'code.js', 'records.js', 'school.js', 'life-a.js', 'life-b.js', 'data.js', 'data-more.js', 'data-langs.js', 'data-langs2.js', 'data-langs3.js', 'icon.svg', 'manifest.json'];
self.addEventListener('install', e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES))); self.skipWaiting(); });
self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k))))); self.clients.claim(); });
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  e.respondWith(fetch(e.request, { cache: 'no-cache' }).then(r => { if (r.ok && new URL(e.request.url).origin === location.origin) { const cp = r.clone(); caches.open(CACHE).then(c => c.put(e.request, cp)); } return r; })
    .catch(() => caches.match(e.request).then(r => r || caches.match('index.html'))));
});
