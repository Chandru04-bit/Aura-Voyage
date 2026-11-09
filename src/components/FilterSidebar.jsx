import React, { useState } from 'react';
import { Filter, X, Search, RotateCcw, SlidersHorizontal, Star } from 'lucide-react';
import { formatPrice } from '../utils/priceCalculator';

export default function FilterSidebar({
  categories = [],
  countries = [],
  selectedCategory,
  onSelectCategory,
  selectedCountry,
  onSelectCountry,
  searchQuery,
  onSearchChange,
  maxPrice,
  currentMaxPrice,
  onPriceChange,
  minRating,
  onRatingChange,
  sortBy,
  onSortChange,
  onClearFilters,
  totalResults = 0,
  isMobileDrawerOpen,
  onCloseMobileDrawer
}) {
  const content = (
    <div className="space-y-6">
      {/* Header & Results Count */}
      <div className="flex items-center justify-between pb-4 border-b border-gray-100">
        <div>
          <h3 className="text-base font-bold text-brand-primary flex items-center">
            <SlidersHorizontal className="w-4 h-4 mr-2 text-brand-secondary" />
            Filters & Sorting
          </h3>
          <span className="text-xs text-brand-muted">
            Showing <strong className="text-brand-primary">{totalResults}</strong> matching results
          </span>
        </div>

        <button
          onClick={onClearFilters}
          className="text-xs font-semibold text-brand-secondary hover:text-brand-accent flex items-center transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5 mr-1" />
          Reset
        </button>
      </div>

      {/* Search Input */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-brand-muted mb-2">
          Search
        </label>
        <div className="relative">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by name, place..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-brand-secondary focus:border-brand-secondary transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Sort Options */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-brand-muted mb-2">
          Sort By
        </label>
        <select
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
          className="w-full px-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-brand-secondary cursor-pointer font-medium text-brand-text"
        >
          <option value="popularity">Popularity / Recommended</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="rating-desc">Highest Rated</option>
        </select>
      </div>

      {/* Category Filter */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-brand-muted mb-2">
          Experience Category
        </label>
        <div className="flex flex-wrap gap-1.5">
          <button
            onClick={() => onSelectCategory('All')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              selectedCategory === 'All'
                ? 'bg-brand-primary text-white shadow-sm'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            All
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => onSelectCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                selectedCategory === cat
                  ? 'bg-brand-primary text-white shadow-sm'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Country Filter (if provided) */}
      {countries.length > 0 && (
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-brand-muted mb-2">
            Country / Region
          </label>
          <select
            value={selectedCountry}
            onChange={(e) => onSelectCountry(e.target.value)}
            className="w-full px-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-brand-secondary cursor-pointer font-medium text-brand-text"
          >
            <option value="All">All Countries</option>
            {countries.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Maximum Price Range Filter */}
      <div>
        <div className="flex justify-between items-center mb-2">
          <label className="text-xs font-bold uppercase tracking-wider text-brand-muted">
            Max Budget
          </label>
          <span className="text-xs font-bold text-brand-secondary">
            Up to {formatPrice(currentMaxPrice)}
          </span>
        </div>
        <input
          type="range"
          min={500}
          max={maxPrice || 3500}
          step={50}
          value={currentMaxPrice}
          onChange={(e) => onPriceChange(Number(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-brand-secondary"
        />
        <div className="flex justify-between text-[11px] text-gray-400 mt-1">
          <span>{formatPrice(500)}</span>
          <span>{formatPrice(maxPrice || 3500)}</span>
        </div>
      </div>

      {/* Minimum Rating Filter */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-brand-muted mb-2">
          Minimum Rating
        </label>
        <div className="grid grid-cols-4 gap-1.5">
          {[0, 4.5, 4.8, 4.9].map((ratingVal) => (
            <button
              key={ratingVal}
              onClick={() => onRatingChange(ratingVal)}
              className={`py-1.5 px-2 rounded-lg text-xs font-semibold flex items-center justify-center transition-all ${
                minRating === ratingVal
                  ? 'bg-brand-secondary text-white shadow-sm'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {ratingVal === 0 ? (
                'All'
              ) : (
                <>
                  <span>{ratingVal}</span>
                  <Star className="w-3 h-3 ml-0.5 fill-current text-amber-400" />
                </>
              )}
            </button>
          ))}
        </div>
      </div>

    </div>
  );

  return (
    <>
      {/* Desktop Sticky Sidebar */}
      <aside className="hidden lg:block w-72 flex-shrink-0 bg-white rounded-2xl p-6 shadow-card border border-gray-100 h-fit sticky top-24">
        {content}
      </aside>

      {/* Mobile Modal Drawer */}
      {isMobileDrawerOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex justify-end animate-fade-in">
          {/* Backdrop */}
          <div
            onClick={onCloseMobileDrawer}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
          />
          {/* Drawer Panel */}
          <div className="relative w-full max-w-xs bg-white h-full shadow-2xl p-6 overflow-y-auto z-10 flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-center mb-4">
                <span className="font-bold text-lg text-brand-primary">Refine Your Trip</span>
                <button
                  onClick={onCloseMobileDrawer}
                  className="p-1 rounded-lg text-gray-400 hover:text-gray-700"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              {content}
            </div>

            <div className="pt-6 mt-6 border-t border-gray-100">
              <button
                onClick={onCloseMobileDrawer}
                className="w-full py-3 rounded-xl bg-brand-primary text-white font-bold text-sm hover:bg-brand-navyLight shadow-md transition-all"
              >
                Apply & View ({totalResults}) Results
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
