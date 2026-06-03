import styles from './Categories.module.css';
import { Pizza, Coffee, Beef, Salad, Cake, Beer, ShoppingBag } from 'lucide-react';
import Link from 'next/link';

const CATEGORIES = [
  { id: 1, name: 'Pizza', icon: <Pizza size={24} />, slug: 'Pizza' },
  { id: 2, name: 'Burgers', icon: <Beef size={24} />, slug: 'Burgers & Wraps' },
  { id: 3, name: 'Pasta', icon: <Salad size={24} />, slug: 'Pasta & Salads' },
  { id: 4, name: 'Coffee', icon: <Coffee size={24} />, slug: 'Beverages' },
  { id: 5, name: 'Shakes', icon: <Cake size={24} />, slug: 'Beverages' },
  { id: 6, name: 'Drinks', icon: <Beer size={24} />, slug: 'Beverages' },
];

const Categories = () => {
  return (
    <section className={styles.categories}>
      <div className="container">
        <div className="text-center mb-4">
          <span className="section-subtitle">Explore</span>
          <h2 className={styles.title}>What are you looking for?</h2>
        </div>
        <div className={styles.scrollWrapper}>
          {CATEGORIES.map((cat) => (
            <Link 
              key={cat.id} 
              href={cat.slug ? `/order?category=${cat.slug}` : '/order'} 
              className={styles.categoryItem}
            >
              <div className={styles.iconWrapper}>{cat.icon}</div>
              <span>{cat.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
