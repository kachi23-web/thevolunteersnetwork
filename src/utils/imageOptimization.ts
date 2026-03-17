/**
 * Image optimization utilities for responsive images
 */

export interface ResponsiveImageConfig {
  src: string;
  widths?: number[];
  formats?: string[];
  rootMargin?: string;
  threshold?: number;
}

export interface LazyImageConfig {
  src: string;
  alt: string;
  srcSet?: string;
  sizes?: string;
  rootMargin?: string;
  threshold?: number;
  className?: string;
  width?: number | string;
  height?: number | string;
}

/**
 * Generate srcSet string for responsive images
 * @param src - Base image source
 * @param widths - Array of widths to generate
 * @returns srcSet string
 */
export const generateSrcSet = (src: string, widths: number[] = [320, 640, 768, 1024, 1280, 1920]): string => {
  // For now, return the same image for all sizes
  // In production, you would generate different sized images
  return widths.map(width => `${src} ${width}w`).join(', ');
};

/**
 * Generate sizes attribute for responsive images
 * @param breakpoints - Object mapping breakpoints to sizes
 * @returns sizes string
 */
export const generateSizes = (breakpoints: Record<string, string> = {}): string => {
  const defaultSizes = {
    '(max-width: 576px)': '100vw',
    '(max-width: 768px)': '90vw',
    '(max-width: 1024px)': '80vw',
    ...breakpoints,
  };

  const sizeEntries = Object.entries(defaultSizes);
  const mediaQueries = sizeEntries.slice(0, -1).map(([query, size]) => `${query} ${size}`);
  const defaultSize = sizeEntries[sizeEntries.length - 1][1];

  return [...mediaQueries, defaultSize].join(', ');
};

/**
 * Get optimized image props for LazyImage component
 * @param config - Image configuration
 * @returns Props for LazyImage component
 */
export const getResponsiveImageProps = (config: ResponsiveImageConfig): LazyImageConfig => {
  const { src, widths, rootMargin = '200px', threshold = 0.01 } = config;

  return {
    src,
    alt: '', // Must be provided by caller
    srcSet: widths ? generateSrcSet(src, widths) : undefined,
    sizes: generateSizes(),
    rootMargin,
    threshold,
  };
};

/**
 * Preload critical images
 * @param images - Array of image URLs to preload
 */
export const preloadImages = (images: string[]): void => {
  images.forEach(src => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = src;
    document.head.appendChild(link);
  });
};

/**
 * Check if WebP is supported
 * @returns Promise that resolves to true if WebP is supported
 */
export const isWebPSupported = (): Promise<boolean> => {
  return new Promise((resolve) => {
    const webP = new Image();
    webP.onload = webP.onerror = () => {
      resolve(webP.height === 2);
    };
    webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
  });
};
