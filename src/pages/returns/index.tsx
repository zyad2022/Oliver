import React from 'react';
import { motion } from 'motion/react';
import { X, RefreshCcw, ShieldCheck, AlertCircle } from 'lucide-react';
import { PageTitle } from '../../components/PageTitle';
import { useAppState } from '../../state';;

export function Returns() {
  const { onNavigate } = useAppState();;

  const sections = [
    {
      title: "نظرة عامة على السياسة",
      icon: <RefreshCcw size={24} />,
      points: [
        "إمكانية الاسترجاع أو الاستبدال خلال 14 يوماً من تاريخ استلام الطلب.",
        "الاستبدال متاح ويعتمد على توفر المنتج والمقاس المطلوب في المخزون."
      ]
    },
    {
      title: "شروط الاسترجاع والاستبدال",
      icon: <ShieldCheck size={24} />,
      points: [
        "يجب أن يكون المنتج بحالته الأصلية تماماً، وغير مستخدم.",
        "يجب إرجاع المنتج في عبوته الأصلية ومع جميع الملحقات والتغليف المرفق.",
        "يُمنع استرجاع المنتجات التي تظهر عليها علامات الاستخدام لأسباب تتعلق بالصحة والسلامة."
      ]
    },
    {
      title: "ملاحظات هامة",
      icon: <AlertCircle size={24} />,
      points: [
        "في حالة الاسترجاع، يتم رد الأموال إلى حسابك أو بطاقتك خلال 5 إلى 7 أيام عمل بعد استلام وفحص المنتج."
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
        title="سياسة الاسترجاع والاستبدال"
        description="نسعى لرضائكم بتقديم سياسة مرنة وواضحة تضمن حقوقكم وتسوقكم بثقة"
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
