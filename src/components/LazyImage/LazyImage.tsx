import { useState, useEffect, useRef } from 'react';
import './LazyImage.css';

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number | string;
  height?: number | string;
  placeholder?: string;
  srcSet?: string;
  sizes?: string;
  /** Root margin for IntersectionObserver (default: '200px') */
  rootMargin?: string;
  /** Threshold for IntersectionObserver (default: 0.01) */
  threshold?: number;
  /** Priority loading for above-the-fold images (skips lazy loading) */
  priority?: boolean;
  /** Callback when image loads successfully */
  onLoad?: () => void;
  /** Callback when image fails to load */
  onError?: () => void;
}

export const LazyImage = ({
  src,
  alt,
  className = '',
  width,
  height,
  placeholder = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"%3E%3Crect fill="%23f0f0f0" width="400" height="300"/%3E%3C/svg%3E',
  srcSet,
  sizes,
  rootMargin = '50px', // Reduced for better performance
  threshold = 0.01,
  priority = false,
  onLoad,
  onError,
}: LazyImageProps) => {
  const [imageSrc, setImageSrc] = useState(priority ? src : placeholder);
  const [imageSrcSet, setImageSrcSet] = useState<string | undefined>(priority ? srcSet : undefined);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    // Skip lazy loading for priority images
    if (priority) {
      return;
    }

    // Check if IntersectionObserver is supported
    if (!('IntersectionObserver' in window)) {
      // Fallback: load image immediately
      setImageSrc(src);
      if (srcSet) {
        setImageSrcSet(srcSet);
      }
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setImageSrc(src);
            if (srcSet) {
              setImageSrcSet(srcSet);
            }
            observer.disconnect();
          }
        });
      },
      {
        rootMargin, // Start loading before image enters viewport
        threshold, // Trigger when even a small portion is visible
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [src, srcSet, rootMargin, threshold, priority]);

  const handleLoad = () => {
    setIsLoaded(true);
    setHasError(false);
    onLoad?.();
  };

  const handleError = () => {
    setHasError(true);
    onError?.();
  };

  return (
    <img
      ref={imgRef}
      src={imageSrc}
      srcSet={imageSrcSet}
      sizes={sizes}
      alt={alt}
      className={`lazy-image ${isLoaded ? 'loaded' : 'loading'} ${hasError ? 'error' : ''} ${className}`}
      width={width}
      height={height}
      onLoad={handleLoad}
      onError={handleError}
      loading={priority ? 'eager' : 'lazy'}
      fetchPriority={priority ? 'high' : 'auto'}
      decoding={priority ? 'sync' : 'async'}
    />
  );
};
