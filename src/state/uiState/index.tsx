
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

  const openModal = (type: ModalState['type'], data?: any) => {
    if (type) {
      setLastScrollPos(window.scrollY);
    }
    setActiveModal({ type, data });
  };

  const closeModal = () => {
    setActiveModal({ type: null });
    setTimeout(() => {
      window.scrollTo({ top: lastScrollPos, behavior: 'instant' });
    }, 10);
  };

  return (
    <UIContext.Provider value={{ 
      activeModal, 
      openModal, 
      closeModal, 
      selectedProduct, 
      setSelectedProduct,
      shouldOpenAuth,
      setShouldOpenAuth
    }}>
      {children}
    </UIContext.Provider>
  );
};

export const useUI = () => {
  const context = useContext(UIContext);
  if (!context) throw new Error('useUI must be used within UIProvider');
  return context;
};
