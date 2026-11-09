import React from 'react';
import { Compass, RotateCcw } from 'lucide-react';

export default function EmptyState({
  title = "No Matches Found",
  message = "We couldn't find any travel itineraries matching your current filters. Try expanding your search or clearing active filters.",
  actionText = "Reset All Filters",
  onAction,
  icon: Icon = Compass
}) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-8 sm:p-12 text-center max-w-lg mx-auto shadow-sm my-6 animate-fade-in">
      <div className="w-16 h-16 rounded-full bg-brand-bg flex items-center justify-center mx-auto mb-4 text-brand-secondary border border-gray-200">
        <Icon className="w-8 h-8" />
      </div>
      <h3 className="text-xl font-bold text-brand-primary mb-2">
        {title}
      </h3>
      <p className="text-sm text-brand-muted leading-relaxed mb-6">
        {message}
      </p>
      {onAction && (
        <button
          onClick={onAction}
          className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl font-semibold text-sm text-brand-primary bg-brand-accent hover:bg-brand-accentHover transition-colors shadow-sm"
        >
          <RotateCcw className="w-4 h-4" />
          <span>{actionText}</span>
        </button>
      )}
    </div>
  );
}
