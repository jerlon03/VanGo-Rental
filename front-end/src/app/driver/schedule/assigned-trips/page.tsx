'use client'
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import React, { useState } from 'react'
import Button from '@/components/Button/button';
import { formatDatePublicRange } from '@/components/date/formatDate';

const AssignedTrips = () => {
    const [view, setView] = useState('active');
    const data = [
        {
            customerName: 'John Doe',
            address: '123 Main St, Anytown',
            phoneNo: '(555) 123-4567',
            pickUpLocation: 'Central Park',
            pickUpDateTime: '2023-10-16 10:00 AM',
            status: 'Completed',
        },
        {
            customerName: 'Jane Smith',
            address: '456 Elm St, Othertown',
            phoneNo: '(555) 987-6543',
            pickUpLocation: 'City Hall',
            pickUpDateTime: '2023-10-16 11:00 AM',
            status: 'Completed',
        },
        {
            customerName: 'Mike Johnson',
            address: '789 Oak St, Somewhere',
            phoneNo: '(555) 555-5555',
            pickUpLocation: 'Airport',
            pickUpDateTime: '2023-10-16 12:00 PM',
            status: 'Completed',
        },
    ];

    return (
        <div className='w-full'>
            <p className='text-[15px]'> View Schedule / Assigned Trips</p>
            <div className='w-full px-[2%] pt-[2%]'>
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
                    {view === 'completed' &&
                        <div className='w-full'>
                            <DataTable
                                value={data}
                                tableStyle={{ minWidth: '50rem' }}
                                pt={{
                                    thead: { className: 'bg-primaryColor text-white' },
                                    tbody: { className: 'border ' },
                                    headerRow: { className: 'h-[40px] ' },
                                }}
                            >
                                <Column field="customerName" header="Customer Name" pt={{
                                    bodyCell: { className: 'border text-blackColor p-2 text-[14px]' },
                                    headerCell: { className: 'px-3 font-medium text-[14px]  border-r' }
                                }} />
                                <Column field="address" header="Address" pt={{
                                    bodyCell: { className: 'border text-blackColor p-2 text-[14px]' },
                                    headerCell: { className: 'px-3 font-medium text-[14px]  border-r' }
                                }} />
                                <Column field="phoneNo" header="Phone No" pt={{
                                    bodyCell: { className: 'border text-blackColor p-2 text-[14px]' },
                                    headerCell: { className: 'px-3 font-medium text-[14px]  border-r' }
                                }} />
                                <Column field="pickUpLocation" header="Pick Up Location" pt={{
                                    bodyCell: { className: 'border text-blackColor p-2 text-[14px]' },
                                    headerCell: { className: 'px-3 font-medium text-[14px]  border-r' }
                                }} />
                                <Column field="pickUpDateTime" header="Pick Up Date & Time" pt={{
                                    bodyCell: { className: 'border text-blackColor p-2 text-[14px]' },
                                    headerCell: { className: 'px-3 font-medium text-[14px]  border-r' }
                                }} body={(rowData) => (
                                    <div>{formatDatePublicRange(rowData.pickUpDateTime)}</div>
                                )} />
                                <Column field="status" header="Status" pt={{
                                    bodyCell: { className: 'border text-blackColor p-2 text-[14px] flex justify-center' }, // Center the button
                                    headerCell: { className: 'px-3 font-medium text-[14px] rounded-tr-[3px] border-r' }
                                }} body={(rowData) => (
                                    <Button name={rowData.status} className={`p-2 rounded ${rowData.status === 'Completed' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`} />
                                )} />
                            </DataTable>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default AssignedTrips
