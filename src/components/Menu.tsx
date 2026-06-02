'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import styles from './Menu.module.css';
import { supabase } from '@/lib/supabase';
import { assetPath } from '@/lib/assets';
import { useCartStore, Product } from '@/store/useCartStore';
import { Plus, ShoppingBag, RefreshCw } from 'lucide-react';
import Link from 'next/link';

interface MenuProps {
  isOrdering?: boolean;
}

const Menu = ({ isOrdering = true }: MenuProps) => {
  const [activeCategory, setActiveCategory] = useState('');
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const addItem = useCartStore((state) => state.addItem);

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('is_active', true)
        .order('category', { ascending: true })
        .order('name', { ascending: true });

      if (error) throw error;

      if (data) {
        setProducts(data);
        if (data.length > 0) {
          setActiveCategory(prev => prev || data[0].category);
        }
      }
    } catch (err) {
      console.error('Error fetching products:', err);
      setError('Failed to load menu items. Please try again.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchProducts();
  }, [fetchProducts]);

  const categories = useMemo(() => 
    Array.from(new Set(products.map(p => p.category))),
  [products]);
  
  // Group products by base name (removing (Half), (Full), etc.)
  const groupedProducts = useMemo(() => {
    const groups: { [key: string]: Product[] } = {};
    const filtered = products.filter(p => p.category === activeCategory);
    
    filtered.forEach(item => {
      const baseName = item.name.replace(/\s*\((Half|Full|Medium|Large|Regular)\)$/, '').trim();
      if (!groups[baseName]) {
        groups[baseName] = [];
      }
      groups[baseName].push(item);
    });
    return groups;
  }, [products, activeCategory]);
  
  // State for user-selected variant of each group
  const [selectedVariants, setSelectedVariants] = useState<{ [key: string]: string }>({});

  return (
    <section className="section" id="menu">
      <div className="container">
        <div className="text-center mb-5">
          <span className="section-subtitle">{isOrdering ? 'Order Now' : 'Discover'}</span>
          <h2 className="section-title">{isOrdering ? 'Place Your Order' : 'Our Gourmet Menu'}</h2>
        </div>

        {loading ? (
          <div className={styles.loadingState}>
            <div className={styles.spinner}></div>
            <p>Loading our delicious menu...</p>
          </div>
        ) : error ? (
          <div className={styles.errorState}>
            <p>{error}</p>
            <button onClick={() => fetchProducts()} className="btn btn-primary mt-3">
              <RefreshCw size={18} className="mr-2" /> Retry
            </button>
          </div>
        ) : products.length === 0 ? (
          <div className={styles.emptyState}>
            <p>Our menu is currently being updated. Please check back later!</p>
          </div>
        ) : (
          <>
            <div className={styles.tabs}>
              {categories.map((category) => (
                <button
                  key={category}
                  className={`${styles.tabBtn} ${activeCategory === category ? styles.active : ''}`}
                  onClick={() => setActiveCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>
            
            <div className={styles.menuContent}>
              <div className={styles.grid}>
                {Object.keys(groupedProducts).map((baseName) => {
                  const variants = groupedProducts[baseName];
                  
                  // Default selection: (Full) -> (Regular) -> first variant
                  const defaultVariant = variants.find(v => v.name.includes('(Full)')) || 
                                       variants.find(v => v.name.includes('(Large)')) || 
                                       variants.find(v => v.name.includes('(Regular)')) || 
                                       variants[0];
                  
                  const selectedId = selectedVariants[baseName] || defaultVariant.id;
                  const item = variants.find(v => v.id === selectedId) || variants[0];

                  return (
                    <div key={baseName} className={`${styles.item} ${!item.in_stock && isOrdering ? styles.outOfStock : ''}`}>
                      {item.image_url && (
                        <div className={styles.imageWrapper}>
                          <img src={assetPath(item.image_url)} alt={item.name} className={styles.itemImage} />
                        </div>
                      )}
                      <div className={styles.itemContent}>
                        <div className={styles.header}>
                          <h4>{baseName}</h4>
                          <span className={styles.dots}></span>
                          <div className={styles.priceContainer}>
                            {variants.length > 1 ? (
                              <span className={styles.price}>
                                {variants
                                  .sort((a, b) => a.price - b.price)
                                  .map(v => `₹${v.price}`)
                                  .join(' / ')}
                              </span>
                            ) : (
                              <>
                                {item.discount_percentage > 0 && (
                                  <span className={styles.originalPrice}>₹{item.price}</span>
                                )}
                                <span className={styles.price}>
                                  ₹{item.discount_percentage > 0 
                                    ? Math.round(item.price * (1 - item.discount_percentage / 100)) 
                                    : item.price}
                                </span>
                              </>
                            )}
                          </div>
                        </div>
                        <p className={styles.description}>{item.description}</p>
                        
                        <div className={styles.itemFooter}>
                          {variants.length > 1 && (
                            <div className={styles.sizeSelector}>
                              {variants.map(v => {
                                const sizeMatch = v.name.match(/\((Half|Full|Medium|Large|Regular)\)$/);
                                const sizeLabel = sizeMatch ? sizeMatch[1] : v.name;
                                return (
                                  <button
                                    key={v.id}
                                    className={`${styles.sizeBtn} ${selectedId === v.id ? styles.activeSize : ''}`}
                                    onClick={() => setSelectedVariants(prev => ({ ...prev, [baseName]: v.id }))}
                                  >
                                    {sizeLabel}
                                  </button>
                                );
                              })}
                            </div>
                          )}

                          {isOrdering && (
                            <div className={styles.actionContainer}>
                              {!item.in_stock ? (
                                <span className={styles.statusBadge}>Out of Stock</span>
                              ) : (
                                <button 
                                  className={styles.addBtn}
                                  onClick={() => addItem(item)}
                                >
                                  <Plus size={16} /> Add to Cart
                                </button>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </>
        )}
        
        <div className="text-center mt-5">
          <p className={styles.note}>*Prices are subject to change. Extra cheese and add-ons available.</p>
          {!isOrdering && (
            <div className="mt-4">
              <Link href="/order" className="btn btn-primary btn-lg">
                <ShoppingBag size={20} className="mr-2" /> Order Online Now
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Menu;

