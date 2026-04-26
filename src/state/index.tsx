
import React, { ReactNode } from 'react';
import { CartProvider } from './cartState';
import { UIProvider } from './uiState';
import { AppStateProvider } from './appState';

export { useCart } from './cartState';
export { useUI } from './uiState';
export { useAppState } from './appState';

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <AppStateProvider>
      <UIProvider>
        <CartProvider>
          {children}
        </CartProvider>
      </UIProvider>
    </AppStateProvider>
  );
};
