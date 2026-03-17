import { useState, useEffect, useCallback } from 'react';
import './Carousel.css';

export interface CarouselItem {
  id: string;
  content: React.ReactNode;
}

export interface CarouselProps {
  items: CarouselItem[];
  autoplay?: boolean;
  autoplayInterval?: number;
  navigation?: boolean;
  pagination?: boolean;
  className?: string;
}

export const Carousel = ({
  items,
  autoplay = false,
  autoplayInterval = 5000,
  navigation = true,
  pagination = true,
  className = '',
}: CarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToSlide = useCallback((index: number) => {
    setCurrentIndex(index);
  }, []);

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? items.length - 1 : prevIndex - 1
    );
  }, [items.length]);

  const goToNext = useCallback(() => {
    setCurrentIndex((prevIndex) => 
      prevIndex === items.length - 1 ? 0 : prevIndex + 1
    );
  }, [items.length]);

  useEffect(() => {
    if (!autoplay || items.length <= 1) return;

    const interval = setInterval(goToNext, autoplayInterval);
    return () => clearInterval(interval);
  }, [autoplay, autoplayInterval, goToNext, items.length]);

  if (items.length === 0) {
    return <div className="carousel-empty">No items to display</div>;
  }

  return (
    <div className={`carousel ${className}`}>
      <div className="carousel-container">
        <div 
          className="carousel-track"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {items.map((item) => (
            <div key={item.id} className="carousel-slide">
              {item.content}
            </div>
          ))}
        </div>

        {navigation && items.length > 1 && (
          <>
            <button
              className="carousel-button carousel-button-prev"
              onClick={goToPrevious}
              aria-label="Previous slide"
            >
              ‹
            </button>
            <button
              className="carousel-button carousel-button-next"
              onClick={goToNext}
              aria-label="Next slide"
            >
              ›
            </button>
          </>
        )}
      </div>

      {pagination && items.length > 1 && (
        <div className="carousel-pagination">
          {items.map((item, index) => (
            <button
              key={item.id}
              className={`carousel-dot ${index === currentIndex ? 'active' : ''}`}
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};
