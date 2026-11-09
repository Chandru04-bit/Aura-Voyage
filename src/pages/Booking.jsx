import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useSearchParams, useNavigate, Link } from 'react-router-dom';
import { 
  CheckCircle2, 
  Calendar, 
  Users, 
  Mail, 
  Phone, 
  User, 
  FileText, 
  ShieldCheck, 
  ArrowLeft, 
  Printer, 
  Briefcase,
  AlertCircle,
  Sparkles
} from 'lucide-react';
import { packages } from '../data/packages';
import { useBooking } from '../context/BookingContext';
import { calculateBookingPrice, generateBookingReference, formatPrice } from '../utils/priceCalculator';
import { validateBookingForm } from '../utils/validation';
import BookingSummary from '../components/BookingSummary';

export default function Booking() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { createBooking } = useBooking();

  // Selected package (default to URL param or first package)
  const [selectedPackageId, setSelectedPackageId] = useState(id || packages[0].id);

  const activePackage = useMemo(() => {
    return packages.find(p => p.id === selectedPackageId) || packages[0];
  }, [selectedPackageId]);

  // Form state
  const todayStr = new Date().toISOString().split('T')[0];
  const urlDate = searchParams.get('date');
  const defaultDeparture = urlDate || activePackage.availableDates?.[0] || todayStr;
  
  // Compute default return date (based on package days)
  const calculateDefaultReturn = (depDate, daysCount) => {
    try {
      const d = new Date(depDate);
      d.setDate(d.getDate() + (daysCount || 5));
      return d.toISOString().split('T')[0];
    } catch {
      return '';
    }
  };

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    departureDate: defaultDeparture,
    returnDate: calculateDefaultReturn(defaultDeparture, activePackage.days),
    adults: 2,
    children: 0,
    specialRequests: ''
  });

  const [formErrors, setFormErrors] = useState({});
  const [submittedBooking, setSubmittedBooking] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Recalculate return date when package or departure date changes if return date is empty
  useEffect(() => {
    if (activePackage) {
      setFormData(prev => ({
        ...prev,
        returnDate: calculateDefaultReturn(prev.departureDate, activePackage.days)
      }));
    }
  }, [activePackage, formData.departureDate]);

  // Calculate live pricing
  const pricing = useMemo(() => {
    return calculateBookingPrice({
      adultPrice: activePackage.adultPrice,
      childPrice: activePackage.childPrice,
      adults: formData.adults,
      children: formData.children
    });
  }, [activePackage, formData.adults, formData.children]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error for this field
    if (formErrors[field]) {
      setFormErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handlePackageChange = (e) => {
    setSelectedPackageId(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validation = validateBookingForm({
      ...formData,
      packageId: activePackage.id
    });

    if (!validation.isValid) {
      setFormErrors(validation.errors);
      // Scroll to first error
      window.scrollTo({ top: 150, behavior: 'smooth' });
      return;
    }

    setIsSubmitting(true);

    const bookingReference = generateBookingReference();
    const newBooking = {
      id: bookingReference,
      createdAt: new Date().toISOString(),
      status: 'Confirmed',
      customer: {
        fullName: formData.fullName.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim()
      },
      travel: {
        packageId: activePackage.id,
        packageName: activePackage.title,
        destinationId: activePackage.destinationId,
        destination: activePackage.destination,
        departureDate: formData.departureDate,
        returnDate: formData.returnDate,
        adults: pricing.adults,
        children: pricing.children,
        totalTravellers: pricing.totalTravellers
      },
      pricing: {
        adultPrice: activePackage.adultPrice,
        childPrice: activePackage.childPrice,
        adultsSubtotal: pricing.adultsSubtotal,
        childrenSubtotal: pricing.childrenSubtotal,
        taxesAndFees: pricing.taxesAndFees,
        totalAmount: pricing.totalAmount
      },
      specialRequests: formData.specialRequests.trim() || 'No special requests submitted.'
    };

    // Save to LocalStorage via Context
    setTimeout(() => {
      createBooking(newBooking);
      setSubmittedBooking(newBooking);
      setIsSubmitting(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 600);
  };

  // ==========================================
  // CONFIRMATION SCREEN
  // ==========================================
  if (submittedBooking) {
    return (
      <div className="min-h-screen bg-brand-bg py-12 sm:py-20 animate-fade-in">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="bg-white rounded-3xl shadow-soft-hover border border-gray-100 overflow-hidden">
            
            {/* Top Success Banner */}
            <div className="bg-emerald-600 text-white p-8 sm:p-10 text-center relative overflow-hidden">
              <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-4 border border-white/30 backdrop-blur-md">
                <CheckCircle2 className="w-10 h-10 text-white" />
              </div>
              <span className="text-xs uppercase font-bold tracking-widest text-emerald-100 block mb-1">
                Booking Confirmed
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold mb-2">
                Your Adventure Awaits!
              </h1>
              <p className="text-emerald-100 text-xs sm:text-sm max-w-md mx-auto">
                We've reserved your package and sent a confirmation receipt to <strong className="text-white">{submittedBooking.customer.email}</strong>.
              </p>
            </div>

            {/* Receipt Body */}
            <div className="p-6 sm:p-10 space-y-8">
              
              {/* Reference ID & Status Badge */}
              <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-brand-bg border border-gray-100">
                <div>
                  <span className="text-xs text-brand-muted font-bold uppercase tracking-wider block">
                    Booking Reference ID
                  </span>
                  <span className="text-xl sm:text-2xl font-black text-brand-primary tracking-wider">
                    {submittedBooking.id}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                    Status: {submittedBooking.status}
                  </span>
                </div>
              </div>

              {/* Itinerary Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                <div className="space-y-3">
                  <h4 className="font-bold text-brand-primary uppercase text-xs tracking-wider border-b pb-1">
                    Trip Summary
                  </h4>
                  <p className="text-gray-700">
                    <strong>Package:</strong> {submittedBooking.travel.packageName}
                  </p>
                  <p className="text-gray-700">
                    <strong>Destination:</strong> {submittedBooking.travel.destination}
                  </p>
                  <p className="text-gray-700">
                    <strong>Dates:</strong> {submittedBooking.travel.departureDate} to {submittedBooking.travel.returnDate}
                  </p>
                  <p className="text-gray-700">
                    <strong>Travellers:</strong> {submittedBooking.travel.adults} Adults
                    {submittedBooking.travel.children > 0 ? `, ${submittedBooking.travel.children} Children` : ''}
                  </p>
                </div>

                <div className="space-y-3">
                  <h4 className="font-bold text-brand-primary uppercase text-xs tracking-wider border-b pb-1">
                    Lead Traveler
                  </h4>
                  <p className="text-gray-700">
                    <strong>Name:</strong> {submittedBooking.customer.fullName}
                  </p>
                  <p className="text-gray-700">
                    <strong>Email:</strong> {submittedBooking.customer.email}
                  </p>
                  <p className="text-gray-700">
                    <strong>Phone:</strong> {submittedBooking.customer.phone}
                  </p>
                  <p className="text-gray-700">
                    <strong>Special Requests:</strong> {submittedBooking.specialRequests}
                  </p>
                </div>
              </div>

              {/* Pricing Breakdown Card */}
              <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100 space-y-2 text-xs sm:text-sm">
                <div className="flex justify-between text-gray-600">
                  <span>Adults Subtotal ({submittedBooking.travel.adults}x)</span>
                  <span className="font-semibold text-brand-primary">{formatPrice(submittedBooking.pricing.adultsSubtotal)}</span>
                </div>
                {submittedBooking.pricing.childrenSubtotal > 0 && (
                  <div className="flex justify-between text-gray-600">
                    <span>Children Subtotal ({submittedBooking.travel.children}x)</span>
                    <span className="font-semibold text-brand-primary">{formatPrice(submittedBooking.pricing.childrenSubtotal)}</span>
                  </div>
                )}
                <div className="flex justify-between text-gray-600">
                  <span>Taxes, Concierge & Protection Fees</span>
                  <span className="font-semibold text-brand-primary">{formatPrice(submittedBooking.pricing.taxesAndFees)}</span>
                </div>
                <div className="pt-3 border-t border-gray-200 flex justify-between items-baseline font-bold text-base sm:text-lg text-brand-primary">
                  <span>Total Paid (USD)</span>
                  <span className="text-emerald-700">{formatPrice(submittedBooking.pricing.totalAmount)}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-100">
                <Link
                  to="/my-bookings"
                  className="flex-1 inline-flex items-center justify-center py-3.5 px-6 rounded-xl font-bold text-brand-primary bg-brand-accent hover:bg-brand-accentHover shadow-md transition-all text-sm"
                >
                  <Briefcase className="w-4 h-4 mr-2" />
                  <span>Go to My Bookings</span>
                </Link>

                <button
                  onClick={() => window.print()}
                  className="inline-flex items-center justify-center py-3.5 px-6 rounded-xl font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors text-sm"
                >
                  <Printer className="w-4 h-4 mr-2" />
                  <span>Print Receipt</span>
                </button>

                <Link
                  to="/packages"
                  className="inline-flex items-center justify-center py-3.5 px-6 rounded-xl font-semibold text-brand-secondary hover:text-brand-primary transition-colors text-sm"
                >
                  Explore More
                </Link>
              </div>

            </div>
          </div>
        </div>
      </div>
    );
  }

  // ==========================================
  // BOOKING FORM SCREEN
  // ==========================================
  return (
    <div className="min-h-screen bg-brand-bg pb-24">
      
      {/* Page Header */}
      <div className="bg-brand-primary text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            to={`/package/${activePackage.id}`}
            className="inline-flex items-center text-xs text-gray-300 hover:text-white mb-3 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            <span>Back to package details</span>
          </Link>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            Reserve Your Journey
          </h1>
          <p className="text-xs sm:text-sm text-gray-300 mt-1">
            Complete the form below to confirm your luxury package with instantaneous confirmation.
          </p>
        </div>
      </div>

      {/* Main Form + Live Summary Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
          
          {/* Left 2 Columns: Form Fields */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-6 sm:p-8 shadow-card border border-gray-100 space-y-8">
              
              {/* SECTION 1: Package Selection */}
              <div>
                <div className="flex items-center space-x-2 pb-3 mb-4 border-b border-gray-100">
                  <div className="w-7 h-7 rounded-lg bg-brand-primary text-white flex items-center justify-center font-bold text-xs">
                    1
                  </div>
                  <h3 className="text-base font-bold text-brand-primary">
                    Selected Travel Package
                  </h3>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-brand-muted uppercase tracking-wider mb-1.5">
                      Change or Select Package
                    </label>
                    <select
                      value={selectedPackageId}
                      onChange={handlePackageChange}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-semibold text-brand-primary focus:outline-none focus:ring-1 focus:ring-brand-secondary cursor-pointer"
                    >
                      {packages.map((pkg) => (
                        <option key={pkg.id} value={pkg.id}>
                          {pkg.title} — {pkg.destination} ({formatPrice(pkg.adultPrice)}/adult)
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* SECTION 2: Customer Information */}
              <div>
                <div className="flex items-center space-x-2 pb-3 mb-4 border-b border-gray-100">
                  <div className="w-7 h-7 rounded-lg bg-brand-primary text-white flex items-center justify-center font-bold text-xs">
                    2
                  </div>
                  <h3 className="text-base font-bold text-brand-primary">
                    Customer Information
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Full Name */}
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-brand-muted uppercase tracking-wider mb-1.5">
                      Full Name *
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 transform -translate-y-1/2" />
                      <input
                        type="text"
                        placeholder="e.g. Eleanor Vance"
                        value={formData.fullName}
                        onChange={(e) => handleInputChange('fullName', e.target.value)}
                        className={`w-full pl-10 pr-4 py-2.5 text-sm bg-gray-50 border rounded-xl focus:outline-none transition-all ${
                          formErrors.fullName ? 'border-red-400 ring-1 ring-red-400 bg-red-50/20' : 'border-gray-200 focus:ring-1 focus:ring-brand-secondary'
                        }`}
                      />
                    </div>
                    {formErrors.fullName && (
                      <p className="text-xs text-red-500 mt-1 flex items-center">
                        <AlertCircle className="w-3.5 h-3.5 mr-1" />
                        {formErrors.fullName}
                      </p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-xs font-bold text-brand-muted uppercase tracking-wider mb-1.5">
                      Email Address *
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 transform -translate-y-1/2" />
                      <input
                        type="email"
                        placeholder="e.g. eleanor@example.com"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className={`w-full pl-10 pr-4 py-2.5 text-sm bg-gray-50 border rounded-xl focus:outline-none transition-all ${
                          formErrors.email ? 'border-red-400 ring-1 ring-red-400 bg-red-50/20' : 'border-gray-200 focus:ring-1 focus:ring-brand-secondary'
                        }`}
                      />
                    </div>
                    {formErrors.email && (
                      <p className="text-xs text-red-500 mt-1 flex items-center">
                        <AlertCircle className="w-3.5 h-3.5 mr-1" />
                        {formErrors.email}
                      </p>
                    )}
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-xs font-bold text-brand-muted uppercase tracking-wider mb-1.5">
                      Phone Number *
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 transform -translate-y-1/2" />
                      <input
                        type="tel"
                        placeholder="e.g. +1 (555) 019-2834"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        className={`w-full pl-10 pr-4 py-2.5 text-sm bg-gray-50 border rounded-xl focus:outline-none transition-all ${
                          formErrors.phone ? 'border-red-400 ring-1 ring-red-400 bg-red-50/20' : 'border-gray-200 focus:ring-1 focus:ring-brand-secondary'
                        }`}
                      />
                    </div>
                    {formErrors.phone && (
                      <p className="text-xs text-red-500 mt-1 flex items-center">
                        <AlertCircle className="w-3.5 h-3.5 mr-1" />
                        {formErrors.phone}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* SECTION 3: Travel Information */}
              <div>
                <div className="flex items-center space-x-2 pb-3 mb-4 border-b border-gray-100">
                  <div className="w-7 h-7 rounded-lg bg-brand-primary text-white flex items-center justify-center font-bold text-xs">
                    3
                  </div>
                  <h3 className="text-base font-bold text-brand-primary">
                    Travel Dates & Party Size
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Departure Date */}
                  <div>
                    <label className="block text-xs font-bold text-brand-muted uppercase tracking-wider mb-1.5">
                      Departure Date *
                    </label>
                    <div className="relative">
                      <Calendar className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 transform -translate-y-1/2" />
                      <input
                        type="date"
                        min={todayStr}
                        value={formData.departureDate}
                        onChange={(e) => handleInputChange('departureDate', e.target.value)}
                        className={`w-full pl-10 pr-4 py-2.5 text-sm bg-gray-50 border rounded-xl focus:outline-none transition-all ${
                          formErrors.departureDate ? 'border-red-400 ring-1 ring-red-400' : 'border-gray-200 focus:ring-1 focus:ring-brand-secondary'
                        }`}
                      />
                    </div>
                    {formErrors.departureDate && (
                      <p className="text-xs text-red-500 mt-1 flex items-center">
                        <AlertCircle className="w-3.5 h-3.5 mr-1" />
                        {formErrors.departureDate}
                      </p>
                    )}
                  </div>

                  {/* Return Date */}
                  <div>
                    <label className="block text-xs font-bold text-brand-muted uppercase tracking-wider mb-1.5">
                      Return Date *
                    </label>
                    <div className="relative">
                      <Calendar className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 transform -translate-y-1/2" />
                      <input
                        type="date"
                        min={formData.departureDate || todayStr}
                        value={formData.returnDate}
                        onChange={(e) => handleInputChange('returnDate', e.target.value)}
                        className={`w-full pl-10 pr-4 py-2.5 text-sm bg-gray-50 border rounded-xl focus:outline-none transition-all ${
                          formErrors.returnDate ? 'border-red-400 ring-1 ring-red-400' : 'border-gray-200 focus:ring-1 focus:ring-brand-secondary'
                        }`}
                      />
                    </div>
                    {formErrors.returnDate && (
                      <p className="text-xs text-red-500 mt-1 flex items-center">
                        <AlertCircle className="w-3.5 h-3.5 mr-1" />
                        {formErrors.returnDate}
                      </p>
                    )}
                  </div>

                  {/* Number of Adults */}
                  <div>
                    <label className="block text-xs font-bold text-brand-muted uppercase tracking-wider mb-1.5">
                      Adults (Age 12+) *
                    </label>
                    <div className="relative">
                      <Users className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 transform -translate-y-1/2" />
                      <select
                        value={formData.adults}
                        onChange={(e) => handleInputChange('adults', parseInt(e.target.value, 10))}
                        className="w-full pl-10 pr-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-brand-secondary cursor-pointer font-medium"
                      >
                        {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                          <option key={num} value={num}>
                            {num} {num === 1 ? 'Adult' : 'Adults'}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Number of Children */}
                  <div>
                    <label className="block text-xs font-bold text-brand-muted uppercase tracking-wider mb-1.5">
                      Children (Age 2-11)
                    </label>
                    <div className="relative">
                      <Users className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 transform -translate-y-1/2" />
                      <select
                        value={formData.children}
                        onChange={(e) => handleInputChange('children', parseInt(e.target.value, 10))}
                        className="w-full pl-10 pr-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-brand-secondary cursor-pointer font-medium"
                      >
                        {[0, 1, 2, 3, 4, 5].map((num) => (
                          <option key={num} value={num}>
                            {num} {num === 1 ? 'Child' : 'Children'}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              {/* SECTION 4: Additional Requirements */}
              <div>
                <div className="flex items-center space-x-2 pb-3 mb-4 border-b border-gray-100">
                  <div className="w-7 h-7 rounded-lg bg-brand-primary text-white flex items-center justify-center font-bold text-xs">
                    4
                  </div>
                  <h3 className="text-base font-bold text-brand-primary">
                    Special Requests & Preferences
                  </h3>
                </div>

                <div>
                  <label className="block text-xs font-bold text-brand-muted uppercase tracking-wider mb-1.5">
                    Dietary Requirements, Honeymoon Setup, or Bed Preferences (Optional)
                  </label>
                  <textarea
                    rows={3}
                    placeholder="e.g. Vegetarian meal preferences, high-floor quiet room, anniversary flowers..."
                    value={formData.specialRequests}
                    onChange={(e) => handleInputChange('specialRequests', e.target.value)}
                    className="w-full p-3.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-brand-secondary transition-all"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 px-6 rounded-xl font-extrabold text-brand-primary bg-brand-accent hover:bg-brand-accentHover shadow-md hover:shadow-lg transition-all text-base flex items-center justify-center space-x-2 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>Securing Your Reservation...</span>
                  ) : (
                    <>
                      <CheckCircle2 className="w-5 h-5 mr-1" />
                      <span>Confirm & Book ({formatPrice(pricing.totalAmount)})</span>
                    </>
                  )}
                </button>
                <p className="text-center text-[11px] text-gray-400 mt-2.5">
                  By clicking Confirm, you accept our standard reservation terms. No cancellation penalties up to 48h prior.
                </p>
              </div>

            </form>
          </div>

          {/* Right Column: Live Booking Summary */}
          <div className="lg:col-span-1">
            <BookingSummary
              packageItem={activePackage}
              departureDate={formData.departureDate}
              returnDate={formData.returnDate}
              pricing={pricing}
            />
          </div>

        </div>
      </div>

    </div>
  );
}
