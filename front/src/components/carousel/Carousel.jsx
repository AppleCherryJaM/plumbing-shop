import React, { useState, useEffect, useRef } from 'react';
import { ProductItem } from '../components';
import Slide from '../slide/Slide';
import styles from './Carousel.module.css';

const Carousel = ({ content, type = 'default' }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [itemWidth, setItemWidth] = useState(0);
  const carouselRef = useRef(null);
  const viewportRef = useRef(null);
  const itemsToShow = 4;

  // Рассчитываем ширину элемента
  useEffect(() => {
    if (!carouselRef.current || type !== 'default') return;
    
    const updateItemWidth = () => {
      const viewportWidth = viewportRef.current.offsetWidth;
      const gap = 20;
      const calculatedWidth = (viewportWidth - (gap * (itemsToShow - 1))) / itemsToShow;
      setItemWidth(calculatedWidth);
    };

    updateItemWidth();
    
    const handleResize = () => {
      updateItemWidth();
      if (carouselRef.current) {
        carouselRef.current.style.transform = `translateX(-${currentIndex * (itemWidth + 20)}px)`;
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [currentIndex, type, itemsToShow, itemWidth]);

  // Плавная анимация скроллинга
  useEffect(() => {
    if (!carouselRef.current || type !== 'default' || itemWidth === 0) return;
    
    const translateValue = currentIndex * (itemWidth + 20);
    
    carouselRef.current.style.transition = isAnimating ? 'transform 0.5s ease' : 'none';
    carouselRef.current.style.transform = `translateX(-${translateValue}px)`;
  }, [currentIndex, type, isAnimating, itemWidth]);

  // Функции для карусели товаров
  const toPrevSlide = () => {
    if (isAnimating || content.data.length <= itemsToShow) return;
    setIsAnimating(true);
    setCurrentIndex(prev => Math.max(0, prev - 1));
    setTimeout(() => setIsAnimating(false), 500);
  };

  const toNextSlide = () => {
    if (isAnimating || content.data.length <= itemsToShow) return;
    setIsAnimating(true);
    setCurrentIndex(prev => Math.min(content.data.length - itemsToShow, prev + 1));
    setTimeout(() => setIsAnimating(false), 500);
  };

  // Функции для баннера
  const toPrevBanner = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex(prev => prev === 0 ? content.data.length - 1 : prev - 1);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const toNextBanner = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex(prev => prev === content.data.length - 1 ? 0 : prev + 1);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const toSlide = (index) => {
    if (isAnimating || index === currentIndex) return;
    setIsAnimating(true);
    setCurrentIndex(index);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const handleSlideClick = (e) => {
    e.preventDefault();
    // Дополнительная логика при клике на слайд
    console.log('Slide clicked');
  };

  const showNavigation = type === 'default' && content.data.length > itemsToShow;

  if (type === 'banner') {
    return (
      <div className={styles.bannerContainer}>
        <Slide 
          slide={content.data[currentIndex]} 
          isActive={true}
          onClick={handleSlideClick}
        />
        
        {content.data.length > 1 && (
          <>
            <button 
              className={styles.bannerArrowPrev} 
              onClick={toPrevBanner}
              disabled={isAnimating}
            >
              &lt;
            </button>
            <button 
              className={styles.bannerArrowNext} 
              onClick={toNextBanner}
              disabled={isAnimating}
            >
              &gt;
            </button>
            
            <div className={styles.bannerDots}>
              {content.data.map((_, index) => (
                <button
                  key={index}
                  className={`${styles.dot} ${index === currentIndex ? styles.active : ''}`}
                  onClick={() => toSlide(index)}
                  disabled={isAnimating}
                />
              ))}
            </div>
          </>
        )}
      </div>
    );
  }

  return (
    <div className={styles.productsCarousel}>
      {showNavigation && (
        <button 
          className={`${styles.carouselArrow} ${styles.prev}`} 
          onClick={toPrevSlide}
          disabled={isAnimating || currentIndex === 0}
        >
          &lt;
        </button>
      )}
      
      <div ref={viewportRef} className={styles.carouselViewport}>
        <div ref={carouselRef} className={styles.carouselTrack}>
          {content.data.map((product) => (
            <div 
              key={product.id} 
              className={styles.carouselItem}
              style={{ width: `${itemWidth}px` }}
            >
              <ProductItem product={product} />
            </div>
          ))}
        </div>
      </div>
      
      {showNavigation && (
        <button 
          className={`${styles.carouselArrow} ${styles.next}`} 
          onClick={toNextSlide}
          disabled={isAnimating || currentIndex >= content.data.length - itemsToShow}
        >
          &gt;
        </button>
      )}
    </div>
  );
};

export default Carousel;