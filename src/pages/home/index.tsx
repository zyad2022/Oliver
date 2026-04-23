import React from 'react';
import { motion } from 'motion/react';
import { products, Product } from '../../data';
import { useAppContext } from '../../state';
import { ArrowRight } from 'lucide-react';

export function Home() {
  const { onNavigate, setSelectedProduct } = useAppContext();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col w-full relative z-10"
    >
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[85vh] w-full flex flex-col items-center justify-center">
        
        {/* Soft luxury radial glow */}
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
              <div className="absolute inset-0 bg-gold-primary/5 blur-[80px] rounded-full scale-150" />
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
              className="luxury-pill-outer hover:scale-105 transition-transform duration-500 bg-white/30 backdrop-blur-md"
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
      <section className="py-24 md:py-32 relative">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gold-primary/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gold-primary/10 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/3 pointer-events-none" />
        
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative inline-flex items-center justify-center mb-10 px-10 py-5 rounded-full bg-gradient-to-r from-[#D4AF37]/5 via-[#D4AF37]/15 to-[#D4AF37]/5 backdrop-blur-md border border-[#D4AF37]/30 shadow-[0_4px_30px_rgba(212,175,55,0.1)] overflow-hidden group"
          >
            {/* Soft inner shine/reflection */}
            <div className="absolute inset-0 bg-gradient-to-t from-white/0 via-white/20 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-full" />
            
            {/* Subtle glow behind text */}
            <div className="absolute inset-0 bg-white/20 blur-md pointer-events-none mix-blend-overlay rounded-full" />
            
            <h2 className="relative z-10 text-4xl md:text-5xl text-gold-deep font-arabic font-medium leading-relaxed tracking-snug drop-shadow-sm m-0">
              الجمال في أبسط تفاصيله
            </h2>
          </motion.div>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, delay: 0.4 }}
            className="font-arabic text-lg md:text-2xl text-stone-700 leading-[2.2] font-light max-w-2xl mx-auto"
          >
            في أوليفر نؤمن بأن القطع الفاخرة ليست مجرد زينة بل هي انعكاس لشخصيتك وقصتك نصمم مجوهراتنا بحب لتكون رفيقة يومك تجمع بين الرقي الملكي وبساطة العصر الحديث لتتألقي في كل لحظة
          </motion.p>
        </div>
      </section>

      {/* 3. CATEGORY SHOWCASE */}
      <section className="py-12">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {/* Category 1 */}
            <div 
              onClick={() => onNavigate('collection')}
              className="relative h-[400px] md:h-[500px] rounded-[32px] overflow-hidden group cursor-pointer shadow-sm hover:shadow-xl hover:shadow-gold-primary/20 transition-all duration-700"
            >
              <img 
                src="https://i.ibb.co/mC7L8Vry/image-1-1776948130991.png" 
                alt="Bracelets" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute inset-0 border-2 border-gold-primary/0 group-hover:border-gold-primary/30 rounded-[32px] transition-colors duration-500 z-10 m-4" />
              <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 text-center md:text-right z-20">
                <h3 className="text-3xl md:text-4xl text-white font-arabic mb-3">سلاسل زمرد فاخرة</h3>
                <p className="text-gold-primary font-bold en-text uppercase tracking-widest text-sm drop-shadow-sm">Discover Collection</p>
              </div>
            </div>

            {/* Category 2 */}
            <div 
              onClick={() => onNavigate('collection')}
              className="relative h-[400px] md:h-[500px] rounded-[32px] overflow-hidden group cursor-pointer shadow-sm hover:shadow-xl hover:shadow-gold-primary/20 transition-all duration-700"
            >
              <img 
                src="https://i.ibb.co/k2CGPXj1/image-1-1776948610151.png" 
                alt="Rings" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute inset-0 border-2 border-gold-primary/0 group-hover:border-gold-primary/30 rounded-[32px] transition-colors duration-500 z-10 m-4" />
              <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 text-center md:text-right z-20">
                <h3 className="text-3xl md:text-4xl text-white font-arabic mb-3">خواتم زمرد راقية</h3>
                <p className="text-gold-primary font-bold en-text uppercase tracking-widest text-sm drop-shadow-sm">Discover Collection</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. FEATURED COLLECTION */}
      <section className="py-24 md:py-32">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-16 gap-6">
            <div className="text-center md:text-right w-full flex flex-col items-center md:items-start" dir="rtl">
              <div className="relative inline-flex items-center justify-center mb-6 px-8 py-4 rounded-full bg-gradient-to-r from-[#D4AF37]/5 via-[#D4AF37]/15 to-[#D4AF37]/5 backdrop-blur-md border border-[#D4AF37]/30 shadow-[0_4px_30px_rgba(212,175,55,0.1)] overflow-hidden group">
                {/* Soft inner shine/reflection */}
                <div className="absolute inset-0 bg-gradient-to-t from-white/0 via-white/20 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-full" />
                
                {/* Subtle glow behind text */}
                <div className="absolute inset-0 bg-white/20 blur-md pointer-events-none mix-blend-overlay rounded-full" />
                
                <h2 className="relative z-10 text-3xl md:text-4xl text-gold-deep font-arabic font-medium m-0 tracking-snug drop-shadow-sm">
                  الإصدارات الخاصة
                </h2>
              </div>
              <p className="text-natural-secondary-text font-light text-xl">مجموعة منتقاة لأصحاب الذوق الرفيع</p>
            </div>
            <div className="hidden md:block shrink-0">
              <button 
                onClick={() => onNavigate('collection')}
                className="bg-white/50 border border-[#D4AF37]/30 shadow-sm backdrop-blur-md px-8 py-3.5 rounded-full text-stone-700 hover:text-stone-900 hover:bg-[#D4AF37]/15 hover:border-[#D4AF37]/60 hover:shadow-[inset_0_0_20px_rgba(212,175,55,0.15),0_4px_15px_rgba(212,175,55,0.1)] transition-all duration-500 ease-in-out uppercase tracking-widest text-xs font-bold en-text flex items-center gap-2 group"
              >
                View Collection
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Product 1 */}
            <div 
              className="group cursor-pointer bg-white/20 backdrop-blur-md border border-[#D4AF37]/20 hover:border-[#D4AF37]/60 hover:shadow-[0_8px_30px_rgba(212,175,55,0.15)] rounded-[32px] p-4 transition-all duration-500 flex flex-col"
              onClick={() => onNavigate('collection')}
            >
              <div className="relative aspect-[4/5] rounded-[24px] overflow-hidden mb-5">
                <img 
                  src="https://i.ibb.co/fVcWYJH9/details-H-1.png" 
                  alt="Symbol Of Love & Elegance" 
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gold-primary/0 group-hover:bg-gold-primary/10 transition-colors duration-700 pointer-events-none" />
              </div>
              <div className="flex flex-col items-center text-center pb-2">
                <h3 className="en-title text-base text-natural-text mb-1 group-hover:text-gold-deep transition-colors">Symbol Of Love & Elegance</h3>
                <div className="flex items-center gap-3">
                  <span className="en-text text-natural-accent font-bold">80 EGP</span>
                </div>
              </div>
            </div>

            {/* Product 2 */}
            <div 
              className="group cursor-pointer bg-white/20 backdrop-blur-md border border-[#D4AF37]/20 hover:border-[#D4AF37]/60 hover:shadow-[0_8px_30px_rgba(212,175,55,0.15)] rounded-[32px] p-4 transition-all duration-500 flex flex-col"
              onClick={() => onNavigate('collection')}
            >
              <div className="relative aspect-[4/5] rounded-[24px] overflow-hidden mb-5">
                <img 
                  src="https://i.ibb.co/v6Xy7CcQ/672588038-2001103607154376-2871997865707591592-n-1.png" 
                  alt="Like a Swan" 
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gold-primary/0 group-hover:bg-gold-primary/10 transition-colors duration-700 pointer-events-none" />
              </div>
              <div className="flex flex-col items-center text-center pb-2">
                <h3 className="en-title text-base text-natural-text mb-1 group-hover:text-gold-deep transition-colors">Like a Swan</h3>
                <div className="flex items-center gap-3">
                  <span className="en-text text-natural-accent font-bold">120 EGP</span>
                  <span className="en-text text-natural-secondary-text line-through text-sm">170 EGP</span>
                </div>
              </div>
            </div>

            {/* Product 3 */}
            <div 
              className="group cursor-pointer bg-white/20 backdrop-blur-md border border-[#D4AF37]/20 hover:border-[#D4AF37]/60 hover:shadow-[0_8px_30px_rgba(212,175,55,0.15)] rounded-[32px] p-4 transition-all duration-500 flex flex-col"
              onClick={() => onNavigate('collection')}
            >
              <div className="relative aspect-[4/5] rounded-[24px] overflow-hidden mb-5">
                <img 
                  src="https://i.ibb.co/fYgT1YYn/details-H-1.png" 
                  alt="Green Stone Jewel" 
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gold-primary/0 group-hover:bg-gold-primary/10 transition-colors duration-700 pointer-events-none" />
              </div>
              <div className="flex flex-col items-center text-center pb-2">
                <h3 className="en-title text-base text-natural-text mb-1 group-hover:text-gold-deep transition-colors">Green Stone Jewel</h3>
                <div className="flex items-center gap-3">
                  <span className="en-text text-natural-accent font-bold">100 EGP</span>
                </div>
              </div>
            </div>

            {/* Product 4 */}
            <div 
              className="group cursor-pointer bg-white/20 backdrop-blur-md border border-[#D4AF37]/20 hover:border-[#D4AF37]/60 hover:shadow-[0_8px_30px_rgba(212,175,55,0.15)] rounded-[32px] p-4 transition-all duration-500 flex flex-col"
              onClick={() => onNavigate('collection')}
            >
              <div className="relative aspect-[4/5] rounded-[24px] overflow-hidden mb-5">
                <img 
                  src="https://i.ibb.co/7Hc2rnq/673417208-1618558772732546-2444480640670586524-n-1.png" 
                  alt="New Swan (Gold plated)" 
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gold-primary/0 group-hover:bg-gold-primary/10 transition-colors duration-700 pointer-events-none" />
              </div>
              <div className="flex flex-col items-center text-center pb-2">
                <h3 className="en-title text-base text-natural-text mb-1 group-hover:text-gold-deep transition-colors">New Swan (Gold plated)</h3>
                <div className="flex items-center gap-3">
                  <span className="en-text text-natural-accent font-bold">120 EGP</span>
                  <span className="en-text text-natural-secondary-text line-through text-sm">200 EGP</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-16 text-center md:hidden">
            <button 
              onClick={() => onNavigate('collection')}
              className="bg-white/50 border border-[#D4AF37]/30 shadow-sm backdrop-blur-md px-10 py-4 rounded-full text-stone-700 hover:text-stone-900 hover:bg-[#D4AF37]/15 hover:border-[#D4AF37]/60 hover:shadow-[inset_0_0_20px_rgba(212,175,55,0.15),0_4px_15px_rgba(212,175,55,0.1)] transition-all duration-500 ease-in-out uppercase tracking-widest text-xs font-bold en-text"
            >
              View Collection
            </button>
          </div>
        </div>
      </section>

      {/* 5. FINAL CTA SECTION */}
      <section className="py-32 relative z-10">
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl lg:text-6xl text-gold-deep mb-8 font-serif uppercase en-title tracking-widest drop-shadow-sm">
            Timeless Elegance
          </h2>
          <p className="font-arabic text-xl text-natural-secondary-text mb-12 font-light leading-relaxed">
            استكشفي أحدث مجموعاتنا المصممة لتتألقي كل يوم
          </p>
          <div className="luxury-pill-outer hover:scale-105 transition-transform duration-300 bg-white/40 backdrop-blur-md">
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
