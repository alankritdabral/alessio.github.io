import { assetPath } from '@/lib/assets';
import styles from './BookingForm.module.css';

const BookingForm = () => {
  return (
    <section className={styles.booking} id="booking" style={{ backgroundImage: `url('${assetPath('/images/unnamed (5).jpg')}')` }}>
      <div className={styles.overlay}></div>
      <div className={`container ${styles.container}`}>
        <div className={styles.wrapper}>
          <div className="text-center mb-4">
            <span className="section-subtitle">Reserve a Table</span>
            <h2 className="section-title" style={{ color: 'white' }}>Book Your Table Online</h2>
            <p className={styles.desc}>Secure your spot for an unforgettable dining experience. For parties larger than 8, please call us directly.</p>
          </div>
          <form className={styles.form}>
            <div className={styles.row}>
              <div className={styles.inputGroup}>
                <input type="text" placeholder="Full Name" required />
              </div>
              <div className={styles.inputGroup}>
                <input type="email" placeholder="Email Address" required />
              </div>
            </div>
            <div className={styles.row}>
              <div className={styles.inputGroup}>
                <input type="date" required />
              </div>
              <div className={styles.inputGroup}>
                <input type="time" required />
              </div>
            </div>
            <div className={styles.row}>
              <div className={styles.inputGroup}>
                <select required defaultValue="">
                  <option value="" disabled>Number of Guests</option>
                  <option value="1">1 Person</option>
                  <option value="2">2 Persons</option>
                  <option value="3">3 Persons</option>
                  <option value="4">4 Persons</option>
                  <option value="5">5+ Persons</option>
                </select>
              </div>
              <div className={styles.inputGroup}>
                <button type="submit" className="btn btn-primary w-full">Find a Table</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default BookingForm;
