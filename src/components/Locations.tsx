import { assetPath } from '@/lib/assets';
import styles from './Locations.module.css';

const Locations = () => {
  return (
    <section className={styles.locations} id="locations" style={{ backgroundImage: `url('${assetPath('/images/unnamed-10.jpg')}')` }}>
      <div className={styles.overlay}></div>
      <div className={`container ${styles.container}`}>
        <div className={styles.grid}>
          <div className={styles.content}>
            <span className={styles.subtitle}>Find Us</span>
            <h2 className={styles.title}>Contact & Location</h2>
            <div className={styles.info}>
              <div className={styles.item}>
                <h4>Alessio&apos;s Cafe & Pizzeria</h4>
                <p>Near Maharana Pratap Sports College, Maharana Pratap Chowk, Raipur, Dehradun, Uttarakhand 248008</p>
                <div className={styles.hours}>
                  <p>Mon - Wed: 10:30 AM - 9:30 PM</p>
                  <p>Thu - Sun: 10:30 AM - 10:00 PM</p>
                </div>
                <p className={styles.note}>Experience our magical atmosphere with evening fairy lights in our outdoor seating.</p>
                <a 
                  href="https://share.google/uCyBJOWICaj8wHyh2" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={styles.mapLink}
                >
                  View on Google Maps
                </a>
              </div>
            </div>
            <div className={styles.contact}>
              <p><strong>Phone:</strong> +91 98975 92564</p>
              <p><strong>Email:</strong> info@alessioscafe.in</p>
            </div>
          </div>
          <div className={styles.mapWrapper}>
            <iframe 
              src="https://maps.google.com/maps?q=Alessio's%20Cafe%20%26%20Pizzeria%20Dehradun&t=&z=15&ie=UTF8&iwloc=&output=embed" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen={true} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Alessio's Cafe & Pizzeria Location"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Locations;
