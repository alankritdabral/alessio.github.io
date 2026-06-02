'use client';

import { useState, useEffect } from 'react';
import { assetPath } from '@/lib/assets';
import styles from './Slideshow.module.css';

const images: (`/${string}`)[] = [
  '/images/unnamed (3).jpg',
  '/images/unnamed (4).jpg',
  '/images/unnamed (7).jpg',
  '/images/unnamed10.jpg',
];

const Slideshow = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className={styles.slideshow}>
      <div className={styles.container}>
        {images.map((img, index) => (
          <div
            key={img}
            className={`${styles.slide} ${index === current ? styles.active : ''}`}
            style={{ backgroundImage: `url('${assetPath(img)}')` }}
          >
            <div className={styles.overlay}></div>
          </div>
        ))}
        <div className={styles.content}>
          <span className="section-subtitle">Exquisite Flavors</span>
          <h2 className="section-title" style={{ color: 'white' }}>Crafted with Passion</h2>
          <p>Every dish tells a story of tradition and quality ingredients.</p>
        </div>
        <div className={styles.dots}>
          {images.map((_, index) => (
            <button
              key={index}
              className={`${styles.dot} ${index === current ? styles.dotActive : ''}`}
              onClick={() => setCurrent(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Slideshow;
