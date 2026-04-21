import React, { useMemo } from 'react';
import { products, Product } from '../../data';
import { ProductCard } from '../../components/ProductCard';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles } from 'lucide-react';
import { PageTitle } from '../../components/PageTitle';
import { useAppContext } from '../../state';

export function NewArrivals() {
  const { setSelectedProduct, onNavigate } = useAppContext();
  
  const onProductClick = (product: Product) => {
    setSelectedProduct(product);
    onNavigate('product');
  };
  // Filter products added within the last 30 days and sort by date descending
  const newProducts = useMemo(() => {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    return products
      .filter((p) => {
        const addedDate = new Date(p.dateAdded);
        return addedDate >= thirtyDaysAgo;
      })
      .sort((a, b) => new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime());
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="w-full bg-[#FAF8F5] pb-20 pt-10 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">
        
        {/* Page Header */}
        <PageTitle 
          title="وصل حديثاً"
          description="أحدث المنتجات المضافة إلى مجموعة Oliver"
          badgeIcon={<Sparkles size={16} className="text-natural-accent" />}
          badgeText="أحدث المجموعات"
        />

        {/* Product Grid or Empty State */}
        <AnimatePresence mode="wait">
          {newProducts.length > 0 ? (
            <motion.div 
              key="grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-12"
            >
              {newProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <ProductCard product={product} onClick={onProductClick} />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div 
              key="empty"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="text-center py-24 bg-white rounded-[32px] border border-natural-border flex flex-col items-center justify-center natural-shadow max-w-3xl mx-auto"
            >
              <p className="text-2xl sm:text-3xl font-arabic font-medium text-natural-text mb-4">لا توجد منتجات حديثة حالياً ✨</p>
              <p className="text-lg text-[#666] max-w-sm mx-auto font-arabic font-light">
                تابعنا دائماً لأحدث الإضافات من مجموعة Oliver
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
