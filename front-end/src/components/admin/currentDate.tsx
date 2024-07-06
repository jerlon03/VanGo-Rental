// pages/index.js

import React from 'react';

const CurrentDate = () => {
    const getCurrentDate = () => {
        const options: Intl.DateTimeFormatOptions = {
          weekday: 'long',
          month: 'long',
          day: 'numeric',
          year: 'numeric',
        };
        return new Date().toLocaleDateString('en-US', options);
      };

  return ( <span>{getCurrentDate()}</span> );
};

export default CurrentDate;
