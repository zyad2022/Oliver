import React from 'react';
import { motion } from 'motion/react';
import { products, Product } from '../data';
import { ProductCard } from '../components/ProductCard';

interface HomeProps {
  onNavigate: (page: string) => void;
  onProductClick: (product: Product) => void;
}

export function Home({ onNavigate, onProductClick }: HomeProps) {
  const featuredProducts = products.slice(0, 4);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col w-full"
    >
      {/* Hero Section */}
      <section className="relative h-[85vh] w-full bg-natural-hero overflow-hidden mt-2 mx-auto rounded-none sm:rounded-[24px] sm:max-w-7xl">
        <img 
          src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&q=80&w=2000" 
          alt="Woman wearing elegant jewelry"
          className="absolute inset-0 w-full h-full object-cover object-[center_30%]"
          onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&q=80&w=2000'; }}
        />
        <div className="absolute inset-0 bg-stone-900/20" />
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 text-white">
            <motion.div 
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="max-w-xl"
            >
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-arabic font-medium leading-tight mb-6 drop-shadow-sm">
                اكتشفي سر جاذبيتك<br />بلمسة من الأناقة
              </h2>
              <p className="font-arabic text-lg md:text-xl text-stone-100 mb-10 opacity-90 font-light">
                مجوهرات مصممة لتعكس جمالك الداخلي، تضيف تفاصيل ساحرة على إطلالتك اليومية وفي كل مناسبة.
              </p>
              <button 
                onClick={() => onNavigate('collection')}
                className="bg-[#2D2D2D] text-white px-8 py-4 uppercase tracking-widest text-sm font-medium hover:bg-[#1A1A1A] transition-colors shadow-lg rounded-full en-text"
              >
                Shop Collection
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Value Proposition */}
      <section className="py-16 md:py-24 bg-natural-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center divide-y md:divide-y-0 md:divide-x md:divide-x-reverse border-natural-border">
            <div className="px-6 py-4 md:py-0">
              <h3 className="text-xl mb-3 text-natural-text">تصميم كلاسيكي</h3>
              <p className="text-[#666] font-light leading-relaxed">قطع مختارة بعناية لترافقك في كل الفصول دون أن تفقد رونقها.</p>
            </div>
            <div className="px-6 py-4 md:py-0">
              <h3 className="text-xl mb-3 text-natural-text">جودة فاخرة</h3>
              <p className="text-[#666] font-light leading-relaxed">مطلي بالذهب ومصنوع من مواد لا تسبب حساسية للبشرة.</p>
            </div>
            <div className="px-6 py-4 md:py-0">
              <h3 className="text-xl mb-3 text-natural-text">تغليف أنيق</h3>
              <p className="text-[#666] font-light leading-relaxed">تصلك كل قطعة بتغليف فاخر يليق بك أو كهدية لمن تحبين.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl text-natural-text mb-2">الأكثر طلباً</h2>
            <p className="text-[#666] font-light">تشكيلة من أفضل القطع المباعة.</p>
          </div>
          <button 
            onClick={() => onNavigate('collection')}
            className="hidden sm:inline-block border-b border-natural-text pb-1 text-natural-text hover:text-natural-accent transition-colors uppercase tracking-widest text-sm font-medium en-text"
          >
            View All
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-12">
          {featuredProducts.map(product => (
            <ProductCard 
              key={product.id} 
              product={product} 
              onClick={onProductClick} 
            />
          ))}
        </div>
        
        <div className="mt-12 text-center sm:hidden">
          <button 
            onClick={() => onNavigate('collection')}
            className="inline-block border-b border-natural-text pb-1 text-natural-text uppercase tracking-widest text-sm font-medium en-text"
          >
            View All
          </button>
        </div>
      </section>

      {/* Promo Banner */}
      <section className="py-16 bg-natural-hero w-full mt-8 rounded-[24px]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="w-full md:w-1/2">
              <img 
                src="https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&q=80&w=1200" 
                alt="Bracelets"
                className="w-full h-[500px] object-cover rounded-[24px] natural-shadow"
                onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&q=80&w=1200'; }}
              />
            </div>
            <div className="w-full md:w-1/2 flex flex-col justify-center max-w-md">
              <span className="text-natural-accent uppercase tracking-widest text-sm font-medium en-text mb-4">New Arrival</span>
              <h2 className="text-4xl font-arabic font-medium text-natural-text mb-6 leading-snug">
                سحر الطبيعة يتجسد في تصاميمنا
              </h2>
              <p className="font-arabic text-[#666] font-light leading-relaxed mb-8 text-lg">
                اكتشفي مجموعة "أورا" الجديدة، المستوحاة من تفاصيل الطبيعة الساحرة. قطع فريدة مصممة لتبرز جمالك الطبيعي وتزيدك إشراقاً.
              </p>
              <button 
                onClick={() => onNavigate('collection')}
                className="bg-[#2D2D2D] text-white self-start px-8 py-4 uppercase tracking-widest text-sm font-medium hover:bg-[#1A1A1A] transition-colors rounded-full en-text"
              >
                Shop Now
              </button>
            </div>
          </div>
        </div>
      </section>

    </motion.div>
  );
}
