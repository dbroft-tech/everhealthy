import { ShoppingCart, Heart, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Currency } from '../utils/currency';

interface HeaderProps {
  cartItemCount: number;
  onCartClick: () => void;
  currentPage: 'home' | 'products' | 'checkout' | 'contact' | 'about';
  onNavigate: (page: 'home' | 'products' | 'checkout' | 'contact' | 'about') => void;
  currency: Currency;
  onCurrencyChange: (currency: Currency) => void;
  exchangeRate: number;
}

export function Header({ cartItemCount, onCartClick, currentPage, onNavigate, currency, onCurrencyChange, exchangeRate }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { label: 'Home', page: 'home' as const },
    { label: 'Products', page: 'products' as const },
    { label: 'About', page: 'about' as const },
    { label: 'Contact', page: 'contact' as const },
  ];

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-30 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => onNavigate('home')}
          >
            <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
              <Heart className="w-7 h-7 text-white fill-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Everhealthy</h1>
              <p className="text-xs text-emerald-600 font-medium">Your Wellness Partner</p>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.page}
                onClick={() => onNavigate(item.page)}
                className={`font-medium transition-colors relative group ${
                  currentPage === item.page
                    ? 'text-emerald-600'
                    : 'text-gray-700 hover:text-emerald-600'
                }`}
              >
                {item.label}
                <span className={`absolute -bottom-6 left-0 right-0 h-0.5 bg-emerald-600 transition-transform ${
                  currentPage === item.page ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                }`} />
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <select
              value={currency}
              onChange={(e) => onCurrencyChange(e.target.value as Currency)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium bg-white hover:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-colors"
            >
              <option value="USD">USD</option>
              <option value="UGX">UGX</option>
            </select>

            {currency === 'UGX' && (
              <div className="hidden lg:block text-xs text-gray-600">
                1 USD = {exchangeRate.toLocaleString()} UGX
              </div>
            )}

            <button
              onClick={onCartClick}
              className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ShoppingCart className="w-6 h-6 text-gray-700" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-emerald-600 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 text-gray-700" />
              ) : (
                <Menu className="w-6 h-6 text-gray-700" />
              )}
            </button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <nav className="flex flex-col gap-2">
              {navItems.map((item) => (
                <button
                  key={item.page}
                  onClick={() => {
                    onNavigate(item.page);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`text-left px-4 py-3 rounded-lg font-medium transition-colors ${
                    currentPage === item.page
                      ? 'bg-emerald-50 text-emerald-600'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
