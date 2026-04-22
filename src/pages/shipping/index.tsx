import React from 'react';
import { motion } from 'motion/react';
import { X, Truck, Clock, MapPin } from 'lucide-react';
import { PageTitle } from '../../components/PageTitle';
import { useAppContext } from '../../state';

export function Shipping() {
  const { onNavigate } = useAppContext();

  const sections = [
    {
      title: "مدة التوصيل",
      icon: <Clock size={24} />,
      points: [
        "يستغرق التوصيل عادةً من 2 إلى 5 أيام عمل داخل المدن الرئيسية.",
        "قد يستغرق الشحن للمناطق الجغرافية النائية من 5 إلى 7 أيام عمل.",
        "يرجى ملاحظة أنه قد يحدث تأخير محتمل أو طفيف في أوقات التوصيل خلال مواسم العروض، الأعياد، والفيضانات الشرائية."
      ]
    },
    {
      title: "تغطية الشحن والتكلفة",
      icon: <MapPin size={24} />,
      points: [
        "نقوم بالشحن إلى جميع المحافظات والمناطق داخل البلد بأمان وسرعة.",
        "تكلفة الشحن تظهر بوضوح وبشكل تلقائي عند إتمام الطلب (Checkout) بناءً على منطقتك الجغرافية.",
        "نوفر شحناً مجانياً للطلبات التي تتجاوز قيمتها حداً معيناً (راجع صفحة إتمام الدفع لمعرفة العروض الحالية)."
      ]
    },
    {
      title: "تتبع الطلبات",
      icon: <Truck size={24} />,
      points: [
        "فور شحن طلبك من مستودعاتنا، ستصلك رسالة نصية أو بريد إلكتروني يحتوي على رقم بوليصة الشحن.",
        "تتبع الطلب متاح في أي وقت عبر رابط التتبع المقدم من شركة الشحن، لتبقى على اطلاع دائم بحالة شحنتك."
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
        title="الشحن والتوصيل"
        description="نوصل لك أينما كنت، بسرعة وأمان لضمان تجربة تسوق سلسة من البداية وحتى الاستلام"
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
