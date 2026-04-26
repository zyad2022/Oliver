import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { User, Mail, LogOut, Calendar, ShieldAlert, X } from 'lucide-react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import { useAppState, useUI } from '../../state';;
import { PageTitle } from '../../components/PageTitle';

export function Profile() {
  const { currentUser: user, logout: onLogout, onNavigate } = useAppState();
  const { openModal } = useUI();;
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUserData() {
      if (user) {
        try {
          const docRef = doc(db, 'users', user.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setUserData(docSnap.data());
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        } finally {
          setLoading(false);
        }
      }
    }
    fetchUserData();
  }, [user]);

  if (!user) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 w-full relative"
    >
      <button 
        onClick={() => onNavigate('back')}
        className="absolute top-4 left-4 sm:top-8 sm:left-8 p-2 rounded-full bg-natural-bg border border-natural-border text-natural-text hover:bg-natural-accent hover:text-white transition-colors z-10"
      >
        <X size={24} />
      </button>

      <PageTitle title="الملف الشخصي" />

      <div className="bg-white rounded-3xl p-8 border border-natural-border shadow-sm">
        <div className="flex justify-start items-center gap-6 mb-10">
          <div className="w-20 h-20 bg-natural-bg rounded-full flex items-center justify-center text-natural-accent border border-natural-border">
            <User size={32} />
          </div>
          <div>
            <h2 className="text-2xl font-arabic font-medium text-natural-text mb-1 flex items-center gap-3">
              {userData?.name || user.displayName || 'مستخدم Oliver'}
            </h2>
            <div className="flex flex-col gap-1.5 mt-2">
              <div className="flex items-center gap-2 text-[#666]">
                <Mail size={16} />
                <span className="en-text text-sm">{userData?.email || user.email}</span>
              </div>
              {userData?.createdAt && (
                <div className="flex items-center gap-2 text-[#888]">
                  <Calendar size={14} />
                  <span className="font-arabic text-xs">تاريخ الانضمام: {new Date(userData.createdAt.toMillis ? userData.createdAt.toMillis() : userData.createdAt).toLocaleDateString('ar-EG')}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-natural-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <button
            onClick={onLogout}
            className="flex items-center gap-3 text-natural-text hover:text-stone-600 font-arabic font-medium transition-colors"
          >
            <LogOut size={20} />
            تسجيل الخروج
          </button>

          <button
            onClick={() => openModal('delete-account')}
            className="flex items-center gap-2 text-red-500 hover:text-red-700 font-arabic font-medium transition-colors text-sm"
          >
            <ShieldAlert size={18} />
            حذف الحساب والبيانات
          </button>
        </div>
      </div>
    </motion.div>
  );
}
