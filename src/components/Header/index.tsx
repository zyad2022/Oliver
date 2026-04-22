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

  return (
    <nav className="sticky top-0 z-50 w-full bg-natural-card border-b border-natural-accent-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex justify-between items-center h-20">
          
          {/* Mobile Menu Button */}
          <div className="flex items-center sm:hidden">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-stone-600 hover:text-stone-900"
            >
              <Menu size={24} />
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden sm:flex items-center gap-3 w-1/3 font-arabic">
            <button 
              onClick={() => handleNav('home')} 
              className="bg-[#F2EEE6] px-6 py-2 rounded-full text-stone-600 hover:text-stone-900 hover:bg-[#EBE5DB] transition-colors duration-300 ease-in-out text-sm font-medium"
            >
              الرئيسية
            </button>
            <button 
              onClick={() => handleNav('collection')} 
              className="bg-[#F2EEE6] px-6 py-2 rounded-full text-stone-600 hover:text-stone-900 hover:bg-[#EBE5DB] transition-colors duration-300 ease-in-out text-sm font-medium"
            >
              التشكيلات
            </button>
            <button 
              onClick={() => handleNav('new-arrivals')} 
              className="bg-[#F2EEE6] px-6 py-2 rounded-full text-stone-600 hover:text-stone-900 hover:bg-[#EBE5DB] transition-colors duration-300 ease-in-out text-sm font-medium"
            >
              وصل حديثاً
            </button>
          </div>

          {/* Logo */}
          <div className="flex flex-1 justify-center cursor-pointer relative z-50" onClick={() => handleNav('home')}>
            <h1 className="text-3xl tracking-widest font-serif text-stone-900 uppercase en-title">Oliver</h1>
          </div>

          {/* Icons & Search Toggle */}
          <div className="flex items-center justify-end gap-3 w-1/3 relative z-50">
            <button 
              ref={searchToggleRef}
              onClick={() => {
                setIsSearchOpen(!isSearchOpen);
                if (isSearchOpen) setSearchQuery('');
              }} 
              className="bg-[#F2EEE6] w-10 h-10 rounded-full flex items-center justify-center text-stone-600 hover:text-stone-900 hover:bg-[#EBE5DB] hidden sm:flex relative transition-colors duration-300 ease-in-out"
            >
              {isSearchOpen ? <X size={20} strokeWidth={1.5} /> : <Search size={20} strokeWidth={1.5} />}
            </button>
            <div className="relative">
              <button 
                ref={accountToggleRef}
                className="bg-[#F2EEE6] w-10 h-10 rounded-full flex items-center justify-center text-stone-600 hover:text-stone-900 hover:bg-[#EBE5DB] hidden sm:flex relative transition-colors duration-300 ease-in-out"
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
                    className="absolute top-10 left-0 w-48 bg-white border border-natural-border shadow-xl rounded-2xl overflow-hidden z-50 py-2"
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
                      <UserCircle size={16} />
                      حسابي
                    </button>
                    <button 
                      onClick={() => { setIsAccountMenuOpen(false); handleNav('orders'); }}
                      className="w-full text-left px-4 py-2 hover:bg-natural-bg transition-colors flex items-center gap-3 text-sm text-natural-text font-arabic"
                    >
                      <Package size={16} />
                      طلباتي
                    </button>
                    <div className="h-px bg-natural-border/50 my-2"></div>
                    <button 
                      onClick={() => { setIsAccountMenuOpen(false); onLogout(); }}
                      className="w-full text-left px-4 py-2 hover:bg-red-50 transition-colors flex items-center gap-3 text-sm text-red-600 font-arabic"
                    >
                      <LogOut size={16} />
                      تسجيل الخروج
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <button 
              className="bg-[#F2EEE6] w-10 h-10 rounded-full flex items-center justify-center text-stone-600 hover:text-stone-900 hover:bg-[#EBE5DB] relative transition-colors duration-300 ease-in-out"
              onClick={() => {
                handleNav('cart');
              }}
            >
              <ShoppingBag size={20} strokeWidth={1.5} />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-natural-accent text-white text-[10px] en-text font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-sm">
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
                              src={product.image} 
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
                          src={product.image} 
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
                وصل حديثاً
              </button>
            </div>
            {/* Mobile Actions */}
            <div className="flex flex-col gap-6 text-lg text-stone-800 border-t border-natural-border pt-8 mt-4 font-arabic">
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
