import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Heart } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/orcamento-casamento', label: 'Orçamento' },
    { path: '/lista-casa', label: 'Nossa Casa' },
    { path: '/ideias-casamento', label: 'Ideias' },
    { path: '/convidados', label: 'Convidados' },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-rose-50">
      {/* Navbar */}
      <nav className="bg-white shadow-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-3 sm:px-4">
          <div className="flex items-center justify-between h-14 sm:h-16">
            <Link to="/" className="flex items-center gap-2 min-w-0">
              <Heart className="text-rose-600 flex-shrink-0" size={24} fill="currentColor" />
              <span className="font-playfair text-base sm:text-xl font-bold text-rose-700 hidden sm:inline">
                Nosso Casamento & Lar
              </span>
              <span className="font-playfair text-sm sm:text-lg font-bold text-rose-700 sm:hidden">NC&L</span>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className="px-3 sm:px-4 py-2 text-xs sm:text-base text-gray-700 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors font-medium"
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 flex-shrink-0"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileOpen && (
            <div className="md:hidden pb-4 flex flex-col gap-2">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className="px-3 py-2 text-sm text-gray-700 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors block"
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          )}
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-3 sm:px-4 py-4 sm:py-8">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-4 sm:py-6 mt-8 sm:mt-12">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 text-center">
          <p className="flex items-center justify-center gap-2 text-xs sm:text-base">
            <Heart size={16} fill="currentColor" className="text-rose-400 flex-shrink-0" />
            Nosso Casamento & Lar - Organizando nossa vida juntos
            <Heart size={16} fill="currentColor" className="text-rose-400 flex-shrink-0" />
          </p>
        </div>
      </footer>
    </div>
  );
};
