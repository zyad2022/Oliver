import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Loader2 } from 'lucide-react';
import { auth, db } from '../../firebase';
import { 
  signInWithPopup,
  GoogleAuthProvider
} from 'firebase/auth';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: () => void;
}

export function AuthModal({ isOpen, onClose, onLogin }: AuthModalProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Reset state when opened
  useEffect(() => {
    if (isOpen) {
      setError(null);
      setLoading(false);
    }
  }, [isOpen]);

  const handleGoogleLogin = async () => {
    setError(null);
    setLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      // Configure provider properly if needed (optional)
      provider.setCustomParameters({
        prompt: 'select_account'
      });
      
      let userCredential;
      try {
        userCredential = await signInWithPopup(auth, provider);
      } catch (popupError: any) {
        console.error('Popup error:', popupError);
        // If popup is blocked or fails due to cross-origin isolation, try redirect
        if (
          popupError.code === 'auth/popup-blocked' || 
          popupError.message?.includes('Cross-Origin-Opener-Policy') ||
          popupError.code === 'auth/unauthorized-domain'
        ) {
           setError('جاري تحويلك لتسجيل الدخول...');
           const { signInWithRedirect } = await import('firebase/auth');
           await signInWithRedirect(auth, provider);
           return; // Stop execution, page will redirect
        }
        // If the user manually closed the popup, just reset loading and return
        if (popupError.code === 'auth/popup-closed-by-user' || popupError.code === 'auth/cancelled-popup-request') {
           setLoading(false);
           return;
        }
        throw popupError;
      }
      
      // Save Google user to Firestore if they don't exist
      const userDocRef = doc(db, 'users', userCredential.user.uid);
      const userDoc = await getDoc(userDocRef);
      
      if (!userDoc.exists()) {
        await setDoc(userDocRef, {
          uid: userCredential.user.uid,
          name: userCredential.user.displayName || 'مستخدم جديد',
          email: userCredential.user.email || '',
          createdAt: serverTimestamp()
        });
      }

      onLogin();
    } catch (err: any) {
      console.error('Google Auth Error:', err);
      if (err.code === 'auth/popup-closed-by-user' || err.code === 'auth/cancelled-popup-request') {
        setError(null);
      } else {
        setError('حدث خطأ أثناء تسجيل الدخول، حاول مرة أخرى');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-md"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[420px] bg-white sm:rounded-[24px] rounded-t-[24px] rounded-b-none sm:rounded-b-[24px] z-[70] flex flex-col overflow-hidden shadow-2xl p-8 bottom-0 sm:bottom-auto"
          >
            {/* Close Button */}
            <button 
              onClick={onClose}
              className="absolute top-6 left-6 p-2 text-stone-400 hover:text-stone-800 transition-colors rounded-full hover:bg-natural-bg/80 z-10"
            >
              <X size={20} />
            </button>

            {/* Header / Brand */}
            <div className="flex flex-col items-center text-center mt-4 mb-10">
              <h1 className="text-4xl font-serif text-natural-text mb-2 tracking-wide uppercase en-text">
                Oliver
              </h1>
              <p className="font-arabic text-sm text-gold-deep/80 tracking-wide">
                إشراقة يومية بلمسات من الأناقة
              </p>
            </div>

            {/* Welcome Text */}
            <div className="text-center mb-8">
              <h2 className="text-2xl font-arabic font-bold text-natural-text mb-3">
                مرحباً بك
              </h2>
              <p className="font-arabic text-sm text-[#666] leading-relaxed max-w-[280px] mx-auto">
                سجل دخولك في ثواني باستخدام حسابك على Google
              </p>
            </div>

            {/* Form & Actions */}
            <div className="flex flex-col gap-4 w-full">
              {error && (
                <div className="bg-red-50 text-red-600 text-sm p-3 rounded-xl text-center font-arabic border border-red-100 mb-2">
                  {error}
                </div>
              )}

              <button 
                type="button"
                onClick={handleGoogleLogin}
                disabled={loading}
                className="w-full flex items-center justify-center gap-3 border border-natural-border/60 bg-white rounded-full py-4 hover:bg-[#F8F9FA] hover:border-[#E8EAED] disabled:opacity-70 disabled:cursor-not-allowed transition-all shadow-sm hover:shadow-md active:scale-[0.98] en-text text-[15px] font-medium text-[#3C4043]"
              >
                {loading ? (
                  <Loader2 className="animate-spin text-[#888]" size={22} strokeWidth={2.5} />
                ) : (
                  <>
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M22.56 12.25C22.56 11.47 22.49 10.72 22.36 10H12V14.26H17.92C17.66 15.63 16.89 16.79 15.72 17.57V20.34H19.28C21.36 18.42 22.56 15.6 22.56 12.25Z" fill="#4285F4"/>
                      <path d="M12 23C14.97 23 17.46 22.02 19.28 20.34L15.72 17.57C14.74 18.23 13.48 18.64 12 18.64C9.13 18.64 6.7 16.7 5.83 14.12H2.17V16.94C3.99 20.56 7.69 23 12 23Z" fill="#34A853"/>
                      <path d="M5.83 14.12C5.61 13.47 5.48 12.76 5.48 12C5.48 11.24 5.61 10.53 5.83 9.88V7.06H2.17C1.42 8.55 1 10.22 1 12C1 13.78 1.42 15.45 2.17 16.94L5.83 14.12Z" fill="#FBBC05"/>
                      <path d="M12 5.36C13.62 5.36 15.07 5.92 16.21 7.02L19.36 3.87C17.46 2.09 14.97 1 12 1C7.69 1 3.99 3.44 2.17 7.06L5.83 9.88C6.7 7.3 9.13 5.36 12 5.36Z" fill="#EA4335"/>
                    </svg>
                    Continue with Google
                  </>
                )}
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

