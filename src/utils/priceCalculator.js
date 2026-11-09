/**
 * Utility functions for travel booking price calculations and formatting
 */

export const calculateBookingPrice = ({
  adultPrice = 0,
  childPrice = 0,
  adults = 1,
  children = 0,
  taxRate = 0.05 // 5% standard travel protection and taxes
}) => {
  const adultCount = Math.max(1, parseInt(adults, 10) || 1);
  const childCount = Math.max(0, parseInt(children, 10) || 0);

  const adultsSubtotal = adultCount * adultPrice;
  const childrenSubtotal = childCount * childPrice;
  const baseSubtotal = adultsSubtotal + childrenSubtotal;
  
  const taxesAndFees = Math.round(baseSubtotal * taxRate);
  const totalAmount = baseSubtotal + taxesAndFees;

  return {
    adults: adultCount,
    children: childCount,
    totalTravellers: adultCount + childCount,
    adultPrice,
    childPrice,
    adultsSubtotal,
    childrenSubtotal,
    baseSubtotal,
    taxesAndFees,
    totalAmount
  };
};

export const formatPrice = (amount, currencySymbol = '$') => {
  if (typeof amount !== 'number') return `${currencySymbol}0`;
  return `${currencySymbol}${amount.toLocaleString('en-US')}`;
};

export const generateBookingReference = () => {
  const prefix = "AV";
  const year = new Date().getFullYear();
  const randomNum = Math.floor(1000 + Math.random() * 9000);
  return `${prefix}-${year}-${randomNum}`;
};
