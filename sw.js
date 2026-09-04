var CACHE = 'anticuerpos-v1';
var ASSETS = [
  './',
  './index.html',
  './styles.css',
  './app.js',
  './firebase-config.js',
  './manifest.webmanifest',
  './icons/icon-192.png',
  './icons/icon-512.png'
];

self.addEventListener('install', function(e){
  e.waitUntil(
    caches.open(CACHE).then(function(c){ return c.addAll(ASSETS); }).then(function(){ return self.skipWaiting(); })
  );
});

self.addEventListener('activate', function(e){
  e.waitUntil(
    caches.keys().then(function(keys){
      return Promise.all(keys.filter(function(k){ return k!==CACHE; }).map(function(k){ return caches.delete(k); }));
    }).then(function(){ return self.clients.claim(); })
  );
});

self.addEventListener('fetch', function(e){
  if(e.request.method!=='GET') return;
  var url = new URL(e.request.url);
  if(url.origin !== location.origin) return; // never intercept Firebase/network calls

  e.respondWith(
    caches.match(e.request).then(function(cached){
      var fetchPromise = fetch(e.request).then(function(resp){
        if(resp && resp.status===200){
          var copy = resp.clone();
          caches.open(CACHE).then(function(c){ c.put(e.request, copy); });
        }
        return resp;
      }).catch(function(){ return cached; });
      return cached || fetchPromise;
    })
  );
});
