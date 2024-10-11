import React, { useState, useRef, useEffect } from 'react'; // Added useRef and useEffect
import InputField from '@/components/Form/inputfield'; // Import your InputField component
import {Calendar, CalendarWithTime} from '@/components/date/datepicker'; // Import your Calendar component
import { CiCalendarDate } from 'react-icons/ci'; // Import calendar icon from react-icons

interface DatePickerWithTimeProps {
  value: Date | null;
  onChange: (date: Date | null) => void;
  className?: string;
}

const DatePicker: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isCalendarVisible, setIsCalendarVisible] = useState<boolean>(false);
  const calendarRef = useRef<HTMLDivElement | null>(null); // Reference for the calendar

  const toggleCalendar = () => {
    setIsCalendarVisible((prev) => !prev);
  };

  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
    setIsCalendarVisible(false); // Hide calendar after selecting a date
  };

  // Effect to handle clicks outside the calendar
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target as Node)) {
        setIsCalendarVisible(false); // Close calendar if clicked outside
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div style={{ position: 'relative' }}>
      <InputField
        type="text"
        readOnly
        value={selectedDate ? selectedDate.toDateString() : ''}
        placeholder="Select a date"
        onClick={toggleCalendar} // Show calendar on input click
        icon={<CiCalendarDate onClick={toggleCalendar} className='text-[#CCCCCC] size-[20px]' />} // Pass icon to InputField
      />
      {isCalendarVisible && (
        <div
          ref={calendarRef} // Attach ref to the calendar div
          style={{
            position: 'absolute', // Position calendar absolutely
            top: '100%', // Position below the input field
            left: 0, // Align to the left edge of the input field
            zIndex: 1000, // Ensure it's above other elements
          }}
        >
          <Calendar
            selectedDate={selectedDate}
            onDateChange={handleDateChange}
          />
        </div>
      )}
    </div>
  );
};

const DatePickerWithTime: React.FC<DatePickerWithTimeProps> = ({
  value,
  onChange,
  className = ''
}) => {
  const [isCalendarVisible, setIsCalendarVisible] = useState<boolean>(false);
  const calendarRef = useRef<HTMLDivElement | null>(null);

  const toggleCalendar = () => {
    setIsCalendarVisible((prev) => !prev);
  };

  const handleDateTimeChange = (dateTime: Date) => {
    onChange(dateTime); // Call the parent onChange handler
    setIsCalendarVisible(false); // Hide calendar after selecting a date
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target as Node)) {
        setIsCalendarVisible(false); // Close calendar if clicked outside
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div style={{ position: 'relative' }}>
      <InputField
        type="text"
        readOnly
        value={value ? value.toLocaleString() : ''} // Display selected date and time
        placeholder="Select a date and time"
        onClick={toggleCalendar} // Show calendar on input click
        icon={<CiCalendarDate className="text-[#CCCCCC] size-[20px]" />} // Pass icon to InputField
        className={className} // Pass down className
      />
      {isCalendarVisible && (
        <div
          ref={calendarRef}
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            zIndex: 1000,
          }}
        >
          <CalendarWithTime
            selectedDateTime={value}
            onDateTimeChange={handleDateTimeChange}
          />
        </div>
      )}
    </div>
  );
};

export {DatePicker ,DatePickerWithTime };
