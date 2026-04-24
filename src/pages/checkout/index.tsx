
import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useAppContext } from '../../state';
import { PageTitle } from '../../components/PageTitle';
import { X, Check, Wallet, Truck, Smartphone } from 'lucide-react';

export function Checkout() {
  const { cartItems, onNavigate, placeOrder } = useAppContext();
  const [selectedMethod, setSelectedMethod] = useState<'vodafone' | 'cod' | null>(null);
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);

  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.cartQuantity), 0);
  const shipping = subtotal >= 1000 ? 0 : 50;
  const total = subtotal + shipping;

  const handlePlaceOrder = async () => {
    if (!selectedMethod) {
      alert('الرجاء اختيار طريقة الدفع أولاً');
      return;
    }

    const methodLabel = selectedMethod === 'vodafone' ? 'Vodafone Cash' : 'Cash on Delivery';
    
    // Generate WhatsApp message
    const orderItemsText = cartItems
      .map(item => `• ${item.name} (${item.cartQuantity}x) - ${item.price * item.cartQuantity} EGP`)
      .join('\n');

    const message = `*طلب جديد من Oliver Luxury Brands*\n\n` +
      `*تفاصيل المنتجات:*\n${orderItemsText}\n\n` +
      `*المجموع:* ${subtotal} EGP\n` +
      `*الشحن:* ${shipping === 0 ? 'مجاني' : shipping + ' EGP'}\n` +
      `*الإجمالي النهائي:* ${total} EGP\n\n` +
      `*طريقة الدفع المختارة:* ${methodLabel}\n\n` +
      `شكراً لتسوقكم معنا!`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/201550240629?text=${encodedMessage}`;

    setIsPlacingOrder(true);
    try {
      await placeOrder(methodLabel);
      // Redirect to WhatsApp
      window.location.href = whatsappUrl;
    } catch (error) {
      alert('حدث خطأ أثناء إتمام الطلب. يرجى المحاولة مرة أخرى.');
    } finally {
      setIsPlacingOrder(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-8">
         <PageTitle title="سلة المشتريات فارغة" />
         <button 
           onClick={() => onNavigate('home')}
           className="bg-natural-accent text-white px-8 py-3 rounded-full en-text"
         >
           BACK TO HOME
         </button>
      </div>
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

      <PageTitle title="إتمام الشراء" />

      <div className="flex flex-col lg:flex-row gap-12 text-natural-text">
        
        {/* Main Area: Payment Methods */}
        <div className="w-full lg:w-2/3">
          <h2 className="text-xl font-medium mb-8 text-natural-text border-b border-natural-border pb-4">طريقة الدفع</h2>
          
          <div className="flex flex-col gap-4">
            {/* Vodafone Cash */}
            <button
              onClick={() => setSelectedMethod('vodafone')}
              className={`flex items-center justify-between p-6 rounded-2xl border-2 transition-all group ${
                selectedMethod === 'vodafone' 
                  ? 'border-gold-primary bg-gold-primary/5 shadow-lg shadow-gold-primary/10' 
                  : 'border-natural-border bg-white hover:border-gold-primary/50'
              }`}
            >
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-xl transition-colors ${
                  selectedMethod === 'vodafone' ? 'bg-gold-primary text-white' : 'bg-natural-bg text-natural-text group-hover:bg-gold-primary/10 group-hover:text-gold-primary'
                }`}>
                  <Smartphone size={24} />
                </div>
                <div className="text-right">
                  <p className="font-medium text-lg">Vodafone Cash</p>
                  <p className="text-sm text-[#888]">تحويل مباشر عبر فودافون كاش</p>
                </div>
              </div>
              {selectedMethod === 'vodafone' && (
                <div className="w-6 h-6 rounded-full bg-gold-primary flex items-center justify-center text-white">
                  <Check size={16} strokeWidth={3} />
                </div>
              )}
            </button>

            {/* Cash on Delivery */}
            <button
              onClick={() => setSelectedMethod('cod')}
              className={`flex items-center justify-between p-6 rounded-2xl border-2 transition-all group ${
                selectedMethod === 'cod' 
                  ? 'border-gold-primary bg-gold-primary/5 shadow-lg shadow-gold-primary/10' 
                  : 'border-natural-border bg-white hover:border-gold-primary/50'
              }`}
            >
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-xl transition-colors ${
                  selectedMethod === 'cod' ? 'bg-gold-primary text-white' : 'bg-natural-bg text-natural-text group-hover:bg-gold-primary/10 group-hover:text-gold-primary'
                }`}>
                  <Truck size={24} />
                </div>
                <div className="text-right">
                  <p className="font-medium text-lg">Cash on Delivery</p>
                  <p className="text-sm text-[#888]">الدفع عند الاستلام</p>
                </div>
              </div>
              {selectedMethod === 'cod' && (
                <div className="w-6 h-6 rounded-full bg-gold-primary flex items-center justify-center text-white">
                  <Check size={16} strokeWidth={3} />
                </div>
              )}
            </button>
          </div>

          <div className="mt-12 bg-white p-8 rounded-2xl border border-natural-border">
            <h3 className="font-medium mb-4">تفاصيل الطلب</h3>
            <p className="text-[#666] text-sm leading-relaxed mb-6">
              سيتم اكمال دفع الطلب عبر واتساب مباشرة
            </p>
            <button 
              onClick={handlePlaceOrder}
              disabled={isPlacingOrder || !selectedMethod}
              className="w-full bg-natural-accent text-white py-5 rounded-full uppercase tracking-widest font-bold hover:bg-natural-accent-dark transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-natural-accent/20"
            >
              {isPlacingOrder ? 'Processing...' : 'تأكيد الطلب'}
            </button>
          </div>
        </div>

        {/* Right Sidebar: Order Summary */}
        <div className="w-full lg:w-1/3">
          <div className="sticky top-24 bg-[#FAF7F2] border border-gold-primary/20 rounded-2xl p-8 shadow-sm">
            <h2 className="text-xl font-serif text-gold-deep mb-6 uppercase tracking-widest border-b border-gold-primary/10 pb-4">
              ملخص الطلب
            </h2>
            
            <div className="max-h-[350px] overflow-y-auto mb-6 pr-2 custom-scrollbar">
              <div className="flex flex-col gap-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center gap-3">
                    {/* Product Name Bar */}
                    <div className="flex-1 bg-gold-primary/5 border border-gold-primary/10 rounded-2xl px-5 py-4 min-w-0 shadow-sm">
                      <p className="en-title text-xs truncate text-gold-deep uppercase tracking-widest font-medium">
                        {item.name}
                      </p>
                    </div>
                    
                    {/* Badge Group */}
                    <div className="flex items-center gap-2 flex-shrink-0">
                      {/* Price Badge */}
                      <div className="w-14 h-14 rounded-full bg-gold-primary/10 border border-gold-primary/20 flex flex-col items-center justify-center shadow-inner">
                        <span className="text-[9px] text-gold-deep/60 leading-none mb-0.5">EGP</span>
                        <span className="en-text text-[11px] font-bold text-gold-deep leading-none">{item.price}</span>
                      </div>
                      
                      {/* Quantity Badge */}
                      <div className="w-10 h-10 rounded-full bg-gold-primary/20 border border-gold-primary/30 flex flex-col items-center justify-center shadow-inner">
                        <span className="text-[7px] text-gold-deep/70 leading-none uppercase tracking-tighter mb-0.5">Qty</span>
                        <span className="en-text text-[11px] font-bold text-gold-deep leading-none">{item.cartQuantity}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-4 text-[#666] mb-6 border-t border-gold-primary/10 pt-6">
              <div className="flex justify-between items-center text-sm">
                <span>المجموع الفرعي</span>
                <span className="en-text font-medium text-natural-text">{subtotal} EGP</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span>رسوم التوصيل</span>
                <span className="en-text font-medium text-natural-text">
                  {shipping === 0 ? 'مجاني' : `${shipping} EGP`}
                </span>
              </div>
            </div>

            <div className="flex justify-between items-center pt-4 border-t border-gold-primary/20">
              <span className="text-lg text-gold-deep font-medium uppercase tracking-wider">الإجمالي</span>
              <span className="text-2xl text-gold-primary font-bold en-text">{total} EGP</span>
            </div>
            
            <div className="mt-8 flex items-center gap-2 text-[10px] text-gold-deep/60 uppercase tracking-widest justify-center">
              <Check size={12} /> SECURE LUXURY CHECKOUT
            </div>
          </div>
        </div>

      </div>
    </motion.div>
  );
}
