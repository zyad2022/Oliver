import React from 'react';
import { useAppContext } from '../../state';

export function Footer() {
  const { onNavigate } = useAppContext();
  return (
    <footer className="bg-gradient-to-r from-gold-primary/15 to-gold-primary/35 text-natural-text pt-16 pb-8 mt-24 border-t border-gold-primary/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          <div className="col-span-1 md:col-span-2">
            <h1 className="text-3xl tracking-widest font-serif text-natural-text uppercase en-title mb-6">Oliver</h1>
            <p className="max-w-sm mb-6 leading-relaxed text-natural-text/80">
              إشراقة يومية بلمسات من الأناقة التي لا تفقد بريقها. نحن نؤمن بأن التفاصيل الصغيرة هي ما تصنع الفرق في إطلالتك.
            </p>
          </div>

          <div className="flex flex-col items-start w-full text-right" style={{ direction: 'rtl' }}>
            <div className="mb-6 inline-flex">
              <div className="luxury-pill-outer">
                <div className="luxury-pill-core px-5 py-1.5">
                  <h3 className="text-white text-base font-arabic m-0 leading-none">روابط سريعة</h3>
                </div>
              </div>
            </div>
            <ul className="flex flex-col gap-4 text-gold-deep/90 w-full">
              <li><button onClick={() => onNavigate?.('about')} className="hover:text-natural-text transition-colors text-right w-full">عن أوليفر</button></li>
              <li><button onClick={() => onNavigate?.('rate')} className="hover:text-natural-text transition-colors text-right w-full">قيم الصفحة</button></li>
              <li><button onClick={() => onNavigate?.('faq')} className="hover:text-natural-text transition-colors text-right w-full">الأسئلة الشائعة</button></li>
              <li><button onClick={() => onNavigate?.('contact')} className="hover:text-natural-text transition-colors text-right w-full">تواصل معنا</button></li>
            </ul>
          </div>

          <div className="flex flex-col items-start w-full text-right" style={{ direction: 'rtl' }}>
            <div className="mb-6 inline-flex">
              <div className="luxury-pill-outer">
                <div className="luxury-pill-core px-5 py-1.5">
                  <h3 className="text-white text-base font-arabic m-0 leading-none">خدمة العملاء</h3>
                </div>
              </div>
            </div>
            <ul className="flex flex-col gap-4 text-gold-deep/90 w-full">
              <li><button onClick={() => onNavigate?.('returns')} className="hover:text-natural-text transition-colors text-right w-full">سياسة الاسترجاع والاستبدال</button></li>
              <li><button onClick={() => onNavigate?.('shipping')} className="hover:text-natural-text transition-colors text-right w-full">الشحن والتوصيل</button></li>
              <li><button onClick={() => onNavigate?.('size-guide')} className="hover:text-natural-text transition-colors text-right w-full">دليل المقاسات</button></li>
              <li><button onClick={() => onNavigate?.('jewelry-care')} className="hover:text-natural-text transition-colors text-right w-full">العناية بالمجوهرات</button></li>
            </ul>
          </div>
          
        </div>

        <div className="border-t border-gold-primary/20 pt-8 flex flex-wrap justify-center items-center gap-3 sm:gap-4 text-sm text-gold-deep/90">
          <button 
            onClick={() => onNavigate?.('privacy-policy')}
            className="hover:text-gold-primary transition-colors"
          >
            Privacy Policy
          </button>
          
          <span className="w-px h-4 bg-black/40"></span>
          
          <button 
            onClick={() => onNavigate?.('terms-of-service')}
            className="hover:text-gold-primary transition-colors"
          >
            Terms of Service
          </button>
          
          <span className="w-px h-4 bg-black/40"></span>
          
          <span className="font-medium">جميع الحقوق محفوظة © 2024 Oliver</span>
        </div>
      </div>
    </footer>
  );
}
