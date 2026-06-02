'use client';

import { useCartStore } from '@/store/useCartStore';
import { usePathname } from 'next/navigation';
import CartDrawer from './CartDrawer';

const CartManager = () => {
  const pathname = usePathname();
  const { isCartOpen, toggleCart } = useCartStore();

  if (pathname !== '/order') return null;

  return <CartDrawer isOpen={isCartOpen} onClose={() => toggleCart(false)} />;
};

export default CartManager;
