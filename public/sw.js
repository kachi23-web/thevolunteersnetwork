// Service Worker for Charitics Website
// Enhanced with production-ready caching strategies

const VERSION = '1.0.0';
const CACHE_NAME = `charitics-v${VERSION}`;
const STATIC_CACHE_NAME = `charitics-static-v${VERSION}`;
const DYNAMIC_CACHE_NAME = `charitics-dynamic-v${VERSION}`;
const IMAGE_CACHE_NAME = `charitics-images-v${VERSION}`;
const FONT_CACHE_NAME = `charitics-fonts-v${VERSION}`;

// Cache size limits
const MAX_DYNAMIC_CACHE_SIZE = 50;
const MAX_IMAGE_CACHE_SIZE = 100;

// Cache duration (in milliseconds)
const CACHE_DURATION = {
  STATIC: 30 * 24 * 60 * 60 * 1000, // 30 days
  DYNAMIC: 7 * 24 * 60 * 60 * 1000, // 7 days
  IMAGES: 14 * 24 * 60 * 60 * 1000, // 14 days
  FONTS: 365 * 24 * 60 * 60 * 1000, // 1 year
};

// Assets to cache immediately on install
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  // Critical assets will be added dynamically during build
];

// Caching strategies based on resource type
const CACHE_STRATEGIES = {
  // Cache first for static assets (JS, CSS, fonts)
  CACHE_FIRST: [
    /\.(?:js|css|woff2?|ttf|eot)$/,
    /\/assets\/js\//,
    /\/assets\/css\//,
    /\/assets\/fonts\//,
  ],
  // Network first for HTML pages and API calls
  NETWORK_FIRST: [
    /\.(?:html)$/,
    /\/$/,
    /\/api\//,
  ],
  // Stale while revalidate for images
  STALE_WHILE_REVALIDATE: [
    /\.(?:png|jpg|jpeg|svg|gif|webp|ico)$/,
    /\/assets\/images\//,
  ],
};

// Install event - cache static assets
self.addEventListener('install', (event) => {
  console.log('[SW] Installing service worker version:', VERSION);
  
  event.waitUntil(
    caches.open(STATIC_CACHE_NAME)
      .then((cache) => {
        console.log('[SW] Caching static assets');
        return cache.addAll(STATIC_ASSETS);
      })
      .then(() => {
        console.log('[SW] Static assets cached successfully');
        return self.skipWaiting();
      })
      .catch((error) => {
        console.error('[SW] Failed to cache static assets:', error);
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('[SW] Activating service worker version:', VERSION);
  
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            // Delete old caches that don't match current version
            if (
              cacheName !== STATIC_CACHE_NAME &&
              cacheName !== DYNAMIC_CACHE_NAME &&
              cacheName !== IMAGE_CACHE_NAME &&
              cacheName !== FONT_CACHE_NAME
            ) {
              console.log('[SW] Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        console.log('[SW] Service worker activated');
        return self.clients.claim();
      })
  );
});

// Fetch event - implement caching strategies
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }

  // Skip external requests (except for fonts and images from CDNs)
  if (url.origin !== location.origin && !isCDNResource(url)) {
    return;
  }

  // Determine caching strategy
  const strategy = getCachingStrategy(request.url);

  switch (strategy) {
    case 'CACHE_FIRST':
      event.respondWith(cacheFirst(request));
      break;
    case 'NETWORK_FIRST':
      event.respondWith(networkFirst(request));
      break;
    case 'STALE_WHILE_REVALIDATE':
      event.respondWith(staleWhileRevalidate(request));
      break;
    default:
      event.respondWith(networkFirst(request));
  }
});

// Check if resource is from a CDN
function isCDNResource(url) {
  const cdnDomains = ['fonts.googleapis.com', 'fonts.gstatic.com'];
  return cdnDomains.some(domain => url.hostname.includes(domain));
}

// Determine caching strategy based on URL
function getCachingStrategy(url) {
  for (const [strategy, patterns] of Object.entries(CACHE_STRATEGIES)) {
    if (patterns.some(pattern => pattern.test(url))) {
      return strategy;
    }
  }
  return 'NETWORK_FIRST';
}

// Get appropriate cache name based on resource type
function getCacheName(url) {
  if (/\.(?:woff2?|ttf|eot)$/.test(url)) {
    return FONT_CACHE_NAME;
  }
  if (/\.(?:png|jpg|jpeg|svg|gif|webp|ico)$/.test(url)) {
    return IMAGE_CACHE_NAME;
  }
  if (/\.(?:js|css)$/.test(url)) {
    return STATIC_CACHE_NAME;
  }
  return DYNAMIC_CACHE_NAME;
}

// Cache first strategy - serve from cache, fallback to network
async function cacheFirst(request) {
  try {
    const cachedResponse = await caches.match(request);
    
    // Check if cached response is still valid
    if (cachedResponse && !isCacheExpired(cachedResponse)) {
      return cachedResponse;
    }

    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cacheName = getCacheName(request.url);
      const cache = await caches.open(cacheName);
      
      // Add timestamp to response for cache expiration
      const responseToCache = addCacheTimestamp(networkResponse.clone());
      cache.put(request, responseToCache);
      
      // Limit cache size
      await limitCacheSize(cacheName, getMaxCacheSize(cacheName));
    }
    return networkResponse;
  } catch (error) {
    console.error('[SW] Cache first strategy failed:', error);
    
    // Try to return cached response even if expired
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    
    return createOfflineResponse();
  }
}

