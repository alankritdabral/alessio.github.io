'use client';

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import { assetPath } from '@/lib/assets';
import styles from './Slideshow.module.css';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

const images: string[] = [
  '/images/unnamed-3.jpg',
  '/images/unnamed-4.jpg',
  '/images/unnamed-7.jpg',
  '/images/unnamed-10.jpg',
];

const Slideshow = () => {
  return (
    <section className={styles.slideshow}>
      <Swiper
        modules={[Autoplay, Pagination]}
        spaceBetween={0}
        slidesPerView={1}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
          bulletActiveClass: styles.dotActive,
          bulletClass: styles.dot,
        }}
        loop={true}
        className={styles.swiper}
      >
        {images.map((img, index) => (
          <SwiperSlide key={index}>
            <div
              className={styles.slide}
              style={{ backgroundImage: `url('${assetPath(img)}')` }}
            >
              <div className={styles.overlay}></div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      
      <div className={styles.content}>
        <span className="section-subtitle">Exquisite Flavors</span>
        <h2 className="section-title" style={{ color: 'white' }}>Crafted with Passion</h2>
        <p>Every dish tells a story of tradition and quality ingredients.</p>
      </div>
    </section>
  );
};

export default Slideshow;
