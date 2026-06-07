import Link from 'next/link';
import { assetPath } from '@/lib/assets';
import styles from './Hero.module.css';

const Hero = () => {
  return (
    <section className={styles.hero} style={{ backgroundImage: `url('${assetPath('/images/unnamed.jpg')}')` }}>
      <div className={styles.overlay}></div>
      <div className={`container ${styles.container}`}>
        <div className={styles.content}>
          <span className="section-subtitle">The Hidden Gem of Dehradun</span>
          <h1>Experience <br /> The Taste of Italy</h1>
          <p>Artisan pizza, delicious pasta, and refreshing shakes. Discover a peaceful retreat with authentic flavors.</p>
          <div className={styles.cta}>
            <Link href="#menu" className="btn btn-primary btn-lg btn-glow">View Menu</Link>
            <Link href="#booking" className="btn btn-outline" style={{ color: 'white', borderColor: 'white' }}>Reservation</Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
