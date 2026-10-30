// Service Worker for Zhixing Junior Academy (知行學院)
const CACHE_NAME = 'zhixing-cache-v26';

const STATIC_ASSETS = [
  './',
  './index.html',
  './style.css',
  './app.js',
  './curriculum.js',
  './engine.js',
  './exam-bank.js',
  './sources.js',
  './labs.js',
  './diagrams.js',
  './teaching.js',
  './explicit-knowledge-points.js',
  './learning-guide.js',
  './knowledge-practice.js',
  './subject-challenges.js',
  './lesson-deepening.js',
  './deepening-charts.js',
  './deepening-language-math.js',
  './deepening-science.js',
  './deepening-social-life.js',
  './official-alignment-data.js',
  './lesson-alignment.js',
  './subject-strategies.js',
  './worked-cases.js',
  './supplements.js',
  './study-library.js',
  './quick-quiz.js',
  './pedagogy-visuals.js',
  './gsat-interactive.js',
  './cap-interactive.js',
  './cap-explanations.js',
  './cap-scoring.js',
  './cap-notebook.js',
  './engagement.js',
  './knowledge-network.js',
  './exegesis-data.js',
  './periodic-exam-data.js',
  './periodic-exams.js',
  './manifest.json',
  './quest/index.html',
  './quest/quest.css',
  './quest/engine.mjs',
  './quest/view.mjs',
  './quest/sound.mjs',
  './quest/coach.mjs',
  './quest/atlas.mjs',
  './quest/placement.mjs',
  './quest/course/index.json',
  './quest/course/s1.json',
  './quest/course/stories.json'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(STATIC_ASSETS.map(path => new Request(path, {cache:'reload'})));
    }).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.filter(k => k.startsWith('zhixing-cache-') && k !== CACHE_NAME).map(k => caches.delete(k))
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  // Only handle GET requests
  if (event.request.method !== 'GET') return;

  const url = new URL(event.request.url);

  // Do not intercept non-http/https (e.g. data:, blob:)
  if (!url.protocol.startsWith('http')) return;

  // Revalidate lesson modules on navigation/reload, with an offline fallback.
  // Otherwise a new worker can copy stale HTTP-cache responses into its new cache.
  const freshBank = /\/(?:cap-bank|cap-ai-coverage|cap-historical-manifest|cap-manifest)\.json$/.test(url.pathname) || /\/cap-explain\/[^/]+\.json$/.test(url.pathname) || /\/quest\/course\/[^/]+\.json$/.test(url.pathname);
  if (url.origin === self.location.origin && (event.request.mode === 'navigate' || /\.(?:js|mjs|css)$/.test(url.pathname) || freshBank)) {
    event.respondWith((async () => {
      const cache = await caches.open(CACHE_NAME);
      try {
        const response = await fetch(event.request, {cache:'no-cache'});
        if (response.ok) { await cache.put(event.request, response.clone()); return response; }
        const fallback = await cache.match(event.request);
        return fallback || response;
      } catch (error) {
        const fallback = await cache.match(event.request) || (event.request.mode === 'navigate' ? await cache.match('./index.html') : null);
        if (fallback) return fallback;
        throw error;
      }
    })());
    return;
  }

  // Stale-while-revalidate or Cache-first strategy
  event.respondWith(
    caches.match(event.request).then(cachedResponse => {
      if (cachedResponse) {
        // Fetch in background to update cache
        fetch(event.request).then(networkResponse => {
          if (networkResponse && networkResponse.status === 200) {
            caches.open(CACHE_NAME).then(cache => cache.put(event.request, networkResponse));
          }
        }).catch(() => {/* offline, keep cached */});
        return cachedResponse;
      }
      return fetch(event.request).then(networkResponse => {
        if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
          return networkResponse;
        }
        const responseToCache = networkResponse.clone();
        caches.open(CACHE_NAME).then(cache => {
          cache.put(event.request, responseToCache);
        });
        return networkResponse;
      }).catch(() => {
        // If navigation request fails, return cached index.html
        if (event.request.mode === 'navigate') {
          return caches.match('./index.html');
        }
      });
    })
  );
});
