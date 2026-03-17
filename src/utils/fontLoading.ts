/**
 * Font loading utilities for performance optimization
 */

export interface FontConfig {
  family: string;
  weight?: string;
  style?: string;
  display?: 'auto' | 'block' | 'swap' | 'fallback' | 'optional';
}

export interface FontLoadingMetrics {
  totalFonts: number;
  loadedFonts: number;
  failedFonts: number;
  loadTime: number;
}

/**
 * Preload critical fonts
 * @param fonts - Array of font configurations to preload
 */
export const preloadFonts = (fonts: FontConfig[]): void => {
  fonts.forEach(font => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'font';
    link.type = 'font/woff2';
    link.crossOrigin = 'anonymous';
    
    // Generate font URL (this would be customized based on your font hosting)
    const fontUrl = generateFontUrl(font);
    if (fontUrl) {
      link.href = fontUrl;
      document.head.appendChild(link);
    }
  });
};

/**
 * Generate font URL based on configuration
 * @param _font - Font configuration (unused, reserved for future implementation)
 * @returns Font URL or null if not applicable
 */
const generateFontUrl = (_font: FontConfig): string | null => {
  // For Google Fonts, we rely on the HTML preconnect and link tags
  // For local fonts, you would generate the actual font file URLs here
  return null;
};

/**
 * Check if a font is loaded
 * @param fontFamily - Font family name
 * @param weight - Font weight (optional)
 * @returns Promise that resolves when font is loaded
 */
export const waitForFont = (fontFamily: string, weight: string = '400'): Promise<void> => {
  return new Promise((resolve) => {
    if (!document.fonts) {
      // Fallback for browsers without Font Loading API
      setTimeout(resolve, 100);
      return;
    }

    const font = new FontFace(fontFamily, `local(${fontFamily})`, {
      weight,
    });

    document.fonts.add(font);
    
    font.load().then(() => {
      resolve();
    }).catch(() => {
      // Font failed to load, resolve anyway to prevent blocking
      resolve();
    });
  });
};

/**
 * Monitor font loading performance
 * @returns Font loading metrics
 */
export const monitorFontLoading = (): Promise<FontLoadingMetrics> => {
  return new Promise((resolve) => {
    if (!document.fonts) {
      resolve({
        totalFonts: 0,
        loadedFonts: 0,
        failedFonts: 0,
        loadTime: 0,
      });
      return;
    }

    const startTime = performance.now();
    
    document.fonts.ready.then(() => {
      const loadTime = performance.now() - startTime;
      const fonts = Array.from(document.fonts);
      
      const metrics: FontLoadingMetrics = {
        totalFonts: fonts.length,
        loadedFonts: fonts.filter(f => f.status === 'loaded').length,
        failedFonts: fonts.filter(f => f.status === 'error').length,
        loadTime,
      };
      
      resolve(metrics);
    });
  });
};

/**
 * Initialize font loading optimization
 */
export const initializeFontLoading = (): void => {
  // Add font-display: swap to any dynamically loaded fonts
  if (document.fonts) {
    document.fonts.ready.then(() => {
      // All fonts have loaded, add a class to body for any font-dependent styling
      document.body.classList.add('fonts-loaded');
      
      // Log font loading metrics in development
      if (process.env.NODE_ENV === 'development') {
        monitorFontLoading().then(metrics => {
          console.log('Font Loading Metrics:', metrics);
        });
      }
    });
  }

  // Preload critical fonts
  const criticalFonts: FontConfig[] = [
    { family: 'Manrope', weight: '400', display: 'swap' },
    { family: 'Manrope', weight: '600', display: 'swap' },
    { family: 'Quicksand', weight: '500', display: 'swap' },
  ];

  preloadFonts(criticalFonts);
};

/**
 * Add fallback font loading for critical text
 */
export const addFontFallbacks = (): void => {
  const style = document.createElement('style');
  style.textContent = `
    /* Font loading fallbacks with system font stack */
    .font-loading {
      font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    }
    
    .fonts-loaded .font-loading {
      font-family: 'Manrope', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    }
    
    /* Prevent layout shift during font loading */
    body {
      font-family: 'Manrope', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    }
    
    /* Optimize font rendering */
    body {
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      text-rendering: optimizeLegibility;
    }
  `;
  document.head.appendChild(style);
};

/**
 * Test font loading across different connection speeds
 * Useful for development and testing
 */
export const testFontLoading = async (): Promise<void> => {
  console.log('Testing font loading...');
  
  const fonts = ['Manrope', 'Quicksand', 'Caveat'];
  const results: Record<string, boolean> = {};
  
  for (const font of fonts) {
    try {
      await waitForFont(font);
      results[font] = true;
      console.log(`✓ ${font} loaded successfully`);
    } catch (error) {
      results[font] = false;
      console.error(`✗ ${font} failed to load:`, error);
    }
  }
  
  const metrics = await monitorFontLoading();
  console.log('Font Loading Test Results:', {
    results,
    metrics,
  });
};