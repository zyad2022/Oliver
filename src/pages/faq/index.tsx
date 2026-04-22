
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, X } from 'lucide-react';
import { PageTitle } from '../../components/PageTitle';
import { useAppContext } from '../../state';

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "كيف يمكنني تقديم طلب؟",
    answer: "يمكنك تقديم طلب عن طريق تصفح المجموعات، اختيار المنتج المناسب، إضافته إلى سلة المشتريات، ثم اتباع خطوات إتمام الدفع (Checkout) وإدخال بيانات الشحن الخاصة بك."
  },
  {
    question: "ما هي طرق الدفع المتاحة؟",
    answer: "نوفر حالياً خيارات متعددة للدفع تشمل الدفع عند الاستلام، والدفع عبر البطاقات الائتمانية (Visa/MasterCard)، بالإضافة إلى بعض خيارات المحافظ الإلكترونية المتوفرة في منطقتك."
  },
  {
    question: "كم يستغرق التوصيل؟",
    answer: "يستغرق التوصيل عادةً من 2 إلى 5 أيام عمل داخل المدن الرئيسية، ومن 5 إلى 7 أيام عمل للمناطق الأخرى. قد تختلف المدة قليلاً خلال مواسم العروض والفيضانات الشرائية."
  },
  {
    question: "هل تتوفر خدمة التوصيل الدولي؟",
    answer: "نعم، نحن نشحن إلى معظم دول العالم. تختلف تكاليف ومدة الشحن الدولي بناءً على الدولة المختارة، ويمكنك رؤية التفاصيل عند إدخال عنوانك في صفحة الدفع."
  },
  {
    question: "ما هي سياسة الاستبدال والاسترجاع؟",
    answer: "يمكنك استرجاع أو استبدال المنتج خلال 14 يوماً من تاريخ الاستلام، بشرط أن يكون المنتج في حالته الأصلية وبتغليفه الأصلي ولم يتم استخدامه، وذلك لأسباب تتعلق بالصحة والسلامة."
  },
  {
    question: "كيف يمكنني تتبع طلبي؟",
    answer: "بمجرد شحن طلبك، سنرسل لك رسالة نصية أو بريداً إلكترونياً يحتوي على رقم التتبع ورابط لمتابعة حالة الشحنة مباشرة عبر موقع شركة الشحن."
  },
  {
    question: "هل المنتجات مضمونة؟",
    answer: "نعم، جميع مجوهرات أوليفر تأتي مع ضمان الجودة على المواد والتصنيع. في حال وجود أي عيب مصنعي، يرجى التواصل معنا فوراً لاستبدال القطعة."
  },
  {
    question: "كيف يمكنني التواصل مع خدمة العملاء؟",
    answer: "يمكنك التواصل معنا عبر صفحة 'تواصل معنا' على الموقع، أو عبر رسائلنا المباشرة على الإنستقرام، أو من خلال الواتساب الخاص بخدمة العملاء."
  },
  {
    question: "كيف أعرف مقاسي الصحيح؟",
    answer: "يمكنك الرجوع إلى 'دليل المقاسات' المتوفر في تذييل الصفحة، والذي يحتوي على جداول توضيحية وطرق بسيطة لقياس الخواتم والأساور في المنزل."
  },
  {
    question: "هل يمكنني تعديل طلبي بعد تأكيده؟",
    answer: "يمكن تعديل الطلب (مثل تغيير العنوان أو إضافة منتج) فقط في حال لم يتم تسليم الشحنة لشركة الشحن بعد. يرجى التواصل مع الدعم الفني بأسرع وقت ممكن."
  },
  {
    question: "ماذا أفعل إذا استلمت منتجًا تالفًا؟",
    answer: "نعتذر بشدة عن ذلك. يرجى تصوير المنتج التلف والتواصل معنا خلال 24 ساعة من استلامه، وسنقوم بترتيب عملية الاسترجاع وإرسال قطع بديلة لك مجاناً."
  },
  {
    question: "هل أسعاركم شاملة للضريبة؟",
    answer: "نعم، جميع الأسعار المعروضة على الموقع شاملة لضريبة القيمة المضافة (VAT) المطبقة في دولتك."
  },
  {
    question: "كيف أحافظ على لمعان مجوهراتي؟",
    answer: "ننصح بتجنب ملامسة المجوهرات للعطور والمواد الكيميائية. يفضل مسحها بقطعة قماش ناعمة بعد الاستخدام وحفظها في الصندوق المخصص لها في مكان جاف."
  },
  {
    question: "هل تتوفر علب هدايا؟",
    answer: "نعم، تصل جميع طلبات أوليفر في تغليف فاخر مناسب للإهداء مجاناً. يمكنك أيضاً إضافة رسالة خاصة للهدايا عند إتمام الطلب."
  },
  {
    question: "هل يمكنني إلغاء طلبي؟",
    answer: "يمكنك إلغاء الطلب قبل عملية الشحن من خلال حسابك أو التواصل معنا. في حال تم الشحن، سيتم تطبيق سياسة الاسترجاع العادية."
  },
  {
    question: "أين يقع مقركم الرئيسي؟",
    answer: "مقرنا الرئيسي في القاهرة، جمهورية مصر العربية، ومنه ننطلق لخدمة عملائنا في كافة أرجاء الوطن العربي والعالم."
  },
  {
    question: "هل تتوفر قطع مخصصة (توصية)؟",
    answer: "حالياً نركز على مجموعاتنا الحصرية، ولكننا ندرس إضافة خدمة التصميم المخصص في المستقبل القريب. تابعونا ليصلكم كل جديد."
  },
  {
    question: "ما هي المعادن المستخدمة في المجوهرات؟",
    answer: "نستخدم أجود أنواع المعادن الثمينة بما في ذلك الفضة الإسترلينية 925، المطلية بذهب عيار 18 أو 21، بالإضافة إلى الأحجار الكريمة المنتقاة بعناية."
  },
  {
    question: "هل لديكم فروع مادية؟",
    answer: "نحن نركز حالياً على تقديم تجربة تسوق إلكترونية عالمية المستوى، ولا تتوفر فروع مادية حالياً لتوفير أفضل الأسعار لعملائنا."
  },
  {
    question: "كيف أحصل على عروض حصرية؟",
    answer: "يمكنك الاشتراك في نشرتنا الإخبارية أو متابعتنا على منصات التواصل الاجتماعي لتكوني أول من يحصل على أكواد الخصم والعروض الموسمية."
  }
];

