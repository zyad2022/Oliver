import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Home } from '../pages/home';
import { Collection } from '../pages/collections';
import { NewArrivals } from '../pages/new-arrivals';
import { ProductPage } from '../pages/product';
import { Cart } from '../pages/cart';
import { Profile } from '../pages/profile';
import { Orders } from '../pages/orders';
import { PrivacyPolicy } from '../pages/privacy';
import { TermsOfService } from '../pages/terms';
import { About } from '../pages/about';
import { Rate } from '../pages/rate';
import { Reviews } from '../pages/reviews';
import { FAQ } from '../pages/faq';
import { Contact } from '../pages/contact';
import { Returns } from '../pages/returns';
import { Shipping } from '../pages/shipping';
import { SizeGuide } from '../pages/size-guide';
import { JewelryCare } from '../pages/jewelry-care';
import { useAppContext } from '../state';

export const AppRoutes: React.FC = () => {
  const { 
    isLoggedIn, 
    currentUser, 
    selectedProduct,
    addToCart,
    removeFromCart,
    updateCartQuantity
  } = useAppContext();

  // Navigation handlers are managed by MainLayout/Header
  // These props are passed down to pages where necessary
  // In a real production app, we would use a more robust routing solution with protected routes

  return (
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
      <Route path="/shipping" element={<Shipping />} />
      <Route path="/size-guide" element={<SizeGuide />} />
      <Route path="/jewelry-care" element={<JewelryCare />} />
      <Route path="/product" element={
        selectedProduct ? (
          <ProductPage 
            product={selectedProduct} 
            onAddToCart={addToCart} 
          />
        ) : (
          <Home />
        )
      } />
      <Route path="/cart" element={
        <Cart 
          cartItems={useAppContext().cartItems} 
          onRemove={removeFromCart}
          onUpdateQuantity={updateCartQuantity}
        />
      } />
      <Route path="/profile" element={
        isLoggedIn ? <Profile /> : <Home />
      } />
      <Route path="/orders" element={
        isLoggedIn ? (
          <Orders />
        ) : (
          <Home />
        )
      } />
      <Route path="/privacy" element={<PrivacyPolicy />} />
      <Route path="/terms" element={<TermsOfService />} />
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      <Route path="/terms-of-service" element={<TermsOfService />} />
    </Routes>
  );
};
