import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { products, Product } from '../../data';
import { ProductCard } from '../../components/ProductCard';
import { PageTitle } from '../../components/PageTitle';
import { useAppContext } from '../../state';

type PriceFilter = '10-100' | '150-300' | '300-600' | '600+';
type SortOption = 'default' | 'newest' | 'price-asc' | 'price-desc';

export function Collection() {
  const { setSelectedProduct, onNavigate } = useAppContext();
  const categories = ['جميع المنتجات', 'قلائد', 'خواتم'];
  
  const onProductClick = (product: Product) => {
    setSelectedProduct(product);
    onNavigate('product');
  };
  
  const [activeCategory, setActiveCategory] = useState<string>('جميع المنتجات');
  const [activePriceFilters, setActivePriceFilters] = useState<PriceFilter[]>([]);
  const [sortOption, setSortOption] = useState<SortOption>('default');

  const togglePriceFilter = (filter: PriceFilter) => {
    setActivePriceFilters(prev => 
      prev.includes(filter) 
        ? prev.filter(f => f !== filter)
        : [...prev, filter]
    );
  };

  const filteredAndSortedProducts = useMemo(() => {
    // 1. Filter by Category
    let result = products.filter(p => {
      if (activeCategory === 'جميع المنتجات') return true;
      if (activeCategory === 'قلائد') return p.category === 'Necklaces';
      if (activeCategory === 'خواتم') return p.category === 'Rings';
      return true;
    });

    // 2. Filter by Price
    if (activePriceFilters.length > 0) {
      result = result.filter(p => {
        return activePriceFilters.some(filter => {
          if (filter === '10-100') return p.price >= 10 && p.price <= 100;
          if (filter === '150-300') return p.price > 150 && p.price <= 300;
          if (filter === '300-600') return p.price > 300 && p.price <= 600;
          if (filter === '600+') return p.price > 600;
          return false;
        });
      });
    }

    // 3. Sort
    switch (sortOption) {
      case 'newest':
        result.sort((a, b) => new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime());
        break;
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'default':
      default:
        // Use ID for default consistent sorting
        result.sort((a, b) => parseInt(a.id) - parseInt(b.id));
        break;
    }

    return result;
  }, [activeCategory, activePriceFilters, sortOption]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 w-full"
    >
      <PageTitle 
        title="تشكيلة الأناقة اليومية"
        description="تصفحي جميع القطع المميزة وتألقي بإطلالة تعبر عن شخصيتك. كل قطعة تعكس قصة فريدة تنتظر من يبرز جمالها."
      />

      <div className="flex flex-col md:flex-row gap-12">
        {/* Filters Sidebar */}
        <div className="w-full md:w-64 flex-shrink-0">
          <div className="sticky top-28">
            <h3 className="text-xl text-natural-text mb-6 pb-4 border-b border-natural-border">التصنيفات</h3>
            <ul className="flex flex-col gap-4">
              {categories.map((cat, idx) => (
                <li key={idx}>
                  <button 
                    onClick={() => setActiveCategory(cat)}
                    className={`text-lg transition-colors ${activeCategory === cat ? 'text-natural-text font-medium' : 'text-[#666] hover:text-natural-accent'}`}
                  >
                    {cat}
                  </button>
                </li>
              ))}
            </ul>

            <h3 className="text-xl text-natural-text mb-6 pb-4 border-b border-natural-border mt-12">السعر</h3>
            <div className="flex flex-col gap-3">
              <label className="flex items-center gap-3 text-[#666] cursor-pointer">
                <input 
                  type="checkbox" 
                  className="w-4 h-4 accent-natural-accent"
                  checked={activePriceFilters.includes('10-100')}
                  onChange={() => togglePriceFilter('10-100')}
                />
                <span className="en-text">10 - 100 EGP</span>
              </label>
              <label className="flex items-center gap-3 text-[#666] cursor-pointer">
                <input 
                  type="checkbox" 
                  className="w-4 h-4 accent-natural-accent"
                  checked={activePriceFilters.includes('150-300')}
                  onChange={() => togglePriceFilter('150-300')}
                />
                <span className="en-text">150 - 300 EGP</span>
              </label>
              <label className="flex items-center gap-3 text-[#666] cursor-pointer">
                <input 
                  type="checkbox" 
                  className="w-4 h-4 accent-natural-accent"
                  checked={activePriceFilters.includes('300-600')}
                  onChange={() => togglePriceFilter('300-600')}
                />
                <span className="en-text">300 - 600 EGP</span>
              </label>
              <label className="flex items-center gap-3 text-[#666] cursor-pointer">
                <input 
                  type="checkbox" 
                  className="w-4 h-4 accent-natural-accent"
                  checked={activePriceFilters.includes('600+')}
                  onChange={() => togglePriceFilter('600+')}
                />
                <span className="en-text">600+ EGP</span>
              </label>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="w-full">
          <div className="flex justify-between items-center mb-8 text-[#666] text-sm">
            <span>عرض {filteredAndSortedProducts.length} منتجات</span>
            <select 
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value as SortOption)}
              className="border border-natural-border bg-transparent py-2 px-4 rounded-full outline-none w-48 font-arabic focus:border-natural-accent"
            >
              <option value="default">الترتيب الافتراضي</option>
              <option value="newest">الأحدث</option>
              <option value="price-asc">السعر: من الأقل للأعلى</option>
              <option value="price-desc">السعر: من الأعلى للأقل</option>
            </select>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12">
            {filteredAndSortedProducts.map(product => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onClick={onProductClick} 
              />
            ))}
          </div>
          
          {filteredAndSortedProducts.length === 0 && (
            <div className="text-center py-20 text-[#666]">
              <p className="text-xl mb-4">لاتوجد منتجات تطابق بحثك</p>
              <button 
                onClick={() => {
                  setActiveCategory('جميع المنتجات');
                  setActivePriceFilters([]);
                }}
                className="text-natural-accent underline hover:text-black transition-colors"
              >
                إعادة تعيين الفلاتر
              </button>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

