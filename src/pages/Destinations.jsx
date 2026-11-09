import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Compass, SlidersHorizontal, MapPin } from 'lucide-react';
import DestinationCard from '../components/DestinationCard';
import FilterSidebar from '../components/FilterSidebar';
import EmptyState from '../components/EmptyState';
import { destinations } from '../data/destinations';

export default function Destinations() {
  const [urlParams] = useSearchParams();
  const initialCategory = urlParams.get('cat') || 'All';
  const initialSearch = urlParams.get('search') || '';

  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedCountry, setSelectedCountry] = useState('All');
  const [currentMaxPrice, setCurrentMaxPrice] = useState(3000);
  const [minRating, setMinRating] = useState(0);
  const [sortBy, setSortBy] = useState('popularity');
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);

  // Extract unique categories and countries
  const categories = useMemo(() => {
    return Array.from(new Set(destinations.map(d => d.category)));
  }, []);

  const countries = useMemo(() => {
    return Array.from(new Set(destinations.map(d => d.country))).sort();
  }, []);

  const highestPrice = useMemo(() => {
    return Math.max(...destinations.map(d => d.startingPrice), 3000);
  }, []);

  // Filter & Sort Logic
  const filteredDestinations = useMemo(() => {
    return destinations
      .filter((dest) => {
        // Search query filter (destination name or country)
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchName = dest.name.toLowerCase().includes(q);
          const matchCountry = dest.country.toLowerCase().includes(q);
          const matchDesc = dest.shortDescription.toLowerCase().includes(q);
          if (!matchName && !matchCountry && !matchDesc) return false;
        }

        // Category filter
        if (selectedCategory !== 'All' && dest.category !== selectedCategory) {
          return false;
        }

        // Country filter
        if (selectedCountry !== 'All' && dest.country !== selectedCountry) {
          return false;
        }

        // Price filter
        if (dest.startingPrice > currentMaxPrice) {
          return false;
        }

        // Rating filter
        if (minRating > 0 && dest.rating < minRating) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.startingPrice - b.startingPrice;
        if (sortBy === 'price-desc') return b.startingPrice - a.startingPrice;
        if (sortBy === 'rating-desc') return b.rating - a.rating;
        // Default: popularity
        return (b.reviewsCount || 0) - (a.reviewsCount || 0);
      });
  }, [searchQuery, selectedCategory, selectedCountry, currentMaxPrice, minRating, sortBy]);

  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setSelectedCountry('All');
    setCurrentMaxPrice(highestPrice);
    setMinRating(0);
    setSortBy('popularity');
  };

  return (
    <div className="min-h-screen bg-brand-bg pb-20">
      
      {/* Banner */}
      <section className="relative bg-brand-primary text-white py-16 sm:py-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1920&auto=format&fit=crop&q=80"
            alt="Scenic Destinations Worldwide"
            className="w-full h-full object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-primary via-brand-primary/90 to-brand-primary/70" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/10 text-brand-accent text-xs font-bold uppercase tracking-wider mb-3">
              <Compass className="w-3.5 h-3.5" />
              <span>World Destinations Directory</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4">
              Explore Inspiring Destinations
            </h1>
            <p className="text-gray-200 text-sm sm:text-base leading-relaxed">
              From the tranquil turquoise atolls of the Indian Ocean to snow-draped alpine summits and cultural capitals, discover your next memorable getaway.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12">
        
        {/* Mobile Filter Toggle Button */}
        <div className="lg:hidden mb-6 flex items-center justify-between bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
          <span className="text-sm font-semibold text-brand-primary">
            Showing <strong className="text-brand-secondary">{filteredDestinations.length}</strong> destinations
          </span>
          <button
            onClick={() => setIsMobileDrawerOpen(true)}
            className="inline-flex items-center space-x-2 px-4 py-2 rounded-lg bg-brand-primary text-white text-xs font-bold shadow-sm"
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span>Filter & Sort</span>
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 items-start">
          
          {/* Sidebar */}
          <FilterSidebar
            categories={categories}
            countries={countries}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            selectedCountry={selectedCountry}
            onSelectCountry={setSelectedCountry}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            maxPrice={highestPrice}
            currentMaxPrice={currentMaxPrice}
            onPriceChange={setCurrentMaxPrice}
            minRating={minRating}
            onRatingChange={setMinRating}
            sortBy={sortBy}
            onSortChange={setSortBy}
            onClearFilters={handleClearFilters}
            totalResults={filteredDestinations.length}
            isMobileDrawerOpen={isMobileDrawerOpen}
            onCloseMobileDrawer={() => setIsMobileDrawerOpen(false)}
          />

          {/* Destinations Grid / Empty State */}
          <div className="flex-1 w-full">
            {filteredDestinations.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredDestinations.map((dest) => (
                  <DestinationCard key={dest.id} destination={dest} />
                ))}
              </div>
            ) : (
              <EmptyState
                title="No Destinations Found"
                message={`We couldn't find any destinations matching "${searchQuery || selectedCategory}". Try resetting your filters to view all available destinations.`}
                actionText="Reset All Filters"
                onAction={handleClearFilters}
              />
            )}
          </div>

        </div>
      </div>

    </div>
  );
}
