const CACHE='madressa-app-v1';
const ASSETS=['./','./index.html','./styles.css','./app.js','./manifest.webmanifest','./data/schedule.json','./data/notices.json','./data/lessons.json','./icons/icon-192.png','./icons/icon-512.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting()));});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET') return;
  // Network-first for data so notices stay fresh, cache fallback offline
  if(e.request.url.includes('/data/')){ e.respondWith(fetch(e.request).then(r=>{const c=r.clone();caches.open(CACHE).then(cc=>cc.put(e.request,c));return r;}).catch(()=>caches.match(e.request))); return; }
  e.respondWith(caches.match(e.request).then(hit=>hit||fetch(e.request)));
});
