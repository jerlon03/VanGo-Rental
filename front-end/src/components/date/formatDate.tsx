const formatDateRange = (startDateString: string | null, endDateString?: string | null): string => {
    if (!startDateString) {
      return "";
    }
  
    const startDate = new Date(startDateString);
    const endDate = endDateString ? new Date(endDateString) : undefined;
  
    // Check if startDate is valid
    if (isNaN(startDate.getTime())) {
      return "Invalid Start Date";
    }
  
    // Check if endDate exists and is valid
    if (endDate && isNaN(endDate.getTime())) {
      return "Invalid End Date";
    }
  
    const months = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
  
    const startDay = startDate.getDate();
    const startMonth = startDate.getMonth();
    const startYear = startDate.getFullYear();
  
    if (!endDate) {
      // Only startDate, return single date
      return `${startDay} ${months[startMonth]} ${startYear}`;
    }
  
    const endDay = endDate.getDate();
    const endMonth = endDate.getMonth();
    const endYear = endDate.getFullYear();
  
    if (startMonth === endMonth && startYear === endYear) {
      // Same month and year, display as "day1 - day2 month year"
      return `${startDay} - ${endDay} ${months[startMonth]} ${startYear}`;
    } else {
      // Different months or years, display as "day1 month1 year1 - day2 month2 year2"
      return `${startDay} ${months[startMonth]} ${startYear} - ${endDay} ${months[endMonth]} ${endYear}`;
    }
  };
  
  export {
    formatDateRange
  };
  