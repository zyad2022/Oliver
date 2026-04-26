import React from 'react';
import { motion } from 'motion/react';
import { X, Edit2, Info, CheckCircle2 } from 'lucide-react';
import { PageTitle } from '../../components/PageTitle';
import { useAppState } from '../../state';;

export function SizeGuide() {
  const { onNavigate } = useAppState();;

  const sections = [
    {
      title: "كيفية قياس الإصبع (الخواتم)",
      icon: <Edit2 size={24} />,
      points: [
        "استخدمي شريط قياس مرن (مازورة) أو خيطاً سميكاً ولفيه حول قاعدة إصبعك.",
        "ضعي علامة بقلم على نقطة التقاء الخيط لتحديد المحيط الداخلي.",
        "استخدمي مسطرة لقياس طول الخيط بالملليمتر وتدوين الرقم.",
        "قارني الطول بجدول مقاسات الخواتم أدناه لمعرفة مقاسك الصحيح."
      ]
    },
    {
      title: "نصائح لاختيار المقاس الصحيح",
      icon: <Info size={24} />,
      points: [
        "قومي بقياس إصبعك في نهاية اليوم حيث يكون حجمه في أقصى اتساع له.",
        "تجنبي قياس أصابعك عندما تكون باردة جداً، حيث تكون الأصابع أنحف قليلاً.",
        "إذا كان قياسك يقع بين مقاسين، ننصح دائماً باختيار المقاس الأكبر لضمان الراحة."
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
        title="دليل المقاسات"
        description="طرق بسيطة لضمان اختيار المقاس المثالي الذي يمنحك الراحة والتألق"
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
        
        {/* Placeholder for Size Chart */}
        <div className="bg-gradient-to-r from-gold-primary/5 to-gold-primary/15 border border-gold-primary/20 rounded-3xl p-8 shadow-sm text-center">
          <div className="flex justify-center mb-4 text-gold-deep">
            <CheckCircle2 size={32} />
          </div>
          <h2 className="text-xl font-arabic text-natural-text mb-4">جدول المقاسات (للتوضيح)</h2>
          <div className="overflow-x-auto">
            <table className="w-full max-w-md mx-auto text-sm text-natural-text en-text">
              <thead className="border-b border-gold-primary/30 text-gold-deep">
                <tr>
                  <th className="py-3 px-4 text-center">Size (US)</th>
                  <th className="py-3 px-4 text-center">Diameter (mm)</th>
                  <th className="py-3 px-4 text-center">Circumference (mm)</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gold-primary/10">
                  <td className="py-3 px-4">6</td>
                  <td className="py-3 px-4">16.5</td>
                  <td className="py-3 px-4">51.9</td>
                </tr>
                <tr className="border-b border-gold-primary/10">
                  <td className="py-3 px-4">7</td>
                  <td className="py-3 px-4">17.3</td>
                  <td className="py-3 px-4">54.4</td>
                </tr>
                <tr>
                  <td className="py-3 px-4">8</td>
                  <td className="py-3 px-4">18.1</td>
                  <td className="py-3 px-4">57.0</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
