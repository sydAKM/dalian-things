const CACHE_NAME = 'enterprise-map-cache-v1';
const urlsToCache = [
  './',
  '/index.html',
  '/industry.html',
  '/open-ladder.html',
  '/compare.html',
  '/discussion.html',
  '/css/style.css',
  '/css/industry.css',
  '/css/timeline.css',
  '/css/compare.css',
  '/css/discussion.css',
  '/js/main.js',
  '/js/industry.js',
  '/js/timeline.js',
  '/js/compare.js',
  '/js/discussion.js',
  '/images/dalian-map.jpg',
  '/images/marker-icon.png',
  '/images/dalian-machine.jpg',
  '/images/shipyard.jpg',
  '/images/wazhou.jpg',
  '/images/icon-192.png',
  '/images/icon-512.png',
  '/manifest.json',
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});
