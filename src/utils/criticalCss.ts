/**
 * Critical CSS utilities for optimizing initial page load
 * Helps identify and extract critical CSS for above-the-fold content
 */

/**
 * Extracts critical CSS selectors that should be loaded immediately
 * These are typically styles needed for above-the-fold content
 */
export const criticalCssSelectors = [
  // Layout essentials
  'body',
  'html',
  '.ul-container',
  '.container',
  
  // Header and navigation (always visible)
  'header',
  '.header',
  'nav',
  '.nav',
  
  // Hero/Banner section (above the fold)
  '.hero-section',
  '.banner',
  
  // Loading states
  '.loading',
  '.spinner',
  
  // Critical typography
  'h1',
  'h2',
  'p',
  
  // Critical buttons
  '.btn',
  '.btn-primary',
  
  // Skip to content (accessibility)
  '.skip-to-content',
  
  // Error boundaries
  '.error-boundary',
];

/**
 * Preloads critical fonts to prevent FOIT (Flash of Invisible Text)
 */
export const preloadCriticalFonts = () => {
  const fonts = [
    { family: 'Manrope', weight: '400' },
    { family: 'Manrope', weight: '600' },
    { family: 'Quicksand', weight: '400' },
  ];

  fonts.forEach(({ family, weight }) => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'font';
    link.type = 'font/woff2';
    link.crossOrigin = 'anonymous';
    link.href = `https://fonts.googleapis.com/css2?family=${family}:wght@${weight}&display=swap`;
    document.head.appendChild(link);
  });
};

/**
 * Defers non-critical CSS loading
 * Loads CSS asynchronously after initial page render
 */
export const deferNonCriticalCss = (href: string) => {
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = href;
  link.media = 'print';
  link.onload = () => {
    link.media = 'all';
  };
  document.head.appendChild(link);
};

/**
 * Removes unused CSS classes from the DOM
 * Useful for cleaning up after dynamic content changes
 */
export const removeUnusedStyles = () => {
  // Get all stylesheets
  const sheets = Array.from(document.styleSheets);
  
  // Get all used classes in the DOM
  const usedClasses = new Set<string>();
  document.querySelectorAll('[class]').forEach((element) => {
    element.classList.forEach((className) => {
      usedClasses.add(className);
    });
  });

  // This is a placeholder for more advanced unused CSS detection
  // In production, use tools like PurgeCSS or UnCSS
  return {
    totalSheets: sheets.length,
    usedClasses: usedClasses.size,
  };
};

/**
 * Inlines critical CSS directly in the HTML head
 * Should be called during SSR or build time
 */
export const inlineCriticalCss = (css: string) => {
  const style = document.createElement('style');
  style.textContent = css;
  style.setAttribute('data-critical', 'true');
  document.head.insertBefore(style, document.head.firstChild);
};

/**
 * Monitors CSS loading performance
 */
export const monitorCssPerformance = () => {
  if (typeof window === 'undefined' || !window.performance) {
    return null;
  }

  const cssResources = performance
    .getEntriesByType('resource')
    .filter((entry) => entry.name.endsWith('.css'));

  const metrics = {
    totalCssFiles: cssResources.length,
    totalCssSize: cssResources.reduce((sum, entry) => {
      return sum + (entry as PerformanceResourceTiming).transferSize || 0;
    }, 0),
    cssLoadTime: cssResources.reduce((max, entry) => {
      return Math.max(max, entry.duration);
    }, 0),
  };

  return metrics;
};
