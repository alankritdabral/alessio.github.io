import Link from 'next/link';
import styles from './Header.module.css';

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={`container ${styles.container}`}>
        <Link href="/" className={styles.logo}>
          <span className={styles.logoMain}>ALESSIO'S</span>
          <span className={styles.logoSub}>CAFE & PIZZERIA</span>
        </Link>
        <nav className={styles.nav}>
          <ul>
            <li><Link href="/">Home</Link></li>
            <li><Link href="#about">Our Story</Link></li>
            <li><Link href="#menu">Menu</Link></li>
            <li><Link href="#booking">Reservation</Link></li>
            <li><Link href="#locations">Contact</Link></li>
          </ul>
        </nav>
        <div className={styles.actions}>
          <Link href="#booking" className="btn btn-primary">Book a Table</Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