// Network first strategy - try network, fallback to cache
async function networkFirst(request) {
  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open(DYNAMIC_CACHE_NAME);
      const responseToCache = addCacheTimestamp(networkResponse.clone());
      cache.put(request, responseToCache);
      
      // Limit cache size
      await limitCacheSize(DYNAMIC_CACHE_NAME, MAX_DYNAMIC_CACHE_SIZE);
    }
    return networkResponse;
  } catch (error) {
    console.error('[SW] Network first strategy failed:', error);
    
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    
    return createOfflineResponse();
  }
}

// Stale while revalidate strategy - serve from cache, update in background
async function staleWhileRevalidate(request) {
  const cache = await caches.open(IMAGE_CACHE_NAME);
  const cachedResponse = await cache.match(request);

  const fetchPromise = fetch(request)
    .then((networkResponse) => {
      if (networkResponse.ok) {
        const responseToCache = addCacheTimestamp(networkResponse.clone());
        cache.put(request, responseToCache);
        
        // Limit cache size
        limitCacheSize(IMAGE_CACHE_NAME, MAX_IMAGE_CACHE_SIZE);
      }
      return networkResponse;
    })
    .catch(() => {
      // Network failed, return cached response if available
      return cachedResponse;
    });

  return cachedResponse || fetchPromise;
}

// Add timestamp to response for cache expiration
function addCacheTimestamp(response) {
  const headers = new Headers(response.headers);
  headers.append('sw-cache-timestamp', Date.now().toString());
  
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: headers,
  });
}

// Check if cached response has expired
function isCacheExpired(response) {
  const timestamp = response.headers.get('sw-cache-timestamp');
  if (!timestamp) {
    return false; // No timestamp, assume not expired
  }
  
  const cacheTime = parseInt(timestamp, 10);
  const now = Date.now();
  const age = now - cacheTime;
  
  // Determine expiration based on cache type
  const url = response.url;
  if (/\.(?:woff2?|ttf|eot)$/.test(url)) {
    return age > CACHE_DURATION.FONTS;
  }
  if (/\.(?:png|jpg|jpeg|svg|gif|webp|ico)$/.test(url)) {
    return age > CACHE_DURATION.IMAGES;
  }
  if (/\.(?:js|css)$/.test(url)) {
    return age > CACHE_DURATION.STATIC;
  }
  
  return age > CACHE_DURATION.DYNAMIC;
}

// Get max cache size for a given cache name
function getMaxCacheSize(cacheName) {
  if (cacheName === IMAGE_CACHE_NAME) {
    return MAX_IMAGE_CACHE_SIZE;
  }
  if (cacheName === DYNAMIC_CACHE_NAME) {
    return MAX_DYNAMIC_CACHE_SIZE;
  }
  return 100; // Default
}

// Limit cache size by removing oldest entries
async function limitCacheSize(cacheName, maxSize) {
  const cache = await caches.open(cacheName);
  const keys = await cache.keys();
  
  if (keys.length > maxSize) {
    // Remove oldest entries
    const keysToDelete = keys.slice(0, keys.length - maxSize);
    await Promise.all(keysToDelete.map(key => cache.delete(key)));
    console.log(`[SW] Cleaned up ${keysToDelete.length} entries from ${cacheName}`);
  }
}

// Create offline response
function createOfflineResponse() {
  return new Response(
    `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Offline - Charitics</title>
      <style>
        body {
          font-family: system-ui, -apple-system, sans-serif;
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
          margin: 0;
          background: linear-gradient(135deg, #EB5310 0%, #FAA019 100%);
          color: white;
          text-align: center;
          padding: 20px;
        }
        .container {
          max-width: 500px;
        }
        h1 {
          font-size: 2.5rem;
          margin-bottom: 1rem;
        }
        p {
          font-size: 1.125rem;
          opacity: 0.9;
          margin-bottom: 2rem;
        }
        button {
          background: white;
          color: #EB5310;
          border: none;
          padding: 12px 32px;
          font-size: 1rem;
          font-weight: 600;
          border-radius: 50px;
          cursor: pointer;
          transition: transform 0.2s;
        }
        button:hover {
          transform: translateY(-2px);
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>You're Offline</h1>
        <p>It looks like you've lost your internet connection. Please check your connection and try again.</p>
        <button onclick="window.location.reload()">Try Again</button>
      </div>
    </body>
    </html>
    `,
    {
      status: 503,
      statusText: 'Service Unavailable',
      headers: new Headers({
        'Content-Type': 'text/html',
      }),
    }
  );
}

// Message event - handle messages from clients
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  
  if (event.data && event.data.type === 'CLEAR_CACHE') {
    event.waitUntil(
      caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => caches.delete(cacheName))
        );
      })
    );
  }
});