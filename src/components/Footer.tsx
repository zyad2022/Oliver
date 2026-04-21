import React from 'react';

export function Footer() {
  return (
    <footer className="bg-[#2D2D2D] text-white pt-16 pb-8 mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          <div className="col-span-1 md:col-span-2">
            <h1 className="text-3xl tracking-widest font-serif text-white uppercase en-title mb-6">Oliver</h1>
            <p className="max-w-sm mb-6 leading-relaxed">
              إشراقة يومية بلمسات من الأناقة التي لا تفقد بريقها. نحن نؤمن بأن التفاصيل الصغيرة هي ما تصنع الفرق في إطلالتك.
            </p>
          </div>

          <div>
            <h3 className="text-white text-lg mb-6">روابط سريعة</h3>
            <ul className="flex flex-col gap-4">
              <li><button className="hover:text-white transition-colors">عن أوليفر</button></li>
              <li><button className="hover:text-white transition-colors">التشكيلات</button></li>
              <li><button className="hover:text-white transition-colors">الأسئلة الشائعة</button></li>
              <li><button className="hover:text-white transition-colors">تواصل معنا</button></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white text-lg mb-6">خدمة العملاء</h3>
            <ul className="flex flex-col gap-4">
              <li><button className="hover:text-white transition-colors">سياسة الاسترجاع والاستبدال</button></li>
              <li><button className="hover:text-white transition-colors">الشحن والتوصيل</button></li>
              <li><button className="hover:text-white transition-colors">دليل المقاسات</button></li>
              <li><button className="hover:text-white transition-colors">العناية بالمجوهرات</button></li>
            </ul>
          </div>
          
        </div>

        <div className="border-t border-[#444] pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-[#AAA]">© 2024 Oliver. جميع الحقوق محفوظة.</p>
          <div className="flex gap-4">
            {/* Simple social placeholders */}
            <div className="w-10 h-10 rounded-full border border-[#555] flex items-center justify-center hover:bg-natural-accent transition-colors cursor-pointer en-text">En</div>
            <div className="w-10 h-10 rounded-full border border-[#555] flex items-center justify-center hover:bg-natural-accent transition-colors cursor-pointer en-text">In</div>
          </div>
        </div>
      </div>
    </footer>
  );
}
