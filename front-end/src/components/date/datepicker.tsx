'use client'
import React, { useEffect, useState } from 'react';
import { GrNext, GrPrevious } from '@/components/icons/index';
import { formatDateRange } from '@/components/date/formatDate';

interface CalendarProps {
    selectedDate: Date | null;
    onDateChange: (date: Date) => void;

}
interface CalendarTimeProps {
    selectedDateTime: Date | null;
    onDateTimeChange: (dateTime: Date) => void;
}

// Helper function to generate an array of days for a given month
const generateCalendarDays = (year: number, month: number): (number | null)[] => {
    const date = new Date(year, month, 1);
    const days = [];

    // Get the first day of the week (0 = Sunday, 1 = Monday, ...)
    const firstDayOfWeek = date.getDay();

    // Get the number of days in the month
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    // Fill in the leading empty days
    for (let i = 0; i < firstDayOfWeek; i++) {
        days.push(null);
    }

    // Fill in the actual days of the month
    for (let i = 1; i <= daysInMonth; i++) {
        days.push(i);
    }

    return days;
};
const generateCalendarDaysTime = (year: number, month: number) => {
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    return Array.from({ length: daysInMonth }, (_, i) => i + 1);
};



const Calendar: React.FC<CalendarProps> = ({ selectedDate, onDateChange }) => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedYear, setSelectedYear] = useState(currentDate.getFullYear());
    const [showYearSelector, setShowYearSelector] = useState(false);

    const currentMonth = currentDate.getMonth();
    const days = generateCalendarDays(selectedYear, currentMonth);

    const handlePrevMonth = () => {
        setCurrentDate(new Date(selectedYear, currentMonth - 1, 1));
    };

    const handleNextMonth = () => {
        setCurrentDate(new Date(selectedYear, currentMonth + 1, 1));
    };

    const handleDateSelect = (day: number | undefined) => {
        if (day) {
            const selected = new Date(selectedYear, currentMonth, day);
            onDateChange(selected);
        }
    };

    const handleYearChange = (year: number) => {
        setSelectedYear(year);
        setShowYearSelector(false); // Hide the year selector after selection
    };

    const handlePrevYearBlock = () => {
        setSelectedYear((prev) => Math.max(prev - 10, 1900)); // Ensure it doesn't go below 1900
    };

    const handleNextYearBlock = () => {
        setSelectedYear((prev) => Math.min(prev + 10, new Date().getFullYear())); // Ensure it doesn't exceed current year
    };

    // Generate years for the year selector (showing in blocks of 10, from 1900 to the current year)
    const currentYear = new Date().getFullYear();
    const yearStart = Math.floor(selectedYear / 10) * 10;
    const years = [...Array(25)].map((_, index) => yearStart + index).filter(year => year >= 1900 && year <= currentYear);

    return (
        <div className='flex gap-2'>
            <div className="w-72 border border-[#003459] rounded-lg p-4 font-sans bg-white">
                <div className="flex justify-between items-center mb-3">
                    <button
                        onClick={handlePrevMonth}
                        className="bg-button text-white rounded-sm px-3 py-1 cursor-pointer"
                    >
                        <GrPrevious className='text-white font-bold' />
                    </button>
                    <span onClick={() => setShowYearSelector(!showYearSelector)}>
                        {currentDate.toLocaleString('default', { month: 'long' })} {selectedYear}
                    </span>
                    <button
                        onClick={handleNextMonth}
                        className="bg-button text-white rounded-sm px-3 py-1 cursor-pointer"
                    >
                        <GrNext className='text-white font-bold' />
                    </button>
                </div>
                <div className="grid grid-cols-7 gap-2 text-center">
                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                        <div key={day} className="font-medium text-[#003459]">{day}</div>
                    ))}
                    {days.map((day, index) => (
                        <div
                            key={index}
                            className={`py-2 rounded-md cursor-pointer text-[14px] ${day === selectedDate?.getDate() &&
                                selectedYear === selectedDate.getFullYear() &&
                                currentMonth === selectedDate.getMonth()
                                ? 'bg-[#003459] text-white'
                                : 'text-[#003459]'
                                }`}
                            onClick={() => day && handleDateSelect(day)}
                        >
                            {day}
                        </div>
                    ))}
                </div>
            </div>
            {showYearSelector && (
                <div className="w-72 border border-[#003459] rounded-lg p-4 font-sans bg-white shadow-lg">
                    <div className="flex justify-between mb-2">
                        <button
                            onClick={handlePrevYearBlock}
                            className="bg-button text-white rounded-sm px-3 py-1 cursor-pointer"
                        >
                            <GrPrevious className='text-white font-bold' />
                        </button>
                        <button
                            onClick={handleNextYearBlock}
                            className="bg-button text-white rounded-sm px-3 py-1 cursor-pointer"
                        >
                            <GrNext className='text-white font-bold' />
                        </button>
                    </div>
                    <div className="grid grid-cols-4 gap-1">
                        {years.map((year) => (
                            <div
                                key={year}
                                onClick={() => handleYearChange(year)}
                                className={`cursor-pointer hover:bg-[#003459] hover:text-white p-1 rounded text-center 
                                           ${selectedYear === year ? 'bg-[#003459] text-white' : 'text-black'}`} // Highlight selected year
                            >
                                {year}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

const CalendarWithTime: React.FC<CalendarTimeProps> = ({ selectedDateTime, onDateTimeChange }) => {
    const currentDate = new Date();
    const [isOpen, setIsOpen] = useState(true);
    const [selectedYear, setSelectedYear] = useState(currentDate.getFullYear());
    const [selectedMonth, setSelectedMonth] = useState(currentDate.getMonth());
    const [selectedHour, setSelectedHour] = useState(currentDate.getHours() % 12 || 12);
    const [selectedMinute, setSelectedMinute] = useState(currentDate.getMinutes());
    const [isAM, setIsAM] = useState(currentDate.getHours() < 12);
    const [formattedDate, setFormattedDate] = useState(selectedDateTime?.toDateString() || currentDate.toDateString());

    const days = generateCalendarDaysTime(selectedYear, selectedMonth);

    useEffect(() => {
        if (selectedDateTime) {
            setFormattedDate(selectedDateTime.toDateString());
        }
    }, [selectedDateTime]);

    const handlePrevMonth = () => {
        setSelectedMonth((prevMonth) => {
            if (prevMonth === 0) {
                setSelectedYear((prevYear) => {
                    const minYear = currentDate.getFullYear();
                    if (prevYear <= minYear) {
                        return prevYear;
                    }
                    return prevYear - 1;
                });
                return 11; 
            }
            return prevMonth - 1; 
        });
    };

    const handleNextMonth = () => {
        setSelectedMonth((prevMonth) => {
            if (prevMonth === 11) {
                setSelectedYear((prevYear) => {
                    const nextYear = prevYear + 1;
                    const maxYear = currentDate.getFullYear() + 1; 
                    if (nextYear > maxYear) {
                        return prevYear;
                    }
                    return nextYear;
                });
                return 0; 
            }
            return prevMonth + 1; 
        });
    };

    const handleDateSelect = (day: number | undefined) => {
        if (day) {
            const selected = new Date(selectedYear, selectedMonth, day, selectedHour, selectedMinute);
            onDateTimeChange(selected);
            setFormattedDate(selected.toDateString()); // Update formatted date on selection
        }
    };

    const handleHourChange = (hour: number) => {
        setSelectedHour(hour);
    };

    const handleMinuteChange = (minute: number) => {
        setSelectedMinute(minute);
    };

    const toggleAMPM = () => {
        setIsAM(!isAM);
    };

    const handleSave = () => {
        const selectedHourIn24 = isAM ? selectedHour % 12 : selectedHour % 12 + 12;
        const selected = new Date(selectedYear, selectedMonth, selectedDateTime?.getDate() || 1, selectedHourIn24, selectedMinute, 0);
        onDateTimeChange(selected);
        setFormattedDate(selected.toDateString()); // Update formatted date on save
        setIsOpen(false); 
    };

    const getMonthName = (monthIndex: number) => {
        const date = new Date(selectedYear, monthIndex);
        return date.toLocaleString('default', { month: 'long' });
    };

    const isPrevMonthDisabled = selectedYear === currentDate.getFullYear() && selectedMonth <= currentDate.getMonth();

    return (
        <div className='flex gap-4'>
            {isOpen && (
                <div className="w-[420px] gap-4 border border-[#003459] rounded-lg p-4 bg-white shadow-md flex">
                    <div className='flex flex-col'>
                        {/* Display the formatted date */}
                        <span className="text-lg font-bold text-[#003459] mb-2">{formattedDate}</span>

                        <div className="flex justify-between items-center mb-3">
                            <button
                                onClick={handlePrevMonth}
                                className={`bg-button text-white rounded-sm px-2 py-1 ${isPrevMonthDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                                disabled={isPrevMonthDisabled}
                            >
                                <GrPrevious className='text-white font-bold' />
                            </button>

                            <span>{getMonthName(selectedMonth)} {selectedYear}</span>

                            <button onClick={handleNextMonth} className="bg-button text-white rounded-sm px-2 py-1">
                                <GrNext className='text-white font-bold' />
                            </button>
                        </div>

                        <div className="grid grid-cols-7 gap-2 text-center">
                            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                                <div key={day} className="font-medium text-[#003459]">{day}</div>
                            ))}
                            {days.map((day, index) => {
                                const date = new Date(selectedYear, selectedMonth, day);
                                const isToday = date.toDateString() === currentDate.toDateString();
                                const isPastDate = date < currentDate && selectedMonth === currentDate.getMonth() && selectedYear === currentDate.getFullYear();

                                return (
                                    <div
                                        key={index}
                                        className={`py-2 rounded-md cursor-pointer text-[14px] ${day === selectedDateTime?.getDate() &&
                                            selectedYear === selectedDateTime.getFullYear() &&
                                            selectedMonth === selectedDateTime.getMonth()
                                            ? 'bg-[#003459] text-white'
                                            : isPastDate
                                                ? 'text-gray-400 cursor-not-allowed'
                                                : 'text-[#003459] cursor-pointer'
                                            }`}
                                        onClick={() => !isPastDate && handleDateSelect(day)}
                                    >
                                        {day}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    <div className='h-full'>
                        <span className="font-bold text-[#003459]">Select Time:</span>
                        <div className="flex gap-2 mt-2">
                            <select
                                value={selectedHour}
                                onChange={(e) => handleHourChange(Number(e.target.value))}
                                className="border rounded p-1"
                            >
                                {[...Array(12)].map((_, hour) => (
                                    <option key={hour} value={hour + 1}>
                                        {hour + 1 < 10 ? `0${hour + 1}` : hour + 1}
                                    </option>
                                ))}
                            </select>

                            <select
                                value={selectedMinute}
                                onChange={(e) => handleMinuteChange(Number(e.target.value))}
                                className="border rounded p-1"
                            >
                                {[0, 15, 30, 45].map((minute) => (
                                    <option key={minute} value={minute}>
                                        {minute < 10 ? `0${minute}` : minute}
                                    </option>
                                ))}
                            </select>

                            <button onClick={toggleAMPM} className="border rounded p-1">
                                {isAM ? 'AM' : 'PM'}
                            </button>
                        </div>

                        <div className='flex justify-end items-end h-full pb-[4rem]'>
                            <button onClick={handleSave} className="bg-button text-white rounded-sm px-4 py-2">
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};



export { Calendar, CalendarWithTime };
