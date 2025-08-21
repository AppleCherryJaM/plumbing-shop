import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Slide.module.css';

const Slide = ({ slide, isActive, onClick }) => {
  if (!slide) return null;

  return (
    <div className={`${styles.slide} ${isActive ? styles.active : ''}`}>
      <Link to={slide.link || '#'} onClick={onClick}>
        <img 
          src={slide.image} 
          alt={slide.title || 'Banner'}
          className={styles.bannerImage}
        />
        <div className={styles.slideContent}>
          {slide.title && <h2 className={styles.slideTitle}>{slide.title}</h2>}
          {slide.subtitle && <p className={styles.slideSubtitle}>{slide.subtitle}</p>}
          {slide.buttonText && (
            <button className={styles.slideButton}>
              {slide.buttonText}
            </button>
          )}
        </div>
      </Link>
    </div>
  );
};

export default Slide;