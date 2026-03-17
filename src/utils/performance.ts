/**
 * Performance monitoring utilities for Core Web Vitals
 */
import { onCLS, onLCP, onFCP, onTTFB, onINP, type Metric } from 'web-vitals';

export interface PerformanceMetric {
  name: string;
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
  timestamp: number;
}

/**
 * Core Web Vitals thresholds
 */
const THRESHOLDS = {
  LCP: { good: 2500, poor: 4000 }, // Largest Contentful Paint
  INP: { good: 200, poor: 500 },   // Interaction to Next Paint
  CLS: { good: 0.1, poor: 0.25 },  // Cumulative Layout Shift
  FCP: { good: 1800, poor: 3000 }, // First Contentful Paint
  TTFB: { good: 800, poor: 1800 }, // Time to First Byte
};

/**
 * Get performance rating based on value and thresholds
 */
const getRating = (value: number, thresholds: { good: number; poor: number }): 'good' | 'needs-improvement' | 'poor' => {
  if (value <= thresholds.good) return 'good';
  if (value <= thresholds.poor) return 'needs-improvement';
  return 'poor';
};

/**
 * Measure Largest Contentful Paint (LCP)
 */
export const measureLCP = (callback: (metric: PerformanceMetric) => void): void => {
  if (!('PerformanceObserver' in window)) return;

  const observer = new PerformanceObserver((list) => {
    const entries = list.getEntries();
    const lastEntry = entries[entries.length - 1] as any;
    
    if (lastEntry) {
      const metric: PerformanceMetric = {
        name: 'LCP',
        value: lastEntry.startTime,
        rating: getRating(lastEntry.startTime, THRESHOLDS.LCP),
        timestamp: Date.now(),
      };
      callback(metric);
    }
  });

  observer.observe({ entryTypes: ['largest-contentful-paint'] });
};

/**
 * Measure Interaction to Next Paint (INP) - replaces FID
 */
export const measureINP = (callback: (metric: PerformanceMetric) => void): void => {
  if (!('PerformanceObserver' in window)) return;

  const observer = new PerformanceObserver((list) => {
    const entries = list.getEntries();
    entries.forEach((entry: any) => {
      const metric: PerformanceMetric = {
        name: 'INP',
        value: entry.processingStart - entry.startTime,
        rating: getRating(entry.processingStart - entry.startTime, THRESHOLDS.INP),
        timestamp: Date.now(),
      };
      callback(metric);
    });
  });

  observer.observe({ entryTypes: ['event'] });
};

/**
 * Measure Cumulative Layout Shift (CLS)
 */
export const measureCLS = (callback: (metric: PerformanceMetric) => void): void => {
  if (!('PerformanceObserver' in window)) return;

  let clsValue = 0;
  let sessionValue = 0;
  let sessionEntries: any[] = [];

  const observer = new PerformanceObserver((list) => {
    const entries = list.getEntries();
    
    entries.forEach((entry: any) => {
      if (!entry.hadRecentInput) {
        const firstSessionEntry = sessionEntries[0];
        const lastSessionEntry = sessionEntries[sessionEntries.length - 1];

        if (sessionValue && entry.startTime - lastSessionEntry.startTime < 1000 && entry.startTime - firstSessionEntry.startTime < 5000) {
          sessionValue += entry.value;
          sessionEntries.push(entry);
        } else {
          sessionValue = entry.value;
          sessionEntries = [entry];
        }

        if (sessionValue > clsValue) {
          clsValue = sessionValue;
          const metric: PerformanceMetric = {
            name: 'CLS',
            value: clsValue,
            rating: getRating(clsValue, THRESHOLDS.CLS),
            timestamp: Date.now(),
          };
          callback(metric);
        }
      }
    });
  });

  observer.observe({ entryTypes: ['layout-shift'] });
};

/**
 * Measure First Contentful Paint (FCP)
 */
