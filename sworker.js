console.log("Service Worker is starting up.")

self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open('static-cache').then(function (cache) {
            return cache.addAll([
                '/',
                '/show.html',
                '/css/editor.css',
                '/css/narrow-jumbotron.css',
                '/images/19WHMUNC-1@0,5x.png',
                '/js/utilities.js'
            ]);
        })
    )
});

this.addEventListener('fetch', function (event) {
    event.respondWith(
        caches.match(event.request).then(function (response) {

            if (response) {
                return response;
            }

            var request = event.request.clone();
            return fetch(request).then(function (httpRes) {

                if (!httpRes || httpRes.status !== 200) {
                    return httpRes;
                }

                var responseClone = httpRes.clone();
                caches.open('static-cache').then(function (cache) {
                    cache.put(event.request, responseClone);
                });

                return httpRes;
            });
        })
    );
});

self.addEventListener('install', function (event) {
    event.waitUntil(self.skipWaiting());
});

self.addEventListener('activate', function (event) {
    event.waitUntil(
        Promise.all([
            self.clients.claim(),
            caches.keys().then(function (cacheList) {
                return Promise.all(
                    cacheList.map(function (cacheName) {
                        if (cacheName !== 'static-cache') {
                            return caches.delete(cacheName);
                        }
                    })
                );
            })
        ])
    );
});