/**
 * Filename: TicketPriceValidation.js
 * Author: It20131456
 * Description: Utility functions for validating ticket prices and calculating total prices in the Ticket Booking system.
 */
export const classPrices = {
  1: 1000, // First Class price per ticket
  2: 800, // Second Class price per ticket
  3: 500, // Third Class price per ticket
};

export const calculateTotalPrice = (selectedClass, numberOfTickets) => {
  if (selectedClass && numberOfTickets) {
    const classPrice = classPrices[selectedClass]; // Get the price based on selected class
    const totalPrice = classPrice * numberOfTickets; // Calculate total price
    return totalPrice;
  }
  return 0; // Return 0 if class or number of tickets is not selected
};
