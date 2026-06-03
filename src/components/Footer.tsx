'use client';

import styles from './Footer.module.css';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Footer = () => {
  const pathname = usePathname();

  const handleNavClick = (href: string) => {
    if (pathname === href) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.grid}>
          <div className={styles.info}>
            <Link href="/" className={styles.logo} onClick={() => handleNavClick('/')}>
              <span className={styles.logoMain}>ALESSIO&apos;S</span>
              <span className={styles.logoSub}>CAFE & PIZZERIA</span>
            </Link>
            <p className={styles.description}>
              Exceptional Italian culinary experiences in the heart of Dehradun. We pride ourselves on using only the finest ingredients to create unforgettable meals, from artisan pizza to delicious pasta.
            </p>
          </div>
          <div className={styles.links}>
           <h4>Explore</h4>
           <ul>
             <li><Link href="/about" onClick={() => handleNavClick('/about')}>Our Story</Link></li>
             <li><Link href="/menu" onClick={() => handleNavClick('/menu')}>Menu</Link></li>
             <li><Link href="/order" onClick={() => handleNavClick('/order')}>Order Now</Link></li>
             <li><Link href="/contact" onClick={() => handleNavClick('/contact')}>Reservation</Link></li>
             <li><Link href="/locations" onClick={() => handleNavClick('/locations')}>Contact</Link></li>
           </ul>
          </div>
...

          <div className={styles.contact} id="locations">
            <h4>Contact</h4>
            <p>Maharana Pratap Chowk, Raipur, Dehradun, Uttarakhand 248008</p>
            <p>Phone: +91 70176 15647</p>
            <p>Email: info@alessioscafe.in</p>
          </div>
        </div>
        <div className={styles.bottom}>
          <p>&copy; {new Date().getFullYear()} Alessio&apos;s Cafe & Pizzeria. Elegant Italian Dining.</p>
          <Link href="/admin/login" className={styles.adminLink}>Admin Login</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