export function FAQ() {
  const { onNavigate } = useAppContext();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
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
        className="absolute top-4 left-4 sm:top-8 sm:left-8 p-2 rounded-full bg-natural-bg border border-natural-border text-natural-text hover:bg-natural-accent hover:text-white transition-colors z-10"
      >
        <X size={24} />
      </button>

      <PageTitle 
        title="الأسئلة الشائعة"
        description="كل ما تحتاجين لمعرفته عن تجربة التسوق في أوليفر، طرق الدفع، والشحن."
        badgeText="مساعدة ومعلومات"
      />

      <div className="mt-16 space-y-4">
        {faqs.map((faq, index) => (
          <div 
            key={index} 
            className={`border rounded-2xl transition-all duration-300 ${
              openIndex === index 
                ? 'border-gold-primary bg-gold-primary/5 shadow-sm' 
                : 'border-gold-primary/15 bg-white hover:border-gold-primary/40'
            }`}
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full flex items-center justify-between p-6 text-right focus:outline-none"
            >
              <span className={`text-lg font-arabic font-medium transition-colors ${
                openIndex === index ? 'text-gold-deep' : 'text-natural-text'
              }`}>
                {faq.question}
              </span>
              <ChevronDown 
                size={20} 
                className={`text-gold-primary transition-transform duration-300 ${
                  openIndex === index ? 'rotate-180' : ''
                }`} 
              />
            </button>
            <AnimatePresence>
              {openIndex === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  className="overflow-hidden"
                >
                  <div className="px-6 pb-6 pt-0 text-[#444] font-arabic leading-relaxed text-lg border-t border-gold-primary/10 mt-0">
                    <p className="pt-4">{faq.answer}</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>

      <div className="mt-20 p-8 rounded-3xl bg-neutral-50 border border-gold-primary/10 text-center">
        <p className="text-natural-text font-arabic mb-4">لم تجدي إجابة لسؤالك؟</p>
        <button 
          onClick={() => onNavigate('contact')}
          className="text-gold-primary font-arabic font-bold hover:underline"
        >
          تواصل معنا مباشرة عبر خدمة العملاء
        </button>
      </div>
    </motion.div>
  );
}
