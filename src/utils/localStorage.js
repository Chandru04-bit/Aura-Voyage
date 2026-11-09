const STORAGE_KEY = 'auravoyage_bookings_v1';

// Seed sample initial bookings so first-time users can see the My Bookings page working immediately
const SEED_BOOKINGS = [
  {
    id: "WV-2026-9812",
    createdAt: "2026-10-15T14:30:00.000Z",
    status: "Confirmed",
    customer: {
      fullName: "Alexander Wright",
      email: "alexander.w@example.com",
      phone: "+1 (555) 234-5678"
    },
    travel: {
      destinationId: "swiss-alps-switzerland",
      destination: "Swiss Alps, Switzerland",
      packageId: "pkg-swiss-alps-grand",
      packageName: "Grand Swiss Alps Panoramic Rail & Peaks",
      departureDate: "2026-12-10",
      returnDate: "2026-12-18",
      adults: 2,
      children: 1,
      totalTravellers: 3
    },
    pricing: {
      adultPrice: 2250,
      childPrice: 1200,
      adultsTotal: 4500,
      childrenTotal: 1200,
      taxesAndFees: 285,
      totalAmount: 5985
    },
    specialRequests: "Window seats on Glacier Express & vegetarian meal preference."
  }
];

export const getStoredBookings = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      // Seed initial data
      localStorage.setItem(STORAGE_KEY, JSON.stringify(SEED_BOOKINGS));
      return SEED_BOOKINGS;
    }
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) {
      console.warn("Invalid bookings data in LocalStorage. Re-initializing.");
      localStorage.setItem(STORAGE_KEY, JSON.stringify(SEED_BOOKINGS));
      return SEED_BOOKINGS;
    }
    return parsed;
  } catch (err) {
    console.error("Failed to parse bookings from LocalStorage:", err);
    return SEED_BOOKINGS;
  }
};

export const saveNewBooking = (bookingData) => {
  try {
    const current = getStoredBookings();
    const updated = [bookingData, ...current];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return updated;
  } catch (err) {
    console.error("Failed to save booking to LocalStorage:", err);
    throw new Error("Unable to save booking to local storage.");
  }
};

export const cancelStoredBooking = (bookingId) => {
  try {
    const current = getStoredBookings();
    const updated = current.map(item => {
      if (item.id === bookingId) {
        return { ...item, status: "Cancelled", cancelledAt: new Date().toISOString() };
      }
      return item;
    });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return updated;
  } catch (err) {
    console.error("Failed to cancel booking:", err);
    throw new Error("Unable to cancel booking.");
  }
};

export const getBookingById = (bookingId) => {
  const current = getStoredBookings();
  return current.find(b => b.id === bookingId) || null;
};
