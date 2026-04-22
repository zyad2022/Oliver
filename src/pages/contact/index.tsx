import React from 'react';
import { motion } from 'motion/react';
import { Mail, Phone, X } from 'lucide-react';
import { PageTitle } from '../../components/PageTitle';
import { useAppContext } from '../../state';

export function Contact() {
  const { onNavigate } = useAppContext();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 relative"
    >
      <button 
        onClick={() => onNavigate('back')}
        className="absolute top-4 left-4 sm:top-8 sm:left-8 p-2 rounded-full bg-natural-bg border border-natural-border text-natural-text hover:bg-natural-accent hover:text-white transition-colors z-10"
      >
        <X size={24} />
      </button>

      <PageTitle 
        title="تواصل معنا"
        description="نحن هنا دائمًا للاستماع إليك وتلبية احتياجاتك"
        badgeText="الدعم الفني"
      />

      <div className="mt-16 bg-white border border-gold-primary/20 rounded-3xl p-8 md:p-16 shadow-sm text-center">
        <h2 className="text-2xl font-arabic text-natural-text mb-12">كيف يمكننا مساعدتك؟</h2>
        
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16">
          {/* Email Block */}
          <a
            href="mailto:oliver.brand.market@gmail.com"
            className="flex flex-col items-center gap-4 p-8 rounded-2xl bg-gold-primary/5 hover:bg-gold-primary/10 border border-transparent hover:border-gold-primary/30 transition-all cursor-pointer w-full md:w-1/2 group"
          >
            <div className="w-16 h-16 rounded-full bg-white text-gold-primary shadow-sm flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
              <Mail size={32} />
            </div>
            <h3 className="text-xl font-arabic text-natural-text">البريد الإلكتروني</h3>
            <p className="en-text text-natural-text/80 tracking-wide">
              oliver.brand.market@gmail.com
            </p>
          </a>

          {/* Phone Block */}
          <a
            href="tel:01550240629"
            className="flex flex-col items-center gap-4 p-8 rounded-2xl bg-gold-primary/5 hover:bg-gold-primary/10 border border-transparent hover:border-gold-primary/30 transition-all cursor-pointer w-full md:w-1/2 group"
          >
            <div className="w-16 h-16 rounded-full bg-white text-gold-primary shadow-sm flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
              <Phone size={32} />
            </div>
            <h3 className="text-xl font-arabic text-natural-text">رقم الهاتف</h3>
            <p className="en-text text-natural-text/80 tracking-wide text-lg" dir="ltr">
              01550 240 629
            </p>
          </a>
        </div>
      </div>
    </motion.div>
  );
}
