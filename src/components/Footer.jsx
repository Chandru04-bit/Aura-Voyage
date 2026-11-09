import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Compass, Mail, Phone, MapPin, Clock, Facebook, Twitter, Instagram, Youtube, Linkedin, ShieldCheck, Heart } from 'lucide-react';

export default function Footer() {
  const [modalContent, setModalContent] = useState(null);

  const openModal = (type) => {
    if (type === 'privacy') {
      setModalContent({
        title: 'Privacy Policy',
        content: `At AuraVoyage, we respect and prioritize your personal privacy. We collect customer information exclusively to facilitate custom travel itineraries, flight and hotel reservations, and emergency support. We never sell, rent, or trade your personal or payment information to external third parties. All booking transactions and sensitive records are encrypted using industry-standard protocols.`
      });
    } else if (type === 'terms') {
      setModalContent({
        title: 'Terms & Conditions',
        content: `By reserving travel itineraries with AuraVoyage, you agree to our standard customer agreement. All reservations are subject to hotel and excursion operator availability. Cancellations initiated at least 48 hours before scheduled departure are fully refundable minus applicable administrative processing fees. AuraVoyage acts as an accredited travel management agency partnering with certified global hospitality vendors.`
      });
    }
  };

  return (
    <footer className="bg-brand-primary text-gray-300 pt-16 pb-12 border-t border-brand-navyLight">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          
          {/* Brand & About */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-accent to-brand-secondary flex items-center justify-center text-white shadow-md">
                <Compass className="w-6 h-6" />
              </div>
              <span className="text-2xl font-bold tracking-tight text-white">
                Aura<span className="text-brand-accent">Voyage</span>
              </span>
            </Link>
            <p className="text-sm text-gray-300 leading-relaxed">
              Curating extraordinary international adventures, bespoke luxury getaways, and unforgettable cultural journeys across 6 continents since 2012.
            </p>
            <div className="flex items-center space-x-3 pt-2">
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="w-9 h-9 rounded-lg bg-white/5 hover:bg-brand-accent hover:text-brand-primary flex items-center justify-center transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="w-9 h-9 rounded-lg bg-white/5 hover:bg-brand-accent hover:text-brand-primary flex items-center justify-center transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className="w-9 h-9 rounded-lg bg-white/5 hover:bg-brand-accent hover:text-brand-primary flex items-center justify-center transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noreferrer" className="w-9 h-9 rounded-lg bg-white/5 hover:bg-brand-accent hover:text-brand-primary flex items-center justify-center transition-colors">
                <Youtube className="w-4 h-4" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="w-9 h-9 rounded-lg bg-white/5 hover:bg-brand-accent hover:text-brand-primary flex items-center justify-center transition-colors">
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-base font-semibold text-white uppercase tracking-wider mb-4 border-l-2 border-brand-accent pl-3">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/" className="hover:text-brand-accent transition-colors">Home Page</Link>
              </li>
              <li>
                <Link to="/destinations" className="hover:text-brand-accent transition-colors">All Destinations</Link>
              </li>
              <li>
                <Link to="/packages" className="hover:text-brand-accent transition-colors">Featured Packages</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-brand-accent transition-colors">About AuraVoyage</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-brand-accent transition-colors">Contact & Support</Link>
              </li>
              <li>
                <Link to="/my-bookings" className="hover:text-brand-accent transition-colors">Manage My Bookings</Link>
              </li>
            </ul>
          </div>

          {/* Popular Destinations */}
          <div>
            <h4 className="text-base font-semibold text-white uppercase tracking-wider mb-4 border-l-2 border-brand-accent pl-3">
              Popular Escapes
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/package/pkg-bali-luxury-escape" className="hover:text-brand-accent transition-colors">Bali Luxury Escape</Link>
              </li>
              <li>
                <Link to="/package/pkg-swiss-alps-grand" className="hover:text-brand-accent transition-colors">Grand Swiss Alps Rail</Link>
              </li>
              <li>
                <Link to="/package/pkg-maldives-overwater-bliss" className="hover:text-brand-accent transition-colors">Maldives Overwater Haven</Link>
              </li>
              <li>
                <Link to="/package/pkg-dubai-futuristic-luxury" className="hover:text-brand-accent transition-colors">Dubai Royal Wonders</Link>
              </li>
              <li>
                <Link to="/package/pkg-paris-romance" className="hover:text-brand-accent transition-colors">Paris & Versailles Splendour</Link>
              </li>
              <li>
                <Link to="/package/pkg-kashmir-paradise" className="hover:text-brand-accent transition-colors">Kashmir Dal Lake & Peaks</Link>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="text-base font-semibold text-white uppercase tracking-wider mb-4 border-l-2 border-brand-accent pl-3">
              Get In Touch
            </h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-brand-accent flex-shrink-0 mt-0.5" />
                <span>742 Evergreen Promenade, Suite 400, Travel District, NY 10001</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-brand-accent flex-shrink-0" />
                <span>+1 (800) 592-8692 (Toll Free)</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-brand-accent flex-shrink-0" />
                <span>concierge@auravoyage.com</span>
              </li>
              <li className="flex items-center space-x-3">
                <Clock className="w-5 h-5 text-brand-accent flex-shrink-0" />
                <span>24/7 Global Travel Concierge</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 mt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between text-xs text-gray-400 gap-4">
          <p>© {new Date().getFullYear()} AuraVoyage International Travel Ltd. All rights reserved.</p>
          
          <div className="flex items-center space-x-6">
            <button 
              onClick={() => openModal('privacy')} 
              className="hover:text-white transition-colors underline-offset-4 hover:underline"
            >
              Privacy Policy
            </button>
            <button 
              onClick={() => openModal('terms')} 
              className="hover:text-white transition-colors underline-offset-4 hover:underline"
            >
              Terms & Conditions
            </button>
            <span className="flex items-center text-gray-400">
              Crafted with <Heart className="w-3.5 h-3.5 mx-1 text-red-400 fill-current" /> for wanderers worldwide
            </span>
          </div>
        </div>
      </div>

      {/* Policy Modal */}
      {modalContent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white text-brand-text rounded-2xl max-w-lg w-full p-6 shadow-2xl relative border border-gray-100">
            <h3 className="text-xl font-bold text-brand-primary mb-3 flex items-center">
              <ShieldCheck className="w-6 h-6 mr-2 text-brand-secondary" />
              {modalContent.title}
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed mb-6">
              {modalContent.content}
            </p>
            <div className="flex justify-end">
              <button
                onClick={() => setModalContent(null)}
                className="px-5 py-2 text-sm font-semibold text-white bg-brand-primary hover:bg-brand-navyLight rounded-lg transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
}
