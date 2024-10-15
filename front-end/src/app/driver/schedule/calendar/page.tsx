'use client'
import React, { useState } from 'react'
import { formatDatePublicRange } from '@/components/date/formatDate';

const Calendar = () => {
    const [view, setView] = useState('daily');

    const currentDate = new Date(); // Get the current date
    const startOfWeek = new Date(currentDate); // Clone current date for start of week
    startOfWeek.setDate(currentDate.getDate() - currentDate.getDay()); // Set to start of the week (Sunday)
    const endOfWeek = new Date(startOfWeek); // Clone start of week for end of week
    endOfWeek.setDate(startOfWeek.getDate() + 6); // Set to end of the week (Saturday)

    return (
        <div className='text-blackColor w-full'>
            <p className='text-[15px]'> View Schedule / My Calendar</p>
            <div className='w-full px-[3%] pt-[2%]'>
                <div className='w-full pt-5 flex gap-4'>
                    <p onClick={() => setView('daily')} className={view === 'daily' ? 'cursor-pointer font-bold  border-b-2 w-20 flex justify-center border-blackColor text-blackColor' : 'cursor-pointer'}>Daily</p>
                    <p>|</p>
                    <p onClick={() => setView('weekly')} className={view === 'weekly' ? 'cursor-pointer font-bold  border-b-2 w-20 flex justify-center border-blackColor text-blackColor' : 'cursor-pointer'}>Weekly</p>
                </div>
                <div className='w-full pt-4'>

                    <h1>{currentDate.toLocaleString('default', { month: 'long' })} {currentDate.getFullYear()}</h1>
                </div>
                {/* Display content based on the selected view */}
                <div className='w-full pt-4'>
                    {view === 'daily' ? (
                        <div>
                            <p>{formatDatePublicRange(currentDate as any)}</p> {/* Show current date */}
                        </div>
                    ) : (
                        <div>
                            <p>{formatDatePublicRange(startOfWeek as any)} - {formatDatePublicRange(endOfWeek as any)}</p> 
                        </div>
                    )}
                </div>

            </div>
        </div>
    )
}

export default Calendar;
