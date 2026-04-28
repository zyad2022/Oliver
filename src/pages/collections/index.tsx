import React, { useState, useMemo, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { Product } from '../../data';
import { ProductCard } from '../../components/ProductCard';
import { PageTitle } from '../../components/PageTitle';
import { useUI, useAppState } from '../../state';
import { useQuery } from '@tanstack/react-query';
import { fetchProducts } from '../../services/api';
import { useWindowVirtualizer } from '@tanstack/react-virtual';

type PriceFilter = '10-50' | '50-100' | '100-200' | '200+';
type SortOption = 'default' | 'newest' | 'price-asc' | 'price-desc';

export function Collection() {
  const { setSelectedProduct } = useUI();
  const { onNavigate } = useAppState();
  const categories = ['مجموعة North Star', 'قلائد', 'أساور', 'خواتم'];
  
  const { data: products = [], isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
  });

  const onProductClick = (product: Product) => {
    onNavigate(`product?id=${product.id}`);
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
      if (activeCategory === 'أساور') return p.category === 'Bracelets';
      if (activeCategory === 'مجموعة North Star') return p.category === 'North Star';
      return true;
    });

    // 2. Filter by Price
    if (activePriceFilters.length > 0) {
      result = result.filter(p => {
        return activePriceFilters.some(filter => {
          if (filter === '10-50') return p.price >= 10 && p.price <= 50;
          if (filter === '50-100') return p.price > 50 && p.price <= 100;
          if (filter === '100-200') return p.price > 100 && p.price <= 200;
          if (filter === '200+') return p.price > 200;
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
       // أحدث منتج يظهر أولًا
       result.sort((a, b) => {
        const dateA = new Date(a.dateAdded || 0).getTime();
        const dateB = new Date(b.dateAdded || 0).getTime();
        return dateB - dateA;
      });
      break;
    }

    return result;
  }, [activeCategory, activePriceFilters, sortOption, products]);

  // Virtualization setup
  const [columns, setColumns] = useState(2);
  useEffect(() => {
    const handleResize = () => {
      setColumns(window.innerWidth >= 1024 ? 3 : 2);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const rowCount = Math.ceil(filteredAndSortedProducts.length / columns);

  const virtualizer = useWindowVirtualizer({
    count: rowCount,
    estimateSize: () => 450, // Approx height of ProductCard + gap
    overscan: 2,
  });

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

      <div className="flex flex-col md:flex-row-reverse gap-12">
        {/* Product Grid */}
        <div className="w-full">
          <div className="flex flex-row-reverse justify-between items-center mb-8 text-[#666] text-sm">
            <div className="luxury-pill-outer scale-90 sm:scale-100 origin-right">
              <div className="luxury-pill-core px-5 py-1.5">
                <span className="font-arabic text-white">عرض {filteredAndSortedProducts.length} منتجات</span>
              </div>
            </div>
            <div className="luxury-pill-outer">
              <div className="luxury-pill-core !p-0">
                <select 
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value as SortOption)}
                  className="bg-transparent outline-none w-48 font-arabic cursor-pointer py-2 px-4 text-white relative z-10"
                >
                  <option value="default" className="text-natural-text bg-white">الترتيب الافتراضي</option>
                  <option value="newest" className="text-natural-text bg-white">الأحدث</option>
                  <option value="price-asc" className="text-natural-text bg-white">السعر: من الأقل للأعلى</option>
                  <option value="price-desc" className="text-natural-text bg-white">السعر: من الأعلى للأقل</option>
                </select>
              </div>
            </div>
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="w-10 h-10 border-4 border-gold-primary border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : (
            <div 
              style={{
                height: `${virtualizer.getTotalSize()}px`,
                width: '100%',
                position: 'relative',
              }}
            >
              {virtualizer.getVirtualItems().map((virtualRow) => {
                const startIndex = virtualRow.index * columns;
                const rowProducts = filteredAndSortedProducts.slice(startIndex, startIndex + columns);
                
                return (
                  <div
                    key={virtualRow.index}
                    ref={virtualizer.measureElement}
                    data-index={virtualRow.index}
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      transform: `translateY(${virtualRow.start}px)`,
                    }}
                    className={`grid grid-cols-2 lg:grid-cols-3 gap-x-4 sm:gap-x-6 pb-6 sm:pb-12`}
                  >
                    {rowProducts.map(product => (
                      <ProductCard 
                        key={product.id} 
                        product={product} 
                        onClick={onProductClick} 
                      />
                    ))}
                  </div>
                );
              })}
            </div>
          )}
          
          {!isLoading && filteredAndSortedProducts.length === 0 && (
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

        {/* Filters Sidebar */}
        <div className="w-full md:w-64 flex-shrink-0">
          <div className="sticky top-28 bg-gradient-to-br from-gold-light via-[#FDFBF7] to-gold-soft border border-gold-primary/20 rounded-2xl shadow-[0_8px_30px_rgba(212,175,55,0.08)] p-6 backdrop-blur-sm text-right">
            <h3 className="text-lg text-gold-deep mb-6 pb-3 border-b border-gold-primary/20 font-arabic font-medium">التصنيفات</h3>
            <ul className="flex flex-col gap-3">
              <li>
                <button 
                  onClick={() => setActiveCategory('جميع المنتجات')}
                  className={`text-base transition-all duration-300 w-full text-right py-1 px-2 rounded-lg hover:bg-gold-primary/10 ${activeCategory === 'جميع المنتجات' ? 'text-gold-deep font-bold bg-gold-primary/5 shadow-sm' : 'text-natural-secondary-text hover:text-gold-deep'}`}
                >
                  جميع المنتجات
                </button>
              </li>
              {categories.map((cat, idx) => (
                <li key={idx}>
                  <button 
                    onClick={() => setActiveCategory(cat)}
                    className={`text-base transition-all duration-300 w-full text-right py-1 px-2 rounded-lg hover:bg-gold-primary/10 ${activeCategory === cat ? 'text-gold-deep font-bold bg-gold-primary/5 shadow-sm' : 'text-natural-secondary-text hover:text-gold-deep'}`}
                  >
                    {cat}
                  </button>
                </li>
              ))}
            </ul>

            <h3 className="text-lg text-gold-deep mb-6 pb-3 border-b border-gold-primary/20 mt-10 font-arabic font-medium">السعر</h3>
            <div className="flex flex-col gap-4">
              <label className="flex items-center gap-3 text-natural-secondary-text cursor-pointer group hover:text-gold-deep transition-colors">
                <input 
                  type="checkbox" 
                  className="w-4 h-4 accent-gold-primary rounded cursor-pointer border-gold-primary/30"
                  checked={activePriceFilters.includes('10-50')}
                  onChange={() => togglePriceFilter('10-50')}
                />
                <span className="en-text text-sm group-hover:-translate-x-1 transition-transform">10 - 50 EGP</span>
              </label>
              <label className="flex items-center gap-3 text-natural-secondary-text cursor-pointer group hover:text-gold-deep transition-colors">
                <input 
                  type="checkbox" 
                  className="w-4 h-4 accent-gold-primary rounded cursor-pointer border-gold-primary/30"
                  checked={activePriceFilters.includes('50-100')}
                  onChange={() => togglePriceFilter('50-100')}
                />
                <span className="en-text text-sm group-hover:-translate-x-1 transition-transform">50 - 100 EGP</span>
              </label>
              <label className="flex items-center gap-3 text-natural-secondary-text cursor-pointer group hover:text-gold-deep transition-colors">
                <input 
                  type="checkbox" 
                  className="w-4 h-4 accent-gold-primary rounded cursor-pointer border-gold-primary/30"
                  checked={activePriceFilters.includes('100-200')}
                  onChange={() => togglePriceFilter('100-200')}
                />
                <span className="en-text text-sm group-hover:-translate-x-1 transition-transform">100 - 200 EGP</span>
              </label>
              <label className="flex items-center gap-3 text-natural-secondary-text cursor-pointer group hover:text-gold-deep transition-colors">
                <input 
                  type="checkbox" 
                  className="w-4 h-4 accent-gold-primary rounded cursor-pointer border-gold-primary/30"
                  checked={activePriceFilters.includes('200+')}
                  onChange={() => togglePriceFilter('200+')}
                />
                <span className="en-text text-sm group-hover:-translate-x-1 transition-transform">200+ EGP</span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

