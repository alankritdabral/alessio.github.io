'use client';

import React, { useState, useEffect, useRef } from 'react';
import styles from './Walkthrough.module.css';
import { assetPath } from '@/lib/assets';

const Walkthrough = () => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data === 'enterFullscreen') {
        setIsFullscreen(true);
        document.body.style.overflow = 'hidden';
      } else if (event.data === 'exitFullscreen') {
        setIsFullscreen(false);
        document.body.style.overflow = '';
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isFullscreen) {
        setIsFullscreen(false);
        document.body.style.overflow = '';
        iframeRef.current?.contentWindow?.postMessage('syncExitFullscreen', '*');
      }
    };

    window.addEventListener('message', handleMessage);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('message', handleMessage);
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isFullscreen]);

  return (
    <section className="section" id="walkthrough">
      <div className="container">
        {!isFullscreen && (
          <div className="text-center mb-4">
            <span className="section-subtitle">Virtual Tour</span>
            <h2 className="section-title">Explore Our Space</h2>
            <p className={styles.subtitle}>A fully immersive 360° walkthrough of our cafe</p>
          </div>
        )}
        <div className={`${styles.playerWrapper} ${isFullscreen ? styles.fullScreen : ''}`}>
          <iframe
            ref={iframeRef}
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
