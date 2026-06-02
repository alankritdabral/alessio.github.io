'use client';

import { useEffect, useState, useCallback, Suspense } from 'react';
import { supabase } from '@/lib/supabase';
import { useSearchParams } from 'next/navigation';
import { CheckCircle, Home, Printer, Download } from 'lucide-react';
import Link from 'next/link';
import styles from './receipt.module.css';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

interface OrderItem {
  id: string;
  quantity: number;
  price_at_time: number;
  products: {
    name: string;
  } | null;
}

interface Order {
  id: string;
  created_at: string;
  status: string;
  total_amount: number;
  customer_details: {
    name: string;
    phone: string;
    tableNumber?: string;
    notes?: string;
  };
  order_items: OrderItem[];
}

function ReceiptContent() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchOrder = useCallback(async () => {
    if (!id) return;
    const { data, error } = await supabase
      .from('orders')
      .select(`
        *,
        order_items (
          *,
          products (name)
        )
      `)
      .eq('id', id)
      .single();

    if (!error) setOrder(data);
    setLoading(false);
  }, [id]);

  const downloadReceipt = async () => {
    const receiptElement = document.getElementById('receipt-content');
    if (!receiptElement || !order) return;

    try {
      const canvas = await html2canvas(receiptElement, {
        scale: 2,
        logging: false,
        useCORS: true,
        backgroundColor: '#ffffff'
      });
      
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });

      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`alessio-receipt-${order.id.slice(0, 8)}.pdf`);
    } catch (err) {
      console.error('Error generating PDF:', err);
      alert('Failed to generate PDF. Please use the Print option instead.');
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchOrder();
  }, [fetchOrder]);

  if (loading) return <div className="container section text-center">Loading receipt...</div>;
  if (!order) return <div className="container section text-center">Order not found.</div>;

  return (
    <div className="container section">
      <div className={styles.receiptCard} id="receipt-content">
        <div className={styles.header}>
          <CheckCircle size={64} className={styles.successIcon} />
          <h1>Order Successful!</h1>
          <p>Thank you for your order, {order.customer_details.name}.</p>
          <div className={styles.orderId}>Order ID: #{order.id.slice(0, 8)}</div>
        </div>

        <div className={styles.details}>
          <h3>Order Details</h3>
          <ul className={styles.itemList}>
            {order.order_items.map((item) => (
              <li key={item.id} className={styles.item}>
                <span>{item.products?.name} x {item.quantity}</span>
                <span>₹{item.price_at_time * item.quantity}</span>
              </li>
            ))}
          </ul>
          <div className={styles.totalRow}>
            <strong>Total Paid</strong>
            <strong>₹{order.total_amount}</strong>
          </div>
        </div>

        <div className={styles.info}>
          <p><strong>Status:</strong> {order.status.toUpperCase()}</p>
          {order.customer_details.tableNumber && (
            <p><strong>Table:</strong> {order.customer_details.tableNumber}</p>
          )}
          <p><strong>Date:</strong> {new Date(order.created_at).toLocaleString()}</p>
        </div>

        <div className={styles.actions}>
          <button onClick={() => window.print()} className="btn btn-secondary">
            <Printer size={18} /> Print
          </button>
          <button onClick={downloadReceipt} className="btn btn-secondary">
            <Download size={18} /> Download PDF
          </button>
          <Link href="/" className="btn btn-primary">
            <Home size={18} /> Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function OrderSuccessPage() {
  return (
    <Suspense fallback={<div className="container section text-center">Loading...</div>}>
      <ReceiptContent />
    </Suspense>
  );
}
