import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import './styles/global.css'
import { router } from './router'
import { AppProvider } from './contexts'
import { ErrorBoundary } from './components'
import { initializeFontLoading, addFontFallbacks } from './utils/fontLoading'
import { initializeServiceWorker } from './utils/serviceWorker'
import { initializePerformanceMonitoring, monitorResourcePerformance } from './utils/performance'
import { preloadImages } from './utils/imageOptimization'
import { initializePerformanceOptimizations } from './utils/performanceOptimizations'

// Preload critical images for LCP optimization
const criticalImages = [
  '/assets/img/banner-img.png',
  '/assets/img/logo.svg',
  '/assets/img/about-img.png',
];

// Initialize performance optimizations immediately
const initializeOptimizations = async () => {
  // Initialize comprehensive performance optimizations
  initializePerformanceOptimizations();
  
  // Initialize font loading optimizations
  initializeFontLoading();
  addFontFallbacks();
  
  // Preload critical images
  preloadImages(criticalImages);
  
  // Initialize service worker for caching
  if ('serviceWorker' in navigator && import.meta.env.PROD) {
    initializeServiceWorker();
  }
  
  // Initialize performance monitoring
  if (import.meta.env.DEV || import.meta.env.PROD) {
    initializePerformanceMonitoring();
    monitorResourcePerformance();
  }
};

// Start optimizations immediately
initializeOptimizations();

// Lazy load vendor libraries after initial render
const lazyLoadVendorLibraries = async () => {
  if ('requestIdleCallback' in window) {
    requestIdleCallback(async () => {
      try {
        const { initVendorLibraries } = await import('./utils/vendor');
        await initVendorLibraries();
      } catch (error) {
        console.warn('Failed to load vendor libraries:', error);
      }
    });
  } else {
    // Fallback for browsers without requestIdleCallback
    setTimeout(async () => {
      try {
        const { initVendorLibraries } = await import('./utils/vendor');
        await initVendorLibraries();
      } catch (error) {
        console.warn('Failed to load vendor libraries:', error);
      }
    }, 2000);
  }
};

// Create root and render app
const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('Root element not found');
}

const root = createRoot(rootElement);

// Use requestIdleCallback for non-critical initialization
if ('requestIdleCallback' in window) {
  requestIdleCallback(() => {
    // Load vendor libraries after initial render
    lazyLoadVendorLibraries();
    console.log('🚀 App initialized with performance optimizations');
  });
} else {
  // Fallback for browsers without requestIdleCallback
  setTimeout(() => {
    lazyLoadVendorLibraries();
    console.log('🚀 App initialized with performance optimizations');
  }, 100);
}

root.render(
  <StrictMode>
    <ErrorBoundary>
      <AppProvider>
        <RouterProvider router={router} />
      </AppProvider>
    </ErrorBoundary>
  </StrictMode>
)
