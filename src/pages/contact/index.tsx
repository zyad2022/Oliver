import React from 'react';
import { motion } from 'motion/react';
import { Mail, Phone, X } from 'lucide-react';
import { PageTitle } from '../../components/PageTitle';
import { useAppState } from '../../state';;

export function Contact() {
  const { onNavigate } = useAppState();;

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
        
        <div className="grid grid-cols-1 md:grid-cols-3 items-center justify-center gap-8">
          {/* Email Block */}
          <a
            href="mailto:oliver.brand.market@gmail.com"
            onClick={(e) => {
              e.preventDefault();
              window.location.href = 'mailto:oliver.brand.market@gmail.com';
            }}
            className="flex flex-col items-center gap-4 p-8 rounded-2xl bg-gold-primary/5 hover:bg-gold-primary/10 border border-transparent hover:border-gold-primary/30 transition-all cursor-pointer w-full group"
          >
            <div className="w-16 h-16 rounded-full bg-white text-gold-primary shadow-sm flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
              <Mail size={32} />
            </div>
            <h3 className="text-xl font-arabic text-natural-text">البريد الإلكتروني</h3>
            <p className="en-text text-natural-text/80 tracking-wide w-full break-all text-sm sm:text-base px-2">
              oliver.brand.market@gmail.com
            </p>
          </a>

          {/* Phone Block */}
          <a
            href="tel:01550240629"
            className="flex flex-col items-center gap-4 p-8 rounded-2xl bg-gold-primary/5 hover:bg-gold-primary/10 border border-transparent hover:border-gold-primary/30 transition-all cursor-pointer w-full group"
          >
            <div className="w-16 h-16 rounded-full bg-white text-gold-primary shadow-sm flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
              <Phone size={32} />
            </div>
            <h3 className="text-xl font-arabic text-natural-text">رقم الهاتف</h3>
            <p className="en-text text-natural-text/80 tracking-wide text-lg" dir="ltr">
              01550 240 629
            </p>
          </a>

          {/* WhatsApp Block */}
          <a
            href="https://wa.me/201550240629"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center gap-4 p-8 rounded-2xl bg-gold-primary/5 hover:bg-gold-primary/10 border border-transparent hover:border-gold-primary/30 transition-all cursor-pointer w-full group"
          >
            <div className="w-16 h-16 rounded-full bg-white text-[#25D366] shadow-sm flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
              {/* Using a simple phone icon or custom whatsapp icon if lucide doesn't have it. Lucide doesn't have whatsapp. Let's use a standard message-circle icon with whatsapp colors. */}
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
            </div>
            <h3 className="text-xl font-arabic text-natural-text">واتساب</h3>
            <p className="en-text text-natural-text/80 tracking-wide text-lg" dir="ltr">
              01550 240 629
            </p>
          </a>
        </div>
      </div>
    </motion.div>
  );
}
