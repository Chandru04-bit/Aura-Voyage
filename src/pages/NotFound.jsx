import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, Home, MapPin, ArrowRight } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-brand-bg px-4 py-16">
      <div className="bg-white rounded-3xl p-8 sm:p-14 shadow-soft max-w-xl w-full text-center border border-gray-100 animate-fade-in">
        
        {/* Visual Illustration */}
        <div className="relative w-28 h-28 mx-auto mb-6">
          <div className="w-full h-full rounded-full bg-brand-accent/15 flex items-center justify-center text-brand-accent animate-pulse">
            <Compass className="w-14 h-14" />
          </div>
          <div className="absolute -top-1 -right-1 bg-brand-primary text-white text-xs font-black px-2.5 py-1 rounded-full shadow">
            404
          </div>
        </div>

        <span className="text-xs font-bold uppercase tracking-widest text-brand-secondary block mb-2">
          Lost in Wanderlust
        </span>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-brand-primary tracking-tight mb-3">
          Page Off the Map
        </h1>

        <p className="text-sm text-brand-muted leading-relaxed mb-8 max-w-md mx-auto">
          The destination or trail you're looking for doesn't exist or may have shifted. Don't worry — our compass is ready to guide you back.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            to="/"
            className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 rounded-xl font-bold text-brand-primary bg-brand-accent hover:bg-brand-accentHover shadow-sm transition-all text-sm"
          >
            <Home className="w-4 h-4 mr-2" />
            <span>Back to Home</span>
          </Link>
          <Link
            to="/destinations"
            className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 rounded-xl font-semibold text-white bg-brand-primary hover:bg-brand-navyLight shadow-sm transition-all text-sm"
          >
            <MapPin className="w-4 h-4 mr-2" />
            <span>Explore Destinations</span>
          </Link>
        </div>

      </div>
    </div>
  );
}
