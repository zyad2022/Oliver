import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Phone, X, Send, CheckCircle2 } from 'lucide-react';
import { PageTitle } from '../../components/PageTitle';
import { useAppState } from '../../state';
import { Button } from '../../components/Button';
import { db } from '../../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export function Contact() {
  const { onNavigate } = useAppState();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await addDoc(collection(db, 'contact_messages'), {
        name,
        email,
        message,
        createdAt: serverTimestamp()
      });
      setSubmitted(true);
    } catch (error) {
      console.error("Error sending message:", error);
      alert('عذراً، حدث خطأ أثناء إرسال رسالتك. يرجى المحاولة مرة أخرى.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 relative"
    >
      <button 
        onClick={() => onNavigate('back')}
        className="absolute top-4 left-4 sm:top-8 sm:left-8 p-2 rounded-full bg-natural-bg border border-natural-border text-natural-text hover:bg-natural-accent hover:text-white transition-colors z-20"
      >
        <X size={24} />
      </button>

      <PageTitle 
        title="تواصل معنا"
        description="نحن هنا دائمًا للاستماع إليك وتلبية احتياجاتك"
        badgeText="الدعم الفني"
      />

      <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Contact info side */}
        <div className="space-y-8 h-full flex flex-col">
          <div className="bg-white border border-gold-primary/20 rounded-3xl p-8 shadow-sm h-full">
            <h2 className="text-2xl font-arabic text-natural-text mb-8 text-right">معلومات التواصل</h2>
            
            <div className="space-y-6">
              <a
                href="mailto:oliver.brand.market@gmail.com"
                className="flex flex-row-reverse items-center gap-4 p-4 rounded-xl hover:bg-gold-primary/5 transition-colors group text-right"
              >
                <div className="w-12 h-12 rounded-full bg-gold-primary/10 text-gold-primary flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  <Mail size={24} />
                </div>
                <div>
                  <h3 className="font-arabic text-natural-text font-medium">البريد الإلكتروني</h3>
                  <p className="en-text text-sm text-natural-secondary-text">oliver.brand.market@gmail.com</p>
                </div>
              </a>

              <a
                href="tel:01550240629"
                className="flex flex-row-reverse items-center gap-4 p-4 rounded-xl hover:bg-gold-primary/5 transition-colors group text-right"
              >
                <div className="w-12 h-12 rounded-full bg-gold-primary/10 text-gold-primary flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  <Phone size={24} />
                </div>
                <div>
                  <h3 className="font-arabic text-natural-text font-medium">رقم الهاتف</h3>
                  <p className="en-text text-sm text-natural-secondary-text" dir="ltr">01550 240 629</p>
                </div>
              </a>

              <a
                href="https://wa.me/201550240629"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-row-reverse items-center gap-4 p-4 rounded-xl hover:bg-gold-primary/5 transition-colors group text-right"
              >
                <div className="w-12 h-12 rounded-full bg-gold-primary/10 text-[#25D366] flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                </div>
                <div>
                  <h3 className="font-arabic text-natural-text font-medium">واتساب</h3>
                  <p className="en-text text-sm text-natural-secondary-text" dir="ltr">01550 240 629</p>
                </div>
              </a>
            </div>
          </div>
        </div>

        {/* Form side */}
        <div className="bg-white border border-gold-primary/20 rounded-3xl p-8 md:p-10 shadow-sm relative z-10">
          {submitted ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="h-full flex flex-col items-center justify-center text-center py-10"
            >
              <div className="w-20 h-20 bg-gold-primary/10 rounded-full flex items-center justify-center mb-6">
                <CheckCircle2 size={40} className="text-gold-primary" />
              </div>
              <h3 className="text-2xl font-arabic text-natural-text mb-4">تم الإرسال بنجاح!</h3>
              <p className="text-natural-secondary-text font-arabic mb-8">
                شكراً لتواصلك معنا. سنقوم بالرد عليك في أقرب وقت ممكن.
              </p>
              <Button onClick={() => setSubmitted(false)} variant="outline">إرسال رسالة أخرى</Button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6 pointer-events-auto">
              <div>
                <label htmlFor="name" className="block text-right mb-2 font-arabic text-natural-text text-sm">الاسم بالكامل</label>
                <input
                  id="name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-gold-primary/5 border border-gold-primary/20 rounded-xl px-4 py-3 outline-none focus:border-gold-primary focus:bg-white transition-all font-arabic text-right text-natural-text"
                  placeholder="ادخلي اسمك هنا"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-right mb-2 font-arabic text-natural-text text-sm">البريد الإلكتروني</label>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-gold-primary/5 border border-gold-primary/20 rounded-xl px-4 py-3 outline-none focus:border-gold-primary focus:bg-white transition-all en-text text-right text-natural-text"
                  placeholder="name@example.com"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-right mb-2 font-arabic text-natural-text text-sm">رسالتك</label>
                <textarea
                  id="message"
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full bg-gold-primary/5 border border-gold-primary/20 rounded-xl px-4 py-3 outline-none focus:border-gold-primary focus:bg-white transition-all font-arabic text-right text-natural-text min-h-[150px] resize-none"
                  placeholder="كيف يمكننا مساعدتك؟"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gold-primary text-white py-4 rounded-xl font-arabic font-bold text-lg hover:bg-gold-dark transition-all transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-gold-primary/20 flex items-center justify-center gap-3"
              >
                {isSubmitting ? 'جاري الإرسال...' : (
                  <>
                    <Send size={20} />
                    إرسال الرسالة
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </motion.div>
  );
}

