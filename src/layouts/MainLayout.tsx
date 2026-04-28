import React, { ReactNode } from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { ModalSystem } from '../components/Modal';
import { useAppState, useCart, useUI } from '../state';;
import { useLocation, useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';

interface MainLayoutProps {
  children: ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isLoggedIn, currentUser, logout, onNavigate } = useAppState();
  const { cartItems } = useCart();
  const { openModal, setSelectedProduct, shouldOpenAuth, setShouldOpenAuth } = useUI();;

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
