import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Compass, Menu, X, Calendar, Phone, Globe, Briefcase } from 'lucide-react';
import { useBooking } from '../context/BookingContext';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { bookings } = useBooking();
  const location = useLocation();

  const activeBookingsCount = bookings.filter(b => b.status === 'Confirmed').length;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on page navigation
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Destinations', path: '/destinations' },
    { name: 'Packages', path: '/packages' },
    { name: 'About Us', path: '/about' },
    { name: 'Contact', path: '/contact' },
    { 
      name: 'My Bookings', 
      path: '/my-bookings', 
      badge: activeBookingsCount > 0 ? activeBookingsCount : null 
    },
  ];

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-brand-primary/95 backdrop-blur-md shadow-lg py-3' 
        : 'bg-brand-primary py-4'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-accent to-brand-secondary flex items-center justify-center text-white shadow-md transform transition-transform group-hover:scale-105">
              <Compass className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <span className="text-2xl font-bold tracking-tight text-white flex items-center">
                Aura<span className="text-brand-accent">Voyage</span>
              </span>
              <p className="text-[10px] tracking-widest text-gray-300 uppercase font-medium">Luxury & Adventure</p>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) =>
                  `px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center space-x-1.5 ${
                    isActive
                      ? 'text-brand-accent bg-white/10 shadow-sm'
                      : 'text-gray-200 hover:text-white hover:bg-white/5'
                  }`
                }
              >
                <span>{link.name}</span>
                {link.badge && (
                  <span className="ml-1.5 px-2 py-0.5 text-xs font-bold rounded-full bg-brand-accent text-brand-primary">
                    {link.badge}
                  </span>
                )}
              </NavLink>
            ))}
          </nav>

          {/* Desktop CTA Action Button */}
          <div className="hidden lg:flex items-center space-x-4">
            <Link
              to="/booking/pkg-bali-luxury-escape"
              className="inline-flex items-center justify-center px-5 py-2.5 rounded-lg text-sm font-semibold text-brand-primary bg-brand-accent hover:bg-brand-accentHover shadow-md hover:shadow-lg transform active:scale-95 transition-all duration-200"
            >
              <Calendar className="w-4 h-4 mr-2" />
              Book Your Trip
            </Link>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex lg:hidden items-center space-x-3">
            <Link
              to="/my-bookings"
              className="relative p-2 text-gray-200 hover:text-white"
              aria-label="My Bookings"
            >
              <Briefcase className="w-6 h-6" />
              {activeBookingsCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-brand-accent text-brand-primary font-bold text-[10px] rounded-full flex items-center justify-center">
                  {activeBookingsCount}
                </span>
              )}
            </Link>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-gray-200 hover:text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-brand-accent"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-brand-primary border-t border-white/10 px-4 pt-3 pb-6 space-y-2 animate-fade-in shadow-xl">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) =>
                `flex items-center justify-between px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                  isActive
                    ? 'text-brand-accent bg-white/10 font-semibold'
                    : 'text-gray-200 hover:text-white hover:bg-white/5'
                }`
              }
            >
              <span>{link.name}</span>
              {link.badge && (
                <span className="px-2.5 py-0.5 text-xs font-bold rounded-full bg-brand-accent text-brand-primary">
                  {link.badge} active
                </span>
              )}
            </NavLink>
          ))}

          <div className="pt-4 mt-2 border-t border-white/10">
            <Link
              to="/booking/pkg-bali-luxury-escape"
              className="w-full flex items-center justify-center px-5 py-3 rounded-lg font-semibold text-brand-primary bg-brand-accent hover:bg-brand-accentHover shadow-md transition-colors"
            >
              <Calendar className="w-5 h-5 mr-2" />
              Book Your Trip
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
