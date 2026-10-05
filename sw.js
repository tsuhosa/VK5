// Vân Khánh Diary — Service Worker v17
// Đổi CACHE_VERSION mỗi lần update game để trình duyệt tải bản mới
const CACHE_VERSION = 'vkdiary-v17';

const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png'
];

// Cache reference (không mở cache nhiều lần)
let _cachePromise;
const getCache = () => _cachePromise || (_cachePromise = caches.open(CACHE_VERSION));

// ===== INSTALL =====
self.addEventListener('install', e => {
  e.waitUntil((async () => {
    const c = await getCache();
    await c.addAll(ASSETS);
    await self.skipWaiting();
  })());
});

// ===== ACTIVATE =====
self.addEventListener('activate', e => {
  e.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(
      keys.filter(k => k !== CACHE_VERSION).map(k => caches.delete(k))
    );
    await self.clients.claim();
  })());
});

// ===== FETCH =====
self.addEventListener('fetch', e => {
  const req = e.request;

  // Bỏ qua non-GET hoặc cross-origin
  if (req.method !== 'GET') return;
  if (new URL(req.url).origin !== location.origin) return;

  // Navigation: network-first, fallback cache
  if (req.mode === 'navigate') {
    e.respondWith((async () => {
      try {
        const r = await fetch(req);
        const c = await getCache();
        c.put(req, r.clone()).catch(() => {});
        return r;
      } catch {
        const c = await getCache();
        return (await c.match(req)) || (await c.match('./index.html'));
      }
    })());
    return;
  }

  // Asset: cache-first + revalidate ngầm
  e.respondWith((async () => {
    const c = await getCache();
    const cached = await c.match(req);
    if (cached) {
      // Revalidate ngầm (không block)
      fetch(req).then(r => c.put(req, r)).catch(() => {});
      return cached;
    }
    try {
      const r = await fetch(req);
      c.put(req, r.clone()).catch(() => {});
      return r;
    } catch {
      return new Response('', { status: 408 });
    }
  })());
});
