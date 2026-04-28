import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, X, MessageSquare, Quote } from 'lucide-react';
import { PageTitle } from '../../components/PageTitle';
import { useAppState } from '../../state';
import { db } from '../../firebase';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';

interface Review {
  id: string;
  name: string;
  comment: string;
  rating: number;
  createdAt: any;
}

function ReviewsSummary({ reviews }: { reviews: Review[] }) {
  if (reviews.length === 0) return null;

  const totalReviews = reviews.length;
  const averageRating = reviews.reduce((sum, r) => sum + r.rating, 0) / totalReviews;
  
  const distribution = [5, 4, 3, 2, 1].map(star => {
    const count = reviews.filter(r => r.rating === star).length;
    return {
      star,
      count,
      percentage: Math.round((count / totalReviews) * 100)
    };
  });

  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-8 p-8 bg-white/30 backdrop-blur-xl border border-white/40 rounded-[2rem] shadow-[0_15px_50px_-15px_rgba(212,175,55,0.15)] flex flex-col md:flex-row items-center gap-8 md:justify-center md:gap-20"
    >
      <div className="flex flex-col items-center justify-center text-center min-w-[200px]">
        <h3 className="text-xl font-arabic text-gold-deep mb-3 font-semibold">التقييم العام</h3>
        <div className="text-6xl font-bold text-natural-text mb-4 en-text tracking-tighter">
          {averageRating.toFixed(1)}
        </div>
        <div className="flex gap-1 mb-3 justify-center" dir="ltr">
          {[1, 2, 3, 4, 5].map((star) => {
            const fillPercentage = Math.max(0, Math.min(100, (averageRating - star + 1) * 100));
            return (
              <div key={star} className="relative w-7 h-7 flex-shrink-0">
                <Star size={28} className="text-gray-200 absolute inset-0" />
                <div 
                  className="absolute top-0 left-0 h-full overflow-hidden" 
                  style={{ width: `${fillPercentage}%` }}
                >
                  <Star size={28} className="fill-gold-primary text-gold-primary absolute top-0 left-0" />
                </div>
              </div>
            );
          })}
        </div>
        <p className="text-natural-secondary-text font-arabic">
          بناءً على <span className="font-bold text-gold-deep text-lg">{totalReviews}</span> تقييمات
        </p>
      </div>

      <div className="w-px h-32 bg-gold-primary/20 hidden md:block"></div>

      <div className="w-full max-w-sm flex flex-col gap-3">
        {distribution.map((item) => (
          <div key={item.star} className="flex items-center gap-4 text-sm" dir="ltr">
            <div className="flex items-center gap-1 min-w-[2.5rem] text-natural-text justify-end">
              <span className="font-bold en-text text-base">{item.star}</span>
              <Star size={16} className="fill-gold-primary text-gold-primary" />
            </div>
            <div className="flex-1 h-2.5 bg-gray-200 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${item.percentage}%` }}
                transition={{ duration: 1, ease: 'easeOut' }}
                className="h-full bg-gradient-to-r from-gold-soft to-gold-primary rounded-full"
              />
            </div>
            <div className="min-w-[2.5rem] text-left text-natural-secondary-text en-text font-medium">
              {item.percentage}%
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

export function Reviews() {
  const { onNavigate } = useAppState();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, 'reviews'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const reviewsData: Review[] = [];
      querySnapshot.forEach((doc) => {
        reviewsData.push({ id: doc.id, ...doc.data() } as Review);
      });
      setReviews(reviewsData);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-1 justify-center md:justify-start">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={16}
            className={star <= rating ? 'fill-gold-primary text-gold-primary' : 'text-gray-200'}
          />
        ))}
      </div>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="w-full min-h-screen pt-12 pb-24 px-4 sm:px-6 lg:px-8 relative bg-natural-bg/50"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-1/4 -right-20 w-96 h-96 bg-gold-primary/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 -left-20 w-96 h-96 bg-gold-primary/5 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto relative">
        {/* Close Button */}
        <button 
          onClick={() => onNavigate('back')}
          className="absolute -top-4 right-0 p-3 rounded-full bg-white/40 backdrop-blur-md border border-[#D4AF37]/20 text-gold-deep hover:bg-[#D4AF37]/20 transition-all duration-300 z-10 group"
          title="إغلاق"
        >
          <X size={24} className="group-hover:rotate-90 transition-transform duration-500" />
        </button>

        <PageTitle 
          title="العملاء"
          description="نسعد بمشاركة آرائكم وتجاربكم مع أوليفر. بريقنا يزداد بكلماتكم الدافئة."
          badgeText="صوتك يهمنا"
        />

        <div className="mt-16 overflow-hidden">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-24">
              <div className="w-12 h-12 border-4 border-gold-primary/20 border-t-gold-primary rounded-full animate-spin" />
              <p className="mt-4 text-gold-deep font-arabic">جاري تحميل التقييمات...</p>
            </div>
          ) : reviews.length > 0 ? (
            <div className="flex flex-col gap-6">
              <ReviewsSummary reviews={reviews} />
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white/30 backdrop-blur-xl border border-white/40 rounded-[2rem] shadow-[0_15px_50px_-15px_rgba(212,175,55,0.15)] overflow-hidden"
              >
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gold-primary/5 border-b border-gold-primary/20">
                      <th className="px-8 py-6 text-right font-arabic text-gold-deep font-bold tracking-wide uppercase text-sm">التاريخ</th>
                      <th className="px-8 py-6 text-right font-arabic text-gold-deep font-bold tracking-wide uppercase text-sm">الاسم</th>
                      <th className="px-8 py-6 text-right font-arabic text-gold-deep font-bold tracking-wide uppercase text-sm">التقييم</th>
                      <th className="px-8 py-6 text-right font-arabic text-gold-deep font-bold tracking-wide uppercase text-sm">التعليق</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gold-primary/10">
                    <AnimatePresence>
                      {reviews.map((review, index) => (
                        <motion.tr 
                          key={review.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className="group hover:bg-gold-primary/5 transition-colors duration-300"
                        >
                          <td className="px-8 py-8 whitespace-nowrap text-right">
                            <span className="text-stone-400 text-xs en-text">
                              {review.createdAt?.toDate ? review.createdAt.toDate().toLocaleDateString('ar-EG') : 'قريباً'}
                            </span>
                          </td>
                          <td className="px-8 py-8 whitespace-nowrap text-right">
                            <span className="font-arabic text-stone-800 font-medium">{review.name}</span>
                          </td>
                          <td className="px-8 py-8 whitespace-nowrap text-right">
                            {renderStars(review.rating)}
                          </td>
                          <td className="px-8 py-8 text-right min-w-[300px]">
                            <div className="relative inline-block">
                              <Quote size={12} className="absolute -top-2 -right-3 text-gold-primary/30 rotate-180" />
                              <p className="font-arabic text-stone-600 text-sm leading-relaxed relative z-10 italic">
                                {review.comment}
                              </p>
                              <Quote size={12} className="absolute -bottom-2 -left-3 text-gold-primary/30" />
                            </div>
                          </td>
                        </motion.tr>
                      ))}
                    </AnimatePresence>
                  </tbody>
                </table>
              </div>
              </motion.div>
            </div>
          ) : (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-24 bg-white/20 backdrop-blur-md rounded-[2rem] border border-gold-primary/10"
            >
              <div className="w-20 h-20 bg-gold-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <MessageSquare size={32} className="text-gold-primary opacity-50" />
              </div>
              <h3 className="text-2xl font-arabic text-gold-deep mb-2">لا توجد تقييمات بعد</h3>
              <p className="text-stone-500 font-arabic">كوني أول من يشاركنا رأيه الرقيق.</p>
              <button 
                onClick={() => onNavigate('rate')}
                className="mt-8 px-8 py-3 bg-gold-primary text-white rounded-full font-arabic hover:bg-gold-deep transition-all duration-300 shadow-lg shadow-gold-primary/20"
              >
                أضيفي تقييمك الآن
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
