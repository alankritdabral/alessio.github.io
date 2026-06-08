import React from 'react';
import styles from './Walkthrough.module.css';
import { assetPath } from '@/lib/assets';

const Walkthrough = () => {
  return (
    <section className="section" id="walkthrough">
      {/* Silently preload the first heavy 360 image in the background with low priority */}
      <link rel="preload" href={assetPath('/walkthrough/images/1.jpg')} as="image" />
      <div className="container">
        <div className="text-center mb-4">
          <span className="section-subtitle">Virtual Tour</span>
          <h2 className="section-title">Explore Our Space</h2>
          <p className={styles.subtitle}>A fully immersive 360° walkthrough of our cafe</p>
        </div>
        <div className={styles.playerWrapper}>
          <iframe
            src={assetPath('/walkthrough/player.html')}
            className={styles.iframe}
            title="Virtual Tour"
            allowFullScreen
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </section>
  );
};

export default Walkthrough;
