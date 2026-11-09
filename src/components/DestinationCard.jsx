import React from 'react';
import { Link } from 'react-router-dom';
import { Star, MapPin, ArrowRight } from 'lucide-react';
import { formatPrice } from '../utils/priceCalculator';

export default function DestinationCard({ destination }) {
  const {
    id,
    name,
    country,
    category,
    startingPrice,
    rating,
    reviewsCount,
    shortDescription,
    image,
    duration
  } = destination;

  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-card hover:shadow-soft-hover border border-gray-100 flex flex-col transition-all duration-300 transform hover:-translate-y-1">
      {/* Image & Badges */}
      <div className="relative h-56 sm:h-64 overflow-hidden bg-gray-100">
        <img
          src={image}
          alt={`${name}, ${country}`}
          loading="lazy"
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        
        {/* Category Badge */}
        <div className="absolute top-3 left-3">
          <span className="px-3 py-1 text-xs font-semibold rounded-full bg-white/90 backdrop-blur-md text-brand-primary shadow-sm">
            {category}
          </span>
        </div>

        {/* Rating Badge */}
        <div className="absolute top-3 right-3 flex items-center space-x-1 px-2.5 py-1 text-xs font-bold rounded-full bg-brand-primary/80 backdrop-blur-md text-amber-300 shadow-sm">
          <Star className="w-3.5 h-3.5 fill-current text-amber-400" />
          <span>{rating}</span>
          <span className="text-gray-300 text-[10px]">({reviewsCount})</span>
        </div>

        {/* Floating Location Overlay */}
        <div className="absolute bottom-3 left-3 right-3 text-white">
          <div className="flex items-center text-xs font-medium text-gray-200 mb-0.5">
            <MapPin className="w-3.5 h-3.5 mr-1 text-brand-accent" />
            <span>{country}</span>
          </div>
          <h3 className="text-xl font-bold tracking-tight text-white drop-shadow-sm">
            {name}
          </h3>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <p className="text-sm text-brand-muted line-clamp-2 mb-4 leading-relaxed">
            {shortDescription}
          </p>
          {duration && (
            <div className="text-xs text-brand-secondary font-medium mb-3">
              Standard tour: <span className="font-semibold text-brand-primary">{duration}</span>
            </div>
          )}
        </div>

        <div className="pt-4 border-t border-gray-100 flex items-center justify-between mt-auto">
          <div>
            <span className="text-[11px] text-brand-muted uppercase font-semibold block">
              Starting From
            </span>
            <div className="flex items-baseline">
              <span className="text-xl font-extrabold text-brand-primary">
                {formatPrice(startingPrice)}
              </span>
              <span className="text-xs text-gray-400 ml-1">/ person</span>
            </div>
          </div>

          <Link
            to={`/packages?dest=${encodeURIComponent(name)}`}
            className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-brand-secondary hover:bg-brand-primary shadow-sm hover:shadow transition-all"
          >
            <span>Explore</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
