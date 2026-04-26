import React from 'react';
import { motion } from 'motion/react';
import { X, Droplets, Archive, Sparkles } from 'lucide-react';
import { PageTitle } from '../../components/PageTitle';
import { useAppState } from '../../state';;

export function JewelryCare() {
  const { onNavigate } = useAppState();;

  const sections = [
    {
      title: "تجنب التعرض للمواد الكيميائية",
      icon: <Droplets size={24} />,
      points: [
        "تجنبي رش العطور المباشر، اللوشن، أو أي مستحضرات تجميل على المجوهرات.",
        "انزعي المجوهرات دائماً قبل الاستحمام، السباحة، أو استخدام مواد التنظيف المنزلية.",
        "عدم الاستخدام أثناء ممارسة الرياضة لتجنب تعرضها للعرق أو الصدمات."
      ]
    },
    {
      title: "التخزين السليم",
      icon: <Archive size={24} />,
      points: [
        "احفظي كل قطعة مجوهرات على حدة في العلبة الأصلية المغلقة أو في أكياس قماشية ناعمة لتجنب الاحتكاك والخدوش.",
        "يفضل تخزين المجوهرات في مكان جاف بعيداً عن الرطوبة وأشعة الشمس المباشرة."
      ]
    },
    {
      title: "التنظيف اليومي",
      icon: <Sparkles size={24} />,
      points: [
        "بعد كل استخدام، امسحي مجوهراتك برفق باستخدام قطعة قماش ناعمة أو مايكروفايبر لإزالة الزيوت والأتربة.",
        "لتنظيف أعمق، استخدمي صابوناً خفيفاً وماء دافئاً مع فرشاة ناعمة فقط، وجففيها تماماً قبل التخزين."
      ]
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 relative"
    >
      <button 
        onClick={() => onNavigate('back')}
        className="absolute top-4 left-4 sm:top-8 sm:left-8 p-2 rounded-full bg-natural-bg border border-natural-border text-natural-text hover:bg-natural-accent hover:text-white transition-colors z-10 shadow-sm"
      >
        <X size={24} />
      </button>

      <PageTitle 
        title="العناية بالمجوهرات"
        description="نصائح هامة للحفاظ على بريق ولمعان قطعك المفضلة لسنوات طويلة"
        badgeText="خدمة العملاء"
      />

      <div className="mt-16 space-y-8">
        {sections.map((section, index) => (
          <div key={index} className="bg-white border border-gold-primary/20 rounded-3xl p-8 shadow-sm hover:border-gold-primary/40 transition-colors">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-full bg-gold-primary/10 flex items-center justify-center text-gold-deep">
                {section.icon}
              </div>
              <h2 className="text-2xl font-arabic text-natural-text">{section.title}</h2>
            </div>
            <ul className="space-y-4">
              {section.points.map((point, i) => (
                <li key={i} className="flex items-start gap-3 text-natural-text/80 text-lg font-arabic leading-relaxed">
                  <span className="w-2 h-2 rounded-full bg-gold-primary/50 mt-2.5 shrink-0 block" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
