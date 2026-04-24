
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User as FirebaseUser, onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../../firebase';
import { useNavigate } from 'react-router-dom';

interface AppState {
  currentUser: FirebaseUser | null;
  isLoggedIn: boolean;
  logout: () => Promise<void>;
  onNavigate: (page: string, options?: { replace?: boolean }) => void;
  prevPage: string | null;
}

const AppStateContext = createContext<AppState | undefined>(undefined);

export const AppStateProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<FirebaseUser | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [prevPage, setPrevPage] = useState<string | null>(null);
  const [navHistory, setNavHistory] = useState<{ path: string; scroll: number }[]>([]);
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
      'about': '/about',
      'rate': '/rate',
      'faq': '/faq',
      'contact': '/contact',
      'returns': '/returns',
      'shipping': '/shipping',
      'size-guide': '/size-guide',
      'jewelry-care': '/jewelry-care',
      'product': '/product',
      'reviews': '/reviews',
      'cart': '/cart',
      'profile': '/profile',
      'orders': '/orders',
      'checkout': '/checkout',
      'privacy-policy': '/privacy',
      'terms-of-service': '/terms'
    };

    const currentPath = window.location.pathname;

    if (page === 'back') {
      if (navHistory.length > 0) {
        const lastEntry = navHistory[navHistory.length - 1];
        setNavHistory(prev => prev.slice(0, -1));
        
        navigate(lastEntry.path, { replace: options?.replace });
        
        // Restore scroll with sanity check
        setTimeout(() => {
          // Heuristic: if stored scroll is extremely deep (likely footer-related), reset to top
          const finalScroll = lastEntry.scroll > 10000 ? 0 : lastEntry.scroll;
          window.scrollTo({ top: finalScroll, behavior: 'smooth' });
        }, 150);
      } else {
        navigate('/', { replace: options?.replace });
        window.scrollTo({ top: 0, behavior: 'instant' });
      }
      return;
    }

    const path = pageToPath[page] || `/${page}`;

    // 1. PREVENT SELF-NAVIGATION LOOP
    if (path === currentPath) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    // 2. SMART SCROLL SAVE & STACK MANAGEMENT
    setNavHistory(prev => {
      // Don't add duplicate entries in sequence
      if (prev.length > 0 && prev[prev.length - 1].path === currentPath) {
        return prev;
      }
      return [...prev, { path: currentPath, scroll: window.scrollY }];
    });
    
    // Determine page name from current path for prevPage tracking
    const pathToPage = Object.entries(pageToPath).find(([_, p]) => p === currentPath)?.[0] || 'home';
    setPrevPage(pathToPage);

    navigate(path, { replace: options?.replace });
    
    // 3. RESET SCROLL ON NEW PAGE ENTRY (Instant)
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  return (
    <AppStateContext.Provider value={{ currentUser, isLoggedIn, logout, onNavigate, prevPage }}>
      {children}
    </AppStateContext.Provider>
  );
};

export const useAppState = () => {
  const context = useContext(AppStateContext);
  if (!context) throw new Error('useAppState must be used within AppStateProvider');
  return context;
};
