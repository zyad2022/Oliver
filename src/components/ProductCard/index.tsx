import React, { useMemo } from 'react';
import { Product } from '../../data';
import { useAppContext } from '../../state';

interface ProductCardProps {
  product: Product;
  onClick: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onClick }) => {
  const { openModal } = useAppContext();
  
  const isRecentlyAdded = useMemo(() => {
    const addedDate = new Date(product.dateAdded);
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    return addedDate >= thirtyDaysAgo;
  }, [product.dateAdded]);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    openModal('quick-add', product);
  };

  return (
    <div 
      className="group cursor-pointer flex flex-col gap-3 bg-natural-card border border-natural-border p-4 rounded-2xl"
      onClick={() => onClick(product)}
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-natural-img rounded-xl flex items-center justify-center">
        {isRecentlyAdded && (
          <div className="absolute top-3 right-3 z-10 luxury-pill-outer scale-75 origin-top-right">
            <div className="luxury-pill-core px-4 py-1">
              <span className="text-[10px] tracking-widest uppercase en-text font-bold">New</span>
            </div>
          </div>
        )}
        <img 
          src={product.listingImage} 
          alt={product.name}
          onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&q=80&w=800'; }}
          className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute bottom-0 left-0 w-full p-4 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
          <button 
            onClick={handleQuickAdd}
            className="w-full bg-white/90 backdrop-blur-sm text-natural-text py-3 uppercase tracking-wider text-sm font-medium hover:bg-natural-accent hover:text-white rounded-full transition-colors en-text shadow-sm"
          >
            Quick Add
          </button>
        </div>
      </div>
      
      <div className="flex flex-col items-center text-center">
        <h3 className="en-title text-base text-natural-text mb-1">{product.name}</h3>
        <div className="flex items-center gap-3">
          <span className="en-text text-natural-accent font-bold">{product.price} EGP</span>
          {product.oldPrice && (
            <span className="en-text text-natural-secondary-text line-through text-sm">{product.oldPrice} EGP</span>
          )}
        </div>
      </div>
    </div>
  );
}
