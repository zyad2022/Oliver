import React from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { useUI, useCart, useAppState } from '../../state';;
import { AuthModal } from './AuthModal';
import { AuthRequiredModal } from './AuthRequiredModal';
import { DeleteAccount } from '../../pages/profile/DeleteAccount'; 
import { ProductPage } from '../../pages/product'; 
import { X } from 'lucide-react';
import { Product } from '../../data';

// Wrapper for all modals to ensure consistent styling
const ModalOverlay: React.FC<{ children: React.ReactNode; onClose: () => void }> = ({ children, onClose }) => {
  React.useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = 'unset'; };
  }, []);

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-md z-[100]"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-[#FAF8F5] sm:bg-white rounded-[32px] z-[110] shadow-2xl p-0 scrollbar-hide"
      >
        <button 
          onClick={onClose}
          className="absolute top-6 left-6 p-2 rounded-full bg-natural-bg border border-natural-border text-natural-text hover:bg-natural-accent hover:text-white transition-colors z-[120]"
        >
          <X size={20} />
        </button>
        {children}
      </motion.div>
    </>
  );
};

export const ModalSystem: React.FC = () => {
  const { activeModal, closeModal, setShouldOpenAuth } = useUI();
  const { addToCart } = useCart();
  const { onNavigate, isLoggedIn } = useAppState();;

  return (
    <AnimatePresence>
      {activeModal.type === 'auth' && (
        <AuthModal 
          isOpen={true} 
          onClose={closeModal} 
          onLogin={() => {
            closeModal();
            // App state handles the redirect if needed elsewhere
          }}
        />
      )}

      {activeModal.type === 'delete-account' && (
        <ModalOverlay onClose={closeModal}>
          <div className="p-4 sm:p-0">
            <DeleteAccount onNavigate={(page: string) => {
              closeModal();
              if (page !== 'profile') onNavigate(page);
            }} isModal={true} />
          </div>
        </ModalOverlay>
      )}

      {activeModal.type === 'auth-required' && (
        <ModalOverlay onClose={closeModal}>
          <AuthRequiredModal 
            onClose={closeModal} 
            onLogin={() => {
              closeModal();
              onNavigate('profile');
            }} 
          />
        </ModalOverlay>
      )}

      {activeModal.type === 'quick-add' && activeModal.data && (
        <ModalOverlay onClose={closeModal}>
          <ProductPage 
            product={activeModal.data as Product} 
            onAddToCart={(p, q) => {
              if (isLoggedIn) {
                addToCart(p, q);
                closeModal();
              } else {
                closeModal();
                setShouldOpenAuth(true);
                onNavigate('home');
              }
            }}
            isQuickAdd={true}
          />
        </ModalOverlay>
      )}
    </AnimatePresence>
  );
};
