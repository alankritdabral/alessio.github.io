'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { supabase } from '@/lib/supabase';
import { Product } from '@/store/useCartStore';
import { assetPath } from '@/lib/assets';
import { 
  Plus, 
  Edit2, 
  Trash2, 
  Check, 
  X, 
  Search, 
  ImageIcon,
  Save,
  RotateCcw
  } from 'lucide-react';
  import styles from './MenuMgmt.module.css';

  export default function MenuMgmt() {
  const [products, setProducts] = useState<Product[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<Product>>({});
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('category', { ascending: true })
      .order('name', { ascending: true });

    if (!error) setProducts(data || []);
    setLoading(false);
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchProducts();
  }, []);


  const categories = useMemo(() => {
    return ['All', ...Array.from(new Set(products.map(p => p.category)))];
  }, [products]);

  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.category.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [products, searchQuery, selectedCategory]);

  const handleEdit = (product: Product) => {
    setEditingId(product.id);
    setEditForm(product);
  };

  const handleSave = async () => {
    if (!editingId) return;
    const { error } = await supabase
      .from('products')
      .update(editForm)
      .eq('id', editingId);

    if (!error) {
      setProducts(products.map(p => p.id === editingId ? { ...p, ...editForm } as Product : p));
      setEditingId(null);
    } else {
      alert('Error updating product: ' + error.message);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this item? This action cannot be undone.')) return;
    const { error } = await supabase.from('products').delete().eq('id', id);
    if (!error) setProducts(products.filter(p => p.id !== id));
  };

  const toggleStock = async (product: Product) => {
    const { error } = await supabase
      .from('products')
      .update({ in_stock: !product.in_stock })
      .eq('id', product.id);

    if (!error) {
      setProducts(products.map(p => p.id === product.id ? { ...p, in_stock: !p.in_stock } : p));
    }
  };

  const handleAdd = async () => {
    const newProduct = {
      name: 'New Menu Item',
      description: 'Enter description here',
      price: 0,
      category: selectedCategory !== 'All' ? selectedCategory : (products[0]?.category || 'Pizza'),
      in_stock: true,
      discount_percentage: 0,
      is_active: true,
      image_url: '/images/menu/margherita.jpg',
    };

    const { data, error } = await supabase.from('products').insert(newProduct).select().single();
    if (!error && data) {
      setProducts([data, ...products]);
      handleEdit(data);
    }
  };

  const renderEditForm = (isMobile: boolean = false) => (
    <div className={styles.editForm}>
      <div className={styles.formGrid}>
        <div className={styles.formGroup}>
          <label>Product Name</label>
          <input 
            type="text" 
            value={editForm.name} 
            onChange={e => setEditForm({...editForm, name: e.target.value})}
            placeholder="e.g. Margherita Pizza"
          />
        </div>
        <div className={styles.formGroup}>
          <label>Category</label>
          <input 
            type="text" 
            value={editForm.category} 
            onChange={e => setEditForm({...editForm, category: e.target.value})}
            placeholder="e.g. Pizza"
          />
        </div>
        <div className={styles.formGroup}>
          <label>Price (₹)</label>
          <input 
            type="number" 
            value={editForm.price} 
            onChange={e => setEditForm({...editForm, price: Number(e.target.value)})}
          />
        </div>
        <div className={styles.formGroup}>
          <label>Discount (%)</label>
          <input 
            type="number" 
            value={editForm.discount_percentage} 
            onChange={e => setEditForm({...editForm, discount_percentage: Number(e.target.value)})}
          />
        </div>
        <div className={styles.formGroup} style={{ gridColumn: isMobile ? 'span 1' : 'span 2' }}>
          <label>Image URL</label>
          <input 
            type="text" 
            value={editForm.image_url} 
            onChange={e => setEditForm({...editForm, image_url: e.target.value})}
            placeholder="/images/menu/item.jpg"
          />
        </div>
        <div className={styles.formGroup} style={{ gridColumn: isMobile ? 'span 1' : 'span 2' }}>
          <label>Description</label>
          <textarea 
            value={editForm.description} 
            onChange={e => setEditForm({...editForm, description: e.target.value})}
            rows={2}
          />
        </div>
      </div>
      <div className={styles.formActions}>
        <button onClick={handleSave} className="btn btn-primary">
          <Save size={16} className="mr-2" /> Save Changes
        </button>
        <button onClick={() => setEditingId(null)} className="btn btn-outline">
          <X size={16} className="mr-2" /> Cancel
        </button>
      </div>
    </div>
  );

  return (
    <div className={styles.container}>
      <div className={styles.actionHeader}>
        <div className={styles.headerTop}>
          <h3>Menu Management</h3>
          <button className="btn btn-primary" onClick={handleAdd}>
            <Plus size={18} className="mr-2" /> Add New Item
          </button>
        </div>
        
        <div className={styles.controls}>
          <div className={styles.searchWrapper}>
            <Search className={styles.searchIcon} size={18} />
            <input 
              type="text" 
              className={styles.searchInput}
              placeholder="Search products or categories..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
          </div>
          <select 
            className={styles.categorySelect}
            value={selectedCategory}
            onChange={e => setSelectedCategory(e.target.value)}
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          <button className="btn btn-outline" onClick={fetchProducts} title="Refresh Menu">
            <RotateCcw size={18} />
          </button>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-10">
          <div className="spinner mb-4 mx-auto"></div>
          <p>Loading your menu...</p>
        </div>
      ) : (
        <>
          {/* Desktop Table View */}
          <div className={styles.tableWrapper}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Status</th>
                  <th>Discount</th>
                  <th style={{ textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map(product => (
                  <React.Fragment key={product.id}>
                    <tr>
                      <td>
                        <div className={styles.productInfo}>
                          {product.image_url ? (
                            <img src={assetPath(product.image_url)} alt="" className={styles.thumbnail} />
                          ) : (
                            <div className={styles.thumbnail} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                              <ImageIcon size={20} className="text-muted" />
                            </div>
                          )}
                          <div className={styles.nameWrapper}>
                            <span className={styles.productName}>{product.name}</span>
                            <span className={styles.productCategory}>{product.category}</span>
                          </div>
                        </div>
                      </td>
                      <td><span className={styles.price}>₹{product.price}</span></td>
                      <td>
                        <span 
                          className={`${styles.badge} ${product.in_stock ? styles.inStock : styles.outStock}`}
                          onClick={() => toggleStock(product)}
                        >
                          {product.in_stock ? 'In Stock' : 'Out of Stock'}
                        </span>
                      </td>
                      <td>{product.discount_percentage}%</td>
                      <td>
                        <div className={styles.cardActions}>
                          <button onClick={() => handleEdit(product)} className={styles.actionBtn} title="Edit Item">
                            <Edit2 size={16} />
                          </button>
                          <button onClick={() => handleDelete(product.id)} className={`${styles.actionBtn} ${styles.deleteBtn}`} title="Delete Item">
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                    {editingId === product.id && (
                      <tr>
                        <td colSpan={5}>
                          {renderEditForm()}
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Card View */}
          <div className={styles.mobileGrid}>
            {filteredProducts.map(product => (
              <div key={product.id} className={styles.card}>
                <div className={styles.cardHeader}>
                  {product.image_url ? (
                    <img src={assetPath(product.image_url)} alt="" className={styles.cardThumbnail} />
                  ) : (
                    <div className={styles.cardThumbnail} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f1f5f9' }}>
                      <ImageIcon size={24} className="text-muted" />
                    </div>
                  )}
                  <div className={styles.cardTitle}>
                    <h4>{product.name}</h4>
                    <span className={styles.productCategory}>{product.category}</span>
                  </div>
                </div>
                
                <div className={styles.cardBody}>
                  <div className={styles.cardStat}>
                    <span className={styles.statLabel}>Price</span>
                    <span className={styles.statValue}>₹{product.price}</span>
                  </div>
                  <div className={styles.cardStat}>
                    <span className={styles.statLabel}>Status</span>
                    <span 
                      className={`${styles.badge} ${product.in_stock ? styles.inStock : styles.outStock}`}
                      onClick={() => toggleStock(product)}
                    >
                      {product.in_stock ? 'In Stock' : 'Out'}
                    </span>
                  </div>
                </div>

                {editingId === product.id ? (
                  renderEditForm(true)
                ) : (
                  <div className={styles.cardActions}>
                    <button onClick={() => handleEdit(product)} className="btn btn-outline" style={{ flex: 1 }}>
                      <Edit2 size={16} className="mr-2" /> Edit
                    </button>
                    <button onClick={() => handleDelete(product.id)} className={`${styles.actionBtn} ${styles.deleteBtn}`}>
                      <Trash2 size={16} />
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
          
          {filteredProducts.length === 0 && (
            <div className="text-center py-20 bg-white rounded-xl border border-dashed">
              <p className="text-muted">No products found matching your criteria.</p>
              <button className="btn btn-link" onClick={() => {setSearchQuery(''); setSelectedCategory('All');}}>
                Clear all filters
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
