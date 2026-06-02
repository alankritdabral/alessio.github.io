'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Product } from '@/store/useCartStore';
import { Plus, Edit2, Trash2, Check, X } from 'lucide-react';
import styles from './admin.module.css';

export default function MenuMgmt() {
  const [products, setProducts] = useState<Product[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<Product>>({});

  const fetchProducts = async () => {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('category', { ascending: true });
    
    if (!error) setProducts(data || []);
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchProducts();
  }, []);

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
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this item?')) return;
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
      name: 'New Item',
      description: 'Description',
      price: 0,
      category: products[0]?.category || 'Pizza',
      in_stock: true,
      discount_percentage: 0,
      is_active: true,
      image_url: '',
    };

    const { data, error } = await supabase.from('products').insert(newProduct).select().single();
    if (!error && data) {
      setProducts([...products, data]);
      handleEdit(data);
    }
  };

  return (
    <div className={styles.menuMgmt}>
      <div className={styles.actionHeader}>
        <h3>All Menu Items</h3>
        <button className="btn btn-primary" onClick={handleAdd}>
          <Plus size={18} /> Add New Item
        </button>
      </div>

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Category</th>
              <th>Price (₹)</th>
              <th>Stock</th>
              <th>Discount (%)</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr key={product.id}>
                <td>
                  {editingId === product.id ? (
                    <input 
                      type="text" 
                      value={editForm.name} 
                      onChange={e => setEditForm({...editForm, name: e.target.value})}
                    />
                  ) : product.name}
                </td>
                <td>
                  {editingId === product.id ? (
                    <input 
                      type="text" 
                      value={editForm.category} 
                      onChange={e => setEditForm({...editForm, category: e.target.value})}
                    />
                  ) : product.category}
                </td>
                <td>
                  {editingId === product.id ? (
                    <input 
                      type="number" 
                      value={editForm.price} 
                      onChange={e => setEditForm({...editForm, price: Number(e.target.value)})}
                    />
                  ) : product.price}
                </td>
                <td>
                  <button 
                    className={`${styles.toggleBtn} ${product.in_stock ? styles.inStock : styles.outStock}`}
                    onClick={() => toggleStock(product)}
                  >
                    {product.in_stock ? 'In Stock' : 'Out of Stock'}
                  </button>
                </td>
                <td>
                  {editingId === product.id ? (
                    <input 
                      type="number" 
                      value={editForm.discount_percentage} 
                      onChange={e => setEditForm({...editForm, discount_percentage: Number(e.target.value)})}
                    />
                  ) : `${product.discount_percentage}%`}
                </td>
                <td>
                  <div className={styles.tableActions}>
                    {editingId === product.id ? (
                      <>
                        <button onClick={handleSave} className={styles.saveBtn}><Check size={18} /></button>
                        <button onClick={() => setEditingId(null)} className={styles.cancelBtn}><X size={18} /></button>
                      </>
                    ) : (
                      <>
                        <button onClick={() => handleEdit(product)} className={styles.editBtn}><Edit2 size={18} /></button>
                        <button onClick={() => handleDelete(product.id)} className={styles.deleteBtn}><Trash2 size={18} /></button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
