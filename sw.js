// Service Worker for Jack Amichai's Portfolio
// Caches static assets for offline viewing of non-AI sections

const CACHE_NAME = 'jacks-space-v1';
const STATIC_ASSETS = [
    '/',
    '/index.html',
    '/styles.css',
    '/script.js',
    '/chatbot.js',
    '/sparkles.js',
    '/text-effects.js',
    '/tour.js',
    '/ux-enhancements.js',
    '/projects-data.js',
    '/favicon.png',
    '/images/cloud-bot.jpg',
];

// Install: cache static assets
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(STATIC_ASSETS).catch(() => {
                // Silently fail on individual items
                return Promise.allSettled(
                    STATIC_ASSETS.map(url => cache.add(url).catch(() => { }))
                );
            });
        })
    );
    self.skipWaiting();
});

// Activate: clean old caches
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((names) =>
            Promise.all(
                names.filter(n => n !== CACHE_NAME).map(n => caches.delete(n))
            )
        )
    );
    self.clients.claim();
});

// Fetch: network-first for API, cache-first for static assets
self.addEventListener('fetch', (event) => {
    const url = new URL(event.request.url);

    // Never cache API calls
    if (url.pathname.startsWith('/api/')) return;

    // Cache-first for static assets
    event.respondWith(
        caches.match(event.request).then((cached) => {
            const fetchPromise = fetch(event.request).then((response) => {
                // Cache successful responses
                if (response.ok && response.type === 'basic') {
                    const clone = response.clone();
                    caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
                }
                return response;
            }).catch(() => cached); // Fall back to cache on network failure

            return cached || fetchPromise;
        })
    );
});
