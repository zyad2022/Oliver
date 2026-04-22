import React from 'react';
import { motion } from 'motion/react';
import { products, CartItem } from '../../data';
import { Minus, Plus, Trash2, ArrowRight, X } from 'lucide-react';
import { PageTitle } from '../../components/PageTitle';
import { useAppContext } from '../../state';

export function Cart({ cartItems, onRemove, onUpdateQuantity }: { cartItems: CartItem[], onRemove: (id: string) => void, onUpdateQuantity: (id: string, q: number) => void }) {
  const { onNavigate, setSelectedProduct } = useAppContext();
  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.cartQuantity), 0);
  const shipping = subtotal > 0 ? (subtotal > 1000 ? 0 : 50) : 0;
  const total = subtotal + shipping;

    if (cartItems.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center min-h-[60vh] flex flex-col items-center justify-center w-full relative"
      >
        <button 
          onClick={() => onNavigate('back')}
          className="absolute top-4 left-4 sm:top-8 sm:left-8 p-2 rounded-full bg-natural-bg border border-natural-border text-natural-text hover:bg-natural-accent hover:text-white transition-colors z-10"
        >
          <X size={24} />
        </button>
        <PageTitle title="سلة المشتريات فارغة" />
        <p className="text-[#666] mb-8 max-w-md mx-auto">يبدو أنك لم تقومي بإضافة أي منتجات إلى سلتك بعد. استكشفي مجموعاتنا واختاري ما يناسب ذوقك الرفيع.</p>
        <button 
          onClick={() => onNavigate('collection')}
          className="bg-[#2D2D2D] text-white px-8 py-4 uppercase tracking-widest text-sm font-medium hover:bg-natural-accent transition-colors rounded-full en-text"
        >
          Continue Shopping
        </button>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 w-full relative"
    >
      <button 
        onClick={() => onNavigate('back')}
        className="absolute top-4 left-4 sm:top-8 sm:left-8 p-2 rounded-full bg-natural-bg border border-natural-border text-natural-text hover:bg-natural-accent hover:text-white transition-colors z-10"
      >
        <X size={24} />
      </button>

      <PageTitle title={`سلة المشتريات (${cartItems.length})`} />

      <div className="flex flex-col lg:flex-row gap-12 text-natural-text">
        
        {/* Cart Items */}
        <div className="w-full lg:w-2/3">
          <div className="hidden sm:grid grid-cols-12 gap-4 border-b border-natural-border pb-4 mb-6 text-sm text-[#666]">
            <div className="col-span-6">المنتج</div>
            <div className="col-span-2 text-center">السعر</div>
            <div className="col-span-2 text-center">الكمية</div>
            <div className="col-span-2 text-left mr-auto">المجموع</div>
          </div>

          <div className="flex flex-col gap-6">
            {cartItems.map((item) => (
              <div key={item.id} className="flex flex-col sm:grid sm:grid-cols-12 gap-4 items-center border-b border-[#F9F9F9] pb-6">
                
                <div className="col-span-6 flex items-center gap-6 w-full">
                  <div 
                    className="w-24 h-24 bg-natural-img rounded-xl flex-shrink-0 cursor-pointer overflow-hidden p-0" 
                    onClick={() => {
                      setSelectedProduct(item);
                      onNavigate('product');
                    }}
                  >
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-full h-full object-cover" 
                      onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&q=80&w=800'; }}
                    />
                  </div>
                  <div>
                    <h3 className="en-title text-base sm:text-lg mb-1">{item.name}</h3>
                    <p className="text-[#888] text-sm mb-3 en-text">{item.category}</p>
                    <button 
                      onClick={() => onRemove(item.id)}
                      className="text-[#888] hover:text-natural-accent flex items-center gap-1 text-sm transition-colors"
                    >
                      <Trash2 size={14} /> <span className="mt-0.5">إزالة</span>
                    </button>
                  </div>
                </div>

                <div className="col-span-2 text-center en-text w-full flex justify-between sm:block mt-4 sm:mt-0 font-medium">
                  <span className="sm:hidden text-[#666] font-arabic">السعر:</span> {item.price} EGP
                </div>

                <div className="col-span-2 flex justify-center w-full mt-4 sm:mt-0">
                  <div className="flex items-center border border-natural-border rounded-full w-10 h-10 justify-center bg-white shadow-sm">
                    <span className="en-text text-sm font-medium text-natural-text text-center">{item.cartQuantity}</span>
                  </div>
                </div>

                <div className="col-span-2 text-left mr-auto en-text font-bold text-natural-accent w-full flex justify-between sm:block mt-4 sm:mt-0">
                  <span className="sm:hidden text-[#666] font-arabic">الإجمالي:</span> {item.price * item.cartQuantity} EGP
                </div>

              </div>
            ))}
          </div>
        </div>

        {/* Order Summary */}
        <div className="w-full lg:w-1/3">
          <div className="bg-white border border-natural-border rounded-2xl p-8">
            <h2 className="text-xl text-natural-text mb-6 border-b border-natural-border pb-4">ملخص الطلب</h2>
            
            <div className="flex flex-col gap-4 text-[#666] mb-6 border-b border-natural-border pb-6">
              <div className="flex justify-between items-center">
                <span>المجموع الفرعي</span>
                <span className="en-text font-medium text-natural-text">{subtotal} EGP</span>
              </div>
              <div className="flex justify-between items-center">
                <span>رسوم التوصيل</span>
                <span className="en-text font-medium text-natural-text">
                  {shipping === 0 ? 'Free' : `${shipping} EGP`}
                </span>
              </div>
            </div>

            <div className="flex justify-between items-center mb-8">
              <span className="text-lg text-natural-text font-medium">الإجمالي الكلي</span>
              <span className="text-2xl text-natural-accent font-bold en-text">{total} EGP</span>
            </div>

            <button className="w-full bg-natural-accent text-white py-4 uppercase tracking-widest text-sm font-medium hover:bg-natural-accent-dark transition-colors flex justify-center items-center gap-2 en-text rounded-full mb-4">
              Proceed to Checkout
            </button>
            
            <button 
              onClick={() => onNavigate('collection')}
              className="w-full flex justify-center items-center gap-2 text-[#666] hover:text-natural-accent transition-colors uppercase tracking-widest text-xs en-text font-medium"
            >
              Continue Shopping
            </button>
          </div>
        </div>

      </div>
    </motion.div>
  );
}
