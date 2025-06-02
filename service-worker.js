// Service Worker for Summer Learning Adventure 2025
const CACHE_NAME = 'summer-learning-cache-v1';

const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/css/styles.css',
  '/js/app.js',
  '/js/data.js',
  '/js/prep-data.js',
  '/js/parent-prep.js',
  '/manifest.json',
  '/images/icon-192x192.png',
  '/images/icon-512x512.png',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/webfonts/fa-solid-900.woff2'
];

const WORKSHEET_ASSETS = [
  '/worksheets/math-week1-addition.html',
  '/worksheets/math-week1-counting.html',
  '/worksheets/math-week1-shapes.html',
  '/worksheets/math-week1-subtraction.html',
  '/worksheets/math-week1-word-problems.html',
  '/worksheets/math-week2-subtraction.html',
  '/worksheets/math-week3-double-digit-addition.html',
  '/worksheets/math-week4-multiplication.html',
  '/worksheets/writing-week1-weekend.html',
  '/worksheets/writing-week2-robots.html',
  '/worksheets/writing-week3-letter.html',
  '/worksheets/writing-week4-tech-hero.html'
];

// Install event - cache the static assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        return cache.addAll([...STATIC_ASSETS, ...WORKSHEET_ASSETS]);
      })
      .catch(err => {
        console.error('Error during service worker install:', err);
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Fetch event - serve from cache or network
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Cache hit - return response from cache
        if (response) {
          return response;
        }

        // Clone the request because it's a one-time use stream
        const fetchRequest = event.request.clone();

        return fetch(fetchRequest)
          .then((response) => {
            // Check if we received a valid response
            if(!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // Clone the response because it's a one-time use stream
            const responseToCache = response.clone();

            caches.open(CACHE_NAME)
              .then((cache) => {
                // We only want to cache GET requests
                if (event.request.method === 'GET') {
                  cache.put(event.request, responseToCache);
                }
              });

            return response;
          })
          .catch(() => {
            // If both cache and network fail, try to return the offline page
            if (event.request.mode === 'navigate') {
              return caches.match('/index.html');
            }
          });
      })
  );
});

// Handle messages from the client
self.addEventListener('message', (event) => {
  if (event.data.action === 'skipWaiting') {
    self.skipWaiting();
  }
});
