'use client';

import { useState } from 'react';
import styles from './Menu.module.css';

const MENU_DATA = [
  {
    category: 'Pizza',
    items: [
      { name: 'Margherita', price: '₹200/250', description: 'Classic cheese and tomato sauce' },
      { name: 'Corn O Mania', price: '₹220/270', description: 'Sweet corn and mozzarella' },
      { name: 'Full Call Veg', price: '₹260/320', description: 'Loaded with seasonal vegetables' },
      { name: 'Veg Calzone', price: '₹280/360', description: 'Folded pizza stuffed with veggies' },
      { name: 'Hot Mexicana', price: '₹240/300', description: 'Spicy peppers and onions' },
      { name: 'Paneer Delight', price: '₹260/320', description: 'Marinated paneer and veggies' },
      { name: 'Puttanesca (Pesto)', price: '₹270/330', description: 'Rich pesto sauce and olives' },
      { name: 'Tandoori Paneer', price: '₹270/330', description: 'Indian spiced paneer' },
      { name: 'Chicken Fungi', price: '₹250/300', description: 'Chicken and mushrooms' },
      { name: 'BBQ Chicken', price: '₹250/300', description: 'Smoky BBQ sauce and chicken' },
      { name: 'Chicken Calzone', price: '₹300/400', description: 'Stuffed with spicy chicken' },
      { name: 'Hot Shot Chicken', price: '₹270/330', description: 'Extra spicy chicken chunks' },
      { name: 'Tandoori Chicken', price: '₹260/320', description: 'Tandoori spiced chicken' },
      { name: 'Chicken Mexicana', price: '₹250/300', description: 'Mexican spiced chicken' },
    ]
  },
  {
    category: 'Burgers & Wraps',
    items: [
      { name: 'Veg Pattie & Cheese Burger', price: '₹120', description: 'Free fries included' },
      { name: 'Peri Peri Paneer Burger', price: '₹150', description: 'Free fries included' },
      { name: 'Crispy Chicken Burger', price: '₹200', description: 'Free fries included' },
      { name: 'Chicken BBQ Burger', price: '₹180', description: 'Free fries included' },
      { name: 'Chicken and Cheese Wrap', price: '₹180', description: 'Tortilla filled with chicken' },
      { name: 'Spicy Paneer Wrap', price: '₹170', description: 'Marinated paneer chunks' },
      { name: 'Crispy Chicken Wrap', price: '₹200', description: 'Spicy crispy chicken' },
    ]
  },
  {
    category: 'Pasta & Salads',
    items: [
      { name: 'Aglio e Olio', price: '₹300', description: 'Garlic, oil, and chili flakes' },
      { name: 'White Sauce Pasta', price: '₹250', description: 'Creamy bechamel sauce' },
      { name: 'Mix Sauce Pasta', price: '₹300', description: 'Best of red and white' },
      { name: 'Spaghetti Al Polo', price: '₹330', description: 'Classic spaghetti with chicken' },
      { name: 'Caesar Salad', price: '₹250', description: 'Fresh romaine and croutons' },
    ]
  },
  {
    category: 'Sides & Snacks',
    items: [
      { name: 'Honey Chilli Potato', price: '₹220', description: 'Sweet and spicy' },
      { name: 'Fried Chicken', price: '₹200', description: 'Crispy golden fried' },
      { name: 'Fish & Chips', price: '₹250', description: 'Classic battered fish' },
      { name: 'Momos Chicken (Fried)', price: '₹150', description: 'Steamed or Fried' },
      { name: 'French Fries', price: '₹110', description: 'Classic salted' },
      { name: 'Masala Fries', price: '₹150', description: 'Spicy masala dust' },
    ]
  },
  {
    category: 'Beverages',
    items: [
      { name: 'Cold Coffee Hazelnut', price: '₹140', description: 'Blended with hazelnut' },
      { name: 'Cold Coffee Tiramisu', price: '₹160', description: 'Italian coffee dessert style' },
      { name: 'Mojito (Mint/Strawberry)', price: '₹120', description: 'Refreshing mocktail' },
      { name: 'Blue Lagoon', price: '₹150', description: 'Citrusy blue cooler' },
      { name: 'Mixberry Shake', price: '₹200', description: 'Real berry blend' },
      { name: 'KitKat Shake', price: '₹180', description: 'Chocolaty crunch' },
      { name: 'Cappuccino', price: '₹130', description: 'Classic espresso and foam' },
      { name: 'Ginger Tea', price: '₹25', description: 'Fresh ginger brew' },
      { name: 'Masala Tea', price: '₹30', description: 'Spiced Indian tea' },
    ]
  }
];

const Menu = () => {
  const [activeCategory, setActiveCategory] = useState(MENU_DATA[0].category);

  const filteredData = MENU_DATA.find(cat => cat.category === activeCategory);

  return (
    <section className="section" id="menu">
      <div className="container">
        <div className="text-center mb-5">
          <span className="section-subtitle">Discover</span>
          <h2 className="section-title">Our Gourmet Menu</h2>
        </div>

        <div className={styles.tabs}>
          {MENU_DATA.map((section) => (
            <button
              key={section.category}
              className={`${styles.tabBtn} ${activeCategory === section.category ? styles.active : ''}`}
              onClick={() => setActiveCategory(section.category)}
            >
              {section.category}
            </button>
          ))}
        </div>
        
        <div className={styles.menuContent}>
          <div className={styles.grid}>
            {filteredData?.items.map((item, itemIdx) => (
              <div key={itemIdx} className={styles.item}>
                <div className={styles.header}>
                  <h4>{item.name}</h4>
                  <span className={styles.dots}></span>
                  <span className={styles.price}>{item.price}</span>
                </div>
                <p className={styles.description}>{item.description}</p>
              </div>
            ))}
          </div>
        </div>
        
        <div className="text-center mt-5">
          <p className={styles.note}>*Prices are subject to change. Extra cheese and add-ons available.</p>
        </div>
      </div>
    </section>
  );
};

export default Menu;
