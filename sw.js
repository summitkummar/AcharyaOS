const CACHE_NAME = 'acharyaos-v1';
const urlsToCache = [
  './',
  './index.html',
  './manifest.json'
];

// Install - Cache core files
self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache =>
      Promise.all(
        urlsToCache.map(url => cache.add(url).catch(() => {}))
      )
    )
  );
});

// Activate - Clean old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(names =>
      Promise.all(
        names.filter(n => n !== CACHE_NAME).map(n => caches.delete(n))
      )
    ).then(() => self.clients.claim())
  );
});

// Fetch - Serve from cache first, then network
self.addEventListener('fetch', event => {
  const req = event.request;
  
  // Only handle GET requests
  if (req.method !== 'GET') return;
  
  // Skip external requests (fonts, cdn, etc.)
  if (!req.url.startsWith(self.location.origin)) {
    event.respondWith(fetch(req).catch(() => new Response('', { status: 408 })));
    return;
  }

  event.respondWith(
    caches.match(req).then(cached => {
      const fetchPromise = fetch(req)
        .then(res => {
          if (res && res.status === 200 && res.type === 'basic') {
            const clone = res.clone();
            caches.open(CACHE_NAME).then(cache => cache.put(req, clone));
          }
          return res;
        })
        .catch(() => cached);
      
      return cached || fetchPromise;
    })
  );
});
