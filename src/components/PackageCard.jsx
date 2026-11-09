import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Clock, MapPin, CheckCircle2, ArrowRight, Calendar } from 'lucide-react';
import { formatPrice } from '../utils/priceCalculator';

export default function PackageCard({ packageItem }) {
  const {
    id,
    title,
    destination,
    duration,
    adultPrice,
    rating,
    reviewsCount,
    shortDescription,
    image,
    category,
    inclusions
  } = packageItem;

  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-card hover:shadow-soft-hover border border-gray-100 flex flex-col transition-all duration-300 transform hover:-translate-y-1">
      {/* Image & Header Overlay */}
      <div className="relative h-56 overflow-hidden bg-gray-100">
        <img
          src={image}
          alt={title}
          loading="lazy"
          className="w-full h-full object-cover transform group-hover:scale-108 transition-transform duration-700 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        {/* Category Badge */}
        <div className="absolute top-3 left-3">
          <span className="px-3 py-1 text-xs font-semibold rounded-full bg-white/95 backdrop-blur-md text-brand-primary shadow-sm">
            {category}
          </span>
        </div>

        {/* Rating Badge */}
        <div className="absolute top-3 right-3 flex items-center space-x-1 px-2.5 py-1 text-xs font-bold rounded-full bg-brand-primary/85 backdrop-blur-md text-amber-300 shadow-sm">
          <Star className="w-3.5 h-3.5 fill-current text-amber-400" />
          <span>{rating}</span>
          <span className="text-gray-300 text-[10px]">({reviewsCount})</span>
        </div>

        {/* Duration Chip on Image */}
        <div className="absolute bottom-3 left-3 flex items-center space-x-1 text-xs font-medium text-white bg-black/50 backdrop-blur-sm px-2.5 py-1 rounded-md">
          <Clock className="w-3.5 h-3.5 text-brand-accent mr-1" />
          <span>{duration}</span>
        </div>
      </div>

      {/* Package Content */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center text-xs font-medium text-brand-secondary mb-1.5">
            <MapPin className="w-3.5 h-3.5 mr-1 text-brand-accent flex-shrink-0" />
            <span className="truncate">{destination}</span>
          </div>

          <h3 className="text-lg font-bold text-brand-primary group-hover:text-brand-secondary transition-colors line-clamp-2 mb-2 leading-snug">
            {title}
          </h3>

          <p className="text-xs text-brand-muted line-clamp-2 mb-4 leading-relaxed">
            {shortDescription}
          </p>

          {/* Included Features Highlights */}
          {inclusions && inclusions.length > 0 && (
            <div className="mb-4 space-y-1 bg-gray-50 p-2.5 rounded-xl border border-gray-100">
              {inclusions.slice(0, 2).map((item, idx) => (
                <div key={idx} className="flex items-center text-xs text-gray-600 truncate">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 mr-1.5 flex-shrink-0" />
                  <span className="truncate">{item}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Pricing & Dual CTA Buttons */}
        <div className="pt-4 border-t border-gray-100">
          <div className="flex items-baseline justify-between mb-3">
            <div>
              <span className="text-[11px] text-brand-muted uppercase font-semibold block">
                Price Per Adult
              </span>
              <div className="flex items-baseline">
                <span className="text-2xl font-extrabold text-brand-primary">
                  {formatPrice(adultPrice)}
                </span>
                <span className="text-xs text-gray-400 ml-1">/ person</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <Link
              to={`/package/${id}`}
              className="w-full inline-flex items-center justify-center py-2 px-3 rounded-xl text-xs font-bold text-brand-primary bg-gray-100 hover:bg-gray-200 transition-colors"
            >
              <span>View Details</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </Link>

            <Link
              to={`/booking/${id}`}
              className="w-full inline-flex items-center justify-center py-2 px-3 rounded-xl text-xs font-bold text-brand-primary bg-brand-accent hover:bg-brand-accentHover shadow-sm hover:shadow transition-all"
            >
              <Calendar className="w-3.5 h-3.5 mr-1" />
              <span>Book Now</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
