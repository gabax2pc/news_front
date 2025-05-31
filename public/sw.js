const CACHE_NAME = 'furufuwa-news-v1';
const urlsToCache = [
  '/',
  '/static/js/bundle.js',
  '/static/css/main.css',
  '/manifest.json',
  '/favicon.ico',
  '/logo192.png',
  '/logo512.png'
];

// Service Worker インストール
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('📦 キャッシュを開きました');
        return cache.addAll(urlsToCache);
      })
  );
});

// Service Worker アクティベート
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('🗑️ 古いキャッシュを削除:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// フェッチイベント（ネットワークリクエストの処理）
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // キャッシュにある場合はキャッシュから返す
        if (response) {
          return response;
        }

        // ネットワークからフェッチ
        return fetch(event.request).then((response) => {
          // レスポンスが有効でない場合はそのまま返す
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }

          // レスポンスをクローンしてキャッシュに保存
          const responseToCache = response.clone();
          caches.open(CACHE_NAME)
            .then((cache) => {
              cache.put(event.request, responseToCache);
            });

          return response;
        }).catch(() => {
          // ネットワークエラーの場合、オフラインページを返す
          if (event.request.destination === 'document') {
            return caches.match('/offline.html');
          }
        });
      })
  );
});

// プッシュ通知の処理
self.addEventListener('push', (event) => {
  const options = {
    body: event.data ? event.data.text() : '新しい記事が投稿されました！',
    icon: '/logo192.png',
    badge: '/logo192.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {
        action: 'explore',
        title: '記事を読む',
        icon: '/logo192.png'
      },
      {
        action: 'close',
        title: '閉じる',
        icon: '/logo192.png'
      }
    ]
  };

  event.waitUntil(
    self.registration.showNotification('ふるふわそくほー', options)
  );
});

// 通知クリックの処理
self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  if (event.action === 'explore') {
    event.waitUntil(
      clients.openWindow('/')
    );
  }
}); 