export const measureFCP = (callback: (metric: PerformanceMetric) => void): void => {
  if (!('PerformanceObserver' in window)) return;

  const observer = new PerformanceObserver((list) => {
    const entries = list.getEntries();
    entries.forEach((entry: any) => {
      if (entry.name === 'first-contentful-paint') {
        const metric: PerformanceMetric = {
          name: 'FCP',
          value: entry.startTime,
          rating: getRating(entry.startTime, THRESHOLDS.FCP),
          timestamp: Date.now(),
        };
        callback(metric);
      }
    });
  });

  observer.observe({ entryTypes: ['paint'] });
};

/**
 * Measure Time to First Byte (TTFB)
 */
export const measureTTFB = (callback: (metric: PerformanceMetric) => void): void => {
  if (!('PerformanceObserver' in window)) return;

  const observer = new PerformanceObserver((list) => {
    const entries = list.getEntries();
    entries.forEach((entry: any) => {
      if (entry.entryType === 'navigation') {
        const ttfb = entry.responseStart - entry.requestStart;
        const metric: PerformanceMetric = {
          name: 'TTFB',
          value: ttfb,
          rating: getRating(ttfb, THRESHOLDS.TTFB),
          timestamp: Date.now(),
        };
        callback(metric);
      }
    });
  });

  observer.observe({ entryTypes: ['navigation'] });
};

/**
 * Initialize all Core Web Vitals measurements using web-vitals library
 */
export const initializePerformanceMonitoring = (): void => {
  const logMetric = (metric: Metric) => {
    const rating = metric.rating as 'good' | 'needs-improvement' | 'poor';
    console.log(`📊 ${metric.name}: ${metric.value.toFixed(2)}${metric.name === 'CLS' ? '' : 'ms'} (${rating})`);
    
    // In production, send to analytics
    if (import.meta.env.PROD) {
      // Example: sendToAnalytics(metric);
      // You can integrate with Google Analytics, Sentry, or other services
    }
  };

  // Measure Core Web Vitals
  onLCP(logMetric);  // Largest Contentful Paint
  onINP(logMetric);  // Interaction to Next Paint (replaces FID)
  onCLS(logMetric);  // Cumulative Layout Shift
  onFCP(logMetric);  // First Contentful Paint
  onTTFB(logMetric); // Time to First Byte
};

/**
 * Get current page performance metrics
 */
export const getPagePerformanceMetrics = (): Record<string, number> => {
  const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
  
  if (!navigation) {
    return {};
  }

  return {
    // Navigation timing
    domContentLoaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
    loadComplete: navigation.loadEventEnd - navigation.loadEventStart,
    
    // Network timing
    dns: navigation.domainLookupEnd - navigation.domainLookupStart,
    tcp: navigation.connectEnd - navigation.connectStart,
    request: navigation.responseStart - navigation.requestStart,
    response: navigation.responseEnd - navigation.responseStart,
    
    // Page timing
    domInteractive: navigation.domInteractive - navigation.startTime,
    domComplete: navigation.domComplete - navigation.startTime,
    
    // Total time
    totalTime: navigation.loadEventEnd - navigation.startTime,
  };
};

/**
 * Monitor resource loading performance
 */
export const monitorResourcePerformance = (): void => {
  if (!('PerformanceObserver' in window)) return;

  const observer = new PerformanceObserver((list) => {
    const entries = list.getEntries();
    
    entries.forEach((entry: any) => {
      // Log slow resources (> 1 second)
      if (entry.duration > 1000) {
        console.warn(`Slow resource: ${entry.name} took ${entry.duration.toFixed(2)}ms`);
      }
      
      // Log large resources (> 500KB)
      if (entry.transferSize > 500000) {
        console.warn(`Large resource: ${entry.name} is ${(entry.transferSize / 1024).toFixed(2)}KB`);
      }
    });
  });

  observer.observe({ entryTypes: ['resource'] });
};