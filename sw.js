var CACHE = 'anticuerpos-v24';
var ASSETS = [
  './',
  './index.html',
  './styles.css',
  './i18n.js',
  './app.js',
  './firebase-config.js',
  './manifest.webmanifest',
  './icons/icon-192.png',
  './icons/icon-512.png'
];

/* Siempre se pide la versiÃ³n fresca al servidor (cache:'no-cache' revalida y se salta los 10 min
   de cachÃ© HTTP de GitHub Pages); la copia guardada solo se usa si no hay conexiÃ³n. */
function fresh(url){ return fetch(url, {cache:'no-cache'}); }

self.addEventListener('install', function(e){
  e.waitUntil(
    caches.open(CACHE).then(function(c){
      return Promise.all(ASSETS.map(function(url){
        return fresh(url).then(function(resp){
          if(!resp.ok) throw new Error('No se pudo guardar '+url);
          return c.put(url, resp);
        });
      }));
    }).then(function(){ return self.skipWaiting(); })
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
    fresh(e.request.url).then(function(resp){
      if(resp && resp.status===200){
        var copy = resp.clone();
        caches.open(CACHE).then(function(c){ c.put(e.request, copy); });
      }
      return resp;
    }).catch(function(){
      return caches.match(e.request).then(function(cached){
        return cached || caches.match('./index.html');
      });
    })
  );
});
