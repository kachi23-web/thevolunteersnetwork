/**
 * Critical CSS extraction utility for better LCP
 * This utility helps identify and extract critical CSS for above-the-fold content
 */

/**
 * Critical CSS selectors that should be inlined for immediate rendering
 */
export const criticalSelectors = [
  // Base styles
  'html',
  'body',
  '*',
  '*::before',
  '*::after',
  
  // Layout containers
  '#root',
  '.app',
  '.container',
  '.ul-container',
  
  // Header (always visible)
  '.header',
  '.header *',
  '.navbar',
  '.nav-link',
  '.logo',
  
  // Banner section (above-the-fold)
  '.banner-section',
  '.banner-content',
  '.banner-title',
  '.banner-subtitle',
  '.banner-description',
  '.banner-buttons',
  
  // Critical buttons
  '.btn',
  '.btn-primary',
  '.ul-btn',
  
  // About section (likely above-the-fold)
  '.about-section',
  '.about-content',
  '.about-image',
  '.about-text',
  
  // Loading states
  '.loading-spinner',
  '.lazy-image',
  '.lazy-image.loading',
  
  // Typography (critical)
  'h1',
  'h2',
  'p',
  
  // Accessibility
  '.skip-to-content',
  '.sr-only',
  
  // Error boundaries
  '.error-boundary',
];

/**
 * Generate critical CSS string for inlining
 */
export const generateCriticalCSS = (): string => {
  return `
    /* Critical CSS for immediate rendering */
    html, body {
      margin: 0;
      padding: 0;
      font-family: 'Manrope', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
      line-height: 1.6;
      color: #333;
      background-color: #fff;
      font-display: swap;
    }
    
    *, *::before, *::after {
      box-sizing: border-box;
    }
    
    #root {
      min-height: 100vh;
    }
    
    /* Critical layout */
    .container, .ul-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 15px;
    }
    
    /* Header critical styles */
    .header {
      position: relative;
      z-index: 1000;
      background: #fff;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    }
    
    /* Banner critical styles */
    .banner-section {
      position: relative;
      min-height: 60vh;
      display: flex;
      align-items: center;
      background: linear-gradient(135deg, #ff5722, #ff7043);
      color: white;
    }
    
    .banner-content {
      text-align: center;
      max-width: 800px;
      margin: 0 auto;
      padding: 2rem;
    }
    
    .banner-title {
      font-size: clamp(2rem, 5vw, 3.5rem);
      font-weight: 700;
      margin-bottom: 1rem;
      line-height: 1.2;
    }
    
    .banner-subtitle {
      font-size: 1.1rem;
      margin-bottom: 0.5rem;
      opacity: 0.9;
    }
    
    .banner-description {
      font-size: 1rem;
      margin-bottom: 2rem;
      opacity: 0.9;
      max-width: 600px;
      margin-left: auto;
      margin-right: auto;
    }
    
    /* Critical button styles */
    .btn, .ul-btn {
      display: inline-flex;
      align-items: center;
      padding: 12px 24px;
      background: linear-gradient(135deg, #ff5722, #ff7043);
      color: white;
      text-decoration: none;
      border-radius: 6px;
      font-weight: 600;
      border: none;
      cursor: pointer;
      transition: transform 0.2s ease;
      font-size: 1rem;
    }
    
    .btn:hover, .ul-btn:hover {
      transform: translateY(-2px);
    }
    
    /* Loading spinner */
    .loading-spinner {
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 40px;
      height: 40px;
      border: 3px solid #f3f3f3;
      border-top: 3px solid #ff5722;
      border-radius: 50%;
      animation: spin 1s linear infinite;
      z-index: 9999;
    }
    
    @keyframes spin {
      0% { transform: translate(-50%, -50%) rotate(0deg); }
      100% { transform: translate(-50%, -50%) rotate(360deg); }
    }
    
    /* Image loading states */
    .lazy-image {
      transition: opacity 0.3s ease;
      max-width: 100%;
      height: auto;
    }
    
    .lazy-image.loading {
      opacity: 0.7;
    }
    
    .lazy-image.loaded {
      opacity: 1;
    }
    
    /* Typography */
    h1, h2, h3, h4, h5, h6 {
      font-family: 'Manrope', sans-serif;
      font-weight: 600;
      line-height: 1.3;
      margin-bottom: 1rem;
    }
    
    p {
      margin-bottom: 1rem;
      line-height: 1.6;
    }
    
    /* Accessibility */
    .skip-to-content {
      position: absolute;
      top: -40px;
      left: 6px;
      background: #000;
      color: #fff;
      padding: 8px;
      text-decoration: none;
      z-index: 10000;
    }
    
    .skip-to-content:focus {
      top: 6px;
    }
    
    .sr-only {
      position: absolute;
      width: 1px;
      height: 1px;
      padding: 0;
      margin: -1px;
      overflow: hidden;
      clip: rect(0, 0, 0, 0);
      white-space: nowrap;
      border: 0;
    }
    
    /* Responsive design */
    @media (max-width: 768px) {
      .banner-content {
        padding: 1rem;
      }
      
      .banner-title {
        font-size: 2rem;
      }
      
      .container, .ul-container {
        padding: 0 10px;
      }
    }
  `;
};

/**
 * Inject critical CSS into the document head
 */
export const injectCriticalCSS = (): void => {
  const criticalCSS = generateCriticalCSS();
  const style = document.createElement('style');
  style.textContent = criticalCSS;
  style.setAttribute('data-critical', 'true');
  document.head.insertBefore(style, document.head.firstChild);
};

/**
 * Remove critical CSS after main CSS loads
 */
export const removeCriticalCSS = (): void => {
  const criticalStyles = document.querySelectorAll('style[data-critical="true"]');
  criticalStyles.forEach(style => style.remove());
};

/**
 * Monitor CSS loading and remove critical CSS when done
 */
export const monitorCSSLoading = (): void => {
  const stylesheets = document.querySelectorAll('link[rel="stylesheet"]') as NodeListOf<HTMLLinkElement>;
  let loadedCount = 0;
  
  const checkAllLoaded = () => {
    loadedCount++;
    if (loadedCount === stylesheets.length) {
      // All CSS loaded, remove critical CSS
      setTimeout(removeCriticalCSS, 100);
    }
  };
  
  stylesheets.forEach(link => {
    if (link.sheet) {
      // Already loaded
      checkAllLoaded();
    } else {
      link.addEventListener('load', checkAllLoaded);
    }
  });
};