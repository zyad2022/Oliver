
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, CheckCircle2, X } from 'lucide-react';
import { PageTitle } from '../../components/PageTitle';
import { Button } from '../../components/Button';
import { useAppContext } from '../../state';

export function Rate() {
  const { onNavigate } = useAppContext();
  const [rating, setRating] = useState<number>(0);
  const [hoveredRating, setHoveredRating] = useState<number>(0);
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) return;
    
    // Simulate submission
    setSubmitted(true);
    // Reset after some time if needed, but for now just show success
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 relative"
    >
      <button 
        onClick={() => onNavigate('back')}
        className="absolute top-4 left-4 sm:top-8 sm:left-8 p-2 rounded-full bg-natural-bg border border-natural-border text-natural-text hover:bg-natural-accent hover:text-white transition-colors z-10"
      >
        <X size={24} />
      </button>

      <PageTitle 
        title="قيم تجربتك"
        description="رأيك يهمنا ويساعدنا على تقديم الأفضل دائماً. شاركينا تجربتك مع أوليفر."
        badgeText="ملاحظاتكم"
      />

      <div className="mt-12">
        <AnimatePresence mode="wait">
          {!submitted ? (
            <motion.form
              key="rate-form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onSubmit={handleSubmit}
              className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-gold-primary/10"
            >
              <div className="flex flex-col items-center mb-10">
                <p className="text-xl font-arabic text-natural-text mb-6">كيف تقيم جودة الصفحة والمنتجات؟</p>
                <div className="flex gap-3">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onMouseEnter={() => setHoveredRating(star)}
                      onMouseLeave={() => setHoveredRating(0)}
                      onClick={() => setRating(star)}
                      className="transition-all duration-200 transform hover:scale-110"
                    >
                      <Star
                        size={48}
                        className={`transition-colors duration-200 ${
                          (hoveredRating || rating) >= star
                            ? 'fill-gold-primary text-gold-primary shadow-gold'
                            : 'text-gray-200'
                        }`}
                      />
                    </button>
                  ))}
                </div>
                {rating > 0 && (
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 text-gold-primary font-arabic font-medium"
                  >
                    شكرًا لاختيارك {rating} نجوم!
                  </motion.p>
                )}
              </div>

              <div className="mb-8">
                <label htmlFor="comment" className="block text-right mb-3 font-arabic text-natural-text">تعليقك (اختياري)</label>
                <textarea
                  id="comment"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="اكتب تعليقك هنا..."
                  className="w-full min-h-[150px] p-4 rounded-2xl border border-gold-primary/20 focus:border-gold-primary focus:ring-1 focus:ring-gold-primary outline-none transition-all font-arabic text-right text-lg resize-none"
                />
              </div>

              <Button
                type="submit"
                fullWidth
                disabled={rating === 0}
                className="py-4 text-lg"
              >
                إرسال التقييم
              </Button>
            </motion.form>
          ) : (
            <motion.div
              key="rate-success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-3xl p-12 shadow-sm border border-gold-primary/20 text-center flex flex-col items-center"
            >
              <div className="w-20 h-20 bg-gold-primary/10 rounded-full flex items-center justify-center mb-6">
                <CheckCircle2 size={40} className="text-gold-primary" />
              </div>
              <h3 className="text-2xl font-arabic text-natural-text mb-4">تم إرسال تقييمك بنجاح!</h3>
              <p className="text-[#666] font-arabic text-lg mb-8 leading-relaxed">
                شكراً لمساعدتنا على التطور. كل تعليق ترسلينه يصنع فرقاً في مستقبل أوليفر.
              </p>
              <Button
                variant="outline"
                onClick={() => window.history.back()}
              >
                العودة للصفحة السابقة
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
