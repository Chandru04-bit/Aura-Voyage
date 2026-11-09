import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Sparkles, SlidersHorizontal, Package, CheckCircle2 } from 'lucide-react';
import PackageCard from '../components/PackageCard';
import FilterSidebar from '../components/FilterSidebar';
import EmptyState from '../components/EmptyState';
import { packages } from '../data/packages';

export default function Packages() {
  const [urlParams] = useSearchParams();
  const destParam = urlParams.get('dest') || '';
  const catParam = urlParams.get('cat') || 'All';

  const [searchQuery, setSearchQuery] = useState(destParam);
  const [selectedCategory, setSelectedCategory] = useState(catParam);
  const [selectedDestination, setSelectedDestination] = useState('All');
  const [currentMaxPrice, setCurrentMaxPrice] = useState(3500);
  const [minRating, setMinRating] = useState(0);
  const [sortBy, setSortBy] = useState('popularity');
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState(9); // For Load More

  useEffect(() => {
    if (destParam) {
      setSearchQuery(destParam);
    }
    if (catParam && catParam !== 'All') {
      setSelectedCategory(catParam);
    }
  }, [destParam, catParam]);

  // Categories
  const categories = useMemo(() => {
    return Array.from(new Set(packages.map(p => p.category)));
  }, []);

  // Unique Destination names for filtering
  const destinationList = useMemo(() => {
    return Array.from(new Set(packages.map(p => p.destination))).sort();
  }, []);

  const highestPrice = useMemo(() => {
    return Math.max(...packages.map(p => p.adultPrice), 3500);
  }, []);

  // Filter & Sort Logic
  const filteredPackages = useMemo(() => {
    return packages
      .filter((pkg) => {
        // Text search (title, destination, description)
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchTitle = pkg.title.toLowerCase().includes(q);
          const matchDest = pkg.destination.toLowerCase().includes(q);
          const matchDesc = pkg.description.toLowerCase().includes(q);
          if (!matchTitle && !matchDest && !matchDesc) return false;
        }

        // Category filter
        if (selectedCategory !== 'All' && pkg.category !== selectedCategory) {
          return false;
        }

        // Destination dropdown filter
        if (selectedDestination !== 'All' && pkg.destination !== selectedDestination) {
          return false;
        }

        // Price filter (adult price)
        if (pkg.adultPrice > currentMaxPrice) {
          return false;
        }

        // Rating filter
        if (minRating > 0 && pkg.rating < minRating) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.adultPrice - b.adultPrice;
        if (sortBy === 'price-desc') return b.adultPrice - a.adultPrice;
        if (sortBy === 'rating-desc') return b.rating - a.rating;
        // Default: popularity / reviews
        return (b.reviewsCount || 0) - (a.reviewsCount || 0);
      });
  }, [searchQuery, selectedCategory, selectedDestination, currentMaxPrice, minRating, sortBy]);

  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setSelectedDestination('All');
    setCurrentMaxPrice(highestPrice);
    setMinRating(0);
    setSortBy('popularity');
    setVisibleCount(9);
  };

  const visiblePackages = filteredPackages.slice(0, visibleCount);

  return (
    <div className="min-h-screen bg-brand-bg pb-20">
      
      {/* Banner */}
      <section className="relative bg-brand-primary text-white py-16 sm:py-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?w=1920&auto=format&fit=crop&q=80"
            alt="All-Inclusive Travel Packages"
            className="w-full h-full object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-primary via-brand-primary/90 to-brand-primary/75" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/10 text-brand-accent text-xs font-bold uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>All-Inclusive Curated Itineraries</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4">
              Signature Travel Packages
            </h1>
            <p className="text-gray-200 text-sm sm:text-base leading-relaxed">
              Carefully crafted multi-day journeys combining world-class accommodations, expert local guides, gourmet dining, and seamless private transfers.
            </p>
          </div>
        </div>
      </section>

      {/* Main Listing Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12">
        
        {/* Mobile Filter Toggle */}
        <div className="lg:hidden mb-6 flex items-center justify-between bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
          <span className="text-sm font-semibold text-brand-primary">
            Showing <strong className="text-brand-secondary">{filteredPackages.length}</strong> packages
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
          
          {/* Filter Sidebar */}
          <FilterSidebar
            categories={categories}
            countries={destinationList}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            selectedCountry={selectedDestination}
            onSelectCountry={setSelectedDestination}
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
            totalResults={filteredPackages.length}
            isMobileDrawerOpen={isMobileDrawerOpen}
            onCloseMobileDrawer={() => setIsMobileDrawerOpen(false)}
          />

          {/* Package Cards Grid */}
          <div className="flex-1 w-full">
            {filteredPackages.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {visiblePackages.map((pkg) => (
                    <PackageCard key={pkg.id} packageItem={pkg} />
                  ))}
                </div>

                {/* Load More Option */}
                {visibleCount < filteredPackages.length && (
                  <div className="text-center mt-12">
                    <button
                      onClick={() => setVisibleCount(prev => prev + 6)}
                      className="inline-flex items-center space-x-2 px-8 py-3 rounded-xl bg-white hover:bg-gray-50 text-brand-primary font-bold text-sm border border-gray-200 shadow-card hover:shadow-soft-hover transition-all"
                    >
                      <span>Load More Packages ({filteredPackages.length - visibleCount} remaining)</span>
                    </button>
                  </div>
                )}
              </>
            ) : (
              <EmptyState
                title="No Travel Packages Found"
                message={`We couldn't find any travel packages matching your search criteria. Try relaxing your filters or resetting to default.`}
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
