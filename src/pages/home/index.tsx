import React from 'react';
import { motion } from 'motion/react';
import { products, Product } from '../../data';
import { useAppContext } from '../../state';
import { ArrowRight } from 'lucide-react';

export function Home() {
  const { onNavigate, setSelectedProduct } = useAppContext();
  const featuredProducts = products.slice(0, 4);

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    onNavigate('product');
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col w-full bg-natural-bg"
    >
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[85vh] w-full flex flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-[#FAF8F5] via-[#FDFBF7] to-[#FAF8F5] luxury-hero-bg">
        
        {/* Soft luxury radial glow (Option B/C: Light gradient spotlight / faint gold shimmer) */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[70vw] max-w-[900px] max-h-[900px] bg-gradient-to-tr from-gold-primary/10 via-gold-soft/40 to-transparent rounded-full blur-[100px] pointer-events-none opacity-80" />
        
        <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 w-full">
          <motion.div 
            initial={{ scale: 0.96, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center max-w-3xl"
          >
            {/* Center Logo with Breathing Space and Halo */}
            <div className="relative mb-10 mt-8">
              <div className="absolute inset-0 bg-gold-primary/5 blur-3xl rounded-full scale-150" />
              <h1 className="relative text-7xl md:text-8xl lg:text-9xl font-serif text-stone-900 tracking-[0.15em] uppercase en-title drop-shadow-sm">
                Oliver
              </h1>
            </div>
            
            <motion.p 
              initial={{ y: 15, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 1, ease: 'easeOut' }}
              className="font-arabic text-xl md:text-2xl text-stone-600 mb-14 font-light leading-relaxed max-w-xl relative"
            >
              إشراقة يومية بلمسات من الأناقة التي لا تفقد بريقها
            </motion.p>
            
            <motion.div 
              initial={{ y: 15, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6, duration: 1, ease: 'easeOut' }}
              className="luxury-pill-outer hover:scale-105 transition-transform duration-500"
            >
              <button 
                onClick={() => onNavigate('collection')}
                className="rounded-full px-12 py-4 uppercase tracking-[0.2em] text-sm font-bold en-text text-stone-900 bg-[#F0DFAF] hover:bg-[#E6C77B] shadow-[0_4px_12px_rgba(0,0,0,0.08)] transition-all duration-300 ease-in-out"
              >
                Explore Collections
              </button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 2. BRAND STORY SECTION */}
      <section className="py-24 md:py-32 bg-natural-bg relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gold-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gold-primary/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3" />
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="mb-8 inline-flex">
            <div className="w-12 h-1 bg-gold-primary mx-auto rounded-full opacity-60" />
          </div>
          <h2 className="text-3xl md:text-4xl text-gold-deep mb-8 font-arabic font-medium leading-relaxed">
            الجمال في أبسط تفاصيله
          </h2>
          <p className="font-arabic text-lg md:text-xl text-natural-secondary-text leading-loose font-light">
            في أوليفر، نؤمن بأن القطع الفاخرة ليست مجرد زينة، بل هي انعكاس لشخصيتك وقصتك. نصمم مجوهراتنا بحب لتكون رفيقة يومك، تجمع بين الرقي الملكي وبساطة العصر الحديث، لتتألقي في كل لحظة.
          </p>
        </div>
      </section>

      {/* 3. CATEGORY SHOWCASE */}
      <section className="py-12 bg-white">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {/* Category 1 */}
            <div 
              onClick={() => onNavigate('collection')}
              className="relative h-[400px] md:h-[500px] rounded-[32px] overflow-hidden group cursor-pointer shadow-sm hover:shadow-xl hover:shadow-gold-primary/20 transition-all duration-700"
            >
              <img 
                src="https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&q=80&w=1200" 
                alt="Bracelets" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute inset-0 border-2 border-gold-primary/0 group-hover:border-gold-primary/30 rounded-[32px] transition-colors duration-500 z-10 m-4" />
              <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 text-center md:text-right z-20">
                <h3 className="text-3xl md:text-4xl text-white font-arabic mb-3">أساور فاخرة</h3>
                <p className="text-gold-primary font-bold en-text uppercase tracking-widest text-sm drop-shadow-sm">Discover Collection</p>
              </div>
            </div>

            {/* Category 2 */}
            <div 
              onClick={() => onNavigate('collection')}
              className="relative h-[400px] md:h-[500px] rounded-[32px] overflow-hidden group cursor-pointer shadow-sm hover:shadow-xl hover:shadow-gold-primary/20 transition-all duration-700"
            >
              <img 
                src="https://images.unsplash.com/photo-1605100804763-247f67b2548e?auto=format&fit=crop&q=80&w=1200" 
                alt="Rings" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute inset-0 border-2 border-gold-primary/0 group-hover:border-gold-primary/30 rounded-[32px] transition-colors duration-500 z-10 m-4" />
              <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 text-center md:text-right z-20">
                <h3 className="text-3xl md:text-4xl text-white font-arabic mb-3">خواتم ملكية</h3>
                <p className="text-gold-primary font-bold en-text uppercase tracking-widest text-sm drop-shadow-sm">Discover Collection</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. FEATURED COLLECTION */}
      <section className="py-24 md:py-32 bg-natural-bg">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-16 gap-6">
            <div className="text-center md:text-right w-full" dir="rtl">
              <h2 className="text-3xl md:text-4xl text-gold-deep mb-4 font-arabic font-medium">الإصدارات الخاصة</h2>
              <p className="text-natural-secondary-text font-light text-lg">مجموعة منتقاة لأصحاب الذوق الرفيع</p>
            </div>
            <div className="luxury-pill-outer hidden md:block shrink-0">
              <button 
                onClick={() => onNavigate('collection')}
                className="luxury-pill-core-alt px-8 py-2.5 uppercase tracking-widest text-xs font-bold en-text group flex items-center gap-2"
              >
                View Collection
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map(product => (
              <div key={product.id} className="group cursor-pointer" onClick={() => handleProductClick(product)}>
                <div className="relative aspect-[4/5] rounded-[24px] overflow-hidden bg-white mb-6 shadow-sm group-hover:shadow-xl transition-all duration-700 border border-gold-primary/10 group-hover:border-gold-primary/40">
                  <img 
                    src={product.listingImage} 
                    alt={product.name} 
                    className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gold-primary/0 group-hover:bg-gold-primary/10 transition-colors duration-700" />
                </div>
                <div className="text-center">
                  <h3 className="text-xl text-natural-text font-arabic mb-2 group-hover:text-gold-deep transition-colors">{product.name}</h3>
                  <p className="text-gold-primary font-bold en-text tracking-widest text-sm">{product.price} EGP</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-16 text-center md:hidden">
            <div className="luxury-pill-outer inline-block">
              <button 
                onClick={() => onNavigate('collection')}
                className="luxury-pill-core-alt px-10 py-3.5 uppercase tracking-widest text-xs font-bold en-text shadow-sm"
              >
                View Collection
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 5. FINAL CTA SECTION */}
      <section className="py-32 bg-white relative overflow-hidden border-t border-gold-primary/10">
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl lg:text-6xl text-gold-deep mb-8 font-serif uppercase en-title tracking-widest">
            Timeless Elegance
          </h2>
          <p className="font-arabic text-xl text-natural-secondary-text mb-12 font-light leading-relaxed">
            استكشفي أحدث مجموعاتنا المصممة لتتألقي كل يوم
          </p>
          <div className="luxury-pill-outer hover:scale-105 transition-transform duration-300">
            <button 
              onClick={() => onNavigate('new-arrivals')}
              className="luxury-pill-core px-12 py-4 uppercase tracking-[0.2em] text-sm font-bold en-text shadow-lg hover:shadow-xl"
            >
              Shop New Arrivals
            </button>
          </div>
        </div>
      </section>
    </motion.div>
  );
}
