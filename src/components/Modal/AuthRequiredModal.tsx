import React from 'react';
import { motion } from 'motion/react';
import { LogIn, X } from 'lucide-react';
import { useAppContext } from '../../state';

interface AuthRequiredModalProps {
  onClose: () => void;
  onLogin: () => void;
}

export function AuthRequiredModal({ onClose, onLogin }: AuthRequiredModalProps) {
  const { setShouldOpenAuth, onNavigate } = useAppContext();

  const handleLoginRedirect = () => {
    onClose();
    setShouldOpenAuth(true);
    onNavigate('home');
  };

  return (
    <div className="p-8 sm:p-12 text-center max-w-md mx-auto">
      <div className="w-20 h-20 bg-gold-primary/10 rounded-full flex items-center justify-center mx-auto mb-8">
        <LogIn size={40} className="text-gold-primary" />
      </div>
      
      <h2 className="text-2xl sm:text-3xl font-serif text-gold-deep mb-4 uppercase tracking-widest">
        تسجيل الدخول مطلوب
      </h2>
      
      <p className="font-arabic text-natural-text/70 mb-10 leading-relaxed">
        يرجى تسجيل الدخول إلى حسابك لتتمكني من إضافة المنتجات إلى السلة وإتمام عملية الشراء.
      </p>
      
      <div className="flex flex-col gap-4">
        <button 
          onClick={handleLoginRedirect}
          className="w-full bg-gold-primary text-white py-4 rounded-full font-bold tracking-widest hover:bg-gold-deep transition-all shadow-lg hover:shadow-gold-primary/20"
        >
          تسجيل الدخول الآن
        </button>
        
        <button 
          onClick={onClose}
          className="w-full py-4 text-natural-text/60 font-medium hover:text-gold-deep transition-colors"
        >
          إغلاق
        </button>
      </div>
    </div>
  );
}
