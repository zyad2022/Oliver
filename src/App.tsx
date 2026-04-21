import React, { useState, useEffect } from 'react';
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
import { Product } from './data';
import { AnimatePresence } from 'motion/react';
import { AuthModal } from './components/AuthModal';
import { auth } from './firebase';
import { onAuthStateChanged, signOut, User } from 'firebase/auth';

type Page = 'home' | 'collection' | 'new-arrivals' | 'product' | 'cart' | 'profile' | 'orders' | 'delete-account';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
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
        if (currentPage === 'profile') {
          setCurrentPage('home');
        }
      }
    });

    return () => unsubscribe();
  }, [currentPage]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.error('Error logging out:', err);
    }
  };

  const handleNavigate = (page: string) => {
    setCurrentPage(page as Page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setCurrentPage('product');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAddToCart = (product: Product) => {
    setCartItems(prev => [...prev, product]);
    setCurrentPage('cart');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRemoveFromCart = (index: number) => {
    setCartItems(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen flex flex-col font-arabic">
      <Navbar 
        cartCount={cartItems.length} 
        currentPage={currentPage} 
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
          {currentPage === 'home' && (
            <Home key="home" onNavigate={handleNavigate} onProductClick={handleProductClick} />
          )}
          {currentPage === 'collection' && (
            <Collection key="collection" onProductClick={handleProductClick} />
          )}
          {currentPage === 'new-arrivals' && (
            <NewArrivals key="new-arrivals" onProductClick={handleProductClick} />
          )}
          {currentPage === 'product' && selectedProduct && (
            <ProductPage 
              key="product" 
              product={selectedProduct} 
              onAddToCart={handleAddToCart} 
              onNavigate={handleNavigate} 
            />
          )}
          {currentPage === 'cart' && (
            <Cart 
              key="cart" 
              cartItems={cartItems} 
              onNavigate={handleNavigate} 
              onRemove={handleRemoveFromCart} 
            />
          )}
          {currentPage === 'profile' && isLoggedIn && (
            <Profile 
              key="profile" 
              user={currentUser} 
              onLogout={handleLogout}
              onNavigate={handleNavigate}
            />
          )}
          {currentPage === 'orders' && isLoggedIn && (
            <Orders 
              key="orders" 
              user={currentUser} 
              onNavigate={handleNavigate} 
            />
          )}
          {currentPage === 'delete-account' && isLoggedIn && (
            <DeleteAccount 
              key="delete-account" 
              onNavigate={handleNavigate} 
            />
          )}
        </AnimatePresence>
      </main>

      <Footer />

      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
        onLogin={() => {
          setIsAuthModalOpen(false);
          // Redirect to profile or home
          setCurrentPage('profile');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }} 
      />
    </div>
  );
}

