// Service Worker for PWA
self.addEventListener('install', e => {
    e.waitUntil(
        caches.open('jack-portfolio-v1').then(cache => {
            return cache.addAll([
                '/',
                '/index.html',
                '/styles.css',
                '/script.js',
                '/images/me.jpeg',
                '/images/Resume.png',
                '/images/Projects.png',
                '/images/Contact.png',
                '/images/Story.jpg'
            ]);
        })
    );
});

self.addEventListener('fetch', e => {
    e.respondWith(
        caches.match(e.request).then(response => {
            return response || fetch(e.request);
        })
    );
});
