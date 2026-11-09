import React from 'react';
import { Star, Quote, CheckCircle } from 'lucide-react';

export default function TestimonialCard({ testimonial }) {
  const {
    name,
    role,
    location,
    avatar,
    rating,
    comment,
    packageTitle,
    destination
  } = testimonial;

  return (
    <div className="bg-white rounded-2xl p-6 shadow-card hover:shadow-soft-hover border border-gray-100 flex flex-col justify-between transition-all duration-300">
      <div>
        {/* Top Header: Rating & Quote Icon */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < rating ? 'fill-current text-amber-400' : 'text-gray-200'
                }`}
              />
            ))}
          </div>
          <Quote className="w-8 h-8 text-brand-secondary/20" />
        </div>

        {/* Comment */}
        <p className="text-sm text-brand-text leading-relaxed italic mb-6">
          "{comment}"
        </p>
      </div>

      {/* Package Tag & Traveler Info */}
      <div className="pt-4 border-t border-gray-100">
        {packageTitle && (
          <div className="text-[11px] font-medium text-brand-secondary mb-3 flex items-center">
            <span className="truncate">Trip: {packageTitle}</span>
          </div>
        )}

        <div className="flex items-center space-x-3">
          <img
            src={avatar}
            alt={name}
            className="w-11 h-11 rounded-full object-cover border-2 border-brand-accent/40 shadow-sm"
          />
          <div>
            <div className="flex items-center space-x-1.5">
              <h4 className="text-sm font-bold text-brand-primary leading-tight">{name}</h4>
              <CheckCircle className="w-3.5 h-3.5 text-blue-500 fill-current text-white" />
            </div>
            <p className="text-xs text-brand-muted">
              {role} • {location}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
