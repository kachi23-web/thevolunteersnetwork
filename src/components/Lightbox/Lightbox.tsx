import { useState, useEffect, useCallback } from 'react';
import './Lightbox.css';

export interface LightboxImage {
  id: string;
  src: string;
  alt: string;
  caption?: string;
}

export interface LightboxProps {
  images: LightboxImage[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onNavigate?: (index: number) => void;
}

export const Lightbox = ({
  images,
  currentIndex,
  isOpen,
  onClose,
  onNavigate,
}: LightboxProps) => {
  const [index, setIndex] = useState(currentIndex);

  useEffect(() => {
    setIndex(currentIndex);
  }, [currentIndex]);

  const goToPrevious = useCallback(() => {
    const newIndex = index === 0 ? images.length - 1 : index - 1;
    setIndex(newIndex);
    onNavigate?.(newIndex);
  }, [index, images.length, onNavigate]);

  const goToNext = useCallback(() => {
    const newIndex = index === images.length - 1 ? 0 : index + 1;
    setIndex(newIndex);
    onNavigate?.(newIndex);
  }, [index, images.length, onNavigate]);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (!isOpen) return;
      
      switch (event.key) {
        case 'Escape':
          onClose();
          break;
        case 'ArrowLeft':
          goToPrevious();
          break;
        case 'ArrowRight':
          goToNext();
          break;
      }
    },
    [isOpen, onClose, goToPrevious, goToNext]
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen || images.length === 0) return null;

  const currentImage = images[index];

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="lightbox-overlay" onClick={handleBackdropClick}>
      <button
        className="lightbox-close"
        onClick={onClose}
        aria-label="Close lightbox"
      >
        ×
      </button>

      {images.length > 1 && (
        <>
          <button
            className="lightbox-nav lightbox-nav-prev"
            onClick={goToPrevious}
            aria-label="Previous image"
          >
            ‹
          </button>
          <button
            className="lightbox-nav lightbox-nav-next"
            onClick={goToNext}
            aria-label="Next image"
          >
            ›
          </button>
        </>
      )}

      <div className="lightbox-content">
        <img
          src={currentImage.src}
          alt={currentImage.alt}
          className="lightbox-image"
        />
        {currentImage.caption && (
          <div className="lightbox-caption">{currentImage.caption}</div>
        )}
        {images.length > 1 && (
          <div className="lightbox-counter">
            {index + 1} / {images.length}
          </div>
        )}
      </div>
    </div>
  );
};
