'use client'
import React, { useState, useEffect } from 'react';

const CustomCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  // Get first day and last day of the current month
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

  // Days of the week
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  // Create an array for the days in the current month
  const getDaysInMonth = () => {
    const days = [];
    for (let i = 1; i <= lastDayOfMonth.getDate(); i++) {
      days.push(new Date(currentDate.getFullYear(), currentDate.getMonth(), i));
    }
    return days;
  };

  // Create padding for the days from the previous month
  const getPaddingDays = () => {
    const paddingDays = [];
    const firstDayOfWeek = firstDayOfMonth.getDay(); // Day index of the first day in month
    for (let i = 0; i < firstDayOfWeek; i++) {
      paddingDays.push(null); // Empty placeholders for days from the previous month
    }
    return paddingDays;
  };

  const daysInMonth = getDaysInMonth();
  const paddingDays = getPaddingDays();

  // Handle selecting a date
  const handleDateClick = (day: Date) => {
    setSelectedDate(day);
  };

  // Format a date for rendering
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  return (
    <div className="w-full mx-auto ">
      <h2 className="text-[18px] font-bold text-center mb-2">
        {currentDate.toLocaleString('default', { month: 'long' })} {currentDate.getFullYear()}
      </h2>

      {/* Days of the week header */}
      <div className="grid grid-cols-7 text-center font-semibold text-gray-700">
        {daysOfWeek.map((day) => (
          <div key={day} className="p-2">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar days grid */}
      <div className="grid grid-cols-7 gap-2">
        {/* Padding days from the previous month */}
        {paddingDays.map((_, index) => (
          <div key={index} className="p-2"></div>
        ))}

        {/* Days in the current month */}
        {daysInMonth.map((day) => (
          <div
            key={day.getDate()}
            className={`p-2 text-center cursor-pointer rounded-lg ${
              day.toDateString() === new Date().toDateString() ? 'bg-primaryColor font-bold text-white' : 'bg-gray-100'
            } ${
              selectedDate && day.toDateString() === selectedDate.toDateString()
                ? 'bg-blue-500 text-white font-bold'
                : 'hover:bg-blue-100'
            }`}
            onClick={() => handleDateClick(day)}
          >
            {day.getDate()}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomCalendar;
