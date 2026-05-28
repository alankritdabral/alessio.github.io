import styles from './Categories.module.css';
import { Pizza, Coffee, Beef, Salad, Cake, Beer } from 'lucide-react';

const CATEGORIES = [
  { id: 1, name: 'Pizza', icon: <Pizza size={24} /> },
  { id: 2, name: 'Burgers', icon: <Beef size={24} /> },
  { id: 3, name: 'Pasta', icon: <Salad size={24} /> },
  { id: 4, name: 'Coffee', icon: <Coffee size={24} /> },
  { id: 5, name: 'Shakes', icon: <Cake size={24} /> },
  { id: 6, name: 'Drinks', icon: <Beer size={24} /> },
];

const Categories = () => {
  return (
    <section className={styles.categories}>
      <div className="container">
        <div className={styles.scrollWrapper}>
          {CATEGORIES.map((cat) => (
            <div key={cat.id} className={styles.categoryItem}>
              <div className={styles.iconWrapper}>{cat.icon}</div>
              <span>{cat.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
