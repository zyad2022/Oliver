
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product, CartItem } from '../../data';
import { useAppState } from '../appState';
import { useUI } from '../uiState';
import { UI_CONSTANTS } from '../../constants';

interface CartState {
  cartItems: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  placeOrder: (paymentMethod: string) => Promise<void>;
}

const CartContext = createContext<CartState | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { isLoggedIn, currentUser } = useAppState();
  const { setShouldOpenAuth } = useUI();
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    // Initial hydration
    try {
      const saved = localStorage.getItem('oliver_cart_v1');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Persist cart items to localStorage
  useEffect(() => {
    localStorage.setItem('oliver_cart_v1', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = React.useCallback((product: Product, quantity: number = 1) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id 
            ? { ...item, cartQuantity: Math.min(UI_CONSTANTS.MAX_CART_QUANTITY, item.cartQuantity + quantity) } 
            : item
        );
      }
      return [...prev, { ...product, cartQuantity: Math.min(UI_CONSTANTS.MAX_CART_QUANTITY, Math.max(1, quantity)) }];
    });
  }, []);

  const removeFromCart = React.useCallback((productId: string) => {
    setCartItems(prev => prev.filter(item => item.id !== productId));
  }, []);

  const updateCartQuantity = React.useCallback((productId: string, quantity: number) => {
    setCartItems(prev => prev.map(item => 
      item.id === productId ? { ...item, cartQuantity: Math.max(1, Math.min(UI_CONSTANTS.MAX_CART_QUANTITY, quantity)) } : item
    ));
  }, []);

  const clearCart = React.useCallback(() => setCartItems([]), []);

  const placeOrder = React.useCallback(async (paymentMethod: string) => {
    if (!currentUser || cartItems.length === 0) return;

    try {
      clearCart();
    } catch (error) {
      console.error('Error placing order:', error);
    }
  }, [currentUser, cartItems, clearCart]);

  const value = React.useMemo(() => ({
    cartItems, addToCart, removeFromCart, updateCartQuantity, clearCart, placeOrder
  }), [cartItems, addToCart, removeFromCart, updateCartQuantity, clearCart, placeOrder]);

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within CartProvider');
  return context;
};
