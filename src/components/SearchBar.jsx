import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Calendar, Users, Search } from 'lucide-react';
import { destinations } from '../data/destinations';
import { useBooking } from '../context/BookingContext';

export default function SearchBar({ compact = false }) {
  const navigate = useNavigate();
  const { searchParams, updateSearchQuery } = useBooking();

  const todayStr = new Date().toISOString().split('T')[0];
  const tomorrowDate = new Date();
  tomorrowDate.setDate(tomorrowDate.getDate() + 5);
  const nextWeekStr = tomorrowDate.toISOString().split('T')[0];

  const [destination, setDestination] = useState(searchParams.destination || '');
  const [departureDate, setDepartureDate] = useState(searchParams.departureDate || todayStr);
  const [returnDate, setReturnDate] = useState(searchParams.returnDate || nextWeekStr);
  const [travellers, setTravellers] = useState(searchParams.travellers || '2');

  const handleSubmit = (e) => {
    e.preventDefault();
    updateSearchQuery({
      destination,
      departureDate,
      returnDate,
      travellers
    });

    const query = new URLSearchParams();
    if (destination) query.append('dest', destination);
    if (departureDate) query.append('from', departureDate);
    if (returnDate) query.append('to', returnDate);
    if (travellers) query.append('travellers', travellers);

    navigate(`/packages?${query.toString()}`);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`bg-white rounded-2xl shadow-soft p-4 lg:p-5 border border-gray-100 transition-all ${
        compact ? 'max-w-4xl mx-auto' : 'w-full'
      }`}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Destination Field */}
        <div className="relative">
          <label className="block text-xs font-semibold text-brand-muted uppercase tracking-wider mb-1">
            Destination
          </label>
          <div className="flex items-center bg-gray-50 hover:bg-gray-100 rounded-xl px-3 py-2.5 border border-gray-200 focus-within:border-brand-secondary focus-within:ring-1 focus-within:ring-brand-secondary transition-all">
            <MapPin className="w-5 h-5 text-brand-secondary mr-2 flex-shrink-0" />
            <select
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="w-full bg-transparent text-sm font-medium text-brand-text focus:outline-none cursor-pointer"
            >
              <option value="">Where to? (All Destinations)</option>
              {destinations.map((dest) => (
                <option key={dest.id} value={dest.name}>
                  {dest.name}, {dest.country}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Departure Date */}
        <div className="relative">
          <label className="block text-xs font-semibold text-brand-muted uppercase tracking-wider mb-1">
            Departure Date
          </label>
          <div className="flex items-center bg-gray-50 hover:bg-gray-100 rounded-xl px-3 py-2.5 border border-gray-200 focus-within:border-brand-secondary focus-within:ring-1 focus-within:ring-brand-secondary transition-all">
            <Calendar className="w-5 h-5 text-brand-secondary mr-2 flex-shrink-0" />
            <input
              type="date"
              min={todayStr}
              value={departureDate}
              onChange={(e) => setDepartureDate(e.target.value)}
              className="w-full bg-transparent text-sm font-medium text-brand-text focus:outline-none"
            />
          </div>
        </div>

        {/* Return Date */}
        <div className="relative">
          <label className="block text-xs font-semibold text-brand-muted uppercase tracking-wider mb-1">
            Return Date
          </label>
          <div className="flex items-center bg-gray-50 hover:bg-gray-100 rounded-xl px-3 py-2.5 border border-gray-200 focus-within:border-brand-secondary focus-within:ring-1 focus-within:ring-brand-secondary transition-all">
            <Calendar className="w-5 h-5 text-brand-secondary mr-2 flex-shrink-0" />
            <input
              type="date"
              min={departureDate || todayStr}
              value={returnDate}
              onChange={(e) => setReturnDate(e.target.value)}
              className="w-full bg-transparent text-sm font-medium text-brand-text focus:outline-none"
            />
          </div>
        </div>

        {/* Number of Travellers & Submit */}
        <div className="flex flex-col sm:flex-row gap-2 items-end">
          <div className="w-full">
            <label className="block text-xs font-semibold text-brand-muted uppercase tracking-wider mb-1">
              Travellers
            </label>
            <div className="flex items-center bg-gray-50 hover:bg-gray-100 rounded-xl px-3 py-2.5 border border-gray-200 focus-within:border-brand-secondary focus-within:ring-1 focus-within:ring-brand-secondary transition-all">
              <Users className="w-5 h-5 text-brand-secondary mr-2 flex-shrink-0" />
              <select
                value={travellers}
                onChange={(e) => setTravellers(e.target.value)}
                className="w-full bg-transparent text-sm font-medium text-brand-text focus:outline-none cursor-pointer"
              >
                <option value="1">1 Person</option>
                <option value="2">2 People</option>
                <option value="3">3 People</option>
                <option value="4">4 People</option>
                <option value="5">5+ Group</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            className="w-full sm:w-auto h-[44px] px-6 rounded-xl bg-brand-accent hover:bg-brand-accentHover text-brand-primary font-bold flex items-center justify-center space-x-2 shadow-md hover:shadow-lg transition-all flex-shrink-0"
          >
            <Search className="w-5 h-5" />
            <span>Search</span>
          </button>
        </div>

      </div>
    </form>
  );
}
