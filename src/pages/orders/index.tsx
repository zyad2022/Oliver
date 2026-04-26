import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Package, ShoppingBag } from 'lucide-react';
import { User as FirebaseUser } from 'firebase/auth';
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import { db } from '../../firebase';
import { useAppState } from '../../state';;
import { PageTitle } from '../../components/PageTitle';

export function Orders() {
  const { currentUser: user, onNavigate } = useAppState();;
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchOrders() {
      if (!user) {
        setLoading(false);
        return;
      }
      try {
        const q = query(
          collection(db, 'users', user.uid, 'orders'),
          orderBy('createdAt', 'desc')
        );
        const querySnapshot = await getDocs(q);
        const fetchedOrders = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setOrders(fetchedOrders);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchOrders();
  }, [user]);

  if (!user) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 w-full font-arabic"
    >
      <PageTitle title="طلباتي" badgeIcon={<Package size={16} className="text-natural-accent" />} />
      <div className="bg-white rounded-3xl p-8 border border-natural-border shadow-sm min-h-[400px]">
        {loading ? (
          <div className="flex justify-center items-center h-48">
            <p className="text-stone-500 font-medium">جاري التحديث...</p>
          </div>
        ) : orders.length > 0 ? (
          <div className="flex flex-col gap-6">
            {orders.map((order) => (
              <div key={order.id} className="border border-natural-border rounded-xl p-6 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-center border-b border-natural-border pb-4 mb-4">
                  <div>
                    <h3 className="text-sm text-[#888] mb-1 en-title">Order #{order.id.slice(-6).toUpperCase()}</h3>
                    <p className="font-medium text-natural-text text-sm">
                      {order.createdAt?.toDate ? order.createdAt.toDate().toLocaleDateString('ar-EG', { year: 'numeric', month: 'long', day: 'numeric' }) : ''}
                    </p>
                  </div>
                  <div className="luxury-pill-outer scale-95 origin-right">
                    <div className="luxury-pill-core-alt gap-2 px-4 py-1.5">
                       <span className="text-natural-accent font-bold text-xs uppercase tracking-widest">
                        {order.status === 'delivered' ? 'مكتمل' : order.status === 'processing' ? 'قيد التجهيز' : 'قيد المراجعة'}
                       </span>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col gap-4 mb-6">
                  {order.items?.map((item: any, idx: number) => (
                    <div key={idx} className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-lg bg-natural-bg border border-natural-border overflow-hidden flex-shrink-0">
                        <img 
                          src={item.productImage} 
                          alt={item.productName} 
                          className="w-full h-full object-cover"
                          onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&q=80&w=800'; }}
                        />
                      </div>
                      <div className="flex-1">
                        <p className="en-title text-sm">{item.productName}</p>
                        <p className="text-xs text-[#888] en-text">{item.quantity} x {item.price} EGP</p>
                      </div>
                      <p className="en-text font-medium text-sm">{item.totalPrice} EGP</p>
                    </div>
                  ))}
                </div>

                <div className="flex justify-between items-center pt-4 border-t border-natural-border">
                  <p className="text-natural-text font-bold text-lg en-text">Total: {order.totalPrice} EGP</p>
                  <p className="text-[#666] text-xs font-arabic">{order.items?.length || 0} قطع</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center text-center h-64">
            <div className="w-20 h-20 bg-natural-bg rounded-full flex items-center justify-center mb-6 border border-natural-border">
              <ShoppingBag size={32} className="text-[#888]" />
            </div>
            <h2 className="text-2xl font-arabic font-medium text-natural-text mb-2">
              لا توجد طلبات حتى الآن
            </h2>
            <p className="text-[#666] mb-8 font-arabic max-w-sm">
              لم تقم بإجراء أي طلبات من متجرنا بعد. تصفح أحدث التشكيلات واكتشف ما يناسبك.
            </p>
            <button
              onClick={() => onNavigate('collection')}
              className="bg-natural-accent text-white px-8 py-3.5 rounded-full font-medium hover:bg-natural-accent-dark transition-colors font-arabic text-sm tracking-wide shadow-sm"
            >
              ابدأ التسوق
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
}
