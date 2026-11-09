import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  Star, 
  Clock, 
  MapPin, 
  CheckCircle2, 
  XCircle, 
  Calendar, 
  Users, 
  Hotel, 
  ShieldCheck, 
  ArrowLeft, 
  Share2, 
  Heart,
  Sparkles,
  ChevronRight,
  Compass
} from 'lucide-react';
import { packages } from '../data/packages';
import { formatPrice } from '../utils/priceCalculator';
import PackageCard from '../components/PackageCard';

export default function PackageDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const packageItem = packages.find(p => p.id === id);

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState('itinerary'); // 'itinerary' | 'accommodation' | 'inclusions' | 'reviews'
  const [selectedTravelDate, setSelectedTravelDate] = useState('');
  const [copiedLink, setCopiedLink] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    setActiveImageIndex(0);
    if (packageItem?.availableDates?.length > 0) {
      setSelectedTravelDate(packageItem.availableDates[0]);
    }
  }, [id, packageItem]);

  if (!packageItem) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-24 text-center">
        <h2 className="text-2xl font-bold text-brand-primary mb-3">Package Not Found</h2>
        <p className="text-brand-muted mb-6">The travel itinerary you are looking for does not exist or has been retired.</p>
        <Link
          to="/packages"
          className="inline-flex items-center space-x-2 px-6 py-2.5 rounded-xl bg-brand-primary text-white font-bold"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Packages</span>
        </Link>
      </div>
    );
  }

  // Related Packages (same category or destination, excluding current)
  const relatedPackages = packages
    .filter(p => p.id !== packageItem.id && (p.category === packageItem.category || p.destinationId === packageItem.destinationId))
    .slice(0, 3);

  const imagesList = packageItem.images || [packageItem.image];

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  return (
    <div className="min-h-screen bg-brand-bg pb-24">
      
      {/* Breadcrumb Navigation & Action Bar */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center space-x-2 text-brand-muted">
            <Link to="/" className="hover:text-brand-primary">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
            <Link to="/packages" className="hover:text-brand-primary">Packages</Link>
            <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
            <span className="font-semibold text-brand-primary truncate max-w-xs">{packageItem.title}</span>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={handleShare}
              className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>{copiedLink ? 'Link Copied!' : 'Share'}</span>
            </button>
            <button
              onClick={() => setIsSaved(!isSaved)}
              className={`inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg border transition-colors ${
                isSaved
                  ? 'border-red-200 bg-red-50 text-red-600'
                  : 'border-gray-200 text-gray-700 hover:bg-gray-50'
              }`}
            >
              <Heart className={`w-3.5 h-3.5 ${isSaved ? 'fill-current text-red-600' : ''}`} />
              <span>{isSaved ? 'Saved' : 'Save'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        
        {/* A. Package Header */}
        <div className="mb-6">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="px-3 py-1 text-xs font-bold rounded-full bg-brand-primary text-white">
              {packageItem.category}
            </span>
            <div className="flex items-center text-xs font-semibold text-brand-secondary">
              <MapPin className="w-3.5 h-3.5 mr-1 text-brand-accent" />
              <span>{packageItem.destination}</span>
            </div>
            <div className="flex items-center space-x-1 text-xs font-bold text-amber-500 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
              <Star className="w-3.5 h-3.5 fill-current text-amber-400" />
              <span>{packageItem.rating}</span>
              <span className="text-gray-500 font-normal">({packageItem.reviewsCount} reviews)</span>
            </div>
            <div className="flex items-center space-x-1 text-xs font-semibold text-gray-600 bg-gray-100 px-2.5 py-0.5 rounded-full">
              <Clock className="w-3.5 h-3.5 text-brand-secondary" />
              <span>{packageItem.duration}</span>
            </div>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-brand-primary tracking-tight">
            {packageItem.title}
          </h1>
        </div>

        {/* B. Image Gallery */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-10">
          {/* Main Large Image */}
          <div className="lg:col-span-3 h-[340px] sm:h-[480px] rounded-2xl overflow-hidden relative shadow-card bg-gray-100">
            <img
              src={imagesList[activeImageIndex] || packageItem.image}
              alt={packageItem.title}
              className="w-full h-full object-cover transition-all duration-500"
            />
            <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md text-white text-xs font-semibold px-3 py-1.5 rounded-lg flex items-center space-x-1.5">
              <Compass className="w-4 h-4 text-brand-accent" />
              <span>Photo {activeImageIndex + 1} of {imagesList.length}</span>
            </div>
          </div>

          {/* Thumbnails Sidebar Grid */}
          <div className="grid grid-cols-4 lg:grid-cols-1 gap-3 h-full">
            {imagesList.map((imgUrl, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImageIndex(idx)}
                className={`relative h-20 sm:h-28 lg:h-auto rounded-xl overflow-hidden border-2 transition-all ${
                  activeImageIndex === idx
                    ? 'border-brand-accent shadow-md ring-2 ring-brand-accent/30'
                    : 'border-transparent opacity-70 hover:opacity-100'
                }`}
              >
                <img
                  src={imgUrl}
                  alt={`Thumbnail ${idx + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Layout Grid: Left Content Details vs Right Sticky Booking Card */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
          
          {/* LEFT COLUMN: Package Overview, Highlights, Tabs (Itinerary, Accommodation, Inclusions, Reviews) */}
          <div className="lg:col-span-2 space-y-10">
            
            {/* C. Package Overview & Highlights */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-card border border-gray-100 space-y-6">
              <div>
                <h2 className="text-xl font-bold text-brand-primary mb-3">
                  Package Overview
                </h2>
                <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                  {packageItem.description}
                </p>
              </div>

              {packageItem.highlights && packageItem.highlights.length > 0 && (
                <div className="pt-6 border-t border-gray-100">
                  <h3 className="text-base font-bold text-brand-primary mb-4 flex items-center">
                    <Sparkles className="w-5 h-5 mr-2 text-brand-accent" />
                    Trip Highlights
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {packageItem.highlights.map((highlight, index) => (
                      <div key={index} className="flex items-start space-x-2.5 text-sm text-gray-700 bg-brand-bg p-3 rounded-xl border border-gray-100">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                        <span>{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Navigation Tabs for In-depth Details */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-card border border-gray-100">
              <div className="flex border-b border-gray-100 gap-2 overflow-x-auto pb-3 mb-6">
                {[
                  { id: 'itinerary', label: 'Day-by-Day Itinerary' },
                  { id: 'accommodation', label: 'Accommodation' },
                  { id: 'inclusions', label: 'Inclusions & Exclusions' },
                  { id: 'reviews', label: `Reviews (${packageItem.reviews?.length || 0})` },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
                      activeTab === tab.id
                        ? 'bg-brand-primary text-white shadow-sm'
                        : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* D. Itinerary Tab */}
              {activeTab === 'itinerary' && (
                <div className="space-y-6 animate-fade-in">
                  <div className="space-y-4">
                    {packageItem.itinerary && packageItem.itinerary.map((dayPlan) => (
                      <div
                        key={dayPlan.day}
                        className="relative pl-8 sm:pl-10 pb-6 border-l-2 border-brand-secondary/30 last:border-l-0 last:pb-0"
                      >
                        {/* Day indicator node */}
                        <div className="absolute -left-[17px] top-0 w-8 h-8 rounded-full bg-brand-primary text-white flex items-center justify-center font-bold text-xs shadow-md border-2 border-white">
                          D{dayPlan.day}
                        </div>

                        <div>
                          <span className="text-xs font-bold text-brand-secondary uppercase tracking-wider block mb-1">
                            Day {dayPlan.day}
                          </span>
                          <h4 className="text-base font-bold text-brand-primary mb-2">
                            {dayPlan.title}
                          </h4>
                          <p className="text-sm text-gray-600 leading-relaxed bg-brand-bg p-3.5 rounded-xl border border-gray-100">
                            {dayPlan.desc}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* E. Accommodation Tab */}
              {activeTab === 'accommodation' && (
                <div className="space-y-6 animate-fade-in">
                  {packageItem.accommodation ? (
                    <div className="bg-brand-bg rounded-2xl p-6 border border-gray-100">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <div className="inline-flex items-center text-xs font-bold text-brand-secondary mb-1">
                            <Hotel className="w-4 h-4 mr-1.5" />
                            <span>Featured Luxury Resort</span>
                          </div>
                          <h4 className="text-xl font-bold text-brand-primary">
                            {packageItem.accommodation.hotelName}
                          </h4>
                          <p className="text-sm text-gray-600 mt-1">
                            Room Type: <strong className="text-brand-primary">{packageItem.accommodation.roomType}</strong>
                          </p>
                        </div>

                        <div className="flex items-center space-x-1 bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-xs font-bold">
                          {[...Array(packageItem.accommodation.stars || 5)].map((_, i) => (
                            <Star key={i} className="w-3.5 h-3.5 fill-current text-amber-500" />
                          ))}
                        </div>
                      </div>

                      <div className="pt-4 border-t border-gray-200">
                        <h5 className="text-xs font-bold uppercase tracking-wider text-brand-muted mb-3">
                          Complimentary Resort Amenities
                        </h5>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                          {packageItem.accommodation.facilities.map((facility, i) => (
                            <div key={i} className="flex items-center space-x-2 text-xs font-medium text-gray-700 bg-white p-2.5 rounded-lg border border-gray-100">
                              <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                              <span>{facility}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <p className="text-sm text-gray-500">Accommodation details specified on booking confirmation.</p>
                  )}
                </div>
              )}

              {/* F & G. Inclusions & Exclusions Tab */}
              {activeTab === 'inclusions' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in">
                  {/* Inclusions */}
                  <div className="bg-emerald-50/50 rounded-2xl p-5 border border-emerald-100">
                    <h4 className="text-sm font-bold text-emerald-900 uppercase tracking-wider mb-4 flex items-center">
                      <CheckCircle2 className="w-4 h-4 mr-2 text-emerald-600" />
                      What's Included
                    </h4>
                    <ul className="space-y-3">
                      {packageItem.inclusions?.map((inc, i) => (
                        <li key={i} className="flex items-start text-xs sm:text-sm text-emerald-950">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 mr-2 flex-shrink-0 mt-0.5" />
                          <span>{inc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Exclusions */}
                  <div className="bg-rose-50/50 rounded-2xl p-5 border border-rose-100">
                    <h4 className="text-sm font-bold text-rose-900 uppercase tracking-wider mb-4 flex items-center">
                      <XCircle className="w-4 h-4 mr-2 text-rose-600" />
                      What's Excluded
                    </h4>
                    <ul className="space-y-3">
                      {packageItem.exclusions?.map((exc, i) => (
                        <li key={i} className="flex items-start text-xs sm:text-sm text-rose-950">
                          <XCircle className="w-4 h-4 text-rose-500 mr-2 flex-shrink-0 mt-0.5" />
                          <span>{exc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {/* I. Customer Reviews Tab */}
              {activeTab === 'reviews' && (
                <div className="space-y-6 animate-fade-in">
                  {packageItem.reviews && packageItem.reviews.length > 0 ? (
                    <div className="space-y-4">
                      {packageItem.reviews.map((rev) => (
                        <div key={rev.id} className="bg-brand-bg p-5 rounded-2xl border border-gray-100 flex flex-col justify-between">
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center space-x-3">
                              <img
                                src={rev.avatar}
                                alt={rev.user}
                                className="w-10 h-10 rounded-full object-cover border border-white shadow-sm"
                              />
                              <div>
                                <h5 className="text-sm font-bold text-brand-primary">{rev.user}</h5>
                                <span className="text-xs text-brand-muted">{rev.date}</span>
                              </div>
                            </div>
                            <div className="flex items-center space-x-0.5">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-3.5 h-3.5 ${
                                    i < rev.rating ? 'fill-current text-amber-400' : 'text-gray-200'
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                          <p className="text-xs sm:text-sm text-gray-700 italic">
                            "{rev.comment}"
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-gray-500">No reviews yet for this itinerary.</p>
                  )}
                </div>
              )}

            </div>

          </div>

          {/* RIGHT COLUMN: H. Sticky Pricing & Booking Card */}
          <div className="lg:col-span-1 sticky top-24 space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-card border border-gray-100 space-y-6">
              
              {/* Pricing Display */}
              <div>
                <span className="text-xs font-bold text-brand-muted uppercase tracking-wider block mb-1">
                  Starting Price
                </span>
                <div className="flex items-baseline space-x-1">
                  <span className="text-3xl sm:text-4xl font-extrabold text-brand-primary">
                    {formatPrice(packageItem.adultPrice)}
                  </span>
                  <span className="text-xs text-brand-muted">/ adult</span>
                </div>
                <div className="text-xs text-brand-secondary font-medium mt-1">
                  Child rate: <strong>{formatPrice(packageItem.childPrice)}</strong> / child
                </div>
              </div>

              {/* Available Travel Dates Selector */}
              {packageItem.availableDates && packageItem.availableDates.length > 0 && (
                <div className="pt-4 border-t border-gray-100">
                  <label className="block text-xs font-bold text-brand-primary uppercase tracking-wider mb-2">
                    Select Available Departure Date
                  </label>
                  <select
                    value={selectedTravelDate}
                    onChange={(e) => setSelectedTravelDate(e.target.value)}
                    className="w-full px-3 py-2.5 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-brand-secondary font-medium cursor-pointer"
                  >
                    {packageItem.availableDates.map((dateStr) => (
                      <option key={dateStr} value={dateStr}>
                        Departure: {dateStr}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* Instant Book CTA Button */}
              <Link
                to={`/booking/${packageItem.id}${selectedTravelDate ? `?date=${selectedTravelDate}` : ''}`}
                className="w-full inline-flex items-center justify-center py-3.5 px-6 rounded-xl font-bold text-brand-primary bg-brand-accent hover:bg-brand-accentHover shadow-md hover:shadow-lg transition-all text-sm"
              >
                <Calendar className="w-4 h-4 mr-2" />
                <span>Book This Package Now</span>
              </Link>

              {/* Guarantees & Concierge Assistance */}
              <div className="space-y-2.5 pt-4 border-t border-gray-100 text-xs text-gray-600">
                <div className="flex items-center space-x-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>Best Price & Booking Guarantee</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-brand-secondary flex-shrink-0" />
                  <span>Free date change up to 14 days prior</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Sparkles className="w-4 h-4 text-brand-accent flex-shrink-0" />
                  <span>Tailored custom add-ons available</span>
                </div>
              </div>

            </div>

            {/* Need Help Card */}
            <div className="bg-brand-primary text-white rounded-2xl p-6 shadow-sm text-center">
              <h4 className="text-base font-bold mb-1">Have Questions?</h4>
              <p className="text-xs text-gray-300 mb-4">
                Speak directly with our dedicated destination specialist for custom inquiries.
              </p>
              <Link
                to="/contact"
                className="inline-block w-full py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-semibold text-white border border-white/20 transition-colors"
              >
                Contact Concierge Team
              </Link>
            </div>
          </div>

        </div>

        {/* J. Related Packages Section */}
        {relatedPackages.length > 0 && (
          <div className="mt-20 pt-12 border-t border-gray-200">
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="text-xs uppercase font-bold text-brand-secondary tracking-wider block mb-1">
                  Discover More
                </span>
                <h3 className="text-2xl font-bold text-brand-primary">
                  Similar Travel Itineraries
                </h3>
              </div>
              <Link
                to="/packages"
                className="text-xs font-bold text-brand-secondary hover:text-brand-accent flex items-center space-x-1"
              >
                <span>View All</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedPackages.map((pkg) => (
                <PackageCard key={pkg.id} packageItem={pkg} />
              ))}
            </div>
          </div>
        )}

      </div>

    </div>
  );
}
