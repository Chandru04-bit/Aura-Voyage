import React, { createContext, useContext, useState, useEffect } from 'react';
import { getStoredBookings, saveNewBooking, cancelStoredBooking, getBookingById } from '../utils/localStorage';

const BookingContext = createContext();

export const BookingProvider = ({ children }) => {
  const [bookings, setBookings] = useState([]);
  const [latestBooking, setLatestBooking] = useState(null);
  const [searchParams, setSearchParams] = useState({
    destination: '',
    departureDate: '',
    returnDate: '',
    travellers: '2'
  });

  // Load from LocalStorage on initial mount
  useEffect(() => {
    const loaded = getStoredBookings();
    setBookings(loaded);
  }, []);

  const createBooking = (bookingData) => {
    const updated = saveNewBooking(bookingData);
    setBookings(updated);
    setLatestBooking(bookingData);
    return bookingData;
  };

  const cancelBooking = (bookingId) => {
    const updated = cancelStoredBooking(bookingId);
    setBookings(updated);
    if (latestBooking && latestBooking.id === bookingId) {
      setLatestBooking(prev => ({ ...prev, status: 'Cancelled' }));
    }
  };

  const findBooking = (id) => {
    return bookings.find(b => b.id === id) || getBookingById(id);
  };

  const updateSearchQuery = (params) => {
    setSearchParams(prev => ({ ...prev, ...params }));
  };

  return (
    <BookingContext.Provider
      value={{
        bookings,
        latestBooking,
        setLatestBooking,
        createBooking,
        cancelBooking,
        findBooking,
        searchParams,
        updateSearchQuery
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
};
