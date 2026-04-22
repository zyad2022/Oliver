
import React from 'react';
import { motion } from 'motion/react';
import { X } from 'lucide-react';
import { PageTitle } from '../../components/PageTitle';
import { useAppContext } from '../../state';

export function About() {
  const { onNavigate } = useAppContext();
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 relative"
    >
      <button 
        onClick={() => onNavigate('back')}
        className="absolute top-4 left-4 sm:top-8 sm:left-8 p-2 rounded-full bg-natural-bg border border-natural-border text-natural-text hover:bg-natural-accent hover:text-white transition-colors z-10"
      >
        <X size={24} />
      </button>

      <PageTitle 
        title="عن أوليفر"
        description="قصة شغف بالجمال والأناقة بدأت لتعيد تعريف مفهوم الرقي في عالم المجوهرات."
        badgeText="قصتنا"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mt-20">
        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-arabic text-natural-text mb-4 border-r-4 border-gold-primary pr-4">رؤيتنا</h2>
            <p className="text-[#333] font-arabic leading-relaxed text-lg">
              نطمح في أوليفر لأن نكون الوجهة الأولى لكل امرأة تبحث عن التميز والفرادة. نحن نؤمن بأن كل امرأة تستحق أن تقتني قطعاً تعكس روحها وتبرز جمالها الكامن، من خلال تصاميم تجمع بين العصرية والكلاسيكية الخالدة.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-arabic text-natural-text mb-4 border-r-4 border-gold-primary pr-4">رسالتنا</h2>
            <p className="text-[#333] font-arabic leading-relaxed text-lg">
              تتمثل رسالتنا في تقديم مجوهرات عالية الجودة بلمسات فنية دقيقة. نحن نختار أجود المواد ونعمل مع أمهر الحرفيين لضمان أن كل قطعة تخرج من "أوليفر" هي تحفة فنية تدوم طويلاً وترافقك في أجمل لحظات حياتك.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-arabic text-natural-text mb-4 border-r-4 border-gold-primary pr-4">اهتمامنا بالجودة</h2>
            <p className="text-[#333] font-arabic leading-relaxed text-lg">
              الجودة ليست مجرد كلمة لدينا، بل هي جوهر عملنا. من اختيار المعادن الثمينة إلى دقة التفاصيل النهائية، نحرص في كل خطوة على الالتزام بأعلى معايير الحرفية والجمال.
            </p>
          </section>
        </div>

        <div className="relative group">
          <div className="absolute -inset-4 bg-gradient-to-tr from-gold-primary/20 to-gold-primary/10 rounded-2xl blur-xl opacity-50 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="relative overflow-hidden rounded-2xl border border-gold-primary/20">
            <img 
              src="https://images.unsplash.com/photo-1573408301185-9146fe634ad0?q=80&w=1000&auto=format&fit=crop" 
              alt="Oliver Brand" 
              className="w-full h-[500px] object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-8">
              <p className="text-white text-xl font-serif tracking-widest uppercase en-title">Crafting Excellence Since 2024</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-24 p-12 rounded-3xl bg-gradient-to-r from-gold-primary/5 via-gold-primary/10 to-gold-primary/5 border border-gold-primary/20 text-center">
        <h2 className="text-3xl font-arabic text-natural-text mb-6">انضمي إلى عالم أوليفر</h2>
        <p className="max-w-2xl mx-auto text-lg text-[#333] font-arabic mb-0">
          اكتشفي التشكيلات الحصرية وكوني أول من يعرف عن أحدث التصاميم والعروض الخاصة التي تلبي ذوقك الرفيع.
        </p>
      </div>
    </motion.div>
  );
}
