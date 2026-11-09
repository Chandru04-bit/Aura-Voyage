import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, Sparkles, ArrowRight, ShieldCheck, Award, HeartHandshake } from 'lucide-react';
import SearchBar from './SearchBar';

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] flex flex-col justify-center items-center overflow-hidden bg-brand-primary text-white">
      {/* Background Image with Cinematic Gradient Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1920&auto=format&fit=crop&q=85"
          alt="Luxury Scenic Travel Adventure"
          className="w-full h-full object-cover object-center scale-105 transform animate-pulse duration-1000"
          style={{ animationDuration: '8s' }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-brand-primary/80 via-brand-primary/60 to-brand-primary/95" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 text-center flex flex-col items-center">
        
        {/* Curated Tag */}
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-brand-accent text-xs sm:text-sm font-semibold uppercase tracking-wider mb-6 animate-fade-in">
          <Sparkles className="w-4 h-4 text-brand-accent" />
          <span>Award-Winning Bespoke Travel Agency</span>
        </div>

        {/* Main Heading */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white max-w-4xl leading-tight mb-6 drop-shadow-md">
          Discover the World, <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-accent via-amber-200 to-white">
            Create Unforgettable
          </span> Memories.
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-lg md:text-xl text-gray-200 max-w-2xl mx-auto mb-10 leading-relaxed font-normal drop-shadow">
          Explore breathtaking destinations, experience unforgettable adventures, and find the perfect travel package for your next journey.
        </p>

        {/* Dual Call to Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14 w-full sm:w-auto">
          <Link
            to="/destinations"
            className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3.5 rounded-xl font-bold text-brand-primary bg-brand-accent hover:bg-brand-accentHover shadow-lg hover:shadow-xl transform active:scale-95 transition-all text-base"
          >
            <Compass className="w-5 h-5 mr-2" />
            Explore Destinations
          </Link>
          <Link
            to="/packages"
            className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3.5 rounded-xl font-semibold text-white bg-white/15 hover:bg-white/25 border border-white/30 backdrop-blur-sm shadow-md hover:shadow-lg transform active:scale-95 transition-all text-base"
          >
            <span>Discover Packages</span>
            <ArrowRight className="w-5 h-5 ml-2" />
          </Link>
        </div>

        {/* Search Bar Container */}
        <div className="w-full max-w-5xl mx-auto">
          <SearchBar />
        </div>

        {/* Trust Badges */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-3 gap-6 text-gray-300 text-xs sm:text-sm font-medium">
          <div className="flex items-center justify-center space-x-2">
            <ShieldCheck className="w-5 h-5 text-brand-accent" />
            <span>100% Secure & Protected</span>
          </div>
          <div className="flex items-center justify-center space-x-2">
            <Award className="w-5 h-5 text-brand-accent" />
            <span>50,000+ Happy Explorers</span>
          </div>
          <div className="col-span-2 md:col-span-1 flex items-center justify-center space-x-2">
            <HeartHandshake className="w-5 h-5 text-brand-accent" />
            <span>24/7 Dedicated Concierge</span>
          </div>
        </div>

      </div>
    </section>
  );
}
