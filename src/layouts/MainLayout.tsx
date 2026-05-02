import React, { ReactNode, useState, useEffect } from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { ModalSystem } from '../components/Modal';
import { useAppState, useCart, useUI } from '../state';
import { useLocation, useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { motion, AnimatePresence } from 'motion/react';

interface MainLayoutProps {
  children: ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isLoggedIn, currentUser, logout, onNavigate } = useAppState();
  const { cartItems } = useCart();
  const { openModal, setSelectedProduct, shouldOpenAuth, setShouldOpenAuth } = useUI();
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    const showMessage = localStorage.getItem("auth_required_message");
    if (showMessage === "true") {
      setToastMessage("من فضلك قم بتسجيل الدخول أولاً لإكمال الطلب");
      localStorage.removeItem("auth_required_message");
      
      const timer = setTimeout(() => {
        setToastMessage(null);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [location.pathname]);

  React.useEffect(() => {
    if (shouldOpenAuth && location.pathname === '/') {
      openModal('auth');
      setShouldOpenAuth(false);
    }
  }, [shouldOpenAuth, location.pathname, openModal, setShouldOpenAuth]);

  const handleProductClick = (product: any) => {
    setSelectedProduct(product);
    onNavigate('product');
  };

  return (
    <div className="min-h-screen flex flex-col font-arabic overflow-x-hidden relative">
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: -20, x: "-50%" }}
            className="fixed top-24 left-1/2 z-[200] bg-red-500 text-white px-6 py-3 rounded-full shadow-xl font-medium text-center w-[90%] max-w-sm text-sm sm:text-base pointer-events-none"
          >
            {toastMessage}
          </motion.div>
        )}
      </AnimatePresence>

      <Header 
        cartCount={cartItems.reduce((acc, item) => acc + item.cartQuantity, 0)} 
        currentPage={location.pathname === '/' ? 'home' : location.pathname.substring(1)} 
        onNavigate={onNavigate} 
        onProductClick={handleProductClick}
        isLoggedIn={isLoggedIn}
        userEmail={currentUser?.email || undefined}
        userName={currentUser?.displayName || undefined}
        onOpenAuth={() => openModal('auth')}
        onLogout={logout}
      />
      
      <main className="flex-grow flex w-full">
        {children}
      </main>

      <Footer onNavigate={onNavigate} />
      <ModalSystem />
    </div>
  );
};
