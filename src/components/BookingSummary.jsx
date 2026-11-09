import React from 'react';
import { ShieldCheck, Calendar, Users, MapPin, Sparkles, CheckCircle2 } from 'lucide-react';
import { formatPrice } from '../utils/priceCalculator';

export default function BookingSummary({
  packageItem,
  departureDate,
  returnDate,
  pricing
}) {
  if (!packageItem) {
    return (
      <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-card text-center text-brand-muted">
        Select a package to view booking calculations.
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-card overflow-hidden sticky top-24">
      {/* Header Banner */}
      <div className="relative h-32 overflow-hidden bg-brand-primary">
        <img
          src={packageItem.image}
          alt={packageItem.title}
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-primary via-brand-primary/40 to-transparent" />
        <div className="absolute bottom-3 left-4 right-4 text-white">
          <span className="text-[10px] uppercase font-bold tracking-wider text-brand-accent px-2 py-0.5 rounded bg-black/40 inline-block mb-1">
            Trip Summary
          </span>
          <h4 className="text-base font-bold line-clamp-1">{packageItem.title}</h4>
        </div>
      </div>

      <div className="p-6 space-y-5">
        
        {/* Destination & Duration Details */}
        <div className="space-y-2 text-xs">
          <div className="flex items-center text-gray-700">
            <MapPin className="w-4 h-4 text-brand-secondary mr-2 flex-shrink-0" />
            <span className="font-semibold text-brand-primary">Destination:</span>
            <span className="ml-auto text-brand-muted">{packageItem.destination}</span>
          </div>

          <div className="flex items-center text-gray-700">
            <Calendar className="w-4 h-4 text-brand-secondary mr-2 flex-shrink-0" />
            <span className="font-semibold text-brand-primary">Travel Dates:</span>
            <span className="ml-auto text-brand-muted">
              {departureDate ? `${departureDate} → ${returnDate || '...'}` : 'Dates not chosen'}
            </span>
          </div>

          <div className="flex items-center text-gray-700">
            <Users className="w-4 h-4 text-brand-secondary mr-2 flex-shrink-0" />
            <span className="font-semibold text-brand-primary">Travel Party:</span>
            <span className="ml-auto text-brand-muted">
              {pricing.adults} {pricing.adults === 1 ? 'Adult' : 'Adults'}
              {pricing.children > 0 && `, ${pricing.children} ${pricing.children === 1 ? 'Child' : 'Children'}`}
            </span>
          </div>
        </div>

        {/* Itemized Price Breakdown */}
        <div className="pt-4 border-t border-gray-100 space-y-2.5 text-xs">
          <h5 className="font-bold text-brand-primary uppercase tracking-wider text-[11px]">
            Price Breakdown
          </h5>

          <div className="flex justify-between items-center text-gray-600">
            <span>
              {pricing.adults}x Adult ({formatPrice(pricing.adultPrice)})
            </span>
            <span className="font-medium text-brand-primary">{formatPrice(pricing.adultsSubtotal)}</span>
          </div>

          {pricing.children > 0 && (
            <div className="flex justify-between items-center text-gray-600">
              <span>
                {pricing.children}x Child ({formatPrice(pricing.childPrice)})
              </span>
              <span className="font-medium text-brand-primary">{formatPrice(pricing.childrenSubtotal)}</span>
            </div>
          )}

          <div className="flex justify-between items-center text-gray-600">
            <span className="flex items-center">
              <span>Taxes, Tourism & Concierge (5%)</span>
            </span>
            <span className="font-medium text-brand-primary">{formatPrice(pricing.taxesAndFees)}</span>
          </div>
        </div>

        {/* Grand Total */}
        <div className="pt-4 border-t-2 border-dashed border-gray-200">
          <div className="flex items-baseline justify-between">
            <div>
              <span className="text-xs text-brand-muted font-bold uppercase tracking-wider block">
                Total Price
              </span>
              <span className="text-[11px] text-emerald-600 font-medium">All taxes & fees included</span>
            </div>
            <div className="text-right">
              <span className="text-2xl sm:text-3xl font-extrabold text-brand-primary">
                {formatPrice(pricing.totalAmount)}
              </span>
            </div>
          </div>
        </div>

        {/* Security & Guarantees */}
        <div className="bg-brand-bg rounded-xl p-3.5 space-y-2 border border-gray-100 text-[11px] text-gray-600">
          <div className="flex items-center space-x-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
            <span>100% Encrypted & Secure Booking</span>
          </div>
          <div className="flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4 text-brand-secondary flex-shrink-0" />
            <span>Instant booking confirmation generated</span>
          </div>
          <div className="flex items-center space-x-2">
            <Sparkles className="w-4 h-4 text-brand-accent flex-shrink-0" />
            <span>Free cancellation up to 48h before departure</span>
          </div>
        </div>

      </div>
    </div>
  );
}
