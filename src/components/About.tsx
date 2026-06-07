import { assetPath } from '@/lib/assets';
import styles from './About.module.css';

const About = () => {
  return (
    <section className="section bg-light" id="about">
      <div className="container">
        <div className={styles.grid}>
          <div className={styles.imageWrapper}>
            <img 
              src={assetPath('/images/unnamed-1.jpg')}
              alt="Restaurant Interior" 
              className={styles.mainImg}
            />
            <img 
              src={assetPath('/images/unnamed-2.jpg')}
              alt="Chef" 
              className={styles.subImg}
            />
          </div>
          <div className={styles.content}>
            <span className="section-subtitle">Italian Tradition</span>
            <h2 className="section-title">A Hidden Gem in Dehradun</h2>
            <p>
              Alessio&apos;s Cafe & Pizzeria is a peaceful retreat nestled away from the urban bustle. We represent the vanguard of Dehradun&apos;s evolving culinary identity, bridging the gap between international trends and local sensibilities.
            </p>
            <p>
              Our story is one of passion—the transition from mass-produced corporate pizza to artisanal, thin-crust perfection. At Alessio&apos;s, every dish tells a story. We prioritize atmospheric serenity and traditional Italian methodologies, utilizing in-house handmade bread and the finest ingredients.
            </p>
            <p>
              Located near the Maharana Pratap Sports College, we serve as a social hub for athletes, students, and families seeking a &quot;magical&quot; dining experience under the evening fairy lights.
            </p>
            <div className={styles.signature}>
              <p className={styles.signatureText}>Anshul Parmar</p>
              <p>Founder - Anshul Parmar</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
