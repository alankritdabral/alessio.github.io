import { assetPath } from '@/lib/assets';
import styles from './About.module.css';

const About = () => {
  return (
    <section className="section" id="about">
      <div className="container">
        <div className={styles.grid}>
          <div className={styles.imageWrapper}>
            <img 
              src={assetPath('/images/unnamed (1).jpg')}
              alt="Restaurant Interior" 
              className={styles.mainImg}
            />
            <img 
              src={assetPath('/images/unnamed (2).jpg')}
              alt="Chef" 
              className={styles.subImg}
            />
          </div>
          <div className={styles.content}>
            <span className="section-subtitle">Italian Tradition</span>
            <h2 className="section-title">Our Culinary Story</h2>
            <p>
              Alessio&apos;s Cafe & Pizzeria is a labor of love, bringing the authentic flavors of Italy to the heart of Dehradun. We believe that great food starts with simple, high-quality ingredients and a passion for tradition.
            </p>
            <p>
              From our artisan pizzas baked to perfection to our delicious pasta and refreshing beverages, every item on our menu is a celebration of flavors. Join us for a taste of fine dining right here in your neighborhood.
            </p>
            <div className={styles.signature}>
              <p className={styles.signatureText}>Luca Alessio</p>
              <p>Founder - Luca Alessio</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
