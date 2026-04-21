import React from 'react';
import { useAppContext } from '../../state';

export function Footer() {
  const { onNavigate } = useAppContext();
  return (
    <footer className="bg-natural-beige text-natural-text pt-16 pb-8 mt-24 border-t border-natural-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          <div className="col-span-1 md:col-span-2">
            <h1 className="text-3xl tracking-widest font-serif text-natural-text uppercase en-title mb-6">Oliver</h1>
            <p className="max-w-sm mb-6 leading-relaxed text-natural-secondary-text">
              إشراقة يومية بلمسات من الأناقة التي لا تفقد بريقها. نحن نؤمن بأن التفاصيل الصغيرة هي ما تصنع الفرق في إطلالتك.
            </p>
          </div>

          <div>
            <h3 className="text-natural-text text-lg mb-6">روابط سريعة</h3>
            <ul className="flex flex-col gap-4 text-natural-secondary-text">
              <li><button className="hover:text-natural-accent transition-colors">عن أوليفر</button></li>
              <li><button className="hover:text-natural-accent transition-colors">التشكيلات</button></li>
              <li><button className="hover:text-natural-accent transition-colors">الأسئلة الشائعة</button></li>
              <li><button className="hover:text-natural-accent transition-colors">تواصل معنا</button></li>
            </ul>
          </div>

          <div>
            <h3 className="text-natural-text text-lg mb-6">خدمة العملاء</h3>
            <ul className="flex flex-col gap-4 text-natural-secondary-text">
              <li><button className="hover:text-natural-accent transition-colors">سياسة الاسترجاع والاستبدال</button></li>
              <li><button className="hover:text-natural-accent transition-colors">الشحن والتوصيل</button></li>
              <li><button className="hover:text-natural-accent transition-colors">دليل المقاسات</button></li>
              <li><button className="hover:text-natural-accent transition-colors">العناية بالمجوهرات</button></li>
            </ul>
          </div>
          
        </div>

          <div className="border-t border-natural-border pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-natural-secondary-text">© 2024 Oliver. جميع الحقوق محفوظة.</p>
          <div className="flex gap-6 text-sm text-natural-secondary-text">
            <button 
              onClick={() => onNavigate?.('privacy-policy')}
              className="hover:text-natural-accent transition-colors"
            >
              Privacy Policy
            </button>
            <button 
              onClick={() => onNavigate?.('terms-of-service')}
              className="hover:text-natural-accent transition-colors"
            >
              Terms of Service
            </button>
          </div>
          <div className="flex gap-4">
            {/* Simple social placeholders */}
            <div className="w-10 h-10 rounded-full border border-natural-border flex items-center justify-center hover:bg-natural-accent hover:border-natural-accent hover:text-white transition-colors cursor-pointer en-text text-natural-secondary-text">En</div>
            <div className="w-10 h-10 rounded-full border border-natural-border flex items-center justify-center hover:bg-natural-accent hover:border-natural-accent hover:text-white transition-colors cursor-pointer en-text text-natural-secondary-text">In</div>
          </div>
        </div>
      </div>
    </footer>
  );
}
