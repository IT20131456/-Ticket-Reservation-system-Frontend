//Reservation date within 30 days from the booking date

// Function to get the current date
export const getCurrentDate = () => {
    return new Date();
  };
  
  // Function to calculate and return formatted current, minimum, and maximum dates
  export const getFormattedDates = (date) => {
    // Calculate maximum date (current date + 30 days)
    const maxDate = new Date(date);
    maxDate.setDate(maxDate.getDate() + 30);
  
  
    const formattedCurrentDate = formatDate(date);    
    const formattedMinDate = formatDate(date);  
    const formattedMaxDate = formatDate(maxDate);  

    return { formattedCurrentDate, formattedMinDate, formattedMaxDate };
  };
  
  // Function to format a date as 'YYYY-MM-DD'
  function formatDate(date) {

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); 
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  }


//Updating reservations (at least 5 days before the reservation date)

//Canceling reservations (at least 5 days before the reservation date)






  