'use strict';

const CACHE_PREFIX = 'plot-twist-';
const CACHE_NAME = 'plot-twist-v6.4.1';
const APP_SHELL = [
  './',
  './index.html',
  './styles.css',
  './categories.css',
  './game-v6.2.css',
  './game-v6.3.css',
  './cards.js',
  './deck-a.js',
  './deck-b.js',
  './deck-c.js',
  './deck-d.js',
  './deck-e.js',
  './deck-f.js',
  './deck-g.js',
  './deck-h.js',
  './history-a.js',
  './history-b.js',
  './history-c.js',
  './history-d.js',
  './history-reviewed.js',
  './categories.js',
  './language-polish.js',
  './app.js',
  './choice-ui.js',
  './history-ui.js',
  './consistency-ui.js',
  './manifest.webmanifest',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/icon-maskable-512.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(APP_SHELL))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys
          .filter(key => key.startsWith(CACHE_PREFIX) && key !== CACHE_NAME)
          .map(key => caches.delete(key))
      ))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;

  const requestUrl = new URL(event.request.url);
  if (requestUrl.origin !== self.location.origin || !event.request.url.startsWith(self.registration.scope)) return;

  event.respondWith((async () => {
    const cache = await caches.open(CACHE_NAME);
    const cached = await cache.match(event.request);
    if (cached) return cached;

    try {
      const response = await fetch(event.request);
      if (response && response.status === 200 && response.type !== 'opaque') {
        await cache.put(event.request, response.clone());
      }
      return response;
    } catch {
      if (event.request.mode === 'navigate') {
        return (await cache.match('./index.html')) || Response.error();
      }
      return Response.error();
    }
  })());
});
