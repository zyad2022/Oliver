import React from 'react';
import { motion } from 'motion/react';
import { Product } from '../data';
import { ChevronDown, Star, Truck, ShieldCheck } from 'lucide-react';

interface ProductPageProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onNavigate: (page: string) => void;
}

export function ProductPage({ product, onAddToCart, onNavigate }: ProductPageProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 w-full"
    >
      <div className="flex flex-col md:flex-row gap-12 lg:gap-20">
        
        {/* Images */}
        <div className="w-full md:w-1/2">
          <div className="aspect-[4/5] bg-natural-img rounded-2xl overflow-hidden mb-4">
            <img 
              src={product.image} 
              alt={product.name} 
              onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&q=80&w=800'; }}
              className="w-full h-full object-cover object-center"
            />
          </div>
          <div className="grid grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((_, i) => (
              <div key={i} className="aspect-square bg-natural-img rounded-xl overflow-hidden cursor-pointer border border-transparent hover:border-natural-accent transition-colors">
                <img 
                  src={product.image} 
                  className="w-full h-full object-cover opacity-80 hover:opacity-100" 
                  alt="thumbnail" 
                  onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&q=80&w=800'; }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Details */}
        <div className="w-full md:w-1/2 mt-4 md:mt-10">
          <p className="text-natural-accent uppercase tracking-widest text-xs font-bold en-text mb-3">{product.category}</p>
          <h1 className="text-3xl md:text-4xl text-natural-text en-title mb-4">{product.name}</h1>
          
          <div className="flex items-center gap-4 mb-6 border-b border-natural-border pb-6">
            <div className="flex items-center gap-3">
              <span className="text-2xl text-natural-accent font-medium en-text">{product.price} EGP</span>
              {product.oldPrice && (
                <span className="text-[#888] line-through text-lg en-text">{product.oldPrice} EGP</span>
              )}
            </div>
            <div className="w-px h-6 bg-natural-border"></div>
            <div className="flex items-center gap-1 text-[#888]">
              <Star size={16} fill="#B08D57" className="text-natural-accent" />
              <Star size={16} fill="#B08D57" className="text-natural-accent" />
              <Star size={16} fill="#B08D57" className="text-natural-accent" />
              <Star size={16} fill="#B08D57" className="text-natural-accent" />
              <Star size={16} fill="#B08D57" className="text-natural-accent" />
              <span className="text-sm font-medium mr-2 en-text">(12 Reviews)</span>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-lg text-natural-text mb-3 font-medium">الوصف</h3>
            <p className="text-[#666] font-light leading-relaxed mb-6">
              يضفي هذا التصميم الاستثنائي لمسة من الفخامة النعومة على إطلالتك. صُمم بحب وعناية فائقة ليكون قطعة أساسية لا غنى عنها في صندوق مجوهراتك، يواكب الموضة ويحافظ على كلاسيكيته في نفس الوقت.
            </p>
            <ul className="text-[#666] font-light leading-relaxed list-disc list-inside space-y-2">
              <li>مطلي بالذهب عيار 18 قيراط</li>
              <li>مقاوم للصدأ ولا يسبب حساسية البشرة</li>
              <li>تصميم عصري يناسب الإطلالات اليومية والمناسبات</li>
              <li>يصلك في صندوق فاخر مناسب للإهداء</li>
            </ul>
          </div>

          <div className="flex gap-4 mb-10 w-full">
            <div className="border border-natural-border px-6 py-4 flex items-center justify-between w-1/3 en-text cursor-pointer hover:border-natural-accent transition-colors rounded-full">
              <span>Qty</span>
              <span className="font-medium">1</span>
              <ChevronDown size={16} />
            </div>
            <button 
              onClick={() => onAddToCart(product)}
              className="bg-[#2D2D2D] text-white w-2/3 py-4 uppercase tracking-widest text-sm font-medium hover:bg-natural-accent transition-colors en-text rounded-full shadow-sm"
            >
              Add to Cart
            </button>
          </div>

          <div className="flex flex-col gap-4 py-6 border-t border-b border-natural-border">
            <div className="flex items-center gap-4 text-[#666]">
              <Truck size={24} strokeWidth={1.5} />
              <p className="font-light">توصيل مجاني داخل مصر للطلبات فوق 1000 جنيه مصري</p>
            </div>
            <div className="flex items-center gap-4 text-[#666]">
              <ShieldCheck size={24} strokeWidth={1.5} />
              <p className="font-light">الدفع عند الاستلام (COD) متاح داخل المحافظات</p>
            </div>
            <div className="flex items-center gap-4 text-[#666]">
              <ShieldCheck size={24} strokeWidth={1.5} />
              <p className="font-light">ضمان لمدة سنتين على تغيير اللون للمجوهرات</p>
            </div>
          </div>

        </div>
      </div>
    </motion.div>
  );
}
