import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Briefcase, 
  Calendar, 
  MapPin, 
  Users, 
  CheckCircle, 
  XCircle, 
  AlertTriangle, 
  Eye, 
  Printer, 
  ArrowRight,
  ShieldAlert,
  Clock,
  Compass
} from 'lucide-react';
import { useBooking } from '../context/BookingContext';
import { formatPrice } from '../utils/priceCalculator';
import EmptyState from '../components/EmptyState';

export default function MyBookings() {
  const { bookings, cancelBooking } = useBooking();

  const [bookingToCancel, setBookingToCancel] = useState(null);
  const [viewingBooking, setViewingBooking] = useState(null);
  const [filterStatus, setFilterStatus] = useState('All'); // 'All' | 'Confirmed' | 'Cancelled'

  const filteredBookings = bookings.filter(b => {
    if (filterStatus === 'All') return true;
    return b.status === filterStatus;
  });

  const handleConfirmCancel = () => {
    if (bookingToCancel) {
      cancelBooking(bookingToCancel.id);
      setBookingToCancel(null);
    }
  };

  return (
    <div className="min-h-screen bg-brand-bg pb-24">
      
      {/* Header Banner */}
      <section className="bg-brand-primary text-white py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/10 text-brand-accent text-xs font-bold uppercase tracking-wider mb-3">
                <Briefcase className="w-3.5 h-3.5" />
                <span>Traveler Portal</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                My Itinerary Bookings
              </h1>
              <p className="text-gray-300 text-xs sm:text-sm mt-1">
                View, track, or manage your confirmed travel reservations.
              </p>
            </div>

            <div className="flex items-center space-x-3">
              <Link
                to="/packages"
                className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-brand-accent hover:bg-brand-accentHover text-brand-primary font-bold text-xs shadow-md transition-all"
              >
                <Compass className="w-4 h-4" />
                <span>Explore New Packages</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Main Bookings Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        
        {/* Filter Pills */}
        <div className="flex items-center space-x-2 mb-6">
          <span className="text-xs font-bold text-brand-muted uppercase tracking-wider mr-2">
            Status:
          </span>
          {['All', 'Confirmed', 'Cancelled'].map((st) => (
            <button
              key={st}
              onClick={() => setFilterStatus(st)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                filterStatus === st
                  ? 'bg-brand-primary text-white shadow-sm'
                  : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              {st} {st === 'All' ? `(${bookings.length})` : `(${bookings.filter(b => b.status === st).length})`}
            </button>
          ))}
        </div>

        {/* Bookings List or Empty State */}
        {filteredBookings.length > 0 ? (
          <div className="space-y-4">
            {filteredBookings.map((b) => {
              const isConfirmed = b.status === 'Confirmed';
              const createdDateFormatted = b.createdAt ? new Date(b.createdAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
              }) : 'Recent';

              return (
                <div
                  key={b.id}
                  className="bg-white rounded-2xl p-5 sm:p-6 shadow-card border border-gray-100 hover:shadow-soft-hover transition-all flex flex-col lg:flex-row lg:items-center justify-between gap-6"
                >
                  {/* Left Column: Reference & Primary Info */}
                  <div className="space-y-2 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-xs font-black text-brand-primary bg-brand-bg px-2.5 py-1 rounded-lg border border-gray-200">
                        {b.id}
                      </span>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${
                        isConfirmed 
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                          : 'bg-rose-100 text-rose-800 border border-rose-200'
                      }`}>
                        {isConfirmed ? (
                          <CheckCircle className="w-3 h-3 mr-1 text-emerald-600" />
                        ) : (
                          <XCircle className="w-3 h-3 mr-1 text-rose-600" />
                        )}
                        {b.status}
                      </span>
                      <span className="text-[11px] text-gray-400">
                        Booked on {createdDateFormatted}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-brand-primary">
                      {b.travel?.packageName || 'Custom Travel Itinerary'}
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs text-gray-600 pt-1">
                      <div className="flex items-center space-x-1.5">
                        <MapPin className="w-4 h-4 text-brand-secondary flex-shrink-0" />
                        <span className="truncate">{b.travel?.destination}</span>
                      </div>
                      <div className="flex items-center space-x-1.5">
                        <Calendar className="w-4 h-4 text-brand-secondary flex-shrink-0" />
                        <span>{b.travel?.departureDate} → {b.travel?.returnDate}</span>
                      </div>
                      <div className="flex items-center space-x-1.5">
                        <Users className="w-4 h-4 text-brand-secondary flex-shrink-0" />
                        <span>
                          {b.travel?.adults} {b.travel?.adults === 1 ? 'Adult' : 'Adults'}
                          {b.travel?.children > 0 && `, ${b.travel?.children} Children`}
                        </span>
                      </div>
                    </div>

                    <div className="text-xs text-gray-500">
                      Traveler: <strong className="text-gray-700">{b.customer?.fullName}</strong> ({b.customer?.email})
                    </div>
                  </div>

                  {/* Right Column: Pricing & Actions */}
                  <div className="flex flex-row lg:flex-col items-center lg:items-end justify-between border-t lg:border-t-0 pt-4 lg:pt-0 border-gray-100 gap-4">
                    <div className="text-left lg:text-right">
                      <span className="text-[11px] text-brand-muted uppercase font-bold block">
                        Total Amount
                      </span>
                      <span className="text-xl sm:text-2xl font-black text-brand-primary">
                        {formatPrice(b.pricing?.totalAmount || 0)}
                      </span>
                    </div>

                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => setViewingBooking(b)}
                        className="inline-flex items-center space-x-1 px-3.5 py-2 rounded-xl text-xs font-bold text-brand-primary bg-gray-100 hover:bg-gray-200 transition-colors"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Details</span>
                      </button>

                      {isConfirmed && (
                        <button
                          onClick={() => setBookingToCancel(b)}
                          className="inline-flex items-center space-x-1 px-3.5 py-2 rounded-xl text-xs font-bold text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 transition-colors"
                        >
                          <XCircle className="w-3.5 h-3.5" />
                          <span>Cancel</span>
                        </button>
                      )}
                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        ) : (
          <EmptyState
            title="No Bookings Found"
            message={
              filterStatus === 'All'
                ? "You haven't reserved any travel packages yet. Explore our world destinations and book your dream getaway today!"
                : `You do not have any ${filterStatus.toLowerCase()} bookings.`
            }
            actionText="Discover Travel Packages"
            onAction={() => window.location.href = '/packages'}
          />
        )}

      </div>

      {/* ==========================================
          MODAL 1: VIEW BOOKING DETAILS MODAL
      ========================================== */}
      {viewingBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative border border-gray-100 max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-start justify-between border-b pb-4 mb-6">
              <div>
                <span className="text-xs uppercase font-bold tracking-wider text-brand-secondary block mb-1">
                  Reservation Details
                </span>
                <h3 className="text-xl font-bold text-brand-primary">
                  {viewingBooking.travel?.packageName}
                </h3>
                <span className="text-xs text-gray-500 font-mono">Ref: {viewingBooking.id}</span>
              </div>

              <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                viewingBooking.status === 'Confirmed'
                  ? 'bg-emerald-100 text-emerald-800'
                  : 'bg-rose-100 text-rose-800'
              }`}>
                {viewingBooking.status}
              </span>
            </div>

            <div className="space-y-6 text-sm">
              
              {/* Traveler & Dates */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-brand-bg p-4 rounded-2xl border border-gray-100">
                <div>
                  <h5 className="text-xs font-bold uppercase text-brand-muted mb-1">Lead Traveler</h5>
                  <p className="font-semibold text-brand-primary">{viewingBooking.customer?.fullName}</p>
                  <p className="text-xs text-gray-600">{viewingBooking.customer?.email}</p>
                  <p className="text-xs text-gray-600">{viewingBooking.customer?.phone}</p>
                </div>
                <div>
                  <h5 className="text-xs font-bold uppercase text-brand-muted mb-1">Trip Schedule</h5>
                  <p className="text-xs text-gray-700">
                    <strong>Departure:</strong> {viewingBooking.travel?.departureDate}
                  </p>
                  <p className="text-xs text-gray-700">
                    <strong>Return:</strong> {viewingBooking.travel?.returnDate}
                  </p>
                  <p className="text-xs text-gray-700">
                    <strong>Party:</strong> {viewingBooking.travel?.adults} Adults
                    {viewingBooking.travel?.children > 0 && `, ${viewingBooking.travel?.children} Children`}
                  </p>
                </div>
              </div>

              {/* Special Requests */}
              <div>
                <h5 className="text-xs font-bold uppercase text-brand-muted mb-1">Special Preferences</h5>
                <p className="text-xs text-gray-600 italic bg-gray-50 p-3 rounded-xl border border-gray-100">
                  {viewingBooking.specialRequests || 'No special preferences noted.'}
                </p>
              </div>

              {/* Price Breakdown */}
              <div className="border-t pt-4 space-y-2 text-xs">
                <div className="flex justify-between text-gray-600">
                  <span>Adults Subtotal</span>
                  <span className="font-semibold text-brand-primary">{formatPrice(viewingBooking.pricing?.adultsSubtotal || 0)}</span>
                </div>
                {viewingBooking.pricing?.childrenSubtotal > 0 && (
                  <div className="flex justify-between text-gray-600">
                    <span>Children Subtotal</span>
                    <span className="font-semibold text-brand-primary">{formatPrice(viewingBooking.pricing?.childrenSubtotal || 0)}</span>
                  </div>
                )}
                <div className="flex justify-between text-gray-600">
                  <span>Taxes, Concierge & Protection</span>
                  <span className="font-semibold text-brand-primary">{formatPrice(viewingBooking.pricing?.taxesAndFees || 0)}</span>
                </div>
                <div className="flex justify-between text-base font-bold text-brand-primary pt-2 border-t">
                  <span>Total Amount Paid</span>
                  <span className="text-emerald-700">{formatPrice(viewingBooking.pricing?.totalAmount || 0)}</span>
                </div>
              </div>

            </div>

            {/* Modal Actions */}
            <div className="mt-8 pt-4 border-t flex items-center justify-end space-x-3">
              <button
                onClick={() => window.print()}
                className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-xl text-xs font-bold text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors"
              >
                <Printer className="w-4 h-4" />
                <span>Print</span>
              </button>
              <button
                onClick={() => setViewingBooking(null)}
                className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-brand-primary hover:bg-brand-navyLight transition-colors"
              >
                Close
              </button>
            </div>

          </div>
        </div>
      )}

      {/* ==========================================
          MODAL 2: CONFIRM CANCELLATION DIALOG
      ========================================== */}
      {bookingToCancel && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl relative border border-gray-100 text-center">
            <div className="w-14 h-14 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto mb-4">
              <AlertTriangle className="w-8 h-8" />
            </div>

            <h3 className="text-xl font-bold text-brand-primary mb-2">
              Cancel Travel Booking?
            </h3>

            <p className="text-xs sm:text-sm text-brand-muted mb-6 leading-relaxed">
              Are you sure you want to cancel booking <strong>{bookingToCancel.id}</strong> for <strong>{bookingToCancel.travel?.packageName}</strong>? 
              Your booking will be marked as Cancelled and your dates will be released.
            </p>

            <div className="flex items-center justify-center space-x-3">
              <button
                onClick={() => setBookingToCancel(null)}
                className="px-5 py-2.5 rounded-xl text-xs font-bold text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors"
              >
                Keep Booking
              </button>
              <button
                onClick={handleConfirmCancel}
                className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 shadow-sm transition-colors"
              >
                Yes, Cancel Reservation
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
