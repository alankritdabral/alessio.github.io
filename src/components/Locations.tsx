import styles from './Locations.module.css';

const Locations = () => {
  return (
    <section className={styles.locations} id="locations" style={{ backgroundImage: "url('/images/unnamed10.jpg')" }}>
      <div className={styles.overlay}></div>
      <div className={`container ${styles.container}`}>
        <div className={styles.grid}>
          <div className={styles.content}>
            <span className={styles.subtitle}>Find Us</span>
            <h2 className={styles.title}>Our Locations</h2>
            <div className={styles.info}>
              <div className={styles.item}>
                <h4>Alessio's Cafe & Pizzeria</h4>
                <p>Near Maharana Pratap Sports College, Maharana Pratap Chowk, Raipur, Dehradun, Uttarakhand 248008</p>
                <p>Open Daily: 10:30 AM - 10:00 PM</p>
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
              <p><strong>Phone:</strong> +91 70176 15647</p>
              <p><strong>Email:</strong> info@alessioscafe.in</p>
            </div>
          </div>
          <div className={styles.mapWrapper}>
            {/* Placeholder for Map */}
            <div className={styles.mapPlaceholder}>
              <span>Map View</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Locations;
