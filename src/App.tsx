import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { Collection } from './pages/Collection';
import { NewArrivals } from './pages/NewArrivals';
import { ProductPage } from './pages/ProductPage';
import { Cart } from './pages/Cart';
import { Profile } from './pages/Profile';
import { Orders } from './pages/Orders';
import { DeleteAccount } from './pages/DeleteAccount';
import { PrivacyPolicy } from './pages/PrivacyPolicy';
import { TermsOfService } from './pages/TermsOfService';
import { Product } from './data';
import { AnimatePresence } from 'motion/react';
import { AuthModal } from './components/AuthModal';
import { auth } from './firebase';
import { onAuthStateChanged, signOut, User } from 'firebase/auth';

function AppContent() {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
        setCurrentUser(user);
      } else {
        setIsLoggedIn(false);
        setCurrentUser(null);
        if (location.pathname === '/profile') {
          navigate('/');
        }
      }
    });

    return () => unsubscribe();
  }, [location.pathname, navigate]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/');
    } catch (err) {
      console.error('Error logging out:', err);
    }
  };

  const handleNavigate = (page: string) => {
    const pageToPath: Record<string, string> = {
      'home': '/',
      'collection': '/collection',
      'new-arrivals': '/new-arrivals',
      'product': '/product',
      'cart': '/cart',
      'profile': '/profile',
      'orders': '/orders',
      'delete-account': '/delete-account',
      'privacy-policy': '/privacy',
      'terms-of-service': '/terms'
    };
    const path = pageToPath[page] || `/${page}`;
    navigate(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    navigate('/product');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAddToCart = (product: Product) => {
    setCartItems(prev => [...prev, product]);
    navigate('/cart');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRemoveFromCart = (index: number) => {
    setCartItems(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen flex flex-col font-arabic">
      <Navbar 
        cartCount={cartItems.length} 
        currentPage={location.pathname === '/' ? 'home' : location.pathname.substring(1)} 
        onNavigate={handleNavigate} 
        onProductClick={handleProductClick}
        isLoggedIn={isLoggedIn}
        userEmail={currentUser?.email || undefined}
        userName={currentUser?.displayName || undefined}
        onOpenAuth={() => setIsAuthModalOpen(true)}
        onLogout={handleLogout}
      />
      
      <main className="flex-grow flex w-full">
        <AnimatePresence mode="wait">
          <Routes location={location}>
            <Route path="/" element={<Home onNavigate={handleNavigate} onProductClick={handleProductClick} />} />
            <Route path="/collection" element={<Collection onProductClick={handleProductClick} />} />
            <Route path="/new-arrivals" element={<NewArrivals onProductClick={handleProductClick} />} />
            <Route path="/product" element={
              selectedProduct ? (
                <ProductPage 
                  product={selectedProduct} 
                  onAddToCart={handleAddToCart} 
                  onNavigate={handleNavigate} 
                />
              ) : (
                <Home onNavigate={handleNavigate} onProductClick={handleProductClick} />
              )
            } />
            <Route path="/cart" element={
              <Cart 
                cartItems={cartItems} 
                onNavigate={handleNavigate} 
                onRemove={handleRemoveFromCart} 
              />
            } />
            <Route path="/profile" element={
              isLoggedIn ? (
                <Profile 
                  user={currentUser} 
                  onLogout={handleLogout}
                  onNavigate={handleNavigate}
                />
              ) : (
                <Home onNavigate={handleNavigate} onProductClick={handleProductClick} />
              )
            } />
            <Route path="/orders" element={
              isLoggedIn ? (
                <Orders 
                  user={currentUser} 
                  onNavigate={handleNavigate} 
                />
              ) : (
                <Home onNavigate={handleNavigate} onProductClick={handleProductClick} />
              )
            } />
            <Route path="/delete-account" element={<DeleteAccount onNavigate={handleNavigate} />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<TermsOfService />} />
            {/* Fallback for old paths or typos */}
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-of-service" element={<TermsOfService />} />
          </Routes>
        </AnimatePresence>
      </main>

      <Footer onNavigate={handleNavigate} />

      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
        onLogin={() => {
          setIsAuthModalOpen(false);
          navigate('/profile');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }} 
      />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}


