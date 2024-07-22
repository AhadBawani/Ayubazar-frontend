export const formatDate = (date) => {
     const currentDate = new Date(date);
     const monthNames = [
          "January", "February", "March",
          "April", "May", "June", "July",
          "August", "September", "October",
          "November", "December"
     ];

     const monthName = monthNames[currentDate.getMonth()];

     const day = currentDate.getDate();

     const year = currentDate.getFullYear();

     return `${monthName} ${day}, ${year}`;
}

export const deliveryDate = (date) => {
     const currentDate = new Date(date);
     const firstDate = new Date(currentDate.getTime() + (4 * 24 * 60 * 60 * 1000)); // Add 4 days to current 
     const secondDate = new Date(firstDate.getTime() + (4 * 24 * 60 * 60 * 1000)); // Add 4 more days to 

     const options = { month: 'short', day: 'numeric', year: 'numeric' };
     const firstDateFormatted = firstDate.toLocaleDateString('en-US', options);
     const secondDateFormatted = secondDate.toLocaleDateString('en-US', options);

     return { firstDate: firstDateFormatted, secondDate: secondDateFormatted };
}