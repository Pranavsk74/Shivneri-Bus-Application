import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

interface NavbarProps {
  isTransparentHero?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ isTransparentHero = false }) => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 25) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Book Tickets', path: '/search' },
    { label: 'Track Bus', path: '/track' },
    { label: 'My Journeys', path: '/journeys' },
  ];

  return (
    <header 
      className="sticky top-0 left-0 w-full z-50 h-20 bg-[#171717] border-b border-white/15 text-white shadow-md transition-all duration-300 ease-in-out"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
        
        {/* Left: Brand Identity */}
        <Link to="/" className="flex items-center gap-3.5 group">
          <div className="h-11 sm:h-12 w-auto bg-white p-1 flex items-center justify-center shrink-0 shadow-xs transition-transform duration-200 group-hover:scale-102">
            <img
              src="/logo-tight.jpg"
              alt="MSRTC Logo"
              className="h-full w-auto max-w-[120px] object-contain"
            />
          </div>
          
          <div className="flex flex-col justify-center">
            <span className="text-xl sm:text-2xl font-bold tracking-tight uppercase leading-none text-white">
              MSRTC
            </span>
            <span className="text-[10px] sm:text-[11px] tracking-wider uppercase font-medium mt-1 text-white/80">
              SHIVNERI · MUMBAI ↔ PUNE
            </span>
          </div>
        </Link>

        {/* Center: Navigation Links */}
        <nav className="hidden md:flex items-center space-x-9">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium tracking-wide transition-colors relative py-1.5 ${
                  isActive
                    ? 'text-brand-orange font-semibold'
                    : 'text-white/90 hover:text-white'
                }`}
              >
                <span>{link.label}</span>
                {isActive && (
                  <span className="absolute bottom-0 left-0 w-full h-[2px] bg-brand-orange" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right: Exactly ONE primary Book Tickets CTA */}
        <div className="hidden md:flex items-center">
          <Link
            to="/search"
            className="px-5 py-2.5 bg-brand-orange hover:bg-brand-orange-hover text-white text-xs font-semibold uppercase tracking-wider transition-colors shadow-sm"
          >
            Book Tickets
          </Link>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex md:hidden items-center">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-white"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#171717] text-white border-b border-white/10 px-4 pt-3 pb-6 shadow-2xl">
          <div className="space-y-3">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block p-3 border text-sm font-semibold tracking-wider uppercase transition-colors ${
                    isActive
                      ? 'border-brand-orange bg-brand-orange/15 text-brand-orange'
                      : 'border-white/15 text-white/90 hover:border-brand-orange'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
            <Link
              to="/search"
              onClick={() => setMobileMenuOpen(false)}
              className="block p-3 text-center bg-brand-orange text-white font-bold text-sm tracking-wider uppercase"
            >
              Book Tickets
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
