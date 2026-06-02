'use client';

import { useCartStore } from '@/store/useCartStore';
import { X, ShoppingBag, Plus, Minus, Trash2 } from 'lucide-react';
import styles from './CartDrawer.module.css';
import Link from 'next/link';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const CartDrawer = ({ isOpen, onClose }: CartDrawerProps) => {
  const { items, updateQuantity, removeItem, getCartTotal, getDiscountedTotal } = useCartStore();

  if (!isOpen) return null;

  const total = getCartTotal();
  const discountedTotal = getDiscountedTotal();
  const savings = total - discountedTotal;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.drawer} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <div className={styles.titleContainer}>
            <ShoppingBag size={24} />
            <h2>Your Cart</h2>
          </div>
          <button className={styles.closeBtn} onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        <div className={styles.content}>
          {items.length === 0 ? (
            <div className={styles.emptyCart}>
              <ShoppingBag size={64} className={styles.emptyIcon} />
              <p>Your cart is empty</p>
              <button className="btn btn-primary" onClick={onClose}>
                Browse Menu
              </button>
            </div>
          ) : (
            <ul className={styles.itemList}>
              {items.map((item) => (
                <li key={item.id} className={styles.item}>
                  <div className={styles.itemInfo}>
                    <h3>{item.name}</h3>
                    <p className={styles.itemPrice}>
                      ₹{item.discount_percentage > 0 
                        ? Math.round(item.price * (1 - item.discount_percentage / 100)) 
                        : item.price}
                    </p>
                  </div>
                  <div className={styles.itemActions}>
                    <div className={styles.quantityControls}>
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className={styles.qtyBtn}
                      >
                        <Minus size={14} />
                      </button>
                      <span>{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className={styles.qtyBtn}
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                    <button 
                      onClick={() => removeItem(item.id)}
                      className={styles.removeBtn}
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {items.length > 0 && (
          <div className={styles.footer}>
            <div className={styles.totals}>
              <div className={styles.totalRow}>
                <span>Subtotal</span>
                <span>₹{total}</span>
              </div>
              {savings > 0 && (
                <div className={styles.totalRow + ' ' + styles.savings}>
                  <span>Savings</span>
                  <span>-₹{Math.round(savings)}</span>
                </div>
              )}
              <div className={styles.totalRow + ' ' + styles.grandTotal}>
                <span>Grand Total</span>
                <span>₹{Math.round(discountedTotal)}</span>
              </div>
            </div>
            <Link 
              href="/checkout" 
              className="btn btn-primary w-full text-center"
              onClick={onClose}
            >
              Checkout
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartDrawer;
