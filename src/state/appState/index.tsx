
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User as FirebaseUser, onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../../firebase';
import { useNavigate } from 'react-router-dom';

interface AppState {
  currentUser: FirebaseUser | null;
  isLoggedIn: boolean;
  logout: () => Promise<void>;
  onNavigate: (page: string, options?: { replace?: boolean }) => void;
}

const AppStateContext = createContext<AppState | undefined>(undefined);

export const AppStateProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<FirebaseUser | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setIsLoggedIn(!!user);
    });
    return () => unsubscribe();
  }, []);

  const logout = async () => {
    try {
      await signOut(auth);
      navigate('/');
    } catch (err) {
      console.error('Error logging out:', err);
    }
  };

  const onNavigate = (page: string, options?: { replace?: boolean }) => {
    const pageToPath: Record<string, string> = {
      'home': '/',
      'collection': '/collection',
      'new-arrivals': '/new-arrivals',
      'product': '/product',
      'cart': '/cart',
      'profile': '/profile',
      'orders': '/orders',
      'privacy-policy': '/privacy',
      'terms-of-service': '/terms'
    };
    const path = pageToPath[page] || `/${page}`;
    navigate(path, { replace: options?.replace });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AppStateContext.Provider value={{ currentUser, isLoggedIn, logout, onNavigate }}>
      {children}
    </AppStateContext.Provider>
  );
};

export const useAppState = () => {
  const context = useContext(AppStateContext);
  if (!context) throw new Error('useAppState must be used within AppStateProvider');
  return context;
};
