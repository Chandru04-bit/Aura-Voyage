/**
 * Validation utilities for travel booking, contact, and newsletter forms
 */

export const isValidEmail = (email) => {
  if (!email || typeof email !== 'string') return false;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim());
};

export const isValidPhone = (phone) => {
  if (!phone || typeof phone !== 'string') return false;
  // Allows international codes, dashes, spaces, parentheses, minimum 7 digits
  const cleaned = phone.replace(/[\s\-\(\)\+]/g, '');
  return cleaned.length >= 7 && /^\d+$/.test(cleaned);
};

export const isValidName = (name) => {
  return typeof name === 'string' && name.trim().length >= 2;
};

export const isFutureOrTodayDate = (dateString) => {
  if (!dateString) return false;
  const targetDate = new Date(dateString);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return targetDate >= today;
};

export const isReturnAfterDeparture = (departureDate, returnDate) => {
  if (!departureDate || !returnDate) return false;
  const dep = new Date(departureDate);
  const ret = new Date(returnDate);
  return ret > dep;
};

export const validateBookingForm = (formData) => {
  const errors = {};

  if (!isValidName(formData.fullName)) {
    errors.fullName = "Please enter a valid full name (at least 2 characters).";
  }

  if (!isValidEmail(formData.email)) {
    errors.email = "Please enter a valid email address.";
  }

  if (!isValidPhone(formData.phone)) {
    errors.phone = "Please enter a valid phone number (at least 7 digits).";
  }

  if (!formData.departureDate) {
    errors.departureDate = "Please select a departure date.";
  } else if (!isFutureOrTodayDate(formData.departureDate)) {
    errors.departureDate = "Departure date cannot be in the past.";
  }

  if (!formData.returnDate) {
    errors.returnDate = "Please select a return date.";
  } else if (formData.departureDate && !isReturnAfterDeparture(formData.departureDate, formData.returnDate)) {
    errors.returnDate = "Return date must be at least 1 day after departure date.";
  }

  if (!formData.adults || parseInt(formData.adults, 10) < 1) {
    errors.adults = "At least one adult traveller is required.";
  }

  if (parseInt(formData.children, 10) < 0) {
    errors.children = "Children count cannot be negative.";
  }

  if (!formData.packageId) {
    errors.packageId = "Please select a travel package.";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

export const validateContactForm = (formData) => {
  const errors = {};

  if (!isValidName(formData.fullName)) {
    errors.fullName = "Please enter your full name.";
  }

  if (!isValidEmail(formData.email)) {
    errors.email = "Please enter a valid email address.";
  }

  if (formData.phone && !isValidPhone(formData.phone)) {
    errors.phone = "Please enter a valid phone number.";
  }

  if (!formData.subject || formData.subject.trim().length < 3) {
    errors.subject = "Please enter a subject (at least 3 characters).";
  }

  if (!formData.message || formData.message.trim().length < 10) {
    errors.message = "Message must be at least 10 characters long.";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};
