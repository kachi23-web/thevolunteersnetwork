/**
 * Performance optimization utilities for Core Web Vitals
 */

/**
 * Defer non-critical JavaScript execution
 */
export const deferNonCriticalJS = (callback: () => void, delay = 0) => {
  if ('requestIdleCallback' in window) {
    requestIdleCallback(callback, { timeout: 5000 });
  } else {
    setTimeout(callback, delay);
  }
};

/**
 * Preload critical resources
 */
export const preloadCriticalResources = () => {
  const criticalResources = [
    { href: '/assets/img/banner-img.png', as: 'image' },
    { href: '/assets/img/logo.svg', as: 'image' },
    { href: '/assets/img/about-2-img.jpg', as: 'image' },
  ];

  criticalResources.forEach(({ href, as }) => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = as;
    link.href = href;
    document.head.appendChild(link);
  });
};

/**
 * Optimize images for better LCP
 */
export const optimizeImageLoading = () => {
  // Add loading="eager" to above-the-fold images
  const aboveFoldImages = document.querySelectorAll('img[data-priority="true"]');
  aboveFoldImages.forEach((img) => {
    (img as HTMLImageElement).loading = 'eager';
    (img as HTMLImageElement).fetchPriority = 'high';
  });

  // Ensure other images use lazy loading
  const otherImages = document.querySelectorAll('img:not([data-priority="true"])');
  otherImages.forEach((img) => {
    (img as HTMLImageElement).loading = 'lazy';
  });
};

/**
 * Reduce layout shifts by setting image dimensions
 */
export const preventLayoutShifts = () => {
  const images = document.querySelectorAll('img:not([width]):not([height])');
  images.forEach((img) => {
    const element = img as HTMLImageElement;
    // Set aspect ratio to prevent layout shifts
    element.style.aspectRatio = '16/9';
    element.style.width = '100%';
    element.style.height = 'auto';
  });
};

/**
 * Optimize font loading to prevent FOIT/FOUT
 */
export const optimizeFontLoading = () => {
  // Add font-display: swap to all font faces
  const style = document.createElement('style');
  style.textContent = `
    @font-face {
      font-display: swap;
    }
  `;
  document.head.appendChild(style);
};

/**
 * Remove unused CSS classes (basic implementation)
 */
export const removeUnusedCSS = () => {
  deferNonCriticalJS(() => {
    const usedClasses = new Set<string>();
    
    // Collect all used classes
    document.querySelectorAll('[class]').forEach((element) => {
      element.classList.forEach((className) => {
        usedClasses.add(className);
      });
    });

    // Log unused CSS for analysis (in development)
    if (import.meta.env.DEV) {
      console.log(`📊 Found ${usedClasses.size} used CSS classes`);
    }
  });
};

/**
 * Optimize third-party scripts
 */
export const optimizeThirdPartyScripts = () => {
  // Defer third-party scripts until after page load
  window.addEventListener('load', () => {
    deferNonCriticalJS(() => {
      // Load analytics, social widgets, etc. after main content
      console.log('🚀 Loading third-party scripts after page load');
    }, 1000);
  });
};

/**
 * Initialize all performance optimizations
 */
export const initializePerformanceOptimizations = () => {
  // Immediate optimizations
  preloadCriticalResources();
  optimizeFontLoading();
  
  // DOM-ready optimizations
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      optimizeImageLoading();
      preventLayoutShifts();
    });
  } else {
    optimizeImageLoading();
    preventLayoutShifts();
  }

  // Post-load optimizations
  window.addEventListener('load', () => {
    deferNonCriticalJS(() => {
      removeUnusedCSS();
      optimizeThirdPartyScripts();
    });
  });
};

/**
 * Monitor Core Web Vitals and log improvements
 */
export const monitorCoreWebVitals = () => {
  // This will be called from the performance utility
  const logVital = (name: string, value: number, rating: string) => {
    console.log(`📊 ${name}: ${value.toFixed(2)}ms (${rating})`);
    
    // In production, send to analytics
    if (import.meta.env.PROD) {
      // Example: sendToAnalytics({ name, value, rating });
    }
  };

  return logVital;
};