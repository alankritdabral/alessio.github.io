import Link from 'next/link';
import styles from './Hero.module.css';

const Hero = () => {
  return (
    <section className={styles.hero} style={{ backgroundImage: "url('/images/unnamed.jpg')" }}>
      <div className={styles.overlay}></div>
      <div className={`container ${styles.container}`}>
        <div className={styles.content}>
          <span className="section-subtitle">Authentic Italian Cafe</span>
          <h1>Experience <br /> The Taste of Italy</h1>
          <p>Artisan pizza, delicious pasta, and refreshing shakes. Discover the finest flavors in the heart of your neighborhood.</p>
          <div className={styles.cta}>
            <Link href="#menu" className="btn btn-primary">View Menu</Link>
            <Link href="#booking" className="btn btn-outline" style={{ color: 'white', borderColor: 'white' }}>Reservation</Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
