'use client'
import React, { useState } from 'react'

const AssignedTrips = () => {
    const [view, setView] = useState('active');

    return (
        <div className='w-full'>
            <p className='text-[15px]'> View Schedule / Assigned Trips</p>
            <div className='w-full px-[3%] pt-[2%]'>
                <div className='w-full pt-5 flex gap-4'>
                    <p onClick={() => setView('active')} className={view === 'active' ? 'cursor-pointer font-bold border-b-2 px-4 flex justify-center border-blackColor text-blackColor' : 'cursor-pointer'}>Active Trips</p>
                    <p>|</p>
                    <p onClick={() => setView('upcoming')} className={view === 'upcoming' ? 'cursor-pointer font-bold border-b-2 px-4 flex justify-center border-blackColor text-blackColor' : 'cursor-pointer'}>Upcoming Trips</p>
                    <p>|</p>
                    <p onClick={() => setView('completed')} className={view === 'completed' ? 'cursor-pointer font-bold border-b-2 px-4  flex justify-center border-blackColor text-blackColor' : 'cursor-pointer'}>Completed Trips</p>
                </div>
                {/* Display content based on the selected view */}
                <div className='pt-6'>
                    {view === 'active' && <p>Displaying Active Trips</p>} {/* Placeholder for active trips content */}
                    {view === 'upcoming' && <p>Displaying Upcoming Trips</p>} {/* Placeholder for upcoming trips content */}
                    {view === 'completed' && <p>Displaying Completed Trips</p>} {/* Placeholder for completed trips content */}
                </div>
            </div>
        </div>
    )
}

export default AssignedTrips
