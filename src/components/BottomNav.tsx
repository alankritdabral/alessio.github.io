'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './BottomNav.module.css';
import { Home, Utensils, Calendar, MapPin, Phone } from 'lucide-react';

const BottomNav = () => {
  const pathname = usePathname();

  const handleNavClick = (href: string) => {
    if (pathname === href) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <nav className={styles.bottomNav}>
      <Link 
        href="/" 
        className={styles.navItem}
        onClick={() => handleNavClick('/')}
      >
        <Home size={20} />
        <span>Home</span>
      </Link>
      <Link 
        href="/order" 
        className={styles.navItem}
        onClick={() => handleNavClick('/order')}
      >
        <Utensils size={20} />
        <span>Order</span>
      </Link>
      <Link 
        href="/contact" 
        className={styles.navItem}
        onClick={() => handleNavClick('/contact')}
      >
        <Calendar size={20} />
        <span>Book</span>
      </Link>
      <Link 
        href="/locations" 
        className={styles.navItem}
        onClick={() => handleNavClick('/locations')}
      >
        <MapPin size={20} />
        <span>Find</span>
      </Link>
      <a href="tel:+917017615647" className={styles.navItem}>
        <Phone size={20} />
        <span>Call</span>
      </a>
    </nav>
  );
};

export default BottomNav;
