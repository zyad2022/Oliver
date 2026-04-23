
import React, { createContext, useContext, ReactNode } from 'react';
import { CartProvider, useCart } from './cartState';
import { UIProvider, useUI } from './uiState';
import { AppStateProvider, useAppState } from './appState';

const AppContext = createContext<any>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <AppStateProvider>
      <UIProvider>
        <CartProvider>
          <AppContextWrapper>{children}</AppContextWrapper>
        </CartProvider>
      </UIProvider>
    </AppStateProvider>
  );
};

const AppContextWrapper: React.FC<{ children: ReactNode }> = ({ children }) => {
  const cart = useCart();
  const ui = useUI();
  const app = useAppState();

  return (
    <AppContext.Provider value={{ ...cart, ...ui, ...app }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useAppContext must be used within AppProvider');
  return context;
};
