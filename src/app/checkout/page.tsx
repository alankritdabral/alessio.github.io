'use client';

import { useState } from 'react';
import { useCartStore } from '@/store/useCartStore';
import { supabase } from '@/lib/supabase';
import { ShoppingBag, ArrowLeft, CreditCard } from 'lucide-react';
import Link from 'next/link';
import styles from './checkout.module.css';

const getTimestamp = () => Date.now();

export default function CheckoutPage() {
  const { items, getCartTotal, getDiscountedTotal } = useCartStore();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    tableNumber: '',
    notes: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const discountedTotal = getDiscountedTotal();
  const subtotal = getCartTotal();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // 1. Create order in Supabase with 'pending' status
      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert({
          status: 'pending',
          total_amount: Math.round(discountedTotal),
          customer_details: formData,
        })
        .select()
        .single();

      if (orderError) throw orderError;

      // 2. Create order items
      const orderItems = items.map((item) => ({
        order_id: order.id,
        product_id: item.id,
        quantity: item.quantity,
        price_at_time: Math.round(item.price * (1 - item.discount_percentage / 100)),
      }));

      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItems);

      if (itemsError) throw itemsError;

      // 3. Initiate Paytm Payment via Supabase Edge Function
      const timestamp = getTimestamp();
      const { data: paytmData, error: paytmInvokeError } = await supabase.functions.invoke('paytm-initiate', {
        body: {
          orderId: order.id,
          amount: discountedTotal,
          customerId: formData.phone.replace(/\D/g, '') || 'CUST_' + timestamp,
          // The callback URL should be your deployed Edge Function URL
          // You should set this in your Supabase project settings or pass it here
          callbackUrl: `${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/paytm-callback`,
        },
      });

      if (paytmInvokeError) throw paytmInvokeError;
      if (paytmData.body.resultInfo.resultStatus !== 'S') {
        throw new Error(paytmData.body.resultInfo.resultMsg || 'Failed to initiate transaction');
      }

      // 4. Redirect to Paytm Payment Page
      const txnToken = paytmData.body.txnToken;
      const mid = paytmData.mid;
      const orderId = order.id;
      
      const isProduction = process.env.NEXT_PUBLIC_PAYTM_ENV === 'PRODUCTION';
      const host = isProduction ? 'securegw.paytm.in' : 'securegw-stage.paytm.in';
      const url = `https://${host}/theia/api/v1/showPaymentPage?mid=${mid}&orderId=${orderId}`;

      // Create a form dynamically and submit it
      const form = document.createElement('form');
      form.method = 'post';
      form.action = url;
      form.name = 'paytmForm';

      const txnTokenInput = document.createElement('input');
      txnTokenInput.type = 'hidden';
      txnTokenInput.name = 'txnToken';
      txnTokenInput.value = txnToken;
      form.appendChild(txnTokenInput);

      document.body.appendChild(form);
      form.submit();

    } catch (err: unknown) {
      const error = err as Error;
      console.error('Error placing order:', error);
      alert('Failed to place order: ' + error.message);
      setIsSubmitting(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="container section text-center">
        <ShoppingBag size={64} className="mb-4 opacity-20 mx-auto" />
        <h2>Your cart is empty</h2>
        <p className="mb-4">Add some delicious items to your cart before checking out.</p>
        <Link href="/menu" className="btn btn-primary">
          Back to Menu
        </Link>
      </div>
    );
  }

  return (
    <div className="container section">
      <div className="mb-5">
        <Link href="/menu" className={styles.backLink}>
          <ArrowLeft size={16} /> Back to Menu
        </Link>
        <h1 className="section-title mt-3">Checkout</h1>
      </div>

      <div className={styles.grid}>
        <div className={styles.orderSummary}>
          <div className={styles.card}>
            <h3>Order Summary</h3>
            <ul className={styles.itemList}>
              {items.map((item) => (
                <li key={item.id} className={styles.item}>
                  <div className={styles.itemDetails}>
                    <span className={styles.itemName}>{item.name} x {item.quantity}</span>
                    <span className={styles.itemPrice}>
                      ₹{Math.round(item.price * (1 - item.discount_percentage / 100)) * item.quantity}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
            <div className={styles.totals}>
              <div className={styles.totalRow}>
                <span>Subtotal</span>
                <span>₹{Math.round(subtotal)}</span>
              </div>
              <div className={styles.totalRow + ' ' + styles.grandTotal}>
                <span>Total to Pay</span>
                <span>₹{Math.round(discountedTotal)}</span>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.checkoutForm}>
          <div className={styles.card}>
            <h3>Customer Details</h3>
            <form onSubmit={handleSubmit}>
              <div className={styles.formGroup}>
                <label htmlFor="name">Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Your full name"
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="phone">Phone Number *</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="10-digit mobile number"
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="tableNumber">Table Number (if dining in)</label>
                <input
                  type="text"
                  id="tableNumber"
                  name="tableNumber"
                  value={formData.tableNumber}
                  onChange={handleInputChange}
                  placeholder="e.g. Table 5"
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="notes">Special Instructions</label>
                <textarea
                  id="notes"
                  name="notes"
                  rows={3}
                  value={formData.notes}
                  onChange={handleInputChange}
                  placeholder="e.g. No onions, extra spicy"
                ></textarea>
              </div>
              <button 
                type="submit" 
                className="btn btn-primary w-full mt-4"
                disabled={isSubmitting}
              >
                <CreditCard size={18} className="mr-2" />
                {isSubmitting ? 'Processing...' : 'Proceed to Payment'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
