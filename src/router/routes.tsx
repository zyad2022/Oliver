import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useAppState, useUI, useCart } from '../state';
import { RedirectToHome } from '../components/RedirectToHome';

const Home = lazy(() => import('../pages/home').then(m => ({ default: m.Home })));
const Collection = lazy(() => import('../pages/collections').then(m => ({ default: m.Collection })));
const NewArrivals = lazy(() => import('../pages/new-arrivals').then(m => ({ default: m.NewArrivals })));
const ProductPage = lazy(() => import('../pages/product').then(m => ({ default: m.ProductPage })));
const Cart = lazy(() => import('../pages/cart').then(m => ({ default: m.Cart })));
const Profile = lazy(() => import('../pages/profile').then(m => ({ default: m.Profile })));
const Checkout = lazy(() => import('../pages/checkout').then(m => ({ default: m.Checkout })));
const PrivacyPolicy = lazy(() => import('../pages/privacy').then(m => ({ default: m.PrivacyPolicy })));
const TermsOfService = lazy(() => import('../pages/terms').then(m => ({ default: m.TermsOfService })));
const About = lazy(() => import('../pages/about').then(m => ({ default: m.About })));
const Rate = lazy(() => import('../pages/rate').then(m => ({ default: m.Rate })));
const Reviews = lazy(() => import('../pages/reviews').then(m => ({ default: m.Reviews })));
const FAQ = lazy(() => import('../pages/faq').then(m => ({ default: m.FAQ })));
const Contact = lazy(() => import('../pages/contact').then(m => ({ default: m.Contact })));
const Returns = lazy(() => import('../pages/returns').then(m => ({ default: m.Returns })));
const SizeGuide = lazy(() => import('../pages/size-guide').then(m => ({ default: m.SizeGuide })));
const JewelryCare = lazy(() => import('../pages/jewelry-care').then(m => ({ default: m.JewelryCare })));

const Loader = () => (
  <div className="min-h-[60vh] flex items-center justify-center">
    <div className="w-10 h-10 border-4 border-gold-primary border-t-transparent rounded-full animate-spin"></div>
  </div>
);

const AuthRoute: React.FC<{ element: React.ReactNode }> = ({ element }) => {
  const { isLoggedIn, isAuthLoaded } = useAppState();
  if (!isAuthLoaded) return <Loader />;
  if (!isLoggedIn) return <RedirectToHome />;
  return <>{element}</>;
};

export const AppRoutes: React.FC = () => {
  const { isLoggedIn } = useAppState();
  const { selectedProduct } = useUI();
  const { cartItems, addToCart, removeFromCart, updateCartQuantity } = useCart();

  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/collection" element={<Collection />} />
        <Route path="/new-arrivals" element={<NewArrivals />} />
        <Route path="/about" element={<About />} />
        <Route path="/rate" element={<Rate />} />
        <Route path="/reviews" element={<Reviews />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/returns" element={<Returns />} />
        <Route path="/size-guide" element={<SizeGuide />} />
        <Route path="/jewelry-care" element={<JewelryCare />} />
        <Route path="/product" element={
          <ProductPage 
            product={selectedProduct || undefined} 
            onAddToCart={addToCart} 
          />
        } />
        <Route path="/cart" element={
          <Cart 
            cartItems={cartItems} 
            onRemove={removeFromCart}
            onUpdateQuantity={updateCartQuantity}
          />
        } />
        <Route path="/profile" element={<AuthRoute element={<Profile />} />} />
        <Route path="/orders" element={<RedirectToHome />} />
        <Route path="/checkout" element={<AuthRoute element={<Checkout />} />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<TermsOfService />} />
        <Route path="*" element={<RedirectToHome />} />
      </Routes>
    </Suspense>
  );
};
