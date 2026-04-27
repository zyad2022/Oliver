
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User as FirebaseUser, onAuthStateChanged, signOut, getRedirectResult } from 'firebase/auth';
import { auth, db } from '../../firebase';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
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
    // Handle redirect result from Google login
    const handleRedirectResult = async () => {
      try {
        const result = await getRedirectResult(auth);
        if (result?.user) {
          // Save Google user to Firestore if they don't exist
          const userDocRef = doc(db, 'users', result.user.uid);
          const userDoc = await getDoc(userDocRef);
          
          if (!userDoc.exists()) {
            await setDoc(userDocRef, {
              uid: result.user.uid,
              name: result.user.displayName || 'مستخدم جديد',
              email: result.user.email || '',
              createdAt: serverTimestamp()
            });
          }
        }
      } catch (error) {
        console.error('Error handling redirect result:', error);
      }
    };
    handleRedirectResult();

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setIsLoggedIn(!!user);
    });
    return () => unsubscribe();
  }, []);

  const logout = React.useCallback(async () => {
    try {
      await signOut(auth);
      navigate('/');
    } catch (err) {
      console.error('Error logging out:', err);
    }
  }, [navigate]);

  const onNavigate = React.useCallback((page: string, options?: { replace?: boolean }) => {
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
  }, [navigate, navHistory]);

  const value = React.useMemo(() => ({
    currentUser, isLoggedIn, logout, onNavigate, prevPage
  }), [currentUser, isLoggedIn, logout, onNavigate, prevPage]);

  return (
    <AppStateContext.Provider value={value}>
      {children}
    </AppStateContext.Provider>
  );
};

export const useAppState = () => {
  const context = useContext(AppStateContext);
  if (!context) throw new Error('useAppState must be used within AppStateProvider');
  return context;
};
