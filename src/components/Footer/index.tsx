import React, { useState } from 'react';
import { useAppState } from '../../state';;
import { Star, Send } from 'lucide-react';
import { db } from '../../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export function Footer() {
  const { onNavigate } = useAppState();;
  const [rating, setRating] = useState(0);
  const [name, setName] = useState('');
  const [comment, setComment] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0 || !name.trim() || !comment.trim()) return;

    setStatus('submitting');
    try {
      await addDoc(collection(db, 'reviews'), {
        name: name.trim(),
        comment: comment.trim(),
        rating,
        createdAt: serverTimestamp()
      });
      setStatus('success');
      setName('');
      setComment('');
      setRating(0);
      setTimeout(() => setStatus('idle'), 5000);
    } catch (error) {
      console.error("Error saving review:", error);
      setStatus('error');
    }
  };

  return (
    <footer className="bg-gradient-to-r from-gold-primary/15 to-gold-primary/35 text-natural-text pt-16 pb-8 mt-24 border-t border-gold-primary/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          <div className="col-span-1 md:col-span-2">
            <h1 className="text-3xl tracking-widest font-serif text-natural-text uppercase en-title mb-6">Oliver</h1>
            <p className="max-w-sm mb-8 leading-relaxed text-natural-text/80">
              إشراقة يومية بلمسات من الأناقة التي لا تفقد بريقها. نحن نؤمن بأن التفاصيل الصغيرة هي ما تصنع الفرق في إطلالتك.
            </p>

            {/* In-footer Review Form */}
            <div className="bg-white/40 backdrop-blur-md p-6 rounded-2xl border border-[#D4AF37]/20 max-w-md shadow-sm">
              <h4 className="font-arabic text-gold-deep font-bold mb-4">شاركينا رأيك (قيم الصفحة)</h4>
              {status === 'success' ? (
                <div className="text-green-600 font-arabic text-sm py-4">تم إرسال تقييمك بنجاح! شكراً لكِ.</div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3">
                  <div className="flex gap-1 mb-2">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <button 
                        key={s} 
                        type="button" 
                        onClick={() => setRating(s)}
                        className="transition-transform hover:scale-110"
                      >
                        <Star size={20} className={s <= rating ? 'fill-gold-primary text-gold-primary' : 'text-white/80'} />
                      </button>
                    ))}
                  </div>
                  <input 
                    type="text" 
                    placeholder="الاسم" 
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-white/60 border border-[#D4AF37]/20 rounded-lg px-3 py-2 text-sm outline-none focus:border-gold-primary font-arabic text-right"
                  />
                  <textarea 
                    placeholder="تعليقك" 
                    required
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="w-full bg-white/60 border border-[#D4AF37]/20 rounded-lg px-3 py-2 text-sm outline-none focus:border-gold-primary font-arabic text-right h-20 resize-none"
                  />
                  <button 
                    type="submit"
                    disabled={status === 'submitting'}
                    className="w-full bg-gold-primary text-white py-2 rounded-lg text-sm font-bold hover:bg-gold-deep transition-colors flex items-center justify-center gap-2"
                  >
                    {status === 'submitting' ? 'جاري الإرسال...' : (
                      <>
                        <Send size={14} />
                        إرسال
                      </>
                    )}
                  </button>
                  {status === 'error' && <p className="text-red-500 text-xs font-arabic">عذراً، حدث خطأ.</p>}
                </form>
              )}
            </div>
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
