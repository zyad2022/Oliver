import React, { useState, useRef, useEffect } from 'react';
import { ShoppingBag, Search, Menu, User, X, LogOut, Package, UserCircle } from 'lucide-react';
import { products, Product } from '../../data';
import { motion, AnimatePresence } from 'motion/react';

interface HeaderProps {
  cartCount: number;
  currentPage: string;
  onNavigate: (page: string, options?: { replace?: boolean }) => void;
  onProductClick?: (product: Product) => void;
  isLoggedIn: boolean;
  userEmail?: string;
  userName?: string;
  onOpenAuth: () => void;
  onLogout: () => void;
}

export function Header({ cartCount, currentPage, onNavigate, onProductClick, isLoggedIn, userEmail, userName, onOpenAuth, onLogout }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const searchToggleRef = useRef<HTMLButtonElement>(null);
  const searchDropdownRef = useRef<HTMLDivElement>(null);
  const accountToggleRef = useRef<HTMLButtonElement>(null);
  const accountMenuRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setIsSearchOpen(false);
    setSearchQuery('');
    setIsMobileMenuOpen(false);
    setIsAccountMenuOpen(false);
  }, [currentPage]);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setSearchResults([]);
    } else {
      const lowerQuery = searchQuery.toLowerCase();
      const filtered = products.filter(p => 
        p.name.toLowerCase().includes(lowerQuery) || 
        p.category.toLowerCase().includes(lowerQuery)
      );
      setSearchResults(filtered);
    }
  }, [searchQuery]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Node;
      
      // Search click outside
      const isDropdownClick = searchDropdownRef.current?.contains(target);
      const isSearchToggleClick = searchToggleRef.current?.contains(target);

      if (!isDropdownClick && !isSearchToggleClick) {
        setIsSearchOpen(false);
      }

      // Account menu click outside
      const isAccountMenuClick = accountMenuRef.current?.contains(target);
      const isAccountToggleClick = accountToggleRef.current?.contains(target);

      if (!isAccountMenuClick && !isAccountToggleClick) {
        setIsAccountMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleNav = (page: string) => {
    setIsSearchOpen(false);
    setSearchQuery('');
    setIsMobileMenuOpen(false);
    setIsAccountMenuOpen(false);
    onNavigate(page);
  };

  useEffect(() => {
    if (isSearchOpen && inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [isSearchOpen]);

  const handleProductSelect = (product: Product) => {
    setIsSearchOpen(false);
    setSearchQuery('');
    if (onProductClick) {
      onProductClick(product);
    }
  };

  const getNavItemClass = (page: string) => {
    const isActive = currentPage === page;
    return `backdrop-blur-md px-6 py-2.5 rounded-full transition-all duration-500 ease-in-out text-sm font-medium border shadow-sm ${
      isActive 
        ? 'bg-[#D4AF37]/15 border-[#D4AF37]/30 text-stone-900 shadow-[inset_0_0_20px_rgba(212,175,55,0.15)]' 
        : 'bg-white/50 border-white/50 text-stone-700 hover:text-stone-900 hover:bg-[#D4AF37]/15 hover:border-[#D4AF37]/30 hover:shadow-[inset_0_0_20px_rgba(212,175,55,0.15)]'
    }`;
  };

  const getIconClass = (isActive: boolean = false, extraClasses: string = '') => {
    return `backdrop-blur-md w-11 h-11 rounded-full flex items-center justify-center transition-all duration-500 ease-in-out border shadow-sm relative ${extraClasses} ${
      isActive
        ? 'bg-[#D4AF37]/15 border-[#D4AF37]/30 text-stone-900 shadow-[inset_0_0_20px_rgba(212,175,55,0.15)]'
        : 'bg-white/50 border-white/50 text-stone-700 hover:text-stone-900 hover:bg-[#D4AF37]/15 hover:border-[#D4AF37]/30 hover:shadow-[inset_0_0_20px_rgba(212,175,55,0.15)]'
    }`;
  };

  const logoClass = `flex flex-none justify-center items-center cursor-pointer relative z-50 mx-4 backdrop-blur-md px-8 py-2.5 rounded-full transition-all duration-500 ease-in-out border shadow-sm ${
    currentPage === 'home'
      ? 'bg-[#D4AF37]/15 border-[#D4AF37]/30 text-stone-900 shadow-[inset_0_0_20px_rgba(212,175,55,0.15)]'
      : 'bg-white/70 border-white/60 text-stone-900 hover:bg-[#D4AF37]/15 hover:border-[#D4AF37]/30 hover:shadow-[inset_0_0_20px_rgba(212,175,55,0.15)]'
  }`;

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-[#D4AF37]/20 relative shadow-sm">
      {/* Semi-transparent blur backing allowing full continuous canvas bleeding from body */}
      <div className="absolute inset-0 z-0 overflow-hidden bg-white/40 backdrop-blur-md">
        {/* Subtle local pattern mixed into the glassmorphism */}
        <div className="luxury-navbar-pattern absolute inset-[-100px] pointer-events-none opacity-40 mix-blend-multiply" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex justify-between items-center h-20">
          
          {/* Mobile Menu Button */}
          <div className="flex items-center justify-start flex-1 sm:hidden">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={getIconClass(false)}
            >
              <Menu size={24} />
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden sm:flex items-center justify-start gap-3 flex-1 font-arabic">
            <button 
              onClick={() => handleNav('home')} 
              className={getNavItemClass('home')}
            >
              الرئيسية
            </button>
            <button 
              onClick={() => handleNav('collection')} 
              className={getNavItemClass('collection')}
            >
              التشكيلات
            </button>
            <button 
              onClick={() => handleNav('new-arrivals')} 
              className={getNavItemClass('new-arrivals')}
            >
             حديثا
            </button>
            <button 
              onClick={() => handleNav('reviews')} 
              className={getNavItemClass('reviews')}
            >
              العملاء
            </button>
          </div>

          {/* Logo */}
          <div 
            className={logoClass} 
            onClick={() => handleNav('home')}
          >
            <h1 className="text-3xl tracking-widest font-serif text-stone-900 uppercase en-title leading-none">Oliver</h1>
          </div>

          {/* Icons & Search Toggle */}
          <div className="flex items-center justify-end gap-3 flex-1 relative z-50">
            <button 
              ref={searchToggleRef}
              onClick={() => {
                setIsSearchOpen(!isSearchOpen);
                if (isSearchOpen) setSearchQuery('');
              }} 
              className={getIconClass(false, 'hidden sm:flex')}
            >
              {isSearchOpen ? <X size={20} strokeWidth={1.5} /> : <Search size={20} strokeWidth={1.5} />}
            </button>
            <div className="relative z-50">
              <button 
                ref={accountToggleRef}
                className={getIconClass(false, 'hidden sm:flex')}
                onClick={() => {
                  if (isLoggedIn) {
                    setIsAccountMenuOpen(!isAccountMenuOpen);
                  } else {
                    onOpenAuth();
                  }
                }}
              >
                <User size={20} strokeWidth={1.5} />
              </button>
              
              {/* Account Dropdown Menu */}
              <AnimatePresence>
                {isLoggedIn && isAccountMenuOpen && (
                  <motion.div
                    ref={accountMenuRef}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-12 left-0 w-48 bg-white border border-natural-border shadow-xl rounded-2xl overflow-hidden py-2"
                  >
                    <div className="px-4 py-3 border-b border-natural-border/50 mb-2 w-full text-right" dir="rtl">
                      <p className="text-sm font-medium text-natural-text font-arabic w-full block" style={{ textAlign: 'right' }}>
                        {userName ? `مرحباً ${userName}` : 'مرحباً'}
                      </p>
                      <p className="text-xs text-natural-secondary-text font-arabic truncate mt-1 w-full block" dir="ltr" style={{ textAlign: 'right' }}>
                        {userEmail || ''}
                      </p>
                    </div>
                    <button 
                      onClick={() => { setIsAccountMenuOpen(false); handleNav('profile'); }}
                      className="w-full text-left px-4 py-2 hover:bg-natural-bg transition-colors flex items-center gap-3 text-sm text-natural-text font-arabic"
                    >
                      <UserCircle size={18} strokeWidth={1.5} />
                      حسابي
                    </button>

                    <div className="h-px bg-natural-border/50 my-2"></div>
                    <button 
                      onClick={() => { setIsAccountMenuOpen(false); onLogout(); }}
                      className="w-full text-left px-4 py-2 hover:bg-red-50 transition-colors flex items-center gap-3 text-sm text-red-600 font-arabic"
                    >
                      <LogOut size={18} strokeWidth={1.5} />
                      تسجيل الخروج
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <button 
              className={getIconClass(currentPage === 'cart', 'flex')}
              onClick={() => {
                handleNav('cart');
              }}
            >
              <ShoppingBag size={20} strokeWidth={1.5} />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-black text-[#D4AF37] text-[10px] en-text font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-md">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Search Bar Dropdown */}
        <AnimatePresence>
          {isSearchOpen && (
            <motion.div 
              ref={searchDropdownRef}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="absolute top-20 left-0 w-full bg-white border-b border-natural-border shadow-xl z-40 px-4 py-8 sm:px-6 lg:px-8 origin-top overflow-hidden"
            >
              <div className="max-w-3xl mx-auto">
                <div className="relative flex items-center w-full">
                  <Search size={20} className="absolute right-6 text-[#AAA] pointer-events-none" />
                  <input 
                    ref={inputRef}
                    type="text" 
                    dir="auto"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="ابحثي عن القلائد، الخواتم..." 
                    className="w-full bg-natural-bg border border-natural-border rounded-full py-4 pr-14 pl-14 text-lg outline-none focus:border-stone-900 focus:bg-white focus:shadow-md transition-all duration-300 shadow-sm text-natural-text placeholder:text-natural-secondary-text font-arabic placeholder:font-arabic"
                  />
                  {searchQuery && (
                    <button 
                      onClick={() => setSearchQuery('')}
                      className="absolute left-6 text-natural-secondary-text hover:text-natural-accent transition-colors"
                    >
                      <X size={18} />
                    </button>
                  )}
                </div>

                {/* Search Results */}
                {searchQuery.trim() !== '' && (
                  <div className="mt-8 max-h-[50vh] overflow-y-auto pr-2 custom-scrollbar">
                    {searchResults.length > 0 ? (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {searchResults.map(product => (
                          <div 
                            key={product.id} 
                            className="flex items-center gap-4 p-3 hover:bg-natural-bg rounded-xl cursor-pointer transition-colors border border-transparent hover:border-natural-border"
                            onClick={() => handleProductSelect(product)}
                          >
                            <img 
                              src={product.listingImage} 
                              alt={product.name} 
                              className="w-16 h-16 object-cover rounded-lg bg-natural-img"
                              onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&q=80&w=800'; }}
                            />
                            <div>
                              <h4 className="en-title text-natural-text text-base">{product.name}</h4>
                              <p className="en-text text-natural-accent text-sm font-bold mt-1">{product.price} EGP</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-center text-[#666] py-12">عذراً، لم نجد نتائج مطابقة لبحثك عن "{searchQuery}".</p>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-[#FAF8F5] sm:hidden flex flex-col p-6 overflow-y-auto"
          >
            <div className="flex justify-between items-center mb-10">
              <h1 className="text-2xl tracking-widest font-serif text-stone-900 uppercase en-title">Oliver</h1>
              <button 
                onClick={() => setIsMobileMenuOpen(false)}
                className="bg-white p-2 rounded-full shadow-sm"
              >
                <X size={20} className="text-stone-600" />
              </button>
            </div>
            
            {/* Mobile Search */}
            <div className="relative mb-8 z-50">
              <div className="relative flex items-center w-full">
                <Search size={20} className="absolute right-4 text-[#AAA] pointer-events-none" />
                <input 
                  type="text" 
                  dir="auto"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="ابحثي..." 
                  className="w-full bg-natural-bg border border-natural-border rounded-full py-3 pr-12 pl-4 text-base outline-none focus:border-stone-900 focus:bg-white focus:shadow-md transition-all duration-300 shadow-sm text-natural-text placeholder:text-natural-secondary-text font-arabic"
                />
              </div>
              {searchQuery.trim() !== '' && (
                <div className="absolute top-14 left-0 w-full bg-white shadow-lg border border-natural-border rounded-2xl max-h-[50vh] overflow-y-auto z-50 p-3">
                  {searchResults.length > 0 ? (
                    searchResults.map(product => (
                      <div 
                        key={product.id} 
                        className="flex items-center gap-4 p-2 hover:bg-natural-bg rounded-xl cursor-pointer mb-2 last:mb-0"
                        onClick={() => handleProductSelect(product)}
                      >
                        <img 
                          src={product.listingImage} 
                          alt={product.name} 
                          className="w-14 h-14 object-cover rounded-md"
                        />
                        <div>
                          <h4 className="en-title text-sm">{product.name}</h4>
                          <p className="en-text text-natural-accent text-xs font-bold mt-1">{product.price} EGP</p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-center text-[#666] py-6 text-sm">لا توجد نتائج</p>
                  )}
                </div>
              )}
            </div>

            <div className="flex flex-col gap-6 text-lg text-stone-800 border-t border-natural-border pt-8 font-arabic">
              <button onClick={() => handleNav('home')} className="text-right flex items-center justify-between group">
                الرئيسية
              </button>
              <button onClick={() => handleNav('collection')} className="text-right flex items-center justify-between group">
                التشكيلات كاملة
              </button>
              <button onClick={() => handleNav('new-arrivals')} className="text-right flex items-center justify-between group">
                حديثا
              </button>
              <button onClick={() => handleNav('reviews')} className="text-right flex items-center justify-between group">
                العملاء
              </button>
            </div>
            {/* Mobile Actions */}
            <div className="flex flex-col gap-6 text-lg text-stone-800 border-t border-natural-border pt-8 mt-4 font-arabic">
              {isLoggedIn && (
                <>
                  <button onClick={() => { setIsMobileMenuOpen(false); handleNav('profile'); }} className="text-right flex items-center justify-between group">
                    إعدادات الحساب
                  </button>

                </>
              )}
              <button 
                onClick={() => {
                  if (isLoggedIn) {
                    onLogout();
                    setIsMobileMenuOpen(false);
                  } else {
                    onOpenAuth();
                    setIsMobileMenuOpen(false);
                  }
                }}
                className={`text-right flex items-center gap-3 group ${isLoggedIn ? 'text-red-500' : 'text-natural-accent'}`}
              >
                {isLoggedIn ? <LogOut size={18} /> : <User size={18} />}
                {isLoggedIn ? 'تسجيل الخروج' : 'تسجيل الدخول'}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
