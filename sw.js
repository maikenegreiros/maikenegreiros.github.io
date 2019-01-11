const CACHE_NAME = 'maike_negreiros-v1';
const paths = [
    '/',
    '/css/home.css',
    '/images/maikenegreiros.jpg',
    '/images/003-github.png',
    '/images/005-facebook.png',
    '/images/006-twitter.png',
    '/images/001-linkedin.png',
    '/images/002-mail.png'
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
        .then(cache => cache.addAll(paths))
        .catch(error => console.log("Erro ao instalar SW", error))
    )
});

self.addEventListener('activate', e => {
    e.waitUntil(
        caches.keys()
        .then(function (keys) {
            return Promise.all(keys
                .filter(function (key) {
                    return key.indexOf(CACHE_NAME) !== 0;
                })
                .map(function (key) {
                    return caches.delete(key);
                })
            );
        })
    );
});

self.addEventListener('fetch', e => {
    e.respondWith(
        caches.match(e.request)
        .then(response => {
            if (response) {
                return response;
            }
            return fetch(e.request.clone())
        })
    )
});
