
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Product } from '../../data';

interface ModalState {
  type: 'quick-add' | 'delete-account' | 'auth' | 'auth-required' | null;
  data?: any;
}

interface UIState {
  activeModal: ModalState;
  openModal: (type: ModalState['type'], data?: any) => void;
  closeModal: () => void;
  selectedProduct: Product | null;
  setSelectedProduct: (product: Product | null) => void;
  shouldOpenAuth: boolean;
  setShouldOpenAuth: (val: boolean) => void;
}

const UIContext = createContext<UIState | undefined>(undefined);

export const UIProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [activeModal, setActiveModal] = useState<ModalState>({ type: null });
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [lastScrollPos, setLastScrollPos] = useState(0);
  const [shouldOpenAuth, setShouldOpenAuth] = useState(false);

  const openModal = React.useCallback((type: ModalState['type'], data?: any) => {
    if (type) {
      setLastScrollPos(window.scrollY);
      document.body.style.overflow = 'hidden';
    }
    setActiveModal({ type, data });
  }, []);

  const closeModal = React.useCallback(() => {
    setActiveModal({ type: null });
    document.body.style.overflow = 'unset';
    setTimeout(() => {
      window.scrollTo({ top: lastScrollPos, behavior: 'auto' });
    }, 10);
  }, [lastScrollPos]);

  const value = React.useMemo(() => ({
    activeModal, 
    openModal, 
    closeModal, 
    selectedProduct, 
    setSelectedProduct,
    shouldOpenAuth,
    setShouldOpenAuth
  }), [activeModal, openModal, closeModal, selectedProduct, shouldOpenAuth]);

  return (
    <UIContext.Provider value={value}>
      {children}
    </UIContext.Provider>
  );
};

export const useUI = () => {
  const context = useContext(UIContext);
  if (!context) throw new Error('useUI must be used within UIProvider');
  return context;
};
