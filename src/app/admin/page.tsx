'use client';

import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import { assetPath } from '@/lib/assets';
import { useRouter } from 'next/navigation';
import { 
  ShoppingBag, 
  UtensilsCrossed, 
  LogOut,
} from 'lucide-react';
import styles from './admin.module.css';
import MenuMgmt from './MenuMgmt';

interface Order {
  id: string;
  created_at: string;
  status: 'pending' | 'paid' | 'preparing' | 'ready' | 'completed' | 'cancelled';
  total_amount: number;
  customer_details: {
    name: string;
    phone: string;
    tableNumber?: string;
    notes?: string;
  };
  order_items?: {
    id: string;
    quantity: number;
    products: {
      name: string;
    } | null;
  }[];
}

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<'orders' | 'menu'>('orders');
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const checkAuth = useCallback(async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      router.push('/admin/login');
    }
  }, [router]);

  const fetchOrders = useCallback(async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('orders')
        .select(`
          *,
          order_items (
            *,
            products (name)
          )
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setOrders(data || []);
    } catch (err) {
      console.error('Error fetching orders:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const subscribeToOrders = useCallback(() => {
    const channel = supabase
      .channel('realtime orders')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'orders' }, (payload) => {
        const newOrder = payload.new as Order;
        // Play sound if a new order is paid
        if (newOrder.status === 'paid') {
          const audio = new Audio(assetPath('/audio/notification.mp3'));
          audio.play().catch(e => console.error("Audio play failed:", e));
        }
        fetchOrders();
      })
      .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'orders' }, (payload) => {
        const oldOrder = payload.old as Order;
        const newOrder = payload.new as Order;
        // Play sound if an order status changes to 'paid'
        if (oldOrder.status !== 'paid' && newOrder.status === 'paid') {
          const audio = new Audio(assetPath('/audio/notification.mp3'));
          audio.play().catch(e => console.error("Audio play failed:", e));
        }
        fetchOrders();
      })
      .on('postgres_changes', { event: 'DELETE', schema: 'public', table: 'orders' }, () => {
        fetchOrders();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [fetchOrders]);

  useEffect(() => {
    checkAuth();
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchOrders();
    const unsubscribe = subscribeToOrders();
    return () => {
      if (typeof unsubscribe === 'function') unsubscribe();
    };
  }, [checkAuth, fetchOrders, subscribeToOrders]);

  const updateOrderStatus = async (orderId: string, status: Order['status']) => {
    try {
      const { error } = await supabase
        .from('orders')
        .update({ status })
        .eq('id', orderId);

      if (error) throw error;
      setOrders(orders.map(o => o.id === orderId ? { ...o, status } : o));
    } catch (err) {
      console.error('Error updating order status:', err);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/admin/login');
  };

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'paid': return styles.statusPaid;
      case 'preparing': return styles.statusPreparing;
      case 'ready': return styles.statusReady;
      case 'completed': return styles.statusCompleted;
      case 'cancelled': return styles.statusCancelled;
      default: return styles.statusPending;
    }
  };

  return (
    <div className={styles.dashboard}>
      <aside className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          <h2>Alessio POS</h2>
        </div>
        <nav className={styles.sidebarNav}>
          <button 
            className={`${styles.navItem} ${activeTab === 'orders' ? styles.active : ''}`}
            onClick={() => setActiveTab('orders')}
          >
            <ShoppingBag size={20} /> Orders
          </button>
          <button 
            className={`${styles.navItem} ${activeTab === 'menu' ? styles.active : ''}`}
            onClick={() => setActiveTab('menu')}
          >
            <UtensilsCrossed size={20} /> Menu Mgmt
          </button>
        </nav>
        <button className={styles.logoutBtn} onClick={handleLogout}>
          <LogOut size={20} /> Logout
        </button>
      </aside>

      <main className={styles.mainContent}>
        <header className={styles.contentHeader}>
          <h1>{activeTab === 'orders' ? 'Live Orders' : 'Menu Management'}</h1>
          <div className={styles.stats}>
            <div className={styles.statCard}>
              <span>Active Orders</span>
              <strong>{orders.filter(o => ['paid', 'preparing', 'ready'].includes(o.status)).length}</strong>
            </div>
          </div>
        </header>

        <div className={styles.content}>
          {activeTab === 'orders' ? (
            <div className={styles.ordersGrid}>
              {loading ? (
                <p>Loading orders...</p>
              ) : orders.length === 0 ? (
                <p>No orders yet.</p>
              ) : (
                orders.map((order) => (
                  <div key={order.id} className={styles.orderCard}>
                    <div className={styles.orderHeader}>
                      <span className={styles.orderId}>#{order.id.slice(0, 8)}</span>
                      <span className={`${styles.statusBadge} ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </div>
                    <div className={styles.customerInfo}>
                      <strong>{order.customer_details.name}</strong>
                      <span>{order.customer_details.tableNumber ? `Table: ${order.customer_details.tableNumber}` : 'Takeaway'}</span>
                    </div>
                    <div className={styles.orderItems}>
                      {order.order_items?.map((item) => (
                        <div key={item.id} className={styles.orderItem}>
                          <span>{item.products?.name} x {item.quantity}</span>
                        </div>
                      ))}
                    </div>
                    <div className={styles.orderFooter}>
                      <div className={styles.orderTotal}>
                        Total: ₹{order.total_amount}
                      </div>
                      <div className={styles.orderActions}>
                        {order.status === 'paid' && (
                          <button onClick={() => updateOrderStatus(order.id, 'preparing')}>Start</button>
                        )}
                        {order.status === 'preparing' && (
                          <button onClick={() => updateOrderStatus(order.id, 'ready')}>Ready</button>
                        )}
                        {order.status === 'ready' && (
                          <button onClick={() => updateOrderStatus(order.id, 'completed')}>Complete</button>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          ) : (
            <MenuMgmt />
          )}
        </div>
      </main>
    </div>
  );
}
