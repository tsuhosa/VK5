// Vân Khánh Diary — Service Worker
// Đổi CACHE_VERSION mỗi lần update game để trình duyệt tải bản mới
const CACHE_VERSION = 'vkdiary-v8';

const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png'
];

// Cài đặt: cache toàn bộ asset lần đầu
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_VERSION)
      .then(c => c.addAll(ASSETS))
      .then(() => self.skipWaiting())
  );
});

// Kích hoạt: xoá cache cũ
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys.filter(k => k !== CACHE_VERSION).map(k => caches.delete(k))
      ))
      .then(() => self.clients.claim())
  );
});

// Fetch: điều hướng ưu tiên mạng, asset khác cache-first
self.addEventListener('fetch', e => {
  const req = e.request;

  // Bỏ qua request không phải GET hoặc khác origin
  if (req.method !== 'GET') return;
  if (new URL(req.url).origin !== location.origin) return;

  // Trang chính: ưu tiên mạng, fallback cache
  if (req.mode === 'navigate') {
    e.respondWith(
      fetch(req)
        .then(r => {
          const cp = r.clone();
          caches.open(CACHE_VERSION).then(c => c.put(req, cp));
          return r;
        })
        .catch(() => caches.match(req).then(r => r || caches.match('./index.html')))
    );
    return;
  }

  // Asset khác: cache-first, fallback network
  e.respondWith(
    caches.match(req).then(r => {
      if (r) return r;
      return fetch(req).then(res => {
        const cp = res.clone();
        caches.open(CACHE_VERSION).then(c => c.put(req, cp));
        return res;
      });
    })
  );
});
