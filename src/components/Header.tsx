'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Header.module.css';
import { ShoppingCart } from 'lucide-react';
import { useCartStore } from '@/store/useCartStore';

const Header = () => {
  const pathname = usePathname();
  const { toggleCart, getTotalItems } = useCartStore();
  const itemCount = getTotalItems();

  const isOrderPage = pathname === '/order';

  const handleNavClick = (href: string) => {
    if (pathname === href) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <header className={styles.header}>
      <div className={`container ${styles.container}`}>
        <Link href="/" className={styles.logo} onClick={() => handleNavClick('/')}>
          <span className={styles.logoMain}>ALESSIO&apos;S</span>
          <span className={styles.logoSub}>CAFE & PIZZERIA</span>
        </Link>
        <nav className={styles.nav}>
          <ul>
            <li><Link href="/" onClick={() => handleNavClick('/')}>Home</Link></li>
            <li><Link href="/about" onClick={() => handleNavClick('/about')}>Our Story</Link></li>
            <li><Link href="/menu" onClick={() => handleNavClick('/menu')}>Menu</Link></li>
            <li><Link href="/contact" onClick={() => handleNavClick('/contact')}>Events & Booking</Link></li>
            <li><Link href="/locations" onClick={() => handleNavClick('/locations')}>Contact</Link></li>
          </ul>
        </nav>
        <div className={styles.actions}>
          {isOrderPage && (
            <button className={styles.cartBtn} onClick={() => toggleCart(true)}>
              <ShoppingCart size={20} />
              {itemCount > 0 && <span className={styles.badge}>{itemCount}</span>}
            </button>
          )}
          <Link href="/order" className="btn btn-primary d-none-sm" onClick={() => handleNavClick('/order')}>Order Now</Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
