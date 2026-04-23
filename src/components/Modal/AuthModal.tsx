import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Eye, EyeOff } from 'lucide-react';
import { auth, db } from '../../firebase';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  updateProfile,
  signInWithPopup,
  GoogleAuthProvider
} from 'firebase/auth';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: () => void;
}

type Tab = 'login' | 'signup';

export function AuthModal({ isOpen, onClose, onLogin }: AuthModalProps) {
  const [activeTab, setActiveTab] = useState<Tab>('login');
  
  // Form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Password visibility states
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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

  // Reset form when changing tabs
  useEffect(() => {
    setError(null);
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setFullName('');
    setShowPassword(false);
    setShowConfirmPassword(false);
  }, [activeTab]);

  const getFriendlyErrorMessage = (errorCode: string) => {
    switch (errorCode) {
      case 'auth/user-not-found':
      case 'auth/invalid-credential':
        return 'هذا الحساب غير موجود أو بيانات الدخول خاطئة';
      case 'auth/wrong-password':
        return 'كلمة المرور غير صحيحة';
      case 'auth/email-already-in-use':
        return 'البريد الإلكتروني هذا مستخدم بالفعل';
      case 'auth/weak-password':
        return 'كلمة المرور ضعيفة جداً، الرجاء استخدام 6 أحرف على الأقل';
      case 'auth/invalid-email':
        return 'البريد الإلكتروني المدخل غير صالح';
      default:
        return 'حدث خطأ غير متوقع. حاول مرة أخرى';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (activeTab === 'login') {
        await signInWithEmailAndPassword(auth, email, password);
        onLogin();
      } else {
        if (password !== confirmPassword) {
          setError('كلمتي المرور غير متطابقتين');
          setLoading(false);
          return;
        }
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(userCredential.user, { displayName: fullName });
        
        // Save user to Firestore
        await setDoc(doc(db, 'users', userCredential.user.uid), {
          uid: userCredential.user.uid,
          name: fullName,
          email: email,
          createdAt: serverTimestamp()
        });

        onLogin();
      }
    } catch (err: any) {
      console.error(err);
      setError(getFriendlyErrorMessage(err.code));
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError(null);
    setLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      const userCredential = await signInWithPopup(auth, provider);
      
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
      console.error(err);
      if (err.code === 'auth/popup-closed-by-user' || err.code === 'auth/cancelled-popup-request') {
        setError(null);
      } else {
        setError('حدث خطأ أثناء تسجيل الدخول بواسطة جوجل.');
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
            className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-x-0 bottom-0 sm:top-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 sm:bottom-auto sm:w-full sm:max-w-md bg-white rounded-t-[32px] sm:rounded-[24px] z-[70] flex flex-col max-h-[90vh] sm:max-h-[85vh] overflow-hidden natural-shadow"
          >
            {/* Header & Close Button */}
            <div className="flex justify-between items-center p-6 border-b border-natural-border/50 shrink-0">
              <button 
                onClick={onClose}
                className="p-2 -mr-2 text-stone-400 hover:text-stone-800 transition-colors rounded-full hover:bg-natural-bg"
              >
                <X size={20} />
              </button>
              <div className="text-right">
                <h2 className="text-2xl font-arabic font-medium text-natural-text mb-1">مرحباً بك في Oliver</h2>
                <p className="font-arabic text-sm text-[#666]">سجل الدخول أو أنشئ حسابك للاستمرار</p>
              </div>
            </div>

            {/* Scrollable Content */}
            <div className="overflow-y-auto p-6 custom-scrollbar">
              
              {/* Tabs */}
              <div className="flex relative border-b border-natural-border mb-8">
                <button
                  className={`flex-1 pb-3 text-center transition-colors en-text text-sm font-medium tracking-wide uppercase ${
                    activeTab === 'login' ? 'text-natural-accent' : 'text-[#888] hover:text-natural-text'
                  }`}
                  onClick={() => setActiveTab('login')}
                >
                  Log In
                </button>
                <button
                  className={`flex-1 pb-3 text-center transition-colors en-text text-sm font-medium tracking-wide uppercase ${
                    activeTab === 'signup' ? 'text-natural-accent' : 'text-[#888] hover:text-natural-text'
                  }`}
                  onClick={() => setActiveTab('signup')}
                >
                  Sign Up
                </button>
                {/* Active Tab Indicator */}
                <div 
                  className={`absolute bottom-0 h-0.5 bg-natural-accent transition-all duration-300 ease-in-out ${
                    activeTab === 'login' ? 'right-0 w-1/2' : 'right-1/2 w-1/2'
                  }`}
                />
              </div>

              {/* Form Forms */}
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                {error && (
                  <div className="bg-red-50 text-red-600 text-sm p-3 rounded-lg text-center font-arabic border border-red-100">
                    {error}
                  </div>
                )}
                
                {activeTab === 'signup' && (
                  <div>
                    <input 
                      type="text" 
                      placeholder="Full Name" 
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full border border-natural-border rounded-xl px-4 py-3 text-base outline-none focus:border-natural-accent transition-colors bg-[#FAF8F5] focus:bg-white en-text"
                    />
                  </div>
                )}
                
                <div>
                  <input 
                    type="email" 
                    placeholder="Email Address" 
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full border border-natural-border rounded-xl px-4 py-3 text-base outline-none focus:border-natural-accent transition-colors bg-[#FAF8F5] focus:bg-white en-text"
                  />
                </div>
                
                <div className="relative">
                  <input 
                    type={showPassword ? "text" : "password"} 
                    placeholder="Password" 
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full border border-natural-border rounded-xl px-4 py-3 pl-12 text-base outline-none focus:border-natural-accent transition-colors bg-[#FAF8F5] focus:bg-white en-text"
                  />
                  <button 
                    type="button" 
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700 transition-colors p-1"
                  >
                    {showPassword ? <Eye size={20} strokeWidth={1.5} /> : <EyeOff size={20} strokeWidth={1.5} />}
                  </button>
                </div>

                {activeTab === 'signup' && (
                  <div className="relative">
                    <input 
                      type={showConfirmPassword ? "text" : "password"} 
                      placeholder="Confirm Password" 
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full border border-natural-border rounded-xl px-4 py-3 pl-12 text-base outline-none focus:border-natural-accent transition-colors bg-[#FAF8F5] focus:bg-white en-text"
                    />
                    <button 
                      type="button" 
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700 transition-colors p-1"
                    >
                      {showConfirmPassword ? <Eye size={20} strokeWidth={1.5} /> : <EyeOff size={20} strokeWidth={1.5} />}
                    </button>
                  </div>
                )}

                {activeTab === 'login' && (
                  <div className="flex justify-end">
                    <button type="button" dir="ltr" className="text-sm font-medium text-natural-accent hover:text-natural-accent-dark transition-colors en-text">
                      Forgot Password ?
                    </button>
                  </div>
                )}

                <button 
                  type="submit"
                  disabled={loading}
                  className="w-full bg-natural-accent text-white py-4 mt-2 uppercase tracking-widest text-sm font-medium hover:bg-natural-accent-dark disabled:opacity-70 disabled:cursor-not-allowed transition-colors rounded-full en-text relative"
                >
                  {loading ? 'Please wait...' : (activeTab === 'login' ? 'Log In' : 'Create Account')}
                </button>
              </form>

              {/* Divider */}
              <div className="flex items-center gap-4 my-8">
                <div className="flex-1 h-px bg-natural-border"></div>
                <span className="text-xs text-[#888] uppercase tracking-wider en-text">Or</span>
                <div className="flex-1 h-px bg-natural-border"></div>
              </div>

              {/* Social Login */}
              <div className="flex flex-col gap-3">
                <button 
                  type="button"
                  onClick={handleGoogleLogin}
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-3 border border-natural-border rounded-full py-3.5 hover:bg-natural-bg disabled:opacity-70 disabled:cursor-not-allowed transition-colors en-text text-sm font-medium text-natural-text"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22.56 12.25C22.56 11.47 22.49 10.72 22.36 10H12V14.26H17.92C17.66 15.63 16.89 16.79 15.72 17.57V20.34H19.28C21.36 18.42 22.56 15.6 22.56 12.25Z" fill="#4285F4"/>
                    <path d="M12 23C14.97 23 17.46 22.02 19.28 20.34L15.72 17.57C14.74 18.23 13.48 18.64 12 18.64C9.13 18.64 6.7 16.7 5.83 14.12H2.17V16.94C3.99 20.56 7.69 23 12 23Z" fill="#34A853"/>
                    <path d="M5.83 14.12C5.61 13.47 5.48 12.76 5.48 12C5.48 11.24 5.61 10.53 5.83 9.88V7.06H2.17C1.42 8.55 1 10.22 1 12C1 13.78 1.42 15.45 2.17 16.94L5.83 14.12Z" fill="#FBBC05"/>
                    <path d="M12 5.36C13.62 5.36 15.07 5.92 16.21 7.02L19.36 3.87C17.46 2.09 14.97 1 12 1C7.69 1 3.99 3.44 2.17 7.06L5.83 9.88C6.7 7.3 9.13 5.36 12 5.36Z" fill="#EA4335"/>
                  </svg>
                  Continue with Google
                </button>
              </div>

            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
