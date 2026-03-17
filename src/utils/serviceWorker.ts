/**
 * Service Worker registration and management utilities
 */

const isLocalhost = Boolean(
  window.location.hostname === 'localhost' ||
  window.location.hostname === '[::1]' ||
  window.location.hostname.match(
    /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
  )
);

export interface ServiceWorkerStatus {
  isSupported: boolean;
  isRegistered: boolean;
  isActive: boolean;
  version?: string;
}

/**
 * Register the service worker
 */
export const registerServiceWorker = async (): Promise<ServiceWorkerRegistration | null> => {
  if ('serviceWorker' in navigator) {
    try {
      const registration = await navigator.serviceWorker.register('/sw.js', {
        scope: '/',
      });

      registration.addEventListener('updatefound', () => {
        const installingWorker = registration.installing;
        if (installingWorker) {
          installingWorker.addEventListener('statechange', () => {
            if (installingWorker.state === 'installed') {
              if (navigator.serviceWorker.controller) {
                // New content is available, notify user
                console.log('[SW] New content is available; please refresh.');
                showUpdateNotification();
              } else {
                // Content is cached for offline use
                console.log('[SW] Content is cached for offline use.');
              }
            }
          });
        }
      });

      console.log('[SW] Service Worker registered successfully');
      return registration;
    } catch (error) {
      console.error('[SW] Service Worker registration failed:', error);
      return null;
    }
  }
  return null;
};

/**
 * Unregister the service worker
 */
export const unregisterServiceWorker = async (): Promise<boolean> => {
  if ('serviceWorker' in navigator) {
    try {
      const registration = await navigator.serviceWorker.ready;
      const success = await registration.unregister();
      console.log('[SW] Service Worker unregistered successfully');
      return success;
    } catch (error) {
      console.error('[SW] Service Worker unregistration failed:', error);
      return false;
    }
  }
  return false;
};

/**
 * Check if service worker is supported
 */
export const isServiceWorkerSupported = (): boolean => {
  return 'serviceWorker' in navigator;
};

/**
 * Get service worker status
 */
export const getServiceWorkerStatus = async (): Promise<ServiceWorkerStatus> => {
  const status: ServiceWorkerStatus = {
    isSupported: isServiceWorkerSupported(),
    isRegistered: false,
    isActive: false,
  };

  if (status.isSupported) {
    try {
      const registration = await navigator.serviceWorker.getRegistration();
      status.isRegistered = !!registration;
      status.isActive = !!registration?.active;
    } catch (error) {
      console.error('[SW] Failed to get service worker status:', error);
    }
  }

  return status;
};

/**
 * Clear all service worker caches
 */
export const clearServiceWorkerCache = async (): Promise<boolean> => {
  if ('caches' in window) {
    try {
      const cacheNames = await caches.keys();
      await Promise.all(cacheNames.map(name => caches.delete(name)));
      console.log('[SW] All caches cleared successfully');
      return true;
    } catch (error) {
      console.error('[SW] Failed to clear caches:', error);
      return false;
    }
  }
  return false;
};

/**
 * Get cache storage usage
 */
export const getCacheStorageUsage = async (): Promise<{
  usage: number;
  quota: number;
  percentage: number;
} | null> => {
  if ('storage' in navigator && 'estimate' in navigator.storage) {
    try {
      const estimate = await navigator.storage.estimate();
      const usage = estimate.usage || 0;
      const quota = estimate.quota || 0;
      const percentage = quota > 0 ? (usage / quota) * 100 : 0;

      return {
        usage,
        quota,
        percentage,
      };
    } catch (error) {
      console.error('[SW] Failed to get storage estimate:', error);
      return null;
    }
  }
  return null;
};

/**
 * Force service worker update
 */
export const forceServiceWorkerUpdate = async (): Promise<boolean> => {
  if ('serviceWorker' in navigator) {
    try {
      const registration = await navigator.serviceWorker.getRegistration();
      if (registration) {
        await registration.update();
        console.log('[SW] Service worker update triggered');
        return true;
      }
    } catch (error) {
      console.error('[SW] Failed to update service worker:', error);
    }
  }
  return false;
};

/**
 * Skip waiting and activate new service worker immediately
 */
export const skipWaitingAndActivate = async (): Promise<void> => {
  if ('serviceWorker' in navigator) {
    const registration = await navigator.serviceWorker.getRegistration();
    if (registration?.waiting) {
      registration.waiting.postMessage({ type: 'SKIP_WAITING' });
      
      // Reload page after activation
      navigator.serviceWorker.addEventListener('controllerchange', () => {
        window.location.reload();
      });
    }
  }
};

/**
 * Show update notification to user
 */
const showUpdateNotification = (): void => {
  // Create a simple notification
  const notification = document.createElement('div');
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: linear-gradient(135deg, #EB5310 0%, #FAA019 100%);
    color: white;
    padding: 20px 24px;
    border-radius: 12px;
    box-shadow: 0 8px 24px rgba(0,0,0,0.2);
    z-index: 10000;
    font-family: system-ui, -apple-system, sans-serif;
    font-size: 14px;
    max-width: 320px;
    cursor: pointer;
    animation: slideIn 0.3s ease-out;
  `;
  
  notification.innerHTML = `
    <div style="margin-bottom: 8px; font-weight: 700; font-size: 16px;">🎉 Update Available</div>
    <div style="margin-bottom: 12px; opacity: 0.95; line-height: 1.5;">
      New content is available! Click here to refresh and get the latest version.
    </div>
    <div style="font-size: 12px; opacity: 0.8;">Auto-dismiss in 10 seconds</div>
  `;

  // Add animation
  const style = document.createElement('style');
  style.textContent = `
    @keyframes slideIn {
      from {
        transform: translateX(400px);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }
  `;
  document.head.appendChild(style);

  notification.addEventListener('click', () => {
    skipWaitingAndActivate();
  });

  document.body.appendChild(notification);

  // Auto-remove after 10 seconds
  setTimeout(() => {
    if (notification.parentNode) {
      notification.style.animation = 'slideIn 0.3s ease-out reverse';
      setTimeout(() => {
        notification.parentNode?.removeChild(notification);
      }, 300);
    }
  }, 10000);
};

/**
 * Initialize service worker in production
 */
export const initializeServiceWorker = (): void => {
  if (import.meta.env.PROD && !isLocalhost) {
    registerServiceWorker();
  } else if (import.meta.env.DEV) {
    // Log cache usage in development
    getCacheStorageUsage().then(usage => {
      if (usage) {
        console.log('[SW] Cache Storage Usage:', {
          used: `${(usage.usage / 1024 / 1024).toFixed(2)} MB`,
          total: `${(usage.quota / 1024 / 1024).toFixed(2)} MB`,
          percentage: `${usage.percentage.toFixed(2)}%`,
        });
      }
    });
  }
};