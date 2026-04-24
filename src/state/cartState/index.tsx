
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product, CartItem } from '../../data';
import { useAppState } from '../appState';
import { useUI } from '../uiState';
import { db, handleFirestoreError } from '../../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

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
  const { isLoggedIn, currentUser, onNavigate } = useAppState();
  const { openModal, setShouldOpenAuth } = useUI();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Clear cart on logout
  useEffect(() => {
    if (!isLoggedIn) {
      setCartItems([]);
      // Clear all possible cart storage keys including user-specific ones
      Object.keys(sessionStorage).forEach(key => {
        if (key.startsWith('oliver_cart')) {
          sessionStorage.removeItem(key);
        }
      });
    } else if (currentUser) {
      // Initialize cart for logged in user if there's any saved data for THIS user
      const saved = sessionStorage.getItem(`oliver_cart_${currentUser.uid}`);
      if (saved) {
        setCartItems(JSON.parse(saved));
      } else {
        setCartItems([]);
      }
    }
  }, [isLoggedIn, currentUser]);

  // Persist cart items but only for the specific user
  useEffect(() => {
    if (isLoggedIn && currentUser) {
      sessionStorage.setItem(`oliver_cart_${currentUser.uid}`, JSON.stringify(cartItems));
    }
  }, [cartItems, isLoggedIn, currentUser]);

  const addToCart = (product: Product, quantity: number = 1) => {
    if (!isLoggedIn) {
      setShouldOpenAuth(true);
      onNavigate('home');
      return;
    }

    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id 
            ? { ...item, cartQuantity: item.cartQuantity + quantity } 
            : item
        );
      }
      return [...prev, { ...product, cartQuantity: quantity }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCartItems(prev => prev.filter(item => item.id !== productId));
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    setCartItems(prev => prev.map(item => 
      item.id === productId ? { ...item, cartQuantity: Math.max(1, Math.min(10, quantity)) } : item
    ));
  };

  const clearCart = () => setCartItems([]);

  const placeOrder = async (paymentMethod: string) => {
    if (!currentUser || cartItems.length === 0) return;

    try {
      const orderData = {
        userId: currentUser.uid,
        items: cartItems.map(item => ({
          productId: item.id,
          productName: item.name,
          productImage: item.listingImage,
          price: item.price,
          quantity: item.cartQuantity,
          totalPrice: item.price * item.cartQuantity
        })),
        totalItems: cartItems.length,
        subtotal: cartItems.reduce((acc, item) => acc + (item.price * item.cartQuantity), 0),
        totalPrice: cartItems.reduce((acc, item) => acc + (item.price * item.cartQuantity), 0) + (cartItems.reduce((acc, item) => acc + (item.price * item.cartQuantity), 0) >= 1000 ? 0 : 50),
        paymentMethod: paymentMethod,
        status: 'pending',
        createdAt: serverTimestamp(),
      };

      await addDoc(collection(db, 'users', currentUser.uid, 'orders'), orderData);
      clearCart();
    } catch (error) {
      console.error('Error placing order:', error);
      handleFirestoreError(error, 'create', `users/${currentUser.uid}/orders`);
    }
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateCartQuantity, clearCart, placeOrder }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within CartProvider');
  return context;
};
