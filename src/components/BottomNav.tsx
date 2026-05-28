import Link from 'next/link';
import styles from './BottomNav.module.css';
import { Home, Utensils, Calendar, MapPin, Phone } from 'lucide-react';

const BottomNav = () => {
  return (
    <nav className={styles.bottomNav}>
      <Link href="/" className={styles.navItem}>
        <Home size={20} />
        <span>Home</span>
      </Link>
      <Link href="#menu" className={styles.navItem}>
        <Utensils size={20} />
        <span>Menu</span>
      </Link>
      <Link href="#booking" className={styles.navItem}>
        <Calendar size={20} />
        <span>Book</span>
      </Link>
      <Link href="#locations" className={styles.navItem}>
        <MapPin size={20} />
        <span>Find</span>
      </Link>
      <a href="tel:+1234567890" className={styles.navItem}>
        <Phone size={20} />
        <span>Call</span>
      </a>
    </nav>
  );
};

export default BottomNav;
