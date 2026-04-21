import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Product } from '../../data';
import { Truck, X } from 'lucide-react';
import { QuantitySelector } from '../../components/QuantitySelector';
import { useAppContext } from '../../state';

interface ProductPageProps {
  product: Product;
  onAddToCart: (product: Product, quantity?: number) => void;
  isQuickAdd?: boolean;
}

export function ProductPage({ product, onAddToCart, isQuickAdd }: ProductPageProps) {
  const { onNavigate } = useAppContext();
  const [quantity, setQuantity] = useState(1);

  const handleIncrease = () => {
    if (quantity < 10) setQuantity((prev) => prev + 1);
  };

  const handleDecrease = () => {
    if (quantity > 1) setQuantity((prev) => prev - 1);
  };

  const handleBack = () => {
    if (isQuickAdd) return;
    if (window.history.length > 2) {
      window.history.back();
    } else {
      onNavigate('home');
    }
  };

  return (
    <motion.div
      initial={isQuickAdd ? {} : { opacity: 0 }}
      animate={isQuickAdd ? {} : { opacity: 1 }}
      exit={isQuickAdd ? {} : { opacity: 0 }}
      className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 w-full relative ${isQuickAdd ? '!py-12' : ''}`}
    >
      {!isQuickAdd && (
        <button 
          onClick={handleBack}
          className="absolute top-4 left-4 sm:top-8 sm:left-8 p-2 rounded-full bg-natural-bg border border-natural-border text-natural-text hover:bg-natural-accent hover:text-white transition-colors z-10"
        >
          <X size={24} />
        </button>
      )}

      <div className="flex flex-col md:flex-row gap-12 lg:gap-20">
        
        {/* Images */}
        <div className="w-full md:w-1/2">
          <div className={`aspect-[4/5] bg-natural-img rounded-2xl overflow-hidden mb-4 ${isQuickAdd ? 'md:max-h-[500px]' : ''}`}>
            <img 
              src={product.image} 
              alt={product.name} 
              onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&q=80&w=800'; }}
              className="w-full h-full object-cover object-center"
            />
          </div>
          {!isQuickAdd && (
            <div className="grid grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((_, i) => (
                <div key={i} className="aspect-square bg-natural-img rounded-xl overflow-hidden cursor-pointer border border-transparent hover:border-natural-accent transition-colors">
                  <img 
                    src={product.image} 
                    className="w-full h-full object-cover opacity-80 hover:opacity-100" 
                    alt="thumbnail" 
                    onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&q=80&w=800'; }}
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Details */}
        <div className={`w-full md:w-1/2 ${isQuickAdd ? 'mt-0' : 'mt-4 md:mt-10'}`}>
          <p className="text-natural-accent uppercase tracking-widest text-xs font-bold en-text mb-3">{product.category}</p>
          <h1 className={`${isQuickAdd ? 'text-2xl md:text-3xl' : 'text-3xl md:text-4xl'} text-natural-text en-title mb-4`}>{product.name}</h1>
          
          <div className="flex items-center gap-4 mb-6 border-b border-natural-border pb-6">
            <div className="flex items-center gap-3">
              <span className="text-2xl text-natural-accent font-medium en-text">{product.price} EGP</span>
              {product.oldPrice && (
                <span className="text-natural-secondary-text line-through text-lg en-text">{product.oldPrice} EGP</span>
              )}
            </div>
          </div>

          {product.description && (
            <div className={isQuickAdd ? 'mb-6' : 'mb-8'}>
              <h3 className="text-lg text-natural-text mb-3 font-medium">الوصف</h3>
              <p className="text-natural-secondary-text font-light leading-relaxed mb-6 line-clamp-3">
                {product.description}
              </p>
            </div>
          )}

          <div className="flex gap-4 mb-10 w-full h-[52px]">
            <div className="flex-1">
              <QuantitySelector 
                quantity={quantity}
                onIncrease={handleIncrease}
                onDecrease={handleDecrease}
              />
            </div>
            <button 
              onClick={() => {
                onAddToCart(product, quantity);
              }}
              className="bg-natural-accent text-white w-2/3 h-full uppercase tracking-widest text-sm font-medium hover:bg-natural-accent-dark transition-colors en-text rounded-full shadow-sm"
            >
              Add to Cart
            </button>
          </div>

          <div className={`flex flex-col gap-4 py-6 border-t border-b border-natural-border ${isQuickAdd ? 'hidden sm:flex' : ''}`}>
            <div className="flex items-center gap-4 text-[#666]">
              <Truck size={24} strokeWidth={1.5} />
              <p className="font-light">توصيل مجاني داخل مصر للطلبات فوق 1000 جنيه مصري</p>
            </div>
          </div>

        </div>
      </div>
    </motion.div>
  );
}
